const { serviceLayerAPI } = require("../config/service-layer-api");
const { portalModules } = require("../config/config");
const dbHelper = require("../helper/db");
const { dbCreds } = require("../config/hana-db");
const { getInvoiceByDocEntry } = require("../helper/invoice");

const serviceLayerURI = portalModules.OSBS;

exports.getSalesBatchSelection = async(docNum, itemCode, cookie) => {
  try {
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.get(`${serviceLayerURI}?$filter=U_InvNo eq '${docNum}' and U_ItemCode eq '${itemCode}'`);
    
    if(Array.isArray(response?.data?.value) && response.data.value.length > 0) {
      const record = response.data.value[0];

      // 1. Fetch Bin Information from Original Invoice via Service Layer
      // We look up where these batches were allocated on the actual invoice to restore missing bin data.
      let binsByBatch = {};
      try {
        // Find DocEntry first
        const docEntrySql = `SELECT "DocEntry" FROM ${dbCreds.CompanyDB}.OINV WHERE "DocNum" = ?`;
        const invoiceRows = dbHelper.executeWithValues(docEntrySql, [docNum]);
        
        if (invoiceRows && invoiceRows.length > 0) {
          const docEntry = invoiceRows[0].DocEntry;
          console.log(`[getSalesBatchSelection] Fetching Invoice ${docEntry} (DocNum ${docNum}) for bin enrichment...`);
          
          const invoiceData = await getInvoiceByDocEntry(docEntry, { headers: { Cookie: cookie } });
          
          if (invoiceData && Array.isArray(invoiceData.DocumentLines)) {
            invoiceData.DocumentLines.forEach(line => {
              if (line.ItemCode === itemCode && Array.isArray(line.DocumentLinesBinAllocations)) {
                line.DocumentLinesBinAllocations.forEach(bin => {
                   // Map bins to batches. Note: Timber tally is usually 1-1 or grouped by batch
                   // If multiple bins exist for one batch, this logic picks the last one (usually sufficient for returns)
                   if (bin.BinAbsEntry) {
                     binsByBatch[bin.SerialAndBatchNumbersBaseLine] = binsByBatch[bin.SerialAndBatchNumbersBaseLine] || {}; // Placeholder
                     // Wait, Service Layer BinAllocations link to BatchNum index? 
                     // Usually we check BatchNumbers array on the same line.
                   }
                });

                // Better way: correlate BatchNumbers and BinAllocations if possible
                // Actually, just collect ALL bins used for this item in this invoice
                if (Array.isArray(line.BatchNumbers)) {
                   line.BatchNumbers.forEach((bn, bnIdx) => {
                      const binAlloc = line.DocumentLinesBinAllocations.find(ba => ba.SerialAndBatchNumbersBaseLine === bnIdx);
                      if (binAlloc) {
                        binsByBatch[bn.BatchNumber] = {
                          BinAbsEntry: binAlloc.BinAbsEntry,
                          BinCode: "" // BinCode is often not in the allocation object, but AbsEntry is what matters most
                        };
                      }
                   });
                }
              }
            });
          }
        }
      } catch (err) {
        console.warn("[getSalesBatchSelection] Bin enrichment failed:", err.message);
      }

      // 2. Deduplicate and Enrich SBS1Collection with Bin Info
      if (Array.isArray(record.SBS1Collection)) {
        const normalizeKey = (batch, w, h, len) =>
          `${batch}_${parseFloat(w)}_${parseFloat(h)}_${parseFloat(len).toFixed(5)}`;
        
        const seen = new Set();
        const deduplicated = [];

        record.SBS1Collection.forEach(row => {
          const key = normalizeKey(row.U_Batch, row.U_Width, row.U_Height, row.U_Length);
          if (!seen.has(key)) {
            seen.add(key);
            
            // Enrich with Bin info if found in original invoice
            const binInfo = binsByBatch[row.U_Batch];
            deduplicated.push({ 
              ...row,
              BinAbsEntry: binInfo?.BinAbsEntry || null,
              BinCode: binInfo?.BinCode || ""
            });
          }
        });

        console.log(`[getSalesBatchSelection] Deduplicated and enriched SBS1Collection: ${deduplicated.length} rows`);
        record.SBS1Collection = deduplicated;
      }

      return record;
    }
    return null;
  }
  catch(error) {
    console.log("Get SalesBatchSelection error: " + error);
    throw error;
  }
}

exports.updateSalesBatchSelection = async(request, cookie) => {
  try {
    serviceLayerAPI.defaults.headers.Cookie = cookie;
    const response = await serviceLayerAPI.patch(`${serviceLayerURI}(${request.DocEntry})`, request);
    return response.data;
  }
  catch(error) {
    console.log("Update SalesBatchSelection error: " + error);
    throw error;
  }
}

/**
 * Updates the existing OSBS records for a source Sales Quotation (by DocNum)
 * with the new batch selection data being sent for the invoice.
 * This prevents SAP error 4021 (Tally sheet and batch selection mismatch)
 * when a stored procedure validates OSBS against the new invoice.
 */
exports.updateOSBSForQuotation = async(sqDocNum, salesBatchSelection, cookie) => {
  const results = [];
  // Convert to string since U_InvNo is stored as string in OSBS
  const sqDocNumStr = String(sqDocNum);
  console.log(`[updateOSBSForQuotation] Starting update for SQ DocNum: ${sqDocNumStr}, items: ${salesBatchSelection.length}`);

  // Only include fields that are valid SBS1 UDO fields in SAP
  // U_BinAbsEntry is NOT valid (SAP error: "Property 'U_BinAbsEntry' of 'SBS1' is invalid")

  for (const sbs of salesBatchSelection) {
    try {
      serviceLayerAPI.defaults.headers.Cookie = cookie;
      const filterUrl = `${serviceLayerURI}?$filter=U_InvNo eq '${sqDocNumStr}' and U_ItemCode eq '${sbs.U_ItemCode}'`;
      console.log(`[updateOSBSForQuotation] GET: ${filterUrl}`);
      const getResp = await serviceLayerAPI.get(filterUrl);
      console.log(`[updateOSBSForQuotation] GET result count: ${getResp?.data?.value?.length}`);
      if (Array.isArray(getResp?.data?.value) && getResp.data.value.length > 0) {
        const existingOSBS = getResp.data.value[0];
        console.log(`[updateOSBSForQuotation] Existing OSBS record:`, JSON.stringify(existingOSBS, null, 2));

        const existingLines = Array.isArray(existingOSBS.SBS1Collection) ? existingOSBS.SBS1Collection : [];
        const incomingSelection = sbs.SBS1Collection || [];

        // Normalize helper for keys
        const normalizeKey = (batch, w, h, len) => 
          `${batch}_${parseFloat(w)}_${parseFloat(h)}_${parseFloat(len).toFixed(5)}`;

        // === STEP 1: Deduplicate existing OSBS rows ===
        // Group by batch+dimensions. Keep FIRST row as canonical, zero out all duplicates.
        const canonicalMap = new Map(); // key -> first LineId index
        const canonicalRows = [];  // indices of canonical rows
        const duplicateRows = [];  // indices of duplicate rows to zero out

        existingLines.forEach((line, idx) => {
          const key = normalizeKey(line.U_Batch, line.U_Width, line.U_Height, line.U_Length);
          if (!canonicalMap.has(key)) {
            canonicalMap.set(key, idx);
            canonicalRows.push(idx);
          } else {
            duplicateRows.push(idx);
          }
        });

        console.log(`[updateOSBSForQuotation] Existing rows: ${existingLines.length}, Canonical: ${canonicalRows.length}, Duplicates to zero: ${duplicateRows.length}`);

        // === STEP 2: Flatten incoming demands (already aggregated by frontend) ===
        const demandsBySpec = {};
        incomingSelection.forEach(item => {
          const key = normalizeKey(item.U_Batch, item.U_Width, item.U_Height, item.U_Length);
          if (!demandsBySpec[key]) demandsBySpec[key] = { pcs: 0 };
          demandsBySpec[key].pcs += (parseInt(item.U_NoOfPcs) || 1);
        });

        // === STEP 3: Assign demands ONLY to canonical rows ===
        const finalSBS1Collection = existingLines.map((line, idx) => {
          const key = normalizeKey(line.U_Batch, line.U_Width, line.U_Height, line.U_Length);
          const isCanonical = canonicalMap.get(key) === idx;
          const avlPcs = Math.round(parseFloat(line.U_AvlPcs) || 0);
          const avlQty = parseFloat(line.U_AvlQty) || 0;

          if (!isCanonical || !demandsBySpec[key] || demandsBySpec[key].pcs <= 0) {
            // Zero out: either a duplicate row or no demand for this batch
            return {
              LineId: line.LineId,
              U_Batch: line.U_Batch,
              U_Width: line.U_Width,
              U_Height: line.U_Height,
              U_Length: line.U_Length,
              U_AvlQty: line.U_AvlQty,
              U_NoOfPcs: 0,
              U_SelQty: 0,
              U_AvlPcs: line.U_AvlPcs,
              U_BalPcs: avlPcs,
              U_BalAvlQty: avlQty
            };
          }

          // This is a canonical row WITH demand — assign pieces
          const demand = demandsBySpec[key];
          const take = Math.min(demand.pcs, avlPcs);
          demand.pcs -= take; // consume from demand pool

          const qtyPerPc = avlQty / (avlPcs || 1);
          const selQty = (take === avlPcs) ? avlQty : parseFloat((take * qtyPerPc).toFixed(5));

          return {
            LineId: line.LineId,
            U_Batch: line.U_Batch,
            U_Width: line.U_Width,
            U_Height: line.U_Height,
            U_Length: line.U_Length,
            U_AvlQty: line.U_AvlQty,
            U_NoOfPcs: take,
            U_SelQty: selQty,
            U_AvlPcs: line.U_AvlPcs,
            U_BalPcs: avlPcs - take,
            U_BalAvlQty: parseFloat((avlQty - selQty).toFixed(5))
          };
        });

        // Check for unmet demands
        Object.keys(demandsBySpec).forEach(specKey => {
          if (demandsBySpec[specKey].pcs > 0) {
            console.warn(`[updateOSBSForQuotation] Spec ${specKey} still has ${demandsBySpec[specKey].pcs} pieces unmet after assignment.`);
          }
        });

        const totalSelectedPcs = finalSBS1Collection.reduce((acc, r) => acc + r.U_NoOfPcs, 0);
        const totalSelectedQty = Number(finalSBS1Collection.reduce((acc, r) => acc + r.U_SelQty, 0).toFixed(5));

        // Use the frontend's total quantity to ensure exact match
        const targetQty = sbs.U_TotalQty || totalSelectedQty;

        const patchPayload = {
          U_Quantity: totalSelectedPcs || existingOSBS.U_Quantity || 1,
          U_TotalQty: targetQty,
          U_LineNum: existingOSBS.U_LineNum,
          U_WhsCode: sbs.U_WhsCode || existingOSBS.U_WhsCode,
          SBS1Collection: finalSBS1Collection
        };

        console.log(`[updateOSBSForQuotation] PATCHing OSBS DocEntry: ${existingOSBS.DocEntry}, U_Qty: ${patchPayload.U_Quantity}, U_TotalQty: ${patchPayload.U_TotalQty}, Canonical: ${canonicalRows.length}, ZeroedDupes: ${duplicateRows.length}`);
        await serviceLayerAPI.patch(`${serviceLayerURI}(${existingOSBS.DocEntry})`, patchPayload);
        results.push({ updated: true, DocEntry: existingOSBS.DocEntry, item: sbs.U_ItemCode });
        console.log(`[updateOSBSForQuotation] PATCH success for DocEntry: ${existingOSBS.DocEntry}`);
      } else {
        console.warn(`[updateOSBSForQuotation] No OSBS found for SQ DocNum: ${sqDocNumStr}, Item: ${sbs.U_ItemCode}. Cannot update.`);
        results.push({ updated: false, item: sbs.U_ItemCode });
      }
    }
    catch(error) {
      const errMsg = error.response?.data?.error?.message?.value || error.message;
      console.error(`[updateOSBSForQuotation] Error for SQ ${sqDocNumStr}, Item ${sbs.U_ItemCode}: ${errMsg}`);
      results.push({ updated: false, item: sbs.U_ItemCode, error: errMsg });
    }
  }
  return results;
}

exports.createSalesBatchSelection = async(request, invoiceDocEntry, invoiceDocNum, cookie) => {
    console.log("*** SalesBatchSelection request: "+JSON.stringify(request));
    // Ensure `request` is an array
    const requests = Array.isArray(request) ? request : [request];
    const results = [];
    for (const item of requests) {
        try {
            serviceLayerAPI.defaults.headers.Cookie = cookie;
            item.U_InvNo = invoiceDocNum;
            const response = await serviceLayerAPI.post(serviceLayerURI, item);
            //const response = await axios.post('/OSBS', item);
            // Extract required fields from the response
            const { DocNum, U_LineNum, U_ItemCode } = response.data;
            console.log("*** SalesBatchSelection response:**** "+JSON.stringify(response.data));
            results.push({ DocNum, U_LineNum: U_LineNum !== undefined && U_LineNum !== null ? U_LineNum : item.U_LineNum, U_ItemCode });
        } catch (error) {
            console.error(`Error creating OSBS record for item ${item.U_ItemCode || item.ItemCode}:`, error.response?.data?.error?.message?.value);
        }
    }

    return results;
}

