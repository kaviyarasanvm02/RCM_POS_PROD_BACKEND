var p=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var f=p((hR,ai)=>{var sg="YYYY-MM-DD",ng=["January","February","March","April","May","June","July","August","September","October","November","December"],ag="FJD",ig="\\\\172.18.20.16\\rcmsapshared\\",j={USER:"User",USER_GROUP:"User Group",APPROVAL:"Approval",INVOICE:"Invoice",INCOMING_PAYMENT:"Incoming Payment",JOURNAL_ENTRY:"Journal Entry",CREDIT_MEMO:"Credit Memo",CREDIT_MEMO_REQUEST:"Credit Memo",STORE_SETUP:"Store Setup",STORE_WAREHOUSE:"Store Warehouse",STORE_COUNTER:"Store Counter",STORE_USER:"Store User",SALES_QUOTATION:"Sales Quotation",BUSINESS_PARTNER:"Business Partners",INVOICE:"Invoice",STOCK_TRANSFER_REQUEST:"Stock Transfer Request",STOCK_TRANSFER:"Stock Transfer",INVENTORY_COUNTING:"Inventory Counting",APPROVAL_STATUS_REPORT:"Approval Status Report",SALES_ORDER:"Sales Order",DELIVERY:"Delivery",ITEM:"Item",OSBS:"OSBS",OTSH:"OTSH",ATTACHMENTS:"Attachments2"},lg={[j.INVOICE]:13,[j.CREDIT_MEMO_REQUEST]:234000031,[j.INCOMING_PAYMENT]:24,[j.SALES_ORDER]:17,[j.SALES_QUOTATION]:23,[j.STOCK_TRANSFER_REQUEST]:1250000001},cg={[j.BUSINESS_PARTNER]:"BusinessPartners",[j.INVOICE]:"Invoices",[j.INCOMING_PAYMENT]:"IncomingPayments",[j.JOURNAL_ENTRY]:"JournalEntries",[j.SALES_QUOTATION]:"Quotations",[j.INVENTORY_COUNTING]:"InventoryCountings",[j.CREDIT_MEMO_REQUEST]:"ReturnRequest",[j.DELIVERY]:"DeliveryNotes",[j.ITEM]:"Items"},dg={STOCK_TRANSFER_REQUEST:1250000001,STOCK_TRANSFER:67,[j.DELIVERY]:15},ug={INCOMING_PAYMENT:"INCOMING_PAYMENT",OUTGOING_PAYMENT:"OUTGOING_PAYMENT",COUNTER_TO_COUNTER:"COUNTER_TO_COUNTER",OPENING_BALANCE:"OPENING_BALANCE",CLOSING_BALANCE:"CLOSING_BALANCE"},pg=[],mg={READ:"U_AllowRead",WRITE:"U_AllowWrite",CREATE:"U_AllowCreate",CANCEL:"U_AllowCancel"},yg={ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER",TEMPLATE:"TEMPLATE",ADMIN:"ADMIN"},gg={PENDING:"PENDING",APPROVED:"APPROVED",GENERATED:"GENERATED",REJECTED:"REJECTED",FAILED:"FAILED",NOT_REQUIRED:"NOT_REQUIRED",NOT_ASSIGNED:"NOT_ASSIGNED",AUTO_APPROVED:"AUTO_APPROVED"},Tg={ACTIVE:"ACTIVE",INACTIVE:"INACTIVE"},hg={DIRECT:"direct",DRAFT:"draft"},Cg={BATCHES:"Batches",SERIAL_NUMBERS:"Serial Numbers",NORMAL:"Normal",LABOR:"Labor"},fg={ITEM_WITHOUT_QRCODE:"ITEM_WITHOUT_QRCODE",BATCH_SERIAL_WITH_ALL_BINS:"BATCH_SERIAL_WITH_ALL_BINS",BATCH_SERIAL_IN_A_BIN:"BATCH_SERIAL_IN_A_BIN"},ni={REDIS:"REDIS",FILE:"FILE"},Sg=17,Eg=ni.REDIS,Dg="ONE",Ag="kiafn239df#@asdf$%^13423#$%@sdfgdf",Ig={OK:200,CREATED:201,ACCEPTED:202,NO_CONTENT:204,BAD_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404,INTERNAL_SERVER_ERROR:500,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503};ai.exports={enableLocationBasedCreditCardAccount:!0,dateFormat:sg,months:ng,saltRounds:10,systemCurrency:ag,defaultBranchId:1,portalModules:j,serviceLayerApiURIs:cg,trxTypes:ug,draftObjectCodes:dg,permissions:mg,userRoles:yg,draftStatus:gg,recordState:Tg,recordTypes:hg,itemTypes:Cg,requestTypes:fg,sessionStoreTypes:ni,sessionStore:Eg,cookieName:Dg,sessionSecret:Ag,sessionMaxAgeInHours:Sg,httpStatusCodes:Ig,fircaIntegrationWaitTime:1e4,enableFircaIntegration:!0,enableStoreBasedNumbering:!0,isHomeDeliveryEnabled:!0,objectCodes:lg,attachmentPath:ig,EXCLUDED_ITEM_GROUPS:pg}});var D=p((SR,ii)=>{var{draftObjectCodes:CR,draftStatus:vs,recordState:fR}=f(),Ng=30,y={CompanyDB:process.env.SERVICE_LAYER_COMPANYDB,UserName:process.env.SERVICE_LAYER_USERNAME,Password:process.env.SERVICE_LAYER_PASSWORD},Rg={serverNode:`${process.env.HANA_HOST}:${process.env.HANA_PORT}`,host:process.env.HANA_HOST,port:process.env.HANA_PORT,user:process.env.HANA_USER,password:process.env.HANA_PASSWORD,pooling:process.env.HANA_POOLING==="true",maxPoolSize:parseInt(process.env.HANA_MAX_POOL_SIZE,10)||75,connectionLifetime:parseInt(process.env.HANA_CONNECTION_LIFE_TIME,10)||60},bg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."Fax", T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked",
    T0."U_TempPasswordFlag", T0."U_PortalUser", T0."U_PortalPassword" as "Password", T0."SalesDisc"
  FROM ${y.CompanyDB}.OUSR T0
  WHERE UPPER(T0."USER_CODE") = UPPER(?)`,Og=`SELECT T0."INTERNAL_K" as "InternalKey", T0."U_PortalAccountLocked"
  FROM ${y.CompanyDB}.OUSR T0
WHERE T0."U_PortalUser" = 'Y'
  AND UPPER(T0."USER_CODE") = UPPER(?)
  AND UPPER(T0."E_Mail") = UPPER(?)`,Ug=`SELECT T0."U_NAME" as "UserName", T0."E_Mail" "Email" FROM ${y.CompanyDB}.OUSR T0
  WHERE T0."INTERNAL_K" = ?`,xg=`SELECT DISTINCT T0."INTERNAL_K" "U_UserId", T0."U_NAME" as "UserName"
  FROM ${y.CompanyDB}.OUSR T0, ${y.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${y.CompanyDB}."@PORTALPERMISSIONS" T2, ${y.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND  T1."U_GroupName" LIKE `,Lg=`SELECT DISTINCT T1."U_GroupName", T1."U_GroupId"
  FROM ${y.CompanyDB}.OUSR T0, ${y.CompanyDB}."@PORTALUSERGROUPS" T1
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T0."INTERNAL_K" = ?`,wg=`SELECT T3."U_ModuleName", T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${y.CompanyDB}.OUSR T0, ${y.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${y.CompanyDB}."@PORTALPERMISSIONS" T2, ${y.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
  ORDER BY T3."U_ModuleName" ASC`,vg=`SELECT T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${y.CompanyDB}.OUSR T0, ${y.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${y.CompanyDB}."@PORTALPERMISSIONS" T2, ${y.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
    AND T3."U_ModuleName" IN `,_g=`SELECT F."ExpnsCode" "FreightCode", F."ExpnsName" "FreightName"
  FROM ${y.CompanyDB}.OEXD F`,Bg=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${y.CompanyDB}."OPOR" T0, ${y.CompanyDB}."POR3" T1, ${y.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `,Pg=`SELECT T1."BPLId", T1."BPLName" FROM ${y.CompanyDB}.OBPL T1`,Mg=`SELECT "WhsCode" FROM ${y.CompanyDB}.OWHS WHERE "U_PICKLIST"='Y'`,Fg=`SELECT T1."BPLId", T2."BPLName", T1."AcsDsbldBP"
    FROM ${y.CompanyDB}.OUSR T0, ${y.CompanyDB}.USR6 T1, ${y.CompanyDB}.OBPL T2
  WHERE T0."USER_CODE" = T1."UserCode"
    AND T1."BPLId" = T2."BPLId"
    AND T2."Disabled" != 'Y'
    AND T0."INTERNAL_K" = ?`,Wg=`SELECT T0."ItemCode", T0."ItemName", T0."InvntryUom" FROM ${y.CompanyDB}.OITM T0
    WHERE `,$g=`SELECT 
  T0."ItemCode", 
  T0."WhsCode", 
  T0."OnHand", 
  T2."SalUnitMsr" AS "SalesUOM"
FROM 
  ${y.CompanyDB}.OITW T0
JOIN ${y.CompanyDB}.OWHS T1 ON T0."WhsCode" = T1."WhsCode"
JOIN ${y.CompanyDB}.OITM T2 ON T0."ItemCode" = T2."ItemCode"`,kg=`SELECT A."ItemCode", A."ItemName", A."CodeBars", A."FrgnName", C."WhsCode", D."BinCode", D."AbsEntry" "BinAbsEntry", C."OnHandQty",
    A."ManBtchNum", A."ManSerNum", A."InvntItem", A."TreeType",
    (SELECT MAX(B."Price") FROM  ${y.CompanyDB}.ITM1 B
      WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"=?) AS "Price"
  FROM ${y.CompanyDB}.OITM A, ${y.CompanyDB}.OIBQ C, ${y.CompanyDB}.OBIN D
WHERE A."ItemCode"=C."ItemCode"
  AND D."AbsEntry"=C."BinAbs"
  AND C."OnHandQty">0`,Hg=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", W."WhsName", A."TreeType",
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${y.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."ListNum" AS "PriceList",
    (SELECT G."ListName" FROM  ${y.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."ListNum") AS "PriceListName",
      A."U_FCCC" AS "FCCCItem",
      A."SalUnitMsr" as "SalesUOM",
      (SELECT MAX(B."Price") FROM  ${y.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."ListNum") AS "Price"
    FROM 
      ${y.CompanyDB}.OITM A
      LEFT JOIN ${y.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${y.CompanyDB}.OWHS W on B."WhsCode"=W."WhsCode"
      LEFT JOIN ${y.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${y.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${y.CompanyDB}.OCRD O ON O."CardCode" = ?
      LEFT JOIN ${y.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,Vg=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", W."WhsName", A."TreeType",
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${y.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."U_PrcList" AS "PriceList",
    (SELECT G."ListName" FROM  ${y.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."U_PrcList") AS "PriceListName",
    A."U_FCCC" AS "FCCCItem",
    A."SalUnitMsr" as "SalesUOM",
      (SELECT MAX(B."Price") FROM  ${y.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."U_PrcList") AS "Price",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${y.CompanyDB}.SPP1 P 
          WHERE P."ItemCode" = A."ItemCode"
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode"= ? OR P."CardCode" = '*1')) 
            THEN 'Y'
    ELSE 'N'
      END AS "DiscApplied"
    FROM 
      ${y.CompanyDB}.OITM A
      LEFT JOIN ${y.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${y.CompanyDB}.OWHS W on B."WhsCode"=W."WhsCode"
      LEFT JOIN ${y.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${y.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${y.CompanyDB}.OBPL O ON O."BPLId" = ?
      LEFT JOIN ${y.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,Jg=`SELECT T0."AbsEntry", T0."BinCode"
  FROM ${y.CompanyDB}."OBIN" T0`,qg=`SELECT IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry"
  FROM ${y.CompanyDB}.OBIN D
    LEFT JOIN ${y.CompanyDB}.OIBQ C ON D."AbsEntry" = C."BinAbs"
  WhERE C."WhsCode" = ? AND C."ItemCode" = ?`,Gg=`SELECT DISTINCT T0."ItemCode", T0."BatchNum", T0."IntrSerial", T2."WhsCode", T2."BinCode",
T2."AbsEntry" "BinAbsEntry", T0."Quantity", T0."InDate"
  FROM ${y.CompanyDB}."OIBT" T0, ${y.CompanyDB}."OIBQ" T1, ${y.CompanyDB}."OBIN" T2
WHERE T0."ItemCode"=T1."ItemCode" 
  AND T0."WhsCode"=T2."WhsCode"
  AND T1."BinAbs"=T2."AbsEntry"
  AND T0."Quantity" > 0
  AND T1."OnHandQty" > 0`,jg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "BatchNumberProperty",SUM(A."OnHandQty") "OnHandQty"
FROM ${y.CompanyDB}.OBBQ A
  INNER JOIN ${y.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode"
  INNER JOIN ${y.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,zg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "InternalSerialNumber", B."MnfSerial" AS "ManufacturerSerialNumber", SUM(A."OnHandQty") "OnHandQty"
FROM ${y.CompanyDB}.OSBQ A 
  INNER JOIN ${y.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${y.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,Qg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "BatchNumberProperty",A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${y.CompanyDB}.OBBQ A 
  INNER JOIN ${y.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${y.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${y.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${y.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,Yg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "InternalSerialNumber", B."MnfSerial" AS "ManufacturerSerialNumber", A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${y.CompanyDB}.OSBQ A 
  INNER JOIN ${y.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${y.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${y.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${y.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,Kg=`SELECT DISTINCT T0."NumAtCard" as "VendorRefNo"
    FROM ${y.CompanyDB}.OPDN T0
  WHERE T0."NumAtCard" IS NOT NULL
    AND T0."CANCELED" NOT IN ('Y','C')
    AND T0."NumAtCard"=`,Xg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."U_PortalGroupId", T1."U_GroupName", T0."U_PortalUser", 
    T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked"
  FROM ${y.CompanyDB}.OUSR T0
    FULL OUTER JOIN ${y.CompanyDB}."@PORTALUSERGROUPS" T1
    ON T0."U_PortalGroupId" = T1."U_GroupId"
  WHERE T0."U_PortalUser" = ?
    AND T0."U_NAME" IS NOT NULL
  ORDER BY T0."U_PortalUser" DESC, T0."U_NAME" ASC`,Zg=`SELECT T0."U_GroupId", T0."U_GroupName", T1."U_PermissionId", T1."U_ModuleId", T2."U_ModuleName", 
    T1."U_AllowRead", T1."U_AllowWrite", T1."U_AllowCancel", T1."U_AllowCreate"
  FROM ${y.CompanyDB}."@PORTALUSERGROUPS" T0
    FULL OUTER JOIN ${y.CompanyDB}."@PORTALPERMISSIONS" T1 ON T0."U_GroupId" = T1."U_GroupId"
    FULL OUTER JOIN ${y.CompanyDB}."@PORTALMODULES" T2 ON T1."U_ModuleId" = T2."U_ModuleId"
  WHERE T0."U_GroupName" IS NOT NULL
    ORDER BY T2."U_ModuleName" ASC, T0."U_GroupName" ASC`,e0=`SELECT T0."U_PermissionId", T0."U_GroupId", T0."U_ModuleId", T1."U_ModuleName", T0."U_AllowRead", T0."U_AllowWrite", 
    T0."U_AllowCancel", T0."U_AllowCreate"
  FROM ${y.CompanyDB}."@PORTALPERMISSIONS" T0, ${y.CompanyDB}."@PORTALMODULES" T1
  WHERE T0."U_ModuleId" = T1."U_ModuleId"
    AND T0."U_GroupId" = `,t0=`SELECT T0."U_NAME" as "UserName", T0."U_PortalGroupId" FROM ${y.CompanyDB}.OUSR T0
    WHERE T0."U_PortalGroupId"=`,o0=`SELECT T0."U_ModuleId", T0."U_ModuleName" FROM ${y.CompanyDB}."@PORTALMODULES" T0
    ORDER BY T0."U_ModuleName"`,r0=`SELECT T0."U_GroupId", T0."U_GroupName" FROM ${y.CompanyDB}."@PORTALUSERGROUPS" T0
    ORDER BY T0."U_GroupName"`,s0=`SELECT T0."INTERNAL_K" as "U_UserId", T0."U_NAME" as "UserName"
    FROM ${y.CompanyDB}.OUSR T0
  WHERE T0."U_PortalUser"='Y'
    ORDER BY T0."U_NAME"`,n0=`INSERT INTO ${y.CompanyDB}."@PORTALUSERGROUPS" ("Code", "Name", "U_GroupName", "U_GroupId")
    VALUES (?, ?, ?, ?)`,a0=`INSERT INTO ${y.CompanyDB}."@PORTALPERMISSIONS" ("Code", "Name", "U_GroupId", "U_ModuleId",
    "U_AllowRead", "U_AllowWrite", "U_AllowCancel", "U_AllowCreate", "U_PermissionId")
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,i0=`UPDATE ${y.CompanyDB}."@PORTALUSERGROUPS"
    SET "Code"=?, "Name"=?, "U_GroupName"=?
  WHERE "U_GroupId"=?`,l0=`UPDATE ${y.CompanyDB}.OUSR
    SET "U_PortalPassword"=?, "U_TempPasswordFlag"=?
  WHERE "INTERNAL_K"=?`,c0=`UPDATE ${y.CompanyDB}."@PORTALPERMISSIONS"
    SET "Code"=?, "Name"=?, "U_GroupId"=?, "U_ModuleId"=?,
    "U_AllowRead"=?, "U_AllowWrite"=?, "U_AllowCancel"=?, "U_AllowCreate"=?
  WHERE "U_PermissionId"=?`,d0=`DELETE FROM ${y.CompanyDB}."@PORTALUSERGROUPS" WHERE "U_GroupId" = `,u0=`DELETE FROM ${y.CompanyDB}."@PORTALPERMISSIONS" WHERE "U_GroupId" = `,p0=`SELECT T0."DocEntry", T0."U_Name", T0."U_Description", T0."U_DocumentName", T0."U_Terms", 
    T0."U_NoOfApprovals", T0."U_MultiLevelApproval", T0."U_Active"
  FROM ${y.CompanyDB}."@APPROVALHEADER" T0`,m0=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId" FROM ${y.CompanyDB}."@APPROVALORIGINATOR" T0`,y0=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId", T0."U_ApprovalLevel"
    FROM ${y.CompanyDB}."@APPROVALAPPROVER" T0`,g0=`SELECT T0."DocEntry" FROM ${y.CompanyDB}."@APPROVALHEADER" T0
    ORDER BY T0."DocEntry" ASC`,T0=`SELECT T0."LineId" FROM ${y.CompanyDB}."@APPROVALORIGINATOR" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,h0=`SELECT T0."LineId" FROM ${y.CompanyDB}."@APPROVALAPPROVER" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,C0=`INSERT INTO ${y.CompanyDB}."@APPROVALHEADER" ("U_Name", "U_Description", "U_DocumentName", "U_Terms",
    "U_NoOfApprovals", "U_MultiLevelApproval", "U_Active", "DocEntry") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,f0=`INSERT INTO ${y.CompanyDB}."@APPROVALORIGINATOR" ("U_UserId", "DocEntry", "LineId") VALUES (?, ?, ?)`,S0=`INSERT INTO ${y.CompanyDB}."@APPROVALAPPROVER" ("U_UserId", "U_ApprovalLevel", "DocEntry", "LineId") VALUES (?, ?, ?, ?)`,E0=`UPDATE ${y.CompanyDB}."@APPROVALHEADER" SET "U_Name"=?, "U_Description"=?, "U_DocumentName"=?,
    "U_Terms"=?, "U_NoOfApprovals"=?, "U_MultiLevelApproval"=?, "U_Active"=? WHERE "DocEntry" = ?`,D0=`UPDATE ${y.CompanyDB}."@APPROVALORIGINATOR" SET "U_UserId"=? WHERE "DocEntry"=? AND "LineId"=?`,A0=`UPDATE ${y.CompanyDB}."@APPROVALAPPROVER" SET "U_UserId"=?, "U_ApprovalLevel"=? WHERE "DocEntry"=? AND "LineId"=?`,I0=`DELETE FROM ${y.CompanyDB}."@APPROVALHEADER" WHERE "DocEntry"=?`,N0=`DELETE FROM ${y.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry" = ?`,R0=`DELETE FROM ${y.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry" = ?`,b0=`DELETE FROM ${y.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry"=? AND "LineId"=?`,O0=`DELETE FROM ${y.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry"=? AND "LineId"=?`,U0=`SELECT T0."U_MultiLevelApproval", T0."U_NoOfApprovals",
  T2."U_UserId" "ApproverId", T2."U_ApprovalLevel", T3."U_NAME" as "UserName", T3."E_Mail" "Email"
    FROM ${y.CompanyDB}."@APPROVALHEADER" T0, ${y.CompanyDB}."@APPROVALORIGINATOR" T1,
    ${y.CompanyDB}."@APPROVALAPPROVER" T2, ${y.CompanyDB}.OUSR T3,
    ${y.CompanyDB}."@PORTALMODULES" T4
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T0."DocEntry" = T2."DocEntry"
    AND T0."U_Active" = 'Y'
    AND T2."U_UserId" = T3."INTERNAL_K"
    AND T1."U_UserId" = ?
    AND T4."U_ModuleId" = T0."U_DocumentName"
    AND T4."U_ModuleName" = ?`,x0=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
  T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
FROM ${y.CompanyDB}."@APPROVALSTATUS" T0, ${y.CompanyDB}.OUSR TAP
  WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
AND T0."U_DocEntry" IN `,L0=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
  FROM ${y.CompanyDB}."@APPROVALSTATUS" T0, ${y.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_DraftStatus" = ?`,w0=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
   FROM ${y.CompanyDB}."@APPROVALSTATUS" T0
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,v0=`SELECT T0."DocDate"
    FROM ${y.CompanyDB}.ODRF T0
  WHERE T0."DocEntry" = ?`,_0=`UPDATE ${y.CompanyDB}."@APPROVALSTATUS"
  SET "U_DraftStatus" = ?
WHERE "U_DocEntry" = ?
  AND "U_ApprovalLevel" = ?`,B0=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
  FROM ${y.CompanyDB}."@APPROVALSTATUS" T0, ${y.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_ApprovalLevel" = ?`,P0=`INSERT INTO ${y.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", "U_DraftStatus",
  "U_ApproverId", "U_ApprovalLevel") VALUES (?, ?, ?, ?, ?, ?)`,M0=`UPDATE ${y.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
  "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
WHERE "U_ApprovalStatusId" = ?`,F0=`UPDATE ${y.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
    WHERE "U_DraftStatus" IN ('${vs.PENDING}', '${vs.NOT_ASSIGNED}')
  AND "U_DocEntry" = ?`,W0=`UPDATE ${y.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
     WHERE "U_DocEntry" = ?`,$0=`SELECT T0."U_NoOfApprovals", T0."U_MultiLevelApproval"
    FROM ${y.CompanyDB}.ODRF T0
  WHERE T0."ObjType" = ?
    AND T0."DocEntry" = ?`,k0=`UPDATE ${y.CompanyDB}.ODRF T0 SET T0."U_TargetRecDocNum" = ?
  WHERE T0."DocEntry" = ?`,H0=`SELECT T0."U_DocEntry", T0."U_RejectedReason" FROM ${y.CompanyDB}."@APPROVALSTATUS" T0
    WHERE T0."U_DraftStatus" = '${vs.REJECTED}'
  AND T0."U_DocEntry" IN `,V0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${y.CompanyDB}."@APPROVALHEADER" T0, ${y.CompanyDB}."@APPROVALAPPROVER" T1,
  ${y.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,J0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${y.CompanyDB}."@APPROVALHEADER" T0, ${y.CompanyDB}."@APPROVALORIGINATOR" T1,
  ${y.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,q0=`SELECT T1."U_DocEntry", T1."U_DraftStatus", T0."U_DraftStatus" "ActualStatus", T0."U_OriginatorId"
  FROM ${y.CompanyDB}.ODRF T0, ${y.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
  AND T1."U_ApproverId" = ?
  AND T0."ObjType" = ?
  AND T0."CreateDate" > TO_DATE('01/03/20', 'MM/DD/YY')`,G0=`SELECT T0."DocEntry", T0."U_DraftStatus"
  FROM ${y.CompanyDB}.ODRF T0
WHERE T0."U_OriginatorId" = ?
  AND T0."ObjType" = ?`;ii.exports={dbCreds:y,serviceLayerSessionMaxAge:Ng,dbConfig:Rg,validateUserLogin:bg,validateUserEmail:Og,getUserPermissionsForAllModules:wg,checkUserPermission:vg,allFreightInfo:_g,freightInfoForPO:Bg,branch:Pg,userBranches:Fg,itemsList:Wg,itemQuantityInWarehouse:$g,picklistWarehouses:Mg,binsAndItemQuantityInWarehouse:kg,binsAndItemQuantityInWarehouseWithPrice:Hg,binsAndItemQuantityInWarehouseWithPriceList:Vg,binsList:Jg,selectInfoFromBatchSerialNo:Gg,batchForItemAndWH:jg,serialForItemAndWH:zg,getAllBinsForBatch:Qg,getAllBinsForSerial:Yg,vendorRefNoQuery:Kg,portalModules:o0,portalUserGroups:r0,updatePortalPassword:l0,portalUsers:s0,allUsers:Xg,userGroupsWithPermissions:Zg,userPermissionsForGivenGroup:e0,usersInGivenGroup:t0,insertUserGroup:n0,insertPermissions:a0,updateUserGroup:i0,updatePermissions:c0,deleteUserGroup:d0,deletePermissions:u0,selectApprovalHeader:p0,selectApprovalOriginator:m0,selectApprovalApprover:y0,allHeaderIds:g0,allApproverIds:h0,allOriginatorIds:T0,insertApprovalHeader:C0,insertApprovalOriginator:f0,insertApprovalApprover:S0,updateApprovalHeader:E0,updateApprovalOriginator:D0,updateApprovalApprover:A0,deleteApprovalTemplate1:I0,deleteApprovalTemplate2:N0,deleteApprovalTemplate3:R0,deleteApprovalOriginator:b0,deleteApprovalApprover:O0,selectApproverForOriginator:U0,selectUserInfo:Ug,selectUsersInUserGroup:xg,selectUserGroupInUser:Lg,updateDraftTargetRecDocNum:k0,selectRejectedReason:H0,selectNoOfApprovalsForDraft:$0,selectDraftApproversList:x0,insertDraftApproversList:P0,updateDraftApproversList:M0,updateApprovalStatus:F0,updateApprovalStatusRecState:W0,selectDraftApprovalStatusCount:L0,updateDraftNextApprovalLevel:_0,selectDraftNextApproverDetails:B0,selectDraftApprovalDate:w0,selectDraftCreationDate:v0,selectApproverCount:V0,selectOriginatorCount:J0,selectDraftsForApprover:q0,selectDraftsForOriginator:G0,binsListForItem:qg}});var ci=p((ER,li)=>{var j0=require("../node_modules/cors/lib/index.js"),z0=()=>{let e=[process.env.REACT_APP_URL];console.log("whitelist: "+JSON.stringify(e));let t={credentials:!0,allowedHeaders:["Content-Type","Authorization"],origin:(o,r)=>{process.env.NODE_ENV==="development"||e.indexOf(o)!==-1||!o?r(null,!0):r(new Error("Not allowed by CORS"))}};return console.log("corsOptions: ",t),j0(t)};li.exports=z0});var ui=p((DR,di)=>{var Q0=require("../node_modules/redis/dist/index.js"),Dt=Q0.createClient({socket:{host:"localhost",port:6379}});Dt.on("connect",function(){console.log("Connected to Redis successfully")});Dt.on("error",e=>{console.error("Redis connection error:",e)});Dt.connect().catch(e=>{console.error("Redis initial connect failed:",e)});var Y0=async(e,t)=>{try{await Dt.set(e,t),console.log("Value set in Redis:",e,t)}catch(o){console.error("Error setting value in Redis:",o)}},K0=async e=>{try{let t=await Dt.get(e);return console.log("Value retrieved from Redis:",e,t),t}catch(t){throw console.error("Error getting value from Redis:",t),t}};di.exports={redisClient:Dt,setValue:Y0,getValue:K0}});var Ci=p((AR,hi)=>{var gi=require("../node_modules/express-session/index.js"),{RedisStore:X0}=require("../node_modules/connect-redis/dist/cjs/index.js").default?{RedisStore:require("../node_modules/connect-redis/dist/cjs/index.js").default}:require("../node_modules/connect-redis/dist/cjs/index.js"),Z0=require("../node_modules/session-file-store/index.js"),{sessionStoreTypes:pi,sessionStore:mi,cookieName:eT,sessionSecret:tT,sessionMaxAgeInHours:Ti}=f(),{redisClient:oT}=ui(),_s="";if(mi===pi.REDIS)_s=new X0({client:oT});else if(mi===pi.FILE){let e=Z0(gi);_s=new e({ttl:60*60*parseInt(Ti),retries:30,factor:2,minTimeout:500,maxTimeout:3e3,reapInterval:3600,logFn:t=>{t&&t.toLowerCase().includes("error")&&console.error("[SESSION STORE ERROR]",t)}})}var yi=process.env.HTTPS==="true",rT=gi({store:_s,name:eT,secret:tT,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{secure:yi,sameSite:yi?"none":"lax",httpOnly:!0,maxAge:1e3*60*60*parseInt(Ti)}});hi.exports=rT});var A=p((IR,Si)=>{var Bs=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:Ps}=D(),sT=(e,t)=>{let o=Bs.createConnection();o.connect(Ps,async r=>{r&&(console.error(r),t(r,null)),o.exec(e,(s,n)=>{s&&(console.error(s),t(s,null)),t(null,n),o.disconnect(a=>{a&&console.error(a)})})})},fi=(e,t=[],o=0)=>{Array.isArray(t)||(t=[t]);let r=["rc=10060","rc=10054","rc=10051","rc=10053"],s=3,n=2e3,a;try{return a=Bs.createConnection(),a.connect(Ps),a.exec(e,t)}catch(i){let c=i&&i.message?i.message:"";if(r.some(d=>c.includes(d))&&o<s){let d=n*(o+1);console.warn(`\u26A0\uFE0F HANA connection failed (attempt ${o+1}/${s}), retrying in ${d}ms... Error: ${c.substring(0,100)}`);let u=Date.now();for(;Date.now()-u<d;);return fi(e,t,o+1)}if(i&&i.message&&i.message.includes("rc=10060")){let d=new Error(`\u{1F534} HANA DB SERVER UNREACHABLE: Cannot connect to ${process.env.HANA_HOST}:${process.env.HANA_PORT}. Original: ${i.message}`);throw d.isHanaDown=!0,console.error("executeWithValues: HANA DB is DOWN after "+s+" retries - "+JSON.stringify(i)),d}throw console.error("executeWithValues: "+JSON.stringify(i)),i}finally{if(a)try{a.disconnect()}catch{}}},nT=(e,t)=>{if(!t.length)return 0;let o;try{return o=Bs.createConnection(),o.connect(Ps),o.prepare(e).execBatch(t)}catch(r){throw console.error("executeBatchInsertUpdate: "+JSON.stringify(r)),r}finally{if(o)try{o.disconnect()}catch{}}};Si.exports={executeQuery:sT,executeWithValues:fi,executeBatchInsertUpdate:nT}});var Ms=p((RR,Di)=>{var{dbCreds:we}=D(),{draftObjectCodes:Ei,recordState:NR}=f(),aT=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName"
    FROM ${we.CompanyDB}.ODRF T0, ${we.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${Ei.STOCK_TRANSFER_REQUEST}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,iT=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode"
  FROM ${we.CompanyDB}.ODRF T0, ${we.CompanyDB}.OUSR TOR, ${we.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${Ei.STOCK_TRANSFER_REQUEST}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,lT=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${we.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,cT=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
  T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
  T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
    FROM ${we.CompanyDB}.OWTQ T0
  LEFT OUTER JOIN ${we.CompanyDB}.OUSR TOR ON T0."U_OriginatorId" = TOR."INTERNAL_K"
  WHERE T0."DocStatus" = 'O'`,dT=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation", T1."U_FromBinLoc"
 FROM ${we.CompanyDB}.WTQ1 T1
   WHERE T1."DocEntry" IN `;Di.exports={selectStockTransRequestDrafts:aT,selectStockTransRequestDraftsWithMultiApprover:iT,selectApprovedSTR:cT,selectItemDetailsForSTRDrafts:lT,selectItemDetailsForSTRs:dT}});var Fs=p((bR,Ii)=>{var{dbCreds:Ae}=D(),{draftObjectCodes:Ai}=f(),uT=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."U_TargetRecDocNum",
  T0."U_ToBinLocation", T0."BPLName"
    FROM ${Ae.CompanyDB}.ODRF T0, ${Ae.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${Ai.STOCK_TRANSFER}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,pT=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName"
  FROM ${Ae.CompanyDB}.ODRF T0, ${Ae.CompanyDB}.OUSR TOR, ${Ae.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${Ai.STOCK_TRANSFER}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,mT=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", TRW."unitMsr" AS "InvntryUom",
  TRW."WhsCode", TRW."FromWhsCod" as "FromWarehouse", "U_FromBinLoc", TRW."U_ToBinLocation"
FROM ${Ae.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,yT=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
 T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
 T0."U_ToBinLocation", T0."BPLName"
    FROM ${Ae.CompanyDB}.OWTR T0, ${Ae.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."U_DraftStatus" = 'AUTO_APPROVED'`,gT=`SELECT T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
 FROM ${Ae.CompanyDB}.WTR1 T1
   WHERE T1."DocEntry" IN `,TT=`SELECT T0."DocEntry", T0."DocNum"
   FROM ${Ae.CompanyDB}.OWTR T0
 WHERE T0."DocNum" = ?`;Ii.exports={selectStockTransDrafts:uT,selectStockTransDraftsWithMultiApprover:pT,selectApprovedSTs:yT,selectItemDetailsForSTDrafts:mT,selectItemDetailsForSTs:gT,selectSTDocEntry:TT}});var Ws=p((OR,Ri)=>{var so=A(),hT=D(),It=Ms(),{userRoles:At,draftStatus:CT}=f(),Ni=' ORDER BY T0."DocEntry" ASC',fT=(e,t)=>{console.log("*** getTransferRequestRecords - req.query: "+JSON.stringify(e.query)),console.log("*** getTransferRequestRecords - req.params: "+JSON.stringify(e.params));let o=[],r=[],s=[],n=[],a=[],i=[],{userId:c}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let l;e.params.recordType==="direct"?l=It.selectItemDetailsForSTRs:e.params.recordType==="draft"&&(l=It.selectItemDetailsForSTRDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=so.executeWithValues(l+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&c){let l,d="";if(e.query.userRole==At.APPROVER?l=It.selectStockTransRequestDraftsWithMultiApprover:e.query.userRole==At.ORIGINATOR&&(l=It.selectStockTransRequestDrafts,d=` AND T0."U_OriginatorId" = ? ${Ni}`,i=Zo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+d,[c])),e.query.userRole==At.ADMIN){let u=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                        AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,m=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(u=u+' AND T0."U_DraftStatus" IN (?)',m.push(e.query.status)),i=Zo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+u,m),u=u+Ni,o=so.executeWithValues(It.selectStockTransRequestDrafts+u,m)}else o=so.executeWithValues(l+d,[c]);Array.isArray(o)&&o.length&&(o.forEach(u=>{r.push(u.DocEntry)}),Array.isArray(r)&&r.length&&(e.query.userRole==At.ORIGINATOR||e.query.userRole==At.ADMIN||e.query.userRole==At.APPROVER)&&(s=so.executeWithValues(hT.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),Array.isArray(s)&&s.length&&o.forEach(u=>{n=[],s.forEach(m=>{u.DocEntry==m.U_DocEntry&&n.push(m)}),u.approvers=n}))),t.send([...o,...i])}else e.query.requestStatus===CT.APPROVED&&(console.log("***** getApprovedSTRRecords"),i=Zo(),t.send(i))}catch(l){console.log("getTransferRequestRecords - controller - error: "+JSON.stringify(l)),t.status(500).send({message:l.message})}},Zo=(e="",t=[])=>{let o=[];try{return o=so.executeWithValues(It.selectApprovedSTR+e,t),o}catch(r){throw r}};Ri.exports={getTransferRequestRecords:fT,getApprovedSTRRecords:Zo}});var Oi=p((UR,bi)=>{var ST=require("../node_modules/nodemailer/lib/nodemailer.js"),ET=ST.createTransport({host:process.env.SMTP_SERVER,port:25,secure:!1,auth:{user:process.env.SMTP_USERNAME,pass:process.env.SMTP_PASSWORD},tls:{rejectUnauthorized:!1}});bi.exports={transporter:ET}});var Ie=p((xR,xi)=>{var Ui=require("path"),{transporter:DT}=Oi(),AT=async(e,t,o)=>{let r={from:process.env.SMTP_USERNAME,to:e,subject:t,html:o,attachments:[{filename:"logo.png",path:Ui.join(__dirname,"../assets/img/client-logo.png"),cid:"client_logo_pic"},{filename:"n-app-logo.png",path:Ui.join(__dirname,"../assets/img/n-app-logo.png"),cid:"app_logo_pic"}]};console.log("__dirname: "+__dirname);try{console.log("Sending mail....");let s=await DT.sendMail(r);return console.log("Email sent: "+s.response),!0}catch(s){return console.log("sendMail: "+JSON.stringify(s)),!1}};xi.exports={sendMail:AT}});var ks=p((_R,wi)=>{var Rt=A(),IT=D(),et=Fs(),{sendMail:LR}=Ie(),{userRoles:Nt,portalModules:wR,draftStatus:vR}=f(),Li=' ORDER BY T0."DocEntry" ASC',NT=(e,t)=>{console.log("### getTransferRecords - req.query: "+JSON.stringify(e.query));let o=[],r=[],s=[],n=[],a=[],i=[],{userId:c}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let l;e.params.recordType==="direct"?l=et.selectItemDetailsForSTs:e.params.recordType==="draft"&&(l=et.selectItemDetailsForSTDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=Rt.executeWithValues(l+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&c){let l,d="";if(e.query.userRole==Nt.APPROVER?l=et.selectStockTransDraftsWithMultiApprover:e.query.userRole==Nt.ORIGINATOR&&(l=et.selectStockTransDrafts,d=` AND T0."U_OriginatorId" = ? ${Li}`,i=$s(d,[c])),e.query.userRole==Nt.ADMIN){let u=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                      AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,m=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(u=u+' AND T0."U_DraftStatus" IN (?)',m.push(e.query.status)),u=u+Li,o=Rt.executeWithValues(et.selectStockTransDrafts+u,m),i=$s(u,m)}else o=Rt.executeWithValues(l+d,[c]);if(Array.isArray(o)&&o.length&&(o.forEach(u=>{r.push(u.DocEntry)}),Array.isArray(r)&&r.length)){(e.query.userRole==Nt.ORIGINATOR||e.query.userRole==Nt.ADMIN||e.query.userRole==Nt.APPROVER)&&(s=Rt.executeWithValues(IT.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),console.log("allApprovers: "+JSON.stringify(s)),Array.isArray(s)&&s.length&&o.forEach(m=>{n=[],s.forEach(g=>{m.DocEntry==g.U_DocEntry&&n.push(g)}),m.approvers=n}));let u=Rt.executeWithValues(et.selectItemDetailsForSTDrafts+`(${r})`);if(Array.isArray(u)&&u.length){let m;o.forEach(g=>{a=[],u.forEach(C=>{g.DocEntry===C.DocEntry&&a.push(C),m||(m=C.FromWhsCod)}),g.itemList=a,g.FromWhsCod=m})}}t.send([...o,...i])}}catch(l){console.log("getTransferRecords - controller - error: "+JSON.stringify(l)),t.status(500).send({message})}},$s=(e="",t=[])=>{let o=[0],r=[],s=[];try{return s=Rt.executeWithValues(et.selectApprovedSTs+e,t),console.log("reqsCreatedByApprover: "+JSON.stringify(s)),s}catch(n){throw n}};wi.exports={getTransferRecords:NT,getApprovedSTRecords:$s}});var Bi=p((BR,_i)=>{var{dbCreds:vi}=D(),RT=`UPDATE ${vi.CompanyDB}.OBTN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`,bT=`UPDATE ${vi.CompanyDB}.OSRN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`;_i.exports={updateReservedCustForBatch:RT,updateReservedCustForSerial:bT}});var Mi=p((PR,Pi)=>{var{dbCreds:$}=D(),OT=`SELECT T0."ItemCode", T0."DistNumber" As "U_Batch", T0."U_Width" As "U_Width", T0."U_Height" As "U_Height", 
    T0."U_Length" As "U_Length", 0 AS "U_NoOfPcs",
    (IFNULL(B."OnHandQty", IFNULL(T1."Quantity",0))-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
    0 AS "U_SelQty",
    (IFNULL(B."OnHandQty", IFNULL(T1."Quantity", 0)) - IFNULL(T1."CommitQty", 0)) / 
    CASE WHEN (IFNULL(T0."U_Height",0) > 0 AND IFNULL(T0."U_Width",0) > 0 AND IFNULL(T0."U_Length",0) > 0) 
      THEN ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") 
      ELSE 1 
    END AS "U_AvlPcs",
    0 AS "U_BalPcs",
    0 AS "U_BalAvlQty",
    C."AbsEntry" AS "BinAbsEntry",
    C."BinCode" AS "BinCode"
  FROM ${$.CompanyDB}.OBTN T0
    INNER JOIN ${$.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${$.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${$.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
  WHERE 1=1`,UT=`SELECT DISTINCT T0."ItemCode", T0."DistNumber" AS "U_Batch", T0."U_Width" As "U_Width", 
      T0."U_Height" As "U_Height", 
      T0."U_Length" As "U_Length", 
      0 AS "U_NoOfPcs",
      (IFNULL(B."OnHandQty", IFNULL(T1."Quantity",0))-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
      0 AS "U_SelQty",
      (IFNULL(B."OnHandQty", IFNULL(T1."Quantity", 0)) - IFNULL(T1."CommitQty", 0)) / 
        CASE WHEN (IFNULL(T0."U_Height",0) > 0 AND IFNULL(T0."U_Width",0) > 0 AND IFNULL(T0."U_Length",0) > 0) 
          THEN ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") 
          ELSE 1 
        END AS "U_AvlPcs",
      0 AS "U_BalPcs",
      0 AS "U_BalAvlQty",
      C."AbsEntry" AS "BinAbsEntry",
      C."BinCode" AS "BinCode"
    FROM ${$.CompanyDB}.OBTN T0
      LEFT JOIN ${$.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${$.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${$.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,xT=`SELECT DISTINCT T0."ItemCode", '' AS "U_Batch", T0."U_Width" As "U_Width", 
      T0."U_Height" As "U_Height", 
      T0."U_Length" As "U_Length", 
      0 AS "U_NoOfPcs",
      (IFNULL(B."OnHandQty", IFNULL(T1."Quantity",0))-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
      0 AS "U_SelQty",
      (IFNULL(B."OnHandQty", IFNULL(T1."Quantity", 0)) - IFNULL(T1."CommitQty", 0)) / 
        CASE WHEN (IFNULL(T0."U_Height",0) > 0 AND IFNULL(T0."U_Width",0) > 0 AND IFNULL(T0."U_Length",0) > 0) 
          THEN ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") 
          ELSE 1 
        END AS "U_AvlPcs",
      0 AS "U_BalPcs",
      0 AS "U_BalAvlQty",
      C."AbsEntry" AS "BinAbsEntry",
      C."BinCode" AS "BinCode"
    FROM ${$.CompanyDB}.OBTN T0
      LEFT JOIN ${$.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${$.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${$.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,LT=`SELECT T0."ItemCode",
        T0."DistNumber" AS "U_Batch",
        T0."U_Width",
        T0."U_Height",
        T0."U_Length",
        0 AS "U_NoOfPcs",
        (IFNULL(B."OnHandQty", IFNULL(T1."Quantity",0))-IFNULL(T1."CommitQty",0)) AS "U_AvlQty",
        0 AS "U_SelQty",
        ROUND((IFNULL(B."OnHandQty", IFNULL(T1."Quantity",0))-IFNULL(T1."CommitQty",0)) / 
          CASE WHEN (IFNULL(T0."U_Height",0) > 0 AND IFNULL(T0."U_Width",0) > 0 AND IFNULL(T0."U_Length",0) > 0) 
            THEN ((T0."U_Height"/1000) * (T0."U_Width"/1000) * T0."U_Length") 
            ELSE 1 
          END, 5) AS "U_AvlPcs",
        0 AS "U_BalPcs",
        0 AS "U_BalAvlQty",
        C."AbsEntry" AS "BinAbsEntry",
        C."BinCode" AS "BinCode"
      FROM ${$.CompanyDB}."OBTN" T0
      LEFT JOIN ${$.CompanyDB}."OBTQ" T1
        ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
      LEFT JOIN ${$.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${$.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
      WHERE 1=1`,wT=`SELECT DISTINCT T0."ItemCode",
       '' AS "U_Batch",
       T0."U_Width",
       T0."U_Height",
       T0."U_Length",
       0 AS "U_NoOfPcs",
       0 AS "U_AvlQty",
       0 AS "U_SelQty",
       0 AS "U_AvlPcs",
       0 AS "U_BalPcs",
       0 AS "U_BalAvlQty",
       NULL AS "BinAbsEntry",
       NULL AS "BinCode"
    FROM ${$.CompanyDB}."OBTN" T0
    LEFT JOIN ${$.CompanyDB}."OBTQ" T1
      ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
    WHERE 1=1`,vT=`SELECT 1
      FROM ${$.CompanyDB}."OBTN" S0
    INNER JOIN ${$.CompanyDB}."OBTQ" S1
      ON S0."SysNumber"=S1."SysNumber" AND S0."ItemCode"=S1."ItemCode"
      WHERE S0."U_Width"  = T0."U_Width"
        AND S0."U_Height" = T0."U_Height"
        AND S0."U_Length" = T0."U_Length"`;Pi.exports={selectTimYardItemInfo:OT,selectTimYardItemInitialInfo1:UT,selectTimYardItemInitialInfo2:xT,selectTimyardItemInitialInfo3:LT,selectTimyardItemInitialInfo4:wT,selectTimYardItemExistsCheck:vT}});var L=p((MR,$i)=>{var Fi=["January","February","March","April","May","June","July","August","September","October","November","December"],Wi=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],_T=async e=>{let t=require("dns"),o=e.connection.remoteAddress;return o==="127.0.0.1"||o==="::1"?"localhost":new Promise((r,s)=>{t.reverse(o,(n,a)=>{if(n)console.error(n),r(o);else{let i=a[0]||o;r(i)}})})},BT=(e,t)=>{try{let o=e.getTime(),r=t.getTime();return Math.abs(o-r)/(1e3*60)}catch(o){return console.log(o),0}},PT=(e,t)=>{e=new Date(e);let o="NA";if(e!="Invalid Date"){let r=e.getDate().toString().padStart(2,"0"),s=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getFullYear(),a=e.toLocaleString("default",{month:"short"});if(t.includes("MMMM D, YYYY")?o=`${Fi[e.getMonth()]} ${e.getDate()}, ${n}`:t.includes("MMM D, YYYY")?o=`${Fi[e.getMonth()].substr(0,3)} ${e.getDate()}, ${n}`:t.includes("YYYY-MM-DD")?o=n+"-"+s+"-"+r:t.includes("YYYY/MM/DD")?o=n+"/"+s+"/"+r:t==="DD/MM/YYYY"?o=r+"/"+s+"/"+n:t==="DD/MM/YY"?o=r+"/"+s+"/"+n.toString().substr(-2):t==="DDMMM"?o=r+a:["DDMM","ddmm"].includes(t)&&(o=r+s),t.includes("hh:mm")){let i=parseInt(e.getHours(),10);console.log("hour: "+i);let c="AM";i>12?(i-=12,c="PM"):i===0&&(i=12),o=`${o} ${i}:${e.getMinutes().toString().padStart(2,"0")} ${c}`}else t.includes("HH24:MI:SS.FF2")?o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}.00`:t.includes("HH24:MI:SS")&&(o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`)}return o},MT=e=>{let t=new Date(e);return t instanceof Date&&!isNaN(t)},FT=()=>{let e=new Date().getTime(),t=Math.floor(Math.random()*Math.pow(10,15)),o=Math.floor(Math.random()*Math.pow(10,15));console.log("random1: "+t+" random2: "+o+" millisec: "+e);let r=(e+t+o).toString();return r.slice(r.length-9)},WT=(e,t,o,r,s,n)=>{let a=month=dow="*";if(console.log(`cycle: ${e}, dayOfWeek: ${t}, dayOfMonth: ${o}, hour: ${r}, minute: ${s}, amPm: ${n}`),r=parseInt(r),n==="PM"&&r<12?r+=12:n==="AM"&&r===12&&(r=0),e==="Weekly")for(let i=0;i<Wi.length;i++)Wi[i]===t&&(dow=i);else e==="Monthly"&&(a=o);return[s,r,a,month,dow].join(" ")};$i.exports={formatDate:PT,getRandomNo:FT,getCronExpression:WT,getClientHostname:_T,getTimeDifference:BT,isValidDate:MT}});var ve=p(_=>{var{isValidDate:ki}=L(),$T=50;_.buildHeaderRecQuery=(e,t,o=null,r="DocDate")=>{let s="",n="";if(t.searchKey){let c=['T0."DocNum"','T0."NumAtCard"','T0."Comments"'];o&&c.push(...o),s+=_.buildWildCardSearchCondition(c,t.searchKey),t.salesEmployeeCode&&(s+=_.buildEqualCondition('T0."SlpCode"',t.salesEmployeeCode)),t.locationName&&(s+=_.buildEqualCondition('T0."U_Location"',t.locationName)),n=_.buildLimitOffset(1,$T)}else{let c=_.buildHeaderRecFilterConditions(t,r);s=c.filter,n=c.limitOffset}t.IsHomeDelivery&&(s+=_.buildEqualCondition('T0."U_IsHomeDelivery"',t.IsHomeDelivery),t.userId&&(s+=_.buildEqualCondition('T0."U_DeliveryAgentId"',t.userId)));let a=' ORDER BY T0."DocNum" ASC';return e+s+a+n};_.buildRowLevelQuery=(e,t)=>{let o="";t.lineStatus&&(o+=_.buildEqualCondition('T1."LineStatus"',t.lineStatus));let r=' ORDER BY T1."LineNum" ASC';return e+`(${t.docNum.toString()})`+o+r};_.buildHeaderRecFilterConditions=(e,t)=>{let o="",r="";return e.fromDate&&e.toDate&&(o+=_.buildDateRangeCondition(`T0."${t}"`,e.fromDate,e.toDate)),e.cardCode&&(o+=_.buildEqualCondition('T0."CardCode"',e.cardCode)),e.docStatus&&(o+=_.buildEqualCondition('T0."DocStatus"',e.docStatus)),e.locationName&&(o+=_.buildEqualCondition('T0."U_Location"',e.locationName)),e.salesEmployeeCode&&(o+=_.buildEqualCondition('T0."SlpCode"',e.salesEmployeeCode)),e.pageNum&&e.pageSize&&(r=_.buildLimitOffset(e.pageNum,e.pageSize)),{filter:o,limitOffset:r}};_.buildLimitOffset=(e=1,t)=>{let o="";if(!isNaN(e)&&!isNaN(t)&&t>0){let r=(e-1)*t,s=e*t;o=` LIMIT ${t} OFFSET ${r} `}return o};_.buildDateRangeCondition=(e,t,o)=>{let r="";return ki(t)&&ki(o)&&(r=` AND ${e} BETWEEN TO_DATE('${t}') AND TO_DATE('${o}') `),r};_.buildEqualCondition=(e,t)=>{let o="";return e&&t&&(o=` AND ${e} = '${t}' `),o};_.buildWildCardSearchCondition=(e,t)=>{let o="";if(t)return isNaN(t)&&(t=t.toUpperCase()),o=` AND ( ${e.map(s=>`UPPER(${s}) LIKE '%${t}%'`).join(" OR ")} ) `,o}});var tr=p(($R,qi)=>{var pe=D(),Hi=Bi(),no=Mi(),me=A(),{buildLimitOffset:kT,buildWildCardSearchCondition:HT}=ve(),{itemTypes:bt,requestTypes:Vi,EXCLUDED_ITEM_GROUPS:WR}=f(),tt=(e,t=!1,o="T0")=>e&&e.displayUserName&&e.displayUserName.startsWith("Ammunition")?` AND ${o}."ItmsGrpCod" = '130'`:t?` AND ${o}."ItmsGrpCod" != '130'`:"",VT=e=>{console.log("*** req.query: "+JSON.stringify(e.query));let t=tt(e.userSessionLog,!0,"T0"),o="",r=[],s="",n="";e.pageNum&&e.pageSize&&(o=kT(e.pageNum,e.pageSize)),e.searchKey&&(s=HT(['T0."ItemCode"','T0."ItemName"','T0."FrgnName"'],e.searchKey));let a=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."InvntryUom",
             T0."ManBtchNum", T0."ManSerNum", T0."InvntItem", T0."TreeType",
             T0."CodeBars", T0."AvgPrice", T0."SpcialDisc" "Discount",
             (SELECT MAX(A."Price") FROM  ${pe.dbCreds.CompanyDB}.ITM1 A 
                WHERE A."ItemCode"=T0."ItemCode" AND A."PriceList"='1') AS "Price"
              FROM ${pe.dbCreds.CompanyDB}.OITM T0
             WHERE T0."frozenFor" = 'N' ${t}`;if(e.itemType){let i="",c="";e.itemCodes&&(i=e.itemCodes,Array.isArray(i)?i="'"+i.join("','")+"'":i="'"+i+"'",c=` AND T0."ItemCode" IN (${i})`),console.log("** itemCodes: "+i),e.itemType===bt.NORMAL?a=`SELECT T0."ItemCode"
              FROM ${pe.dbCreds.CompanyDB}.OITM T0
            WHERE T0."ManBtchNum" ='N' AND T0."ManSerNum" ='N' AND T0."frozenFor" = 'N' ${t}
              ${c}`:e.itemType===bt.LABOR&&(a=`SELECT T0."ItemCode"
              FROM ${pe.dbCreds.CompanyDB}.OITM T0
            WHERE T0."InvntItem" ='N' AND T0."frozenFor" = 'N' ${t}
              ${c}`)}n=' ORDER BY T0."ItemCode" ASC';try{console.log("getItems - sql+filter+orderBy+limitOffset: ",a+s+n+o),console.log("getItems - values: ",r);let i=me.executeWithValues(a+s+n+o,r),c=[];return e.query&&(e.itemType===bt.NORMAL||e.itemType===bt.LABOR)?(i.forEach(l=>{c.push(l.ItemCode)}),console.log("getItems - itemCodes - %s",JSON.stringify(c)),c):(console.log("getItems - rows - %s",JSON.stringify(i)),i)}catch(i){throw console.log("getItems - helper - error: "+JSON.stringify(i)),i}},JT=async e=>{let t,o=[],r="";console.log("filter.itemAndWHCodes: "+e.itemAndWHCodes);let s=tt(e.userSessionLog);if(e.type===Vi.BATCH_SERIAL_IN_A_BIN)try{let n=await Ji(e.itemType,e.itemCode,e.warehouseCode,e.binCode,e.userSessionLog);return console.log("getBatchSerialInfo: "+JSON.stringify(n)),n}catch(n){throw n}else if(e.type===Vi.BATCH_SERIAL_WITH_ALL_BINS)try{let n,a,i=[],c=[],l=er(e.itemAndWHCodes,"A");if(r=l.where+' GROUP BY A."ItemCode", C."BinCode", C."AbsEntry", A."WhsCode",B."DistNumber"',o=l.values,console.log("BATCH_SERIAL_WITH_ALL_BINS - values: "+o.toString()),n=me.executeWithValues(pe.batchForItemAndWH+r+s,o),a=me.executeWithValues(pe.serialForItemAndWH+r+s,o),Array.isArray(n)&&n.length>0){let d=er(n,"A");r=d.where,o=d.values,i=me.executeWithValues(pe.getAllBinsForBatch+r,o)}if(Array.isArray(a)&&a.length>0){let d=er(a,"A");r=d.where,o=d.values,console.log("binsListForSerial - values: "+o.toString()),c=me.executeWithValues(pe.getAllBinsForSerial+r,o),console.log("binsListForSerial - result: "+JSON.stringify(c))}if(Array.isArray(i)&&i.length>0){let d=[];n.forEach(u=>{i.forEach(m=>{u.ItemCode===m.ItemCode&&u.WhsCode===m.WhsCode&&u.BatchNumberProperty===m.BatchNumberProperty&&d.push({BatchNumberProperty:m.BatchNumberProperty,BinCode:m.BinCode,BinAbsEntry:m.BinAbsEntry,OnHandQty:m.OnHandQty})}),u.DocumentLinesBinAllocations=d,d=[]})}if(Array.isArray(c)&&c.length>0){let d=[];a.forEach(u=>{c.forEach(m=>{u.ItemCode===m.ItemCode&&u.WhsCode===m.WhsCode&&u.InternalSerialNumber===m.InternalSerialNumber&&d.push({InternalSerialNumber:m.InternalSerialNumber,BinCode:m.BinCode,BinAbsEntry:m.BinAbsEntry,OnHandQty:m.OnHandQty})}),u.DocumentLinesBinAllocations=d,d=[]})}return[...n,...a]}catch(n){throw n}else{if(console.log("filter: "+e),e.batchSerialNo&&e.binCode)r=' AND B."DistNumber" = ? AND C."BinCode" = ?',o=[e.batchSerialNo,e.binCode];else if(e.batchSerialNo)r=' AND B."DistNumber" = ?',o=[e.batchSerialNo];else if(e.warehouseCode)r+=' AND A."WhsCode" = ?',o=[e.warehouseCode],e.binCode&&(r+=' AND C."BinCode" = ?',o.push(e.binCode));else if(e.itemAndWHCodes){let n=er(e.itemAndWHCodes,"A");r=n.where,o=n.values}e.itemCode&&(r=' AND A."ItemCode" = ?',o=[e.itemCode]);try{console.log("getBatchSerialInfo - values: "+o.toString());let n=me.executeWithValues(pe.getAllBinsForBatch+r,o),a=me.executeWithValues(pe.getAllBinsForSerial+r,o);return[...n,...a]}catch(n){throw n}}},Ji=(e,t,o,r,s=null)=>{let n=[],a,i,c=tt(s);e===bt.BATCHES?i=pe.getAllBinsForBatch:e===bt.SERIAL_NUMBERS&&(i=pe.getAllBinsForSerial),t&&n.push(`A."ItemCode" IN ('${t}')`),o&&n.push(`A."WhsCode" IN ('${o}')`),r&&n.push(`C."BinCode" IN ('${r}')`),n.length&&(i=`${i} AND ${n.join(" AND ")}`),c&&(i+=c.replace("T0.","A."));try{return a=me.executeWithValues(i),console.log("getBatchSerialRecords - result: "+JSON.stringify(a)),a}catch(l){throw l}},qT=(e,t,o)=>{let r=[],s,n;e?n=Hi.updateReservedCustForBatch:t&&(n=Hi.updateReservedCustForSerial);try{return s=me.executeWithValues(n,o),console.log("setBatchSerialReservedCust - result: "+JSON.stringify(s)),s}catch(a){throw a}},er=(e,t)=>{let o=[],r="";return Array.isArray(e)&&e.length&&(e.forEach(s=>{r?r+=" OR ":r+=" AND (",!s.BatchNumberProperty&&!s.InternalSerialNumber&&(s=JSON.parse(s)),s.BatchNumberProperty||s.InternalSerialNumber?(r+=`(B."DistNumber"=? AND ${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.BatchNumberProperty?s.BatchNumberProperty:s.InternalSerialNumber),o.push(s.ItemCode),o.push(s.WhsCode)):(r+=`(${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.itemCode),o.push(s.warehouseCode))}),r+=")"),{where:r,values:o}},GT=e=>{let t=[],o,r;r=no.selectTimYardItemInfo,tt(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItems - Query: "+r);try{return o=me.executeWithValues(r),console.log("getTimYardItemRecords - result: "+JSON.stringify(o)),Array.isArray(o)&&o.length>0&&(o=o.filter(n=>parseFloat(n.U_AvlQty)>0||parseFloat(n.U_AvlPcs)>0)),o}catch(n){throw n}},jT=e=>{let t=[],o,r;r=no.selectTimYardItemInitialInfo1,tt(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItemInitial1Records - Query: "+r);try{return o=me.executeWithValues(r),o}catch(n){throw n}},zT=e=>{let t=[],o,r,s,n;r=no.selectTimyardItemInitialInfo3,tt(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),s=no.selectTimyardItemInitialInfo4,t=[],e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(s=`${s} AND ${t.join(" AND ")}`),n=no.selectTimYardItemExistsCheck,t=[],e.itemCode&&t.push(`S0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`S1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(n=`${n} AND ${t.join(" AND ")}`),r=r+" UNION "+s+" AND NOT EXISTS ("+n+" )",console.log("getTimYardItemInitialRecords - Query: "+r);try{o=me.executeWithValues(r);let i=o.map(l=>{if(l.U_Batch&&l.U_Batch.trim()!=="")return l;let d=l.ItemCode.toString().slice(-6),u="";l.U_Length!==void 0&&l.U_Length!==null&&(u=parseFloat(l.U_Length));let m=u!==""?`SC${e.warehouseCode}${d}_${u}`:`SC${e.warehouseCode}${d}`;return{...l,U_Batch:m}});console.log("getTimYardItemInitialRecords - enriched: "+JSON.stringify(i));let c=i;return Array.isArray(i)&&i.length>0&&(c=i.filter(l=>parseFloat(l.U_AvlQty)>0||parseFloat(l.U_AvlPcs)>0)),c}catch(i){throw i}};qi.exports={getItems:VT,getBatchSerialInfo:JT,getBatchSerialRecords:Ji,setBatchSerialReservedCust:qT,getTimYardItemRecords:GT,getTimYardItemInitial1Records:jT,getTimYardItemInitial3Records:zT,getAmmoFilter:tt}});var zi=p((qR,ji)=>{var Ne=A(),ye=D(),kR=Ms(),Gi=Fs(),{getApprovedSTRRecords:QT}=Ws(),{getApprovedSTRecords:YT}=ks(),{getBatchSerialInfo:KT,getItems:XT,getTimYardItemRecords:ZT,getTimYardItemInitial1Records:HR,getTimYardItemInitial2Records:VR,getTimYardItemInitial3Records:eh}=tr(),{portalModules:ao,draftObjectCodes:Hs,draftStatus:ot,itemTypes:JR}=f(),th=(e,t)=>{let o;e.query.moduleName===ao.STOCK_TRANSFER&&(o=Gi.selectSTDocEntry);try{let r=Ne.executeWithValues(o,[e.query.docNum]);console.log("getDocEntry: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getDocEntry - controller - error: "+JSON.stringify(r.message)),t.status(500).send({message:r.message})}},oh=(e,t)=>{try{t.send({serverDateTime:new Date})}catch(o){console.log("err: "+JSON.stringify(o)),t.status(500).send({message:JSON.stringify(o)})}},rh=(e,t)=>{try{let o=Ne.executeWithValues(ye.picklistWarehouses,[]);t.send(o)}catch(o){console.log("getPicklistWarehouses - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},sh=(e,t)=>{try{let o=Ne.executeWithValues(ye.userBranches,[e.session.userId]);console.log("getUserBranches- branchList: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},nh=(e,t)=>{try{let o=Ne.executeWithValues(ye.allFreightInfo,[]);console.log("getFreightList- allFreightInfo: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},ah=(e,t)=>{console.log("*** req.query: "+JSON.stringify(e.query));try{let o=XT({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){console.log("getItemsList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},ih=(e,t)=>{try{Ne.executeQuery(ye.portalModules,(o,r)=>{if(o)throw o;console.log("getPortalModules %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalModules - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},lh=(e,t)=>{let o,r=0,s=0,n=0,a=0,i=0,c=0,l,d,{userId:u}=e.session;console.log("getDraftsCount - req.session.userId: ",u);let m=[u];if(e.query.moduleName){if(e.query.moduleName==ao.STOCK_TRANSFER_REQUEST){o=Hs.STOCK_TRANSFER_REQUEST;let g=QT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[u]);Array.isArray(g)&&g.length>0&&(s=s+g.length,i=i+g.length)}else if(e.query.moduleName==ao.STOCK_TRANSFER){o=Hs.STOCK_TRANSFER;let g=YT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[u]);Array.isArray(g)&&g.length>0&&(s=s+g.length,i=i+g.length)}else e.query.moduleName==ao.DELIVERY&&(o=Hs[ao.DELIVERY],l=Gi.selectApprovedSTs+' AND T0."U_OriginatorId" = ?');o&&m.push(o);try{let g=Ne.executeWithValues(ye.selectDraftsForApprover,m),C=Ne.executeWithValues(ye.selectDraftsForOriginator,m);Array.isArray(g)&&g.length&&g.forEach(T=>{T.U_DraftStatus===ot.PENDING&&T.ActualStatus!==ot.APPROVED?r++:T.U_DraftStatus===ot.APPROVED?s++:T.U_DraftStatus===ot.REJECTED&&n++}),Array.isArray(C)&&C.length&&C.forEach(T=>{T.U_DraftStatus===ot.PENDING?a++:T.U_DraftStatus===ot.APPROVED?i++:T.U_DraftStatus===ot.REJECTED&&c++}),t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:i,originatorRejected:c})}catch(g){t.status(500).send({message:g.message})}}else t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:i,originatorRejected:c})},ch=(e,t)=>{let o=e.query.itemCode;Array.isArray(o)?o="'"+o.join("','")+"'":o="'"+o+"'",console.log("** itemCodes: "+o);let r=ye.itemQuantityInWarehouse,s=[],n=[];e.query.itemCode&&s.push(`T0."ItemCode" IN (${o})`),e.query.warehouseCode&&s.push(`T0."WhsCode" IN (${e.query.warehouseCode})`);let c=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND T2."ItmsGrpCod" = '130'`:` AND T2."ItmsGrpCod" != '130'`;s.length&&(r=`${r} AND ${s.join(" AND ")} ${c} ORDER BY T0."OnHand" DESC`),console.log("getItemCountInWarehouse - sql: "+r);try{n=Ne.executeWithValues(r),console.log("getItemCountInWarehouse - result: "+JSON.stringify(n)),t.send(n)}catch(l){t.status(500).send({message:l.message})}},dh=(e,t)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));let o="",r=[],s="",n="";e.query.searchKey&&(s=` AND (
                UPPER(A."ItemCode") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."ItemName") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."FrgnName") LIKE '%${e.query.searchKey}%' ) `);let c=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND A."ItmsGrpCod" = '130'`:` AND A."ItmsGrpCod" != '130'`,l,d=e.query.itemCode,u=e.query.warehouseCode,m=e.query.binCode,g=e.query.barCode,C=e.query.cardCode,T=e.query.branch;if(e.params.type==="available-item-qty"){l=ye.binsAndItemQuantityInWarehouse,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),e.session?.userSessionLog?.storeLocation==="Labasa"?r.push("2"):r.push("1");let h=[];d&&h.push(`A."ItemCode" IN ('${d}')`),g&&h.push(`A."CodeBars" IN ('${g}')`),u&&h.push(`C."WhsCode" IN ('${u}')`),m&&h.push(`D."BinCode" IN ('${m}')`),h.length&&(l=`${l} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',l=l+s+c+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+l)}else if(e.params.type==="available-item-qty-price"){l=ye.binsAndItemQuantityInWarehouseWithPrice,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(C);let h=[];d&&h.push(`A."ItemCode" IN ('${d}')`),g&&h.push(`F."BcdCode" IN ('${g}')`),u&&h.push(`B."WhsCode" IN ('${u}')`),m&&h.push(`D."BinCode" IN ('${m}')`),h.length&&(l=`${l} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',l=l+s+c+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+l)}else if(e.params.type==="available-item-qty-price-with-pricelist"){l=ye.binsAndItemQuantityInWarehouseWithPriceList,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(C),r.push(T);let h=[];d&&h.push(`A."ItemCode" IN ('${d}')`),g&&h.push(`F."BcdCode" IN ('${g}')`),u&&h.push(`B."WhsCode" IN ('${u}')`),m&&h.push(`D."BinCode" IN ('${m}')`),h.length&&(l=`${l} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',l=l+s+c+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+l)}else{l=ye.binsList;let h=[];u&&h.push(`T0."WhsCode" IN ('${u}')`),h.length&&(l=`${l} WHERE ${h.join(" AND ")} ORDER BY T0."BinCode" ASC`)}if(e.query.pageNum&&e.query.pageSize){let h=e.query.pageNum,E=e.query.pageSize,k=(h-1)*E,W=h*E;o=" LIMIT ? OFFSET ? ",r=[E,k]}try{let h=Ne.executeWithValues(l,r);t.send(h)}catch(h){t.status(500).send({message:h.message})}},uh=async(e,t)=>{try{let o=await KT({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){t.status(500).send({message:o.message})}},ph=async(e,t)=>{try{console.log("getTimYardItemInfo: ",e.query);let o=[];e.query.isStockCounter==="true"?o=await eh({...e.query,userSessionLog:e.session.userSessionLog}):o=await ZT({...e.query,userSessionLog:e.session.userSessionLog}),console.log("getTimYardItemInfo: "+JSON.stringify(o)),t.send(o)}catch(o){t.status(500).send({message:o.message})}},mh=async(e,t)=>{console.log("req.query"+JSON.stringify(e.query));try{let o=Ne.executeWithValues(ye.binsListForItem,[e.query.warehouseCode,e.query.itemCode]);t.send(o)}catch(o){console.log("getBins - error: "+JSON.stringify(o.message)),next(o)}};ji.exports={getDocEntry:th,getServerDateTime:oh,getUserBranches:sh,getFreightList:nh,getItemsList:ah,getPortalModules:ih,getDraftsCount:lh,getItemCountInWarehouse:ch,getBinsAndItemQtyForWarehouse:dh,getBatchSerialNoInfo:uh,getTimYardItemInfo:ph,getBinListbyItem:mh,getPicklistWarehouses:rh}});var Vs=p((GR,Qi)=>{var yh="Temporary password",gh=e=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Forgot Password</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                    
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
    padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                      <a class="" href="https://www.client.com/" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
    #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="73" />
                                    </a>
                                  </td>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
    padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                      <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="130" />
                           </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>Forgot your password?</span></h1>
  
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
   padding-bottom: 9px; padding-left: 18px;' valign="top">
    Not to worry, we got you! Here is your temporary password, you will be prompted to change it when signing in.
                                    <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">${e}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
    padding-right:48px; padding-bottom:24px; padding-left:48px; text-align: center" valign="middle">
                    Log into <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
   0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Didn't request this change?</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
   If you didn't request a new password please contact your administrator
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;Qi.exports={subject:yh,getMailBody:gh}});var or=p((jR,Yi)=>{var Js=require("../node_modules/bcrypt/bcrypt.js"),Th=async e=>{try{let o=await Js.genSalt(10);return await Js.hash(e,o)}catch(o){throw o}},hh=async(e,t)=>{let o=!1;try{o=await Js.compare(e,t)}catch(r){console.log("Bcrypt error - comparePassword: "+r)}finally{return o}};Yi.exports={generateHash:Th,comparePassword:hh}});var qs=p((zR,Ki)=>{var Ch=()=>{let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";let o="";for(let r=0;r<8;r++)o+=t.charAt(Math.floor(Math.random()*t.length));return o};Ki.exports={generatePassword:Ch}});var el=p(Zi=>{var{dbCreds:Xi}=D();Zi.selectSalesEmployeeForUser=`SELECT T0."USER_CODE", T1."SalePerson" "SlpCode"
  FROM ${Xi.CompanyDB}.OUSR T0, ${Xi.CompanyDB}.OUDG T1
WHERE T0."DfltsGroup" = T1."Code"
  AND T0."INTERNAL_K" = ?`});var io=p((YR,tl)=>{var rt=A(),Ot=D(),{generatePassword:fh}=qs(),{generateHash:Sh}=or(),{selectSalesEmployeeForUser:Eh}=el(),Dh=e=>{try{return rt.executeWithValues(Eh,[e])}catch(t){throw console.log("getSalesEmployeeForUser - controller - error: "+JSON.stringify(t.message)),t}},Gs=e=>{let t=`${Ot.selectUsersInUserGroup} '%${e}%' ORDER BY T0."U_NAME" ASC`;try{let o=rt.executeWithValues(t);return Array.isArray(o)&&o.length>0?o:void 0}catch(o){throw o}},Ah=e=>{try{let t=rt.executeWithValues(Ot.selectUserGroupInUser,e);return console.log("getUserGroupByUser- rows: "+JSON.stringify(t)),Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},Ih=e=>{try{let t=Gs(e);if(console.log("userRC: ",JSON.stringify(t)),Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.U_UserId)}),o}return}catch(t){throw t}},Nh=e=>{try{let t=Gs(e);if(Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.UserName)}),o}return}catch(t){throw t}},Rh=e=>{try{let t=rt.executeWithValues(Ot.selectUserInfo,e);return Array.isArray(t)&&t.length>0?t[0]:void 0}catch(t){throw t}},bh=e=>{try{let t=rt.executeWithValues(Ot.getUserPermissionsForAllModules,e);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},Oh=(e,t)=>{try{let o=rt.executeWithValues(Ot.validateUserEmail,[e,t]);return Array.isArray(o)&&o.length>0?o[0]:void 0}catch(o){throw o}},Uh=async e=>{try{let t=fh(),o=await Sh(t);return rt.executeWithValues(Ot.updatePortalPassword,[o,"Y",e])>0?t:void 0}catch(t){throw t}};tl.exports={getUserInfo:Rh,getUserPermissions:bh,getUsersByUserGroup:Gs,getUserGroupByUser:Ah,getUserIDsByUserGroup:Ih,getUserNamesByUserGroup:Nh,getUserInfoWithUserNameMail:Oh,setTemporaryPassword:Uh,getSalesEmployeeForUser:Dh}});var rr=p((KR,ol)=>{var{EntitySchema:xh}=require("../node_modules/typeorm/index.js");ol.exports=new xh({name:"StoreCounters",tableName:"StoreCounters",columns:{storeCounterId:{name:"StoreCounterId",primary:!0,type:"int",generated:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,unique:!1,nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,unique:!0,nullable:!1},userId:{name:"UserId",type:"int",nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",default:()=>"CURRENT_TIMESTAMP"},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeCounters"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"storeCounters"}}})});var sr=p((XR,rl)=>{var{EntitySchema:Lh}=require("../node_modules/typeorm/index.js");rl.exports=new Lh({name:"Stores",tableName:"Stores",columns:{storeId:{name:"StoreId",primary:!0,type:"int",generated:!0},storeName:{name:"StoreName",type:"nvarchar",length:200,unique:!0,nullable:!1},storeCode:{name:"StoreCode",type:"nvarchar",length:100,unique:!0,nullable:!0},location:{name:"Location",type:"nvarchar",length:400,unique:!1,nullable:!1},locationCode:{name:"LocationCode",type:"nvarchar",length:100,unique:!1,nullable:!0},defaultWarehouseCode:{name:"DefaultWarehouseCode",type:"nvarchar",length:100,unique:!1,nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}},relations:{storeWarehouses:{type:"one-to-many",target:"StoreWarehouses",inverseSide:"stores"},storeCounters:{type:"one-to-many",target:"StoreCounters",inverseSide:"stores"},storeUsers:{type:"one-to-many",target:"StoreUsers",inverseSide:"stores"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"stores"}}})});var js=p((ZR,sl)=>{var{EntitySchema:wh}=require("../node_modules/typeorm/index.js");sl.exports=new wh({name:"CashDenominations",tableName:"CashDenominations",columns:{cashDenominationId:{name:"CashDenominationId",primary:!0,type:"int",generated:!0},storeId:{name:"StoreId",type:"int",nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},trxNumber:{name:"TrxNumber",type:"int",unique:!0,nullable:!0},trxType:{name:"TrxType",type:"nvarchar",length:100,unique:!1,nullable:!1},dateTime:{name:"DateTime",type:"timestamp",nullable:!0},_5cCoin:{name:"5cCoin",type:"int",default:0},_10cCoin:{name:"10cCoin",type:"int",default:0},_20cCoin:{name:"20cCoin",type:"int",default:0},_50cCoin:{name:"50cCoin",type:"int",default:0},_1$Coin:{name:"1DollarCoin",type:"int",default:0},_2$Coin:{name:"2DollarCoin",type:"int",default:0},_5$Note:{name:"5DollarNote",type:"int",default:0},_10$Note:{name:"10DollarNote",type:"int",default:0},_20$Note:{name:"20DollarNote",type:"int",default:0},_50$Note:{name:"50DollarNote",type:"int",default:0},_100$Note:{name:"100DollarNote",type:"int",default:0}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"cashDenominations"},storeCounters:{type:"many-to-one",target:"StoreCounters",joinColumn:{name:"StoreCounterId"},inverseSide:"cashDenominations"}}})});var zs=p((tb,nl)=>{var{recordState:eb}=f(),{EntitySchema:vh}=require("../node_modules/typeorm/index.js");nl.exports=new vh({name:"ParkedTransactions",tableName:"ParkedTransactions",columns:{parkedTransactionId:{name:"ParkedTransactionsId",primary:!0,type:"int",generated:!0},transactionType:{name:"TransactionType",type:"nvarchar",length:50},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!1},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!1},transactionRefNum:{name:"TransactionRefNum",type:"nvarchar",length:"100"},nextRefNum:{name:"NextRefNum",type:"int"},data:{name:"Data",type:"nclob",nullable:!1},parkedDateTime:{name:"ParkedDateTime",type:"timestamp"}}})});var Qs=p((ob,al)=>{var{EntitySchema:_h}=require("../node_modules/typeorm/index.js");al.exports=new _h({name:"QCItemGroup",tableName:"QCItemGroup",columns:{itemGroupId:{name:"ItemGroupId",primary:!0,type:"int",generated:!0},groupName:{name:"GroupName",type:"varchar",length:100,unique:!0,nullable:!1},description:{name:"Description",type:"varchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0}},relations:{itemGroupMembers:{type:"one-to-many",target:"QCItemGroupMembers",inverseSide:"itemGroup"}}})});var Ys=p((rb,il)=>{var{EntitySchema:Bh}=require("../node_modules/typeorm/index.js");il.exports=new Bh({name:"QCItemGroupMembers",tableName:"QCItemGroupMembers",columns:{itemGroupMemberId:{name:"ItemGroupMemberId",primary:!0,type:"int",generated:!0},itemCode:{name:"ItemCode",type:"varchar",length:100,unique:!0},itemName:{name:"ItemName",type:"varchar",length:400,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0},itemGroupId:{name:"ItemGroupId",type:"int"}},relations:{itemGroup:{type:"many-to-one",target:"QCItemGroup",onDelete:"CASCADE",joinColumn:{name:"ItemGroupId"},inverseSide:"itemGroupMembers"}}})});var nr=p((sb,ll)=>{var{EntitySchema:Ph}=require("../node_modules/typeorm/index.js");ll.exports=new Ph({name:"StoreUsers",tableName:"StoreUsers",columns:{storeUserId:{name:"storeUserId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int",nullable:!1},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeUsers"}}})});var Ks=p((nb,cl)=>{var{EntitySchema:Mh}=require("../node_modules/typeorm/index.js");cl.exports=new Mh({name:"StoreWarehouses",tableName:"StoreWarehouses",columns:{storeWarehouseId:{name:"StoreWarehouseId",primary:!0,type:"int",generated:!0},warehouseCode:{name:"WarehouseCode",type:"nvarchar",length:100,unique:!1},warehouseName:{name:"WarehouseName",type:"nvarchar",length:400,unique:!1,nullable:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeWarehouses"}}})});var Xs=p((ab,dl)=>{var{EntitySchema:Fh}=require("../node_modules/typeorm/index.js");dl.exports=new Fh({name:"UserGroups",tableName:"UserGroups",columns:{userGroupId:{name:"UserGroupId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},groupId:{name:"GroupId",type:"int"},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}}})});var ar=p((ib,ul)=>{var{recordState:Wh}=f(),{EntitySchema:$h}=require("../node_modules/typeorm/index.js");ul.exports=new $h({name:"UserSessionLog",tableName:"UserSessionLog",columns:{userSessionLogId:{name:"UserSessionLogId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,nullable:!0},clientIp:{name:"ClientIp",type:"varchar",length:"100"},sessionStatus:{name:"SessionStatus",type:"nvarchar",length:50,default:Wh.ACTIVE,unique:!1,nullable:!1},loginTime:{name:"LoginTime",type:"timestamp"},logoutTime:{name:"LogoutTime",type:"timestamp",default:"",nullable:!0}}})});var re=p((lb,pl)=>{var kh=require("../node_modules/typeorm/index.js"),Hh=rr(),Vh=sr(),Jh=js(),qh=zs(),Gh=Qs(),jh=Ys(),zh=nr(),Qh=Ks(),Yh=Xs(),Kh=ar(),Xh=new kh.DataSource({type:process.env.TYPEORM_TYPE,host:process.env.HANA_HOST,port:process.env.HANA_PORT,username:process.env.HANA_USER,password:process.env.HANA_PASSWORD,schema:process.env.SERVICE_LAYER_COMPANYDB,synchronize:!1,logging:!1,entities:[Hh,Vh,Jh,qh,Gh,jh,zh,Qh,Yh,Kh]});console.log("Database configuration loaded.");pl.exports={dataSource:Xh}});var xt=p(lo=>{var{dataSource:ir}=re(),lr=ar(),Ut="userSessionLogId",Zh="loginTime",{recordState:cb}=f();lo.createUserSessionLog=async e=>{try{return await ir.getRepository(lr).save(e)}catch(t){throw t}};lo.getUserSessionLog=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ut]=e.id,delete e.id);try{let o=ir.getRepository(lr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Zh]:"DESC"}})}catch(o){throw o}};lo.updateUserSessionLog=async(e,t)=>{try{let o=ir.getRepository(lr);t[Ut]&&(e||(e=t[Ut]),delete t[Ut]);let r={};return Object.keys(t).length>0&&(r=await o.update({[Ut]:e},t)),r}catch(o){throw o}};lo.deleteUserSessionLog=async e=>{try{return await ir.getRepository(lr).delete({[Ut]:e})}catch(t){throw t}}});var st=p(ke=>{var{dataSource:cr}=re(),dr=Ks(),eC="storeWarehouseId",tC="warehouseCode";ke.parentPrimaryKey="storeId";ke.createStoreWarehouse=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[ke.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[ke.parentPrimaryKey]:t,createdBy:o,createdAt:r},await cr.getRepository(dr).save(s)}catch(s){throw s}};ke.getStoreWarehouse=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[eC]=e.id,delete e.id);try{let o=cr.getRepository(dr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[tC]:"ASC"}})}catch(o){throw o}};ke.updateStoreWarehouse=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await cr.getRepository(dr).save(r)}catch(r){throw r}};ke.deleteStoreWarehouse=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await cr.getRepository(dr).delete(t)}catch(o){throw o}}});var mr=p(co=>{var{dataSource:ur}=re(),{createStoreWarehouse:yl,updateStoreWarehouse:oC}=st(),pr=sr(),Lt="storeId",rC="storeName",ml="storeWarehouseId,";co.createStore=async e=>{try{let o=await ur.getRepository(pr).save(e);if(e.warehouses){let r=await yl(e.warehouses,o[Lt]);o.warehouses=r}return o}catch(t){throw t}};co.getStore=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Lt]=e.id,delete e.id);try{let o=ur.getRepository(pr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[rC]:"ASC"}})}catch(o){throw o}};co.updateStore=async(e,t)=>{try{let o=ur.getRepository(pr);t[Lt]&&delete t[Lt];let r;t.warehouses&&(r=t.warehouses,delete t.warehouses);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[Lt]:e},t)),r){let n=[];if(r.forEach(async a=>{a[ml]?await oC(a[ml],a):n.push(a)}),n.length>0){let a=await yl(n,e);s.warehouses=a}}return s}catch(o){throw o}};co.deleteStore=async e=>{try{return await ur.getRepository(pr).delete({[Lt]:e})}catch(t){throw t}}});var Zs=p(He=>{var{dataSource:yr}=re(),gr=rr(),sC="storeCounterId",nC="counterName";He.parentPrimaryKey="storeId";He.createStoreCounter=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[He.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[He.parentPrimaryKey]:t,createdBy:o,createdAt:r},await yr.getRepository(gr).save(s)}catch(s){throw s}};He.getStoreCounter=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[sC]=e.id,delete e.id);try{let o=yr.getRepository(gr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[nC]:"ASC"}})}catch(o){throw o}};He.updateStoreCounter=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await yr.getRepository(gr).save(r)}catch(r){throw r}};He.deleteStoreCounter=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await yr.getRepository(gr).delete(t)}catch(o){throw o}}});var en=p(Ve=>{var{dataSource:Tr}=re(),hr=nr(),aC="storeUserId",iC="userName";Ve.parentPrimaryKey="storeId";Ve.createStoreUser=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[Ve.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[Ve.parentPrimaryKey]:t,createdBy:o,createdAt:r},await Tr.getRepository(hr).save(s)}catch(s){throw s}};Ve.getStoreUser=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[aC]=e.id,delete e.id);try{let o=Tr.getRepository(hr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[iC]:"ASC"}})}catch(o){throw o}};Ve.updateStoreUser=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await Tr.getRepository(hr).save(r)}catch(r){throw r}};Ve.deleteStoreUser=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await Tr.getRepository(hr).delete(t)}catch(o){throw o}}});var tn=p(gl=>{var lC=mr(),cC=st(),dC=Zs(),uC=en(),pC=xt();gl.getUserStoreInfo=async e=>{try{let t=null,o=null,r="",s="",n="",a="",i="";console.log(`LOG LOGIN - Starting Store/Terminal lookup for UserId: ${e}`);let c=await uC.getStoreUser({userId:e});Array.isArray(c)&&c.length>0&&(t=c[0].storeId,console.log(`LOG LOGIN - Found primary Store assignment: StoreId ${t}`));let l=t?{userId:e,storeId:t}:{userId:e},d=await dC.getStoreCounter(l);if(Array.isArray(d)&&d.length>0){let u=null;if(d.length>1){console.log(`LOG LOGIN - WARNING: Multiple terminals (${d.length}) found for user ${e}. Checking last used terminal...`);let m=await pC.getUserSessionLog({userId:e},5);if(Array.isArray(m)&&m.length>0)for(let g of m){let C=d.find(T=>T.storeCounterId===g.storeCounterId);if(C){u=C,console.log(`LOG LOGIN - Stickiness: Picking last used terminal: ${u.counterName}`);break}}}u||(u=d[0]),t||(t=u.storeId,console.log(`LOG LOGIN - StoreId inferred from terminal: ${t}`)),o=u.storeCounterId,r=u.counterCode,s=u.counterName,console.log(`LOG LOGIN - Final Terminal assignment: ${s} (${r})`)}else console.log(`LOG LOGIN - No terminal assignment found for user ${e} (StoreId: ${t||"None"})`);if(t){let u=await lC.getStore({storeId:t});if(Array.isArray(u)&&u.length>0){n=u[0].locationCode,a=u[0].location;let m=await cC.getStoreWarehouse({storeId:t});Array.isArray(m)&&m.length>0&&(i=m[0].warehouseCode)}}return{storeId:t,storeCounterId:o,counterCode:r,counterName:s,locationCode:n,storeLocation:a,storeWHCode:i}}catch(t){throw console.error(`LOG LOGIN - ERROR in getUserStoreInfo for user ${e}:`,t),t}}});var hl=p(Tl=>{var{dataSource:mC}=re(),yC=sr(),Tb=rr(),hb=nr();Tl.isUserAssignedToCounter=async(e,t)=>{try{let r=await mC.getRepository(yC).createQueryBuilder("store").innerJoin("store.storeUsers","user").innerJoin("store.storeCounters","counter").where("user.userId = :userId",{userId:e}).andWhere("counter.storeCounterId = :counterId",{counterId:t}).getOne();return console.log("isUserAssignedToCounter - result: ",r),!!r}catch(o){throw o}}});var fl=p(Cl=>{var{Between:gC}=require("../node_modules/typeorm/index.js"),{dataSource:TC}=re(),hC=ar(),{recordState:CC}=f();Cl.isCounterOccupied=async e=>{let t=TC.getRepository(hC),o=new Date;o.setUTCHours(0,0,0,0);let r=new Date;r.setUTCHours(23,59,59,999);let s=await t.findOne({where:{storeCounterId:e,loginTime:gC(o.toISOString(),r.toISOString()),sessionStatus:CC.ACTIVE}});return console.log("isCounterOccupied - existingSession: ",s),!!s}});var Cr=p(Sl=>{var{isUserAssignedToCounter:fC}=hl(),{isCounterOccupied:SC}=fl();Sl.canAssignUserToCounter=async(e,t)=>{try{if(await fC(e,t)){if(await SC(t))throw new Error("Counter already occupied by another user. Make sure you have selected the correct counter!");return!0}else throw new Error("User doesnt have access to this Counter. Please contact Admin!")}catch(o){throw o}}});var El=p(rn=>{var{dbCreds:on}=D();rn.selectLocations=`SELECT T0."Code", T0."Location" FROM ${on.CompanyDB}.OLCT T0`;rn.locationDefaults=`SELECT T0."Code" AS "Location", T0."U_AccountCode" AS "AccountCode", T0."U_OTCCardCode", T0."U_CODCardCode",
    T0."U_LocName", T0."U_LocAddress", T0."U_Store", T0."U_Phone", T0."U_Website", T0."U_Email", T1."U_Branch" AS "Branch"
    FROM ${on.CompanyDB}."@LOCACCOUNTMAPPING" T0
    INNER JOIN ${on.CompanyDB}."OLCT" T1 ON T0."Code" = T1."Location"
  WHERE UPPER(T0."Code") = UPPER(?)`});var uo=p(sn=>{var Dl=A(),Al=El();sn.getLocations=()=>{try{return Dl.executeWithValues(Al.selectLocations)}catch(e){throw console.log("getLocations - controller - error: "+JSON.stringify(e.message)),e}};sn.getLocationDefaults=e=>{try{let t=Dl.executeWithValues(Al.locationDefaults,[e]);return console.log("getLocationDefaults- rows: "+JSON.stringify(t)),t}catch(t){throw console.log("getLocationDefaults - controller - error: "+JSON.stringify(t.message)),t}}});var mo=p(po=>{var{dbCreds:wt}=D();po.selectTaxInfo=`SELECT "Name", "Code", "Rate" FROM ${wt.CompanyDB}.OVTG
WHERE "Inactive" = 'N'`;po.selectSalesEmployees=`SELECT T0."SlpCode", T0."SlpName", T0."Active", T3."SalesDisc"
    FROM ${wt.CompanyDB}.OSLP T0
    LEFT JOIN ${wt.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${wt.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."Active" ='Y'`;po.selectPaymentTerms=`SELECT T0."GroupNum" "PaymentTermCode", T0."PymntGroup" FROM ${wt.CompanyDB}.OCTG T0`;po.selectBankInfo=`SELECT T0."BankCode", T0."BankName" FROM ${wt.CompanyDB}.ODSC T0 WHERE T0."CountryCod" ='FJ'`});var nn=p(Il=>{var EC=A(),DC=mo();Il.getSalesEmployees=(e,t)=>{try{let o;return o=DC.selectSalesEmployees,e&&(o=o+`AND T0."Fax" IN ('${e}')`),t&&(o=o+`AND UPPER(T0."U_POSUser") IN  (UPPER('${t}'))`),console.log("Sql:",o),EC.executeWithValues(o)}catch(o){throw console.log("getSalesEmployees - controller - error: "+JSON.stringify(o.message)),o}}});var xl=p((Rb,Ul)=>{var se=A(),ee=D(),{getRandomNo:Nl,formatDate:AC,getClientHostname:IC}=L(),fr=Vs(),{sendMail:Rl}=Ie(),{generateHash:NC,comparePassword:bl}=or(),Re=io(),{createUserSessionLog:RC}=xt(),{getUserStoreInfo:bC}=tn(),{canAssignUserToCounter:Nb}=Cr(),{getLocationDefaults:OC}=uo(),{getSalesEmployees:UC}=nn(),xC=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=se.executeWithValues(ee.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{console.log("rows[0].Password: "+s[0].Password);let n=s[0].Password&&(await bl(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(r=n||a,console.log("isUserAuthenticated: "+r),r)if(s[0].U_TempPasswordFlag==="Y")t.send({tempPasswordFlag:!0,UserName:s[0].UserName});else{let i=s[0].InternalKey,{storeId:c,storeCounterId:l,counterCode:d,counterName:u,locationCode:m,storeLocation:g,storeWHCode:C}=await bC(i),T="",h=await Re.getSalesEmployeeForUser(i);if(Array.isArray(h)&&h.length>0&&(T=h[0].SlpCode),!T){let x=await UC(g,e.body.userName);Array.isArray(x)&&x.length>0&&(T=x[0].SlpCode,console.log("LOG LOGIN - BACKEND - Fallback found SalesEmployeeCode:",T))}let E="";if(g){let x=await OC(g);Array.isArray(x)&&x.length>0&&(E=x[0])}let k="",W=await Re.getUserGroupByUser(i);Array.isArray(W)&&W.length>0&&(k=W[0].U_GroupName),e.session.userId=i,e.session.userName=process.env.SERVICE_LAYER_USERNAME,e.session.password=process.env.SERVICE_LAYER_PASSWORD,e.session.slCookie="",e.session.slLoginTime="",e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=k;let ue=await IC(e),S={userId:i,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:T,userGroup:k,storeId:c||null,storeCounterId:l||null,counterCode:d,counterName:u,locationCode:m,storeLocation:g,locationDefaults:E,clientIp:ue,loginTime:AC(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},B=await RC(S);e.session.userSessionLog=B,e.session.storeWHCode=C,e.session.userSessionLog.locationCode=m;let Q={InternalKey:i,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:B,storeWHCode:C,userGroup:k,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",Q.userGroup),console.log("userSalesEmployeeCode (nested):",Q.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let x=Re.getUserPermissions(s[0].InternalKey);x&&(e.session.permissions=x,Q.permissions=x),t.send(Q)}catch(x){console.log("validateUserLogin - getUserPermissions - error: "+JSON.stringify(x)),t.status(500).send({message:x.message+". Unable to get User Permissions"})}}}r||(console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"}))}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}},LC=async(e,t,o)=>{try{let r=Re.getUserInfo(e.body.internalKey);if(r){let s=await Re.setTemporaryPassword(e.body.internalKey);if(s){let n=fr.getMailBody(s);await Rl(r.Email,fr.subject,n)?console.log("Temporary password has been sent to the mailid"):console.log("Unable to send temporary password to the mailid!"),t.status(200).send({tempPassword:s})}else t.status(500).send({message:"Unable to set temp password!"})}else console.log("Invalid user details!"),t.status(500).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("generateTempPassword - controller - error: "+JSON.stringify(r)),o(r)}},wC=async(e,t,o)=>{try{let r=Re.getUserInfoWithUserNameMail(e.body.userName,e.body.mailId);if(console.log("handleForgotPassword %s",JSON.stringify(r)),r)if(r.U_PortalAccountLocked==="Y")console.log("userRec.U_PortalAccountLocked: "+r.U_PortalAccountLocked),t.status(401).send({message:"Your account is locked. Please contact Admin!"});else{let s=await Re.setTemporaryPassword(r.InternalKey);if(s){let n=fr.getMailBody(s);await Rl(e.body.mailId,fr.subject,n)?t.status(200).send({message:"Temporary password has been sent to your email"}):t.status(200).send({message:"Unable to send temporary password to your mail. Please contact Admin!"})}}else console.log("Invalid user details!"),t.status(401).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("handleForgotPassword - controller - error: "+JSON.stringify(r)),t.status(500).send({message:r.message})}},vC=async(e,t)=>{let o={},r=!1,s=await NC(e.body.newPassword);try{let n=se.executeWithValues(ee.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(n)),Array.isArray(n)&&n.length&&(r=await bl(e.body.password,n[0].Password),r))try{let a=se.executeWithValues(ee.updatePortalPassword,[s,"N",n[0].InternalKey]);if(console.log("updatePortalPassword %s",JSON.stringify(a)),a>0)if(e.body.screen&&e.body.screen==="Login"){e.session.userName=n[0].UserName,e.session.userId=n[0].InternalKey,o={InternalKey:n[0].InternalKey,UserName:n[0].UserName,permissions:[]};try{let i=Re.getUserPermissions(n[0].InternalKey);console.log("validateUserLogin - getUserPermissionsForAllModules %s",i),i&&(e.session.permissions=i,o.permissions=i),t.send(o)}catch(i){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(i)),t.status(500).send({message:i.message+". Unable to get User Permissions"})}}else t.status(200).send({message:"Password updated successfully"})}catch(a){console.log("updatePortalPassword - error: "+JSON.stringify(a)),t.status(500).send({message:"Password update failed!"})}r||(console.log("Invalid username/password!"),t.status(401).send({message:"Invalid username/password!"}))}catch(n){console.log("validateUserLogin - controller - error: "+JSON.stringify(n)),t.status(500).send({message:n.message})}},_C=(e,t)=>{try{let o=se.executeWithValues(ee.allUsers,[e.query.isPortalUser]);t.send(o)}catch(o){console.log("getAllUsers - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},BC=(e,t)=>{try{let o=Re.getUsersByUserGroup(e.params.groupName);t.send(o)}catch(o){console.log("getUsersByUserGroup - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},PC=(e,t)=>{try{se.executeQuery(ee.portalUsers,(o,r)=>{if(o)throw o;console.log("getPortalUsersList %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUsersList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},MC=(e,t)=>{try{se.executeQuery(ee.portalUserGroups,(o,r)=>{if(o)throw o;console.log("getAllPortalGroups %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getAllPortalGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},FC=(e,t)=>{try{Ol(o=>{console.log("getPortalUserGroups - userGroups: "+JSON.stringify(o)),t.send(o)})}catch(o){console.log("getPortalUserGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Ol=e=>{try{se.executeQuery(ee.userGroupsWithPermissions,(t,o)=>{if(t)throw t;e(o)})}catch(t){throw console.log("getAllUserGroupsWithPermissions - controller - error: "+JSON.stringify(t)),t}},WC=(e,t,o)=>{try{let r=Re.getUserPermissions(e.params.userId);t.send(r)}catch(r){console.log("getUserPermissions - controller - error: "+JSON.stringify(r)),o(r)}},$C=(e,t)=>{console.log("req.params: %s",JSON.stringify(e.params));try{se.executeQuery(`${ee.userPermissionsForGivenGroup}'${e.params.id}'`,(o,r)=>{if(o)throw o;console.log("getPortalUserPermissions %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUserPermissions - controller - error: "+JSON.stringify(o)),next(o)}},kC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s=0,n=[],a=[],i=ee.updateUserGroup,c=e.body.U_GroupId;c||(c=parseInt(Nl()),i=ee.insertUserGroup);let l=[c,e.body.U_GroupName,e.body.U_GroupName,c];console.log("userGroupValues: "+l),e.body.permissionsList.forEach(d=>{r=d.U_PermissionId,r?a.push([r,r,c,d.U_ModuleId,d.U_AllowRead,d.U_AllowWrite,d.U_AllowCancel,d.U_AllowCreate,r]):(r=parseInt(Nl()),n.push([r,r,c,d.U_ModuleId,d.U_AllowRead,d.U_AllowWrite,d.U_AllowCancel,d.U_AllowCreate,r]))});try{if(se.executeWithValues(i,l)){let u=se.executeBatchInsertUpdate(ee.insertPermissions,n);s+=u,console.log("insertPermissions insertRows: "+u);let m=se.executeBatchInsertUpdate(ee.updatePermissions,a);s+=m,console.log("updatePermissions updateRows: "+m),console.log("createUpdateUserGroupWithPermissions result: "+s),s>0?Ol(g=>{t.send(g)}):t.status(201).send({})}else console.log("createUpdateUserGroupWithPermissions -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"})}catch(d){console.log("createUpdateUserGroupWithPermissions - controller - error: "+JSON.stringify(d)),o(d)}},HC=(e,t,o)=>{console.log("req.param.id: %s",e.params.id);try{se.executeQuery(`${ee.usersInGivenGroup}'${e.params.id}'`,(r,s)=>{if(r)throw r;if(Array.isArray(s)&&s.length){let n=s.map(a=>a.UserName);t.status(400).send({users:n,error:"Please remove the users from this Group to delete it"})}else se.executeQuery(`${ee.deletePermissions}'${e.params.id}'`,(n,a)=>{if(n)throw n;console.log("deletePermission rows: "+a),se.executeQuery(`${ee.deleteUserGroup}'${e.params.id}'`,(i,c)=>{i?t.status(500).send({err:i}):c>0?t.status(200).send("Success!"):(console.log("deletePortalUserGroup %s",c),t.status(201).send({rows:c}))})})})}catch(r){console.log("deletePortalUserGroup - controller - error: "+JSON.stringify(r)),t.status(500).send({error:r.message})}};Ul.exports={validateUserLogin:xC,generateTempPassword:LC,updatePortalPassword:vC,handleForgotPassword:wC,getAllUsers:_C,getUsersByUserGroup:BC,getAllPortalGroups:MC,getPortalUserGroups:FC,getPortalUserPermissions:$C,getUserPermissions:WC,getPortalUsersList:PC,createUpdateUserGroupWithPermissions:kC,deletePortalUserGroup:HC}});var wl=p(Ll=>{var{setBatchSerialReservedCust:VC}=tr();Ll.patch=(e,t)=>{console.log("*** setBatchSerialReservedCust - req.params: "+JSON.stringify(e.params));try{let o=VC(e.params.batchNumber,e.params.serialNumber,e.params.customerCode);console.log("setBatchSerialReservedCust %s",JSON.stringify(o)),t.send(o)}catch(o){console.log("setBatchSerialReservedCust - controller - error: "+JSON.stringify(o));let r="Something went wrong. Please try again or contact your administrator";o.message&&(r=o.message),t.status(500).send({message:r})}}});var _l=p((Ub,vl)=>{var Y=A(),z=D(),{getRandomNo:Ob}=L(),te={TEMPLATE:"TEMPLATE",ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER"},nt=[],Je=[],an=(e,t)=>{console.log("BEFORE: approverPrimaryKeyList: "+JSON.stringify(Je)),console.log("docEntry: "+t);let o,r=[],s=1,n="LineId";e===te.TEMPLATE?(o=z.allHeaderIds,n="DocEntry"):e===te.APPROVER?o=z.allApproverIds:e===te.ORIGINATOR&&(o=z.allOriginatorIds);try{if(e===te.ORIGINATOR)if(nt.length>0)r=nt;else if(r=Y.executeWithValues(o,t),r.length>0)nt=r;else return nt.push({LineId:s}),s;else if(e===te.APPROVER)if(Je.length>0)r=Je;else if(r=Y.executeWithValues(o,t),r.length>0)Je=r;else return Je.push({LineId:s}),s;else r=Y.executeWithValues(o,t);console.log("primaryKeyList %s",JSON.stringify(r));let a=r.length;if(a){if(r[a-1][n]===a)s=a+1,e===te.ORIGINATOR?nt.push({LineId:s}):e===te.APPROVER&&Je.push({LineId:s});else if(a>0){for(let i=0;i<r[a-1][n];i++)if(r[i][n]!=i+1){s=i+1,e===te.ORIGINATOR?nt.splice(i,0,{LineId:s}):e===te.APPROVER&&Je.splice(i,0,{LineId:s});break}}}return console.log("AFTER: approverPrimaryKeyList: "+JSON.stringify(Je)),console.log("primaryKey: "+s),s}catch(a){throw a}},ln=()=>{let e=[],t=[],o=[];try{if(e=Y.executeWithValues(z.selectApprovalHeader),console.log("approvalHeaderList %s",JSON.stringify(e)),e.length){let r=[],s=[];t=Y.executeWithValues(z.selectApprovalOriginator),console.log("approvalOriginatorList.length: "+t.length),o=Y.executeWithValues(z.selectApprovalApprover),console.log("approvalApproverList.length: "+o.length),e.forEach(n=>{r=[],s=[],t.forEach(a=>{n.DocEntry===a.DocEntry&&r.push(a)}),n.Originator=r,o.forEach(a=>{n.DocEntry===a.DocEntry&&s.push(a)}),n.Approver=s})}}catch(r){throw r}finally{return e}},JC=(e,t)=>{try{t.send(ln())}catch(o){console.log("getApprovalTemplates - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},qC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s,n=[],a=[],i=[],c=[],l=z.updateApprovalHeader,d=e.body.activeApprovalTemplateId;d||(d=an(te.TEMPLATE),l=z.insertApprovalHeader);let u=[e.body.templateName,e.body.description,e.body.moduleId,e.body.terms,e.body.noOfApprovals,e.body.multiLevelApproval,e.body.isActive,d];console.log("approvalHeaderValues: "+u);let m;e.body.activeApprovalApproverList.forEach(g=>{r=g.LineId,m=isNaN(parseInt(g.U_ApprovalLevel,10))?null:parseInt(g.U_ApprovalLevel,10),r?(a.push([g.U_UserId,m,d,r]),console.log("approverValuesForUpdate: "+a)):(r=an(te.APPROVER,d),n.push([g.U_UserId,m,d,r]),console.log("approverValuesForInsert: "+n))}),e.body.activeApprovalOriginatorList.forEach(g=>{s=g.LineId,s?(c.push([g.U_UserId,d,s]),console.log("originatorValuesForUpdate: "+c)):(s=an(te.ORIGINATOR,d),i.push([g.U_UserId,d,s]),console.log("originatorValuesForInsert: "+i))});try{let g=Y.executeWithValues(l,u),C=0,T=0,h=0,E=0;g?(n.length>0&&(C=Y.executeBatchInsertUpdate(z.insertApprovalApprover,n)),console.log("insertApproverRows: "+C),a.length>0&&(T=Y.executeBatchInsertUpdate(z.updateApprovalApprover,a)),console.log("updateApproverRows: "+T),i.length>0&&(h=Y.executeBatchInsertUpdate(z.insertApprovalOriginator,i)),console.log("insertOriginatorRows: "+h),c.length>0&&(E=Y.executeBatchInsertUpdate(z.updateApprovalOriginator,c)),console.log("updateOriginatorRows: "+E),C+T+h+E>0?t.status(200).send(ln()):t.status(201).send({})):(console.log("createUpdateApprovalTemplate -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"}))}catch(g){console.log("createUpdateApprovalTemplate - controller - error: "+g.message),t.status(500).send({message:g.message})}finally{nt=[]}},GC=(e,t,o)=>{console.log("req.param.templateId: %s",e.params.templateId),console.log("req.param.lineId: %s",e.params.lineId),console.log("req.param.recordType: %s",e.params.recordType);let r=0,s=0,n=0;try{e.params.recordType==te.TEMPLATE?(r=Y.executeWithValues(z.deleteApprovalTemplate3,e.params.templateId),s=Y.executeWithValues(z.deleteApprovalTemplate2,e.params.templateId),n=Y.executeWithValues(z.deleteApprovalTemplate1,e.params.templateId)):e.params.recordType==te.APPROVER?s=Y.executeWithValues(z.deleteApprovalApprover,[e.params.templateId,e.params.lineId]):e.params.recordType==te.ORIGINATOR&&(r=Y.executeWithValues(z.deleteApprovalOriginator,[e.params.templateId,e.params.lineId])),console.log("templateRows: "+n+" originatorRows: "+r+"approverRows: "+s),n>0||r>0||s>0?t.status(200).send(ln()):t.status(201).send({})}catch(a){console.log("deleteApprovalTemplate - controller - error: "+JSON.stringify(a)),t.status(500).send({message:a.message})}};vl.exports={getApprovalTemplates:JC,createUpdateApprovalTemplate:qC,deleteApprovalTemplate:GC}});var N=p((Lb,Bl)=>{var{httpStatusCodes:cn}=f(),{formatDate:xb}=L(),jC=(e,t,o)=>{let{permissions:r,userName:s,userId:n}=e.session;!e.url.endsWith("/login")&&!e.url.endsWith("/update-password")&&!e.url.endsWith("/forgot-password")&&(!s||!n||!Array.isArray(r)||r.length===0)?(console.log("sessionValidator - session is INVALID"),t.status(cn.UNAUTHORIZED).json({message:"Invalid session. Login to continue!"})):(console.log("sessionValidator - session is VALID!"),o())},zC=(e,t)=>[(o,r,s)=>{Array.isArray(e)||(e=[e]);try{let n=!1,{permissions:a}=o.session;Array.isArray(a)&&a.length&&a.find(i=>e.includes(i.U_ModuleName)&&i[t]==="Y")&&(n=!0),n?s():r.status(cn.FORBIDDEN).send({message:"User unauthorized to perform the operation"})}catch(n){console.log("checkUserPermission - controller - error: "+JSON.stringify(n)),r.status(cn.INTERNAL_SERVER_ERROR).send({message:n.message})}}];Bl.exports={sessionValidator:jC,checkUserPermission:zC}});var Ml=p((wb,Pl)=>{var QC=require("../node_modules/express/index.js"),ce=zi(),le=xl(),YC=wl(),Sr=_l(),KC=Ws(),XC=ks(),{portalModules:he,permissions:Ce}=f(),{checkUserPermission:fe}=N(),R=new QC.Router;R.route("/server-date").get(ce.getServerDateTime);R.route("/get-docentry").get(ce.getDocEntry);R.route("/login").get((e,t)=>t.status(405).send({message:"Login endpoint only accepts POST requests"})).post(le.validateUserLogin);R.route("/forgot-password").post(le.handleForgotPassword);R.route("/update-password").patch(le.updatePortalPassword);R.route("/temp-password").post(le.generateTempPassword);R.route("/branch").get(ce.getUserBranches);R.route("/freights").get(ce.getFreightList);R.route("/item").get(ce.getItemsList);R.route("/item-qty-in-warehouse").get(ce.getItemCountInWarehouse);R.route("/picklist-warehouses").get(ce.getPicklistWarehouses);R.route("/bin-location/:type?").get(ce.getBinsAndItemQtyForWarehouse);R.route("/modules").get(ce.getPortalModules);R.route("/approval-template/:recordType?/:templateId?/:lineId?").get(fe(he.APPROVAL,Ce.READ),Sr.getApprovalTemplates).put(fe(he.APPROVAL,Ce.WRITE),Sr.createUpdateApprovalTemplate).post(fe(he.APPROVAL,Ce.CREATE),Sr.createUpdateApprovalTemplate).delete(Sr.deleteApprovalTemplate);R.route("/users").get(le.getAllUsers);R.route("/portal-users").get(le.getPortalUsersList);R.route("/user-groups/:id?").get(fe(he.USER_GROUP,Ce.READ),le.getAllPortalGroups).put(fe(he.USER_GROUP,Ce.WRITE),le.createUpdateUserGroupWithPermissions).post(fe(he.USER_GROUP,Ce.CREATE),le.createUpdateUserGroupWithPermissions).delete(fe(he.USER_GROUP,Ce.CANCEL),le.deletePortalUserGroup);R.route("/user-groups/:id?/permissions").get(fe(he.USER_GROUP,Ce.READ),le.getPortalUserPermissions);R.get("/user-groups/:groupName/user",le.getUsersByUserGroup);R.get("/user/:userId/permissions",le.getUserPermissions);R.route("/stock-transfer-request/:type?/:recordType?/:docEntry?").get(fe(he.STOCK_TRANSFER_REQUEST,Ce.READ)||fe(he.STOCK_TRANSFER,Ce.CREATE),KC.getTransferRequestRecords);R.route("/stock-transfer/:type?/:recordType?/:docEntry?").get(fe(he.STOCK_TRANSFER,Ce.READ),XC.getTransferRecords);R.route("/count").get(ce.getDraftsCount);R.route("/batch-serial-info").get(ce.getBatchSerialNoInfo).patch(YC.patch);R.route("/tim-yard-items").get(ce.getTimYardItemInfo);R.route("/bincode-info").get(ce.getBinListbyItem);Pl.exports=R});var q=p((vb,Wl)=>{var ZC=require("../node_modules/axios/index.js"),ef=require("../node_modules/axios-retry/dist/cjs/index.js").default,tf=require("https"),Fl=ZC.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new tf.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}});ef(Fl,{retries:3});Wl.exports={serviceLayerAPI:Fl}});var K=p((Pb,Vl)=>{var{serviceLayerAPI:_b}=q(),{dbCreds:yo,serviceLayerSessionMaxAge:$l}=D(),{getTimeDifference:Bb}=L(),of=require("../node_modules/axios/index.js"),rf=require("https"),kl=of.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new rf.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}}),vt=null,at=null,sf=async e=>{try{if(vt&&at){let s=Math.abs(new Date-new Date(at))/6e4;if(console.log(`*** getSLConnection - in-memory cookie age: ${s} min`),s<$l-5)return vt}if(e.session.slCookie&&e.session.slLoginTime){let s=Math.abs(new Date-new Date(e.session.slLoginTime))/6e4;if(console.log(`*** getSLConnection - session cookie exists, age: ${s} min`),s<$l-5)return console.log("*** getSLConnection - returning SESSION CACHED SL cookie"),vt=e.session.slCookie,at=e.session.slLoginTime,e.session.slCookie}console.log("*** getSLConnection - NO cached cookie or expired, RE-AUTHENTICATING...");let t=yo.UserName,o=yo.Password;e.session&&e.session.userName&&e.session.password?(console.log(`*** getSLConnection - Using session user credentials for: ${e.session.userName}`),t=e.session.userName,o=process.env.SERVICE_LAYER_PASSWORD||yo.Password):console.log("*** getSLConnection - Using fallback dbCreds");let r=await Hl(t,o);return vt=r,at=new Date().toISOString(),e.session.slCookie=r,e.session.slLoginTime=at,r}catch(t){throw t}},Hl=async(e,t)=>{let o=null;try{let r=await kl.post("Login?prefer=return-no-content",{CompanyDB:yo.CompanyDB,UserName:e,Password:t});console.log(`***Login - openSLConnection - response: ${r.status}`);let s=r.headers["set-cookie"];return Array.isArray(s)?o=s.map(n=>n.split(";")[0]).join("; "):o=s,console.log("cookie: "+o),console.log("response.data.SessionId: "+r.data.SessionId),o}catch(r){throw console.log("openSLConnection - error:",r?.response?.data||r.message),r}},nf=async()=>{let e=null;try{let t=await kl.post("Login?prefer=return-no-content",yo);console.log(`***Login - openDBConnection - response: ${t.status}`);let o=t.headers["set-cookie"];return Array.isArray(o)?e=o.map(r=>r.split(";")[0]).join("; "):e=o,console.log("cookie: "+e),console.log("response.data.SessionId: "+t.data.SessionId),e}catch(t){throw console.log("openDBConnection - error:",t?.response?.data||t.message),t}},af=(e,t)=>{vt=e,at=t||new Date().toISOString(),console.log("*** setSLCache - SL cookie cached in memory")},lf=e=>{vt=null,at=null,e&&e.session&&(e.session.slCookie=null,e.session.slLoginTime=null),console.log("*** invalidateSLCache - SL cookie cache cleared")};Vl.exports={openDBConnection:nf,openSLConnection:Hl,getSLConnection:sf,setSLCache:af,invalidateSLCache:lf}});var dn=p((Mb,Jl)=>{var cf="POS - Welcome mail",df=(e,t,o)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Welcome email</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
    padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                      <a class="" href="https://www.client.com/" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
    #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="73" />
                                    </a>
                                  </td>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
    padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                      <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                      style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
    text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
    0; display: inline !important; vertical-align: bottom;" width="130" />
                           </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>Welcome ${t}!</span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    <b>${e}</b> has invited you to POS, a Point of Sale app to streamline your tasks. Please use the below temporary password to sign in. 
                                      <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">${o}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
    padding-right:48px; padding-bottom:24px; padding-left:48px; text-align: center" valign="middle">
                    Log into <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Change the password</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    You will be prompted to change the password when you sign in.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;Jl.exports={subject:cf,getMailBody:df}});var zl=p((Fb,jl)=>{var{serviceLayerAPI:ql}=q(),{getSLConnection:uf}=K(),{generatePassword:pf}=qs(),{sendMail:mf}=Ie(),Gl=dn(),yf=async(e,t,o)=>{console.log(`updateUserDetails - req.body: ${JSON.stringify(e.body)}`);let r,s={eMail:e.body.eMail,MobilePhoneNumber:e.body.MobilePhoneNumber,U_PortalUser:e.body.U_PortalUser,U_PortalGroupId:e.body.U_PortalGroupId,U_PortalAccountLocked:e.body.U_PortalAccountLocked,U_PortalBadLoginCount:e.body.U_PortalBadLoginCount};e.body.isNewUser&&(r=pf(),s.U_TempPasswordFlag="Y");let n;try{n=await uf(e)}catch(a){console.log("updateUserDetails: "+JSON.stringify(a)),o(a)}if(n){ql.defaults.headers.Cookie=n;let a="";try{let i=await ql.patch(`Users(${e.body.InternalKey})`,s);if(i.status=="200"||i.status=="201"||i.status=="204"){if(e.body.isNewUser){let c=Gl.getMailBody(e.body.adminUser,e.body.userName,r);await mf(e.body.eMail,Gl.subject,c)?a="Portal access invite has been sent to user's email":a="Portal access has been given, but unable to send temporary password to user's mail. Please share it manually."}else a="User details updated successfully";t.status(200).send({message:a})}else t.status(500).send({message:"Update failed!"})}catch(i){console.log("Update User Details - Error: "+i),o(i)}}};jl.exports={updateUserDetails:yf}});var Kl=p((Wb,Yl)=>{var{dbCreds:ne}=D(),{draftStatus:Ql}=f(),gf=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
   T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
 FROM ${ne.CompanyDB}."@APPROVALSTATUS" T0, ${ne.CompanyDB}.OUSR TAP
   WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
 AND T0."U_DocEntry" IN `,Tf=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
   FROM ${ne.CompanyDB}."@APPROVALSTATUS" T0, ${ne.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,hf=`SELECT T0."U_ApproverId"
   FROM ${ne.CompanyDB}."@APPROVALSTATUS" T0, ${ne.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,Cf=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
    FROM ${ne.CompanyDB}."@APPROVALSTATUS" T0
  WHERE T0."U_DocEntry" = ?
    AND T0."U_ApprovalLevel" = ?`,ff=`UPDATE ${ne.CompanyDB}."@APPROVALSTATUS" T0
   SET T0."U_DraftStatus" = ?
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,Sf=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
   FROM ${ne.CompanyDB}."@APPROVALSTATUS" T0, ${ne.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,Ef=`INSERT INTO ${ne.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", 
  "U_DraftStatus", "U_ApproverId", "U_ApprovalLevel", "U_ModuleName") VALUES (?, ?, ?, ?, ?, ?, ?)`,Df=`UPDATE ${ne.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
   "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
 WHERE "U_ApprovalStatusId" = ?`,Af=`UPDATE ${ne.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
     WHERE "U_DraftStatus" IN ('${Ql.PENDING}', '${Ql.NOT_ASSIGNED}')
   AND "U_DocEntry" = ?`,If=`UPDATE ${ne.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
      WHERE "U_DocEntry" = ?`;Yl.exports={selectDraftApproversList:gf,insertDraftApproversList:Ef,updateDraftApproversList:Df,updateApprovalStatus:Af,updateApprovalStatusRecState:If,selectDraftApprovalStatusCount:Tf,selectDraftApprovalRecords:hf,updateDraftNextApprovalLevel:ff,selectDraftNextApproverDetails:Sf,selectDraftApprovalDate:Cf}});var _t=p((kb,Xl)=>{var{portalModules:$b}=f(),Nf="Approval request",Rf=(e,t,o)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${e} notification</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
      padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                        <a class="" href="https://www.client.com/" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                          <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="73" />
                                      </a>
                                    </td>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
      padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="130" />
                             </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>${e}</span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    <b>${t}</b> has submitted a ${e}.
    Please review and provide your approval. <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">Request no.: ${o}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 10px; padding-top:10px;
    padding-right:48px; padding-bottom:14px; padding-left:48px; text-align: center" valign="middle">
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Pending Approvals</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    Log into
    <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
    to review the requests that are awaiting you approval.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;Xl.exports={subject:Nf,getMailBody:Rf}});var Pt=p((Vb,ec)=>{var Bt=A(),Er=D(),un=Kl(),{draftStatus:it,portalModules:Hb}=f(),{getRandomNo:bf}=L(),{sendMail:Of}=Ie(),Zl=_t(),Uf=(e,t=0,o,r)=>{let s,n=100,a,i=[],c=new ProductionDraftQueries(r);t=parseInt(t),t===1||o==="N"?(a=Er.selectDraftCreationDate,i=[e]):(a=un.selectDraftApprovalDate,i=[e,t-1]),console.log("sql: "+a);try{let l=Bt.executeWithValues(a,i);console.log("getApprovalInternalInDays %s",JSON.stringify(l)),Array.isArray(l)&&l.length&&(s=l[0].DocDate)}catch(l){console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(l))}if(s){let l=Math.abs(new Date-new Date(s));n=Math.ceil(l/(1e3*60*60*24))-1}return n},xf=(e,t,o)=>{let r;e===it.APPROVED?r=it.GENERATED:e===it.REJECTED&&(r=it.NOT_REQUIRED);try{let s=un.updateApprovalStatus,n=[r,t],a=Bt.executeWithValues(s,n);return console.log("setApprovalStatus %s",JSON.stringify(a)),!0}catch(s){return console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(s)),!1}},Lf=(e,t)=>{try{let o=Bt.executeWithValues(Er.selectApproverForOriginator,[e,t]);return console.log("result: "+JSON.stringify(o)),o}catch(o){throw o}},wf=e=>{try{let t=Bt.executeWithValues(Er.selectDraftApproversList+`(${e}) ORDER BY T0."U_ApprovalLevel" ASC`,[]);return console.log("result: "+JSON.stringify(t)),t}catch(t){throw t}},vf=(e,t,o)=>{try{let r=un.updateApprovalStatusRecState,s=[t,e],n=Bt.executeWithValues(r,s);return console.log("draftApproverRec: "+JSON.stringify(n)),!0}catch(r){throw r}},_f=async(e,t,o)=>{let r=[],s=[],n,a;try{t.map(l=>{n=0,a=bf(),l.U_MultiLevelApproval==="Y"?(n=l.U_ApprovalLevel,l.U_ApprovalLevel==1?(s.push({UserName:l.UserName,Email:l.Email}),r.push([a,a,e,it.PENDING,l.ApproverId,n])):r.push([a,a,e,it.NOT_ASSIGNED,l.ApproverId,n])):(s.push({UserName:l.UserName,Email:l.Email}),r.push([a,a,e,it.PENDING,l.ApproverId,n]))});let i=Er.insertDraftApproversList;console.log("multiApproverList: "+r),console.log("mailingList: "+s);let c=Bt.executeBatchInsertUpdate(i,r);return console.log("draftApproverRec: "+JSON.stringify(c)),{draftApproverRec:c,mailingList:s}}catch(i){throw i}},Bf=async(e,t,o,r)=>{try{let s=Zl.getMailBody(e,t,o);r.forEach(async n=>{await Of(n.Email,Zl.subject,s)})}catch(s){throw s}};ec.exports={getApprovalInternalInDays:Uf,setApprovalStatus:xf,getApprovers:Lf,getApproversForDraft:wf,updateDraftApprovers:vf,createApproversForDraft:_f,notifyApprovers:Bf}});var Dr=p((qb,tc)=>{var{portalModules:Jb}=f(),Pf="Request status update",Mf=(e,t,o,r,s)=>`
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!-- NAME: 1 COLUMN -->
      <!--[if gte mso 15]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Goods Receipt PO request notification</title>
      <!--[if !mso]>
          <!-- -->
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
            
      .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
      .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
      .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 1
          @tip Make the first-level headings larger in size for better readability
      on small screens.
          */
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 2
          @tip Make the second-level headings larger in size for better
      readability on small screens.
          */
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 3
          @tip Make the third-level headings larger in size for better readability
      on small screens.
          */
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Heading 4
          @tip Make the fourth-level headings larger in size for better
      readability on small screens.
          */
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Boxed Text
          @tip Make the boxed text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              .mcnBoxedTextContentContainer
      .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Visibility
          @tip Set the visibility of the email's preheader on small screens. You
      can hide it to save space.
          */
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Preheader Text
          @tip Make the preheader text larger in size for better readability on
      small screens.
          */
              #templatePreheader .mcnTextContent,#templatePreheader
      .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Header Text
          @tip Make the header text larger in size for better readability on small
      screens.
          */
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Body Text
          @tip Make the body text larger in size for better readability on small
      screens. We recommend a font size of at least 16px.
          */
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          /*
          @tab Mobile Styles
          @section Footer Text
          @tip Make the footer content text larger in size for better readability
      on small screens.
          */
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
  
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    background-color: #e3e0ff; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%;  height: 100%; margin: 0; padding: 0; width:
    100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
    height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
              <!-- BEGIN TEMPLATE // -->
              <!--[if gte mso 9]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                    <tr>
                      <td align="center" valign="top" width="600" style="width:600px;">
                      <![endif]-->
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
    600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 20px;
      padding-right: 0px; padding-top: 0; padding-bottom: 0; text-align:left;" valign="top">
                                        <a class="" href="https://www.client.com/" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                          <img align="center" alt="Logo" class="mcnImage" src="cid:client_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:100px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="73" />
                                      </a>
                                    </td>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-left: 0px;
      padding-right: 20px; padding-top: 0; padding-bottom: 0; text-align:right;" valign="top">
                                        <img align="center" alt="Logo" class="mcnImage" src="cid:app_logo_pic" 
                        style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:150px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="130" />
                             </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fff;
    border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
  
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
    sans-serif; font-size: 20px; font-style: normal; font-weight: bold; line-height:
    125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
    padding: 0'><span>${e} </span></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
    0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
    color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
    line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
    padding-bottom: 9px; padding-left: 18px;' valign="top">
    Hi ${t}, <br /><br />
    Your ${e} has been ${s} by <b>${o}</b>. Please find below next recommended action.
    <br /><br />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; 
                    mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    border-collapse: separate !important;border-radius: 4px;
    background-color:#0059b3;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; 
    padding-top:18px; padding-right:30px; padding-bottom:18px; padding-left:30px;" valign="middle">
                                            <span class="mcnButton" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block;
    font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
    1px;line-height: 100%;text-align: center;text-decoration: none;color:
    #FFFFFF;">Request# ${r}</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                  <tr>
                  <td style="mso-line-height-rule:
    exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
    font-family: 'Asap', Helvetica, sans-serif; font-size: 10px; padding-top:10px;
    padding-right:48px; padding-bottom:14px; padding-left:48px; text-align: center" valign="middle">
                  </td>
                  </tr>
                              </tbody>
                            </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
    padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateFooter" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; 
    border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="center" bgcolor="#fff" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
    mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
    100%; background:#fff; margin:auto; text-align:left; max-width:600px;
    font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                              <tr>
                                <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%">
  
                                  <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
    font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
    letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
    0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>
    Next Action - 
    ${s==="APPROVED"?"Review":"Review and resubmit your request"}</h3>
  
                                  <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
    font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
    text-align: left; text-align: left; font-size: 14px; '>
    Log into
    <a href="${process.env.REACT_APP_URL}" style="color:#0059b3" target="_blank"><b>POS</b></a>
    ${s==="APPROVED"?"":"to review the 'Rejection Reason' posted by your approver, modify the request and resubmit it"}.
                                  </p>
                                </td>
                              </tr>
                            </table>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
    -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
    padding-bottom: 24px; padding-left: 18px; color: #333; font-family: 'Asap',
    Helvetica, sans-serif; font-size: 12px;" valign="top">
                                    <div style="text-align: center;">
                                      Powered by <b>Topnotch Services Ltd.</b>
                    </div>
                                  </td>
                                </tr>
                                <tbody></tbody>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
              <!--[if gte mso 9]>
                      </td>
                    </tr>
                  </table>
                <![endif]-->
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
      </center>
    </body>
    </html>
  `;tc.exports={subject:Pf,getMailBody:Mf}});var rc=p(oc=>{var{dbCreds:Ff}=D();oc.numberingSeries=`SELECT T0."Series", T0."SeriesName", T0."InitialNum"
    FROM ${Ff.CompanyDB}.NNM1 T0
  WHERE T0."ObjectCode" = ?
        AND LOWER(T0."Remark") = ?`});var Ar=p(sc=>{var Wf=A(),$f=rc();sc.getNumberingSeries=(e,t)=>{try{let o=Wf.executeWithValues($f.numberingSeries,[e,t.toLowerCase()]);return Array.isArray(o)&&o.length>0?o[0]:null}catch(o){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(o.message)),o}}});var cc=p((Yb,lc)=>{var kf=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:_e}=q(),{getSLConnection:ac}=K(),{sendMail:yn}=Ie(),pn=Pt(),Ir=_t(),nc=Dr(),Se=A(),Ee=D(),{portalModules:go,draftObjectCodes:ic,draftStatus:P,systemCurrency:zb,objectCodes:Hf,enableStoreBasedNumbering:Vf}=f(),{getRandomNo:Jf,formatDate:qf}=L(),Qb=A(),{getNumberingSeries:Gf}=Ar(),jf=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await ac(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,_e.defaults.headers.Cookie=r;try{let n=Se.executeWithValues(Ee.selectApproverForOriginator,[s,go.STOCK_TRANSFER_REQUEST]);console.log("approverRec: "+JSON.stringify(n));let a=Se.executeWithValues(Ee.selectUserInfo,s),i=kf(e.body);if(i.branchId&&(i.BPLID=i.branchId,delete i.branchId),i.U_OriginatorId=s,delete i.userId,Array.isArray(n)&&n.length){i.DocObjectCode=ic.STOCK_TRANSFER_REQUEST,i.U_DraftStatus=P.PENDING,i.U_MultiLevelApproval=n[0].U_MultiLevelApproval,i.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createSTR Draft - request: "+JSON.stringify(i));let c=await _e.post("StockTransferDrafts",i);if(console.log("*** DRAFTS response: "+c),c.data){let l=[];n.forEach(T=>{l.push(T.UserName)}),t.status(200).send({draftNum:c.data.DocEntry,approverName:l.join(", "),response:c.data});let d=[],u=[],m,g;n.map(T=>{m=0,g=Jf(),T.U_MultiLevelApproval==="Y"?(m=T.U_ApprovalLevel,T.U_ApprovalLevel==1?(u.push({UserName:T.UserName,Email:T.Email}),d.push([g,g,c.data.DocEntry,P.PENDING,T.ApproverId,m])):d.push([g,g,c.data.DocEntry,P.NOT_ASSIGNED,T.ApproverId,m])):(u.push({UserName:T.UserName,Email:T.Email}),d.push([g,g,c.data.DocEntry,P.PENDING,T.ApproverId,m]))}),console.log("multiApproverList: "+d),console.log("mailingList: "+u);let C=Se.executeBatchInsertUpdate(Ee.insertDraftApproversList,d);if(console.log("draftApproverRec: "+JSON.stringify(C)),C){let T=Ir.getMailBody(go.STOCK_TRANSFER_REQUEST,a[0].UserName,c.data.DocEntry);u.forEach(async h=>{await yn(h.Email,Ir.subject,T)})}}}else{let c=[...e.body.StockTransferLines];c.forEach(u=>{u.FromWarehouseCode=u.U_FromWarehouse,delete u.availableQuantity,delete u.U_FromWarehouse}),console.log("stockTransferLines: "+JSON.stringify(c));let l={FromWarehouse:e.body.FromWarehouse,U_FromBinLoc:e.body.U_FromBinLoc,ToWarehouse:e.body.ToWarehouse,U_ToBinLocation:e.body.U_ToBinLocation,Comments:e.body.Comments,SalesPersonCode:e.body.SalesPersonCode,U_DraftStatus:P.AUTO_APPROVED,StockTransferLines:c,U_OriginatorId:s};if(Vf){let u=await Gf(Hf[go.STOCK_TRANSFER_REQUEST],e.session.userSessionLog.storeLocation);u&&(console.log("seriesResponse series:",u.Series),l.Series=u.Series)}console.log("InventoryTransferRequests - request: "+JSON.stringify(l));let d=await _e.post("InventoryTransferRequests",l);d.data?t.status(200).send({stockTransferRequestNum:d.data.DocNum}):(console.log("Create Stock Transfer Request failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}}catch(n){console.log("Create Stock Transfer Request error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},mn=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await _e.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==P.APPROVED)try{let a=await _e.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let i=[],c={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(d=>{c={LineNum:d.LineNum,ItemCode:d.ItemCode,Quantity:d.Quantity,MeasureUnit:d.MeasureUnit,WarehouseCode:d.WarehouseCode,FromWarehouseCode:d.U_FromWarehouse,U_ToBinLocation:d.U_ToBinLocation},i.push(c)}),i.sort((d,u)=>d.BaseLine-u.BaseLine);let l={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:i};a.BPLID&&(l.BPLID=a.BPLID),console.log("InventoryTransferRequests - request: "+JSON.stringify(l)),s=await _e.post("InventoryTransferRequests",l)}catch(a){let i=await _e.patch(`Drafts(${e.DocEntry})`,{U_DraftStatus:P.PENDING});throw console.log("resetDraftStatus - response.data: "+i),a}if(n||s){let a=Se.executeWithValues(Ee.updateDraftApproversList,[o,e.U_RejectedReason,qf(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===P.REJECTED&&pn.setApprovalStatus(o,e.DocEntry),s){let u=await _e.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&pn.setApprovalStatus(P.APPROVED,e.DocEntry)}let i=Se.executeWithValues(Ee.selectUserInfo,e.U_OriginatorId),c=Se.executeWithValues(Ee.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let l;if([P.APPROVED,P.PENDING].includes(e.U_DraftStatus)?l=P.APPROVED:l=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let u=nc.getMailBody(go.STOCK_TRANSFER_REQUEST,i[0].UserName,c[0].UserName,e.DocEntry,l);await yn(i[0].Email,nc.subject,u)}let d;o===P.APPROVED&&(d=pn.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:l,noOfDays:d})}}catch(s){next(s)}},zf=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await ac(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){_e.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==P.APPROVED){let a=Se.executeWithValues(Ee.selectNoOfApprovalsForDraft,[ic.STOCK_TRANSFER_REQUEST,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let i=0,c;if(Array.isArray(a)&&a.length&&(i=parseInt(a[0].U_NoOfApprovals,10),c=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+i),c==="Y"){if(parseInt(s.U_ApprovalLevel)==i?s.U_DraftStatus=P.APPROVED:parseInt(s.U_ApprovalLevel)<i&&(s.U_DraftStatus=P.PENDING),await mn(s,t,n,c),s.U_DraftStatus==P.PENDING){let l=parseInt(s.U_ApprovalLevel)+1,d=Se.executeWithValues(Ee.updateDraftNextApprovalLevel,[P.PENDING,s.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(d));let u=Se.executeWithValues(Ee.selectUserInfo,s.U_OriginatorId),m=Se.executeWithValues(Ee.selectDraftNextApproverDetails,[s.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(m)),Array.isArray(m)&&m.length&&u.length){let g=Ir.getMailBody(go.STOCK_TRANSFER_REQUEST,u[0].UserName,s.DocEntry);await yn(m[0].Email,Ir.subject,g)}}}else{let l=Se.executeWithValues(Ee.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(l));let d=0;Array.isArray(l)&&l.length&&(d=l[0].Count),console.log("noOfApprovalsReceived: "+d),parseInt(d,10)+1>=parseInt(i,10)?(s.U_DraftStatus=P.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=P.PENDING,console.log("****PENDING")),await mn(s,t,n,c)}}else s.U_DraftStatus==P.REJECTED&&(console.log("****REJECTED"),await mn(s,t,n))}catch(n){console.log("Stock Transfer Request Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};lc.exports={createStockTransferRequest:jf,updateDraft:zf}});var Tc=p((Xb,gc)=>{var mc=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:Be}=q(),{getSLConnection:yc}=K(),{sendMail:hn}=Ie(),gn=Pt(),Nr=_t(),dc=Dr(),ge=A(),Te=D(),{portalModules:Rr,draftObjectCodes:Cn,draftStatus:M,systemCurrency:Kb}=f(),{getRandomNo:Qf,formatDate:Yf}=L(),uc=async(e,t,o)=>{try{e.requestType==="BIN_TO_BIN"?(e.U_DraftStatus="BIN_TO_BIN",delete e.requestType):e.U_DraftStatus=M.AUTO_APPROVED,console.log("StockTransfers - request: "+JSON.stringify(e));let r=await Be.post("StockTransfers",e);r.data?t.status(200).send({stockTransferRequestNum:r.data.DocNum}):(console.log("Create Stock Transfer failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}catch(r){throw r}},Kf=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await yc(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,Be.defaults.headers.Cookie=r;try{let n=ge.executeWithValues(Te.selectApproverForOriginator,[s,Rr.STOCK_TRANSFER]);console.log("approverRec: "+JSON.stringify(n));let a=ge.executeWithValues(Te.selectUserInfo,s),i=[],c={},l=mc(e.body);if(l.branchId&&(l.BPLID=l.branchId,delete l.branchId),delete l.userId,l.U_OriginatorId=s,l.StockTransferLines.forEach(d=>{c={LineNum:d.LineNum,ItemCode:d.ItemCode,Quantity:d.Quantity,BaseType:d.BaseType,BaseEntry:d.BaseEntry,BaseLine:d.BaseLine,MeasureUnit:d.MeasureUnit,WarehouseCode:d.WarehouseCode,FromWarehouseCode:d.U_FromWarehouse,U_ToBinLocation:d.U_ToBinLocation,BatchNumbers:d.BatchNumbers,SerialNumbers:d.SerialNumbers,StockTransferLinesBinAllocations:Xf(d.StockTransferLinesBinAllocations)},i.push(c),c={}}),delete l.StockTransferLines,l.StockTransferLines=i,l.requestType==="BIN_TO_BIN")await uc(l,t);else if(Array.isArray(n)&&n.length){l.DocObjectCode=Cn.STOCK_TRANSFER,l.U_DraftStatus=M.PENDING,l.U_MultiLevelApproval=n[0].U_MultiLevelApproval,l.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createST Draft - request: "+JSON.stringify(l));let d=await Be.post("StockTransferDrafts",l);if(console.log("*** DRAFTS response: "+d),d.data){let u=[];n.forEach(E=>{u.push(E.UserName)}),t.status(200).send({draftNum:d.data.DocEntry,approverName:u.join(", "),response:d.data});let m=[],g=[],C,T;n.map(E=>{C=0,T=Qf(),E.U_MultiLevelApproval==="Y"?(C=E.U_ApprovalLevel,E.U_ApprovalLevel==1?(g.push({UserName:E.UserName,Email:E.Email}),m.push([T,T,d.data.DocEntry,M.PENDING,E.ApproverId,C])):m.push([T,T,d.data.DocEntry,M.NOT_ASSIGNED,E.ApproverId,C])):(g.push({UserName:E.UserName,Email:E.Email}),m.push([T,T,d.data.DocEntry,M.PENDING,E.ApproverId,C]))}),console.log("multiApproverList: "+m),console.log("mailingList: "+g);let h=ge.executeBatchInsertUpdate(Te.insertDraftApproversList,m);if(console.log("draftApproverRec: "+JSON.stringify(h)),h){let E=Nr.getMailBody(Rr.STOCK_TRANSFER,a[0].UserName,d.data.DocEntry);g.forEach(async k=>{await hn(k.Email,Nr.subject,E)})}}}else await uc(l,t)}catch(n){console.log("Create Stock Transfer error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},pc=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o},Xf=e=>{let t=[];return Array.isArray(e)&&e.length>0&&e.forEach(o=>{o.ToBinLoc?t.push({BinAbsEntry:Zf(o.ToBinLoc),Quantity:o.Quantity,AllowNegativeQuantity:o.AllowNegativeQuantity,SerialAndBatchNumbersBaseLine:o.SerialAndBatchNumbersBaseLine,BinActionType:o.BinActionType,BaseLineNumber:o.BaseLineNumber}):t.push(o)}),t},Zf=e=>{try{let t=ge.executeWithValues(Te.binsList+' WHERE T0."BinCode" = ?',e);return console.log("getBinAbsEntry - result: "+JSON.stringify(t)),t[0].AbsEntry}catch(t){return console.log(`Error getting AbsEntry for BinCode - ${e} ERROR: ${t}`),0}},Tn=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await Be.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==M.APPROVED)try{let a=await Be.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let i=[],c={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(d=>{c={LineNum:d.LineNum,ItemCode:d.ItemCode,Quantity:d.Quantity,BaseType:Cn.STOCK_TRANSFER_REQUEST,BaseEntry:d.BaseEntry,BaseLine:d.BaseLine,MeasureUnit:d.MeasureUnit,WarehouseCode:d.WarehouseCode,FromWarehouseCode:d.FromWarehouseCode,U_ToBinLocation:d.U_ToBinLocation},c.BatchNumbers=pc("Batch",d.BatchNumbers),c.SerialNumbers=pc("Serial",d.SerialNumbers),c.StockTransferLinesBinAllocations=mc(d.StockTransferLinesBinAllocations),i.push(c)}),i.sort((d,u)=>d.BaseLine-u.BaseLine);let l={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:i};a.BPLID&&(l.BPLID=a.BPLID),console.log("StockTransfers - request: "+JSON.stringify(l)),s=await Be.post("StockTransfers",l)}catch(a){let i=await Be.patch(`StockTransferDrafts(${e.DocEntry})`,{U_DraftStatus:M.PENDING});throw console.log("resetDraftStatus - response.data: "+i),a}if(n||s){let a=ge.executeWithValues(Te.updateDraftApproversList,[o,e.U_RejectedReason,Yf(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===M.REJECTED&&gn.setApprovalStatus(o,e.DocEntry),s){let u=await Be.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&gn.setApprovalStatus(M.APPROVED,e.DocEntry)}let i=ge.executeWithValues(Te.selectUserInfo,e.U_OriginatorId),c=ge.executeWithValues(Te.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let l;if([M.APPROVED,M.PENDING].includes(e.U_DraftStatus)?l=M.APPROVED:l=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let u=dc.getMailBody(Rr.STOCK_TRANSFER,i[0].UserName,c[0].UserName,e.DocEntry,l);await hn(i[0].Email,dc.subject,u)}let d;o===M.APPROVED&&(d=gn.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:l,noOfDays:d})}}catch(s){next(s)}},eS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await yc(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){Be.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==M.APPROVED){let a=ge.executeWithValues(Te.selectNoOfApprovalsForDraft,[Cn.STOCK_TRANSFER,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let i=0,c;if(Array.isArray(a)&&a.length&&(i=parseInt(a[0].U_NoOfApprovals,10),c=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+i),c==="Y"){if(parseInt(s.U_ApprovalLevel)==i?s.U_DraftStatus=M.APPROVED:parseInt(s.U_ApprovalLevel)<i&&(s.U_DraftStatus=M.PENDING),await Tn(s,t,n,c),s.U_DraftStatus==M.PENDING){let l=parseInt(s.U_ApprovalLevel)+1,d=ge.executeWithValues(Te.updateDraftNextApprovalLevel,[M.PENDING,s.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(d));let u=ge.executeWithValues(Te.selectUserInfo,s.U_OriginatorId),m=ge.executeWithValues(Te.selectDraftNextApproverDetails,[s.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(m)),Array.isArray(m)&&m.length&&u.length){let g=Nr.getMailBody(Rr.STOCK_TRANSFER,u[0].UserName,s.DocEntry);await hn(m[0].Email,Nr.subject,g)}}}else{let l=ge.executeWithValues(Te.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(l));let d=0;Array.isArray(l)&&l.length&&(d=l[0].Count),console.log("noOfApprovalsReceived: "+d),parseInt(d,10)+1>=parseInt(i,10)?(s.U_DraftStatus=M.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=M.PENDING,console.log("****PENDING")),await Tn(s,t,n,c)}}else s.U_DraftStatus==M.REJECTED&&(console.log("****REJECTED"),await Tn(s,t,n))}catch(n){console.log("Stock Transfer Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};gc.exports={createStockTransfer:Kf,updateDraft:eS}});var Cc=p(hc=>{var tS=A(),oS=D(),{getRandomNo:Zb,formatDate:rS,getClientHostname:sS}=L(),eO=Vs(),{sendMail:tO}=Ie(),{generateHash:oO,comparePassword:nS}=or(),fn=io(),{openSLConnection:aS,setSLCache:iS}=K(),{createUserSessionLog:lS}=xt(),{getUserStoreInfo:cS}=tn(),{canAssignUserToCounter:rO}=Cr(),{getLocationDefaults:dS}=uo();hc.validateUserLogin=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=tS.executeWithValues(oS.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{let n=s[0].Password&&(await nS(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(!n&&!a)return console.log("Password mismatch for user: "+e.body.userName),o({statusCode:401,message:"Invalid username/password!"});let i=process.env.SERVICE_LAYER_PASSWORD||e.body.password,c=await aS(e.body.userName,i);if(console.log("slCookie: "+c),iS(c),c){let l=s[0].InternalKey,{storeId:d,storeCounterId:u,counterCode:m,counterName:g,locationCode:C,storeLocation:T,storeWHCode:h}=await cS(l),E="",k=await fn.getSalesEmployeeForUser(l);Array.isArray(k)&&k.length>0&&(E=k[0].SlpCode);let W=await fn.getUserGroupByUser(l),ue=Array.isArray(W)&&W.length>0&&W[0].U_GroupName?W[0].U_GroupName.trim():"";console.log("DEBUG LOGIN - DB lookup for UserId:",l,"resulted in groups:",JSON.stringify(W)),console.log("DEBUG LOGIN - Assigned userGroup:",ue),e.session.userId=l,e.session.userName=e.body.userName,e.session.password=e.body.password,e.session.slCookie=c,e.session.slLoginTime=new Date,e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=ue,await new Promise(J=>{e.session.save(oo=>{oo?(console.log("Session save error (continuing with in-memory cache):",oo),J()):(console.log("Session saved successfully with slCookie and userGroup:",ue),J())})});let S=await sS(e),B="";if(T){let J=await dS(T);Array.isArray(J)&&J.length>0&&(B=J[0])}let Q={userId:l,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:E,storeId:d||null,storeCounterId:u||null,counterCode:m,counterName:g,locationCode:C,storeLocation:T,locationDefaults:B,clientIp:S,loginTime:rS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},x=await lS(Q);x.userGroup=ue,x.userSalesEmployeeCode=E,e.session.userSessionLog=x,e.session.storeWHCode=h,e.session.userSessionLog.locationCode=C;let De={InternalKey:l,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:x,storeWHCode:h,userGroup:ue,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",De.userGroup),console.log("userSalesEmployeeCode (nested):",De.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let J=fn.getUserPermissions(l);J&&(e.session.permissions=J,De.permissions=J),t.send(De)}catch(J){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(J)),t.status(500).send({message:J.message+". Unable to get User Permissions"})}}}else console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"})}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}}});var Ec=p((aO,Sc)=>{var uS=require("../node_modules/express/index.js"),pS=zl(),fc=cc(),nO=Tc(),mS=Cc(),{portalModules:Sn,permissions:En}=f(),{checkUserPermission:Dn}=N(),br=new uS.Router;br.route("/login").post(mS.validateUserLogin);br.route("/users").patch(Dn(Sn.USER,En.WRITE),pS.updateUserDetails);br.route("/stock-transfer-request").post(Dn(Sn.STOCK_TRANSFER_REQUEST,En.CREATE),fc.createStockTransferRequest).patch(Dn(Sn.STOCK_TRANSFER_REQUEST,En.WRITE),fc.updateDraft);Sc.exports=br});var In=p((iO,Dc)=>{var An=require("../node_modules/bunyan/lib/bunyan.js"),yS=require("path"),{formatDate:gS}=L(),TS=()=>{let e=yS.resolve(__dirname,"../../logs/pos.json"),t=process.env.NODE_ENV||"production",o=An.createLogger({dateTime:gS(new Date,"YYYY-MM-DD HH24:MI:SS"),name:"POS",streams:[{level:An.INFO,stream:process.stdout},{level:An.ERROR,type:"rotating-file",path:e,period:"1d",count:5}]});return console.log("Bunyan logger initialized.."),o},hS=e=>{try{TS().error(e)}catch(t){console.log("Error initializing Bunyan Logger: ",JSON.stringify(t))}};Dc.exports={logError:hS}});var Nc=p((lO,Ic)=>{var{httpStatusCodes:Ac}=f(),CS=e=>{let t=Ac.INTERNAL_SERVER_ERROR,o="Unexpected error! Contact Admin.";return e.response?(console.log("error.response.data"+JSON.stringify(e.response.data)),console.log("error.response.status:"+e.response.status),console.log("error.response.headers: "+JSON.stringify(e.response.headers)),e.response.status&&(t=e.response.status,o=e.response.data.error.message.value)):e.message?o=e.message:e.request?console.log("error.request: "+JSON.stringify(e.request)):console.log("Catch else - Error",e.message),e.code&&(t=e.code>=300?e.code:Ac.INTERNAL_SERVER_ERROR),{statusCode:t,message:o}};Ic.exports={serviceLayerErrorHandler:CS}});var bc=p((cO,Rc)=>{var{logError:fS}=In(),{serviceLayerErrorHandler:SS}=Nc(),{httpStatusCodes:ES}=f(),DS=(e,t,o,r)=>{console.error(e);let{statusCode:s,message:n}=SS(e);s||(s=e.statusCode||ES.INTERNAL_SERVER_ERROR),n||(n=e.detail?e.detail:e.message?e.message:e),fS({method:t.method,url:t.url,statusCode:s,message:n,stack:e.stack,requestBody:t.body,requestParams:t.params,requestQuery:t.query}),o.status(s).json({message:n})};Rc.exports=DS});var xc=p(Uc=>{var{serviceLayerAPI:Oc}=q(),{portalModules:AS,serviceLayerApiURIs:IS}=f(),NS=AS.BUSINESS_PARTNER,RS=IS[NS];Uc.createBusinessPartner=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** BusinessPartner request: "+JSON.stringify(e)),Oc.defaults.headers.Cookie=t;let o=await Oc.post(RS,e);return o.data?o.data:void 0}catch(o){throw console.log("Create BusinessPartner error: "+o),o}}});var wc=p((uO,Lc)=>{var{getSLConnection:bS}=K(),OS=xc(),US=async(e,t,o)=>{try{let r=await bS(e),s=await OS.createBusinessPartner(e.body,r);t.status(200).send({CardCode:s.CardCode})}catch(r){console.log("create Biz Partner: "+JSON.stringify(r)),o(r)}};Lc.exports={create:US}});var Bc=p((pO,_c)=>{var xS=require("../node_modules/express/index.js"),LS=wc(),{portalModules:wS,permissions:vS}=f(),{checkUserPermission:_S}=N(),vc=new xS.Router;vc.route("/").post(_S([wS.INVOICE],vS.CREATE),LS.create);_c.exports=vc});var bn=p(Or=>{var{dataSource:Nn}=re(),Rn=js(),Pc="cashDenominationId",BS="dateTime";Or.createCashDenomination=async e=>{try{return await Nn.getRepository(Rn).save(e)}catch(t){throw t}};Or.getCashDenominations=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Pc]=e.id,delete e.id);try{let o=Nn.getRepository(Rn);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[BS]:"ASC"}})}catch(o){throw o}};Or.deleteCashDenominations=async e=>{try{return await Nn.getRepository(Rn).delete({[Pc]:e})}catch(t){throw t}}});var Mc=p(Ur=>{var On=bn(),PS="trxType";Ur.create=async(e,t,o)=>{if(!e.body||!e.body[PS]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await On.createCashDenomination(e.body);t.send(r)}catch(r){console.error("Error creating CashDenomination!"),o(r)}};Ur.findAll=async(e,t,o)=>{try{let r=await On.getCashDenominations(e.query);t.send(r)}catch(r){console.error("Error getting CashDenomination!"),o(r)}};Ur.delete=async(e,t,o)=>{try{let r=await On.deleteCashDenominations(e.params.id);t.send(r)}catch(r){console.error("Error deleting CashDenomination!"),o(r)}}});var Wc=p((gO,Fc)=>{var MS=require("../node_modules/express/index.js"),Un=Mc(),{portalModules:xn,permissions:Ln}=f(),{checkUserPermission:wn}=N(),xr=new MS.Router;xr.post("/",wn(xn.INVOICE,Ln.CREATE),Un.create);xr.get("/",wn(xn.INVOICE,Ln.READ),Un.findAll);xr.delete("/:id",wn(xn.INVOICE,Ln.CANCEL),Un.delete);Fc.exports=xr});var kc=p($c=>{var{dbCreds:FS}=D();$c.creditCards=`SELECT T0."CreditCard", T0."CardName", T0."AcctCode", T0."CompanyId" "SurchargeAccount",
    T0."Phone" "SurchargePercentage"
  FROM ${FS.CompanyDB}.OCRC T0`});var Vc=p(Hc=>{var WS=A(),$S=kc();Hc.getCreditCards=()=>{try{return WS.executeWithValues($S.creditCards)}catch(e){throw console.log("getCreditCards - controller - error: "+JSON.stringify(e.message)),e}}});var qc=p(Jc=>{var{enableLocationBasedCreditCardAccount:kS}=f(),HS=Vc(),{getLocationDefaults:VS}=uo();Jc.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=HS.getCreditCards();if(kS&&e.query.location){let s=VS(e.query.location);r&&Array.isArray(s)&&s.length>0&&r.forEach(n=>{n.AcctCode=s[0].AccountCode})}t.send(r)}catch(r){console.log("Credit Card - controller - error: "+JSON.stringify(r.message)),o(r)}}});var zc=p((fO,jc)=>{var JS=require("../node_modules/express/index.js"),Gc=new JS.Router,qS=qc(),{checkUserPermission:GS}=N(),{portalModules:jS,permissions:zS}=f();Gc.route("/").get(GS(jS.INVOICE,zS.READ),qS.get);jc.exports=Gc});var vn=p((SO,Kc)=>{var qe=A(),{dbCreds:be}=D(),{formatDate:Qc}=L(),Yc=e=>{try{let t=(e||"").trim();if(!t)return null;let o=`
      SELECT 
        o."DistNumber" AS "VoucherNum",
        o."ItemCode",
        o."InDate",
        o."ExpDate",
        o."Status",
        COALESCE(o."U_Redeemed", 'N') AS "U_Redeemed",
        c."ItemName",
        c."U_VoucherValue"
      FROM ${be.CompanyDB}."OSRN" o
      LEFT JOIN ${be.CompanyDB}."OITM" c ON o."ItemCode" = c."ItemCode"
      WHERE UPPER(TRIM(o."DistNumber")) = UPPER(?)
    `,r=qe.executeWithValues(o,[t]);if(r&&r.length>0)return r[0];let s=`
      SELECT 
        b."IntrSerial" AS "VoucherNum",
        b."ItemCode",
        b."InDate",
        b."ExpDate",
        b."Status",
        COALESCE(b."U_Redeemed", 'N') AS "U_Redeemed",
        c."ItemName",
        c."U_VoucherValue"
      FROM ${be.CompanyDB}."OSRI" b
      LEFT JOIN ${be.CompanyDB}."OITM" c ON b."ItemCode" = c."ItemCode"
      WHERE UPPER(TRIM(b."IntrSerial")) = UPPER(?)
    `;return r=qe.executeWithValues(s,[t]),r&&r.length>0?r[0]:null}catch(t){throw console.error("getVoucherBySerial error:",t),t}},QS=e=>{try{let t=(e||"").trim();if(!t)return 0;let o=`
      UPDATE ${be.CompanyDB}."OSRN"
      SET "U_Redeemed" = 'Y', "Status" = 1
      WHERE UPPER(TRIM("DistNumber")) = UPPER(?)
        AND COALESCE("U_Redeemed", 'N') <> 'Y'
    `,r=`
      UPDATE ${be.CompanyDB}."OSRI"
      SET "U_Redeemed" = 'Y', "Status" = 1
      WHERE UPPER(TRIM("IntrSerial")) = UPPER(?)
        AND COALESCE("U_Redeemed", 'N') <> 'Y'
    `;try{qe.executeWithValues(r,[t])}catch{}let s=qe.executeWithValues(o,[t]);return typeof s=="number"?s:Array.isArray(s)?s.length:s?.affectedRows??1}catch(t){throw console.error("redeemVoucher error:",t),t}},YS=e=>{if(!e)return!1;if(String(e).toUpperCase()==="VOUCHER")return!0;try{let t=`SELECT "CreditCard", "CardName" FROM ${be.CompanyDB}."OCRC" WHERE "CreditCard" = ?`,o=qe.executeWithValues(t,[e]);return o&&o.length>0?(o[0].CardName||"").toUpperCase().includes("VOUCHER"):!1}catch(t){return console.error("isVoucherCard error:",t.message),!1}},KS=(e,t)=>{try{if(t){let o=Yc(t);if(o&&(Number(o.U_VoucherValue)>0||(o.ItemName||"").toUpperCase().includes("VOUCHER")||(o.ItemName||"").toUpperCase().includes("GIFT")))return!0}if(e){let o=`SELECT "ItemCode", "ItemName", "U_VoucherValue" FROM ${be.CompanyDB}."OITM" WHERE "ItemCode" = ?`,r=qe.executeWithValues(o,[e]);if(r&&r.length>0){let s=r[0];return Number(s.U_VoucherValue)>0||(s.ItemName||"").toUpperCase().includes("VOUCHER")||(s.ItemName||"").toUpperCase().includes("GIFT")}}return!1}catch(o){return console.error("isGiftVoucher error:",o.message),!1}},XS=(e,t,o=new Date)=>{try{let r=(t||"").trim();if(!r)return!1;let s=new Date(o||new Date),n=new Date(s.getFullYear(),s.getMonth(),s.getDate()+1,0,0,0),a=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),23,59,59),i=Qc(n,"YYYY-MM-DD"),c=Qc(a,"YYYY-MM-DD");console.log(`[BACKEND] Setting Voucher Validity for Serial ${r} (Item: ${e}): InDate = ${i}, ExpDate = ${c}`);let l=`
      UPDATE ${be.CompanyDB}."OSRN"
      SET "InDate" = ?, "ExpDate" = ?
      WHERE UPPER(TRIM("DistNumber")) = UPPER(?)
        AND ("ItemCode" = ? OR ? IS NULL)
    `,d=`
      UPDATE ${be.CompanyDB}."OSRI"
      SET "InDate" = ?, "ExpDate" = ?
      WHERE UPPER(TRIM("IntrSerial")) = UPPER(?)
        AND ("ItemCode" = ? OR ? IS NULL)
    `;try{qe.executeWithValues(d,[i,c,r,e||null,e||null])}catch{}let u=qe.executeWithValues(l,[i,c,r,e||null,e||null]);return console.log("[BACKEND] Voucher validity updated result:",JSON.stringify(u)),!0}catch(r){return console.error(`[BACKEND] updateVoucherValidityDates error for ${t}:`,r.message),!1}};Kc.exports={getVoucherBySerial:Yc,redeemVoucher:QS,isVoucherCard:YS,isGiftVoucher:KS,updateVoucherValidityDates:XS}});var Zc=p((EO,Xc)=>{var Lr=vn(),{formatDate:Ge}=L(),ZS=async(e,t,o)=>{try{let r=(e.body.voucherNumber||e.body.voucherNum||"").trim(),s=e.body.itemsTotal!==void 0&&e.body.itemsTotal!==null?Number(e.body.itemsTotal):null;if(!r)return t.status(400).send({success:!1,code:"INVALID_REQUEST",message:"Please enter voucher reference number."});let n=Lr.getVoucherBySerial(r);if(!n)return t.status(404).send({success:!1,code:"VOUCHER_NOT_FOUND",message:"Invalid voucher number."});if(n.U_Redeemed==="Y")return t.status(400).send({success:!1,code:"VOUCHER_ALREADY_REDEEMED",message:"This voucher has already been redeemed."});if(String(n.Status)==="1")return t.status(400).send({success:!1,code:"VOUCHER_NOT_AVAILABLE",message:"This voucher is unavailable or already redeemed."});let a=new Date;if(a.setHours(0,0,0,0),n.InDate){let l=new Date(n.InDate);if(l.setHours(0,0,0,0),a<l)return t.status(400).send({success:!1,code:"VOUCHER_NOT_ACTIVE",message:`This voucher is not active yet. It will be active on ${Ge(l,"DD/MM/YYYY")}.`})}if(n.ExpDate){let l=new Date(n.ExpDate);if(l.setHours(23,59,59,999),a>l)return t.status(400).send({success:!1,code:"VOUCHER_EXPIRED",message:`This voucher expired on ${Ge(l,"DD/MM/YYYY")}.`})}let i=Number(n.U_VoucherValue||0),c=s!=null&&s>0?Math.min(s,i):i;return t.status(200).send({success:!0,code:"VOUCHER_VALID",message:"Voucher validated successfully.",data:{voucherNumber:n.VoucherNum,voucherValue:i,appliedAmount:c,itemCode:n.ItemCode,itemName:n.ItemName,inDate:n.InDate?Ge(n.InDate,"YYYY-MM-DD"):null,expDate:n.ExpDate?Ge(n.ExpDate,"YYYY-MM-DD"):null,redeemed:!1}})}catch(r){console.error("custom-voucher validate error:",r),o(r)}},eE=async(e,t,o)=>{try{let r=(e.body.voucherNumber||e.body.voucherNum||"").trim(),s=e.body.invoiceNumber||"";if(!r)return t.status(400).send({success:!1,code:"INVALID_REQUEST",message:"Please enter voucher reference number."});let n=Lr.getVoucherBySerial(r);if(!n)return t.status(404).send({success:!1,code:"VOUCHER_NOT_FOUND",message:"Invalid voucher number."});if(n.U_Redeemed==="Y")return t.status(400).send({success:!1,code:"VOUCHER_ALREADY_REDEEMED",message:"This voucher has already been redeemed."});if(String(n.Status)==="1")return t.status(400).send({success:!1,code:"VOUCHER_NOT_AVAILABLE",message:"This voucher is unavailable or already redeemed."});let a=new Date;if(a.setHours(0,0,0,0),n.InDate){let c=new Date(n.InDate);if(c.setHours(0,0,0,0),a<c)return t.status(400).send({success:!1,code:"VOUCHER_NOT_ACTIVE",message:`This voucher is not active yet. It will be active on ${Ge(c,"DD/MM/YYYY")}.`})}if(n.ExpDate){let c=new Date(n.ExpDate);if(c.setHours(23,59,59,999),a>c)return t.status(400).send({success:!1,code:"VOUCHER_EXPIRED",message:`This voucher expired on ${Ge(c,"DD/MM/YYYY")}.`})}let i=Lr.redeemVoucher(r);return!i||i===0?t.status(400).send({success:!1,code:"VOUCHER_ALREADY_REDEEMED",message:"This voucher has already been redeemed."}):t.status(200).send({success:!0,code:"VOUCHER_REDEEMED",message:"Voucher redeemed successfully.",data:{voucherNumber:n.VoucherNum,invoiceNumber:s}})}catch(r){console.error("custom-voucher redeem error:",r),o(r)}},tE=async(e,t,o)=>{try{let r=(e.params.voucherNumber||"").trim();if(!r)return t.status(400).send({success:!1,code:"INVALID_REQUEST",message:"Voucher number parameter is required."});let s=Lr.getVoucherBySerial(r);return s?t.status(200).send({success:!0,data:{voucherNumber:s.VoucherNum,voucherValue:Number(s.U_VoucherValue||0),itemCode:s.ItemCode,itemName:s.ItemName,status:s.Status,inDate:s.InDate?Ge(s.InDate,"YYYY-MM-DD"):null,expDate:s.ExpDate?Ge(s.ExpDate,"YYYY-MM-DD"):null,redeemed:s.U_Redeemed==="Y"}}):t.status(404).send({success:!1,code:"VOUCHER_NOT_FOUND",message:"Voucher not found."})}catch(r){console.error("custom-voucher getVoucherDetails error:",r),o(r)}};Xc.exports={validate:ZS,redeem:eE,getVoucherDetails:tE}});var td=p((DO,ed)=>{var oE=require("../node_modules/express/index.js"),wr=new oE.Router,_n=Zc(),{checkUserPermission:Bn}=N(),{portalModules:Pn,permissions:Mn}=f();wr.route("/validate").post(Bn(Pn.INVOICE,Mn.READ),_n.validate);wr.route("/redeem").post(Bn(Pn.INVOICE,Mn.CREATE),_n.redeem);wr.route("/:voucherNumber").get(Bn(Pn.INVOICE,Mn.READ),_n.getVoucherDetails);ed.exports=wr});var od=p(oe=>{var{dbCreds:F}=D();oe.invoice=`SELECT DISTINCT 
    T0."DocNum", 
    T0."DocEntry", 
    T0."DocDate", 
    T0."CreateDate",
    T0."CreateTS",
    T0."DocTime", 
    T0."UpdateDate",
    T0."UpdateTS",
    T0."DocDueDate", 
    T0."BPLId" AS "branch",
    T0."CardCode", 
    T0."CardName", 
    T2."Cellular", 
    T0."NumAtCard", 
    T2."LicTradNum", 
    T2."QryGroup26",
    T2."U_CustomerType" AS "CustomerType",
    T4."U_Change" AS "Change",
    T0."Comments", 
    T0."DocStatus", 
    T0."DocCur", 
    T0."DocRate", 
    T0."DocTotal", 
    T0."DocTotalFC",
    T0."DiscPrcnt" AS "DiscountPercent", 
    T0."DiscSum" AS "TotalDiscount", 
    T0."DiscSumFC" AS "TotalDiscountFC",
    T0."VatSum", 
    T0."VatPercent", 
    T0."GroupNum" AS "PaymentTermCode", 
    T0."U_PaymentType", 
    T0."SlpCode" AS "SalesPersonCode",
    T5."SlpName" AS "SalesPersonName",
    T0."Address2" AS "ShipTo", 
    T0."U_CODEmail", 
    T0."U_CODCntName", 
    T0."U_CODTlePhone", 
    T0."U_Location", 
    T0."U_IsReprinted",
    T0."U_DeliveryApp"
FROM ${F.CompanyDB}.OINV T0
INNER JOIN ${F.CompanyDB}.INV1 T1 
    ON T0."DocEntry" = T1."DocEntry"
LEFT JOIN ${F.CompanyDB}.OCRD T2 
    ON T0."CardCode" = T2."CardCode"
LEFT JOIN ${F.CompanyDB}.RCT2 T3 
    ON T0."DocEntry" = T3."DocEntry"
LEFT JOIN ${F.CompanyDB}.ORCT T4 
    ON T3."DocNum" = T4."DocEntry"
LEFT JOIN ${F.CompanyDB}.OSLP T5 
    ON T0."SlpCode" = T5."SlpCode"
WHERE 
    T0."DocType" = 'I'
    AND T0."DocEntry" = T1."DocEntry"`;oe.itemListForInvoice=`
SELECT 
    T0."DocNum", 
    T0."DocEntry",
    T1."LineNum", 
    T1."ItemCode", 
    ITM."ItemName", 
    T1."LineStatus", 
    T1."Quantity", 
    T1."OpenQty", 
    T1."Price", 
    T1."DiscPrcnt" AS "DiscountPercent", 
    T1."unitMsr" AS "UomCode", 
    T1."VatGroup",
    T1."WhsCode", 
    T1."VatPrcnt" AS "TaxPercent", 
    T1."VatSum" AS "TaxLocal", 
    T1."VatSumFrgn" AS "TaxForeign",
    T1."LineTotal", 
    T1."U_ReturnedQty", 
    T1."U_RemainingOpenQty", 
    T1."PriceAfVAT" AS "NetUnitPrice", 
    T1."PriceBefDi" AS "PriceBeforeDiscount",
    ITM."ItmsGrpCod",
    ITM."ManSerNum",
    ITM."WarrntTmpl",
    T1."CogsOcrCod" AS "COGSBranch",
    T1."TreeType",
    T1."U_DeliveryApp"
FROM ${F.CompanyDB}.OINV T0
INNER JOIN ${F.CompanyDB}.INV1 T1 
    ON T0."DocEntry" = T1."DocEntry"
INNER JOIN ${F.CompanyDB}.OITM ITM 
    ON T1."ItemCode" = ITM."ItemCode"
WHERE T0."DocNum" IN 
`;oe.invoiceFircaURL=`SELECT 
    T0."DocNum", 
    T0."U_VerifyURL"
FROM ${F.CompanyDB}.OINV T0
WHERE T0."DocNum" = ?`;oe.invoiceAttachmentEntry=`SELECT 
    T0."DocNum", 
    T0."AtcEntry"
FROM ${F.CompanyDB}.OINV T0
WHERE T0."DocEntry" = ?`;oe.invoiceUDFData=`SELECT 
    T0."DocNum", 
    T0."U_InvCount", 
    T0."U_SDCTime", 
    T0."U_SDCInvNum", 
    T0."U_VehicleNo"
FROM ${F.CompanyDB}.OINV T0
WHERE T0."DocNum" = ?`;oe.updateTransRef=`UPDATE ${F.CompanyDB}.OCRH T0
SET T0."TransRef" = ?
WHERE T0."RctAbs" = ?`;oe.updateInvoiceItem=`UPDATE ${F.CompanyDB}.INV1 T1
SET 
    T1."U_ReturnedQty" = ?, 
    T1."U_RemainingOpenQty" = ?
WHERE 
    T1."DocEntry" = ? 
    AND T1."LineNum" = ?`;oe.updateInvoiceReprintStatus=`UPDATE ${F.CompanyDB}.OINV T0
SET T0."U_IsReprinted" = 'Y'
WHERE T0."DocEntry" = ?`;oe.invoiceDeliveyCodeData=`SELECT 
    T0."DeliveryCode", 
    T0."DocNum"
FROM ${F.CompanyDB}.OINV T0
WHERE T0."DocNum" = ?`;oe.updateSalesBatchSelectionDocNum=`UPDATE ${F.CompanyDB}.INV1 T1
SET T1."U_DocNum" = ?
WHERE 
    T1."DocEntry" = ? 
    AND T1."ItemCode" = ?`;oe.getUniqueId=`SELECT 
    T0."DocNum", 
    T0."DocEntry"
FROM ${F.CompanyDB}.OINV T0
WHERE T0."U_Unique" = ?`;oe.updateMfgSerialNumber=`UPDATE ${F.CompanyDB}.OSRN
SET "MnfSerial" = ?
WHERE UPPER(TRIM("DistNumber")) = UPPER(TRIM(?)) AND ("ItemCode" = ? OR ? IS NULL)`;oe.updateVoucherValidity=`UPDATE ${F.CompanyDB}.OSRN
SET "InDate" = ?, "ExpDate" = ?
WHERE UPPER(TRIM("DistNumber")) = UPPER(TRIM(?)) AND ("ItemCode" = ? OR ? IS NULL)`;oe.updateVoucherValidityOSRI=`UPDATE ${F.CompanyDB}.OSRI
SET "InDate" = ?, "ExpDate" = ?
WHERE UPPER(TRIM("IntrSerial")) = UPPER(TRIM(?)) AND ("ItemCode" = ? OR ? IS NULL)`});var sd=p(rd=>{var rE=require("../node_modules/axios/index.js");rd.getQRCodeDataURI=async e=>{try{let t="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",o=await rE.get(`${t}${encodeURIComponent(e)}`,{responseType:"arraybuffer"});return`data:image/png;base64,${Buffer.from(o.data,"binary").toString("base64")}`}catch(t){throw t}}});var Pe=p(b=>{var X=A(),{buildHeaderRecQuery:sE,buildRowLevelQuery:nE}=ve(),Z=od(),{getQRCodeDataURI:aE}=sd(),{serviceLayerAPI:NO}=q(),{getSLConnection:nd}=K(),ad=require("../node_modules/axios/index.js"),iE=require("https");b.getInvoiceByDocEntry=async(e,t=null)=>{try{if(!e&&e!==0)throw new Error("Invalid docEntry passed to getInvoiceByDocEntry");let r=`${process.env.SERVICE_LAYER_API_BASE_URL||"http://172.18.30.114:50001/b1s/v1"}/Invoices(${e})`,s=new iE.Agent({rejectUnauthorized:!1}),n=await nd(t);if(!n)throw new Error("Could not retrieve SL Cookie");let a;try{return console.log(`[Invoice Helper] Fetching status: ${r}`),a=await ad({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:n},timeout:15e3}),a.data}catch(i){if(i.response?.status===401){console.log("\u{1F501} SAP Session expired \u2014 re-logging and retrying...");let c=await nd(t);return(await ad({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:c},timeout:15e3})).data}throw i}}catch(o){let r=o.response?.data?.error?.message?.value||o.message;throw console.log("getInvoiceByDocEntry - SL Error:",r),new Error(r)}};b.getInvoices=e=>{try{let t=sE(Z.invoice,e,['T0."U_CODCntName"']);return console.log("getSalesQuotation- sql: ",t),X.executeWithValues(t)}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};b.updateInvoiceReprintStatus=e=>{try{let t=X.executeWithValues(Z.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};b.getItemDetails=e=>{try{let t=nE(Z.itemListForInvoice,e);return{itemsList:X.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};b.getTimberItemDetails=e=>{try{let t=Z.getTimberItems;return{itemsList:X.executeWithValues(t,[e])}}catch(t){throw console.log("getTimberItemDetails - controller - error: "+JSON.stringify(t.message)),t}};b.getAttachmentEntry=e=>{try{let t=X.executeWithValues(Z.invoiceAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};b.getFircaInfo=e=>{try{let t=X.executeWithValues(Z.invoiceFircaURL,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getFircaInfo - controller - error: "+JSON.stringify(t.message)),t}};b.getDeliveryInfo=e=>{try{let t=X.executeWithValues(Z.invoiceDeliveyCodeData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getDeliveryInfo - controller - error: "+JSON.stringify(t.message)),t}};b.getUDFInfo=e=>{try{let t=X.executeWithValues(Z.invoiceUDFData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUDFInfo - controller - error: "+JSON.stringify(t.message)),t}};b.updateTransRef=(e,t)=>{try{return X.executeWithValues(Z.updateTransRef,[t,e])}catch(o){throw console.log("updateTransRef - controller - error: "+JSON.stringify(o.message)),o}};b.getFircaQRCodeDataURI=async e=>{try{let t=b.getFircaInfo(e);console.log("getFircaQRCode - url: "+JSON.stringify(t));let o;return t&&t.U_VerifyURL&&(o=await aE(t.U_VerifyURL)),o}catch(t){throw console.log("getFircaQRCode - helper: "+JSON.stringify(t.message)),t}};b.getDeliveryCode=async e=>{try{let t=b.getDeliveryInfo(e);return console.log("get Delivery Code: "+JSON.stringify(t)),t}catch(t){throw console.log("getDeliveryCode - helper: "+JSON.stringify(t.message)),t}};b.getUDFData=async e=>{try{let t=b.getUDFInfo(e);return console.log("get UDF Data: "+JSON.stringify(t)),t}catch(t){throw console.log("get UDF Data - helper: "+JSON.stringify(t.message)),t}};b.updateRemainingQuantity=e=>{try{if(Array.isArray(e)&&e.length>0){let t=e.map(r=>[r.U_ReturnedQty!==null&&r.U_ReturnedQty!==void 0?Number(r.U_ReturnedQty):null,r.U_RemainingOpenQty!==null&&r.U_RemainingOpenQty!==void 0?Number(r.U_RemainingOpenQty):null,Number(r.DocEntry),Number(r.LineNum)]);console.log("updateRemainingQuantity- updateRequest: "+JSON.stringify(t));let o=X.executeBatchInsertUpdate(Z.updateInvoiceItem,t);return console.log("updateRemainingQuantity- response: "+JSON.stringify(o)),o}return null}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};b.updateReprint=e=>{try{if(e){let t=X.executeWithValues(Z.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(t.message)),t}};b.updateSalesBatchSelection=(e,t)=>{try{if(console.log("updateSalesBatchSelection %s %s %s %s",e.DocNum,t,e.U_ItemCode,e.U_LineNum),e){let o=X.executeWithValues(Z.updateSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode,e.U_LineNum]);return console.log("updateSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(o.message)),o}};b.getUniqueId=e=>{try{let t=X.executeWithValues(Z.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(t.message)),t}};b.getAttachmentPath=()=>{try{let e=X.executeWithValues(Z.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentPath - Helper - error: "+JSON.stringify(e.message)),e}};b.getSalesEmployeeDiscount=e=>{try{let t=X.executeWithValues(Z.getSalesEmployeeDiscount,[e]);return Array.isArray(t)&&t.length>0?t[0].SalesDisc:0}catch(t){return console.log("getSalesEmployeeDiscount - helper - error: "+JSON.stringify(t.message)),0}};b.updateMfgSerialNumber=(e,t,o)=>{try{if(t&&o!==void 0&&o!==null){let r=X.executeWithValues(Z.updateMfgSerialNumber,[o,t,e,e]);return console.log(`[BACKEND] updateMfgSerialNumber result for ${t} (${e}):`,JSON.stringify(r)),!0}return null}catch(r){return console.error(`[BACKEND] updateMfgSerialNumber error for ${t}:`,r.message),null}}});var id=p(lt=>{var Mt=Pe();lt.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Mt.getInvoices(e.query);t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};lt.updateReprint=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));let{DocEntry:r,U_IsReprinted:s}=e.body;try{let n=Mt.updateInvoiceReprintStatus(r,s);t.send({message:"Invoice Reprint Status Updated Successfully",success:!0})}catch(n){console.log("getInvoice - controller - error: "+JSON.stringify(n.message)),o(n)}};lt.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Mt.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};lt.getFircaQRCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await Mt.getFircaQRCodeDataURI(e.query.docNum);t.send(r)}catch(r){console.log("getFircaCode - controller - error: "+JSON.stringify(r.message)),o(r)}};lt.getDeliveryCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await Mt.getDeliveryCode(e.query.docNum);console.log("getDeliveryCode - Response: "+JSON.stringify(r)),t.send({DeliveryCode:r.DeliveryCode})}catch(r){console.log("getDeliveryCode - controller - error: "+JSON.stringify(r.message)),o(r)}};lt.checkDeliveryConfirmation=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.body));try{let r=!1,s=await Mt.getDeliveryCode(e.body.docNum);console.log("checkDeliveryConfirmation - Response: "+JSON.stringify(s)),e.body.DeliveryCode===s.DeliveryCode&&(r=!0),t.send({isValid:r})}catch(r){console.log("checkDeliveryConfirmation - controller - error: "+JSON.stringify(r.message)),o(r)}}});var cd=p((OO,ld)=>{var lE=require("../node_modules/express/index.js"),ct=new lE.Router,Ft=id(),{checkUserPermission:Wt}=N(),{portalModules:$t,permissions:kt}=f();ct.route("/").get(Wt($t.INVOICE,kt.READ),Ft.get);ct.route("/reprint").patch(Wt($t.INVOICE,kt.READ),Ft.updateReprint);ct.route("/items").get(Wt($t.INVOICE,kt.READ),Ft.getItems);ct.route("/firca-code").get(Wt($t.INVOICE,kt.READ),Ft.getFircaQRCode);ct.route("/delivery-code").get(Wt($t.INVOICE,kt.READ),Ft.getDeliveryCode);ct.route("/delivery-confirmation").post(Wt($t.INVOICE,kt.READ),Ft.checkDeliveryConfirmation);ld.exports=ct});var vr=p(dd=>{var cE=require("../node_modules/axios/index.js"),dE=require("https");dd.submitInvoicetoFirca=async(e,t,o)=>{try{if(!process.env.FIRCA_API_BASE_URL)return console.log("FIRCA_API_BASE_URL is not defined. Skipping Firca integration."),!1;let r="";o=="Invoice"?r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_INVOICE_URI:r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_SALES_QUOTATION_URI;let s={DocEntry:e,CompanyCode:t},n=await cE.post(r,s,{httpsAgent:new dE.Agent({rejectUnauthorized:!1}),auth:{username:process.env.FIRCA_USERNAME,password:process.env.FIRCA_PASSWORD}});return console.log("submitInvoicetoFirca - response: "+JSON.stringify(n.data)),n.data.statusCode===1}catch(r){throw r}}});var pd=p(ud=>{var{enableFircaIntegration:uE}=f(),{submitInvoicetoFirca:pE}=vr(),{getFircaQRCodeDataURI:mE,getUDFData:yE,updateReprint:gE,getTimberItemDetails:TE}=Pe();ud.createFirca=async(e,t,o)=>{try{if(e.body.invoice){let r={},s=e.body.invoice;console.log("req.query"+JSON.stringify(e.body.invoice));let n=s.CompanyCode?s.CompanyCode:"",a=s.DocEntry?s.DocEntry:"",i=s.DocNum?s.DocNum:"";if(uE&&await pE(a,n,"Invoice")){let d=await mE(i);console.log("qrCodeDataURI",d),r.qrCode=d}let c=await yE(i);if(c&&(r.InvCount=c.U_InvCount,r.SDCTime=c.U_SDCTime,r.SDCInvNum=c.U_SDCInvNum,r.VehicleNo=c.U_VehicleNo,gE(a)&&console.log("Reprint Updated Successfully!")),a){let l=TE(a);r.timItemList=l}t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'Firca' property!"})}catch(r){console.log("create Invoice: "+JSON.stringify(r)),o(r)}}});var gd=p((LO,yd)=>{var hE=require("../node_modules/express/index.js"),md=new hE.Router,CE=pd(),{checkUserPermission:fE}=N(),{portalModules:SE,permissions:EE}=f();md.route("/").post(fE(SE.INVOICE,EE.READ),CE.createFirca);yd.exports=md});var Br=p((Ht,Sd)=>{var{serviceLayerAPI:Oe}=q(),{portalModules:hd,serviceLayerApiURIs:Cd,attachmentPath:DE}=f(),AE=Pe(),IE=hd.INVOICE,Wn=Cd[IE],Td=hd.ATTACHMENTS,Fn=require("fs"),_r=require("path"),wO=require("../node_modules/pdfkit/js/pdfkit.js"),fd=require("../node_modules/multer/index.js"),NE=fd.memoryStorage(),RE=fd({storage:NE});Ht.createInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),Oe.defaults.headers.Cookie=t;let o=await Oe.post(Wn,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Invoice error: "+o),o}};Ht.updateInvoice=async(e,t)=>{try{let{DocEntry:o,...r}=e;console.log("*** Invoice request: "+JSON.stringify(r)),Oe.defaults.headers.Cookie=t;let s=await Oe.patch(`${Wn}(${o})`,r);return s&&s.status===204?(console.log("*** Invoice updated successfully. No content in response."),{message:"Invoice updated successfully.",status:200}):(console.warn("*** Unexpected response status:",s.status),{message:"Unexpected response from server.",status:s.status})}catch(o){throw console.error("Create Invoice error:",o.message),console.error(o.stack),o}};Ht.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),Oe.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=_r.extname(s).replace(".",""),a=_r.basename(s,"."+n),i=s,c=_r.join(DE,"assets/attachment");Fn.existsSync(c)||Fn.mkdirSync(c,{recursive:!0});let l=_r.join(c,s);console.log("fullFilePath: *** "+l+" = "+r),Fn.writeFileSync(l,r),console.log(`*** File saved successfully at ${l}`);let d={Attachments2_Lines:[{FileExtension:n,SourcePath:c.replace(/\\/g,"/"),UserID:e.session.userId,FileName:a}]},u={},m,g={Accept:"application/json","Content-Type":"application/json"},C=await AE.getAttachmentEntry(t||e.body.DocEntry);if(console.log("Invoice response",JSON.stringify(C)),C&&C?.AtcEntry!==null){if(m=C?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(m)),u=await Oe.patch(`${Td}(${m})`,d),u&&u.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),u=await Oe.post(Td,d,{headers:g}),console.log("Attachment Post API Called"),u.data){console.log("Attachment Post Response:"+JSON.stringify(u.data)),m=u.data.AbsoluteEntry;let T={AttachmentEntry:m},h=await Oe.patch(`${Wn}(${t||e.body.DocEntry})`,T);if(h&&h.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",u.status),{message:"Unexpected response from server.",status:u.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};var vO=Pe(),bE=require("../node_modules/form-data/lib/form_data.js"),OE=require("../node_modules/axios/index.js"),UE=require("https");Ht.createAttachmentEntry=async(e,t)=>{try{if(!e.file)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.file.originalname}`);let o=new bE;o.append("file",e.file.buffer,{filename:e.file.originalname,contentType:e.file.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await OE.post(s,o.getBuffer(),{headers:n,httpsAgent:new UE.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachmentEntry (Direct Upload) error:",JSON.stringify(r)),o.response&&console.error(`*** status: ${o.response.status}`),null}};Ht.linkAttachmentToDocument=async(e,t,o,r)=>{try{let s=Cd[e];if(!s)throw new Error(`Unknown docType: ${e}`);Oe.defaults.headers.Cookie=r;let n={AttachmentEntry:o};console.log(`*** Linking Attachment ${o} to ${e} (${s}) DocEntry ${t}...`);let a=await Oe.patch(`${s}(${t})`,n);return a.status===204?(console.log(`*** Successfully linked attachment to ${e} ${t}`),!0):(console.warn(`*** Unexpected response during linking: ${a.status}`),!1)}catch(s){return console.error(`linkAttachmentToDocument error linking to ${e}:`,s.response?.data||s.message),!1}};Sd.exports.upload=RE});var Dd=p($n=>{var{serviceLayerAPI:Pr}=q(),{portalModules:xE,serviceLayerApiURIs:LE}=f(),wE=xE.INCOMING_PAYMENT,Ed=LE[wE];$n.createIncomingPayment=async(e,t)=>{try{e.DocObjectCode="bopot_IncomingPayments",console.log("*** IncomingPayment request: "+JSON.stringify(e)),console.log("*** [DEBUG] IncomingPayment final request payload: "+JSON.stringify(e)),Pr.defaults.headers.Cookie=t;let o=await Pr.post(Ed,e);return console.log(`Create IncomingPayment response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create IncomingPayment error: "+o),o}};$n.updatePaymentAttachment=async(e,t,o)=>{try{if(console.log("*** IncomingPayment Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Payment Attachment: No file uploaded!",status:200,success:!1};let s=await Br().createAttachmentEntry(e,o);if(s){let n={Attachments2_Lines:[{FileName:require("path").basename(e.file.originalname,require("path").extname(e.file.originalname)),FileExtension:require("path").extname(e.file.originalname).replace(".",""),SourcePath:f().attachmentPath.replace(/\\/g,"/")}]};if(Pr.defaults.headers.Cookie=o,(await Pr.patch(`${Ed}(${t})`,n)).status===204)return console.log("*** IncomingPayment Attachment linked successfully."),{message:"Payment Attachment updated successfully.",status:200,absEntry:s}}return{message:"Failed to link attachment",status:500}}catch(r){throw console.error("Payment Attachment upload error:",r.response?.data||r.message),r}}});var Co=p(ho=>{var{serviceLayerAPI:Me}=q(),{portalModules:vE}=f(),_E=A(),{dbCreds:BE}=D(),{getInvoiceByDocEntry:PE}=Pe(),To=vE.OSBS;ho.getSalesBatchSelection=async(e,t,o)=>{try{Me.defaults.headers.Cookie=o;let r=await Me.get(`${To}?$filter=U_InvNo eq '${e}' and U_ItemCode eq '${t}'`);if(Array.isArray(r?.data?.value)&&r.data.value.length>0){let s=r.data.value[0],n={};try{let a=`SELECT "DocEntry" FROM ${BE.CompanyDB}.OINV WHERE "DocNum" = ?`,i=_E.executeWithValues(a,[e]);if(i&&i.length>0){let c=i[0].DocEntry;console.log(`[getSalesBatchSelection] Fetching Invoice ${c} (DocNum ${e}) for bin enrichment...`);let l=await PE(c,{headers:{Cookie:o}});l&&Array.isArray(l.DocumentLines)&&l.DocumentLines.forEach(d=>{d.ItemCode===t&&Array.isArray(d.DocumentLinesBinAllocations)&&(d.DocumentLinesBinAllocations.forEach(u=>{u.BinAbsEntry&&(n[u.SerialAndBatchNumbersBaseLine]=n[u.SerialAndBatchNumbersBaseLine]||{})}),Array.isArray(d.BatchNumbers)&&d.BatchNumbers.forEach((u,m)=>{let g=d.DocumentLinesBinAllocations.find(C=>C.SerialAndBatchNumbersBaseLine===m);g&&(n[u.BatchNumber]={BinAbsEntry:g.BinAbsEntry,BinCode:""})}))})}}catch(a){console.warn("[getSalesBatchSelection] Bin enrichment failed:",a.message)}if(Array.isArray(s.SBS1Collection)){let a=(l,d,u,m)=>`${l}_${parseFloat(d)}_${parseFloat(u)}_${parseFloat(m).toFixed(5)}`,i=new Set,c=[];s.SBS1Collection.forEach(l=>{let d=a(l.U_Batch,l.U_Width,l.U_Height,l.U_Length);if(!i.has(d)){i.add(d);let u=n[l.U_Batch];c.push({...l,BinAbsEntry:u?.BinAbsEntry||null,BinCode:u?.BinCode||""})}}),console.log(`[getSalesBatchSelection] Deduplicated and enriched SBS1Collection: ${c.length} rows`),s.SBS1Collection=c}return s}return null}catch(r){throw console.log("Get SalesBatchSelection error: "+r),r}};ho.updateSalesBatchSelection=async(e,t)=>{try{return Me.defaults.headers.Cookie=t,(await Me.patch(`${To}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update SalesBatchSelection error: "+o),o}};ho.updateOSBSForQuotation=async(e,t,o)=>{let r=[],s=String(e);console.log(`[updateOSBSForQuotation] Starting update for SQ DocNum: ${s}, items: ${t.length}`);for(let n of t)try{Me.defaults.headers.Cookie=o;let a=`${To}?$filter=U_InvNo eq '${s}' and U_ItemCode eq '${n.U_ItemCode}'`;console.log(`[updateOSBSForQuotation] GET: ${a}`);let i=await Me.get(a);if(console.log(`[updateOSBSForQuotation] GET result count: ${i?.data?.value?.length}`),Array.isArray(i?.data?.value)&&i.data.value.length>0){let c=i.data.value[0];console.log("[updateOSBSForQuotation] Existing OSBS record:",JSON.stringify(c,null,2));let l=Array.isArray(c.SBS1Collection)?c.SBS1Collection:[],d=n.SBS1Collection||[],u=(S,B,Q,x)=>`${S}_${parseFloat(B)}_${parseFloat(Q)}_${parseFloat(x).toFixed(5)}`,m=new Map,g=[],C=[];l.forEach((S,B)=>{let Q=u(S.U_Batch,S.U_Width,S.U_Height,S.U_Length);m.has(Q)?C.push(B):(m.set(Q,B),g.push(B))}),console.log(`[updateOSBSForQuotation] Existing rows: ${l.length}, Canonical: ${g.length}, Duplicates to zero: ${C.length}`);let T={};d.forEach(S=>{let B=u(S.U_Batch,S.U_Width,S.U_Height,S.U_Length);T[B]||(T[B]={pcs:0}),T[B].pcs+=parseInt(S.U_NoOfPcs)||1});let h=l.map((S,B)=>{let Q=u(S.U_Batch,S.U_Width,S.U_Height,S.U_Length),x=m.get(Q)===B,De=Math.round(parseFloat(S.U_AvlPcs)||0),J=parseFloat(S.U_AvlQty)||0;if(!x||!T[Q]||T[Q].pcs<=0)return{LineId:S.LineId,U_Batch:S.U_Batch,U_Width:S.U_Width,U_Height:S.U_Height,U_Length:S.U_Length,U_AvlQty:S.U_AvlQty,U_NoOfPcs:0,U_SelQty:0,U_AvlPcs:S.U_AvlPcs,U_BalPcs:De,U_BalAvlQty:J};let oo=T[Q],ro=Math.min(oo.pcs,De);oo.pcs-=ro;let rg=J/(De||1),si=ro===De?J:parseFloat((ro*rg).toFixed(5));return{LineId:S.LineId,U_Batch:S.U_Batch,U_Width:S.U_Width,U_Height:S.U_Height,U_Length:S.U_Length,U_AvlQty:S.U_AvlQty,U_NoOfPcs:ro,U_SelQty:si,U_AvlPcs:S.U_AvlPcs,U_BalPcs:De-ro,U_BalAvlQty:parseFloat((J-si).toFixed(5))}});Object.keys(T).forEach(S=>{T[S].pcs>0&&console.warn(`[updateOSBSForQuotation] Spec ${S} still has ${T[S].pcs} pieces unmet after assignment.`)});let E=h.reduce((S,B)=>S+B.U_NoOfPcs,0),k=Number(h.reduce((S,B)=>S+B.U_SelQty,0).toFixed(5)),W=n.U_TotalQty||k,ue={U_Quantity:E||c.U_Quantity||1,U_TotalQty:W,U_LineNum:c.U_LineNum,U_WhsCode:n.U_WhsCode||c.U_WhsCode,SBS1Collection:h};console.log(`[updateOSBSForQuotation] PATCHing OSBS DocEntry: ${c.DocEntry}, U_Qty: ${ue.U_Quantity}, U_TotalQty: ${ue.U_TotalQty}, Canonical: ${g.length}, ZeroedDupes: ${C.length}`),await Me.patch(`${To}(${c.DocEntry})`,ue),r.push({updated:!0,DocEntry:c.DocEntry,item:n.U_ItemCode}),console.log(`[updateOSBSForQuotation] PATCH success for DocEntry: ${c.DocEntry}`)}else console.warn(`[updateOSBSForQuotation] No OSBS found for SQ DocNum: ${s}, Item: ${n.U_ItemCode}. Cannot update.`),r.push({updated:!1,item:n.U_ItemCode})}catch(a){let i=a.response?.data?.error?.message?.value||a.message;console.error(`[updateOSBSForQuotation] Error for SQ ${s}, Item ${n.U_ItemCode}: ${i}`),r.push({updated:!1,item:n.U_ItemCode,error:i})}return r};ho.createSalesBatchSelection=async(e,t,o,r)=>{console.log("*** SalesBatchSelection request: "+JSON.stringify(e));let s=Array.isArray(e)?e:[e],n=[];for(let a of s)try{Me.defaults.headers.Cookie=r,a.U_InvNo=o;let i=await Me.post(To,a),{DocNum:c,U_LineNum:l,U_ItemCode:d}=i.data;console.log("*** SalesBatchSelection response:**** "+JSON.stringify(i.data)),n.push({DocNum:c,U_LineNum:l??a.U_LineNum,U_ItemCode:d})}catch(i){console.error(`Error creating OSBS record for item ${a.U_ItemCode||a.ItemCode}:`,i.response?.data?.error?.message?.value)}return n}});var Nd=p(Id=>{var{serviceLayerAPI:Ad}=q(),{portalModules:ME,serviceLayerApiURIs:FE}=f(),WE=ME.JOURNAL_ENTRY,$E=FE[WE];Id.createJournalEntry=async(e,t)=>{try{console.log("*** JournalEntry request: "+JSON.stringify(e)),Ad.defaults.headers.Cookie=t;let o=await Ad.post($E,e);return o.data?o.data:void 0}catch(o){throw console.log("Create JournalEntry error: "+o),o}}});var Md=p((VO,Pd)=>{var{getSLConnection:_d}=K(),Mr=Br(),Rd=A(),Vt=vn(),{dbCreds:bd}=D(),kE=Dd(),HE=Co(),VE=Nd(),MO=bn(),{formatDate:Fr}=L(),{trxTypes:FO,defaultBranchId:WO,fircaIntegrationWaitTime:$O,enableFircaIntegration:JE,objectCodes:Od,portalModules:Ud,enableStoreBasedNumbering:xd,isHomeDeliveryEnabled:qE}=f(),{submitInvoicetoFirca:GE}=vr(),{getFircaQRCodeDataURI:jE,getUDFData:Ld,updateSalesBatchSelection:zE,updateTransRef:QE,getUniqueId:kO,updateMfgSerialNumber:YE}=Pe(),{getNumberingSeries:wd}=Ar(),{getItemDetails:vd,getTimberItemDetails:HO}=Pe(),kn=new Map,KE=async(e,t,o)=>{let r=null;try{if(typeof e.body.request=="string"){let s=JSON.parse(e.body.request);Object.assign(e.body,s)}if(typeof e.body.invoice=="string"&&(e.body.invoice=JSON.parse(e.body.invoice)),typeof e.body.incomingPayment=="string"&&(e.body.incomingPayment=JSON.parse(e.body.incomingPayment)),typeof e.body.salesBatchSelection=="string"&&(e.body.salesBatchSelection=JSON.parse(e.body.salesBatchSelection)),typeof e.body.journalEntry=="string"&&(e.body.journalEntry=JSON.parse(e.body.journalEntry)),e.body.invoice){if(r=e.body.invoice.U_POS_TransactionID||e.body.invoice.Unique||e.body.invoice.U_Unique,r){if(kn.has(r))return console.error(`[BACKEND] Concurrent request detected for TransactionID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});kn.set(r,!0)}let s={},n="",a={},i=e.body.invoice,c=i.CompanyCode?i.CompanyCode:"";if(e.body.incomingPayment?.PaymentCreditCards&&Array.isArray(e.body.incomingPayment.PaymentCreditCards)){for(let m of e.body.incomingPayment.PaymentCreditCards)if((String(m.CreditCard).toUpperCase()==="VOUCHER"||m.CreditCard===16||(e.body.invoice?.U_PaymentType||"").toUpperCase().includes("VOUCHER")||Vt.isVoucherCard(m.CreditCard))&&m.VoucherNum){let C=m.VoucherNum.trim();console.log(`[BACKEND] Validating voucher ${C} before creating invoice`);let T=Vt.getVoucherBySerial(C);if(!T)return t.status(400).send({success:!1,code:"VOUCHER_NOT_FOUND",message:`Invalid voucher number: ${C}`});if(T.U_Redeemed==="Y")return t.status(400).send({success:!1,code:"VOUCHER_ALREADY_REDEEMED",message:`This voucher (${C}) has already been redeemed.`});if(String(T.Status)==="1")return t.status(400).send({success:!1,code:"VOUCHER_NOT_AVAILABLE",message:`Voucher ${C} is unavailable or already redeemed.`});let h=new Date;if(h.setHours(0,0,0,0),T.InDate){let S=new Date(T.InDate);if(S.setHours(0,0,0,0),h<S)return t.status(400).send({success:!1,code:"VOUCHER_NOT_ACTIVE",message:`This voucher (${C}) is not active yet. It will be active on ${Fr(S,"DD/MM/YYYY")}.`})}if(T.ExpDate){let S=new Date(T.ExpDate);if(S.setHours(23,59,59,999),h>S)return t.status(400).send({success:!1,code:"VOUCHER_EXPIRED",message:`This voucher (${C}) expired on ${Fr(S,"DD/MM/YYYY")}.`})}let E=Number(T.U_VoucherValue||0),k=Math.round(E*100),W=Number(m.CreditSum||0);if(Math.round(W*100)>k)return t.status(400).send({success:!1,code:"VOUCHER_AMOUNT_EXCEEDED",message:`Payment amount ($${W.toFixed(2)}) exceeds voucher value ($${E.toFixed(2)}).`})}}let l=await _d(e),d;if(qE&&i.U_IsHomeDelivery==="Y"&&(d=Math.floor(1e5+Math.random()*9e5),i.U_DeliveryCode=d),xd){let m=await wd(Od[Ud.INVOICE],e.session.userSessionLog.storeLocation);m&&(console.log("seriesResponse series:",m.Series),i.Series=m.Series)}if(Array.isArray(i.DocumentLines)){for(let m of i.DocumentLines)if(Array.isArray(m.SerialNumbers))for(let g of m.SerialNumbers){if(g.InternalSerialNumber&&g.ManufacturerSerialNumber)try{YE(m.ItemCode,g.InternalSerialNumber,g.ManufacturerSerialNumber)}catch(T){console.error("[BACKEND] Error updating ManufacturerSerialNumber in OSRN:",T.message)}let C=g.InternalSerialNumber||g.ManufacturerSerialNumber;if(C&&Vt.isGiftVoucher(m.ItemCode,C))try{let T=i.DocDate||new Date;Vt.updateVoucherValidityDates(m.ItemCode,C,T)}catch(T){console.error("[BACKEND] Error updating voucher validity dates:",T.message)}}}console.log("PAYLOAD_TO_SAP:",JSON.stringify(i,null,2));let u=await Mr.createInvoice(i,l);if(u.isExist){s.DocNum=u.DocNum,s.DocEntry=u.DocEntry,s.isExist=!0;try{let C=`SELECT TOP 1 "CreateDate", "CreateTS", "DocTime", "DocDate" FROM ${bd.CompanyDB}.OINV WHERE "DocEntry" = ?`,T=Rd.executeWithValues(C,[u.DocEntry]);T&&T.length>0&&(s.DocDate=T[0].DocDate||u.DocDate,s.CreateDate=T[0].CreateDate,s.CreateTS=T[0].CreateTS,s.DocTime=T[0].DocTime)}catch(C){console.error("Failed fetching precise time for duplicate",C.message)}let m=await Ld(u.DocNum);m&&(s.InvCount=m.U_InvCount,s.SDCTime=m.U_SDCTime,s.SDCInvNum=m.U_SDCInvNum,s.VehicleNo=m.U_VehicleNo);let g=await vd({docNum:s.DocNum});return s.itemList=g,t.status(200).send(s)}if(u.DocEntry){if(s.DocNum=u.DocNum,s.DocEntry=u.DocEntry,i.DocumentLines?.some(C=>C.BaseType===23||C.BaseType==="23")&&i.DocDueDate){console.log(`[BACKEND] Invoice ${u.DocEntry} created from Quotation. Overriding DocDueDate to ${i.DocDueDate} to match invoice expiry period.`);try{await Mr.updateInvoice({DocEntry:u.DocEntry,DocDueDate:i.DocDueDate},l),console.log(`[BACKEND] Successfully updated DocDueDate for Invoice ${u.DocEntry}`)}catch(C){console.error(`[BACKEND] Failed to update DocDueDate for Invoice ${u.DocEntry}:`,C.message)}}try{let C=`SELECT TOP 1 "CreateDate", "CreateTS", "DocTime" FROM ${bd.CompanyDB}.OINV WHERE "DocEntry" = ?`,T=Rd.executeWithValues(C,[u.DocEntry]);T&&T.length>0?(s.DocDate=u.DocDate,s.CreateDate=T[0].CreateDate,s.CreateTS=T[0].CreateTS,s.DocTime=T[0].DocTime):(s.DocDate=u.DocDate,s.CreateDate=u.CreationDate,s.CreateTS=u.CreationTime,s.DocTime=u.DocTime)}catch(C){console.error("Failed fetching precise time",C.message),s.DocDate=u.DocDate,s.CreateDate=u.CreationDate,s.CreateTS=u.CreationTime,s.DocTime=u.DocTime}if(s.isExist=!1,e.body.incomingPayment){if(xd){let T=await wd(Od[Ud.INCOMING_PAYMENT],e.session.userSessionLog.storeLocation);T&&(console.log("seriesResponse series:",T.Series),e.body.incomingPayment.Series=T.Series)}let C=await XE(u.DocEntry,e.body.incomingPayment,l);if(C&&(s.IncomingPaymentDocNum=C.DocNum,n=C.DocEntry,e.body?.journalEntry)){let T=await ZE(e.body.journalEntry,u.DocNum,C.DocNum,l);s.JournalEntryDocNum=T?.JdtNum}}if(JE&&await GE(u.DocEntry,c,"Invoice")){let T=await jE(u.DocNum);console.log("qrCodeDataURI",T),s.qrCode=T}let g=await Ld(u.DocNum);g&&(s.InvCount=g.U_InvCount,s.SDCTime=g.U_SDCTime,s.SDCInvNum=g.U_SDCInvNum,s.VehicleNo=g.U_VehicleNo)}if(console.log("*************invoiceSalesBatchResponse start************ "),e.body.salesBatchSelection&&e.body.salesBatchSelection.length>0){let m=await eD(s.DocEntry,s.DocNum,e.body.salesBatchSelection,l);console.log("*************invoiceSalesBatchResponse************: ",m)}if(console.log("*************invoiceSalesBatchResponse end************ "),e.body.invoice.U_PaymentType==="Card"){if(console.log("*************CreditCard Management reference start************ "),e.body.incomingPayment?.TransferReference&&e.body.incomingPayment?.TransferReference!==""){console.log("*************CreditCard Management reference************: ",n+" - "+e.body.incomingPayment.TransferReference);let m=await QE(n,e.body.incomingPayment?.TransferReference);console.log("*************CreditCard Management reference************: ",m)}console.log("*************CreditCard Management reference end************ ")}if(e.body.incomingPayment?.PaymentCreditCards&&Array.isArray(e.body.incomingPayment.PaymentCreditCards))for(let m of e.body.incomingPayment.PaymentCreditCards){let g=String(m.CreditCard).toUpperCase()==="VOUCHER"||m.CreditCard===16||(e.body.invoice?.U_PaymentType||"").toUpperCase().includes("VOUCHER")||Vt.isVoucherCard(m.CreditCard);if(m.VoucherNum&&g){console.log(`[BACKEND] Auto-redeeming voucher ${m.VoucherNum} for Invoice ${s.DocNum}`);try{Vt.redeemVoucher(m.VoucherNum)}catch(C){console.error(`[BACKEND] Error auto-redeeming voucher ${m.VoucherNum}:`,C.message)}}}if(s.DocNum){let m=await vd({docNum:s.DocNum});s.itemList=m}t.status(200).send(s)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(s){console.log("create Invoice error: "+JSON.stringify(s)),o(s)}finally{r&&kn.delete(r)}},XE=async(e,t,o)=>{try{if(t.PaymentInvoices[0].DocEntry=e,Array.isArray(t.PaymentChecks)&&t.PaymentChecks.length>0){let s=Fr(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");t.PaymentChecks.forEach(n=>{n.DueDate=s})}return Array.isArray(t.PaymentCreditCards)&&t.PaymentCreditCards.length>0&&t.PaymentCreditCards.forEach(s=>{if(typeof s.CreditCard=="string"){let n=parseInt(s.CreditCard,10);s.CreditCard=isNaN(n)?16:n}else typeof s.CreditCard!="number"&&(s.CreditCard=16)}),await kE.createIncomingPayment(t,o)}catch(r){throw r}},ZE=async(e,t,o,r)=>{let s=Fr(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{return e.Reference=t,e.Reference2=o,e.TaxDate=s,e.DueDate=s,e.ReferenceDate=s,await VE.createJournalEntry(e,r)}catch(n){throw n}},eD=async(e,t,o,r)=>{try{let s=[];console.log("********* createSalesBatchSelection ****request: ",o);let n=await HE.createSalesBatchSelection(o,e,t,r);if(n&&n.length>0){for(let a of n)await zE(a,e);s.push(n.DocNum)}return s}catch(s){throw console.log("createSalesBatchSelection error: "+JSON.stringify(s)),s}},tD=async(e,t,o)=>{try{if(e.body){let r={},s=await _d(e),n=e.body;n.U_DeliveryStatus=n.U_DeliveryStatus||"DELIVERED",n.U_IsPaymentReceived=n.U_IsPaymentReceived||"Y",console.log("*************request update: ",n);let a=await Mr.updateInvoice(n,s);(!a||a.status===200||a.DocEntry)&&(r.DocNum=n.DocNum,r.DocEntry=n.DocEntry,r.message=a.message,await Bd(e,s)&&console.log("Attachment updated")),t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing body content!"})}catch(r){console.log("update Invoice error: "+JSON.stringify(r)),o(r)}},Bd=async(e,t)=>{try{let o={};return console.log("attachment request body data: ",JSON.stringify(e.body)),o=await Mr.updateInvoiceAttachment(e,t),console.log("attachment Response: ",o),o}catch(o){console.log("updateAttach error: "+JSON.stringify(o))}};Pd.exports={create:KE,update:tD,updateAttach:Bd}});var Wd=p((JO,Fd)=>{var oD=require("../node_modules/express/index.js"),Hn=Md(),{portalModules:Vn,permissions:Jn}=f(),{checkUserPermission:qn}=N(),rD=Br(),Wr=new oD.Router,{upload:Gn}=rD;Wr.route("/").post(qn([Vn.INVOICE],Jn.CREATE),Gn.single("attachment"),Hn.create);Wr.route("/").patch(qn([Vn.INVOICE],Jn.WRITE),Gn.single("Attachment"),Hn.update);Wr.route("/attachment").patch(qn([Vn.INVOICE],Jn.WRITE),Gn.single("Attachment"),Hn.updateAttach);Fd.exports=Wr});var Hd=p(kd=>{var{serviceLayerAPI:$d}=q(),{portalModules:sD,serviceLayerApiURIs:nD}=f(),aD=sD.ITEM,iD=nD[aD];kd.createItem=async(e,t)=>{try{$d.defaults.headers.Cookie=t;let o=await $d.post(iD,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Item Helper error: "+o),o}}});var Jd=p((GO,Vd)=>{var{getSLConnection:lD}=K(),cD=Hd(),dD=async(e,t,o)=>{try{let r=await lD(e);console.log("*** Item request: "+JSON.stringify(e.body));let s=await cD.createItem(e.body,r);t.status(200).send({ItemCode:s.ItemCode})}catch(r){console.log("create Item: "+JSON.stringify(r)),o(r)}};Vd.exports={create:dD}});var jd=p((YO,Gd)=>{var uD=require("../node_modules/express/index.js"),pD=Jd(),{portalModules:jO,permissions:zO}=f(),{checkUserPermission:QO}=N(),qd=new uD.Router;qd.route("/").post(pD.create);Gd.exports=qd});var zd=p(fo=>{var{dbCreds:$r}=D();fo.items=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."ItmsGrpCod", T0."ChapterID", T0."validFor",
    T0."ManBtchNum", T0."SellItem", T0."InvntItem",
    T0."PrchseItem", T0."OnHand", T0."IsCommited", T0."OnOrder", T0."SalUnitMsr", T0."BuyUnitMsr",
    T0."IUoMEntry", T0."PrdStdCst", T0."UserText", T0."InvntryUom",
    T0."U_SG1", T0."U_SG2", T0."U_SG3"
  FROM ${$r.CompanyDB}.OITM T0
    WHERE 1 = 1`;fo.itemGroups=`SELECT T0."ItmsGrpCod" "ItemGroupCode", T0."ItmsGrpNam" "ItemGroupName"
    FROM ${$r.CompanyDB}.OITB T0`;fo.itemSubGroups=`SELECT "FieldID", "FldValue" as "Value", "Descr" as "Description"
    FROM ${$r.CompanyDB}."UFD1"
  WHERE "TableID"='OITM'
    AND "FieldID" = ?`;fo.itemMaxSequenceNo=`SELECT MAX(T0."U_SEQ") as "MaxNo" FROM ${$r.CompanyDB}.OITM T0`});var Qd=p(So=>{var kr=A(),Hr=zd(),{getAmmoFilter:mD}=tr();So.getItems=e=>{try{let t="",o=[],r="",s="";if(e?.pageNum&&e?.pageSize){let c=e.pageNum,l=e.pageSize,d=(c-1)*l,u=c*l;t=" LIMIT ? OFFSET ? ",o=[l,d]}if(e?.searchKey){let{searchKey:c}=e;isNaN(c)&&(c=c.toUpperCase()),r=` AND (
                  UPPER(T0."ItemCode") LIKE '%${c}%'
                    OR UPPER(T0."ItemName") LIKE '%${c}%'
                    OR UPPER(T0."FrgnName") LIKE '%${c}%' ) `}let n=mD(e.userSessionLog,!0,"T0"),a=Hr.items+r+n+s+t;return kr.executeWithValues(a,o)}catch(t){throw console.log("getItems - controller - error: "+JSON.stringify(t.message)),t}};So.getItemGroups=()=>{try{return kr.executeWithValues(Hr.itemGroups,[])}catch(e){throw console.log("getItemGroups - controller - error: "+JSON.stringify(e.message)),e}};So.getItemSubGroups=e=>{try{return kr.executeWithValues(Hr.itemSubGroups,[e])}catch(t){throw console.log("getItemSubGroups - controller - error: "+JSON.stringify(t.message)),t}};So.getMaxSequenceNo=()=>{try{let e=kr.executeWithValues(Hr.itemMaxSequenceNo,[]);return console.log("getItemGroups-: "+JSON.stringify(e)),Array.isArray(e)&&e.length>0?e[0].MaxNo:0}catch(e){throw console.log("getMaxSequenceNo - controller - error: "+JSON.stringify(e.message)),e}}});var Yd=p(Eo=>{var Vr=Qd();Eo.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Vr.getItems({...e.query,userSessionLog:e.session.userSessionLog});t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};Eo.getGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Vr.getItemGroups();t.send(r)}catch(r){console.log("getGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Eo.getSubGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params.subGroupId));try{let r=Vr.getItemSubGroups(e.params.subGroupId);t.send(r)}catch(r){console.log("getSubGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Eo.getNextNo=(e,t,o)=>{try{let r=1,s=Vr.getMaxSequenceNo();isNaN(parseInt(s))||(r=parseInt(s)+1),t.send({nextNumber:r})}catch(r){console.log("getNextNo - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Xd=p((rU,Kd)=>{var yD=require("../node_modules/express/index.js"),Do=new yD.Router,Jr=Yd(),{checkUserPermission:eU}=N(),{portalModules:tU,permissions:oU}=f();Do.route("/").get(Jr.get);Do.route("/next-number").get(Jr.getNextNo);Do.route("/groups").get(Jr.getGroups);Do.route("/sub-groups/:subGroupId").get(Jr.getSubGroups);Kd.exports=Do});var Zd=p(jn=>{var{dbCreds:qr}=D();jn.stockTransferRequest=`SELECT T0."DocNum", T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
    T0."U_DraftStatus", T0."U_OriginatorId", T1."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
    T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
      FROM ${qr.CompanyDB}.OWTQ T0, ${qr.CompanyDB}.OUSR T1
    WHERE T0."UserSign" = T1."USERID"`;jn.itemListForSTR=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity",
    T1."unitMsr" AS "InvntryUom", T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation",
    T1."U_FromBinLoc"
  FROM ${qr.CompanyDB}.WTQ1 T1, ${qr.CompanyDB}.OWTQ T0
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `});var ou=p(zn=>{var eu=A(),{buildHeaderRecQuery:gD,buildRowLevelQuery:TD}=ve(),tu=Zd();zn.getStockTransferRequest=e=>{try{let t=gD(tu.stockTransferRequest,e);return console.log("getStockTransferRequest- sql: ",t),eu.executeWithValues(t)}catch(t){throw console.log("getStockTransferRequest - controller - error: "+JSON.stringify(t.message)),t}};zn.getItemDetails=e=>{try{let t=TD(tu.itemListForSTR,e);return{itemsList:eu.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var su=p(Qn=>{var ru=ou();Qn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=ru.getStockTransferRequest(e.query);t.send(r)}catch(r){console.log("getStockTransferRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};Qn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=ru.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var iu=p((iU,au)=>{var hD=require("../node_modules/express/index.js"),Yn=new hD.Router,nu=su(),{checkUserPermission:Gr}=N(),{portalModules:jr,permissions:zr}=f();Yn.route("/").get(Gr(jr.STOCK_TRANSFER_REQUEST,zr.READ)||Gr(jr.STOCK_TRANSFER,zr.CREATE),nu.get);Yn.route("/items").get(Gr(jr.STOCK_TRANSFER_REQUEST,zr.READ)||Gr(jr.STOCK_TRANSFER,zr.CREATE),nu.getItems);au.exports=Yn});var lu=p(je=>{var{dbCreds:G}=D();je.salesQuotationQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocDueDate",
    T0."CardCode", T0."CardName", T0."NumAtCard",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."SlpCode" "SalesPersonCode",
    T2."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location",
    T0."CntctCode" "ContactPersonCode", T0."U_IsReprinted"
      FROM ${G.CompanyDB}.OQUT T0, ${G.CompanyDB}.QUT1 T1, ${G.CompanyDB}.OSLP T2
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;je.itemListForSalesQuotation=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."FreeTxt" "FreeText", TO_VARCHAR(T1."U_DocNum") AS "BundleNo", T1."U_TallySheet", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceBefDi" "PriceBeforDiscount",
    (SELECT E."ItmsGrpNam" FROM  ${G.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod", ITM."ManSerNum", ITM."ManBtchNum", ITM."TreeType", T1."TreeType" AS "LineTreeType",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${G.CompanyDB}.SPP1 P WHERE P."ItemCode" = T1."ItemCode" 
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
              AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied"
  FROM ${G.CompanyDB}.OQUT T0
    INNER JOIN ${G.CompanyDB}.QUT1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${G.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;je.updateSQSalesBatchSelectionDocNum=`UPDATE ${G.CompanyDB}.QUT1 T1 SET
    T1."U_TallySheet" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ?`;je.updateSalesQuotationReprintStatus=`UPDATE ${G.CompanyDB}.OQUT T0 SET
  T0."U_IsReprinted" = 'Y'
WHERE T0."DocEntry" = ?`;je.buildTimberTallyItemsQuery=(e,t)=>{let o=`SELECT 
    MAX(T1."ItemCode") AS "ItemCode",
    T0."Code" AS "U_Length",
    MAX(IFNULL(T1."BHeight1", 1)) AS "U_Height",
    MAX(IFNULL(T1."BWidth1", 1)) AS "U_Width",
    MAX(T2."BinAbsEntry") AS "BinAbsEntry",
    MAX(T2."BinCode") AS "BinCode",
    SUM(IFNULL(T2."U_AvlPcs", 0)) AS "U_AvlPcs",
    SUM(IFNULL(T2."U_AvlQty", 0)) AS "U_AvlQty"
FROM ${G.CompanyDB}."@LENGTHMASTER" T0
LEFT JOIN ${G.CompanyDB}.OITM T1 ON T1."ItemCode" = ?
LEFT JOIN (
    SELECT 
        T0."ItemCode",
        T0."U_Length",
        SUM((IFNULL(B."OnHandQty", IFNULL(T1."Quantity", 0)) - IFNULL(T1."CommitQty", 0))) AS "U_AvlQty",
        SUM(ROUND(
            (IFNULL(B."OnHandQty", IFNULL(T1."Quantity", 0)) - IFNULL(T1."CommitQty", 0)) / 
            CASE 
                WHEN (IFNULL(T0."U_Height", 0) > 0 
                  AND IFNULL(T0."U_Width", 0) > 0 
                  AND IFNULL(T0."U_Length", 0) > 0) 
                THEN ((T0."U_Height" / 1000) * (T0."U_Width" / 1000) * T0."U_Length") 
                ELSE 1 
            END, 
        5)) AS "U_AvlPcs",
        C."AbsEntry" AS "BinAbsEntry",
        C."BinCode"
    FROM ${G.CompanyDB}."OBTN" T0
    LEFT JOIN ${G.CompanyDB}."OBTQ" T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${G.CompanyDB}."OBBQ" B ON T0."AbsEntry" = B."SnBMDAbs" AND T0."ItemCode" = B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${G.CompanyDB}."OBIN" C ON B."BinAbs" = C."AbsEntry" AND B."WhsCode" = C."WhsCode"
    WHERE T0."ItemCode" = ?`;return e&&(o+=`
    AND T1."WhsCode" = ?`),t&&(o+=`
    AND C."BinCode" = ?`),o+=`
    GROUP BY 
        T0."ItemCode",
        T0."U_Length",
        C."AbsEntry",
        C."BinCode"
) T2 ON T0."Code" = T2."U_Length"
GROUP BY T0."Code"
ORDER BY CAST(T0."Code" AS DOUBLE) ASC`,o};je.tallySheetRowsQuery=`SELECT T0."LineId", T0."U_Length", T0."U_Width", T0."U_Height", T0."U_Pieces" AS "U_NoOfPcs", T0."U_Qty" FROM ${G.CompanyDB}."@TSH1" T0 WHERE T0."DocEntry" = ?`;je.getUniqueId=`SELECT T0."DocNum", T0."DocEntry" 
    FROM ${G.CompanyDB}.OQUT T0
  WHERE T0."U_POS_TransactionID" = ?`});var Kn=p(pt=>{var dt=A(),{buildHeaderRecQuery:CD,buildRowLevelQuery:fD}=ve(),ut=lu();pt.getSalesQuotation=e=>{try{let t=CD(ut.salesQuotationQuery,e);return console.log("getSalesQuotation- sql: ",t),dt.executeWithValues(t)}catch(t){throw console.log("getSalesQuotation - controller - error: "+JSON.stringify(t.message)),t}};pt.getItemDetails=e=>{try{let t=fD(ut.itemListForSalesQuotation,e),o=dt.executeWithValues(t,[]);return o.forEach(r=>{if(r.U_TallySheet){let s=ut.tallySheetRowsQuery,n=dt.executeWithValues(s,[r.U_TallySheet]);Array.isArray(n)&&n.length>0&&(r.timberTallyRows=n,r.timberTally=[{TSH1Collection:n}])}}),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};pt.updateSQSalesBatchSelection=(e,t)=>{try{if(console.log("updateSQSalesBatchSelection %s",e.DocNum,t,e.U_ItemCode),e){let o=dt.executeWithValues(ut.updateSQSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode]);return console.log("updateSQSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("updateSQSalesBatchSelection - helper - error: "+JSON.stringify(o.message)),o}};pt.updateReprint=e=>{try{if(e){let t=dt.executeWithValues(ut.updateSalesQuotationReprintStatus,[e]);return console.log("updateSalesQuotationReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("SalesQuotationReprintStatus - helper - error: "+JSON.stringify(t.message)),t}};pt.getTimberTallyItems=e=>{try{let{itemCode:t,whsCode:o,binCode:r}=e;console.log("binCode from req:",r);let s=ut.buildTimberTallyItemsQuery(o,r),n=[t,t];o&&n.push(o),r&&n.push(r),console.log("getTimberTallyItems - params: ",n);let a=dt.executeWithValues(s,n);return console.log("getTimberTallyItems - rows returned: ",a?.length||0),a&&a.length>0&&console.log("getTimberTallyItems - results sample: ",JSON.stringify(a[0])),a&&a.length>0&&a[0].U_AvlPcs==="0"&&console.log("DEBUG - Found zero pieces. Row sample:",JSON.stringify(a.find(i=>i.U_AvlPcs!=="0")||a[0])),a}catch(t){throw console.log("getTimberTallyItems - helper - error: "+JSON.stringify(t.message)),t}};pt.getUniqueId=e=>{try{let t=ut.getUniqueId,o=dt.executeWithValues(t,[e]);return o&&o.length>0?o[0]:null}catch(t){throw console.log("getUniqueId - helper - error: "+JSON.stringify(t.message)),t}}});var cu=p(Ao=>{var Qr=Kn();Ao.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Qr.getSalesQuotation(e.query);t.send(r)}catch(r){console.log("getSalesQuotation - controller - error: "+JSON.stringify(r.message)),o(r)}};Ao.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Qr.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};Ao.updateReprint=(e,t,o)=>{console.log("updateSalesQuotationReprint - body: "+JSON.stringify(e.body));let{DocEntry:r}=e.body;try{let s=Qr.updateReprint(r);t.send({message:"Sales Quotation Reprint Status Updated Successfully",success:!0})}catch(s){console.log("updateSalesQuotationReprint - controller - error: "+JSON.stringify(s.message)),o(s)}};Ao.getTimberTallyItems=(e,t,o)=>{console.log("getTimberTallyItems - query: "+JSON.stringify(e.query));try{let r=Qr.getTimberTallyItems(e.query);t.send(r)}catch(r){console.log("getTimberTallyItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var uu=p((uU,du)=>{var SD=require("../node_modules/express/index.js"),Io=new SD.Router,Yr=cu(),{checkUserPermission:Kr}=N(),{portalModules:Xr,permissions:Zr}=f();Io.route("/").get(Kr(Xr.SALES_QUOTATION,Zr.READ),Yr.get);Io.route("/items").get(Kr(Xr.SALES_QUOTATION,Zr.READ),Yr.getItems);Io.route("/timber-tally-items").get(Kr(Xr.SALES_QUOTATION,Zr.READ),Yr.getTimberTallyItems);Io.route("/reprint").patch(Kr(Xr.SALES_QUOTATION,Zr.READ),Yr.updateReprint);du.exports=Io});var pu=p(No=>{var{serviceLayerAPI:ze}=q(),{portalModules:ED,serviceLayerApiURIs:DD}=f(),AD=ED.SALES_QUOTATION,es=DD[AD];No.createSalesQuotation=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** SalesQuotation request: "+JSON.stringify(e)),ze.defaults.headers.Cookie=t;let o=await ze.post(es,e);return console.log(`Create SalesQuotation response: ${JSON.stringify(o.data.DocNum)}`),o.data?o.data:void 0}catch(o){throw console.log("Create SalesQuotation error: "+o),o}};No.updateSalesQuotation=async(e,t)=>{try{return console.log("*** SalesQuotation update request: "+JSON.stringify(e)),ze.defaults.headers.Cookie=t,!!await ze.patch(`${es}(${e.DocEntry})`,e)}catch(o){throw console.log("update SalesQuotation error: "+o),o}};No.getSalesQuotation=async(e,t)=>{try{console.log("*** SalesQuotation get request: "+JSON.stringify(e)),ze.defaults.headers.Cookie=t;let o=await ze.get(`${es}(${e})`);return o?o.data:null}catch(o){throw console.log("get SalesQuotation error: "+o),o}};No.putSalesQuotation=async(e,t,o)=>{try{return console.log("*** SalesQuotation put request: "+JSON.stringify(t)),ze.defaults.headers.Cookie=o,!!await ze.put(`${es}(${e})`,t)}catch(r){throw console.log("put SalesQuotation error: "+r),r}}});var yu=p(Xn=>{var{serviceLayerAPI:ts}=q(),{portalModules:ID}=f(),mu=ID.OTSH;Xn.createTimberTally=async(e,t,o,r)=>{let s=Array.isArray(e)?e:[e];console.log("*** Timber Tally helper requests count: "+s.length);let n=[];for(let a of s)try{console.log("*** Timber Tally POST payload: "+JSON.stringify(a,null,2)),ts.defaults.headers.Cookie=r;let i=await ts.post(mu,a),{DocNum:c,DocEntry:l,U_ItemCode:d}=i.data;console.log("*** Timber Tally response:**** "+JSON.stringify(i.data)),n.push({DocNum:c,DocEntry:l,U_ItemCode:d})}catch(i){console.error(`Error creating OTSH record for item ${a.U_ItemCode}:`,i.response?.data?.error?.message?.value||i.message)}return n};Xn.updateTimberTally=async(e,t)=>{try{return ts.defaults.headers.Cookie=t,(await ts.patch(`${mu}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update Timber Tally error: "+o.response?.data?.error?.message?.value||o.message),o}}});var hu=p((yU,Tu)=>{var{getSLConnection:os,invalidateSLCache:gu}=K(),Ro=pu(),ea=Co(),ta=yu(),{enableFircaIntegration:ND,objectCodes:RD,portalModules:bD,enableStoreBasedNumbering:OD}=f(),{submitInvoicetoFirca:UD}=vr(),{updateSQSalesBatchSelection:oa,getUniqueId:xD}=Kn(),{getNumberingSeries:LD}=Ar(),Zn=new Map,wD=async(e,t,o)=>{let r=null;try{if(r=e.body.Unique,r){if(Zn.has(r))return console.error(`[BACKEND] Concurrent request detected for Quotation UniqueID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});Zn.set(r,!0);let l=await xD(r);if(l&&l.DocNum)return console.log(`[BACKEND] Sales Quotation with UniqueID ${r} already exists: DocNum ${l.DocNum}`),t.status(200).send({docNum:l.DocNum,isExist:!0})}let s="",n=e.body.CompanyCode?e.body.CompanyCode:"",a=parseFloat(e.session.userSessionLog?.salesDisc||0);if(Array.isArray(e.body.DocumentLines))for(let l of e.body.DocumentLines){let d=parseFloat(l.DiscountPercent||0);if(d>a)return console.error(`[BACKEND] Discount Limit Violation: Item ${l.ItemCode} has ${d}% but user only allowed ${a}%`),t.status(400).send({message:`Discount Limit is Exceeded: ${a}% (Item: ${l.ItemCode})`})}if(OD){let l=await LD(RD[bD.SALES_QUOTATION],e.session.userSessionLog.storeLocation);l&&(console.log("seriesResponse series:",l.Series),e.body.Series=l.Series)}let i=await os(e),c;try{c=await Ro.createSalesQuotation(e.body,i)}catch(l){if(l?.response?.status===401)console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),gu(e),i=await os(e),c=await Ro.createSalesQuotation(e.body,i);else throw l}if(c.DocNum&&(s=c.DocNum,ND)){let l=await UD(c.DocEntry,n,"SalesQuotation")}if(Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){let l=await vD(c.DocEntry,c.DocNum,e.body.salesBatchSelection,i)}if(Array.isArray(e.body.timberTally)&&e.body.timberTally.length>0)for(let l of e.body.timberTally){let d=await BD(c.DocEntry,c.DocNum,[l],i);if(d&&d.length>0&&d[0]){let u=d[0],m=u.U_ItemCode||l.U_ItemCode;console.log(`[TimberTally] Linking Tally DocNum ${u.DocNum} to SQ DocEntry ${c.DocEntry} for item ${m}`),await oa({...u,U_ItemCode:m},c.DocEntry)}}t.status(200).send({docNum:s})}catch(s){console.log("create SalesQuotation Controller: ",s?.response?.data||s.message),o(s)}finally{r&&Zn.delete(r)}},vD=async(e,t,o,r)=>{try{let s=[],n=await ea.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let i=await oa(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create SalesQuotation SalesBatchSelection: ",s?.response?.data||s.message),s}},_D=async(e,t,o)=>{try{let r=await os(e),s=async a=>{try{return await a(r)}catch(i){if(i?.response?.status===401)return console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),gu(e),r=await os(e),await a(r);throw i}};if(e.body.ItemsDeleted&&e.body.ItemsDeleted.length>0)try{console.log("Sales Quotation delete in Service Layer.",e.body.ItemsDeleted);let{DocEntry:a}=e.body;console.log(`Processing deletion of line items from Quotation ${a}:`,JSON.stringify(e.body.ItemsDeleted));let i=await s(d=>Ro.getSalesQuotation(a,d));if(console.log("Fetched Quotation for update:",JSON.stringify(i)),!i||!i.DocumentLines)throw console.log("Fetched Quotation Error: ",JSON.stringify(i)),new Error("Quotation not found or invalid structure");let c=e.body.ItemsDeleted.map(d=>d.LineNum);i.DocumentLines=i.DocumentLines.filter(d=>!c.includes(d.LineNum)),console.log("Quotation after removing deleted lines:",JSON.stringify(i));let l=await s(d=>Ro.putSalesQuotation(a,i,d));if(console.log("PUT Result after deleting lines:",l),!l)throw new Error("Failed to update quotation after deleting lines");console.log(`Deleted line items [${c}] successfully from Quotation ${a}`)}catch(a){throw console.error("Error while deleting line items:",a.message),a}if(console.log("Performing Sales Quotation Patch operation."),await s(a=>Ro.updateSalesQuotation(e.body,a))){let{salesBatchSelection:a}=e.body;if(Array.isArray(a)&&a.length>0){let c=await Promise.all(a.map(l=>l.DocEntry?s(d=>ea.updateSalesBatchSelection(l,d)):s(d=>ea.createSalesBatchSelection(l,"",e.body.DocNum,d))))}let{timberTally:i}=e.body;if(Array.isArray(i)&&i.length>0){let c=await Promise.all(i.map(async l=>{if(l.DocEntry)return s(d=>ta.updateTimberTally(l,d));{let d=await s(u=>ta.createTimberTally(l,e.body.DocEntry,e.body.DocNum,u));if(d&&d.length>0&&d[0]){let u=d[0],m=u.U_ItemCode||l.U_ItemCode;console.log(`[TimberTally-Update] Linking Tally DocNum ${u.DocNum} to SQ DocEntry ${e.body.DocEntry} for item ${m}`),await oa({...u,U_ItemCode:m},e.body.DocEntry)}return d}}))}t.status(200).send({docNum:e.body.DocNum})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("Update SalesQuotation Controller: ",r?.response?.data||r.message),o(r)}},BD=async(e,t,o,r)=>{try{return await ta.createTimberTally(o,e,t,r)||[]}catch(s){throw console.log("create SalesQuotation TimberTally Error: ",s?.response?.data||s.message),s}};Tu.exports={create:wD,update:_D}});var Au=p((gU,Du)=>{var PD=require("../node_modules/express/index.js"),Cu=hu(),{portalModules:fu,permissions:Su}=f(),{checkUserPermission:Eu}=N(),ra=new PD.Router;ra.route("/").post(Eu([fu.SALES_QUOTATION],Su.CREATE),Cu.create);ra.route("/").patch(Eu(fu.SALES_QUOTATION,Su.WRITE),Cu.update);Du.exports=ra});var Iu=p(rs=>{var{dbCreds:Qe}=D(),{draftObjectCodes:TU}=f();rs.saleOrderQuery=`SELECT DISTINCT T0."BPLId", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocType", 
    T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
      FROM ${Qe.CompanyDB}.ORDR T0, ${Qe.CompanyDB}.RDR1 T1
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"`;rs.itemListForSaleOrder=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."PriceBefDi" "UnitPrice",
    T1."OpenCreQty" as "Quantity", T1."OpenQty", T1."WhsCode", T1."unitMsr" "UomCode",
    ITM."ManBtchNum", ITM."ManSerNum",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."Project"
  FROM ${Qe.CompanyDB}.ORDR T0
    INNER JOIN ${Qe.CompanyDB}.RDR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Qe.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;rs.freightInfo=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${Qe.CompanyDB}."ORDR" T0, ${Qe.CompanyDB}."RDR3" T1, ${Qe.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `});var Nu=p(aa=>{var sa=A(),{buildHeaderRecQuery:MD,buildRowLevelQuery:FD}=ve(),na=Iu();aa.getSaleOrders=e=>{try{let t=MD(na.saleOrderQuery,e);return console.log("getSalesQuotation- sql: ",t),sa.executeWithValues(t)}catch(t){throw console.log("getSaleOrders - controller - error: "+JSON.stringify(t.message)),t}};aa.getItemDetails=e=>{try{let t=FD(na.itemListForSaleOrder,e),o=sa.executeWithValues(t),r=sa.executeWithValues(na.freightInfo+`(${docNum})`,[]);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o,freightInfo:r}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var bu=p(ia=>{var Ru=Nu();ia.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Ru.getSaleOrders(e.query);t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};ia.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Ru.getItemDetails(e.query);console.log("getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var xu=p((SU,Uu)=>{var WD=require("../node_modules/express/index.js"),la=new WD.Router,Ou=bu();la.route("/").get(Ou.get);la.route("/items").get(Ou.getItems);Uu.exports=la});var wu=p(Lu=>{var $D=A(),kD=mo();Lu.getTaxDefinition=()=>{try{return $D.executeWithValues(kD.selectTaxInfo)}catch(e){throw console.log("getTaxDefinition - controller - error: "+JSON.stringify(e.message)),e}}});var _u=p(vu=>{var HD=wu();vu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=HD.getTaxDefinition();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Mu=p((RU,Pu)=>{var VD=require("../node_modules/express/index.js"),Bu=new VD.Router,JD=_u(),{checkUserPermission:AU}=N(),{portalModules:IU,permissions:NU}=f();Bu.route("/").get(JD.get);Pu.exports=Bu});var $u=p(Wu=>{var Fu=nn();Wu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r,s;r=e.query.userCode??"",s=e.query.storeLocation??"";let n=[];n=Fu.getSalesEmployees(s,r),Array.isArray(n)&&n.length===0&&(n=Fu.getSalesEmployees(s,"")),t.send(n)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Vu=p((OU,Hu)=>{var qD=require("../node_modules/express/index.js"),ku=new qD.Router,GD=$u();ku.route("/").get(GD.get);Hu.exports=ku});var qu=p(Ju=>{var jD=io();Ju.getSalesEmployee=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=jD.getSalesEmployeeForUser(e.query.userId);t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var zu=p((xU,ju)=>{var zD=require("../node_modules/express/index.js"),Gu=new zD.Router,QD=qu();Gu.route("/sales-employee").get(QD.getSalesEmployee);ju.exports=Gu});var Yu=p(Qu=>{var YD=A(),KD=mo();Qu.getPaymentTerms=()=>{try{return YD.executeWithValues(KD.selectPaymentTerms)}catch(e){throw console.log("getPaymentTerms - controller - error: "+JSON.stringify(e.message)),e}}});var Xu=p(Ku=>{var XD=Yu();Ku.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=XD.getPaymentTerms();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var tp=p((vU,ep)=>{var ZD=require("../node_modules/express/index.js"),Zu=new ZD.Router,eA=Xu();Zu.route("/").get(eA.get);ep.exports=Zu});var rp=p(op=>{var tA=A(),oA=mo();op.getBanks=()=>{try{return tA.executeWithValues(oA.selectBankInfo)}catch(e){throw console.log("getBanks - controller - error: "+JSON.stringify(e.message)),e}}});var np=p(sp=>{var rA=rp();sp.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=rA.getBanks();t.send(r)}catch(r){console.log("get Banks - controller - error: "+JSON.stringify(r.message)),o(r)}}});var lp=p((PU,ip)=>{var sA=require("../node_modules/express/index.js"),ap=new sA.Router,nA=np();ap.route("/").get(nA.get);ip.exports=ap});var dp=p(cp=>{var aA=uo();cp.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=aA.getLocations();t.send(r)}catch(r){console.log("get Locations - controller - error: "+JSON.stringify(r.message)),o(r)}}});var mp=p((FU,pp)=>{var iA=require("../node_modules/express/index.js"),up=new iA.Router,lA=dp();up.route("/").get(lA.get);pp.exports=up});var gp=p(yp=>{var cA=A(),{dbCreds:ss}=D();yp.getWarehouses=e=>{try{let t=[],o=`SELECT T0."WhsCode", T0."WhsName", T1."BinCode", T1."AbsEntry" "BinAbsEntry", T0."Location" "LocationCode",
        T2."Location" "LocationName", T0."U_GITWH" "GitWHCode"
      FROM ${ss.CompanyDB}.OWHS T0
        LEFT OUTER JOIN ${ss.CompanyDB}.OBIN T1 ON T0."DftBinAbs" = T1."AbsEntry"
        INNER JOIN ${ss.CompanyDB}.OLCT T2 ON T0."Location" = T2."Code"`,r=` WHERE T0."Inactive" ='N'`;e.branchId&&(o=o+` INNER JOIN ${ss.CompanyDB}.OBPL T3 ON T0."BPLid" = T3."BPLId"`,r=r+' AND T0."BPLid" = ?',t.push(e.branchId)),e.locationCode&&(r=r+' AND T0."Location" = ?',t.push(e.locationCode));let s=' ORDER BY T0."WhsCode"';return cA.executeWithValues(o+r+s,t)}catch(t){throw console.log("getWarehouses - error: "+JSON.stringify(t)),t}}});var hp=p(Tp=>{var dA=gp();Tp.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=dA.getWarehouses(e.query);t.send(r)}catch(r){console.log("get WHs - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Sp=p((kU,fp)=>{var uA=require("../node_modules/express/index.js"),Cp=new uA.Router,pA=hp();Cp.route("/").get(pA.get);fp.exports=Cp});var Dp=p((HU,Ep)=>{var{dbCreds:H}=D(),mA=`SELECT T0."CardCode", T0."CardName", T0."Cellular", T0."U_OneTimeCustomer", T0."U_COD", T0."U_Fin_Status",
    T0."U_CustomerType", T0."GroupNum", T1."PymntGroup",
    T0."CreditLine" as "CreditLimit", T0."CreditLine" - (T0."Balance" + T0."DNotesBal") as "AvailableBalance",
    T0."SlpCode" "SalesEmployeeCode", T0."LicTradNum"
  FROM ${H.CompanyDB}.OCRD T0
  LEFT JOIN ${H.CompanyDB}.OCTG T1 ON T0."GroupNum" = T1."GroupNum"
WHERE T0."CardType" ='C'`,yA=`SELECT T0."CardCode", T1."AdresType", T1."Address", T1."Building", T1."Street",
  T1."City", T1."LicTradNum", T1."Block"
FROM ${H.CompanyDB}.OCRD T0
  INNER JOIN ${H.CompanyDB}.CRD1 T1 ON T0."CardCode" = T1."CardCode"
WHERE T1."AdresType" = 'S'
  AND T0."CardCode" = ?`,gA=`SELECT T0."CardCode", T0."Name", T0."CntctCode" AS "ContactCode" FROM ${H.CompanyDB}.OCPR T0
  WHERE T0."CardCode" = ?`,TA=`SELECT "Price", "FromDate", "ToDate"
  FROM ${H.CompanyDB}.SPP1
  WHERE "ItemCode" = ?
    AND "CardCode" = ?
    AND "FromDate" <= CURRENT_DATE
    AND IFNULL("ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,hA=`SELECT B."Price", A."FromDate", A."ToDate"
  FROM ${H.CompanyDB}.SPP1 A
  INNER JOIN ${H.CompanyDB}."ITM1" B
    ON A."ItemCode" = B."ItemCode"
            AND A."ListNum" = B."PriceList"
  WHERE A."ItemCode" = ?
    AND A."CardCode" = '*1'
    AND A."FromDate" <= CURRENT_DATE
    AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,CA=`SELECT T2."Price", CURRENT_DATE as "FromDate", CURRENT_DATE as "ToDate"
  FROM ${H.CompanyDB}."OWHS" T0
    INNER JOIN ${H.CompanyDB}."OBPL" T1
      ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${H.CompanyDB}."ITM1" T2
      ON T1."U_PrcList" = T2."PriceList"
    WHERE T0."WhsCode" = ?
      AND T2."ItemCode" = ?
  LIMIT 1`,fA=`SELECT "Price", "ItemCode", "CardCode", "WhsCode"
FROM (
    SELECT S1."Price", S1."ItemCode", S1."CardCode", 'S101' AS "WhsCode", 1 AS "Priority"
    FROM ${H.CompanyDB}."SPP1" S1
    WHERE S1."FromDate" <= CURRENT_DATE AND IFNULL(S1."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT B."Price", A."ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 2 AS "Priority"
    FROM ${H.CompanyDB}."SPP1" A
    INNER JOIN ${H.CompanyDB}."ITM1" B ON A."ItemCode" = B."ItemCode" AND A."ListNum" = B."PriceList"
    WHERE A."CardCode" = '*1' AND A."FromDate" <= CURRENT_DATE AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT T2."Price", T2."ItemCode", 'C4290' AS "CardCode", T0."WhsCode", 3 AS "Priority"
    FROM ${H.CompanyDB}."OWHS" T0
    INNER JOIN ${H.CompanyDB}."OBPL" T1 ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${H.CompanyDB}."ITM1" T2 ON T1."U_PrcList" = T2."PriceList"
    
    UNION ALL
    
    SELECT "Price", "ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 4 AS "Priority"
    FROM ${H.CompanyDB}."ITM1"
    WHERE "PriceList" = 1
)
WHERE "ItemCode" = ? 
  AND "CardCode" = ?
  AND "WhsCode" = ?
ORDER BY "Priority" ASC
LIMIT 1`,SA=`SELECT "Amount", "Price", "Discount"
  FROM ${H.CompanyDB}.SPP2
  WHERE "ItemCode" = ?
    AND ("CardCode" = ? OR "CardCode" = '*1')
  ORDER BY "Amount" ASC`;Ep.exports={selectCustomerInfo:mA,selectCustomerAddress:yA,selectCustomerContactPerson:gA,selectCustomerSpecialPrice1:TA,selectCustomerSpecialPrice2:hA,selectCustomerSpecialPrice3:CA,selectCustomerSpecialPriceNew:fA,selectVolumeDiscounts:SA}});var Ap=p(bo=>{var mt=A(),yt=Dp();bo.getCustomerInfo=e=>{let t=yt.selectCustomerInfo;e?.searchKey&&(t+=` AND (UPPER(T0."CardCode") LIKE UPPER('%${e.searchKey}%')
             OR UPPER(T0."CardName") LIKE UPPER('%${e.searchKey}%')
             OR T0."Cellular" LIKE '%${e.searchKey}%')`),e?.oneTimeCustomer==="Y"&&(t+=` AND T0."U_OneTimeCustomer" = 'Y'`);try{let o=mt.executeWithValues(t,[]);return Array.isArray(o)&&o.length>0?e?.oneTimeCustomer==="Y"?o[0]:o:[]}catch(o){throw o}};bo.getCustomerAddress=e=>{try{let t=mt.executeWithValues(yt.selectCustomerAddress,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};bo.getCustomerContactPerson=e=>{try{let t=mt.executeWithValues(yt.selectCustomerContactPerson,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};bo.getCustomerSpecialPrice=(e,t,o)=>{try{let r=null,s=mt.executeWithValues(yt.selectCustomerSpecialPrice1,[t,e]);if(Array.isArray(s)&&s.length>0)r=s[0];else{let n=mt.executeWithValues(yt.selectCustomerSpecialPrice2,[t]);if(Array.isArray(n)&&n.length>0)r=n[0];else{let a=mt.executeWithValues(yt.selectCustomerSpecialPrice3,[o,t]);Array.isArray(a)&&a.length>0&&(r=a[0])}}if(r){let n=mt.executeWithValues(yt.selectVolumeDiscounts,[t,e]);return Array.isArray(n)&&n.length>0&&(r.volumeDiscounts=n),r}return""}catch(r){throw r}}});var Ip=p(Oo=>{var{getCustomerInfo:EA,getCustomerAddress:DA,getCustomerContactPerson:AA,getCustomerSpecialPrice:IA}=Ap();Oo.get=(e,t,o)=>{console.log("*** getCustomerInfo - req.query: "+JSON.stringify(e.query));try{let r=EA(e.query);console.log("getCustomerInfo %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getCustomerInfo - controller - error: "+JSON.stringify(r)),o(r)}};Oo.getAddress=(e,t,o)=>{console.log("*** getAddress - req.params: "+JSON.stringify(e.params));try{let r=DA(e.params.cardCode);t.send(r)}catch(r){console.log("getAddress - controller - error: "+JSON.stringify(r)),o(r)}};Oo.getContactPerson=(e,t,o)=>{console.log("*** getContactPerson - req.params: "+JSON.stringify(e.params));try{let r=AA(e.params.cardCode);console.log("getContactPerson %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getContactPerson - controller - error: "+JSON.stringify(r)),o(r)}};Oo.getSpecialPrice=(e,t,o)=>{console.log("*** getSpecialPrice - req.params: "+JSON.stringify(e.params)),console.log("*** getSpecialPrice - req.query: "+JSON.stringify(e.query));try{let r=IA(e.params.cardCode,e.query.itemCode,e.query.warehouseCode);console.log("getSpecialPrice %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getSpecialPrice - controller - error: "+JSON.stringify(r)),o(r)}}});var Rp=p((qU,Np)=>{var NA=require("../node_modules/express/index.js"),Uo=new NA.Router,ns=Ip();Uo.route("/").get(ns.get);Uo.route("/:cardCode/address").get(ns.getAddress);Uo.route("/:cardCode/contact-person").get(ns.getContactPerson);Uo.route("/:cardCode/special-price").get(ns.getSpecialPrice);Np.exports=Uo});var bp=p(as=>{var{dbCreds:gt}=D();as.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${gt.CompanyDB}.ORIN T0, ${gt.CompanyDB}.RIN1 T1, ${gt.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;as.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal"
  FROM ${gt.CompanyDB}.ORIN T0
    INNER JOIN ${gt.CompanyDB}.RIN1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${gt.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;as.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${gt.CompanyDB}.ORIN T0 
  WHERE T0."U_POS_TransactionID" = ?`});var ua=p(is=>{var ca=A(),{buildHeaderRecQuery:RA,buildRowLevelQuery:bA}=ve(),da=bp();is.getCreditMemo=e=>{try{let t=RA(da.creditMemoQuery,e);return console.log("getCreditMemo- sql: ",t),ca.executeWithValues(t)}catch(t){throw console.log("getCreditMemo - controller - error: "+JSON.stringify(t.message)),t}};is.getItemDetails=e=>{try{let t=bA(da.itemListForCreditMemo,e),o=ca.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};is.getUniqueId=e=>{try{let t=ca.executeWithValues(da.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUniqueId - Credit Memo Helper - error: "+JSON.stringify(t.message)),t}}});var Up=p(pa=>{var Op=ua();pa.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Op.getCreditMemo(e.query);t.send(r)}catch(r){console.log("get CreditMemo - controller - error: "+JSON.stringify(r.message)),o(r)}};pa.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Op.getItemDetails(e.query);console.log("getItems-CreditMemo controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Bp=p((QU,_p)=>{var OA=require("../node_modules/express/index.js"),ma=new OA.Router,xp=Up(),{checkUserPermission:Lp}=N(),{portalModules:wp,permissions:vp}=f();ma.route("/").get(Lp(wp.CREDIT_MEMO,vp.READ),xp.get);ma.route("/items").get(Lp(wp.CREDIT_MEMO,vp.READ),xp.getItems);_p.exports=ma});var Fp=p(Mp=>{var{serviceLayerAPI:Pp}=q(),{portalModules:UA,serviceLayerApiURIs:xA}=f(),LA=UA.CREDIT_MEMO,wA=xA[LA];Mp.createCreditMemo=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemo request: "+JSON.stringify(e)),Pp.defaults.headers.Cookie=t;let o=await Pp.post(wA,e);return console.log(`Create CreditMemo response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemo error: "+o),o}}});var $p=p((KU,Wp)=>{var{getSLConnection:vA}=K(),_A=Fp(),BA=async(e,t,o)=>{try{let r=await vA(e),s=await _A.createCreditMemo(e.body,r);t.status(200).send({DocNum:s.DocNum})}catch(r){console.log("create CreditMemo Controller: "+JSON.stringify(r)),o(r)}};Wp.exports={create:BA}});var Vp=p((XU,Hp)=>{var PA=require("../node_modules/express/index.js"),MA=$p(),{portalModules:FA,permissions:WA}=f(),{checkUserPermission:$A}=N(),kp=new PA.Router;kp.route("/").post($A([FA.CREDIT_MEMO],WA.CREATE),MA.create);Hp.exports=kp});var Jp=p(xo=>{var{dbCreds:Ye}=D();xo.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${Ye.CompanyDB}.ORRR T0, ${Ye.CompanyDB}.RRR1 T1, ${Ye.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;xo.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal",
    T1."U_ReturnedInvoiceNos", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."U_ReturnReason"
  FROM ${Ye.CompanyDB}.ORRR T0
    INNER JOIN ${Ye.CompanyDB}.RRR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Ye.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;xo.creditMemoAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${Ye.CompanyDB}.ORRR T0
  WHERE T0."DocEntry" = ?`;xo.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${Ye.CompanyDB}.OADP T0`});var ya=p(Lo=>{var ls=A(),{buildHeaderRecQuery:kA,buildRowLevelQuery:HA}=ve(),cs=Jp();Lo.getCreditMemoRequest=e=>{try{let t=kA(cs.creditMemoQuery,e,['T0."U_CODCntName"']);return console.log("getCreditMemoRequest- sql: ",t),ls.executeWithValues(t)}catch(t){throw console.log("getCreditMemoRequest - controller - error: "+JSON.stringify(t.message)),t}};Lo.getItemDetails=e=>{try{let t=HA(cs.itemListForCreditMemo,e),o=ls.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};Lo.getAttachmentEntry=e=>{try{let t=ls.executeWithValues(cs.creditMemoAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};Lo.getAttachmentPath=()=>{try{let e=ls.executeWithValues(cs.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(e.message)),e}}});var Gp=p(ga=>{var qp=ya();ga.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=qp.getCreditMemoRequest(e.query);t.send(r)}catch(r){console.log("get CreditMemoRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};ga.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=qp.getItemDetails(e.query);console.log("getItems-CreditMemoRequest controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Xp=p((ox,Kp)=>{var VA=require("../node_modules/express/index.js"),Ta=new VA.Router,jp=Gp(),{checkUserPermission:zp}=N(),{portalModules:Qp,permissions:Yp}=f();Ta.route("/").get(zp(Qp.CREDIT_MEMO_REQUEST,Yp.READ),jp.get);Ta.route("/items").get(zp(Qp.CREDIT_MEMO_REQUEST,Yp.READ),jp.getItems);Kp.exports=Ta});var fa=p((Ke,rm)=>{var{serviceLayerAPI:ae}=q(),{portalModules:tm,serviceLayerApiURIs:JA}=f(),Zp=ya(),qA=require("fs"),ha=require("path"),rx=require("../node_modules/pdfkit/js/pdfkit.js"),om=require("../node_modules/multer/index.js"),GA=require("../node_modules/form-data/lib/form_data.js"),jA=require("../node_modules/axios/index.js"),zA=require("https"),QA=tm.CREDIT_MEMO_REQUEST,Ca=JA[QA],em=tm.ATTACHMENTS,YA=om.memoryStorage(),KA=om({storage:YA});Ke.createCreditMemoRequest=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemoRequest request: "+JSON.stringify(e)),ae.defaults.headers.Cookie=t;let o=await ae.post(Ca,e);return console.log(`Create CreditMemoRequest response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemoRequest error: "+o),o}};Ke.patchCreditMemoRequest=async(e,t,o)=>{try{return ae.defaults.headers.Cookie=o,(await ae.patch(`${Ca}(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching CreditMemoRequest ${e}:`,r.response?.data||r.message),r}};Ke.patchInvoice=async(e,t,o)=>{try{return ae.defaults.headers.Cookie=o,(await ae.patch(`/Invoices(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching Invoice ${e}:`,r.response?.data||r.message),r}};Ke.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),ae.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=ha.extname(s).replace(".",""),a=ha.basename(s,"."+n),i=s,l=(await Zp.getAttachmentPath()).AttachPath;console.log("source_dir",l);let d=ha.join(l,s);console.log("fullFilePath: *** "+d+" = "+r),qA.writeFileSync(d,r),console.log(`*** File saved successfully at ${d}`);let u={Attachments2_Lines:[{FileExtension:n,SourcePath:l,FileName:a}]},m={},g,C={Accept:"application/json","Content-Type":"application/json"};console.log("att_pdf",u);let T=await Zp.getAttachmentEntry(t);if(console.log("Invoice response",JSON.stringify(T)),T&&T?.AtcEntry!==null){if(g=T?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(g)),m=await ae.patch(`${em}(${g})`,u),m&&m.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),m=await ae.post(em,u,{headers:C}),console.log("Attachment Post API Called"),m.data){console.log("Attachment Post Response:"+JSON.stringify(m.data)),g=m.data.AbsoluteEntry;let h={AttachmentEntry:g},E=await ae.patch(`${Ca}(${t})`,h);if(E&&E.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",m.status),{message:"Unexpected response from server.",status:m.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};Ke.reopenInvoice=async(e,t)=>{try{console.log(`[SAP Action] Reopening Invoice: ${t}`),ae.defaults.headers.Cookie=e;let o=await ae.post(`/Invoices(${t})/Reopen`);return console.log(`[SAP Response] Reopen Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Reopening invoice ${t}:`,o.response?.data||o.message),o}};Ke.closeInvoice=async(e,t)=>{try{console.log(`[SAP Action] Closing Invoice: ${t}`),ae.defaults.headers.Cookie=e;let o=await ae.post(`/Invoices(${t})/Close`);return console.log(`[SAP Response] Close Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Closing invoice ${t}:`,o.response?.data||o.message),o}};Ke.createAttachment=async(e,t)=>{try{if(!e)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.originalname}`);let o=new GA;o.append("file",e.buffer,{filename:e.originalname,contentType:e.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await jA.post(s,o.getBuffer(),{headers:n,httpsAgent:new zA.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachment (Direct Upload) error:",JSON.stringify(r)),o?.response&&console.error(`*** status: ${o.response.status}`),null}};rm.exports.upload=KA});var am=p((sx,nm)=>{var{getSLConnection:XA}=K(),Ue=fa(),sm=Pe(),ZA=ua(),Sa=new Map,eI=async(e,t,o)=>{let r=!1,s=!0,n=null,a=null,i=null,c=!1,l=null;try{let d=JSON.parse(e.body.salesReturnData),u=d[0]||{},m=d[1]||[];if(l=u.Unique,l){if(Sa.has(l))return console.error(`[BACKEND] Concurrent request detected for Return UniqueID: ${l}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});Sa.set(l,!0)}if(l){console.log(`[Duplicate Check] Checking for existing return with Unique ID: ${l}`);let h=await ZA.getUniqueId(l);if(h)return console.log(`[Duplicate Check] Duplicate found! Returning existing DocNum: ${h.DocNum}`),t.status(200).send({DocNum:h.DocNum,DocEntry:h.DocEntry,isExist:!0})}let g=e.file;if(a=await XA(e),!a)throw new Error("Session Login Failed");if(n=m?.[0]?.DocEntry,!n)throw new Error("Base Invoice DocEntry is missing");let C=await sm.getInvoiceByDocEntry(n,e);if(C?.DocumentStatus==="bost_Close"||C?.DocumentStatus==="C")try{console.log(`[Status] Invoice ${n} is closed. Attempting Reopen...`),await Ue.reopenInvoice(a,n),console.log(`[Status] Reopen successful for ${n}`),r=!0}catch(h){let E=h.response?.data?.error?.message?.value||h.message;if(E.toLowerCase().includes("not supported")||E.includes("404")||h.response?.status===404)console.warn("[Fallback] SAP version does not support 'Reopen'. Falling back to Standalone mapping."),s=!1;else throw new Error(`Failed to reopen invoice: ${E}`)}if(i=C?.AttachmentEntry||null,i&&s)try{console.log(`[Attachment] Invoice ${n} has AttachmentEntry: ${i}. Temporarily clearing to prevent [131-102] folder error...`),await Ue.patchInvoice(n,{AttachmentEntry:null},a),c=!0,console.log("[Attachment] Invoice attachment cleared. Native mapping ACTIVE \u2014 document link will be preserved.")}catch(h){let E=h.response?.data?.error?.message?.value||h.message;console.warn(`[Attachment Fallback] Could not temporarily clear invoice attachment (${E}). Falling back to Standalone mapping.`),s=!1}u.DocumentLines=u.DocumentLines.map((h,E)=>{let k=m[E],W={Quantity:Number(h.Quantity)};return s&&(W.BaseType=13,W.BaseEntry=Number(n),W.BaseLine=k?Number(k.LineNum):E),W}),console.log(`DEBUG: Mapping Mode: ${s?"NATIVE (linked)":"STANDALONE (unlinked)"}`),console.log("DEBUG: Mapped DocumentLines:",JSON.stringify(u.DocumentLines,null,2));let T=await Ue.createCreditMemoRequest(u,a);if(console.log(`[Return] Created Return DocNum: ${T.DocNum}, DocEntry: ${T.DocEntry}`),c&&i)try{await Ue.patchInvoice(n,{AttachmentEntry:i},a),console.log(`[Attachment] Restored AttachmentEntry (${i}) to Invoice ${n}`)}catch(h){console.warn("[Attachment Warning] Failed to restore invoice's AttachmentEntry:",h.response?.data||h.message)}if(i)try{await Ue.patchCreditMemoRequest(T.DocEntry,{AttachmentEntry:i},a),console.log(`[Attachment] Linked base invoice AttachmentEntry (${i}) to Return ${T.DocEntry}`)}catch(h){console.warn("[Attachment Warning] Failed to link invoice attachment to return:",h.response?.data||h.message)}if(g){let h=await Ue.createAttachment(g,a);if(h)try{await Ue.patchCreditMemoRequest(T.DocEntry,{AttachmentEntry:h},a),console.log(`[Attachment] POS file attachment (${h}) linked to Return ${T.DocEntry}`)}catch(E){console.warn("[Attachment Warning] Failed to link POS attachment to Return:",E.response?.data||E.message)}}if(r)try{console.log(`[Status] Restoring Invoice ${n} to closed.`),await Ue.closeInvoice(a,n)}catch{console.warn("[Status Warning] Failed to re-close invoice, but return was posted.")}if(m.length>0)try{await sm.updateRemainingQuantity(m)}catch(h){console.error("[DB Error] Failed to update remaining quantities in local DB:",h.message)}t.status(200).send({DocNum:T.DocNum,DocEntry:T.DocEntry})}catch(d){let u=d.response?.data?.error?.message?.value||d.message;if(console.error("!!! FINAL ERROR !!!: "+u),c&&n&&a&&i)try{await Ue.patchInvoice(n,{AttachmentEntry:i},a),console.log("[Cleanup] Restored invoice AttachmentEntry after error.")}catch(m){console.warn("[Cleanup Warning] Could not restore invoice AttachmentEntry:",m.message)}if(r&&n&&a)try{await Ue.closeInvoice(a,n)}catch{}t.status(500).json({message:u})}finally{l&&Sa.delete(l)}};nm.exports={create:eI}});var cm=p((nx,lm)=>{var tI=require("../node_modules/express/index.js"),oI=am(),{portalModules:rI,permissions:sI}=f(),{checkUserPermission:nI}=N(),im=new tI.Router,aI=fa(),{upload:iI}=aI;im.route("/").post(nI([rI.CREDIT_MEMO_REQUEST],sI.CREATE),iI.single("attachment"),oI.create);lm.exports=im});var dm=p(Ea=>{var{dbCreds:xe}=D();Ea.inventoryCounting=`SELECT T0."DocNum", T0."DocEntry", T0."CountDate", T0."Time", T0."Status", T0."Remarks", T0."BPLId", T0."BPLName",
  T0."U_Location"
    FROM ${xe.CompanyDB}.OINC T0
    JOIN ${xe.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
  WHERE T0."Status" = 'O'
  AND T3."CounterId" = ?`;Ea.itemListForInventoryCounting=`SELECT T1."ItemCode", T1."ItemDesc", T1."LineNum", T1."WhsCode", T4."BinCode", T1."CountQty", 
    T1."CountDate", T1."CountTime",T2."TotalQty", 
    (SELECT STRING_AGG(F."BcdCode", ', ') FROM  ${xe.CompanyDB}.OBCD F
        WHERE F."ItemCode" = ITM."ItemCode") AS "CodeBars",  
    (SELECT E."ItmsGrpNam" FROM  ${xe.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod" = ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod"
  FROM ${xe.CompanyDB}.OINC T0
    INNER JOIN ${xe.CompanyDB}.INC1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${xe.CompanyDB}.INC9 T2 ON T0."DocEntry" = T2."DocEntry" 
    INNER JOIN ${xe.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
    LEFT JOIN ${xe.CompanyDB}.OBIN T4 ON T1."BinEntry" = T4."AbsEntry"
    INNER JOIN ${xe.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T1."LineNum" = T2."LineNum" 
    AND T2."CounterNum" = T3."CounterNum"
    AND T0."DocNum" = ?
    AND T3."CounterId" = ?`});var mm=p(Da=>{var um=A(),{buildHeaderRecQuery:lI,buildRowLevelQuery:ix}=ve(),pm=dm();Da.getInventoryCounting=e=>{try{let t=lI(pm.inventoryCounting,e,null,"CountDate");return console.log("getInventoryCounting- sql: ",t),um.executeWithValues(t,[e.counterId])}catch(t){throw console.log("getInventoryCounting - controller - error: "+JSON.stringify(t.message)),t}};Da.getItemDetails=e=>{try{return{itemsList:um.executeWithValues(pm.itemListForInventoryCounting,[e.docNum,e.counterId])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var gm=p(Aa=>{var ym=mm();Aa.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=ym.getInventoryCounting(e.query);t.send(r)}catch(r){console.log("get - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}};Aa.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=ym.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Cm=p((mx,hm)=>{var cI=require("../node_modules/express/index.js"),Ia=new cI.Router,Tm=gm(),{checkUserPermission:dx}=N(),{portalModules:ux,permissions:px}=f();Ia.route("/").get(Tm.get);Ia.route("/items").get(Tm.getItems);hm.exports=Ia});var Sm=p(Na=>{var{serviceLayerAPI:ds}=q(),{portalModules:dI,serviceLayerApiURIs:uI}=f(),pI=dI.INVENTORY_COUNTING,fm=uI[pI];Na.createInventoryCounting=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** InventoryCounting request: "+JSON.stringify(e)),ds.defaults.headers.Cookie=t;let o=await ds.post(fm,e);return console.log(`Create InventoryCounting response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create InventoryCounting error: "+o),o}};Na.updateInventoryCounting=async(e,t)=>{try{return console.log("*** InventoryCounting update request: "+JSON.stringify(e)),ds.defaults.headers.Cookie=t,!!await ds.patch(`${fm}(${e.DocumentEntry})`,e)}catch(o){throw console.log("Create InventoryCounting error: "+o),o}}});var Im=p(Ra=>{var{getSLConnection:Dm}=K(),Am=Sm(),Em=Co();Ra.create=async(e,t,o)=>{try{let r=await Dm(e),s=await Am.createInventoryCounting(e.body,r),n="";s&&(n=s.DocumentNumber),t.status(200).send({docNum:n})}catch(r){console.log("create InventoryCounting Controller: "+JSON.stringify(r)),o(r)}};Ra.update=async(e,t,o)=>{try{let r=await Dm(e),{SalesBatchSelection:s}=e.body,n=e.body.DocNum;if(delete e.body.SalesBatchSelection,delete e.body.DocNum,console.log("Update InventoryCounting request: "+JSON.stringify(e.body)),await Am.updateInventoryCounting(e.body,r)){if(Array.isArray(s)&&s.length>0){let i=await Promise.all(s.map(c=>c.DocEntry?(console.log("Update SBS -------->"),Em.updateSalesBatchSelection(c,r)):Em.createSalesBatchSelection(c,"",n,r)))}t.status(200).send({success:!0,message:"Success"})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("update InventoryCounting Controller: "+JSON.stringify(r)),o(r)}}});var bm=p((fx,Rm)=>{var mI=require("../node_modules/express/index.js"),Nm=Im(),{portalModules:Tx,permissions:hx}=f(),{checkUserPermission:Cx}=N(),ba=new mI.Router;ba.route("/").post(Nm.create);ba.route("/").patch(Nm.update);Rm.exports=ba});var Om=p(wo=>{var{dataSource:us}=re(),ps=Xs(),Oa="userGroupId";wo.createUserGroup=async e=>{try{return await us.getRepository(ps).save(e)}catch(t){throw t}};wo.getUserGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Oa]=e.id,delete e.id);try{let o=us.getRepository(ps);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupId:"ASC"}})}catch(o){throw o}};wo.updateUserGroup=async(e,t)=>{try{let o=us.getRepository(ps),r={};return console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(r=await o.update({[Oa]:e},t)),r}catch(o){throw o}};wo.deleteUserGroup=async e=>{try{return await us.getRepository(ps).delete({[Oa]:e})}catch(t){throw t}}});var Um=p(Jt=>{var vo=Om();Jt.create=async(e,t,o)=>{if(!e.body||!e.session.userId||!e.body.groupId){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await vo.createUserGroup(e.body);t.send(r)}catch(r){console.error("Error creating UserGroup!"),o(r)}};Jt.findAll=async(e,t,o)=>{try{let r=await vo.getUserGroup(e.query);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};Jt.findOne=async(e,t,o)=>{try{let r=await vo.getUserGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};Jt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await vo.updateUserGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating UserGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Jt.delete=async(e,t,o)=>{try{let r=await vo.deleteUserGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserGroup!"),o(r)}}});var Lm=p((Dx,xm)=>{var yI=require("../node_modules/express/index.js"),_o=Um(),qt=new yI.Router;qt.post("/",_o.create);qt.get("/",_o.findAll);qt.get("/:id",_o.findOne);qt.put("/:id",_o.update);qt.delete("/:id",_o.delete);xm.exports=qt});var vm=p(Gt=>{var Bo=mr(),{formatDate:wm}=L(),gI="storeName";Gt.create=async(e,t,o)=>{if(!e.body||!e.body[gI]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body),e.body.createdBy=e.session.userId,e.body.createdAt=wm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await Bo.createStore(e.body);t.send(r)}catch(r){console.error("Error creating Store!"),o(r)}};Gt.findAll=async(e,t,o)=>{try{let r=await Bo.getStore(e.query);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Gt.findOne=async(e,t,o)=>{try{let r=await Bo.getStore(e.params,1);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Gt.update=async(e,t,o)=>{if(e.params.id&&e.body){e.body.modifiedBy=e.session.userId,e.body.modifiedAt=wm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await Bo.updateStore(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating Store!"),o(r)}}else t.status(400).send({message:"Invalid request!"})};Gt.delete=async(e,t,o)=>{try{let r=await Bo.deleteStore(e.params.id);t.send(r)}catch(r){console.error("Error deleting Store!"),o(r)}}});var Mm=p(Tt=>{var{createStoreWarehouse:TI,getStoreWarehouse:_m,updateStoreWarehouse:hI,deleteStoreWarehouse:Bm,parentPrimaryKey:Ua}=st(),{formatDate:Pm}=L();Tt.create=async(e,t,o)=>{if(console.log("Create StoreWarehouse - req.body: ",e.body),console.log("Create StoreWarehouse - req.params: ",e.params),!e.body||!e.params[Ua]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Pm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await TI(e.body,e.params[Ua],r,s);t.send(n)}catch(n){console.error("Error creating StoreWarehouse!"),o(n)}};Tt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await _m(r);t.send(s)}catch(s){console.error("Error getting StoreWarehouse!"),o(s)}};Tt.findOne=async(e,t,o)=>{try{let r=await _m(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreWarehouse!"),o(r)}};Tt.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Pm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await hI(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreWarehouse!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Tt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Bm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}};Tt.deleteAll=async(e,t,o)=>{if(!e.params[Ua]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Bm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}}});var km=p(ht=>{var{createStoreCounter:CI,getStoreCounter:Fm,updateStoreCounter:fI,deleteStoreCounter:Wm,parentPrimaryKey:xa}=Zs(),{formatDate:$m}=L();ht.create=async(e,t,o)=>{if(console.log("Create StoreCounter - req.body: ",e.body),console.log("Create StoreCounter - req.params: ",e.params),!e.body||!e.params[xa]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=$m(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await CI(e.body,e.params[xa],r,s);t.send(n)}catch(n){console.error("Error creating StoreCounter!"),o(n)}};ht.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Fm(r);t.send(s)}catch(s){console.error("Error getting StoreCounter!"),o(s)}};ht.findOne=async(e,t,o)=>{try{let r=await Fm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreCounter!"),o(r)}};ht.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=$m(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await fI(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreCounter!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};ht.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Wm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}};ht.deleteAll=async(e,t,o)=>{if(!e.params[xa]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Wm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}}});var qm=p(Ct=>{var{createStoreUser:SI,getStoreUser:Hm,updateStoreUser:EI,deleteStoreUser:Vm,parentPrimaryKey:La}=en(),{formatDate:Jm}=L();Ct.create=async(e,t,o)=>{if(console.log("Create StoreUser - req.body: ",e.body),console.log("Create StoreUser - req.params: ",e.params),!e.body||!e.params[La]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Jm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await SI(e.body,e.params[La],r,s);t.send(n)}catch(n){console.error("Error creating StoreUser!"),o(n)}};Ct.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Hm(r);t.send(s)}catch(s){console.error("Error getting StoreUser!"),o(s)}};Ct.findOne=async(e,t,o)=>{try{let r=await Hm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreUser!"),o(r)}};Ct.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Jm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await EI(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreUser!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Ct.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Vm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}};Ct.deleteAll=async(e,t,o)=>{if(!e.params[La]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Vm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}}});var jm=p((bx,Gm)=>{var DI=require("../node_modules/express/index.js"),Po=vm(),jt=Mm(),zt=km(),Qt=qm(),{parentPrimaryKey:Yt}=st(),{portalModules:O,permissions:w}=f(),{checkUserPermission:v}=N(),U=new DI.Router;U.post("/",v(O.STORE_SETUP,w.CREATE),Po.create);U.get("/",v(O.STORE_SETUP,w.READ),Po.findAll);U.get("/:id",v(O.STORE_SETUP,w.READ),Po.findOne);U.put("/:id",v(O.STORE_SETUP,w.WRITE),Po.update);U.delete("/:id",v(O.STORE_SETUP,w.CANCEL),Po.delete);U.post(`/:${Yt}/warehouse/`,v(O.STORE_WAREHOUSE,w.CREATE),jt.create);U.get(`/:${Yt}/warehouse/`,v([O.STORE_WAREHOUSE,O.INVOICE],w.READ),jt.findAll);U.get("/warehouse/find",v(O.STORE_WAREHOUSE,w.READ),jt.findAll);U.get("/warehouse/:id",v(O.STORE_WAREHOUSE,w.READ),jt.findOne);U.put("/warehouse/:id",v(O.STORE_WAREHOUSE,w.WRITE),jt.update);U.delete("/warehouse/:id",v(O.STORE_WAREHOUSE,w.CANCEL),jt.delete);U.post(`/:${Yt}/counter/`,v(O.STORE_COUNTER,w.CREATE),zt.create);U.get(`/:${Yt}/counter/`,v(O.STORE_COUNTER,w.READ),zt.findAll);U.get("/counter/find",v(O.STORE_COUNTER,w.READ),zt.findAll);U.get("/counter/:id",v(O.STORE_COUNTER,w.READ),zt.findOne);U.put("/counter/:id",v(O.STORE_COUNTER,w.WRITE),zt.update);U.delete("/counter/:id",v(O.STORE_COUNTER,w.CANCEL),zt.delete);U.post(`/:${Yt}/user/`,v(O.STORE_USER,w.CREATE),Qt.create);U.get(`/:${Yt}/user/`,v(O.STORE_USER,w.READ),Qt.findAll);U.get("/user/find",v(O.STORE_USER,w.READ),Qt.findAll);U.get("/user/:id",v(O.STORE_USER,w.READ),Qt.findOne);U.put("/user/:id",v(O.STORE_USER,w.WRITE),Qt.update);U.delete("/user/:id",v(O.STORE_USER,w.CANCEL),Qt.delete);Gm.exports=U});var Qm=p(Mo=>{var{dataSource:ms}=re(),ys=zs(),zm="parkedTransactionId",AI="parkedDateTime",II="ASC",{getStoreWarehouse:NI}=st();Mo.createParkedTransaction=async e=>{try{return await ms.getRepository(ys).save(e)}catch(t){throw t}};Mo.getParkedTransaction=async(e,t,o=null)=>{t&&!e.storeId&&(e.storeId=t),console.log("filter: ",JSON.stringify(e)),e.id&&(e[zm]=e.id,delete e.id);try{let r=ms.getRepository(ys),s,n=[];if(t)try{n=(await NI({storeId:t})||[]).map(l=>l.warehouseCode),console.log(`[BACKEND] Fetched ${n.length} warehouses for storeId ${t}`)}catch(c){console.error(`[BACKEND] Error fetching warehouse list for storeId ${t}:`,c.message)}if(o===1?s=await r.findOneBy(e):s=await r.find({where:e,order:{[AI]:II}}),!s)return[];let a=Array.isArray(s)?s:[s],i=[];for(let c of a){let{data:l}=c,d;try{d=JSON.parse(l)}catch(g){console.error(`Error parsing data for record with storeId ${t}:`,g);continue}(d.salesItems||d.salesQuotationItems||[]).every(g=>!n||n.length===0?!0:n.includes(g.WhsCode))&&i.push(c)}return i}catch(r){throw r}};Mo.getLatestNextRefNum=async()=>{try{let t=await ms.getRepository(ys).find({order:{nextRefNum:"DESC"},take:1});return t.length===0?1:t[0].nextRefNum}catch(e){throw e}};Mo.deleteParkedTransaction=async e=>{try{return await ms.getRepository(ys).delete({[zm]:e})}catch(t){throw t}}});var Km=p(Wo=>{var Fo=Qm(),{formatDate:Ym}=L();Wo.create=async(e,t,o)=>{if(!e.body||!e.body.transactionType||!e.body.data){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let{userSessionLog:r}=e.session;e.body.userId=r.userId,e.body.userName=r.userName,e.body.storeId=r.storeId,e.body.storeLocation=r.storeLocation,e.body.storeCounterId=r.storeCounterId,e.body.counterCode=r.counterCode,e.body.parkedDateTime=Ym(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let{data:s}=e.body;s&&typeof s=="object"&&!Array.isArray(s)&&(s=JSON.stringify(s),e.body.data=s);let n=await Fo.getLatestNextRefNum();e.body.transactionRefNum=`${n}-${Ym(new Date,"ddmm")}`,e.body.nextRefNum=n+1;let a=await Fo.createParkedTransaction(e.body);t.send({id:a.parkedTransactionId})}catch(r){console.error("Error creating ParkedTransaction!"),o(r)}};Wo.findAll=async(e,t,o)=>{try{let r=e.session.userSessionLog.storeId,s=await Fo.getParkedTransaction(e.query,r);t.send(s)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Wo.findOne=async(e,t,o)=>{try{let r=await Fo.getParkedTransaction(e.params,1);t.send(r)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Wo.delete=async(e,t,o)=>{try{let r=await Fo.deleteParkedTransaction(e.params.id);t.send(r)}catch(r){console.error("Error deleting ParkedTransaction!"),o(r)}}});var Zm=p((xx,Xm)=>{var RI=require("../node_modules/express/index.js"),gs=Km(),$o=new RI.Router;$o.post("/",gs.create);$o.get("/",gs.findAll);$o.get("/:id",gs.findOne);$o.delete("/:id",gs.delete);Xm.exports=$o});var ey=p(wa=>{var{cookieName:bI,httpStatusCodes:OI,recordState:UI}=f(),{formatDate:xI}=L(),{updateUserSessionLog:LI}=xt(),{invalidateSLCache:wI}=K();wa.get=async(e,t,o)=>{try{let{permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:i,storeWHCode:c,userTIN:l,userGroup:d}=e.session;!d&&i?.userGroup&&(d=i.userGroup),!n&&i?.displayUserName&&(n=i.displayUserName),console.log("LOG LOGIN - BACKEND - session data retrieved:",{userName:s,displayUserName:n,userId:a,userGroup:d}),t.send({permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:i,storeWHCode:c,userTIN:l,userGroup:d})}catch(r){console.error("Error getting Session data!"),o(r)}};wa.delete=async(e,t,o)=>{console.log("Destroying session!");try{if(e.session&&e.session.cookie){if(e.session.userSessionLog&&e.session.userSessionLog.userSessionLogId){let r={sessionStatus:UI.INACTIVE,logoutTime:xI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")};await LI(e.session.userSessionLog.userSessionLogId,r)}t.clearCookie(bI,{path:"/"}),e.session.destroy(r=>{if(r)throw r}),wI(e)}t.status(OI.OK).json({message:"Logged out successfully!"})}catch(r){console.error("Error destroying session!"),o(r)}}});var ry=p((wx,oy)=>{var ty=ey(),vI=require("../node_modules/express/index.js"),va=new vI.Router;va.get("/",ty.get);va.delete("/logout",ty.delete);oy.exports=va});var ny=p(Kt=>{var ko=xt(),_I=st(),BI=mr(),{formatDate:PI}=L(),{canAssignUserToCounter:sy}=Cr();Kt.create=async(e,t,o)=>{if(!e.body){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=!0;if(e.body.storeCounterId&&(r=await sy(e.session.userId,e.body.storeCounterId)),r){e.body.loginTime=PI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let s=await ko.createUserSessionLog(e.body);t.send(s)}}catch(r){console.error("Error creating UserSessionLog!"),o(r)}};Kt.findAll=async(e,t,o)=>{try{let r=await ko.getUserSessionLog(e.query);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Kt.findOne=async(e,t,o)=>{try{let r=await ko.getUserSessionLog(e.params,1);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Kt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=!0;if(e.body.storeCounterId&&(r=await sy(e.session.userId,e.body.storeCounterId)),r){let s="",n="";if(e.body.storeId){let l=await BI.getStore({storeId:e.body.storeId});console.log("store: ",l[0]),Array.isArray(l)&&l.length>0&&(n=l[0].locationCode,s=l[0].location,e.body.storeLocation=s,e.session.userSessionLog.storeLocation=s,e.session.userSessionLog.locationCode=n)}let a=await ko.updateUserSessionLog(e.params.id,e.body);console.log("user-session-log.controller - update - response: ",a);let i="",{counterName:c}=e.body;if(e.body.storeId&&e.body.storeCounterId&&e.body.counterCode){e.session.userSessionLog.storeId=e.body.storeId,e.session.userSessionLog.storeCounterId=e.body.storeCounterId,e.session.userSessionLog.counterCode=e.body.counterCode,e.session.userSessionLog.counterName=c;let l=await _I.getStoreWarehouse({storeId:e.body.storeId});console.log("storeWarehouse: ",l[0]),Array.isArray(l)&&l.length>0&&(i=l[0].warehouseCode,e.session.storeWHCode=i)}t.send({...a,storeWHCode:i,storeLocation:s,locationCode:n})}}catch(r){console.error("Error updating UserSessionLog!"),e.session.userSessionLog.storeId="",e.session.userSessionLog.storeCounterId="",e.session.userSessionLog.counterCode="",e.session.storeWHCode="",o(r)}else t.status(400).send({message:"Invalid request!"})};Kt.delete=async(e,t,o)=>{try{let r=await ko.deleteUserSessionLog(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserSessionLog!"),o(r)}}});var iy=p((_x,ay)=>{var MI=require("../node_modules/express/index.js"),Ho=ny(),Xt=new MI.Router;Xt.post("/",Ho.create);Xt.get("/",Ho.findAll);Xt.get("/:id",Ho.findOne);Xt.put("/:id",Ho.update);Xt.delete("/:id",Ho.delete);ay.exports=Xt});var Cs=p(Xe=>{var{dataSource:Ts}=re(),hs=Ys(),Vo="itemGroupMemberId";Xe.parentPrimaryKey="itemGroupId";Xe.createQCItemGroupMember=async(e,t)=>{try{let o;return Array.isArray(e)?o=e.map(s=>({...s,[Xe.parentPrimaryKey]:t})):o={...e,[Xe.parentPrimaryKey]:t},await Ts.getRepository(hs).save(o)}catch(o){throw o}};Xe.getQCItemGroupMember=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Vo]=e.id,delete e.id);try{let o=Ts.getRepository(hs);return t===1?await o.findOneBy(e):await o.findBy(e)}catch(o){throw o}};Xe.updateQCItemGroupMember=async(e,t)=>{try{let o=Ts.getRepository(hs);return t[Vo]&&delete t[Vo],await o.update({[Vo]:e},t)}catch(o){throw o}};Xe.deleteQCItemGroupMember=async e=>{e.id&&(e[Vo]=e.id,delete e.id);try{return await Ts.getRepository(hs).delete(e)}catch(t){throw t}}});var dy=p(Jo=>{var{dataSource:fs}=re(),{createQCItemGroupMember:cy,updateQCItemGroupMember:FI}=Cs(),Ss=Qs(),Es="itemGroupId",ly="itemGroupMemberId";Jo.createQCItemGroup=async e=>{try{let o=await fs.getRepository(Ss).save(e);if(e.items){let r=await cy(e.items,o[Es]);o.items=r}return o}catch(t){throw t}};Jo.getQCItemGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Es]=e.id,delete e.id);try{let o=fs.getRepository(Ss);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupName:"ASC"}})}catch(o){throw o}};Jo.updateQCItemGroup=async(e,t)=>{try{let o=fs.getRepository(Ss),r;t.items&&(r=t.items,delete t.items);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[Es]:e},t)),r){let n=[];if(r.forEach(async a=>{a[ly]?await FI(a[ly],a):n.push(a)}),n.length>0){let a=await cy(n,e);s.items=a}}return s}catch(o){throw o}};Jo.deleteQCItemGroup=async e=>{try{return await fs.getRepository(Ss).delete({[Es]:e})}catch(t){throw t}}});var uy=p(Zt=>{var qo=dy();Zt.create=async(e,t,o)=>{if(!e.body||!e.body.groupName){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await qo.createQCItemGroup(e.body);t.send(r)}catch(r){console.error("Error creating QCItemGroup!"),o(r)}};Zt.findAll=async(e,t,o)=>{try{let r=await qo.getQCItemGroup(e.query);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Zt.findOne=async(e,t,o)=>{try{let r=await qo.getQCItemGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Zt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await qo.updateQCItemGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Zt.delete=async(e,t,o)=>{try{let r=await qo.deleteQCItemGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting QCItemGroup!"),o(r)}}});var yy=p(ft=>{var{createQCItemGroupMember:WI,getQCItemGroupMember:py,updateQCItemGroupMember:$I,deleteQCItemGroupMember:my,parentPrimaryKey:_a}=Cs();ft.create=async(e,t,o)=>{if(console.log("Create QCItemGroupMember - req.body: ",e.body),console.log("Create QCItemGroupMember - req.params: ",e.params),!e.body||!e.params[_a]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await WI(e.body,e.params[_a]);t.send(r)}catch(r){console.error("Error creating QCItemGroupMembers!"),o(r)}};ft.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await py(r);t.send(s)}catch(s){console.error("Error getting QCItemGroupMembers!"),o(s)}};ft.findOne=async(e,t,o)=>{try{let r=await py(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroupMembers!"),o(r)}};ft.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await $I(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroupMembers!"),o(r)}else t.status(400).send({message:"Invalid request!"})};ft.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await my(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}};ft.deleteAll=async(e,t,o)=>{if(!e.params[_a]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await my(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}}});var Ty=p((Wx,gy)=>{var kI=require("../node_modules/express/index.js"),Go=uy(),St=yy(),{parentPrimaryKey:Ba}=Cs(),de=new kI.Router;de.post("/",Go.create);de.get("/",Go.findAll);de.get("/:id",Go.findOne);de.put("/:id",Go.update);de.delete("/:id",Go.delete);de.post(`/:${Ba}/item/`,St.create);de.get(`/:${Ba}/item/`,St.findAll);de.get("/item/find",St.findAll);de.get("/item/:id",St.findOne);de.put("/item/:id",St.update);de.delete("/item/:id",St.delete);de.delete(`/:${Ba}/item`,St.deleteAll);gy.exports=de});var Pa=p(jo=>{var{dbCreds:Et}=D(),{draftObjectCodes:$x}=f();jo.selectApprovedDeliveries=`SELECT T0."DocNum", T0."DocStatus", T0."CANCELED", T0."ObjType", T0."DocDate", T0."DocTime", 
  T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal", T0."DocTotalFC", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."U_DraftDocEntry",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
  T0."BPLName"
     FROM ${Et.CompanyDB}.ODLN T0, ${Et.CompanyDB}.OUSR TOR
   WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
     AND T0."U_DraftStatus" = 'AUTO_APPROVED'`;jo.selectItemDetails=`SELECT T1."LineNum", T1."LineStatus", T0."DocNum", T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
    T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
  FROM ${Et.CompanyDB}.ODLN T0, ${Et.CompanyDB}.DLN1 T1
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `;jo.selectTaxTotal=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
    FROM ${Et.CompanyDB}.ODLN T0
  LEFT JOIN ${Et.CompanyDB}.DLN4 T1 ON T0."DocEntry" = T1."DocEntry"
    WHERE T0."DocNum" = ?`;jo.selectDeliveryWithCustomerRefNoQuery=`SELECT DISTINCT T0."NumAtCard" as "CustomerRefNo"
  FROM ${Et.CompanyDB}.ODLN T0
WHERE T0."NumAtCard" IS NOT NULL
  AND T0."CANCELED" NOT IN ('Y','C')
  AND T0."NumAtCard" = ?`});var Cy=p((Jx,hy)=>{var{dbCreds:Fe}=D(),{draftObjectCodes:Hx,recordState:Vx}=f(),HI=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
    FROM ${Fe.CompanyDB}.ODRF T0, ${Fe.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."ObjType" = ?`,VI=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName",
T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
  FROM ${Fe.CompanyDB}.ODRF T0, ${Fe.CompanyDB}.OUSR TOR, ${Fe.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ?
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,JI=`SELECT TRW."LineNum", TRW."LineStatus", TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${Fe.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,qI=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
  FROM ${Fe.CompanyDB}.ODRF T0
LEFT JOIN ${Fe.CompanyDB}.DRF4 T1 ON T0."DocEntry" = T1."DocEntry"
  WHERE T0."DocEntry" IN `,GI=`UPDATE ${Fe.CompanyDB}.ODRF T0 SET `;hy.exports={selectDrafts:HI,selectDraftsWithMultiApprover:VI,selectItemDetailsForDrafts:JI,selectDraftTaxTotal:qI,updateDraft:GI}});var Ds=p(eo=>{var zo=A(),{userRoles:qx,draftStatus:Gx,portalModules:jx}=f(),Qo=Cy(),jI=' ORDER BY T0."DocEntry" ASC';eo.getDrafts=(e="",t=[])=>{try{let o=Qo.selectDrafts,r=zo.executeWithValues(o+e+jI,t);return console.log("getDraftItems: "+JSON.stringify(r)),r}catch(o){throw o}};eo.getDraftsForApprover=(e,t)=>{try{let o=zo.executeWithValues(Qo.selectDraftsWithMultiApprover,[e,t]);return console.log("getDraftItems: "+JSON.stringify(o)),o}catch(o){throw o}};eo.getDraftItems=e=>{try{let t=zo.executeWithValues(Qo.selectItemDetailsForDrafts+`(${e})`,[]);return console.log("getDraftItems: "+JSON.stringify(t)),t}catch(t){throw t}};eo.getDraftTax=e=>{try{let t=zo.executeWithValues(Qo.selectDraftTaxTotal+`(${e})`,[]);return console.log("getDraftTax: "+JSON.stringify(t)),t}catch(t){throw t}};eo.updateDraft=(e,t)=>{let o=[],r=[],s=" WHERE ";e.U_TargetRecDocNum&&(o.push('T0."U_TargetRecDocNum" = ?'),r.push(e.U_TargetRecDocNum)),e.U_DraftStatus&&(o.push('T0."U_DraftStatus" = ?'),r.push(e.U_DraftStatus)),t.DocEntry?(s=s+'T0."DocEntry" = ?',r.push(t.DocEntry)):t.DocNum&&(s=s+'T0."DocNum" = ?',r.push(t.DocNum));try{let n=Qo.updateDraft+o.join()+s;console.log("updateDraft - sql: ",n),console.log("updateDraft - values: ",r.join());let a=zo.executeWithValues(n,r);return Array.isArray(a)&&a.length>0?a:void 0}catch(n){throw n}}});var Sy=p(Yo=>{var As=A(),{itemTypes:Qx,draftStatus:Yx,userRoles:Ma,draftObjectCodes:zI,portalModules:QI}=f(),Is=Pa(),YI=Pt(),Fa=Ds(),KI=QI.DELIVERY;Yo.getDeliveryWithCustomerRefNo=e=>{try{let t=As.executeWithValues(Is.selectDeliveryWithCustomerRefNoQuery,[e]);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}};Yo.getItemDetails=e=>{try{console.log("docNum:"+e);let t=As.executeWithValues(Is.selectItemDetails+`(${e})`,[]);return console.log("Delivery - getItemDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Yo.getTaxDetails=e=>{try{console.log("docNum:"+e);let t=As.executeWithValues(Is.selectTaxTotal,[e]);return console.log("Delivery - getTaxDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Yo.getDeliveryRecords=e=>{console.log("### getDeliveryRecords - filter: "+JSON.stringify(e));try{let t=[],o=[],r=zI[KI];if(e.userRole==Ma.APPROVER)t=Fa.getDraftsForApprover(r,e.userId);else if(e.userRole==Ma.ORIGINATOR){let s=' AND T0."U_OriginatorId" = ?';t=Fa.getDrafts(s,[r,e.userId]),o=fy(s,[e.userId])}else if(e.userRole==Ma.ADMIN){let s=[],n=` AND T0."U_OriginatorId" IN (${e.originatorIds})
                    AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`;s.push(e.fromDate,e.toDate),e.status&&e.status!=="ALL"&&(n=n+' AND T0."U_DraftStatus" IN (?)',s.push(e.status)),t=Fa.getDrafts(n,[r,...s]),o=fy(n,s)}if(Array.isArray(t)&&t.length){let s=[];if(t.forEach(n=>{s.push(n.DocEntry)}),Array.isArray(s)&&s.length){let n=YI.getApproversForDraft(s);if(console.log("allApprovers: "+JSON.stringify(n)),Array.isArray(n)&&n.length){let a=[];t.forEach(i=>{n.forEach(c=>{i.DocEntry==c.U_DocEntry&&a.push(c)}),i.approvers=a,a=[]})}}}return[...t,...o]}catch(t){throw console.log("getDeliveryRecords - controller - error: "+JSON.stringify(t)),t}};var fy=(e="",t=[])=>{let o=' ORDER BY T0."DocEntry" ASC';try{let r=As.executeWithValues(Is.selectApprovedDeliveries+e+o,t);return console.log("getAutoApprovedRecords: "+JSON.stringify(r)),r}catch(r){throw r}}});var Dy=p(bs=>{var Ns=Sy(),Ey=Ds(),{recordTypes:Rs}=f();bs.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=[];e.query.customerRefNo?r=Ns.getDeliveryWithCustomerRefNo(e.query.customerRefNo):e.query.userRole&&(r=Ns.getDeliveryRecords(e.query)),t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};bs.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Rs.DIRECT?r=Ns.getItemDetails(e.query.docNum):e.params.recordType===Rs.DRAFT&&(r=Ey.getDraftItems(e.query.docEntry)),console.log("Delivery - getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}};bs.getTax=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Rs.DIRECT?r=Ns.getTaxDetails(e.query.docNum):e.params.recordType===Rs.DRAFT&&(r=Ey.getDraftTax(e.query.docEntry)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}}});var by=p((Zx,Ry)=>{var XI=require("../node_modules/express/index.js"),Os=new XI.Router,{checkUserPermission:Ay}=N(),Wa=Dy(),{portalModules:Iy,permissions:Ny}=f();Os.route("/").get(Ay(Iy.DELIVERY,Ny.READ),Wa.get);Os.route("/items/:recordType?").get(Ay(Iy.DELIVERY,Ny.READ),Wa.getItems);Os.route("/tax/:recordType?").get(Wa.getTax);Ry.exports=Os});var Uy=p(Oy=>{var eL=A(),{itemTypes:tL,draftStatus:oL,portalModules:rL}=f();Oy.getDraft=async(e,t=null)=>{try{return(await t.get(`Drafts(${e})`)).data}catch(o){throw o}}});var My=p(Ze=>{var ZI=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:ie}=q(),{sendMail:By}=Ie(),$a=Pt(),nL=dn(),xy=_t(),Ly=Dr(),We=A(),$e=D(),aL=Pa(),{portalModules:eN,draftStatus:V,draftObjectCodes:Py,systemCurrency:wy,serviceLayerApiURIs:tN,recordTypes:vy}=f(),{getRandomNo:iL,formatDate:oN}=L(),rN=Ds(),sN=Uy(),Ko=eN.DELIVERY,Ha=tN[Ko];Ze.createDeliveryDraft=async(e,t,o)=>{if(console.log(`request: ${JSON.stringify(e)}`),o){ie.defaults.headers.Cookie=o;try{if(e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,Array.isArray(t)&&t.length){e.DocObjectCode=Py[Ko],e.U_DraftStatus||(e.U_DraftStatus=V.PENDING),e.U_MultiLevelApproval=t?t[0].U_MultiLevelApproval:"",e.U_NoOfApprovals=t?parseInt(t[0].U_NoOfApprovals,10):0,console.log("*** DRAFTS request: "+JSON.stringify(e));let r=await ie.post("Drafts",e);return console.log("*** DRAFTS response: "+r),r.data?{draftNum:r.data.DocEntry}:void 0}else{e.U_DraftStatus=V.AUTO_APPROVED;let r=await Ze.createDelivery(e,o);return r?{docNum:r.data.DocNum}:void 0}}catch(r){throw console.log("Create Delivery error: "+r),r}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ze.createDelivery=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{ie.defaults.headers.Cookie=t,e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,e.U_DraftStatus=V.AUTO_APPROVED,console.log("*** Delivery request: "+JSON.stringify(e));let o=await ie.post(Ha,e);return console.log(`Create Delivery response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create Delivery error: "+o),o}};var _y=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o};Ze.createDeliveryFromDraft=async(e,t,o)=>{ie.defaults.headers.Cookie=o;try{console.log("draft: "+JSON.stringify(e));let r=[],s={},n=[],a=e.DocCurrency;Array.isArray(e.DocumentLines)&&e.DocumentLines.length&&e.DocumentLines.forEach(l=>{s={LineNum:l.LineNum,LocationCode:l.LocationCode,ItemCode:l.ItemCode,Quantity:l.Quantity,BaseType:l.BaseType,BaseEntry:l.BaseEntry,BaseLine:l.BaseLine,MeasureUnit:l.MeasureUnit,WarehouseCode:l.WarehouseCode},s.BatchNumbers=_y("Batch",l.BatchNumbers),s.SerialNumbers=_y("Serial",l.SerialNumbers),s.DocumentLinesBinAllocations=ZI(l.DocumentLinesBinAllocations.sort((d,u)=>d.SerialAndBatchNumbersBaseLine-u.SerialAndBatchNumbersBaseLine)),r.push(s)}),r.sort((l,d)=>l.BaseLine-d.BaseLine),Array.isArray(e.DocumentAdditionalExpenses)&&e.DocumentAdditionalExpenses.length&&e.DocumentAdditionalExpenses.forEach(l=>{n.push({LineNum:l.LineNum,ExpenseCode:l.ExpenseCode,LineTotal:a===wy?l.LineTotal:l.LineTotalFC})});let i={DocDate:e.DocDate,DocDueDate:e.DocDueDate,CardCode:e.CardCode,CardName:e.CardName,Address:e.Address,NumAtCard:e.NumAtCard,DocCurrency:a,DocRate:e.DocRate,Reference1:e.Reference1,Reference2:e.Reference2,Comments:e.Comments,DocObjectCode:e.DocObjectCode,CreationDate:e.CreationDate,DocTime:e.DocTime,UpdateDate:e.UpdateDate,UpdateTime:e.UpdateTime,VatPercent:e.VatPercent,VatSum:e.VatSum,DiscountPercent:e.DiscountPercent,TotalDiscount:a===wy?e.TotalDiscount:e.TotalDiscountFC,U_OriginatorId:e.U_OriginatorId,U_ApproverId:e.U_ApproverId,U_DraftStatus:e.U_DraftStatus,U_MultiLevelApproval:e.U_MultiLevelApproval,U_NoOfApprovals:parseInt(e.U_NoOfApprovals,10),U_DraftDocEntry:t,DocumentLines:r,DocumentAdditionalExpenses:n};return e.BPL_IDAssignedToInvoice&&(i.BPL_IDAssignedToInvoice=e.BPL_IDAssignedToInvoice),console.log("***deliveryRequest: "+JSON.stringify(i)),await ie.post(Ha,i)}catch(r){let s=V.PENDING,n=await ie.patch(`Drafts(${t})`,{U_DraftStatus:s});throw console.log("resetDraftStatus - response.data: "+n),r}};var ka=async(e,t,o,r)=>{let s=isNaN(e.U_ApprovalLevel)?0:parseInt(e.U_ApprovalLevel);try{let n=e.DocEntry;console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let a;ie.defaults.headers.Cookie=o;let i=await ie.patch(`Drafts(${n})`,{Comments:e.Comments,U_DraftStatus:e.U_DraftStatus});if(console.log("PATCH Draft - response.data: "+JSON.stringify(i.data)),e.U_DraftStatus==V.APPROVED){let c=await sN.getDraft(n,ie);c&&(a=Ze.createDeliveryFromDraft(c,n,o))}if(i||a){let c=We.executeWithValues($e.updateDraftApproversList,[t,e.U_RejectedReason,oN(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(t===V.REJECTED&&$a.setApprovalStatus(t,n),a){console.log("deliveryResponse.data.DocNum: "+a.data.DocNum),console.log("deliveryResponse.data.DocumentLines: "+JSON.stringify(a.data.DocumentLines));let g=rN.updateDraft({U_TargetRecDocNum:a.data.DocNum},{DocEntry:n});r!=="Y"&&$a.setApprovalStatus(V.APPROVED,n)}let l=We.executeWithValues($e.selectUserInfo,e.U_OriginatorId),d=We.executeWithValues($e.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(d));let u;if([V.APPROVED,V.PENDING].includes(e.U_DraftStatus)?u=V.APPROVED:u=e.U_DraftStatus,Array.isArray(d)&&d.length&&Array.isArray(l)&&l.length){let g=Ly.getMailBody(Ko,l[0].UserName,d[0].UserName,n,u);By(l[0].Email,Ly.subject,g)}let m;return t===V.APPROVED&&(m=$a.getApprovalInternalInDays(n,e.U_ApprovalLevel,r)),{draftStatus:u,noOfDays:m}}}catch(n){throw n}};Ze.updateDeliveryDraft=async(e,t)=>{if(console.log(`request: ${JSON.stringify(e)}`),t){ie.defaults.headers.Cookie=t;try{let o=e.U_DraftStatus;if(e.U_DraftStatus==V.APPROVED){let r=We.executeWithValues($e.selectNoOfApprovalsForDraft,[Py[Ko],e.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(r));let s=0,n;if(Array.isArray(r)&&r.length&&(s=parseInt(r[0].U_NoOfApprovals,10),n=r[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+s),n==="Y"){parseInt(e.U_ApprovalLevel)==s?e.U_DraftStatus=V.APPROVED:parseInt(e.U_ApprovalLevel)<s&&(e.U_DraftStatus=V.PENDING);let a=await ka(e,o,t,n);if(e.U_DraftStatus==V.PENDING){let i=parseInt(e.U_ApprovalLevel)+1,c=We.executeWithValues($e.updateDraftNextApprovalLevel,[V.PENDING,e.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let l=We.executeWithValues($e.selectUserInfo,e.U_OriginatorId),d=We.executeWithValues($e.selectDraftNextApproverDetails,[e.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(d)),Array.isArray(d)&&d.length&&l.length){let u=xy.getMailBody(Ko,l[0].UserName,e.DocEntry);By(d[0].Email,xy.subject,u)}}return a}else{let a=We.executeWithValues($e.selectDraftApprovalStatusCount,[e.DocEntry,e.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(a));let i=0;return Array.isArray(a)&&a.length&&(i=a[0].Count),console.log("noOfApprovalsReceived: "+i),parseInt(i,10)+1>=parseInt(s,10)?(e.U_DraftStatus=V.APPROVED,console.log("****APPROVED")):(e.U_DraftStatus=V.PENDING,console.log("****PENDING")),await ka(e,o,t,n)}}else if(e.U_DraftStatus==V.REJECTED)return console.log("****REJECTED"),await ka(e,o,t)}catch(o){throw console.log("Delivery Draft error: "+o),o}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ze.getDeliveryDraft=async(e,t,o,r=!0)=>{if(o){ie.defaults.headers.Cookie=o;try{let s;if(e===vy.DRAFT?s=await ie.get(`Drafts(${t.docEntry})`):e===vy.DIRECT&&(s=await ie.get(`${Ha}(${t.docNum})`)),r){console.log("response.data: "+JSON.stringify(s.data));let n=We.executeWithValues($e.allFreightInfo,[]),a=s.data.DocumentAdditionalExpenses.slice();if(Array.isArray(a)&&a.length&&n.forEach(i=>{a.forEach(c=>{i.FreightCode==c.ExpenseCode&&(c.FreightName=i.FreightName)})}),s.data)return{draft:s.data,draftStatus:s.data.U_DraftStatus,freightInfoForDraft:a,DocTotal:s.data.DocTotal,DocTotalFc:s.data.DocTotalFc};console.log("Failed to get Delivery Request details!.. Error-500");return}else return s.data}catch(s){throw console.log("Delivery Draft error: "+s),s}}else throw{message:"Unable to connect to the server. Please contact Administrator!"}}});var Wy=p((fL,Fy)=>{var{In:cL}=require("../node_modules/typeorm/index.js"),{getSLConnection:qa}=K(),{sendMail:dL}=Ie(),uL=_t(),pL=A(),mL=D(),{portalModules:nN,draftStatus:yL,draftObjectCodes:gL}=f(),{getRandomNo:TL,formatDate:hL}=L(),Us=My(),aN=io(),{logger:CL}=In(),Va=Pt(),Ja=nN.DELIVERY,iN=async(e,t,o)=>{try{let r=e.session.userId;e.body.userId=e.session.userId;let s=Va.getApprovers(r,Ja),n=await qa(e);if(Array.isArray(s)&&s.length>0){let a=await lN(e.body,s,n);t.status(200).send(a)}else{let a=await Us.createDelivery(e.body,n);t.status(200).send({docNum:a.DocNum})}}catch(r){console.log("create Delivery: "+JSON.stringify(r)),o(r)}},lN=async(e,t=[],o)=>{try{let r=e.userId,s=await Us.createDeliveryDraft(e,t,o);if(s.draftNum){let n=[];if(t.forEach(a=>{n.push(a.UserName)}),n.length>0){let{draftApproverRec:a,mailingList:i}=await Va.createApproversForDraft(s.draftNum,t,Ja);if(a){let c=aN.getUserInfo(r);await Va.notifyApprovers(Ja,c.UserName,s.draftNum,i)}}return{draftNum:s.draftNum,approverName:n.length>0?n.join(", "):""}}return}catch(r){throw r}},cN=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;try{let r=await qa(e),{draftStatus:s,noOfDays:n}=await Us.updateDeliveryDraft(e.body,r);t.status(200).send({draftStatus:s,noOfDays:n})}catch(r){console.log("Delivery Draft error: "+r),o(r)}},dN=async(e,t,o)=>{if(console.log(`get Delivery - req.params: ${JSON.stringify(e.params)}`),e.query.docEntry||e.query.docNum)try{let r=await qa(e),s=await Us.getDeliveryDraft(e.params.type,e.query,r);s?t.send(s):t.status(500).json({message:"Failed to get Delivery Request details!"})}catch(r){console.log("Delivery Draft error: "+r),o(r)}else t.status(500).send({error:"Invalid DocEntry!"})};Fy.exports={create:iN,update:cN,get:dN}});var ky=p((SL,$y)=>{var uN=require("../node_modules/express/index.js"),Ga=Wy(),{portalModules:ja,permissions:za}=f(),{checkUserPermission:Qa}=N(),xs=new uN.Router;xs.route("/").post(Qa(ja.DELIVERY,za.CREATE),Ga.create);xs.route("/draft").patch(Qa(ja.DELIVERY,za.WRITE),Ga.update);xs.route("/items/:recordType?").get(Qa(ja.DELIVERY,za.READ),Ga.get);$y.exports=xs});var Vy=p((EL,Hy)=>{var{getSLConnection:Ya}=K(),Ka=Co(),pN=async(e,t,o)=>{try{let r=await Ya(e),s=await Ka.createSalesBatchSelection(e.body,e.body.invoiceDocEntry,e.body.invoiceDocNum,r);t.status(200).send(s)}catch(r){console.log("create SalesBatchSelection Controller: "+JSON.stringify(r)),o(r)}},mN=async(e,t,o)=>{try{if(!e.body||!Array.isArray(e.body)||e.body.length===0)throw new Error("Request body cannot be empty and must be an array");let r=await Ya(e),s=await Promise.all(e.body.map(n=>Ka.updateSalesBatchSelection(n,r)));t.status(200).send(s)}catch(r){console.log("Update Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}},yN=async(e,t,o)=>{try{let r=await Ya(e),{docNum:s,itemCodes:n}=e.body;if(!s||!n||!Array.isArray(n)||n.length===0)throw new Error("docNum and itemCodes are required, and itemCodes must be a non-empty array");let a=await Promise.all(n.map(i=>Ka.getSalesBatchSelection(s,i,r)));t.status(200).send(a)}catch(r){console.log("Get Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}};Hy.exports={create:pN,update:mN,get:yN}});var qy=p((DL,Jy)=>{var gN=require("../node_modules/express/index.js"),Xa=Vy(),{portalModules:Za,permissions:ei}=f(),{checkUserPermission:ti}=N(),oi=new gN.Router;oi.route("/").post(ti([Za.INVOICE],ei.CREATE),Xa.create).put(ti(Za.INVOICE,ei.WRITE),Xa.update);oi.route("/get").post(ti([Za.INVOICE],ei.READ),Xa.get);Jy.exports=oi});var zy=p(jy=>{var TN=A(),{dbCreds:Gy}=D();jy.getBomChildren=async e=>{let t=`
    SELECT 
      T0."Code" AS "ParentItem", 
      T0."Code" AS "ItemCode", -- Mapped cleanly to ItemCode for the POS
      T0."Quantity" AS "BomQuantity",
      T1."ItemName",
      T1."InvntryUom",
      T1."ManBtchNum",
      T1."ManSerNum"
    FROM ${Gy.CompanyDB}.ITT1 T0
    INNER JOIN ${Gy.CompanyDB}.OITM T1 ON T0."Code" = T1."ItemCode"
    WHERE T0."Father" = ?
  `;return await TN.executeWithValues(t,[e])}});var Yy=p(Qy=>{var hN=zy();Qy.getChildren=async(e,t,o)=>{try{let r=e.params.father,s=await hN.getBomChildren(r);t.send(s)}catch(r){o(r)}}});var Xy=p((NL,Ky)=>{Ky.exports=e=>{let t=Yy();var o=require("../node_modules/express/index.js").Router();o.get("/children/:father",t.getChildren),e.use("/api/v1/custom/bom",o)}});var tg=p((UL,eg)=>{var Xo=require("../node_modules/express/index.js"),CN=require("http"),fN=require("https"),RL=require("../node_modules/http-proxy/index.js"),SN=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:EN}=D(),DN=require("../node_modules/cookie-parser/index.js"),bL=require("../node_modules/morgan/index.js"),to=require("path"),OL=require("../node_modules/rotating-file-stream/index.js"),Ls=require("cluster"),AN=require("os").cpus().length,IN=ci(),NN=Ci(),RN=Ml(),bN=Ec(),ON=bc(),{sessionValidator:UN}=N(),xN=Bc(),LN=Wc(),wN=zc(),vN=td(),_N=cd(),BN=gd(),PN=Wd(),MN=jd(),FN=Xd(),WN=iu(),$N=uu(),kN=Au(),HN=xu(),VN=Mu(),JN=Vu(),qN=zu(),GN=tp(),jN=lp(),zN=mp(),QN=Sp(),YN=Rp(),KN=Bp(),XN=Vp(),ZN=Xp(),eR=cm(),tR=Cm(),oR=bm(),rR=Lm(),sR=jm(),nR=Zm(),aR=ry(),iR=iy(),lR=Ty(),cR=by(),dR=ky(),uR=qy(),ws,Le="/api/v1/service",I="/api/v1/custom",pR=async()=>{process.env.NODE_ENV==="development"?await Zy():Ls.isMaster?(console.log(`Number of CPUs is ${AN}`),console.log(`Master ${process.pid} is running`),Ls.fork(),Ls.on("exit",(e,t,o)=>{console.log(`worker ${e.process.pid} died`),console.log("Let's fork another worker!"),Ls.fork()})):await Zy()},Zy=()=>new Promise((e,t)=>{let o=Xo(),r=require("fs"),s=process.env.HOST;process.env.NODE_ENV==="development"?(o.use(Xo.static(to.join(__dirname,"../../","build"))),o.get("/",(a,i)=>{i.sendFile(to.join(__dirname,"../../","build","index.html"))})):(o.use(Xo.static(to.join(__dirname,"../../../","UI"))),o.get("/",(a,i)=>{i.sendFile(to.join(__dirname,"../../../","UI","index.html"))}));let n=process.env.API_PORT||2020;if(process.env.HTTPS==="true"){let a={cert:r.readFileSync(to.join(__dirname,"../../",process.env.SSL_CRT_FILE||"certificate/certificate.crt"),"utf8"),key:r.readFileSync(to.join(__dirname,"../../",process.env.SSL_KEY_FILE||"certificate/private-key.pem"),"utf8")};ws=fN.createServer(a,o)}else ws=CN.createServer(o);o.use(IN()),o.use(DN()),o.use(Xo.json({limit:"50mb"})),o.use(Xo.urlencoded({limit:"50mb",extended:!0})),o.use(NN),o.use(UN),o.use(Le,bN),o.use(`${Le}/business-partner`,xN),o.use(`${Le}/invoice`,PN),o.use(`${Le}/sales-quotation`,kN),o.use(`${Le}/credit-memo`,XN),o.use(`${Le}/credit-memo-request`,eR),o.use(`${Le}/inventory-counting`,oR),o.use(`${Le}/item`,MN),o.use(`${Le}/sales-batch-selection`,uR),o.use(`${Le}/delivery`,dR),o.use(I,RN),o.use(`${I}/user/group`,rR),o.use(`${I}/store`,sR),o.use(`${I}/parked-transaction`,nR),o.use(`${I}/user-session-log`,iR),o.use(`${I}/session`,aR),o.use(`${I}/invoice`,_N),o.use(`${I}/firca`,BN),o.use(`${I}/cash-denomination`,LN),o.use(`${I}/credit-card`,wN),o.use(`${I}/voucher`,vN),o.use(`${I}/stock-transfer-request-new`,WN),o.use(`${I}/sales-quotation`,$N),o.use(`${I}/sale-order`,HN),o.use(`${I}/customer`,YN),o.use(`${I}/tax`,VN),o.use(`${I}/sales-employees`,JN),o.use(`${I}/payment-terms`,GN),o.use(`${I}/user`,qN),o.use(`${I}/banks`,jN),o.use(`${I}/locations`,zN),o.use(`${I}/warehouse`,QN),o.use(`${I}/credit-memo`,KN),o.use(`${I}/credit-memo-request`,ZN),o.use(`${I}/inventory-counting`,tR),o.use(`${I}/item-master`,FN),o.use(`${I}/delivery`,cR),o.use(`${I}/qc-item-group`,lR),Xy()(o),o.use(ON),o.get("/ping",(a,i)=>{i.status(200).json({status:"ok",time:new Date().toISOString()})}),o.get("/health",(a,i)=>{let c=SN.createConnection();c.connect(EN,l=>{if(l)return console.error("[HEALTH CHECK] HANA DB connection failed:",l.message),i.status(503).json({status:"error",service:"HANA DB",host:process.env.HANA_HOST,port:process.env.HANA_PORT,message:l.message,time:new Date().toISOString()});c.disconnect(),i.status(200).json({status:"ok",service:"HANA DB",host:process.env.HANA_HOST,port:process.env.HANA_PORT,time:new Date().toISOString()})})}),ws.listen(n,s).on("listening",()=>{console.log(`Web server listening on ${n} (HTTPS: ${process.env.HTTPS==="true"})`),e()}).on("error",a=>{t(a)})}),mR=()=>new Promise((e,t)=>{ws.close(o=>{if(o){t(o);return}e()})});eg.exports={initialize:pR,close:mR}});require("../node_modules/dotenv/lib/main.js").config();var og=tg(),yR=re(),gR=async()=>{try{console.log("Initializing Database"),await yR.dataSource.initialize(),console.log("Database has been initialized by TypeORM!"),console.log("Initializing Web server"),await og.initialize()}catch(e){console.error(e),process.exit(1)}};gR();var ri=async e=>{let t=e;console.log("Shutting down...");try{console.log("Closing Web server"),await og.close()}catch(o){console.log("Encountered error when closing Web server",o),t=t||o}console.log("Exiting process"),t?process.exit(1):process.exit(0)};process.on("SIGTERM",()=>{console.log("Received SIGTERM"),ri()});process.on("SIGINT",()=>{console.log("Received SIGINT"),ri()});process.on("uncaughtException",e=>{console.log("Uncaught exception"),console.error(e),ri(e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled Promise Rejection at:",t,"reason:",e)});
//!@#$%^&*()-+<>
