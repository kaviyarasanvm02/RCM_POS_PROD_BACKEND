var u=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var S=u((GD,Za)=>{var Wy="YYYY-MM-DD",ky=["January","February","March","April","May","June","July","August","September","October","November","December"],Hy="FJD",Jy="\\\\172.18.20.16\\rcmsapshared\\",K={USER:"User",USER_GROUP:"User Group",APPROVAL:"Approval",INVOICE:"Invoice",INCOMING_PAYMENT:"Incoming Payment",JOURNAL_ENTRY:"Journal Entry",CREDIT_MEMO:"Credit Memo",CREDIT_MEMO_REQUEST:"Credit Memo",STORE_SETUP:"Store Setup",STORE_WAREHOUSE:"Store Warehouse",STORE_COUNTER:"Store Counter",STORE_USER:"Store User",SALES_QUOTATION:"Sales Quotation",BUSINESS_PARTNER:"Business Partners",INVOICE:"Invoice",STOCK_TRANSFER_REQUEST:"Stock Transfer Request",STOCK_TRANSFER:"Stock Transfer",INVENTORY_COUNTING:"Inventory Counting",APPROVAL_STATUS_REPORT:"Approval Status Report",SALES_ORDER:"Sales Order",DELIVERY:"Delivery",ITEM:"Item",OSBS:"OSBS",OTSH:"OTSH",ATTACHMENTS:"Attachments2"},qy={[K.INVOICE]:13,[K.CREDIT_MEMO_REQUEST]:234000031,[K.INCOMING_PAYMENT]:24,[K.SALES_ORDER]:17,[K.SALES_QUOTATION]:23,[K.STOCK_TRANSFER_REQUEST]:1250000001},Gy={[K.BUSINESS_PARTNER]:"BusinessPartners",[K.INVOICE]:"Invoices",[K.INCOMING_PAYMENT]:"IncomingPayments",[K.JOURNAL_ENTRY]:"JournalEntries",[K.SALES_QUOTATION]:"Quotations",[K.INVENTORY_COUNTING]:"InventoryCountings",[K.CREDIT_MEMO_REQUEST]:"ReturnRequest",[K.DELIVERY]:"DeliveryNotes",[K.ITEM]:"Items"},jy={STOCK_TRANSFER_REQUEST:1250000001,STOCK_TRANSFER:67,[K.DELIVERY]:15},zy={INCOMING_PAYMENT:"INCOMING_PAYMENT",OUTGOING_PAYMENT:"OUTGOING_PAYMENT",COUNTER_TO_COUNTER:"COUNTER_TO_COUNTER",OPENING_BALANCE:"OPENING_BALANCE",CLOSING_BALANCE:"CLOSING_BALANCE"},Vy=[],Qy={READ:"U_AllowRead",WRITE:"U_AllowWrite",CREATE:"U_AllowCreate",CANCEL:"U_AllowCancel"},Yy={ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER",TEMPLATE:"TEMPLATE",ADMIN:"ADMIN"},Ky={PENDING:"PENDING",APPROVED:"APPROVED",GENERATED:"GENERATED",REJECTED:"REJECTED",FAILED:"FAILED",NOT_REQUIRED:"NOT_REQUIRED",NOT_ASSIGNED:"NOT_ASSIGNED",AUTO_APPROVED:"AUTO_APPROVED"},Xy={ACTIVE:"ACTIVE",INACTIVE:"INACTIVE"},Zy={DIRECT:"direct",DRAFT:"draft"},eg={BATCHES:"Batches",SERIAL_NUMBERS:"Serial Numbers",NORMAL:"Normal",LABOR:"Labor"},tg={ITEM_WITHOUT_QRCODE:"ITEM_WITHOUT_QRCODE",BATCH_SERIAL_WITH_ALL_BINS:"BATCH_SERIAL_WITH_ALL_BINS",BATCH_SERIAL_IN_A_BIN:"BATCH_SERIAL_IN_A_BIN"},Xa={REDIS:"REDIS",FILE:"FILE"},og=17,rg=Xa.FILE,sg="ONE",ng="kiafn239df#@asdf$%^13423#$%@sdfgdf",ag={OK:200,CREATED:201,ACCEPTED:202,NO_CONTENT:204,BAD_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404,INTERNAL_SERVER_ERROR:500,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503};Za.exports={enableLocationBasedCreditCardAccount:!0,dateFormat:Wy,months:ky,saltRounds:10,systemCurrency:Hy,defaultBranchId:1,portalModules:K,serviceLayerApiURIs:Gy,trxTypes:zy,draftObjectCodes:jy,permissions:Qy,userRoles:Yy,draftStatus:Ky,recordState:Xy,recordTypes:Zy,itemTypes:eg,requestTypes:tg,sessionStoreTypes:Xa,sessionStore:rg,cookieName:sg,sessionSecret:ng,sessionMaxAgeInHours:og,httpStatusCodes:ag,fircaIntegrationWaitTime:1e4,enableFircaIntegration:!0,enableStoreBasedNumbering:!0,isHomeDeliveryEnabled:!0,objectCodes:qy,attachmentPath:Jy,EXCLUDED_ITEM_GROUPS:Vy}});var D=u((VD,ei)=>{var{draftObjectCodes:jD,draftStatus:xs,recordState:zD}=S(),ig=30,m={CompanyDB:process.env.SERVICE_LAYER_COMPANYDB,UserName:process.env.SERVICE_LAYER_USERNAME,Password:process.env.SERVICE_LAYER_PASSWORD},lg={serverNode:`${process.env.HANA_HOST}:${process.env.HANA_PORT}`,host:process.env.HANA_HOST,port:process.env.HANA_PORT,user:process.env.HANA_USER,password:process.env.HANA_PASSWORD,pooling:process.env.HANA_POOLING==="true",maxPoolSize:process.env.HANA_MAX_POOL_SIZE,connectionLifetime:process.env.HANA_CONNECTION_LIFE_TIME},cg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."Fax", T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked",
    T0."U_TempPasswordFlag", T0."U_PortalUser", T0."U_PortalPassword" as "Password", T0."SalesDisc"
  FROM ${m.CompanyDB}.OUSR T0
  WHERE UPPER(T0."USER_CODE") = UPPER(?)`,dg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
WHERE T0."U_PortalUser" = 'Y'
  AND UPPER(T0."USER_CODE") = UPPER(?)
  AND UPPER(T0."E_Mail") = UPPER(?)`,ug=`SELECT T0."U_NAME" as "UserName", T0."E_Mail" "Email" FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."INTERNAL_K" = ?`,pg=`SELECT DISTINCT T0."INTERNAL_K" "U_UserId", T0."U_NAME" as "UserName"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND  T1."U_GroupName" LIKE `,mg=`SELECT DISTINCT T1."U_GroupName", T1."U_GroupId"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T0."INTERNAL_K" = ?`,yg=`SELECT T3."U_ModuleName", T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
  ORDER BY T3."U_ModuleName" ASC`,gg=`SELECT T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
    AND T3."U_ModuleName" IN `,Tg=`SELECT F."ExpnsCode" "FreightCode", F."ExpnsName" "FreightName"
  FROM ${m.CompanyDB}.OEXD F`,hg=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${m.CompanyDB}."OPOR" T0, ${m.CompanyDB}."POR3" T1, ${m.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `,Cg=`SELECT T1."BPLId", T1."BPLName" FROM ${m.CompanyDB}.OBPL T1`,Sg=`SELECT "WhsCode" FROM ${m.CompanyDB}.OWHS WHERE "U_PICKLIST"='Y'`,fg=`SELECT T1."BPLId", T2."BPLName", T1."AcsDsbldBP"
    FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}.USR6 T1, ${m.CompanyDB}.OBPL T2
  WHERE T0."USER_CODE" = T1."UserCode"
    AND T1."BPLId" = T2."BPLId"
    AND T2."Disabled" != 'Y'
    AND T0."INTERNAL_K" = ?`,Ag=`SELECT T0."ItemCode", T0."ItemName", T0."InvntryUom" FROM ${m.CompanyDB}.OITM T0
    WHERE `,Eg=`SELECT 
  T0."ItemCode", 
  T0."WhsCode", 
  T0."OnHand", 
  T2."SalUnitMsr" AS "SalesUOM"
FROM 
  ${m.CompanyDB}.OITW T0
JOIN ${m.CompanyDB}.OWHS T1 ON T0."WhsCode" = T1."WhsCode"
JOIN ${m.CompanyDB}.OITM T2 ON T0."ItemCode" = T2."ItemCode"`,Ng=`SELECT A."ItemCode", A."ItemName", A."CodeBars", A."FrgnName", C."WhsCode", D."BinCode", D."AbsEntry" "BinAbsEntry", C."OnHandQty",
    A."ManBtchNum", A."ManSerNum", A."InvntItem", A."TreeType",
    (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
      WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"=?) AS "Price"
  FROM ${m.CompanyDB}.OITM A, ${m.CompanyDB}.OIBQ C, ${m.CompanyDB}.OBIN D
WHERE A."ItemCode"=C."ItemCode"
  AND D."AbsEntry"=C."BinAbs"
  AND C."OnHandQty">0`,Ig=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."ListNum" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."ListNum") AS "PriceListName",
      A."U_FCCC" AS "FCCCItem",
      A."SalUnitMsr" as "SalesUOM", A."TreeType",
      (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."ListNum") AS "Price"
    FROM 
      ${m.CompanyDB}.OITM A
      LEFT JOIN ${m.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${m.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${m.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${m.CompanyDB}.OCRD O ON O."CardCode" = ?
      LEFT JOIN ${m.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,Dg=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."U_PrcList" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."U_PrcList") AS "PriceListName",
    A."U_FCCC" AS "FCCCItem",
    A."SalUnitMsr" as "SalesUOM", A."TreeType",
      (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
        WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"= O."U_PrcList") AS "Price",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${m.CompanyDB}.SPP1 P 
          WHERE P."ItemCode" = A."ItemCode"
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode"= ? OR P."CardCode" = '*1')) 
            THEN 'Y'
    ELSE 'N'
      END AS "DiscApplied"
    FROM 
      ${m.CompanyDB}.OITM A
      LEFT JOIN ${m.CompanyDB}.OITW B on A."ItemCode"=B."ItemCode" 
      LEFT JOIN ${m.CompanyDB}.OIBQ C ON A."ItemCode"=C."ItemCode" and C."WhsCode"=B."WhsCode"   
      LEFT JOIN ${m.CompanyDB}.OBIN D ON D."AbsEntry" = C."BinAbs" 
      LEFT JOIN ${m.CompanyDB}.OBPL O ON O."BPLId" = ?
      LEFT JOIN ${m.CompanyDB}.OBCD F ON A."ItemCode" = F."ItemCode" 
  WHERE 
  1=1`,bg=`SELECT T0."AbsEntry", T0."BinCode"
  FROM ${m.CompanyDB}."OBIN" T0`,Rg=`SELECT IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry"
  FROM ${m.CompanyDB}.OBIN D
    LEFT JOIN ${m.CompanyDB}.OIBQ C ON D."AbsEntry" = C."BinAbs"
  WhERE C."WhsCode" = ? AND C."ItemCode" = ?`,Og=`SELECT DISTINCT T0."ItemCode", T0."BatchNum", T0."IntrSerial", T2."WhsCode", T2."BinCode",
T2."AbsEntry" "BinAbsEntry", T0."Quantity", T0."InDate"
  FROM ${m.CompanyDB}."OIBT" T0, ${m.CompanyDB}."OIBQ" T1, ${m.CompanyDB}."OBIN" T2
WHERE T0."ItemCode"=T1."ItemCode" 
  AND T0."WhsCode"=T2."WhsCode"
  AND T1."BinAbs"=T2."AbsEntry"
  AND T0."Quantity" > 0
  AND T1."OnHandQty" > 0`,Ug=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "BatchNumberProperty",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OBBQ A
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode"
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,xg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "InternalSerialNumber",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,Lg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "BatchNumberProperty",A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OBBQ A 
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,wg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "InternalSerialNumber",A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,Bg=`SELECT DISTINCT T0."NumAtCard" as "VendorRefNo"
    FROM ${m.CompanyDB}.OPDN T0
  WHERE T0."NumAtCard" IS NOT NULL
    AND T0."CANCELED" NOT IN ('Y','C')
    AND T0."NumAtCard"=`,vg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."U_PortalGroupId", T1."U_GroupName", T0."U_PortalUser", 
    T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALUSERGROUPS" T1
    ON T0."U_PortalGroupId" = T1."U_GroupId"
  WHERE T0."U_PortalUser" = ?
    AND T0."U_NAME" IS NOT NULL
  ORDER BY T0."U_PortalUser" DESC, T0."U_NAME" ASC`,_g=`SELECT T0."U_GroupId", T0."U_GroupName", T1."U_PermissionId", T1."U_ModuleId", T2."U_ModuleName", 
    T1."U_AllowRead", T1."U_AllowWrite", T1."U_AllowCancel", T1."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALPERMISSIONS" T1 ON T0."U_GroupId" = T1."U_GroupId"
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALMODULES" T2 ON T1."U_ModuleId" = T2."U_ModuleId"
  WHERE T0."U_GroupName" IS NOT NULL
    ORDER BY T2."U_ModuleName" ASC, T0."U_GroupName" ASC`,Pg=`SELECT T0."U_PermissionId", T0."U_GroupId", T0."U_ModuleId", T1."U_ModuleName", T0."U_AllowRead", T0."U_AllowWrite", 
    T0."U_AllowCancel", T0."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALPERMISSIONS" T0, ${m.CompanyDB}."@PORTALMODULES" T1
  WHERE T0."U_ModuleId" = T1."U_ModuleId"
    AND T0."U_GroupId" = `,Mg=`SELECT T0."U_NAME" as "UserName", T0."U_PortalGroupId" FROM ${m.CompanyDB}.OUSR T0
    WHERE T0."U_PortalGroupId"=`,Fg=`SELECT T0."U_ModuleId", T0."U_ModuleName" FROM ${m.CompanyDB}."@PORTALMODULES" T0
    ORDER BY T0."U_ModuleName"`,$g=`SELECT T0."U_GroupId", T0."U_GroupName" FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    ORDER BY T0."U_GroupName"`,Wg=`SELECT T0."INTERNAL_K" as "U_UserId", T0."U_NAME" as "UserName"
    FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."U_PortalUser"='Y'
    ORDER BY T0."U_NAME"`,kg=`INSERT INTO ${m.CompanyDB}."@PORTALUSERGROUPS" ("Code", "Name", "U_GroupName", "U_GroupId")
    VALUES (?, ?, ?, ?)`,Hg=`INSERT INTO ${m.CompanyDB}."@PORTALPERMISSIONS" ("Code", "Name", "U_GroupId", "U_ModuleId",
    "U_AllowRead", "U_AllowWrite", "U_AllowCancel", "U_AllowCreate", "U_PermissionId")
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,Jg=`UPDATE ${m.CompanyDB}."@PORTALUSERGROUPS"
    SET "Code"=?, "Name"=?, "U_GroupName"=?
  WHERE "U_GroupId"=?`,qg=`UPDATE ${m.CompanyDB}.OUSR
    SET "U_PortalPassword"=?, "U_TempPasswordFlag"=?
  WHERE "INTERNAL_K"=?`,Gg=`UPDATE ${m.CompanyDB}."@PORTALPERMISSIONS"
    SET "Code"=?, "Name"=?, "U_GroupId"=?, "U_ModuleId"=?,
    "U_AllowRead"=?, "U_AllowWrite"=?, "U_AllowCancel"=?, "U_AllowCreate"=?
  WHERE "U_PermissionId"=?`,jg=`DELETE FROM ${m.CompanyDB}."@PORTALUSERGROUPS" WHERE "U_GroupId" = `,zg=`DELETE FROM ${m.CompanyDB}."@PORTALPERMISSIONS" WHERE "U_GroupId" = `,Vg=`SELECT T0."DocEntry", T0."U_Name", T0."U_Description", T0."U_DocumentName", T0."U_Terms", 
    T0."U_NoOfApprovals", T0."U_MultiLevelApproval", T0."U_Active"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0`,Qg=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0`,Yg=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId", T0."U_ApprovalLevel"
    FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0`,Kg=`SELECT T0."DocEntry" FROM ${m.CompanyDB}."@APPROVALHEADER" T0
    ORDER BY T0."DocEntry" ASC`,Xg=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,Zg=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,e0=`INSERT INTO ${m.CompanyDB}."@APPROVALHEADER" ("U_Name", "U_Description", "U_DocumentName", "U_Terms",
    "U_NoOfApprovals", "U_MultiLevelApproval", "U_Active", "DocEntry") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,t0=`INSERT INTO ${m.CompanyDB}."@APPROVALORIGINATOR" ("U_UserId", "DocEntry", "LineId") VALUES (?, ?, ?)`,o0=`INSERT INTO ${m.CompanyDB}."@APPROVALAPPROVER" ("U_UserId", "U_ApprovalLevel", "DocEntry", "LineId") VALUES (?, ?, ?, ?)`,r0=`UPDATE ${m.CompanyDB}."@APPROVALHEADER" SET "U_Name"=?, "U_Description"=?, "U_DocumentName"=?,
    "U_Terms"=?, "U_NoOfApprovals"=?, "U_MultiLevelApproval"=?, "U_Active"=? WHERE "DocEntry" = ?`,s0=`UPDATE ${m.CompanyDB}."@APPROVALORIGINATOR" SET "U_UserId"=? WHERE "DocEntry"=? AND "LineId"=?`,n0=`UPDATE ${m.CompanyDB}."@APPROVALAPPROVER" SET "U_UserId"=?, "U_ApprovalLevel"=? WHERE "DocEntry"=? AND "LineId"=?`,a0=`DELETE FROM ${m.CompanyDB}."@APPROVALHEADER" WHERE "DocEntry"=?`,i0=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry" = ?`,l0=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry" = ?`,c0=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry"=? AND "LineId"=?`,d0=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry"=? AND "LineId"=?`,u0=`SELECT T0."U_MultiLevelApproval", T0."U_NoOfApprovals",
  T2."U_UserId" "ApproverId", T2."U_ApprovalLevel", T3."U_NAME" as "UserName", T3."E_Mail" "Email"
    FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALORIGINATOR" T1,
    ${m.CompanyDB}."@APPROVALAPPROVER" T2, ${m.CompanyDB}.OUSR T3,
    ${m.CompanyDB}."@PORTALMODULES" T4
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T0."DocEntry" = T2."DocEntry"
    AND T0."U_Active" = 'Y'
    AND T2."U_UserId" = T3."INTERNAL_K"
    AND T1."U_UserId" = ?
    AND T4."U_ModuleId" = T0."U_DocumentName"
    AND T4."U_ModuleName" = ?`,p0=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
  T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
  WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
AND T0."U_DocEntry" IN `,m0=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_DraftStatus" = ?`,y0=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
   FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,g0=`SELECT T0."DocDate"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."DocEntry" = ?`,T0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS"
  SET "U_DraftStatus" = ?
WHERE "U_DocEntry" = ?
  AND "U_ApprovalLevel" = ?`,h0=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_ApprovalLevel" = ?`,C0=`INSERT INTO ${m.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", "U_DraftStatus",
  "U_ApproverId", "U_ApprovalLevel") VALUES (?, ?, ?, ?, ?, ?)`,S0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
  "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
WHERE "U_ApprovalStatusId" = ?`,f0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
    WHERE "U_DraftStatus" IN ('${xs.PENDING}', '${xs.NOT_ASSIGNED}')
  AND "U_DocEntry" = ?`,A0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
     WHERE "U_DocEntry" = ?`,E0=`SELECT T0."U_NoOfApprovals", T0."U_MultiLevelApproval"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."ObjType" = ?
    AND T0."DocEntry" = ?`,N0=`UPDATE ${m.CompanyDB}.ODRF T0 SET T0."U_TargetRecDocNum" = ?
  WHERE T0."DocEntry" = ?`,I0=`SELECT T0."U_DocEntry", T0."U_RejectedReason" FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
    WHERE T0."U_DraftStatus" = '${xs.REJECTED}'
  AND T0."U_DocEntry" IN `,D0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALAPPROVER" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,b0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALORIGINATOR" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,R0=`SELECT T1."U_DocEntry", T1."U_DraftStatus", T0."U_DraftStatus" "ActualStatus", T0."U_OriginatorId"
  FROM ${m.CompanyDB}.ODRF T0, ${m.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
  AND T1."U_ApproverId" = ?
  AND T0."ObjType" = ?
  AND T0."CreateDate" > TO_DATE('01/03/20', 'MM/DD/YY')`,O0=`SELECT T0."DocEntry", T0."U_DraftStatus"
  FROM ${m.CompanyDB}.ODRF T0
WHERE T0."U_OriginatorId" = ?
  AND T0."ObjType" = ?`;ei.exports={dbCreds:m,serviceLayerSessionMaxAge:ig,dbConfig:lg,validateUserLogin:cg,validateUserEmail:dg,getUserPermissionsForAllModules:yg,checkUserPermission:gg,allFreightInfo:Tg,freightInfoForPO:hg,branch:Cg,userBranches:fg,itemsList:Ag,itemQuantityInWarehouse:Eg,picklistWarehouses:Sg,binsAndItemQuantityInWarehouse:Ng,binsAndItemQuantityInWarehouseWithPrice:Ig,binsAndItemQuantityInWarehouseWithPriceList:Dg,binsList:bg,selectInfoFromBatchSerialNo:Og,batchForItemAndWH:Ug,serialForItemAndWH:xg,getAllBinsForBatch:Lg,getAllBinsForSerial:wg,vendorRefNoQuery:Bg,portalModules:Fg,portalUserGroups:$g,updatePortalPassword:qg,portalUsers:Wg,allUsers:vg,userGroupsWithPermissions:_g,userPermissionsForGivenGroup:Pg,usersInGivenGroup:Mg,insertUserGroup:kg,insertPermissions:Hg,updateUserGroup:Jg,updatePermissions:Gg,deleteUserGroup:jg,deletePermissions:zg,selectApprovalHeader:Vg,selectApprovalOriginator:Qg,selectApprovalApprover:Yg,allHeaderIds:Kg,allApproverIds:Zg,allOriginatorIds:Xg,insertApprovalHeader:e0,insertApprovalOriginator:t0,insertApprovalApprover:o0,updateApprovalHeader:r0,updateApprovalOriginator:s0,updateApprovalApprover:n0,deleteApprovalTemplate1:a0,deleteApprovalTemplate2:i0,deleteApprovalTemplate3:l0,deleteApprovalOriginator:c0,deleteApprovalApprover:d0,selectApproverForOriginator:u0,selectUserInfo:ug,selectUsersInUserGroup:pg,selectUserGroupInUser:mg,updateDraftTargetRecDocNum:N0,selectRejectedReason:I0,selectNoOfApprovalsForDraft:E0,selectDraftApproversList:p0,insertDraftApproversList:C0,updateDraftApproversList:S0,updateApprovalStatus:f0,updateApprovalStatusRecState:A0,selectDraftApprovalStatusCount:m0,updateDraftNextApprovalLevel:T0,selectDraftNextApproverDetails:h0,selectDraftApprovalDate:y0,selectDraftCreationDate:g0,selectApproverCount:D0,selectOriginatorCount:b0,selectDraftsForApprover:R0,selectDraftsForOriginator:O0,binsListForItem:Rg}});var oi=u((QD,ti)=>{var U0=require("../node_modules/cors/lib/index.js"),x0=()=>{let e=[process.env.REACT_APP_URL];console.log("whitelist: "+JSON.stringify(e));let t={credentials:!0,allowedHeaders:["Content-Type","Authorization"],origin:(o,r)=>{process.env.NODE_ENV==="development"||e.indexOf(o)!==-1||!o?r(null,!0):r(new Error("Not allowed by CORS"))}};return console.log("corsOptions: ",t),U0(t)};ti.exports=x0});var si=u((YD,ri)=>{var L0=require("../node_modules/redis/dist/index.js"),oo=L0.createClient({host:"localhost",port:6379});oo.on("connect",function(e){console.log("Connected to redis successfully")});oo.on("error",e=>{console.error("Redis connection error:",e)});var w0=(e,t)=>{oo.set(e,t,o=>{o?console.error("Error setting value in Redis:",o):console.log("Value set in Redis:",e,t)})},B0=(e,t)=>{oo.get(e,(o,r)=>{o?(console.error("Error getting value from Redis:",o),t(o,null)):(console.log("Value retrieved from Redis:",e,r),t(null,r))})};ri.exports={redisClient:oo,setValue:w0,getValue:B0}});var di=u((KD,ci)=>{var Ls=require("../node_modules/express-session/index.js"),v0=require("../node_modules/connect-redis/dist/cjs/index.js"),_0=require("../node_modules/session-file-store/index.js"),{sessionStoreTypes:ni,sessionStore:ai,cookieName:P0,sessionSecret:M0,sessionMaxAgeInHours:li}=S(),{redisClient:F0}=si(),ws="";if(ai===ni.REDIS){let e=v0(Ls);ws=new e({client:F0})}else if(ai===ni.FILE){let e=_0(Ls);ws=new e({ttl:60*60*parseInt(li),retries:10,factor:1,minTimeout:100,maxTimeout:500,reapInterval:3600,logFn:t=>{t&&t.toLowerCase().includes("error")&&console.error("[SESSION STORE ERROR]",t)}})}var ii=process.env.HTTPS==="true",$0=Ls({store:ws,name:P0,secret:M0,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{secure:ii,sameSite:ii?"none":"lax",httpOnly:!0,maxAge:1e3*60*60*parseInt(li)}});ci.exports=$0});var b=u((XD,ui)=>{var Bs=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:vs}=D(),W0=(e,t)=>{let o=Bs.createConnection();o.connect(vs,async r=>{r&&(console.error(r),t(r,null)),o.exec(e,(s,n)=>{s&&(console.error(s),t(s,null)),t(null,n),o.disconnect(a=>{a&&console.error(a)})})})},k0=(e,t=[])=>{Array.isArray(t)||(t=[t]);let o;try{return o=Bs.createConnection(),o.connect(vs),o.exec(e,t)}catch(r){if(r&&r.message&&r.message.includes("rc=10060")){let s=new Error(`\u{1F534} HANA DB SERVER UNREACHABLE: Cannot connect to ${process.env.HANA_HOST}:${process.env.HANA_PORT}. Original: ${r.message}`);throw s.isHanaDown=!0,console.error("executeWithValues: HANA DB is DOWN - "+JSON.stringify(r)),s}throw console.error("executeWithValues: "+JSON.stringify(r)),r}finally{if(o)try{o.disconnect()}catch{}}},H0=(e,t)=>{if(!t.length)return 0;let o;try{return o=Bs.createConnection(),o.connect(vs),o.prepare(e).execBatch(t)}catch(r){throw console.error("executeBatchInsertUpdate: "+JSON.stringify(r)),r}finally{if(o)try{o.disconnect()}catch{}}};ui.exports={executeQuery:W0,executeWithValues:k0,executeBatchInsertUpdate:H0}});var _s=u((eb,mi)=>{var{dbCreds:ve}=D(),{draftObjectCodes:pi,recordState:ZD}=S(),J0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName"
    FROM ${ve.CompanyDB}.ODRF T0, ${ve.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${pi.STOCK_TRANSFER_REQUEST}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,q0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode"
  FROM ${ve.CompanyDB}.ODRF T0, ${ve.CompanyDB}.OUSR TOR, ${ve.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${pi.STOCK_TRANSFER_REQUEST}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,G0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${ve.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,j0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
  T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
  T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
    FROM ${ve.CompanyDB}.OWTQ T0
  LEFT OUTER JOIN ${ve.CompanyDB}.OUSR TOR ON T0."U_OriginatorId" = TOR."INTERNAL_K"
  WHERE T0."DocStatus" = 'O'`,z0=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation", T1."U_FromBinLoc"
 FROM ${ve.CompanyDB}.WTQ1 T1
   WHERE T1."DocEntry" IN `;mi.exports={selectStockTransRequestDrafts:J0,selectStockTransRequestDraftsWithMultiApprover:q0,selectApprovedSTR:j0,selectItemDetailsForSTRDrafts:G0,selectItemDetailsForSTRs:z0}});var Ps=u((tb,gi)=>{var{dbCreds:be}=D(),{draftObjectCodes:yi}=S(),V0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."U_TargetRecDocNum",
  T0."U_ToBinLocation", T0."BPLName"
    FROM ${be.CompanyDB}.ODRF T0, ${be.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${yi.STOCK_TRANSFER}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,Q0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName"
  FROM ${be.CompanyDB}.ODRF T0, ${be.CompanyDB}.OUSR TOR, ${be.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${yi.STOCK_TRANSFER}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,Y0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", TRW."unitMsr" AS "InvntryUom",
  TRW."WhsCode", TRW."FromWhsCod" as "FromWarehouse", "U_FromBinLoc", TRW."U_ToBinLocation"
FROM ${be.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,K0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
 T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
 T0."U_ToBinLocation", T0."BPLName"
    FROM ${be.CompanyDB}.OWTR T0, ${be.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."U_DraftStatus" = 'AUTO_APPROVED'`,X0=`SELECT T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
 FROM ${be.CompanyDB}.WTR1 T1
   WHERE T1."DocEntry" IN `,Z0=`SELECT T0."DocEntry", T0."DocNum"
   FROM ${be.CompanyDB}.OWTR T0
 WHERE T0."DocNum" = ?`;gi.exports={selectStockTransDrafts:V0,selectStockTransDraftsWithMultiApprover:Q0,selectApprovedSTs:K0,selectItemDetailsForSTDrafts:Y0,selectItemDetailsForSTs:X0,selectSTDocEntry:Z0}});var Ms=u((ob,hi)=>{var ro=b(),eT=D(),Nt=_s(),{userRoles:Et,draftStatus:tT}=S(),Ti=' ORDER BY T0."DocEntry" ASC',oT=(e,t)=>{console.log("*** getTransferRequestRecords - req.query: "+JSON.stringify(e.query)),console.log("*** getTransferRequestRecords - req.params: "+JSON.stringify(e.params));let o=[],r=[],s=[],n=[],a=[],l=[],{userId:d}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let i;e.params.recordType==="direct"?i=Nt.selectItemDetailsForSTRs:e.params.recordType==="draft"&&(i=Nt.selectItemDetailsForSTRDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=ro.executeWithValues(i+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&d){let i,c="";if(e.query.userRole==Et.APPROVER?i=Nt.selectStockTransRequestDraftsWithMultiApprover:e.query.userRole==Et.ORIGINATOR&&(i=Nt.selectStockTransRequestDrafts,c=` AND T0."U_OriginatorId" = ? ${Ti}`,l=Xo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+c,[d])),e.query.userRole==Et.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                        AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,y=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',y.push(e.query.status)),l=Xo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+p,y),p=p+Ti,o=ro.executeWithValues(Nt.selectStockTransRequestDrafts+p,y)}else o=ro.executeWithValues(i+c,[d]);Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length&&(e.query.userRole==Et.ORIGINATOR||e.query.userRole==Et.ADMIN||e.query.userRole==Et.APPROVER)&&(s=ro.executeWithValues(eT.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),Array.isArray(s)&&s.length&&o.forEach(p=>{n=[],s.forEach(y=>{p.DocEntry==y.U_DocEntry&&n.push(y)}),p.approvers=n}))),t.send([...o,...l])}else e.query.requestStatus===tT.APPROVED&&(console.log("***** getApprovedSTRRecords"),l=Xo(),t.send(l))}catch(i){console.log("getTransferRequestRecords - controller - error: "+JSON.stringify(i)),t.status(500).send({message:i.message})}},Xo=(e="",t=[])=>{let o=[];try{return o=ro.executeWithValues(Nt.selectApprovedSTR+e,t),o}catch(r){throw r}};hi.exports={getTransferRequestRecords:oT,getApprovedSTRRecords:Xo}});var Si=u((rb,Ci)=>{var rT=require("../node_modules/nodemailer/lib/nodemailer.js"),sT=rT.createTransport({host:process.env.SMTP_SERVER,port:25,secure:!1,auth:{user:process.env.SMTP_USERNAME,pass:process.env.SMTP_PASSWORD},tls:{rejectUnauthorized:!1}});Ci.exports={transporter:sT}});var Re=u((sb,Ai)=>{var fi=require("path"),{transporter:nT}=Si(),aT=async(e,t,o)=>{let r={from:process.env.SMTP_USERNAME,to:e,subject:t,html:o,attachments:[{filename:"logo.png",path:fi.join(__dirname,"../assets/img/client-logo.png"),cid:"client_logo_pic"},{filename:"n-app-logo.png",path:fi.join(__dirname,"../assets/img/n-app-logo.png"),cid:"app_logo_pic"}]};console.log("__dirname: "+__dirname);try{console.log("Sending mail....");let s=await nT.sendMail(r);return console.log("Email sent: "+s.response),!0}catch(s){return console.log("sendMail: "+JSON.stringify(s)),!1}};Ai.exports={sendMail:aT}});var $s=u((lb,Ni)=>{var Dt=b(),iT=D(),tt=Ps(),{sendMail:nb}=Re(),{userRoles:It,portalModules:ab,draftStatus:ib}=S(),Ei=' ORDER BY T0."DocEntry" ASC',lT=(e,t)=>{console.log("### getTransferRecords - req.query: "+JSON.stringify(e.query));let o=[],r=[],s=[],n=[],a=[],l=[],{userId:d}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let i;e.params.recordType==="direct"?i=tt.selectItemDetailsForSTs:e.params.recordType==="draft"&&(i=tt.selectItemDetailsForSTDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=Dt.executeWithValues(i+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&d){let i,c="";if(e.query.userRole==It.APPROVER?i=tt.selectStockTransDraftsWithMultiApprover:e.query.userRole==It.ORIGINATOR&&(i=tt.selectStockTransDrafts,c=` AND T0."U_OriginatorId" = ? ${Ei}`,l=Fs(c,[d])),e.query.userRole==It.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                      AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,y=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',y.push(e.query.status)),p=p+Ei,o=Dt.executeWithValues(tt.selectStockTransDrafts+p,y),l=Fs(p,y)}else o=Dt.executeWithValues(i+c,[d]);if(Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length)){(e.query.userRole==It.ORIGINATOR||e.query.userRole==It.ADMIN||e.query.userRole==It.APPROVER)&&(s=Dt.executeWithValues(iT.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),console.log("allApprovers: "+JSON.stringify(s)),Array.isArray(s)&&s.length&&o.forEach(y=>{n=[],s.forEach(g=>{y.DocEntry==g.U_DocEntry&&n.push(g)}),y.approvers=n}));let p=Dt.executeWithValues(tt.selectItemDetailsForSTDrafts+`(${r})`);if(Array.isArray(p)&&p.length){let y;o.forEach(g=>{a=[],p.forEach(E=>{g.DocEntry===E.DocEntry&&a.push(E),y||(y=E.FromWhsCod)}),g.itemList=a,g.FromWhsCod=y})}}t.send([...o,...l])}}catch(i){console.log("getTransferRecords - controller - error: "+JSON.stringify(i)),t.status(500).send({message})}},Fs=(e="",t=[])=>{let o=[0],r=[],s=[];try{return s=Dt.executeWithValues(tt.selectApprovedSTs+e,t),console.log("reqsCreatedByApprover: "+JSON.stringify(s)),s}catch(n){throw n}};Ni.exports={getTransferRecords:lT,getApprovedSTRecords:Fs}});var bi=u((cb,Di)=>{var{dbCreds:Ii}=D(),cT=`UPDATE ${Ii.CompanyDB}.OBTN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`,dT=`UPDATE ${Ii.CompanyDB}.OSRN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`;Di.exports={updateReservedCustForBatch:cT,updateReservedCustForSerial:dT}});var Oi=u((db,Ri)=>{var{dbCreds:z}=D(),uT=`SELECT T0."ItemCode", T0."DistNumber" As "U_Batch", T0."U_Width" As "U_Width", T0."U_Height" As "U_Height", 
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
  FROM ${z.CompanyDB}.OBTN T0
    INNER JOIN ${z.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${z.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${z.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
  WHERE 1=1`,pT=`SELECT DISTINCT T0."ItemCode", T0."DistNumber" AS "U_Batch", T0."U_Width" As "U_Width", 
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
    FROM ${z.CompanyDB}.OBTN T0
      LEFT JOIN ${z.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${z.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${z.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,mT=`SELECT DISTINCT T0."ItemCode", '' AS "U_Batch", T0."U_Width" As "U_Width", 
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
    FROM ${z.CompanyDB}.OBTN T0
      LEFT JOIN ${z.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${z.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${z.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,yT=`SELECT T0."ItemCode",
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
      FROM ${z.CompanyDB}."OBTN" T0
      LEFT JOIN ${z.CompanyDB}."OBTQ" T1
        ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
      LEFT JOIN ${z.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${z.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
      WHERE 1=1`,gT=`SELECT DISTINCT T0."ItemCode",
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
    FROM ${z.CompanyDB}."OBTN" T0
    LEFT JOIN ${z.CompanyDB}."OBTQ" T1
      ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
    WHERE 1=1`,TT=`SELECT 1
      FROM ${z.CompanyDB}."OBTN" S0
    INNER JOIN ${z.CompanyDB}."OBTQ" S1
      ON S0."SysNumber"=S1."SysNumber" AND S0."ItemCode"=S1."ItemCode"
      WHERE S0."U_Width"  = T0."U_Width"
        AND S0."U_Height" = T0."U_Height"
        AND S0."U_Length" = T0."U_Length"`;Ri.exports={selectTimYardItemInfo:uT,selectTimYardItemInitialInfo1:pT,selectTimYardItemInitialInfo2:mT,selectTimyardItemInitialInfo3:yT,selectTimyardItemInitialInfo4:gT,selectTimYardItemExistsCheck:TT}});var q=u((ub,Li)=>{var Ui=["January","February","March","April","May","June","July","August","September","October","November","December"],xi=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],hT=async e=>{let t=require("dns"),o=e.connection.remoteAddress;return o==="127.0.0.1"||o==="::1"?"localhost":new Promise((r,s)=>{t.reverse(o,(n,a)=>{if(n)console.error(n),r(o);else{let l=a[0]||o;r(l)}})})},CT=(e,t)=>{try{let o=e.getTime(),r=t.getTime();return Math.abs(o-r)/(1e3*60)}catch(o){return console.log(o),0}},ST=(e,t)=>{e=new Date(e);let o="NA";if(e!="Invalid Date"){let r=e.getDate().toString().padStart(2,"0"),s=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getFullYear(),a=e.toLocaleString("default",{month:"short"});if(t.includes("MMMM D, YYYY")?o=`${Ui[e.getMonth()]} ${e.getDate()}, ${n}`:t.includes("MMM D, YYYY")?o=`${Ui[e.getMonth()].substr(0,3)} ${e.getDate()}, ${n}`:t.includes("YYYY-MM-DD")?o=n+"-"+s+"-"+r:t.includes("YYYY/MM/DD")?o=n+"/"+s+"/"+r:t==="DD/MM/YYYY"?o=r+"/"+s+"/"+n:t==="DD/MM/YY"?o=r+"/"+s+"/"+n.toString().substr(-2):t==="DDMMM"?o=r+a:["DDMM","ddmm"].includes(t)&&(o=r+s),t.includes("hh:mm")){let l=parseInt(e.getHours(),10);console.log("hour: "+l);let d="AM";l>12?(l-=12,d="PM"):l===0&&(l=12),o=`${o} ${l}:${e.getMinutes().toString().padStart(2,"0")} ${d}`}else t.includes("HH24:MI:SS.FF2")?o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}.00`:t.includes("HH24:MI:SS")&&(o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`)}return o},fT=e=>{let t=new Date(e);return t instanceof Date&&!isNaN(t)},AT=()=>{let e=new Date().getTime(),t=Math.floor(Math.random()*Math.pow(10,15)),o=Math.floor(Math.random()*Math.pow(10,15));console.log("random1: "+t+" random2: "+o+" millisec: "+e);let r=(e+t+o).toString();return r.slice(r.length-9)},ET=(e,t,o,r,s,n)=>{let a=month=dow="*";if(console.log(`cycle: ${e}, dayOfWeek: ${t}, dayOfMonth: ${o}, hour: ${r}, minute: ${s}, amPm: ${n}`),r=parseInt(r),n==="PM"&&r<12?r+=12:n==="AM"&&r===12&&(r=0),e==="Weekly")for(let l=0;l<xi.length;l++)xi[l]===t&&(dow=l);else e==="Monthly"&&(a=o);return[s,r,a,month,dow].join(" ")};Li.exports={formatDate:ST,getRandomNo:AT,getCronExpression:ET,getClientHostname:hT,getTimeDifference:CT,isValidDate:fT}});var _e=u(H=>{var{isValidDate:wi}=q(),NT=50;H.buildHeaderRecQuery=(e,t,o=null,r="DocDate")=>{let s="",n="";if(t.searchKey){let d=['T0."DocNum"','T0."NumAtCard"','T0."Comments"'];o&&d.push(...o),s+=H.buildWildCardSearchCondition(d,t.searchKey),t.salesEmployeeCode&&(s+=H.buildEqualCondition('T0."SlpCode"',t.salesEmployeeCode)),t.locationName&&(s+=H.buildEqualCondition('T0."U_Location"',t.locationName)),n=H.buildLimitOffset(1,NT)}else{let d=H.buildHeaderRecFilterConditions(t,r);s=d.filter,n=d.limitOffset}t.IsHomeDelivery&&(s+=H.buildEqualCondition('T0."U_IsHomeDelivery"',t.IsHomeDelivery),t.userId&&(s+=H.buildEqualCondition('T0."U_DeliveryAgentId"',t.userId)));let a=' ORDER BY T0."DocNum" ASC';return e+s+a+n};H.buildRowLevelQuery=(e,t)=>{let o="";t.lineStatus&&(o+=H.buildEqualCondition('T1."LineStatus"',t.lineStatus));let r=' ORDER BY T1."LineNum" ASC';return e+`(${t.docNum.toString()})`+o+r};H.buildHeaderRecFilterConditions=(e,t)=>{let o="",r="";return e.fromDate&&e.toDate&&(o+=H.buildDateRangeCondition(`T0."${t}"`,e.fromDate,e.toDate)),e.cardCode&&(o+=H.buildEqualCondition('T0."CardCode"',e.cardCode)),e.docStatus&&(o+=H.buildEqualCondition('T0."DocStatus"',e.docStatus)),e.locationName&&(o+=H.buildEqualCondition('T0."U_Location"',e.locationName)),e.salesEmployeeCode&&(o+=H.buildEqualCondition('T0."SlpCode"',e.salesEmployeeCode)),e.pageNum&&e.pageSize&&(r=H.buildLimitOffset(e.pageNum,e.pageSize)),{filter:o,limitOffset:r}};H.buildLimitOffset=(e=1,t)=>{let o="";if(!isNaN(e)&&!isNaN(t)&&t>0){let r=(e-1)*t,s=e*t;o=` LIMIT ${t} OFFSET ${r} `}return o};H.buildDateRangeCondition=(e,t,o)=>{let r="";return wi(t)&&wi(o)&&(r=` AND ${e} BETWEEN TO_DATE('${t}') AND TO_DATE('${o}') `),r};H.buildEqualCondition=(e,t)=>{let o="";return e&&t&&(o=` AND ${e} = '${t}' `),o};H.buildWildCardSearchCondition=(e,t)=>{let o="";if(t)return isNaN(t)&&(t=t.toUpperCase()),o=` AND ( ${e.map(s=>`UPPER(${s}) LIKE '%${t}%'`).join(" OR ")} ) `,o}});var er=u((yb,Pi)=>{var Te=D(),Bi=bi(),so=Oi(),he=b(),{buildLimitOffset:IT,buildWildCardSearchCondition:DT}=_e(),{itemTypes:bt,requestTypes:vi,EXCLUDED_ITEM_GROUPS:mb}=S(),ot=(e,t=!1,o="T0")=>e&&e.displayUserName&&e.displayUserName.startsWith("Ammunition")?` AND ${o}."ItmsGrpCod" = '130'`:t?` AND ${o}."ItmsGrpCod" != '130'`:"",bT=e=>{console.log("*** req.query: "+JSON.stringify(e.query));let t=ot(e.userSessionLog,!0,"T0"),o="",r=[],s="",n="";e.pageNum&&e.pageSize&&(o=IT(e.pageNum,e.pageSize)),e.searchKey&&(s=DT(['T0."ItemCode"','T0."ItemName"','T0."FrgnName"'],e.searchKey));let a=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."InvntryUom",
             T0."ManBtchNum", T0."ManSerNum", T0."InvntItem", T0."TreeType",
             T0."CodeBars", T0."AvgPrice", T0."SpcialDisc" "Discount",
             (SELECT MAX(A."Price") FROM  ${Te.dbCreds.CompanyDB}.ITM1 A 
                WHERE A."ItemCode"=T0."ItemCode" AND A."PriceList"='1') AS "Price"
              FROM ${Te.dbCreds.CompanyDB}.OITM T0
             WHERE T0."frozenFor" = 'N' ${t}`;if(e.itemType){let l="",d="";e.itemCodes&&(l=e.itemCodes,Array.isArray(l)?l="'"+l.join("','")+"'":l="'"+l+"'",d=` AND T0."ItemCode" IN (${l})`),console.log("** itemCodes: "+l),e.itemType===bt.NORMAL?a=`SELECT T0."ItemCode"
              FROM ${Te.dbCreds.CompanyDB}.OITM T0
            WHERE T0."ManBtchNum" ='N' AND T0."ManSerNum" ='N' AND T0."frozenFor" = 'N' ${t}
              ${d}`:e.itemType===bt.LABOR&&(a=`SELECT T0."ItemCode"
              FROM ${Te.dbCreds.CompanyDB}.OITM T0
            WHERE T0."InvntItem" ='N' AND T0."frozenFor" = 'N' ${t}
              ${d}`)}n=' ORDER BY T0."ItemCode" ASC';try{console.log("getItems - sql+filter+orderBy+limitOffset: ",a+s+n+o),console.log("getItems - values: ",r);let l=he.executeWithValues(a+s+n+o,r),d=[];return e.query&&(e.itemType===bt.NORMAL||e.itemType===bt.LABOR)?(l.forEach(i=>{d.push(i.ItemCode)}),console.log("getItems - itemCodes - %s",JSON.stringify(d)),d):(console.log("getItems - rows - %s",JSON.stringify(l)),l)}catch(l){throw console.log("getItems - helper - error: "+JSON.stringify(l)),l}},RT=async e=>{let t,o=[],r="";console.log("filter.itemAndWHCodes: "+e.itemAndWHCodes);let s=ot(e.userSessionLog);if(e.type===vi.BATCH_SERIAL_IN_A_BIN)try{let n=await _i(e.itemType,e.itemCode,e.warehouseCode,e.binCode,e.userSessionLog);return console.log("getBatchSerialInfo: "+JSON.stringify(n)),n}catch(n){throw n}else if(e.type===vi.BATCH_SERIAL_WITH_ALL_BINS)try{let n,a,l=[],d=[],i=Zo(e.itemAndWHCodes,"A");if(r=i.where+' GROUP BY A."ItemCode", C."BinCode", C."AbsEntry", A."WhsCode",B."DistNumber"',o=i.values,console.log("BATCH_SERIAL_WITH_ALL_BINS - values: "+o.toString()),n=he.executeWithValues(Te.batchForItemAndWH+r+s,o),a=he.executeWithValues(Te.serialForItemAndWH+r+s,o),Array.isArray(n)&&n.length>0){let c=Zo(n,"A");r=c.where,o=c.values,l=he.executeWithValues(Te.getAllBinsForBatch+r,o)}if(Array.isArray(a)&&a.length>0){let c=Zo(a,"A");r=c.where,o=c.values,console.log("binsListForSerial - values: "+o.toString()),d=he.executeWithValues(Te.getAllBinsForSerial+r,o),console.log("binsListForSerial - result: "+JSON.stringify(d))}if(Array.isArray(l)&&l.length>0){let c=[];n.forEach(p=>{l.forEach(y=>{p.ItemCode===y.ItemCode&&p.WhsCode===y.WhsCode&&p.BatchNumberProperty===y.BatchNumberProperty&&c.push({BatchNumberProperty:y.BatchNumberProperty,BinCode:y.BinCode,BinAbsEntry:y.BinAbsEntry,OnHandQty:y.OnHandQty})}),p.DocumentLinesBinAllocations=c,c=[]})}if(Array.isArray(d)&&d.length>0){let c=[];a.forEach(p=>{d.forEach(y=>{p.ItemCode===y.ItemCode&&p.WhsCode===y.WhsCode&&p.InternalSerialNumber===y.InternalSerialNumber&&c.push({InternalSerialNumber:y.InternalSerialNumber,BinCode:y.BinCode,BinAbsEntry:y.BinAbsEntry,OnHandQty:y.OnHandQty})}),p.DocumentLinesBinAllocations=c,c=[]})}return[...n,...a]}catch(n){throw n}else{if(console.log("filter: "+e),e.batchSerialNo&&e.binCode)r=' AND B."DistNumber" = ? AND C."BinCode" = ?',o=[e.batchSerialNo,e.binCode];else if(e.batchSerialNo)r=' AND B."DistNumber" = ?',o=[e.batchSerialNo];else if(e.warehouseCode)r+=' AND A."WhsCode" = ?',o=[e.warehouseCode],e.binCode&&(r+=' AND C."BinCode" = ?',o.push(e.binCode));else if(e.itemAndWHCodes){let n=Zo(e.itemAndWHCodes,"A");r=n.where,o=n.values}e.itemCode&&(r=' AND A."ItemCode" = ?',o=[e.itemCode]);try{console.log("getBatchSerialInfo - values: "+o.toString());let n=he.executeWithValues(Te.getAllBinsForBatch+r,o),a=he.executeWithValues(Te.getAllBinsForSerial+r,o);return[...n,...a]}catch(n){throw n}}},_i=(e,t,o,r,s=null)=>{let n=[],a,l,d=ot(s);e===bt.BATCHES?l=Te.getAllBinsForBatch:e===bt.SERIAL_NUMBERS&&(l=Te.getAllBinsForSerial),t&&n.push(`A."ItemCode" IN ('${t}')`),o&&n.push(`A."WhsCode" IN ('${o}')`),r&&n.push(`C."BinCode" IN ('${r}')`),n.length&&(l=`${l} AND ${n.join(" AND ")}`),d&&(l+=d.replace("T0.","A."));try{return a=he.executeWithValues(l),console.log("getBatchSerialRecords - result: "+JSON.stringify(a)),a}catch(i){throw i}},OT=(e,t,o)=>{let r=[],s,n;e?n=Bi.updateReservedCustForBatch:t&&(n=Bi.updateReservedCustForSerial);try{return s=he.executeWithValues(n,o),console.log("setBatchSerialReservedCust - result: "+JSON.stringify(s)),s}catch(a){throw a}},Zo=(e,t)=>{let o=[],r="";return Array.isArray(e)&&e.length&&(e.forEach(s=>{r?r+=" OR ":r+=" AND (",!s.BatchNumberProperty&&!s.InternalSerialNumber&&(s=JSON.parse(s)),s.BatchNumberProperty||s.InternalSerialNumber?(r+=`(B."DistNumber"=? AND ${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.BatchNumberProperty?s.BatchNumberProperty:s.InternalSerialNumber),o.push(s.ItemCode),o.push(s.WhsCode)):(r+=`(${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.itemCode),o.push(s.warehouseCode))}),r+=")"),{where:r,values:o}},UT=e=>{let t=[],o,r;r=so.selectTimYardItemInfo,ot(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItems - Query: "+r);try{return o=he.executeWithValues(r),console.log("getTimYardItemRecords - result: "+JSON.stringify(o)),Array.isArray(o)&&o.length>0&&(o=o.filter(n=>parseFloat(n.U_AvlQty)>0||parseFloat(n.U_AvlPcs)>0)),o}catch(n){throw n}},xT=e=>{let t=[],o,r;r=so.selectTimYardItemInitialInfo1,ot(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItemInitial1Records - Query: "+r);try{return o=he.executeWithValues(r),o}catch(n){throw n}},LT=e=>{let t=[],o,r,s,n;r=so.selectTimyardItemInitialInfo3,ot(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),s=so.selectTimyardItemInitialInfo4,t=[],e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(s=`${s} AND ${t.join(" AND ")}`),n=so.selectTimYardItemExistsCheck,t=[],e.itemCode&&t.push(`S0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`S1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(n=`${n} AND ${t.join(" AND ")}`),r=r+" UNION "+s+" AND NOT EXISTS ("+n+" )",console.log("getTimYardItemInitialRecords - Query: "+r);try{o=he.executeWithValues(r);let l=o.map(i=>{if(i.U_Batch&&i.U_Batch.trim()!=="")return i;let c=i.ItemCode.toString().slice(-6),p="";i.U_Length!==void 0&&i.U_Length!==null&&(p=parseFloat(i.U_Length));let y=p!==""?`SC${e.warehouseCode}${c}_${p}`:`SC${e.warehouseCode}${c}`;return{...i,U_Batch:y}});console.log("getTimYardItemInitialRecords - enriched: "+JSON.stringify(l));let d=l;return Array.isArray(l)&&l.length>0&&(d=l.filter(i=>parseFloat(i.U_AvlQty)>0||parseFloat(i.U_AvlPcs)>0)),d}catch(l){throw l}};Pi.exports={getItems:bT,getBatchSerialInfo:RT,getBatchSerialRecords:_i,setBatchSerialReservedCust:OT,getTimYardItemRecords:UT,getTimYardItemInitial1Records:xT,getTimYardItemInitial3Records:LT,getAmmoFilter:ot}});var $i=u((Sb,Fi)=>{var Oe=b(),Ce=D(),gb=_s(),Mi=Ps(),{getApprovedSTRRecords:wT}=Ms(),{getApprovedSTRecords:BT}=$s(),{getBatchSerialInfo:vT,getItems:_T,getTimYardItemRecords:PT,getTimYardItemInitial1Records:Tb,getTimYardItemInitial2Records:hb,getTimYardItemInitial3Records:MT}=er(),{portalModules:no,draftObjectCodes:Ws,draftStatus:rt,itemTypes:Cb}=S(),FT=(e,t)=>{let o;e.query.moduleName===no.STOCK_TRANSFER&&(o=Mi.selectSTDocEntry);try{let r=Oe.executeWithValues(o,[e.query.docNum]);console.log("getDocEntry: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getDocEntry - controller - error: "+JSON.stringify(r.message)),t.status(500).send({message:r.message})}},$T=(e,t)=>{try{t.send({serverDateTime:new Date})}catch(o){console.log("err: "+JSON.stringify(o)),t.status(500).send({message:JSON.stringify(o)})}},WT=(e,t)=>{try{let o=Oe.executeWithValues(Ce.picklistWarehouses,[]);t.send(o)}catch(o){console.log("getPicklistWarehouses - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},kT=(e,t)=>{try{let o=Oe.executeWithValues(Ce.userBranches,[e.session.userId]);console.log("getUserBranches- branchList: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},HT=(e,t)=>{try{let o=Oe.executeWithValues(Ce.allFreightInfo,[]);console.log("getFreightList- allFreightInfo: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},JT=(e,t)=>{console.log("*** req.query: "+JSON.stringify(e.query));try{let o=_T({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){console.log("getItemsList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},qT=(e,t)=>{try{Oe.executeQuery(Ce.portalModules,(o,r)=>{if(o)throw o;console.log("getPortalModules %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalModules - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},GT=(e,t)=>{let o,r=0,s=0,n=0,a=0,l=0,d=0,i,c,{userId:p}=e.session;console.log("getDraftsCount - req.session.userId: ",p);let y=[p];if(e.query.moduleName){if(e.query.moduleName==no.STOCK_TRANSFER_REQUEST){o=Ws.STOCK_TRANSFER_REQUEST;let g=wT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(g)&&g.length>0&&(s=s+g.length,l=l+g.length)}else if(e.query.moduleName==no.STOCK_TRANSFER){o=Ws.STOCK_TRANSFER;let g=BT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(g)&&g.length>0&&(s=s+g.length,l=l+g.length)}else e.query.moduleName==no.DELIVERY&&(o=Ws[no.DELIVERY],i=Mi.selectApprovedSTs+' AND T0."U_OriginatorId" = ?');o&&y.push(o);try{let g=Oe.executeWithValues(Ce.selectDraftsForApprover,y),E=Oe.executeWithValues(Ce.selectDraftsForOriginator,y);Array.isArray(g)&&g.length&&g.forEach(h=>{h.U_DraftStatus===rt.PENDING&&h.ActualStatus!==rt.APPROVED?r++:h.U_DraftStatus===rt.APPROVED?s++:h.U_DraftStatus===rt.REJECTED&&n++}),Array.isArray(E)&&E.length&&E.forEach(h=>{h.U_DraftStatus===rt.PENDING?a++:h.U_DraftStatus===rt.APPROVED?l++:h.U_DraftStatus===rt.REJECTED&&d++}),t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:l,originatorRejected:d})}catch(g){t.status(500).send({message:g.message})}}else t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:l,originatorRejected:d})},jT=(e,t)=>{let o=e.query.itemCode;Array.isArray(o)?o="'"+o.join("','")+"'":o="'"+o+"'",console.log("** itemCodes: "+o);let r=Ce.itemQuantityInWarehouse,s=[],n=[];e.query.itemCode&&s.push(`T0."ItemCode" IN (${o})`),e.query.warehouseCode&&s.push(`T0."WhsCode" IN (${e.query.warehouseCode})`);let d=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND T2."ItmsGrpCod" = '130'`:` AND T2."ItmsGrpCod" != '130'`;s.length&&(r=`${r} AND ${s.join(" AND ")} ${d} ORDER BY T0."OnHand" DESC`),console.log("getItemCountInWarehouse - sql: "+r);try{n=Oe.executeWithValues(r),console.log("getItemCountInWarehouse - result: "+JSON.stringify(n)),t.send(n)}catch(i){t.status(500).send({message:i.message})}},zT=(e,t)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));let o="",r=[],s="",n="";e.query.searchKey&&(s=` AND (
                UPPER(A."ItemCode") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."ItemName") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."FrgnName") LIKE '%${e.query.searchKey}%' ) `);let d=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND A."ItmsGrpCod" = '130'`:` AND A."ItmsGrpCod" != '130'`,i,c=e.query.itemCode,p=e.query.warehouseCode,y=e.query.binCode,g=e.query.barCode,E=e.query.cardCode,h=e.query.branch;if(e.params.type==="available-item-qty"){i=Ce.binsAndItemQuantityInWarehouse,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),e.session?.userSessionLog?.storeLocation==="Labasa"?r.push("2"):r.push("1");let T=[];c&&T.push(`A."ItemCode" IN ('${c}')`),g&&T.push(`A."CodeBars" IN ('${g}')`),p&&T.push(`C."WhsCode" IN ('${p}')`),y&&T.push(`D."BinCode" IN ('${y}')`),T.length&&(i=`${i} AND ${T.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else if(e.params.type==="available-item-qty-price"){i=Ce.binsAndItemQuantityInWarehouseWithPrice,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(E);let T=[];c&&T.push(`A."ItemCode" IN ('${c}')`),g&&T.push(`F."BcdCode" IN ('${g}')`),p&&T.push(`B."WhsCode" IN ('${p}')`),y&&T.push(`D."BinCode" IN ('${y}')`),T.length&&(i=`${i} AND ${T.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else if(e.params.type==="available-item-qty-price-with-pricelist"){i=Ce.binsAndItemQuantityInWarehouseWithPriceList,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(E),r.push(h);let T=[];c&&T.push(`A."ItemCode" IN ('${c}')`),g&&T.push(`F."BcdCode" IN ('${g}')`),p&&T.push(`B."WhsCode" IN ('${p}')`),y&&T.push(`D."BinCode" IN ('${y}')`),T.length&&(i=`${i} AND ${T.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else{i=Ce.binsList;let T=[];p&&T.push(`T0."WhsCode" IN ('${p}')`),T.length&&(i=`${i} WHERE ${T.join(" AND ")} ORDER BY T0."BinCode" ASC`)}if(e.query.pageNum&&e.query.pageSize){let T=e.query.pageNum,N=e.query.pageSize,J=(T-1)*N,A=T*N;o=" LIMIT ? OFFSET ? ",r=[N,J]}try{let T=Oe.executeWithValues(i,r);t.send(T)}catch(T){t.status(500).send({message:T.message})}},VT=async(e,t)=>{try{let o=await vT({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){t.status(500).send({message:o.message})}},QT=async(e,t)=>{try{console.log("getTimYardItemInfo: ",e.query);let o=[];e.query.isStockCounter==="true"?o=await MT({...e.query,userSessionLog:e.session.userSessionLog}):o=await PT({...e.query,userSessionLog:e.session.userSessionLog}),console.log("getTimYardItemInfo: "+JSON.stringify(o)),t.send(o)}catch(o){t.status(500).send({message:o.message})}},YT=async(e,t)=>{console.log("req.query"+JSON.stringify(e.query));try{let o=Oe.executeWithValues(Ce.binsListForItem,[e.query.warehouseCode,e.query.itemCode]);t.send(o)}catch(o){console.log("getBins - error: "+JSON.stringify(o.message)),next(o)}};Fi.exports={getDocEntry:FT,getServerDateTime:$T,getUserBranches:kT,getFreightList:HT,getItemsList:JT,getPortalModules:qT,getDraftsCount:GT,getItemCountInWarehouse:jT,getBinsAndItemQtyForWarehouse:zT,getBatchSerialNoInfo:VT,getTimYardItemInfo:QT,getBinListbyItem:YT,getPicklistWarehouses:WT}});var ks=u((fb,Wi)=>{var KT="Temporary password",XT=e=>`
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
  `;Wi.exports={subject:KT,getMailBody:XT}});var tr=u((Ab,ki)=>{var Hs=require("../node_modules/bcrypt/bcrypt.js"),ZT=async e=>{try{let o=await Hs.genSalt(10);return await Hs.hash(e,o)}catch(o){throw o}},eh=async(e,t)=>{let o=!1;try{o=await Hs.compare(e,t)}catch(r){console.log("Bcrypt error - comparePassword: "+r)}finally{return o}};ki.exports={generateHash:ZT,comparePassword:eh}});var Js=u((Eb,Hi)=>{var th=()=>{let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";let o="";for(let r=0;r<8;r++)o+=t.charAt(Math.floor(Math.random()*t.length));return o};Hi.exports={generatePassword:th}});var Gi=u(qi=>{var{dbCreds:Ji}=D();qi.selectSalesEmployeeForUser=`SELECT T0."USER_CODE", T1."SalePerson" "SlpCode"
  FROM ${Ji.CompanyDB}.OUSR T0, ${Ji.CompanyDB}.OUDG T1
WHERE T0."DfltsGroup" = T1."Code"
  AND T0."INTERNAL_K" = ?`});var ao=u((Ib,ji)=>{var st=b(),Rt=D(),{generatePassword:oh}=Js(),{generateHash:rh}=tr(),{selectSalesEmployeeForUser:sh}=Gi(),nh=e=>{try{return st.executeWithValues(sh,[e])}catch(t){throw console.log("getSalesEmployeeForUser - controller - error: "+JSON.stringify(t.message)),t}},qs=e=>{let t=`${Rt.selectUsersInUserGroup} '%${e}%' ORDER BY T0."U_NAME" ASC`;try{let o=st.executeWithValues(t);return Array.isArray(o)&&o.length>0?o:void 0}catch(o){throw o}},ah=e=>{try{let t=st.executeWithValues(Rt.selectUserGroupInUser,e);return console.log("getUserGroupByUser- rows: "+JSON.stringify(t)),Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},ih=e=>{try{let t=qs(e);if(console.log("userRC: ",JSON.stringify(t)),Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.U_UserId)}),o}return}catch(t){throw t}},lh=e=>{try{let t=qs(e);if(Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.UserName)}),o}return}catch(t){throw t}},ch=e=>{try{let t=st.executeWithValues(Rt.selectUserInfo,e);return Array.isArray(t)&&t.length>0?t[0]:void 0}catch(t){throw t}},dh=e=>{try{let t=st.executeWithValues(Rt.getUserPermissionsForAllModules,e);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},uh=(e,t)=>{try{let o=st.executeWithValues(Rt.validateUserEmail,[e,t]);return Array.isArray(o)&&o.length>0?o[0]:void 0}catch(o){throw o}},ph=async e=>{try{let t=oh(),o=await rh(t);return st.executeWithValues(Rt.updatePortalPassword,[o,"Y",e])>0?t:void 0}catch(t){throw t}};ji.exports={getUserInfo:ch,getUserPermissions:dh,getUsersByUserGroup:qs,getUserGroupByUser:ah,getUserIDsByUserGroup:ih,getUserNamesByUserGroup:lh,getUserInfoWithUserNameMail:uh,setTemporaryPassword:ph,getSalesEmployeeForUser:nh}});var or=u((Db,zi)=>{var{EntitySchema:mh}=require("../node_modules/typeorm/index.js");zi.exports=new mh({name:"StoreCounters",tableName:"StoreCounters",columns:{storeCounterId:{name:"StoreCounterId",primary:!0,type:"int",generated:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,unique:!1,nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,unique:!0,nullable:!1},userId:{name:"UserId",type:"int",nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",default:()=>"CURRENT_TIMESTAMP"},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeCounters"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"storeCounters"}}})});var rr=u((bb,Vi)=>{var{EntitySchema:yh}=require("../node_modules/typeorm/index.js");Vi.exports=new yh({name:"Stores",tableName:"Stores",columns:{storeId:{name:"StoreId",primary:!0,type:"int",generated:!0},storeName:{name:"StoreName",type:"nvarchar",length:200,unique:!0,nullable:!1},storeCode:{name:"StoreCode",type:"nvarchar",length:100,unique:!0,nullable:!0},location:{name:"Location",type:"nvarchar",length:400,unique:!1,nullable:!1},locationCode:{name:"LocationCode",type:"nvarchar",length:100,unique:!1,nullable:!0},defaultWarehouseCode:{name:"DefaultWarehouseCode",type:"nvarchar",length:100,unique:!1,nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}},relations:{storeWarehouses:{type:"one-to-many",target:"StoreWarehouses",inverseSide:"stores"},storeCounters:{type:"one-to-many",target:"StoreCounters",inverseSide:"stores"},storeUsers:{type:"one-to-many",target:"StoreUsers",inverseSide:"stores"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"stores"}}})});var Gs=u((Rb,Qi)=>{var{EntitySchema:gh}=require("../node_modules/typeorm/index.js");Qi.exports=new gh({name:"CashDenominations",tableName:"CashDenominations",columns:{cashDenominationId:{name:"CashDenominationId",primary:!0,type:"int",generated:!0},storeId:{name:"StoreId",type:"int",nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},trxNumber:{name:"TrxNumber",type:"int",unique:!0,nullable:!0},trxType:{name:"TrxType",type:"nvarchar",length:100,unique:!1,nullable:!1},dateTime:{name:"DateTime",type:"timestamp",nullable:!0},_5cCoin:{name:"5cCoin",type:"int",default:0},_10cCoin:{name:"10cCoin",type:"int",default:0},_20cCoin:{name:"20cCoin",type:"int",default:0},_50cCoin:{name:"50cCoin",type:"int",default:0},_1$Coin:{name:"1DollarCoin",type:"int",default:0},_2$Coin:{name:"2DollarCoin",type:"int",default:0},_5$Note:{name:"5DollarNote",type:"int",default:0},_10$Note:{name:"10DollarNote",type:"int",default:0},_20$Note:{name:"20DollarNote",type:"int",default:0},_50$Note:{name:"50DollarNote",type:"int",default:0},_100$Note:{name:"100DollarNote",type:"int",default:0}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"cashDenominations"},storeCounters:{type:"many-to-one",target:"StoreCounters",joinColumn:{name:"StoreCounterId"},inverseSide:"cashDenominations"}}})});var js=u((Ub,Yi)=>{var{recordState:Ob}=S(),{EntitySchema:Th}=require("../node_modules/typeorm/index.js");Yi.exports=new Th({name:"ParkedTransactions",tableName:"ParkedTransactions",columns:{parkedTransactionId:{name:"ParkedTransactionsId",primary:!0,type:"int",generated:!0},transactionType:{name:"TransactionType",type:"nvarchar",length:50},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!1},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!1},transactionRefNum:{name:"TransactionRefNum",type:"nvarchar",length:"100"},nextRefNum:{name:"NextRefNum",type:"int"},data:{name:"Data",type:"nclob",nullable:!1},parkedDateTime:{name:"ParkedDateTime",type:"timestamp"}}})});var zs=u((xb,Ki)=>{var{EntitySchema:hh}=require("../node_modules/typeorm/index.js");Ki.exports=new hh({name:"QCItemGroup",tableName:"QCItemGroup",columns:{itemGroupId:{name:"ItemGroupId",primary:!0,type:"int",generated:!0},groupName:{name:"GroupName",type:"varchar",length:100,unique:!0,nullable:!1},description:{name:"Description",type:"varchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0}},relations:{itemGroupMembers:{type:"one-to-many",target:"QCItemGroupMembers",inverseSide:"itemGroup"}}})});var Vs=u((Lb,Xi)=>{var{EntitySchema:Ch}=require("../node_modules/typeorm/index.js");Xi.exports=new Ch({name:"QCItemGroupMembers",tableName:"QCItemGroupMembers",columns:{itemGroupMemberId:{name:"ItemGroupMemberId",primary:!0,type:"int",generated:!0},itemCode:{name:"ItemCode",type:"varchar",length:100,unique:!0},itemName:{name:"ItemName",type:"varchar",length:400,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0},itemGroupId:{name:"ItemGroupId",type:"int"}},relations:{itemGroup:{type:"many-to-one",target:"QCItemGroup",onDelete:"CASCADE",joinColumn:{name:"ItemGroupId"},inverseSide:"itemGroupMembers"}}})});var sr=u((wb,Zi)=>{var{EntitySchema:Sh}=require("../node_modules/typeorm/index.js");Zi.exports=new Sh({name:"StoreUsers",tableName:"StoreUsers",columns:{storeUserId:{name:"storeUserId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int",nullable:!1},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeUsers"}}})});var Qs=u((Bb,el)=>{var{EntitySchema:fh}=require("../node_modules/typeorm/index.js");el.exports=new fh({name:"StoreWarehouses",tableName:"StoreWarehouses",columns:{storeWarehouseId:{name:"StoreWarehouseId",primary:!0,type:"int",generated:!0},warehouseCode:{name:"WarehouseCode",type:"nvarchar",length:100,unique:!1},warehouseName:{name:"WarehouseName",type:"nvarchar",length:400,unique:!1,nullable:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeWarehouses"}}})});var Ys=u((vb,tl)=>{var{EntitySchema:Ah}=require("../node_modules/typeorm/index.js");tl.exports=new Ah({name:"UserGroups",tableName:"UserGroups",columns:{userGroupId:{name:"UserGroupId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},groupId:{name:"GroupId",type:"int"},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}}})});var nr=u((_b,ol)=>{var{recordState:Eh}=S(),{EntitySchema:Nh}=require("../node_modules/typeorm/index.js");ol.exports=new Nh({name:"UserSessionLog",tableName:"UserSessionLog",columns:{userSessionLogId:{name:"UserSessionLogId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,nullable:!0},clientIp:{name:"ClientIp",type:"varchar",length:"100"},sessionStatus:{name:"SessionStatus",type:"nvarchar",length:50,default:Eh.ACTIVE,unique:!1,nullable:!1},loginTime:{name:"LoginTime",type:"timestamp"},logoutTime:{name:"LogoutTime",type:"timestamp",default:"",nullable:!0}}})});var ie=u((Pb,rl)=>{var Ih=require("../node_modules/typeorm/index.js"),Dh=or(),bh=rr(),Rh=Gs(),Oh=js(),Uh=zs(),xh=Vs(),Lh=sr(),wh=Qs(),Bh=Ys(),vh=nr(),_h=new Ih.DataSource({type:process.env.TYPEORM_TYPE,host:process.env.HANA_HOST,port:process.env.HANA_PORT,username:process.env.HANA_USER,password:process.env.HANA_PASSWORD,schema:process.env.SERVICE_LAYER_COMPANYDB,synchronize:!1,logging:!1,entities:[Dh,bh,Rh,Oh,Uh,xh,Lh,wh,Bh,vh]});console.log("Database configuration loaded.");rl.exports={dataSource:_h}});var Ut=u(io=>{var{dataSource:ar}=ie(),ir=nr(),Ot="userSessionLogId",Ph="loginTime",{recordState:Mb}=S();io.createUserSessionLog=async e=>{try{return await ar.getRepository(ir).save(e)}catch(t){throw t}};io.getUserSessionLog=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ot]=e.id,delete e.id);try{let o=ar.getRepository(ir);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Ph]:"DESC"}})}catch(o){throw o}};io.updateUserSessionLog=async(e,t)=>{try{let o=ar.getRepository(ir);t[Ot]&&(e||(e=t[Ot]),delete t[Ot]);let r={};return Object.keys(t).length>0&&(r=await o.update({[Ot]:e},t)),r}catch(o){throw o}};io.deleteUserSessionLog=async e=>{try{return await ar.getRepository(ir).delete({[Ot]:e})}catch(t){throw t}}});var nt=u(He=>{var{dataSource:lr}=ie(),cr=Qs(),Mh="storeWarehouseId",Fh="warehouseCode";He.parentPrimaryKey="storeId";He.createStoreWarehouse=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[He.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[He.parentPrimaryKey]:t,createdBy:o,createdAt:r},await lr.getRepository(cr).save(s)}catch(s){throw s}};He.getStoreWarehouse=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Mh]=e.id,delete e.id);try{let o=lr.getRepository(cr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Fh]:"ASC"}})}catch(o){throw o}};He.updateStoreWarehouse=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await lr.getRepository(cr).save(r)}catch(r){throw r}};He.deleteStoreWarehouse=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await lr.getRepository(cr).delete(t)}catch(o){throw o}}});var pr=u(lo=>{var{dataSource:dr}=ie(),{createStoreWarehouse:nl,updateStoreWarehouse:$h}=nt(),ur=rr(),xt="storeId",Wh="storeName",sl="storeWarehouseId,";lo.createStore=async e=>{try{let o=await dr.getRepository(ur).save(e);if(e.warehouses){let r=await nl(e.warehouses,o[xt]);o.warehouses=r}return o}catch(t){throw t}};lo.getStore=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[xt]=e.id,delete e.id);try{let o=dr.getRepository(ur);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Wh]:"ASC"}})}catch(o){throw o}};lo.updateStore=async(e,t)=>{try{let o=dr.getRepository(ur);t[xt]&&delete t[xt];let r;t.warehouses&&(r=t.warehouses,delete t.warehouses);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[xt]:e},t)),r){let n=[];if(r.forEach(async a=>{a[sl]?await $h(a[sl],a):n.push(a)}),n.length>0){let a=await nl(n,e);s.warehouses=a}}return s}catch(o){throw o}};lo.deleteStore=async e=>{try{return await dr.getRepository(ur).delete({[xt]:e})}catch(t){throw t}}});var Ks=u(Je=>{var{dataSource:mr}=ie(),yr=or(),kh="storeCounterId",Hh="counterName";Je.parentPrimaryKey="storeId";Je.createStoreCounter=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[Je.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[Je.parentPrimaryKey]:t,createdBy:o,createdAt:r},await mr.getRepository(yr).save(s)}catch(s){throw s}};Je.getStoreCounter=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[kh]=e.id,delete e.id);try{let o=mr.getRepository(yr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Hh]:"ASC"}})}catch(o){throw o}};Je.updateStoreCounter=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await mr.getRepository(yr).save(r)}catch(r){throw r}};Je.deleteStoreCounter=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await mr.getRepository(yr).delete(t)}catch(o){throw o}}});var Xs=u(qe=>{var{dataSource:gr}=ie(),Tr=sr(),Jh="storeUserId",qh="userName";qe.parentPrimaryKey="storeId";qe.createStoreUser=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[qe.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[qe.parentPrimaryKey]:t,createdBy:o,createdAt:r},await gr.getRepository(Tr).save(s)}catch(s){throw s}};qe.getStoreUser=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Jh]=e.id,delete e.id);try{let o=gr.getRepository(Tr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[qh]:"ASC"}})}catch(o){throw o}};qe.updateStoreUser=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await gr.getRepository(Tr).save(r)}catch(r){throw r}};qe.deleteStoreUser=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await gr.getRepository(Tr).delete(t)}catch(o){throw o}}});var Zs=u(al=>{var Gh=pr(),jh=nt(),zh=Ks(),Vh=Xs(),Qh=Ut();al.getUserStoreInfo=async e=>{try{let t=null,o=null,r="",s="",n="",a="",l="";console.log(`LOG LOGIN - Starting Store/Terminal lookup for UserId: ${e}`);let d=await Vh.getStoreUser({userId:e});Array.isArray(d)&&d.length>0&&(t=d[0].storeId,console.log(`LOG LOGIN - Found primary Store assignment: StoreId ${t}`));let i=t?{userId:e,storeId:t}:{userId:e},c=await zh.getStoreCounter(i);if(Array.isArray(c)&&c.length>0){let p=null;if(c.length>1){console.log(`LOG LOGIN - WARNING: Multiple terminals (${c.length}) found for user ${e}. Checking last used terminal...`);let y=await Qh.getUserSessionLog({userId:e},5);if(Array.isArray(y)&&y.length>0)for(let g of y){let E=c.find(h=>h.storeCounterId===g.storeCounterId);if(E){p=E,console.log(`LOG LOGIN - Stickiness: Picking last used terminal: ${p.counterName}`);break}}}p||(p=c[0]),t||(t=p.storeId,console.log(`LOG LOGIN - StoreId inferred from terminal: ${t}`)),o=p.storeCounterId,r=p.counterCode,s=p.counterName,console.log(`LOG LOGIN - Final Terminal assignment: ${s} (${r})`)}else console.log(`LOG LOGIN - No terminal assignment found for user ${e} (StoreId: ${t||"None"})`);if(t){let p=await Gh.getStore({storeId:t});if(Array.isArray(p)&&p.length>0){n=p[0].locationCode,a=p[0].location;let y=await jh.getStoreWarehouse({storeId:t});Array.isArray(y)&&y.length>0&&(l=y[0].warehouseCode)}}return{storeId:t,storeCounterId:o,counterCode:r,counterName:s,locationCode:n,storeLocation:a,storeWHCode:l}}catch(t){throw console.error(`LOG LOGIN - ERROR in getUserStoreInfo for user ${e}:`,t),t}}});var ll=u(il=>{var{dataSource:Yh}=ie(),Kh=rr(),qb=or(),Gb=sr();il.isUserAssignedToCounter=async(e,t)=>{try{let r=await Yh.getRepository(Kh).createQueryBuilder("store").innerJoin("store.storeUsers","user").innerJoin("store.storeCounters","counter").where("user.userId = :userId",{userId:e}).andWhere("counter.storeCounterId = :counterId",{counterId:t}).getOne();return console.log("isUserAssignedToCounter - result: ",r),!!r}catch(o){throw o}}});var dl=u(cl=>{var{Between:Xh}=require("../node_modules/typeorm/index.js"),{dataSource:Zh}=ie(),eC=nr(),{recordState:tC}=S();cl.isCounterOccupied=async e=>{let t=Zh.getRepository(eC),o=new Date;o.setUTCHours(0,0,0,0);let r=new Date;r.setUTCHours(23,59,59,999);let s=await t.findOne({where:{storeCounterId:e,loginTime:Xh(o.toISOString(),r.toISOString()),sessionStatus:tC.ACTIVE}});return console.log("isCounterOccupied - existingSession: ",s),!!s}});var hr=u(ul=>{var{isUserAssignedToCounter:oC}=ll(),{isCounterOccupied:rC}=dl();ul.canAssignUserToCounter=async(e,t)=>{try{if(await oC(e,t)){if(await rC(t))throw new Error("Counter already occupied by another user. Make sure you have selected the correct counter!");return!0}else throw new Error("User doesnt have access to this Counter. Please contact Admin!")}catch(o){throw o}}});var pl=u(tn=>{var{dbCreds:en}=D();tn.selectLocations=`SELECT T0."Code", T0."Location" FROM ${en.CompanyDB}.OLCT T0`;tn.locationDefaults=`SELECT T0."Code" AS "Location", T0."U_AccountCode" AS "AccountCode", T0."U_OTCCardCode", T0."U_CODCardCode",
    T0."U_LocName", T0."U_LocAddress", T0."U_Store", T0."U_Phone", T0."U_Website", T0."U_Email", T1."U_Branch" AS "Branch"
    FROM ${en.CompanyDB}."@LOCACCOUNTMAPPING" T0
    INNER JOIN ${en.CompanyDB}."OLCT" T1 ON T0."Code" = T1."Location"
  WHERE UPPER(T0."Code") = UPPER(?)`});var co=u(on=>{var ml=b(),yl=pl();on.getLocations=()=>{try{return ml.executeWithValues(yl.selectLocations)}catch(e){throw console.log("getLocations - controller - error: "+JSON.stringify(e.message)),e}};on.getLocationDefaults=e=>{try{let t=ml.executeWithValues(yl.locationDefaults,[e]);return console.log("getLocationDefaults- rows: "+JSON.stringify(t)),t}catch(t){throw console.log("getLocationDefaults - controller - error: "+JSON.stringify(t.message)),t}}});var po=u(uo=>{var{dbCreds:Lt}=D();uo.selectTaxInfo=`SELECT "Name", "Code", "Rate" FROM ${Lt.CompanyDB}.OVTG
WHERE "Inactive" = 'N'`;uo.selectSalesEmployees=`SELECT T0."SlpCode", T0."SlpName", T0."Active", T3."SalesDisc"
    FROM ${Lt.CompanyDB}.OSLP T0
    LEFT JOIN ${Lt.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${Lt.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."Active" ='Y'`;uo.selectPaymentTerms=`SELECT T0."GroupNum" "PaymentTermCode", T0."PymntGroup" FROM ${Lt.CompanyDB}.OCTG T0`;uo.selectBankInfo=`SELECT T0."BankCode", T0."BankName" FROM ${Lt.CompanyDB}.ODSC T0 WHERE T0."CountryCod" ='FJ'`});var rn=u(gl=>{var sC=b(),nC=po();gl.getSalesEmployees=(e,t)=>{try{let o;return o=nC.selectSalesEmployees,e&&(o=o+`AND T0."Fax" IN ('${e}')`),t&&(o=o+`AND UPPER(T0."U_POSUser") IN  (UPPER('${t}'))`),console.log("Sql:",o),sC.executeWithValues(o)}catch(o){throw console.log("getSalesEmployees - controller - error: "+JSON.stringify(o.message)),o}}});var Al=u((eR,fl)=>{var le=b(),oe=D(),{getRandomNo:Tl,formatDate:aC,getClientHostname:iC}=q(),Cr=ks(),{sendMail:hl}=Re(),{generateHash:lC,comparePassword:Cl}=tr(),Ue=ao(),{createUserSessionLog:cC}=Ut(),{getUserStoreInfo:dC}=Zs(),{canAssignUserToCounter:Zb}=hr(),{getLocationDefaults:uC}=co(),{getSalesEmployees:pC}=rn(),mC=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=le.executeWithValues(oe.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{console.log("rows[0].Password: "+s[0].Password);let n=s[0].Password&&(await Cl(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(r=n||a,console.log("isUserAuthenticated: "+r),r)if(s[0].U_TempPasswordFlag==="Y")t.send({tempPasswordFlag:!0,UserName:s[0].UserName});else{let l=s[0].InternalKey,{storeId:d,storeCounterId:i,counterCode:c,counterName:p,locationCode:y,storeLocation:g,storeWHCode:E}=await dC(l),h="",T=await Ue.getSalesEmployeeForUser(l);if(Array.isArray(T)&&T.length>0&&(h=T[0].SlpCode),!h){let O=await pC(g,e.body.userName);Array.isArray(O)&&O.length>0&&(h=O[0].SlpCode,console.log("LOG LOGIN - BACKEND - Fallback found SalesEmployeeCode:",h))}let N="";if(g){let O=await uC(g);Array.isArray(O)&&O.length>0&&(N=O[0])}let J="",A=await Ue.getUserGroupByUser(l);Array.isArray(A)&&A.length>0&&(J=A[0].U_GroupName),e.session.userId=l,e.session.userName=process.env.SERVICE_LAYER_USERNAME,e.session.password=process.env.SERVICE_LAYER_PASSWORD,e.session.slCookie="",e.session.slLoginTime="",e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=J;let f=await iC(e),C={userId:l,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:h,userGroup:J,storeId:d||null,storeCounterId:i||null,counterCode:c,counterName:p,locationCode:y,storeLocation:g,locationDefaults:N,clientIp:f,loginTime:aC(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},x=await cC(C);e.session.userSessionLog=x,e.session.storeWHCode=E,e.session.userSessionLog.locationCode=y;let _={InternalKey:l,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:x,storeWHCode:E,userGroup:J,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",_.userGroup),console.log("userSalesEmployeeCode (nested):",_.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let O=Ue.getUserPermissions(s[0].InternalKey);O&&(e.session.permissions=O,_.permissions=O),t.send(_)}catch(O){console.log("validateUserLogin - getUserPermissions - error: "+JSON.stringify(O)),t.status(500).send({message:O.message+". Unable to get User Permissions"})}}}r||(console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"}))}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}},yC=async(e,t,o)=>{try{let r=Ue.getUserInfo(e.body.internalKey);if(r){let s=await Ue.setTemporaryPassword(e.body.internalKey);if(s){let n=Cr.getMailBody(s);await hl(r.Email,Cr.subject,n)?console.log("Temporary password has been sent to the mailid"):console.log("Unable to send temporary password to the mailid!"),t.status(200).send({tempPassword:s})}else t.status(500).send({message:"Unable to set temp password!"})}else console.log("Invalid user details!"),t.status(500).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("generateTempPassword - controller - error: "+JSON.stringify(r)),o(r)}},gC=async(e,t,o)=>{try{let r=Ue.getUserInfoWithUserNameMail(e.body.userName,e.body.mailId);if(console.log("handleForgotPassword %s",JSON.stringify(r)),r)if(r.U_PortalAccountLocked==="Y")console.log("userRec.U_PortalAccountLocked: "+r.U_PortalAccountLocked),t.status(401).send({message:"Your account is locked. Please contact Admin!"});else{let s=await Ue.setTemporaryPassword(r.InternalKey);if(s){let n=Cr.getMailBody(s);await hl(e.body.mailId,Cr.subject,n)?t.status(200).send({message:"Temporary password has been sent to your email"}):t.status(200).send({message:"Unable to send temporary password to your mail. Please contact Admin!"})}}else console.log("Invalid user details!"),t.status(401).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("handleForgotPassword - controller - error: "+JSON.stringify(r)),t.status(500).send({message:r.message})}},TC=async(e,t)=>{let o={},r=!1,s=await lC(e.body.newPassword);try{let n=le.executeWithValues(oe.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(n)),Array.isArray(n)&&n.length&&(r=await Cl(e.body.password,n[0].Password),r))try{let a=le.executeWithValues(oe.updatePortalPassword,[s,"N",n[0].InternalKey]);if(console.log("updatePortalPassword %s",JSON.stringify(a)),a>0)if(e.body.screen&&e.body.screen==="Login"){e.session.userName=n[0].UserName,e.session.userId=n[0].InternalKey,o={InternalKey:n[0].InternalKey,UserName:n[0].UserName,permissions:[]};try{let l=Ue.getUserPermissions(n[0].InternalKey);console.log("validateUserLogin - getUserPermissionsForAllModules %s",l),l&&(e.session.permissions=l,o.permissions=l),t.send(o)}catch(l){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(l)),t.status(500).send({message:l.message+". Unable to get User Permissions"})}}else t.status(200).send({message:"Password updated successfully"})}catch(a){console.log("updatePortalPassword - error: "+JSON.stringify(a)),t.status(500).send({message:"Password update failed!"})}r||(console.log("Invalid username/password!"),t.status(401).send({message:"Invalid username/password!"}))}catch(n){console.log("validateUserLogin - controller - error: "+JSON.stringify(n)),t.status(500).send({message:n.message})}},hC=(e,t)=>{try{let o=le.executeWithValues(oe.allUsers,[e.query.isPortalUser]);t.send(o)}catch(o){console.log("getAllUsers - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},CC=(e,t)=>{try{let o=Ue.getUsersByUserGroup(e.params.groupName);t.send(o)}catch(o){console.log("getUsersByUserGroup - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},SC=(e,t)=>{try{le.executeQuery(oe.portalUsers,(o,r)=>{if(o)throw o;console.log("getPortalUsersList %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUsersList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},fC=(e,t)=>{try{le.executeQuery(oe.portalUserGroups,(o,r)=>{if(o)throw o;console.log("getAllPortalGroups %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getAllPortalGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},AC=(e,t)=>{try{Sl(o=>{console.log("getPortalUserGroups - userGroups: "+JSON.stringify(o)),t.send(o)})}catch(o){console.log("getPortalUserGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Sl=e=>{try{le.executeQuery(oe.userGroupsWithPermissions,(t,o)=>{if(t)throw t;e(o)})}catch(t){throw console.log("getAllUserGroupsWithPermissions - controller - error: "+JSON.stringify(t)),t}},EC=(e,t,o)=>{try{let r=Ue.getUserPermissions(e.params.userId);t.send(r)}catch(r){console.log("getUserPermissions - controller - error: "+JSON.stringify(r)),o(r)}},NC=(e,t)=>{console.log("req.params: %s",JSON.stringify(e.params));try{le.executeQuery(`${oe.userPermissionsForGivenGroup}'${e.params.id}'`,(o,r)=>{if(o)throw o;console.log("getPortalUserPermissions %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUserPermissions - controller - error: "+JSON.stringify(o)),next(o)}},IC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s=0,n=[],a=[],l=oe.updateUserGroup,d=e.body.U_GroupId;d||(d=parseInt(Tl()),l=oe.insertUserGroup);let i=[d,e.body.U_GroupName,e.body.U_GroupName,d];console.log("userGroupValues: "+i),e.body.permissionsList.forEach(c=>{r=c.U_PermissionId,r?a.push([r,r,d,c.U_ModuleId,c.U_AllowRead,c.U_AllowWrite,c.U_AllowCancel,c.U_AllowCreate,r]):(r=parseInt(Tl()),n.push([r,r,d,c.U_ModuleId,c.U_AllowRead,c.U_AllowWrite,c.U_AllowCancel,c.U_AllowCreate,r]))});try{if(le.executeWithValues(l,i)){let p=le.executeBatchInsertUpdate(oe.insertPermissions,n);s+=p,console.log("insertPermissions insertRows: "+p);let y=le.executeBatchInsertUpdate(oe.updatePermissions,a);s+=y,console.log("updatePermissions updateRows: "+y),console.log("createUpdateUserGroupWithPermissions result: "+s),s>0?Sl(g=>{t.send(g)}):t.status(201).send({})}else console.log("createUpdateUserGroupWithPermissions -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"})}catch(c){console.log("createUpdateUserGroupWithPermissions - controller - error: "+JSON.stringify(c)),o(c)}},DC=(e,t,o)=>{console.log("req.param.id: %s",e.params.id);try{le.executeQuery(`${oe.usersInGivenGroup}'${e.params.id}'`,(r,s)=>{if(r)throw r;if(Array.isArray(s)&&s.length){let n=s.map(a=>a.UserName);t.status(400).send({users:n,error:"Please remove the users from this Group to delete it"})}else le.executeQuery(`${oe.deletePermissions}'${e.params.id}'`,(n,a)=>{if(n)throw n;console.log("deletePermission rows: "+a),le.executeQuery(`${oe.deleteUserGroup}'${e.params.id}'`,(l,d)=>{l?t.status(500).send({err:l}):d>0?t.status(200).send("Success!"):(console.log("deletePortalUserGroup %s",d),t.status(201).send({rows:d}))})})})}catch(r){console.log("deletePortalUserGroup - controller - error: "+JSON.stringify(r)),t.status(500).send({error:r.message})}};fl.exports={validateUserLogin:mC,generateTempPassword:yC,updatePortalPassword:TC,handleForgotPassword:gC,getAllUsers:hC,getUsersByUserGroup:CC,getAllPortalGroups:fC,getPortalUserGroups:AC,getPortalUserPermissions:NC,getUserPermissions:EC,getPortalUsersList:SC,createUpdateUserGroupWithPermissions:IC,deletePortalUserGroup:DC}});var Nl=u(El=>{var{setBatchSerialReservedCust:bC}=er();El.patch=(e,t)=>{console.log("*** setBatchSerialReservedCust - req.params: "+JSON.stringify(e.params));try{let o=bC(e.params.batchNumber,e.params.serialNumber,e.params.customerCode);console.log("setBatchSerialReservedCust %s",JSON.stringify(o)),t.send(o)}catch(o){console.log("setBatchSerialReservedCust - controller - error: "+JSON.stringify(o));let r="Something went wrong. Please try again or contact your administrator";o.message&&(r=o.message),t.status(500).send({message:r})}}});var Dl=u((rR,Il)=>{var ee=b(),X=D(),{getRandomNo:oR}=q(),re={TEMPLATE:"TEMPLATE",ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER"},at=[],Ge=[],sn=(e,t)=>{console.log("BEFORE: approverPrimaryKeyList: "+JSON.stringify(Ge)),console.log("docEntry: "+t);let o,r=[],s=1,n="LineId";e===re.TEMPLATE?(o=X.allHeaderIds,n="DocEntry"):e===re.APPROVER?o=X.allApproverIds:e===re.ORIGINATOR&&(o=X.allOriginatorIds);try{if(e===re.ORIGINATOR)if(at.length>0)r=at;else if(r=ee.executeWithValues(o,t),r.length>0)at=r;else return at.push({LineId:s}),s;else if(e===re.APPROVER)if(Ge.length>0)r=Ge;else if(r=ee.executeWithValues(o,t),r.length>0)Ge=r;else return Ge.push({LineId:s}),s;else r=ee.executeWithValues(o,t);console.log("primaryKeyList %s",JSON.stringify(r));let a=r.length;if(a){if(r[a-1][n]===a)s=a+1,e===re.ORIGINATOR?at.push({LineId:s}):e===re.APPROVER&&Ge.push({LineId:s});else if(a>0){for(let l=0;l<r[a-1][n];l++)if(r[l][n]!=l+1){s=l+1,e===re.ORIGINATOR?at.splice(l,0,{LineId:s}):e===re.APPROVER&&Ge.splice(l,0,{LineId:s});break}}}return console.log("AFTER: approverPrimaryKeyList: "+JSON.stringify(Ge)),console.log("primaryKey: "+s),s}catch(a){throw a}},nn=()=>{let e=[],t=[],o=[];try{if(e=ee.executeWithValues(X.selectApprovalHeader),console.log("approvalHeaderList %s",JSON.stringify(e)),e.length){let r=[],s=[];t=ee.executeWithValues(X.selectApprovalOriginator),console.log("approvalOriginatorList.length: "+t.length),o=ee.executeWithValues(X.selectApprovalApprover),console.log("approvalApproverList.length: "+o.length),e.forEach(n=>{r=[],s=[],t.forEach(a=>{n.DocEntry===a.DocEntry&&r.push(a)}),n.Originator=r,o.forEach(a=>{n.DocEntry===a.DocEntry&&s.push(a)}),n.Approver=s})}}catch(r){throw r}finally{return e}},RC=(e,t)=>{try{t.send(nn())}catch(o){console.log("getApprovalTemplates - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},OC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s,n=[],a=[],l=[],d=[],i=X.updateApprovalHeader,c=e.body.activeApprovalTemplateId;c||(c=sn(re.TEMPLATE),i=X.insertApprovalHeader);let p=[e.body.templateName,e.body.description,e.body.moduleId,e.body.terms,e.body.noOfApprovals,e.body.multiLevelApproval,e.body.isActive,c];console.log("approvalHeaderValues: "+p);let y;e.body.activeApprovalApproverList.forEach(g=>{r=g.LineId,y=isNaN(parseInt(g.U_ApprovalLevel,10))?null:parseInt(g.U_ApprovalLevel,10),r?(a.push([g.U_UserId,y,c,r]),console.log("approverValuesForUpdate: "+a)):(r=sn(re.APPROVER,c),n.push([g.U_UserId,y,c,r]),console.log("approverValuesForInsert: "+n))}),e.body.activeApprovalOriginatorList.forEach(g=>{s=g.LineId,s?(d.push([g.U_UserId,c,s]),console.log("originatorValuesForUpdate: "+d)):(s=sn(re.ORIGINATOR,c),l.push([g.U_UserId,c,s]),console.log("originatorValuesForInsert: "+l))});try{let g=ee.executeWithValues(i,p),E=0,h=0,T=0,N=0;g?(n.length>0&&(E=ee.executeBatchInsertUpdate(X.insertApprovalApprover,n)),console.log("insertApproverRows: "+E),a.length>0&&(h=ee.executeBatchInsertUpdate(X.updateApprovalApprover,a)),console.log("updateApproverRows: "+h),l.length>0&&(T=ee.executeBatchInsertUpdate(X.insertApprovalOriginator,l)),console.log("insertOriginatorRows: "+T),d.length>0&&(N=ee.executeBatchInsertUpdate(X.updateApprovalOriginator,d)),console.log("updateOriginatorRows: "+N),E+h+T+N>0?t.status(200).send(nn()):t.status(201).send({})):(console.log("createUpdateApprovalTemplate -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"}))}catch(g){console.log("createUpdateApprovalTemplate - controller - error: "+g.message),t.status(500).send({message:g.message})}finally{at=[]}},UC=(e,t,o)=>{console.log("req.param.templateId: %s",e.params.templateId),console.log("req.param.lineId: %s",e.params.lineId),console.log("req.param.recordType: %s",e.params.recordType);let r=0,s=0,n=0;try{e.params.recordType==re.TEMPLATE?(r=ee.executeWithValues(X.deleteApprovalTemplate3,e.params.templateId),s=ee.executeWithValues(X.deleteApprovalTemplate2,e.params.templateId),n=ee.executeWithValues(X.deleteApprovalTemplate1,e.params.templateId)):e.params.recordType==re.APPROVER?s=ee.executeWithValues(X.deleteApprovalApprover,[e.params.templateId,e.params.lineId]):e.params.recordType==re.ORIGINATOR&&(r=ee.executeWithValues(X.deleteApprovalOriginator,[e.params.templateId,e.params.lineId])),console.log("templateRows: "+n+" originatorRows: "+r+"approverRows: "+s),n>0||r>0||s>0?t.status(200).send(nn()):t.status(201).send({})}catch(a){console.log("deleteApprovalTemplate - controller - error: "+JSON.stringify(a)),t.status(500).send({message:a.message})}};Il.exports={getApprovalTemplates:RC,createUpdateApprovalTemplate:OC,deleteApprovalTemplate:UC}});var v=u((nR,bl)=>{var{httpStatusCodes:an}=S(),{formatDate:sR}=q(),xC=(e,t,o)=>{let{permissions:r,userName:s,userId:n}=e.session;!e.url.endsWith("/login")&&!e.url.endsWith("/update-password")&&!e.url.endsWith("/forgot-password")&&(!s||!n||!Array.isArray(r)||r.length===0)?(console.log("sessionValidator - session is INVALID"),t.status(an.UNAUTHORIZED).json({message:"Invalid session. Login to continue!"})):(console.log("sessionValidator - session is VALID!"),o())},LC=(e,t)=>[(o,r,s)=>{Array.isArray(e)||(e=[e]);try{let n=!1,{permissions:a}=o.session;Array.isArray(a)&&a.length&&a.find(l=>e.includes(l.U_ModuleName)&&l[t]==="Y")&&(n=!0),n?s():r.status(an.FORBIDDEN).send({message:"User unauthorized to perform the operation"})}catch(n){console.log("checkUserPermission - controller - error: "+JSON.stringify(n)),r.status(an.INTERNAL_SERVER_ERROR).send({message:n.message})}}];bl.exports={sessionValidator:xC,checkUserPermission:LC}});var Ol=u((aR,Rl)=>{var wC=require("../node_modules/express/index.js"),me=$i(),pe=Al(),BC=Nl(),Sr=Dl(),vC=Ms(),_C=$s(),{portalModules:Ae,permissions:Ee}=S(),{checkUserPermission:Ne}=v(),L=new wC.Router;L.route("/server-date").get(me.getServerDateTime);L.route("/get-docentry").get(me.getDocEntry);L.route("/login").get((e,t)=>t.status(405).send({message:"Login endpoint only accepts POST requests"})).post(pe.validateUserLogin);L.route("/forgot-password").post(pe.handleForgotPassword);L.route("/update-password").patch(pe.updatePortalPassword);L.route("/temp-password").post(pe.generateTempPassword);L.route("/branch").get(me.getUserBranches);L.route("/freights").get(me.getFreightList);L.route("/item").get(me.getItemsList);L.route("/item-qty-in-warehouse").get(me.getItemCountInWarehouse);L.route("/picklist-warehouses").get(me.getPicklistWarehouses);L.route("/bin-location/:type?").get(me.getBinsAndItemQtyForWarehouse);L.route("/modules").get(me.getPortalModules);L.route("/approval-template/:recordType?/:templateId?/:lineId?").get(Ne(Ae.APPROVAL,Ee.READ),Sr.getApprovalTemplates).put(Ne(Ae.APPROVAL,Ee.WRITE),Sr.createUpdateApprovalTemplate).post(Ne(Ae.APPROVAL,Ee.CREATE),Sr.createUpdateApprovalTemplate).delete(Sr.deleteApprovalTemplate);L.route("/users").get(pe.getAllUsers);L.route("/portal-users").get(pe.getPortalUsersList);L.route("/user-groups/:id?").get(Ne(Ae.USER_GROUP,Ee.READ),pe.getAllPortalGroups).put(Ne(Ae.USER_GROUP,Ee.WRITE),pe.createUpdateUserGroupWithPermissions).post(Ne(Ae.USER_GROUP,Ee.CREATE),pe.createUpdateUserGroupWithPermissions).delete(Ne(Ae.USER_GROUP,Ee.CANCEL),pe.deletePortalUserGroup);L.route("/user-groups/:id?/permissions").get(Ne(Ae.USER_GROUP,Ee.READ),pe.getPortalUserPermissions);L.get("/user-groups/:groupName/user",pe.getUsersByUserGroup);L.get("/user/:userId/permissions",pe.getUserPermissions);L.route("/stock-transfer-request/:type?/:recordType?/:docEntry?").get(Ne(Ae.STOCK_TRANSFER_REQUEST,Ee.READ)||Ne(Ae.STOCK_TRANSFER,Ee.CREATE),vC.getTransferRequestRecords);L.route("/stock-transfer/:type?/:recordType?/:docEntry?").get(Ne(Ae.STOCK_TRANSFER,Ee.READ),_C.getTransferRecords);L.route("/count").get(me.getDraftsCount);L.route("/batch-serial-info").get(me.getBatchSerialNoInfo).patch(BC.patch);L.route("/tim-yard-items").get(me.getTimYardItemInfo);L.route("/bincode-info").get(me.getBinListbyItem);Rl.exports=L});var Q=u((iR,xl)=>{var PC=require("../node_modules/axios/index.js"),MC=require("../node_modules/axios-retry/dist/cjs/index.js").default,FC=require("https"),Ul=PC.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new FC.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}});MC(Ul,{retries:3});xl.exports={serviceLayerAPI:Ul}});var te=u((dR,vl)=>{var{serviceLayerAPI:lR}=Q(),{dbCreds:mo,serviceLayerSessionMaxAge:Ll}=D(),{getTimeDifference:cR}=q(),$C=require("../node_modules/axios/index.js"),WC=require("https"),wl=$C.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new WC.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}}),wt=null,it=null,kC=async e=>{try{if(wt&&it){let s=Math.abs(new Date-new Date(it))/6e4;if(console.log(`*** getSLConnection - in-memory cookie age: ${s} min`),s<Ll-5)return wt}if(e.session.slCookie&&e.session.slLoginTime){let s=Math.abs(new Date-new Date(e.session.slLoginTime))/6e4;if(console.log(`*** getSLConnection - session cookie exists, age: ${s} min`),s<Ll-5)return console.log("*** getSLConnection - returning SESSION CACHED SL cookie"),wt=e.session.slCookie,it=e.session.slLoginTime,e.session.slCookie}console.log("*** getSLConnection - NO cached cookie or expired, RE-AUTHENTICATING...");let t=mo.UserName,o=mo.Password;e.session&&e.session.userName&&e.session.password?(console.log(`*** getSLConnection - Using session user credentials for: ${e.session.userName}`),t=e.session.userName,o=process.env.SERVICE_LAYER_PASSWORD||mo.Password):console.log("*** getSLConnection - Using fallback dbCreds");let r=await Bl(t,o);return wt=r,it=new Date().toISOString(),e.session.slCookie=r,e.session.slLoginTime=it,r}catch(t){throw t}},Bl=async(e,t)=>{let o=null;try{let r=await wl.post("Login?prefer=return-no-content",{CompanyDB:mo.CompanyDB,UserName:e,Password:t});console.log(`***Login - openSLConnection - response: ${r.status}`);let s=r.headers["set-cookie"];return Array.isArray(s)?o=s.map(n=>n.split(";")[0]).join("; "):o=s,console.log("cookie: "+o),console.log("response.data.SessionId: "+r.data.SessionId),o}catch(r){throw console.log("openSLConnection - error:",r?.response?.data||r.message),r}},HC=async()=>{let e=null;try{let t=await wl.post("Login?prefer=return-no-content",mo);console.log(`***Login - openDBConnection - response: ${t.status}`);let o=t.headers["set-cookie"];return Array.isArray(o)?e=o.map(r=>r.split(";")[0]).join("; "):e=o,console.log("cookie: "+e),console.log("response.data.SessionId: "+t.data.SessionId),e}catch(t){throw console.log("openDBConnection - error:",t?.response?.data||t.message),t}},JC=(e,t)=>{wt=e,it=t||new Date().toISOString(),console.log("*** setSLCache - SL cookie cached in memory")},qC=e=>{wt=null,it=null,e&&e.session&&(e.session.slCookie=null,e.session.slLoginTime=null),console.log("*** invalidateSLCache - SL cookie cache cleared")};vl.exports={openDBConnection:HC,openSLConnection:Bl,getSLConnection:kC,setSLCache:JC,invalidateSLCache:qC}});var ln=u((uR,_l)=>{var GC="POS - Welcome mail",jC=(e,t,o)=>`
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
  `;_l.exports={subject:GC,getMailBody:jC}});var $l=u((pR,Fl)=>{var{serviceLayerAPI:Pl}=Q(),{getSLConnection:zC}=te(),{generatePassword:VC}=Js(),{sendMail:QC}=Re(),Ml=ln(),YC=async(e,t,o)=>{console.log(`updateUserDetails - req.body: ${JSON.stringify(e.body)}`);let r,s={eMail:e.body.eMail,MobilePhoneNumber:e.body.MobilePhoneNumber,U_PortalUser:e.body.U_PortalUser,U_PortalGroupId:e.body.U_PortalGroupId,U_PortalAccountLocked:e.body.U_PortalAccountLocked,U_PortalBadLoginCount:e.body.U_PortalBadLoginCount};e.body.isNewUser&&(r=VC(),s.U_TempPasswordFlag="Y");let n;try{n=await zC(e)}catch(a){console.log("updateUserDetails: "+JSON.stringify(a)),o(a)}if(n){Pl.defaults.headers.Cookie=n;let a="";try{let l=await Pl.patch(`Users(${e.body.InternalKey})`,s);if(l.status=="200"||l.status=="201"||l.status=="204"){if(e.body.isNewUser){let d=Ml.getMailBody(e.body.adminUser,e.body.userName,r);await QC(e.body.eMail,Ml.subject,d)?a="Portal access invite has been sent to user's email":a="Portal access has been given, but unable to send temporary password to user's mail. Please share it manually."}else a="User details updated successfully";t.status(200).send({message:a})}else t.status(500).send({message:"Update failed!"})}catch(l){console.log("Update User Details - Error: "+l),o(l)}}};Fl.exports={updateUserDetails:YC}});var Hl=u((mR,kl)=>{var{dbCreds:ce}=D(),{draftStatus:Wl}=S(),KC=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
   T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
 FROM ${ce.CompanyDB}."@APPROVALSTATUS" T0, ${ce.CompanyDB}.OUSR TAP
   WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
 AND T0."U_DocEntry" IN `,XC=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
   FROM ${ce.CompanyDB}."@APPROVALSTATUS" T0, ${ce.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,ZC=`SELECT T0."U_ApproverId"
   FROM ${ce.CompanyDB}."@APPROVALSTATUS" T0, ${ce.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,eS=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
    FROM ${ce.CompanyDB}."@APPROVALSTATUS" T0
  WHERE T0."U_DocEntry" = ?
    AND T0."U_ApprovalLevel" = ?`,tS=`UPDATE ${ce.CompanyDB}."@APPROVALSTATUS" T0
   SET T0."U_DraftStatus" = ?
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,oS=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
   FROM ${ce.CompanyDB}."@APPROVALSTATUS" T0, ${ce.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,rS=`INSERT INTO ${ce.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", 
  "U_DraftStatus", "U_ApproverId", "U_ApprovalLevel", "U_ModuleName") VALUES (?, ?, ?, ?, ?, ?, ?)`,sS=`UPDATE ${ce.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
   "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
 WHERE "U_ApprovalStatusId" = ?`,nS=`UPDATE ${ce.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
     WHERE "U_DraftStatus" IN ('${Wl.PENDING}', '${Wl.NOT_ASSIGNED}')
   AND "U_DocEntry" = ?`,aS=`UPDATE ${ce.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
      WHERE "U_DocEntry" = ?`;kl.exports={selectDraftApproversList:KC,insertDraftApproversList:rS,updateDraftApproversList:sS,updateApprovalStatus:nS,updateApprovalStatusRecState:aS,selectDraftApprovalStatusCount:XC,selectDraftApprovalRecords:ZC,updateDraftNextApprovalLevel:tS,selectDraftNextApproverDetails:oS,selectDraftApprovalDate:eS}});var Bt=u((gR,Jl)=>{var{portalModules:yR}=S(),iS="Approval request",lS=(e,t,o)=>`
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
  `;Jl.exports={subject:iS,getMailBody:lS}});var _t=u((hR,Gl)=>{var vt=b(),fr=D(),cn=Hl(),{draftStatus:lt,portalModules:TR}=S(),{getRandomNo:cS}=q(),{sendMail:dS}=Re(),ql=Bt(),uS=(e,t=0,o,r)=>{let s,n=100,a,l=[],d=new ProductionDraftQueries(r);t=parseInt(t),t===1||o==="N"?(a=fr.selectDraftCreationDate,l=[e]):(a=cn.selectDraftApprovalDate,l=[e,t-1]),console.log("sql: "+a);try{let i=vt.executeWithValues(a,l);console.log("getApprovalInternalInDays %s",JSON.stringify(i)),Array.isArray(i)&&i.length&&(s=i[0].DocDate)}catch(i){console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(i))}if(s){let i=Math.abs(new Date-new Date(s));n=Math.ceil(i/(1e3*60*60*24))-1}return n},pS=(e,t,o)=>{let r;e===lt.APPROVED?r=lt.GENERATED:e===lt.REJECTED&&(r=lt.NOT_REQUIRED);try{let s=cn.updateApprovalStatus,n=[r,t],a=vt.executeWithValues(s,n);return console.log("setApprovalStatus %s",JSON.stringify(a)),!0}catch(s){return console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(s)),!1}},mS=(e,t)=>{try{let o=vt.executeWithValues(fr.selectApproverForOriginator,[e,t]);return console.log("result: "+JSON.stringify(o)),o}catch(o){throw o}},yS=e=>{try{let t=vt.executeWithValues(fr.selectDraftApproversList+`(${e}) ORDER BY T0."U_ApprovalLevel" ASC`,[]);return console.log("result: "+JSON.stringify(t)),t}catch(t){throw t}},gS=(e,t,o)=>{try{let r=cn.updateApprovalStatusRecState,s=[t,e],n=vt.executeWithValues(r,s);return console.log("draftApproverRec: "+JSON.stringify(n)),!0}catch(r){throw r}},TS=async(e,t,o)=>{let r=[],s=[],n,a;try{t.map(i=>{n=0,a=cS(),i.U_MultiLevelApproval==="Y"?(n=i.U_ApprovalLevel,i.U_ApprovalLevel==1?(s.push({UserName:i.UserName,Email:i.Email}),r.push([a,a,e,lt.PENDING,i.ApproverId,n])):r.push([a,a,e,lt.NOT_ASSIGNED,i.ApproverId,n])):(s.push({UserName:i.UserName,Email:i.Email}),r.push([a,a,e,lt.PENDING,i.ApproverId,n]))});let l=fr.insertDraftApproversList;console.log("multiApproverList: "+r),console.log("mailingList: "+s);let d=vt.executeBatchInsertUpdate(l,r);return console.log("draftApproverRec: "+JSON.stringify(d)),{draftApproverRec:d,mailingList:s}}catch(l){throw l}},hS=async(e,t,o,r)=>{try{let s=ql.getMailBody(e,t,o);r.forEach(async n=>{await dS(n.Email,ql.subject,s)})}catch(s){throw s}};Gl.exports={getApprovalInternalInDays:uS,setApprovalStatus:pS,getApprovers:mS,getApproversForDraft:yS,updateDraftApprovers:gS,createApproversForDraft:TS,notifyApprovers:hS}});var Ar=u((SR,jl)=>{var{portalModules:CR}=S(),CS="Request status update",SS=(e,t,o,r,s)=>`
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
  `;jl.exports={subject:CS,getMailBody:SS}});var Vl=u(zl=>{var{dbCreds:fS}=D();zl.numberingSeries=`SELECT T0."Series", T0."SeriesName", T0."InitialNum"
    FROM ${fS.CompanyDB}.NNM1 T0
  WHERE T0."ObjectCode" = ?
        AND LOWER(T0."Remark") = ?`});var Er=u(Ql=>{var AS=b(),ES=Vl();Ql.getNumberingSeries=(e,t)=>{try{let o=AS.executeWithValues(ES.numberingSeries,[e,t.toLowerCase()]);return Array.isArray(o)&&o.length>0?o[0]:null}catch(o){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(o.message)),o}}});var ec=u((IR,Zl)=>{var NS=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:Pe}=Q(),{getSLConnection:Kl}=te(),{sendMail:pn}=Re(),dn=_t(),Nr=Bt(),Yl=Ar(),Ie=b(),De=D(),{portalModules:yo,draftObjectCodes:Xl,draftStatus:G,systemCurrency:ER,objectCodes:IS,enableStoreBasedNumbering:DS}=S(),{getRandomNo:bS,formatDate:RS}=q(),NR=b(),{getNumberingSeries:OS}=Er(),US=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await Kl(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,Pe.defaults.headers.Cookie=r;try{let n=Ie.executeWithValues(De.selectApproverForOriginator,[s,yo.STOCK_TRANSFER_REQUEST]);console.log("approverRec: "+JSON.stringify(n));let a=Ie.executeWithValues(De.selectUserInfo,s),l=NS(e.body);if(l.branchId&&(l.BPLID=l.branchId,delete l.branchId),l.U_OriginatorId=s,delete l.userId,Array.isArray(n)&&n.length){l.DocObjectCode=Xl.STOCK_TRANSFER_REQUEST,l.U_DraftStatus=G.PENDING,l.U_MultiLevelApproval=n[0].U_MultiLevelApproval,l.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createSTR Draft - request: "+JSON.stringify(l));let d=await Pe.post("StockTransferDrafts",l);if(console.log("*** DRAFTS response: "+d),d.data){let i=[];n.forEach(h=>{i.push(h.UserName)}),t.status(200).send({draftNum:d.data.DocEntry,approverName:i.join(", "),response:d.data});let c=[],p=[],y,g;n.map(h=>{y=0,g=bS(),h.U_MultiLevelApproval==="Y"?(y=h.U_ApprovalLevel,h.U_ApprovalLevel==1?(p.push({UserName:h.UserName,Email:h.Email}),c.push([g,g,d.data.DocEntry,G.PENDING,h.ApproverId,y])):c.push([g,g,d.data.DocEntry,G.NOT_ASSIGNED,h.ApproverId,y])):(p.push({UserName:h.UserName,Email:h.Email}),c.push([g,g,d.data.DocEntry,G.PENDING,h.ApproverId,y]))}),console.log("multiApproverList: "+c),console.log("mailingList: "+p);let E=Ie.executeBatchInsertUpdate(De.insertDraftApproversList,c);if(console.log("draftApproverRec: "+JSON.stringify(E)),E){let h=Nr.getMailBody(yo.STOCK_TRANSFER_REQUEST,a[0].UserName,d.data.DocEntry);p.forEach(async T=>{await pn(T.Email,Nr.subject,h)})}}}else{let d=[...e.body.StockTransferLines];d.forEach(p=>{p.FromWarehouseCode=p.U_FromWarehouse,delete p.availableQuantity,delete p.U_FromWarehouse}),console.log("stockTransferLines: "+JSON.stringify(d));let i={FromWarehouse:e.body.FromWarehouse,U_FromBinLoc:e.body.U_FromBinLoc,ToWarehouse:e.body.ToWarehouse,U_ToBinLocation:e.body.U_ToBinLocation,Comments:e.body.Comments,SalesPersonCode:e.body.SalesPersonCode,U_DraftStatus:G.AUTO_APPROVED,StockTransferLines:d,U_OriginatorId:s};if(DS){let p=await OS(IS[yo.STOCK_TRANSFER_REQUEST],e.session.userSessionLog.storeLocation);p&&(console.log("seriesResponse series:",p.Series),i.Series=p.Series)}console.log("InventoryTransferRequests - request: "+JSON.stringify(i));let c=await Pe.post("InventoryTransferRequests",i);c.data?t.status(200).send({stockTransferRequestNum:c.data.DocNum}):(console.log("Create Stock Transfer Request failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}}catch(n){console.log("Create Stock Transfer Request error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},un=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await Pe.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==G.APPROVED)try{let a=await Pe.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let l=[],d={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.U_FromWarehouse,U_ToBinLocation:c.U_ToBinLocation},l.push(d)}),l.sort((c,p)=>c.BaseLine-p.BaseLine);let i={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:l};a.BPLID&&(i.BPLID=a.BPLID),console.log("InventoryTransferRequests - request: "+JSON.stringify(i)),s=await Pe.post("InventoryTransferRequests",i)}catch(a){let l=await Pe.patch(`Drafts(${e.DocEntry})`,{U_DraftStatus:G.PENDING});throw console.log("resetDraftStatus - response.data: "+l),a}if(n||s){let a=Ie.executeWithValues(De.updateDraftApproversList,[o,e.U_RejectedReason,RS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===G.REJECTED&&dn.setApprovalStatus(o,e.DocEntry),s){let p=await Pe.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&dn.setApprovalStatus(G.APPROVED,e.DocEntry)}let l=Ie.executeWithValues(De.selectUserInfo,e.U_OriginatorId),d=Ie.executeWithValues(De.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(d));let i;if([G.APPROVED,G.PENDING].includes(e.U_DraftStatus)?i=G.APPROVED:i=e.U_DraftStatus,Array.isArray(d)&&d.length&&Array.isArray(l)&&l.length){let p=Yl.getMailBody(yo.STOCK_TRANSFER_REQUEST,l[0].UserName,d[0].UserName,e.DocEntry,i);await pn(l[0].Email,Yl.subject,p)}let c;o===G.APPROVED&&(c=dn.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:i,noOfDays:c})}}catch(s){next(s)}},xS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await Kl(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){Pe.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==G.APPROVED){let a=Ie.executeWithValues(De.selectNoOfApprovalsForDraft,[Xl.STOCK_TRANSFER_REQUEST,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let l=0,d;if(Array.isArray(a)&&a.length&&(l=parseInt(a[0].U_NoOfApprovals,10),d=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+l),d==="Y"){if(parseInt(s.U_ApprovalLevel)==l?s.U_DraftStatus=G.APPROVED:parseInt(s.U_ApprovalLevel)<l&&(s.U_DraftStatus=G.PENDING),await un(s,t,n,d),s.U_DraftStatus==G.PENDING){let i=parseInt(s.U_ApprovalLevel)+1,c=Ie.executeWithValues(De.updateDraftNextApprovalLevel,[G.PENDING,s.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let p=Ie.executeWithValues(De.selectUserInfo,s.U_OriginatorId),y=Ie.executeWithValues(De.selectDraftNextApproverDetails,[s.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(y)),Array.isArray(y)&&y.length&&p.length){let g=Nr.getMailBody(yo.STOCK_TRANSFER_REQUEST,p[0].UserName,s.DocEntry);await pn(y[0].Email,Nr.subject,g)}}}else{let i=Ie.executeWithValues(De.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(i));let c=0;Array.isArray(i)&&i.length&&(c=i[0].Count),console.log("noOfApprovalsReceived: "+c),parseInt(c,10)+1>=parseInt(l,10)?(s.U_DraftStatus=G.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=G.PENDING,console.log("****PENDING")),await un(s,t,n,d)}}else s.U_DraftStatus==G.REJECTED&&(console.log("****REJECTED"),await un(s,t,n))}catch(n){console.log("Stock Transfer Request Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};Zl.exports={createStockTransferRequest:US,updateDraft:xS}});var ic=u((bR,ac)=>{var sc=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:Me}=Q(),{getSLConnection:nc}=te(),{sendMail:gn}=Re(),mn=_t(),Ir=Bt(),tc=Ar(),Se=b(),fe=D(),{portalModules:Dr,draftObjectCodes:Tn,draftStatus:j,systemCurrency:DR}=S(),{getRandomNo:LS,formatDate:wS}=q(),oc=async(e,t,o)=>{try{e.requestType==="BIN_TO_BIN"?(e.U_DraftStatus="BIN_TO_BIN",delete e.requestType):e.U_DraftStatus=j.AUTO_APPROVED,console.log("StockTransfers - request: "+JSON.stringify(e));let r=await Me.post("StockTransfers",e);r.data?t.status(200).send({stockTransferRequestNum:r.data.DocNum}):(console.log("Create Stock Transfer failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}catch(r){throw r}},BS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await nc(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,Me.defaults.headers.Cookie=r;try{let n=Se.executeWithValues(fe.selectApproverForOriginator,[s,Dr.STOCK_TRANSFER]);console.log("approverRec: "+JSON.stringify(n));let a=Se.executeWithValues(fe.selectUserInfo,s),l=[],d={},i=sc(e.body);if(i.branchId&&(i.BPLID=i.branchId,delete i.branchId),delete i.userId,i.U_OriginatorId=s,i.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,BaseType:c.BaseType,BaseEntry:c.BaseEntry,BaseLine:c.BaseLine,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.U_FromWarehouse,U_ToBinLocation:c.U_ToBinLocation,BatchNumbers:c.BatchNumbers,SerialNumbers:c.SerialNumbers,StockTransferLinesBinAllocations:vS(c.StockTransferLinesBinAllocations)},l.push(d),d={}}),delete i.StockTransferLines,i.StockTransferLines=l,i.requestType==="BIN_TO_BIN")await oc(i,t);else if(Array.isArray(n)&&n.length){i.DocObjectCode=Tn.STOCK_TRANSFER,i.U_DraftStatus=j.PENDING,i.U_MultiLevelApproval=n[0].U_MultiLevelApproval,i.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createST Draft - request: "+JSON.stringify(i));let c=await Me.post("StockTransferDrafts",i);if(console.log("*** DRAFTS response: "+c),c.data){let p=[];n.forEach(N=>{p.push(N.UserName)}),t.status(200).send({draftNum:c.data.DocEntry,approverName:p.join(", "),response:c.data});let y=[],g=[],E,h;n.map(N=>{E=0,h=LS(),N.U_MultiLevelApproval==="Y"?(E=N.U_ApprovalLevel,N.U_ApprovalLevel==1?(g.push({UserName:N.UserName,Email:N.Email}),y.push([h,h,c.data.DocEntry,j.PENDING,N.ApproverId,E])):y.push([h,h,c.data.DocEntry,j.NOT_ASSIGNED,N.ApproverId,E])):(g.push({UserName:N.UserName,Email:N.Email}),y.push([h,h,c.data.DocEntry,j.PENDING,N.ApproverId,E]))}),console.log("multiApproverList: "+y),console.log("mailingList: "+g);let T=Se.executeBatchInsertUpdate(fe.insertDraftApproversList,y);if(console.log("draftApproverRec: "+JSON.stringify(T)),T){let N=Ir.getMailBody(Dr.STOCK_TRANSFER,a[0].UserName,c.data.DocEntry);g.forEach(async J=>{await gn(J.Email,Ir.subject,N)})}}}else await oc(i,t)}catch(n){console.log("Create Stock Transfer error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},rc=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o},vS=e=>{let t=[];return Array.isArray(e)&&e.length>0&&e.forEach(o=>{o.ToBinLoc?t.push({BinAbsEntry:_S(o.ToBinLoc),Quantity:o.Quantity,AllowNegativeQuantity:o.AllowNegativeQuantity,SerialAndBatchNumbersBaseLine:o.SerialAndBatchNumbersBaseLine,BinActionType:o.BinActionType,BaseLineNumber:o.BaseLineNumber}):t.push(o)}),t},_S=e=>{try{let t=Se.executeWithValues(fe.binsList+' WHERE T0."BinCode" = ?',e);return console.log("getBinAbsEntry - result: "+JSON.stringify(t)),t[0].AbsEntry}catch(t){return console.log(`Error getting AbsEntry for BinCode - ${e} ERROR: ${t}`),0}},yn=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await Me.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==j.APPROVED)try{let a=await Me.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let l=[],d={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,BaseType:Tn.STOCK_TRANSFER_REQUEST,BaseEntry:c.BaseEntry,BaseLine:c.BaseLine,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.FromWarehouseCode,U_ToBinLocation:c.U_ToBinLocation},d.BatchNumbers=rc("Batch",c.BatchNumbers),d.SerialNumbers=rc("Serial",c.SerialNumbers),d.StockTransferLinesBinAllocations=sc(c.StockTransferLinesBinAllocations),l.push(d)}),l.sort((c,p)=>c.BaseLine-p.BaseLine);let i={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:l};a.BPLID&&(i.BPLID=a.BPLID),console.log("StockTransfers - request: "+JSON.stringify(i)),s=await Me.post("StockTransfers",i)}catch(a){let l=await Me.patch(`StockTransferDrafts(${e.DocEntry})`,{U_DraftStatus:j.PENDING});throw console.log("resetDraftStatus - response.data: "+l),a}if(n||s){let a=Se.executeWithValues(fe.updateDraftApproversList,[o,e.U_RejectedReason,wS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===j.REJECTED&&mn.setApprovalStatus(o,e.DocEntry),s){let p=await Me.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&mn.setApprovalStatus(j.APPROVED,e.DocEntry)}let l=Se.executeWithValues(fe.selectUserInfo,e.U_OriginatorId),d=Se.executeWithValues(fe.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(d));let i;if([j.APPROVED,j.PENDING].includes(e.U_DraftStatus)?i=j.APPROVED:i=e.U_DraftStatus,Array.isArray(d)&&d.length&&Array.isArray(l)&&l.length){let p=tc.getMailBody(Dr.STOCK_TRANSFER,l[0].UserName,d[0].UserName,e.DocEntry,i);await gn(l[0].Email,tc.subject,p)}let c;o===j.APPROVED&&(c=mn.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:i,noOfDays:c})}}catch(s){next(s)}},PS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await nc(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){Me.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==j.APPROVED){let a=Se.executeWithValues(fe.selectNoOfApprovalsForDraft,[Tn.STOCK_TRANSFER,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let l=0,d;if(Array.isArray(a)&&a.length&&(l=parseInt(a[0].U_NoOfApprovals,10),d=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+l),d==="Y"){if(parseInt(s.U_ApprovalLevel)==l?s.U_DraftStatus=j.APPROVED:parseInt(s.U_ApprovalLevel)<l&&(s.U_DraftStatus=j.PENDING),await yn(s,t,n,d),s.U_DraftStatus==j.PENDING){let i=parseInt(s.U_ApprovalLevel)+1,c=Se.executeWithValues(fe.updateDraftNextApprovalLevel,[j.PENDING,s.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let p=Se.executeWithValues(fe.selectUserInfo,s.U_OriginatorId),y=Se.executeWithValues(fe.selectDraftNextApproverDetails,[s.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(y)),Array.isArray(y)&&y.length&&p.length){let g=Ir.getMailBody(Dr.STOCK_TRANSFER,p[0].UserName,s.DocEntry);await gn(y[0].Email,Ir.subject,g)}}}else{let i=Se.executeWithValues(fe.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(i));let c=0;Array.isArray(i)&&i.length&&(c=i[0].Count),console.log("noOfApprovalsReceived: "+c),parseInt(c,10)+1>=parseInt(l,10)?(s.U_DraftStatus=j.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=j.PENDING,console.log("****PENDING")),await yn(s,t,n,d)}}else s.U_DraftStatus==j.REJECTED&&(console.log("****REJECTED"),await yn(s,t,n))}catch(n){console.log("Stock Transfer Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};ac.exports={createStockTransfer:BS,updateDraft:PS}});var cc=u(lc=>{var MS=b(),FS=D(),{getRandomNo:RR,formatDate:$S,getClientHostname:WS}=q(),OR=ks(),{sendMail:UR}=Re(),{generateHash:xR,comparePassword:kS}=tr(),hn=ao(),{openSLConnection:HS,setSLCache:JS}=te(),{createUserSessionLog:qS}=Ut(),{getUserStoreInfo:GS}=Zs(),{canAssignUserToCounter:LR}=hr(),{getLocationDefaults:jS}=co();lc.validateUserLogin=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=MS.executeWithValues(FS.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{let n=s[0].Password&&(await kS(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(!n&&!a)return console.log("Password mismatch for user: "+e.body.userName),o({statusCode:401,message:"Invalid username/password!"});let l=process.env.SERVICE_LAYER_PASSWORD||e.body.password,d=await HS(e.body.userName,l);if(console.log("slCookie: "+d),JS(d),d){let i=s[0].InternalKey,{storeId:c,storeCounterId:p,counterCode:y,counterName:g,locationCode:E,storeLocation:h,storeWHCode:T}=await GS(i),N="",J=await hn.getSalesEmployeeForUser(i);Array.isArray(J)&&J.length>0&&(N=J[0].SlpCode);let A=await hn.getUserGroupByUser(i),f=Array.isArray(A)&&A.length>0&&A[0].U_GroupName?A[0].U_GroupName.trim():"";console.log("DEBUG LOGIN - DB lookup for UserId:",i,"resulted in groups:",JSON.stringify(A)),console.log("DEBUG LOGIN - Assigned userGroup:",f),e.session.userId=i,e.session.userName=e.body.userName,e.session.password=e.body.password,e.session.slCookie=d,e.session.slLoginTime=new Date,e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=f,await new Promise(I=>{e.session.save(B=>{B?(console.log("Session save error (continuing with in-memory cache):",B),I()):(console.log("Session saved successfully with slCookie and userGroup:",f),I())})});let C=await WS(e),x="";if(h){let I=await jS(h);Array.isArray(I)&&I.length>0&&(x=I[0])}let _={userId:i,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:N,storeId:c||null,storeCounterId:p||null,counterCode:y,counterName:g,locationCode:E,storeLocation:h,locationDefaults:x,clientIp:C,loginTime:$S(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},O=await qS(_);O.userGroup=f,O.userSalesEmployeeCode=N,e.session.userSessionLog=O,e.session.storeWHCode=T,e.session.userSessionLog.locationCode=E;let k={InternalKey:i,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:O,storeWHCode:T,userGroup:f,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",k.userGroup),console.log("userSalesEmployeeCode (nested):",k.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let I=hn.getUserPermissions(i);I&&(e.session.permissions=I,k.permissions=I),t.send(k)}catch(I){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(I)),t.status(500).send({message:I.message+". Unable to get User Permissions"})}}}else console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"})}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}}});var pc=u((vR,uc)=>{var zS=require("../node_modules/express/index.js"),VS=$l(),dc=ec(),BR=ic(),QS=cc(),{portalModules:Cn,permissions:Sn}=S(),{checkUserPermission:fn}=v(),br=new zS.Router;br.route("/login").post(QS.validateUserLogin);br.route("/users").patch(fn(Cn.USER,Sn.WRITE),VS.updateUserDetails);br.route("/stock-transfer-request").post(fn(Cn.STOCK_TRANSFER_REQUEST,Sn.CREATE),dc.createStockTransferRequest).patch(fn(Cn.STOCK_TRANSFER_REQUEST,Sn.WRITE),dc.updateDraft);uc.exports=br});var En=u((_R,mc)=>{var An=require("../node_modules/bunyan/lib/bunyan.js"),YS=require("path"),{formatDate:KS}=q(),XS=()=>{let e=YS.resolve(__dirname,"../../logs/pos.json"),t=process.env.NODE_ENV||"production",o=An.createLogger({dateTime:KS(new Date,"YYYY-MM-DD HH24:MI:SS"),name:"POS",streams:[{level:An.INFO,stream:process.stdout},{level:An.ERROR,type:"rotating-file",path:e,period:"1d",count:5}]});return console.log("Bunyan logger initialized.."),o},ZS=e=>{try{XS().error(e)}catch(t){console.log("Error initializing Bunyan Logger: ",JSON.stringify(t))}};mc.exports={logError:ZS}});var Tc=u((PR,gc)=>{var{httpStatusCodes:yc}=S(),ef=e=>{let t=yc.INTERNAL_SERVER_ERROR,o="Unexpected error! Contact Admin.";return e.response?(console.log("error.response.data"+JSON.stringify(e.response.data)),console.log("error.response.status:"+e.response.status),console.log("error.response.headers: "+JSON.stringify(e.response.headers)),e.response.status&&(t=e.response.status,o=e.response.data.error.message.value)):e.message?o=e.message:e.request?console.log("error.request: "+JSON.stringify(e.request)):console.log("Catch else - Error",e.message),e.code&&(t=e.code>=300?e.code:yc.INTERNAL_SERVER_ERROR),{statusCode:t,message:o}};gc.exports={serviceLayerErrorHandler:ef}});var Cc=u((MR,hc)=>{var{logError:tf}=En(),{serviceLayerErrorHandler:of}=Tc(),{httpStatusCodes:rf}=S(),sf=(e,t,o,r)=>{console.error(e);let{statusCode:s,message:n}=of(e);s||(s=e.statusCode||rf.INTERNAL_SERVER_ERROR),n||(n=e.detail?e.detail:e.message?e.message:e),tf({method:t.method,url:t.url,statusCode:s,message:n,stack:e.stack,requestBody:t.body,requestParams:t.params,requestQuery:t.query}),o.status(s).json({message:n})};hc.exports=sf});var Ac=u(fc=>{var{serviceLayerAPI:Sc}=Q(),{portalModules:nf,serviceLayerApiURIs:af}=S(),lf=nf.BUSINESS_PARTNER,cf=af[lf];fc.createBusinessPartner=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** BusinessPartner request: "+JSON.stringify(e)),Sc.defaults.headers.Cookie=t;let o=await Sc.post(cf,e);return o.data?o.data:void 0}catch(o){throw console.log("Create BusinessPartner error: "+o),o}}});var Nc=u(($R,Ec)=>{var{getSLConnection:df}=te(),uf=Ac(),pf=async(e,t,o)=>{try{let r=await df(e),s=await uf.createBusinessPartner(e.body,r);t.status(200).send({CardCode:s.CardCode})}catch(r){console.log("create Biz Partner: "+JSON.stringify(r)),o(r)}};Ec.exports={create:pf}});var bc=u((WR,Dc)=>{var mf=require("../node_modules/express/index.js"),yf=Nc(),{portalModules:gf,permissions:Tf}=S(),{checkUserPermission:hf}=v(),Ic=new mf.Router;Ic.route("/").post(hf([gf.INVOICE],Tf.CREATE),yf.create);Dc.exports=Ic});var Dn=u(Rr=>{var{dataSource:Nn}=ie(),In=Gs(),Rc="cashDenominationId",Cf="dateTime";Rr.createCashDenomination=async e=>{try{return await Nn.getRepository(In).save(e)}catch(t){throw t}};Rr.getCashDenominations=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Rc]=e.id,delete e.id);try{let o=Nn.getRepository(In);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Cf]:"ASC"}})}catch(o){throw o}};Rr.deleteCashDenominations=async e=>{try{return await Nn.getRepository(In).delete({[Rc]:e})}catch(t){throw t}}});var Oc=u(Or=>{var bn=Dn(),Sf="trxType";Or.create=async(e,t,o)=>{if(!e.body||!e.body[Sf]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await bn.createCashDenomination(e.body);t.send(r)}catch(r){console.error("Error creating CashDenomination!"),o(r)}};Or.findAll=async(e,t,o)=>{try{let r=await bn.getCashDenominations(e.query);t.send(r)}catch(r){console.error("Error getting CashDenomination!"),o(r)}};Or.delete=async(e,t,o)=>{try{let r=await bn.deleteCashDenominations(e.params.id);t.send(r)}catch(r){console.error("Error deleting CashDenomination!"),o(r)}}});var xc=u((JR,Uc)=>{var ff=require("../node_modules/express/index.js"),Rn=Oc(),{portalModules:On,permissions:Un}=S(),{checkUserPermission:xn}=v(),Ur=new ff.Router;Ur.post("/",xn(On.INVOICE,Un.CREATE),Rn.create);Ur.get("/",xn(On.INVOICE,Un.READ),Rn.findAll);Ur.delete("/:id",xn(On.INVOICE,Un.CANCEL),Rn.delete);Uc.exports=Ur});var wc=u(Lc=>{var{dbCreds:Af}=D();Lc.creditCards=`SELECT T0."CreditCard", T0."CardName", T0."AcctCode", T0."CompanyId" "SurchargeAccount",
    T0."Phone" "SurchargePercentage"
  FROM ${Af.CompanyDB}.OCRC T0`});var vc=u(Bc=>{var Ef=b(),Nf=wc();Bc.getCreditCards=()=>{try{return Ef.executeWithValues(Nf.creditCards)}catch(e){throw console.log("getCreditCards - controller - error: "+JSON.stringify(e.message)),e}}});var Pc=u(_c=>{var{enableLocationBasedCreditCardAccount:If}=S(),Df=vc(),{getLocationDefaults:bf}=co();_c.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Df.getCreditCards();if(If&&e.query.location){let s=bf(e.query.location);r&&Array.isArray(s)&&s.length>0&&r.forEach(n=>{n.AcctCode=s[0].AccountCode})}t.send(r)}catch(r){console.log("Credit Card - controller - error: "+JSON.stringify(r.message)),o(r)}}});var $c=u((zR,Fc)=>{var Rf=require("../node_modules/express/index.js"),Mc=new Rf.Router,Of=Pc(),{checkUserPermission:Uf}=v(),{portalModules:xf,permissions:Lf}=S();Mc.route("/").get(Uf(xf.INVOICE,Lf.READ),Of.get);Fc.exports=Mc});var Wc=u(se=>{var{dbCreds:R}=D();se.invoice=`SELECT DISTINCT T0."DocNum", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocDueDate", T0."BPLId" AS "branch",
    T0."CardCode", T0."CardName", T2."Cellular", T0."NumAtCard", T2."LicTradNum", T2."QryGroup36", T4."U_Change" as "Change",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."U_PaymentType", T0."SlpCode" "SalesPersonCode",
    T5."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location", T0."U_IsReprinted",
    T0."U_AmtTender", T0."U_DeliveryApp"
      FROM ${R.CompanyDB}.OINV T0
      INNER JOIN ${R.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
      LEFT JOIN ${R.CompanyDB}.OCRD T2 ON T0."CardCode" = T2."CardCode"
      LEFT JOIN ${R.CompanyDB}.RCT2 T3 ON T0."DocEntry" = T3."DocEntry"
      LEFT JOIN ${R.CompanyDB}.ORCT T4 ON T3."DocNum" = T4."DocEntry"
      LEFT JOIN ${R.CompanyDB}.OSLP T5 ON T0."SlpCode" = T5."SlpCode"
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"`;se.itemListForInvoice=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", IFNULL(TO_VARCHAR(T1."U_DocNum"), (SELECT MIN(B."BatchNum") FROM ${R.CompanyDB}.IBT1 B WHERE B."BaseEntry" = T1."DocEntry" AND B."BaseLinNum" = T1."LineNum" AND B."BaseType" = 13)) AS "BundleNo", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceAfVAT" as "NetUnitPrice", T1."PriceBefDi" "PriceBeforDiscount", T1."U_DeliveryApp",
    T1."TreeType", ITM."TreeType" AS "ItemTreeType",
    (SELECT E."ItmsGrpNam" FROM  ${R.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod",
    IFNULL((SELECT SUM(S1."U_NoOfPcs") FROM  ${R.CompanyDB}."@OSBS" S0
        INNER JOIN  ${R.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Pcs",
    IFNULL((SELECT SUM(S1."U_SelQty") FROM  ${R.CompanyDB}."@OSBS" S0
        INNER JOIN  ${R.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Volume",
     T1."CogsOcrCod" AS "COGSBranch",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM ${R.CompanyDB}.SPP1 P WHERE P."ItemCode" = ITM."ItemCode" 
          AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied",
      T0."U_IsReprinted"
  FROM ${R.CompanyDB}.OINV T0
    INNER JOIN ${R.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${R.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;se.invoiceFircaURL=`SELECT T0."DocNum", T0."U_VerifyURL"
    FROM ${R.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;se.invoiceAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${R.CompanyDB}.OINV T0
  WHERE T0."DocEntry" = ?`;se.invoiceUDFData=`SELECT T0."DocNum", T0."U_InvCount", T0."U_SDCTime", T0."U_SDCInvNum", T0."U_VehicleNo", T0."U_TINNO"
    FROM ${R.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;se.updateTransRef=`UPDATE ${R.CompanyDB}.OCRH T0
    SET T0."TransRef" = ? 
      WHERE T0."RctAbs" = ?;`;se.updateInvoiceItem=`UPDATE ${R.CompanyDB}.INV1 T1 SET
    T1."U_ReturnedQty" = ?, T1."U_RemainingOpenQty" = ?
  WHERE T1."DocEntry" = ? AND T1."LineNum" = ?`;se.updateInvoiceReprintStatus=`UPDATE ${R.CompanyDB}.OINV T0 SET
    T0."U_IsReprinted" = 'Y'
  WHERE T0."DocEntry" = ?`;se.invoiceDeliveyCodeData=`SELECT T0."DeliveryCode", T0."DocNum",
    FROM ${R.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;se.updateSalesBatchSelectionDocNum=`UPDATE ${R.CompanyDB}.INV1 T1 SET
    T1."U_DocNum" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ? AND T1."LineNum" = ?`;se.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${R.CompanyDB}.OINV T0
  WHERE T0."U_POS_TransactionID" = ?`;se.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${R.CompanyDB}.OADP T0`;se.getTimberItems=`SELECT DISTINCT I1."ItemCode", I1."WhsCode", I1."LineNum" + 1 AS "SNo", T9."BatchNum", 
    T9."Quantity" AS "SelectedQty", T25."U_Length", T25."U_Height", T25."U_Width",
    (T9."Quantity" / ((T25."U_Height" / 1000) * (T25."U_Width" / 1000) * T25."U_Length")) AS "NoofPieces",
    ITM."ItemName" AS "Description", T10."WhsName", T10."Street", T10."Block", T10."City"
      FROM ${R.CompanyDB}."IBT1" T9
      INNER JOIN ${R.CompanyDB}."OIBT" T25 
          ON T9."BatchNum" = T25."BatchNum" AND T25."ItemCode" = T9."ItemCode"
      LEFT JOIN ${R.CompanyDB}."@SBS1" SBS1 
          ON SBS1."U_Batch" = T25."BatchNum"
      INNER JOIN ${R.CompanyDB}."INV1" I1 
          ON I1."DocEntry" = T9."BaseEntry" AND I1."ItemCode" = T9."ItemCode"
      INNER JOIN ${R.CompanyDB}."OINV" I0 
          ON I1."DocEntry" = I0."DocEntry"
      LEFT JOIN ${R.CompanyDB}."OITM" ITM 
          ON ITM."ItemCode" = I1."ItemCode"
      LEFT JOIN ${R.CompanyDB}."OWHS" T10 
          ON I1."WhsCode" = T10."WhsCode"
      WHERE 
          I0."DocEntry" = ?
          AND ITM."ItmsGrpCod" = '156'`;se.getSalesEmployeeDiscount=`SELECT T3."SalesDisc"
    FROM ${R.CompanyDB}.OSLP T0
    LEFT JOIN ${R.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${R.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."SlpCode" = ?`});var Hc=u(kc=>{var wf=require("../node_modules/axios/index.js");kc.getQRCodeDataURI=async e=>{try{let t="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",o=await wf.get(`${t}${encodeURIComponent(e)}`,{responseType:"arraybuffer"});return`data:image/png;base64,${Buffer.from(o.data,"binary").toString("base64")}`}catch(t){throw t}}});var je=u(F=>{var ne=b(),{buildHeaderRecQuery:Bf,buildRowLevelQuery:vf}=_e(),ae=Wc(),{getQRCodeDataURI:_f}=Hc(),{serviceLayerAPI:YR}=Q(),{getSLConnection:Jc}=te(),qc=require("../node_modules/axios/index.js"),Pf=require("https");F.getInvoiceByDocEntry=async(e,t=null)=>{try{if(!e&&e!==0)throw new Error("Invalid docEntry passed to getInvoiceByDocEntry");let r=`${process.env.SERVICE_LAYER_API_BASE_URL||"http://172.18.30.114:50001/b1s/v1"}/Invoices(${e})`,s=new Pf.Agent({rejectUnauthorized:!1}),n=await Jc(t);if(!n)throw new Error("Could not retrieve SL Cookie");let a;try{return console.log(`[Invoice Helper] Fetching status: ${r}`),a=await qc({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:n},timeout:15e3}),a.data}catch(l){if(l.response?.status===401){console.log("\u{1F501} SAP Session expired \u2014 re-logging and retrying...");let d=await Jc(t);return(await qc({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:d},timeout:15e3})).data}throw l}}catch(o){let r=o.response?.data?.error?.message?.value||o.message;throw console.log("getInvoiceByDocEntry - SL Error:",r),new Error(r)}};F.getInvoices=e=>{try{let t=Bf(ae.invoice,e,['T0."U_CODCntName"']);return console.log("getSalesQuotation- sql: ",t),ne.executeWithValues(t)}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};F.updateInvoiceReprintStatus=e=>{try{let t=ne.executeWithValues(ae.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};F.getItemDetails=e=>{try{let t=vf(ae.itemListForInvoice,e);return{itemsList:ne.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};F.getTimberItemDetails=e=>{try{let t=ae.getTimberItems;return{itemsList:ne.executeWithValues(t,[e])}}catch(t){throw console.log("getTimberItemDetails - controller - error: "+JSON.stringify(t.message)),t}};F.getAttachmentEntry=e=>{try{let t=ne.executeWithValues(ae.invoiceAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};F.getFircaInfo=e=>{try{let t=ne.executeWithValues(ae.invoiceFircaURL,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getFircaInfo - controller - error: "+JSON.stringify(t.message)),t}};F.getDeliveryInfo=e=>{try{let t=ne.executeWithValues(ae.invoiceDeliveyCodeData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getDeliveryInfo - controller - error: "+JSON.stringify(t.message)),t}};F.getUDFInfo=e=>{try{let t=ne.executeWithValues(ae.invoiceUDFData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUDFInfo - controller - error: "+JSON.stringify(t.message)),t}};F.updateTransRef=(e,t)=>{try{return ne.executeWithValues(ae.updateTransRef,[t,e])}catch(o){throw console.log("updateTransRef - controller - error: "+JSON.stringify(o.message)),o}};F.getFircaQRCodeDataURI=async e=>{try{let t=F.getFircaInfo(e);console.log("getFircaQRCode - url: "+JSON.stringify(t));let o;return t&&t.U_VerifyURL&&(o=await _f(t.U_VerifyURL)),o}catch(t){throw console.log("getFircaQRCode - helper: "+JSON.stringify(t.message)),t}};F.getDeliveryCode=async e=>{try{let t=F.getDeliveryInfo(e);return console.log("get Delivery Code: "+JSON.stringify(t)),t}catch(t){throw console.log("getDeliveryCode - helper: "+JSON.stringify(t.message)),t}};F.getUDFData=async e=>{try{let t=F.getUDFInfo(e);return console.log("get UDF Data: "+JSON.stringify(t)),t}catch(t){throw console.log("get UDF Data - helper: "+JSON.stringify(t.message)),t}};F.updateRemainingQuantity=e=>{try{if(Array.isArray(e)&&e.length>0){let t=e.map(r=>[r.U_ReturnedQty,r.U_RemainingOpenQty,r.DocEntry,r.LineNum]);console.log("updateRemainingQuantity- updateRequest: "+JSON.stringify(t));let o=ne.executeBatchInsertUpdate(ae.updateInvoiceItem,t);return console.log("updateRemainingQuantity- response: "+JSON.stringify(o)),o}return null}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};F.updateReprint=e=>{try{if(e){let t=ne.executeWithValues(ae.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(t.message)),t}};F.updateSalesBatchSelection=(e,t)=>{try{if(console.log("updateSalesBatchSelection %s %s %s %s",e.DocNum,t,e.U_ItemCode,e.U_LineNum),e){let o=ne.executeWithValues(ae.updateSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode,e.U_LineNum]);return console.log("updateSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(o.message)),o}};F.getUniqueId=e=>{try{let t=ne.executeWithValues(ae.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(t.message)),t}};F.getAttachmentPath=()=>{try{let e=ne.executeWithValues(ae.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentPath - Helper - error: "+JSON.stringify(e.message)),e}};F.getSalesEmployeeDiscount=e=>{try{let t=ne.executeWithValues(ae.getSalesEmployeeDiscount,[e]);return Array.isArray(t)&&t.length>0?t[0].SalesDisc:0}catch(t){return console.log("getSalesEmployeeDiscount - helper - error: "+JSON.stringify(t.message)),0}}});var Gc=u(ct=>{var Pt=je();ct.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Pt.getInvoices(e.query);t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};ct.updateReprint=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));let{DocEntry:r,U_IsReprinted:s}=e.body;try{let n=Pt.updateInvoiceReprintStatus(r,s);t.send({message:"Invoice Reprint Status Updated Successfully",success:!0})}catch(n){console.log("getInvoice - controller - error: "+JSON.stringify(n.message)),o(n)}};ct.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Pt.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};ct.getFircaQRCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await Pt.getFircaQRCodeDataURI(e.query.docNum);t.send(r)}catch(r){console.log("getFircaCode - controller - error: "+JSON.stringify(r.message)),o(r)}};ct.getDeliveryCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await Pt.getDeliveryCode(e.query.docNum);console.log("getDeliveryCode - Response: "+JSON.stringify(r)),t.send({DeliveryCode:r.DeliveryCode})}catch(r){console.log("getDeliveryCode - controller - error: "+JSON.stringify(r.message)),o(r)}};ct.checkDeliveryConfirmation=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.body));try{let r=!1,s=await Pt.getDeliveryCode(e.body.docNum);console.log("checkDeliveryConfirmation - Response: "+JSON.stringify(s)),e.body.DeliveryCode===s.DeliveryCode&&(r=!0),t.send({isValid:r})}catch(r){console.log("checkDeliveryConfirmation - controller - error: "+JSON.stringify(r.message)),o(r)}}});var zc=u((ZR,jc)=>{var Mf=require("../node_modules/express/index.js"),dt=new Mf.Router,Mt=Gc(),{checkUserPermission:Ft}=v(),{portalModules:$t,permissions:Wt}=S();dt.route("/").get(Ft($t.INVOICE,Wt.READ),Mt.get);dt.route("/reprint").patch(Ft($t.INVOICE,Wt.READ),Mt.updateReprint);dt.route("/items").get(Ft($t.INVOICE,Wt.READ),Mt.getItems);dt.route("/firca-code").get(Ft($t.INVOICE,Wt.READ),Mt.getFircaQRCode);dt.route("/delivery-code").get(Ft($t.INVOICE,Wt.READ),Mt.getDeliveryCode);dt.route("/delivery-confirmation").post(Ft($t.INVOICE,Wt.READ),Mt.checkDeliveryConfirmation);jc.exports=dt});var xr=u(Vc=>{var Ff=require("../node_modules/axios/index.js"),$f=require("https");Vc.submitInvoicetoFirca=async(e,t,o)=>{try{if(!process.env.FIRCA_API_BASE_URL)return console.log("FIRCA_API_BASE_URL is not defined. Skipping Firca integration."),!1;let r="";o=="Invoice"?r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_INVOICE_URI:r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_SALES_QUOTATION_URI;let s={DocEntry:e,CompanyCode:t},n=await Ff.post(r,s,{httpsAgent:new $f.Agent({rejectUnauthorized:!1}),auth:{username:process.env.FIRCA_USERNAME,password:process.env.FIRCA_PASSWORD}});return console.log("submitInvoicetoFirca - response: "+JSON.stringify(n.data)),n.data.statusCode===1}catch(r){throw r}}});var Yc=u(Qc=>{var{enableFircaIntegration:Wf}=S(),{submitInvoicetoFirca:kf}=xr(),{getFircaQRCodeDataURI:Hf,getUDFData:Jf,updateReprint:qf,getTimberItemDetails:Gf}=je();Qc.createFirca=async(e,t,o)=>{try{if(e.body.invoice){let r={},s=e.body.invoice;console.log("req.query"+JSON.stringify(e.body.invoice));let n=s.CompanyCode?s.CompanyCode:"",a=s.DocEntry?s.DocEntry:"",l=s.DocNum?s.DocNum:"";if(Wf&&await kf(a,n,"Invoice")){let c=await Hf(l);console.log("qrCodeDataURI",c),r.qrCode=c}let d=await Jf(l);if(d&&(r.InvCount=d.U_InvCount,r.SDCTime=d.U_SDCTime,r.SDCInvNum=d.U_SDCInvNum,r.VehicleNo=d.U_VehicleNo,qf(a)&&console.log("Reprint Updated Successfully!")),a){let i=Gf(a);r.timItemList=i}t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'Firca' property!"})}catch(r){console.log("create Invoice: "+JSON.stringify(r)),o(r)}}});var Zc=u((oO,Xc)=>{var jf=require("../node_modules/express/index.js"),Kc=new jf.Router,zf=Yc(),{checkUserPermission:Vf}=v(),{portalModules:Qf,permissions:Yf}=S();Kc.route("/").post(Vf(Qf.INVOICE,Yf.READ),zf.createFirca);Xc.exports=Kc});var wr=u((kt,sd)=>{var{serviceLayerAPI:xe}=Q(),{portalModules:td,serviceLayerApiURIs:od,attachmentPath:Kf}=S(),Xf=je(),Zf=td.INVOICE,wn=od[Zf],ed=td.ATTACHMENTS,Ln=require("fs"),Lr=require("path"),rO=require("../node_modules/pdfkit/js/pdfkit.js"),rd=require("../node_modules/multer/index.js"),eA=rd.memoryStorage(),tA=rd({storage:eA});kt.createInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),xe.defaults.headers.Cookie=t;let o=await xe.post(wn,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Invoice error: "+o),o}};kt.updateInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),xe.defaults.headers.Cookie=t;let o=await xe.patch(`${wn}(${e.DocEntry})`,e);return o&&o.status===204?(console.log("*** Invoice updated successfully. No content in response."),{message:"Invoice updated successfully.",status:200}):(console.warn("*** Unexpected response status:",o.status),{message:"Unexpected response from server.",status:o.status})}catch(o){throw console.error("Create Invoice error:",o.message),console.error(o.stack),o}};kt.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),xe.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=Lr.extname(s).replace(".",""),a=Lr.basename(s,"."+n),l=s,d=Lr.join(Kf,"assets/attachment");Ln.existsSync(d)||Ln.mkdirSync(d,{recursive:!0});let i=Lr.join(d,s);console.log("fullFilePath: *** "+i+" = "+r),Ln.writeFileSync(i,r),console.log(`*** File saved successfully at ${i}`);let c={Attachments2_Lines:[{FileExtension:n,SourcePath:d.replace(/\\/g,"/"),UserID:e.session.userId,FileName:a}]},p={},y,g={Accept:"application/json","Content-Type":"application/json"},E=await Xf.getAttachmentEntry(t||e.body.DocEntry);if(console.log("Invoice response",JSON.stringify(E)),E&&E?.AtcEntry!==null){if(y=E?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(y)),p=await xe.patch(`${ed}(${y})`,c),p&&p.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),p=await xe.post(ed,c,{headers:g}),console.log("Attachment Post API Called"),p.data){console.log("Attachment Post Response:"+JSON.stringify(p.data)),y=p.data.AbsoluteEntry;let h={AttachmentEntry:y},T=await xe.patch(`${wn}(${t||e.body.DocEntry})`,h);if(T&&T.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",p.status),{message:"Unexpected response from server.",status:p.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};var sO=je(),oA=require("../node_modules/form-data/lib/form_data.js"),rA=require("../node_modules/axios/index.js"),sA=require("https");kt.createAttachmentEntry=async(e,t)=>{try{if(!e.file)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.file.originalname}`);let o=new oA;o.append("file",e.file.buffer,{filename:e.file.originalname,contentType:e.file.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await rA.post(s,o.getBuffer(),{headers:n,httpsAgent:new sA.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachmentEntry (Direct Upload) error:",JSON.stringify(r)),o.response&&console.error(`*** status: ${o.response.status}`),null}};kt.linkAttachmentToDocument=async(e,t,o,r)=>{try{let s=od[e];if(!s)throw new Error(`Unknown docType: ${e}`);xe.defaults.headers.Cookie=r;let n={AttachmentEntry:o};console.log(`*** Linking Attachment ${o} to ${e} (${s}) DocEntry ${t}...`);let a=await xe.patch(`${s}(${t})`,n);return a.status===204?(console.log(`*** Successfully linked attachment to ${e} ${t}`),!0):(console.warn(`*** Unexpected response during linking: ${a.status}`),!1)}catch(s){return console.error(`linkAttachmentToDocument error linking to ${e}:`,s.response?.data||s.message),!1}};sd.exports.upload=tA});var ad=u(Bn=>{var{serviceLayerAPI:Br}=Q(),{portalModules:nA,serviceLayerApiURIs:aA}=S(),iA=nA.INCOMING_PAYMENT,nd=aA[iA];Bn.createIncomingPayment=async(e,t)=>{try{e.DocObjectCode="bopot_IncomingPayments",console.log("*** IncomingPayment request: "+JSON.stringify(e)),console.log("*** [DEBUG] IncomingPayment final request payload: "+JSON.stringify(e)),Br.defaults.headers.Cookie=t;let o=await Br.post(nd,e);return console.log(`Create IncomingPayment response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create IncomingPayment error: "+o),o}};Bn.updatePaymentAttachment=async(e,t,o)=>{try{if(console.log("*** IncomingPayment Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Payment Attachment: No file uploaded!",status:200,success:!1};let s=await wr().createAttachmentEntry(e,o);if(s){let n={Attachments2_Lines:[{FileName:require("path").basename(e.file.originalname,require("path").extname(e.file.originalname)),FileExtension:require("path").extname(e.file.originalname).replace(".",""),SourcePath:S().attachmentPath.replace(/\\/g,"/")}]};if(Br.defaults.headers.Cookie=o,(await Br.patch(`${nd}(${t})`,n)).status===204)return console.log("*** IncomingPayment Attachment linked successfully."),{message:"Payment Attachment updated successfully.",status:200,absEntry:s}}return{message:"Failed to link attachment",status:500}}catch(r){throw console.error("Payment Attachment upload error:",r.response?.data||r.message),r}}});var ho=u(To=>{var{serviceLayerAPI:Fe}=Q(),{portalModules:lA}=S(),cA=b(),{dbCreds:dA}=D(),{getInvoiceByDocEntry:uA}=je(),go=lA.OSBS;To.getSalesBatchSelection=async(e,t,o)=>{try{Fe.defaults.headers.Cookie=o;let r=await Fe.get(`${go}?$filter=U_InvNo eq '${e}' and U_ItemCode eq '${t}'`);if(Array.isArray(r?.data?.value)&&r.data.value.length>0){let s=r.data.value[0],n={};try{let a=`SELECT "DocEntry" FROM ${dA.CompanyDB}.OINV WHERE "DocNum" = ?`,l=cA.executeWithValues(a,[e]);if(l&&l.length>0){let d=l[0].DocEntry;console.log(`[getSalesBatchSelection] Fetching Invoice ${d} (DocNum ${e}) for bin enrichment...`);let i=await uA(d,{headers:{Cookie:o}});i&&Array.isArray(i.DocumentLines)&&i.DocumentLines.forEach(c=>{c.ItemCode===t&&Array.isArray(c.DocumentLinesBinAllocations)&&(c.DocumentLinesBinAllocations.forEach(p=>{p.BinAbsEntry&&(n[p.SerialAndBatchNumbersBaseLine]=n[p.SerialAndBatchNumbersBaseLine]||{})}),Array.isArray(c.BatchNumbers)&&c.BatchNumbers.forEach((p,y)=>{let g=c.DocumentLinesBinAllocations.find(E=>E.SerialAndBatchNumbersBaseLine===y);g&&(n[p.BatchNumber]={BinAbsEntry:g.BinAbsEntry,BinCode:""})}))})}}catch(a){console.warn("[getSalesBatchSelection] Bin enrichment failed:",a.message)}if(Array.isArray(s.SBS1Collection)){let a=(i,c,p,y)=>`${i}_${parseFloat(c)}_${parseFloat(p)}_${parseFloat(y).toFixed(5)}`,l=new Set,d=[];s.SBS1Collection.forEach(i=>{let c=a(i.U_Batch,i.U_Width,i.U_Height,i.U_Length);if(!l.has(c)){l.add(c);let p=n[i.U_Batch];d.push({...i,BinAbsEntry:p?.BinAbsEntry||null,BinCode:p?.BinCode||""})}}),console.log(`[getSalesBatchSelection] Deduplicated and enriched SBS1Collection: ${d.length} rows`),s.SBS1Collection=d}return s}return null}catch(r){throw console.log("Get SalesBatchSelection error: "+r),r}};To.updateSalesBatchSelection=async(e,t)=>{try{return Fe.defaults.headers.Cookie=t,(await Fe.patch(`${go}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update SalesBatchSelection error: "+o),o}};To.updateOSBSForQuotation=async(e,t,o)=>{let r=[],s=String(e);console.log(`[updateOSBSForQuotation] Starting update for SQ DocNum: ${s}, items: ${t.length}`);for(let n of t)try{Fe.defaults.headers.Cookie=o;let a=`${go}?$filter=U_InvNo eq '${s}' and U_ItemCode eq '${n.U_ItemCode}'`;console.log(`[updateOSBSForQuotation] GET: ${a}`);let l=await Fe.get(a);if(console.log(`[updateOSBSForQuotation] GET result count: ${l?.data?.value?.length}`),Array.isArray(l?.data?.value)&&l.data.value.length>0){let d=l.data.value[0];console.log("[updateOSBSForQuotation] Existing OSBS record:",JSON.stringify(d,null,2));let i=Array.isArray(d.SBS1Collection)?d.SBS1Collection:[],c=n.SBS1Collection||[],p=(C,x,_,O)=>`${C}_${parseFloat(x)}_${parseFloat(_)}_${parseFloat(O).toFixed(5)}`,y=new Map,g=[],E=[];i.forEach((C,x)=>{let _=p(C.U_Batch,C.U_Width,C.U_Height,C.U_Length);y.has(_)?E.push(x):(y.set(_,x),g.push(x))}),console.log(`[updateOSBSForQuotation] Existing rows: ${i.length}, Canonical: ${g.length}, Duplicates to zero: ${E.length}`);let h={};c.forEach(C=>{let x=p(C.U_Batch,C.U_Width,C.U_Height,C.U_Length);h[x]||(h[x]={pcs:0}),h[x].pcs+=parseInt(C.U_NoOfPcs)||1});let T=i.map((C,x)=>{let _=p(C.U_Batch,C.U_Width,C.U_Height,C.U_Length),O=y.get(_)===x,k=Math.round(parseFloat(C.U_AvlPcs)||0),I=parseFloat(C.U_AvlQty)||0;if(!O||!h[_]||h[_].pcs<=0)return{LineId:C.LineId,U_Batch:C.U_Batch,U_Width:C.U_Width,U_Height:C.U_Height,U_Length:C.U_Length,U_AvlQty:C.U_AvlQty,U_NoOfPcs:0,U_SelQty:0,U_AvlPcs:C.U_AvlPcs,U_BalPcs:k,U_BalAvlQty:I};let B=h[_],U=Math.min(B.pcs,k);B.pcs-=U;let ge=I/(k||1),et=U===k?I:parseFloat((U*ge).toFixed(5));return{LineId:C.LineId,U_Batch:C.U_Batch,U_Width:C.U_Width,U_Height:C.U_Height,U_Length:C.U_Length,U_AvlQty:C.U_AvlQty,U_NoOfPcs:U,U_SelQty:et,U_AvlPcs:C.U_AvlPcs,U_BalPcs:k-U,U_BalAvlQty:parseFloat((I-et).toFixed(5))}});Object.keys(h).forEach(C=>{h[C].pcs>0&&console.warn(`[updateOSBSForQuotation] Spec ${C} still has ${h[C].pcs} pieces unmet after assignment.`)});let N=T.reduce((C,x)=>C+x.U_NoOfPcs,0),J=Number(T.reduce((C,x)=>C+x.U_SelQty,0).toFixed(5)),A=n.U_TotalQty||J,f={U_Quantity:N||d.U_Quantity||1,U_TotalQty:A,U_LineNum:d.U_LineNum,U_WhsCode:n.U_WhsCode||d.U_WhsCode,SBS1Collection:T};console.log(`[updateOSBSForQuotation] PATCHing OSBS DocEntry: ${d.DocEntry}, U_Qty: ${f.U_Quantity}, U_TotalQty: ${f.U_TotalQty}, Canonical: ${g.length}, ZeroedDupes: ${E.length}`),await Fe.patch(`${go}(${d.DocEntry})`,f),r.push({updated:!0,DocEntry:d.DocEntry,item:n.U_ItemCode}),console.log(`[updateOSBSForQuotation] PATCH success for DocEntry: ${d.DocEntry}`)}else console.warn(`[updateOSBSForQuotation] No OSBS found for SQ DocNum: ${s}, Item: ${n.U_ItemCode}. Cannot update.`),r.push({updated:!1,item:n.U_ItemCode})}catch(a){let l=a.response?.data?.error?.message?.value||a.message;console.error(`[updateOSBSForQuotation] Error for SQ ${s}, Item ${n.U_ItemCode}: ${l}`),r.push({updated:!1,item:n.U_ItemCode,error:l})}return r};To.createSalesBatchSelection=async(e,t,o,r)=>{console.log("*** SalesBatchSelection request: "+JSON.stringify(e));let s=Array.isArray(e)?e:[e],n=[];for(let a of s)try{Fe.defaults.headers.Cookie=r,a.U_InvNo=o;let l=await Fe.post(go,a),{DocNum:d,U_LineNum:i,U_ItemCode:c}=l.data;console.log("*** SalesBatchSelection response:**** "+JSON.stringify(l.data)),n.push({DocNum:d,U_LineNum:i??a.U_LineNum,U_ItemCode:c})}catch(l){console.error(`Error creating OSBS record for item ${a.U_ItemCode||a.ItemCode}:`,l.response?.data?.error?.message?.value)}return n}});var cd=u(ld=>{var{serviceLayerAPI:id}=Q(),{portalModules:pA,serviceLayerApiURIs:mA}=S(),yA=pA.JOURNAL_ENTRY,gA=mA[yA];ld.createJournalEntry=async(e,t)=>{try{console.log("*** JournalEntry request: "+JSON.stringify(e)),id.defaults.headers.Cookie=t;let o=await id.post(gA,e);return o.data?o.data:void 0}catch(o){throw console.log("Create JournalEntry error: "+o),o}}});var fd=u((pO,Sd)=>{var{getSLConnection:_n,invalidateSLCache:TA}=te(),ut=wr(),gd=ad(),Td=ho(),{updateOSBSForQuotation:hA}=Td,CA=cd(),lO=Dn(),{formatDate:hd}=q(),{trxTypes:cO,defaultBranchId:dO,fircaIntegrationWaitTime:uO,enableFircaIntegration:dd,objectCodes:ud,portalModules:_r,enableStoreBasedNumbering:vr,isHomeDeliveryEnabled:pd}=S(),{submitInvoicetoFirca:SA}=xr(),{getFircaQRCodeDataURI:fA,getUDFData:md,updateSalesBatchSelection:AA,updateTransRef:EA,getUniqueId:NA,getItemDetails:IA,getTimberItemDetails:DA,getSalesEmployeeDiscount:bA}=je(),{getNumberingSeries:yd}=Er(),vn=new Map,RA=async(e,t,o)=>{let r=null;try{if(typeof e.body.request=="string"){let s=JSON.parse(e.body.request);Object.assign(e.body,s)}if(typeof e.body.invoice=="string"&&(e.body.invoice=JSON.parse(e.body.invoice)),typeof e.body.incomingPayment=="string"&&(e.body.incomingPayment=JSON.parse(e.body.incomingPayment)),typeof e.body.salesBatchSelection=="string"&&(e.body.salesBatchSelection=JSON.parse(e.body.salesBatchSelection)),typeof e.body.journalEntry=="string"&&(e.body.journalEntry=JSON.parse(e.body.journalEntry)),e.body.invoice){if(r=e.body.invoice.Unique,r){if(vn.has(r))return console.error(`[BACKEND] Concurrent request detected for TransactionID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});vn.set(r,!0)}console.time("2. [BACKEND] Total Invoice Create API Duration");let s={},n="",a={};console.time("2.1 [BACKEND] Parallel DB Queries");let l=_n(e),d,i=e.body.invoice,c=parseFloat(e.session.userSessionLog?.salesDisc||0);if(c===0&&i.SalesPersonCode)try{let A=bA(i.SalesPersonCode);A>0&&(console.log(`[BACKEND] Discount Fallback: Using SalesPerson ${i.SalesPersonCode} limit: ${A}%`),c=parseFloat(A))}catch(A){console.error("[BACKEND] Discount Fallback failed:",A.message)}if(Array.isArray(i.DocumentLines))for(let A of i.DocumentLines){let f=parseFloat(A.DiscountPercent||0);if(f>c)return console.error(`[BACKEND] Discount Limit Violation: Item ${A.ItemCode} has ${f}% but user only allowed ${c}%`),t.status(400).send({message:`Discount Limit is Exceeded: ${c}% (Item: ${A.ItemCode})`})}let p=i.CompanyCode?i.CompanyCode:"";typeof pd<"u"&&pd&&i.U_IsHomeDelivery==="Y"&&(d=Math.floor(1e5+Math.random()*9e5),i.U_DeliveryCode=d);let y=Promise.resolve(null);typeof vr<"u"&&vr&&(y=yd(ud[_r.INVOICE],e.session.userSessionLog.storeLocation));let g=NA(i.Unique),E=Promise.resolve(null);e.body.incomingPayment&&typeof vr<"u"&&vr&&(E=yd(ud[_r.INCOMING_PAYMENT],e.session.userSessionLog.storeLocation));let[h,T,N,J]=await Promise.all([l,y,g,E]);if(console.timeEnd("2.1 [BACKEND] Parallel DB Queries"),T&&(console.log("seriesResponse series:",T.Series),i.Series=T.Series),N?.DocNum)console.log("uniqueResponse unique:",N?.DocNum),s.DocNum=N.DocNum,s.DocEntry=N.DocEntry,s.isExist=!0;else{if(e.body.sqDocNum&&Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){console.log("[BACKEND] Updating OSBS for source SQ DocNum:",e.body.sqDocNum);try{let f=await hA(e.body.sqDocNum,e.body.salesBatchSelection,h);console.log("[BACKEND] OSBS update result:",JSON.stringify(f))}catch(f){console.warn("[BACKEND] OSBS pre-update failed (non-fatal):",f.message)}}Array.isArray(i.DocumentLines)&&i.DocumentLines.forEach(f=>{if(Array.isArray(f.BatchNumbers)&&f.BatchNumbers.length>0){let C=[],x=new Map,_=new Map;if(f.BatchNumbers.forEach((O,k)=>{let I=`${O.BatchNumber}_${O.BaseLineNumber}`;if(_.has(I)){let B=_.get(I);C[B].Quantity=parseFloat((C[B].Quantity+O.Quantity).toFixed(5)),x.set(k,B)}else{let B=C.length,U={...O};_.set(I,B),C.push(U),x.set(k,B)}}),f.BatchNumbers=C,Array.isArray(f.DocumentLinesBinAllocations)&&f.DocumentLinesBinAllocations.length>0){let O=[],k=new Map;f.DocumentLinesBinAllocations.forEach(I=>{let B=x.get(I.SerialAndBatchNumbersBaseLine);if(B!==void 0){let U=`${I.BinAbsEntry}_${B}`;if(k.has(U))k.get(U).Quantity=parseFloat((k.get(U).Quantity+I.Quantity).toFixed(5));else{let ge={BinAbsEntry:I.BinAbsEntry,Quantity:I.Quantity,SerialAndBatchNumbersBaseLine:B,BaseLineNumber:I.BaseLineNumber};k.set(U,ge),O.push(ge)}}}),f.DocumentLinesBinAllocations=O}}});let A;try{console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice"),A=await ut.createInvoice(i,h),console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice")}catch(f){if(f?.response?.status===401)console.log("*** 401 Unauthorized from SL (Invoice) - Invalidating cache and retrying..."),TA(),h=await _n(e),console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)"),A=await ut.createInvoice(i,h),console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)");else throw console.timeEnd("2. [BACKEND] Total Invoice Create API Duration"),f}if(A.DocEntry){if(e.file){console.log(`[BACKEND] Attachment found for Invoice ${A.DocEntry}. Creating entry...`);let f=await ut.createAttachmentEntry(e,h);if(f){console.log(`[BACKEND] Attachment Entry ${f} created. Linking to Invoice...`);let C=await ut.linkAttachmentToDocument(_r.INVOICE,A.DocEntry,f,h);console.log(`[BACKEND] Invoice ${A.DocEntry} link result: ${C}`),e.absEntry=f}else console.warn(`[BACKEND] Failed to create attachment entry for Invoice ${A.DocEntry}`)}if(s.DocNum=A.DocNum,s.DocEntry=A.DocEntry,s.isExist=!1,e.body.incomingPayment){J&&(console.log("ipSeriesResponse series:",J.Series),e.body.incomingPayment.Series=J.Series),console.time("2.6 [BACKEND] processPayment");let f=await OA(A.DocEntry,e.body.incomingPayment,h,e.absEntry);if(console.timeEnd("2.6 [BACKEND] processPayment"),f){if(s.IncomingPaymentDocNum=f.DocNum,n=f.DocEntry,e.absEntry){console.log(`[BACKEND] Linking attachment ${e.absEntry} to Incoming Payment DocEntry ${n} via robust method...`);let C=await gd.updatePaymentAttachment(e,n,h);console.log(`[BACKEND] Attachment linking result for Payment ${n}: ${JSON.stringify(C)}`)}if(e.body?.journalEntry){console.time("2.7 [BACKEND] processJournalEntry");let C=await UA(e.body.journalEntry,A.DocNum,f.DocNum,h);console.timeEnd("2.7 [BACKEND] processJournalEntry"),s.JournalEntryDocNum=C?.JdtNum}}}if(dd){console.time("2.8 [BACKEND] FIRCA Integration");try{if(await SA(A.DocEntry,p,"Invoice")){let C=await fA(A.DocNum);C&&(s.qrCode=C,console.log("FIRCA qrCodeDataURI computed successfully."))}}catch(f){console.error("FIRCA error:",f)}console.timeEnd("2.8 [BACKEND] FIRCA Integration")}console.time("2.9 [BACKEND] getUDFData");try{let f=await md(A.DocNum);(!f||!f.U_SDCInvNum)&&dd&&(console.log("SDC Details not yet available, waiting 3 seconds before retry..."),await new Promise(C=>setTimeout(C,3e3)),f=await md(A.DocNum)),f&&(console.log("UDF Data fetched successfully. Inv:",f.U_InvCount),s.InvCount=f.U_InvCount,s.SDCTime=f.U_SDCTime,s.SDCInvNum=f.U_SDCInvNum,s.VehicleNo=f.U_VehicleNo,s.TradeNum=f.U_TINNO)}catch(f){console.error("UDF Error:",f)}console.timeEnd("2.9 [BACKEND] getUDFData")}}if(console.log("*************invoiceSalesBatchResponse start************ "),e.body.salesBatchSelection.length>0){console.time("2.10 [BACKEND] createSalesBatchSelection");let A=await xA(s.DocEntry,s.DocNum,e.body.salesBatchSelection,h);console.timeEnd("2.10 [BACKEND] createSalesBatchSelection"),console.log("*************invoiceSalesBatchResponse************: ",A)}if(console.log("*************invoiceSalesBatchResponse end************ "),e.body.invoice.U_PaymentType==="Card"){if(console.log("*************CreditCard Management referenece start************ "),e.body.incomingPayment?.TransferReference&&e.body.incomingPayment?.TransferReference!==""){console.log("*************CreditCard Management referenece************: ",n+" - "+e.body.incomingPayment.TransferReference);let A=await EA(n,e.body.incomingPayment?.TransferReference);console.log("*************CreditCard Management referenece************: ",A)}console.log("*************CreditCard Management referenece end************ ")}if(s.DocNum){let A=IA({docNum:s.DocNum});s.itemList=A}if(s.DocEntry){let A=DA(s.DocEntry);s.timItemList=A}e.absEntry&&(console.log(`[BACKEND] Adding AbsoluteEntry ${e.absEntry} to final API response.`),s.AttachmentEntry=e.absEntry),console.timeEnd("2. [BACKEND] Total Invoice Create API Duration"),t.status(200).send(s)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(s){console.log("create Invoice: ",s?.response?.data||s.message),o(s)}finally{r&&vn.delete(r)}},OA=async(e,t,o,r)=>{try{return t.PaymentInvoices[0].DocEntry=e,Array.isArray(t.PaymentChecks)&&t.PaymentChecks.length>0&&(t.PaymentChecks[0].DueDate=hd(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")),await gd.createIncomingPayment(t,o)}catch(s){throw s}},UA=async(e,t,o,r)=>{let s=hd(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{return e.Reference=t,e.Reference2=o,e.TaxDate=s,e.DueDate=s,e.ReferenceDate=s,await CA.createJournalEntry(e,r)}catch(n){throw n}},xA=async(e,t,o,r)=>{try{let s=[];console.log("********* createSalesBatchSelection ****request: ",o);let n=await Td.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let l=await AA(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create Invoice: ",s?.response?.data||s.message),s}},LA=async(e,t,o)=>{try{if(e.body){if(typeof e.body.request=="string"){let d=JSON.parse(e.body.request);Object.assign(e.body,d)}let r={},s=await _n(e),n,a=e.body;a.U_DeliveryStatus=a.U_DeliveryStatus||"DELIVERED",a.U_IsPaymentReceived=a.U_IsPaymentReceived||"Y",console.log("*************request: ",a);let l=await ut.updateInvoice(a,s);(!l||l.status===200||l.DocEntry)&&(r.DocNum=a.DocNum,r.DocEntry=a.DocEntry,r.message=l.message,await Cd(e,a.DocEntry,s)&&console.log("Attachment updated")),t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(r){console.log("create Invoice: ",r?.response?.data||r.message),o(r)}},Cd=async(e,t,o)=>{try{if(!e.file)return null;let r=await ut.createAttachmentEntry(e,o);return r?await ut.linkAttachmentToDocument(_r.INVOICE,t,r,o):null}catch(r){console.log("updateAttach error: ",r?.response?.data||r.message)}};Sd.exports={create:RA,update:LA,updateAttach:Cd}});var Ed=u((mO,Ad)=>{var wA=require("../node_modules/express/index.js"),Pn=fd(),{portalModules:Mn,permissions:Fn}=S(),{checkUserPermission:$n}=v(),BA=wr(),Pr=new wA.Router,{upload:Wn}=BA;Pr.route("/").post($n([Mn.INVOICE],Fn.CREATE),Wn.single("attachment"),Pn.create);Pr.route("/").patch($n([Mn.INVOICE],Fn.WRITE),Wn.single("Attachment"),Pn.update);Pr.route("/attachment").patch($n([Mn.INVOICE],Fn.WRITE),Wn.single("Attachment"),Pn.updateAttach);Ad.exports=Pr});var Dd=u(Id=>{var{serviceLayerAPI:Nd}=Q(),{portalModules:vA,serviceLayerApiURIs:_A}=S(),PA=vA.ITEM,MA=_A[PA];Id.createItem=async(e,t)=>{try{Nd.defaults.headers.Cookie=t;let o=await Nd.post(MA,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Item Helper error: "+o),o}}});var Rd=u((gO,bd)=>{var{getSLConnection:FA}=te(),$A=Dd(),WA=async(e,t,o)=>{try{let r=await FA(e);console.log("*** Item request: "+JSON.stringify(e.body));let s=await $A.createItem(e.body,r);t.status(200).send({ItemCode:s.ItemCode})}catch(r){console.log("create Item: "+JSON.stringify(r)),o(r)}};bd.exports={create:WA}});var xd=u((SO,Ud)=>{var kA=require("../node_modules/express/index.js"),HA=Rd(),{portalModules:TO,permissions:hO}=S(),{checkUserPermission:CO}=v(),Od=new kA.Router;Od.route("/").post(HA.create);Ud.exports=Od});var Ld=u(Co=>{var{dbCreds:Mr}=D();Co.items=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."ItmsGrpCod", T0."ChapterID", T0."validFor",
    T0."ManBtchNum", T0."SellItem", T0."InvntItem",
    T0."PrchseItem", T0."OnHand", T0."IsCommited", T0."OnOrder", T0."SalUnitMsr", T0."BuyUnitMsr",
    T0."IUoMEntry", T0."PrdStdCst", T0."UserText", T0."InvntryUom",
    T0."U_SG1", T0."U_SG2", T0."U_SG3"
  FROM ${Mr.CompanyDB}.OITM T0
    WHERE 1 = 1`;Co.itemGroups=`SELECT T0."ItmsGrpCod" "ItemGroupCode", T0."ItmsGrpNam" "ItemGroupName"
    FROM ${Mr.CompanyDB}.OITB T0`;Co.itemSubGroups=`SELECT "FieldID", "FldValue" as "Value", "Descr" as "Description"
    FROM ${Mr.CompanyDB}."UFD1"
  WHERE "TableID"='OITM'
    AND "FieldID" = ?`;Co.itemMaxSequenceNo=`SELECT MAX(T0."U_SEQ") as "MaxNo" FROM ${Mr.CompanyDB}.OITM T0`});var wd=u(So=>{var Fr=b(),$r=Ld(),{getAmmoFilter:JA}=er();So.getItems=e=>{try{let t="",o=[],r="",s="";if(e?.pageNum&&e?.pageSize){let d=e.pageNum,i=e.pageSize,c=(d-1)*i,p=d*i;t=" LIMIT ? OFFSET ? ",o=[i,c]}if(e?.searchKey){let{searchKey:d}=e;isNaN(d)&&(d=d.toUpperCase()),r=` AND (
                  UPPER(T0."ItemCode") LIKE '%${d}%'
                    OR UPPER(T0."ItemName") LIKE '%${d}%'
                    OR UPPER(T0."FrgnName") LIKE '%${d}%' ) `}let n=JA(e.userSessionLog,!0,"T0"),a=$r.items+r+n+s+t;return Fr.executeWithValues(a,o)}catch(t){throw console.log("getItems - controller - error: "+JSON.stringify(t.message)),t}};So.getItemGroups=()=>{try{return Fr.executeWithValues($r.itemGroups,[])}catch(e){throw console.log("getItemGroups - controller - error: "+JSON.stringify(e.message)),e}};So.getItemSubGroups=e=>{try{return Fr.executeWithValues($r.itemSubGroups,[e])}catch(t){throw console.log("getItemSubGroups - controller - error: "+JSON.stringify(t.message)),t}};So.getMaxSequenceNo=()=>{try{let e=Fr.executeWithValues($r.itemMaxSequenceNo,[]);return console.log("getItemGroups-: "+JSON.stringify(e)),Array.isArray(e)&&e.length>0?e[0].MaxNo:0}catch(e){throw console.log("getMaxSequenceNo - controller - error: "+JSON.stringify(e.message)),e}}});var Bd=u(fo=>{var Wr=wd();fo.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Wr.getItems({...e.query,userSessionLog:e.session.userSessionLog});t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};fo.getGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Wr.getItemGroups();t.send(r)}catch(r){console.log("getGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};fo.getSubGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params.subGroupId));try{let r=Wr.getItemSubGroups(e.params.subGroupId);t.send(r)}catch(r){console.log("getSubGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};fo.getNextNo=(e,t,o)=>{try{let r=1,s=Wr.getMaxSequenceNo();isNaN(parseInt(s))||(r=parseInt(s)+1),t.send({nextNumber:r})}catch(r){console.log("getNextNo - controller - error: "+JSON.stringify(r.message)),o(r)}}});var _d=u((bO,vd)=>{var qA=require("../node_modules/express/index.js"),Ao=new qA.Router,kr=Bd(),{checkUserPermission:NO}=v(),{portalModules:IO,permissions:DO}=S();Ao.route("/").get(kr.get);Ao.route("/next-number").get(kr.getNextNo);Ao.route("/groups").get(kr.getGroups);Ao.route("/sub-groups/:subGroupId").get(kr.getSubGroups);vd.exports=Ao});var Pd=u(kn=>{var{dbCreds:Hr}=D();kn.stockTransferRequest=`SELECT T0."DocNum", T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
    T0."U_DraftStatus", T0."U_OriginatorId", T1."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
    T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
      FROM ${Hr.CompanyDB}.OWTQ T0, ${Hr.CompanyDB}.OUSR T1
    WHERE T0."UserSign" = T1."USERID"`;kn.itemListForSTR=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity",
    T1."unitMsr" AS "InvntryUom", T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation",
    T1."U_FromBinLoc"
  FROM ${Hr.CompanyDB}.WTQ1 T1, ${Hr.CompanyDB}.OWTQ T0
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `});var $d=u(Hn=>{var Md=b(),{buildHeaderRecQuery:GA,buildRowLevelQuery:jA}=_e(),Fd=Pd();Hn.getStockTransferRequest=e=>{try{let t=GA(Fd.stockTransferRequest,e);return console.log("getStockTransferRequest- sql: ",t),Md.executeWithValues(t)}catch(t){throw console.log("getStockTransferRequest - controller - error: "+JSON.stringify(t.message)),t}};Hn.getItemDetails=e=>{try{let t=jA(Fd.itemListForSTR,e);return{itemsList:Md.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var kd=u(Jn=>{var Wd=$d();Jn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Wd.getStockTransferRequest(e.query);t.send(r)}catch(r){console.log("getStockTransferRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};Jn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Wd.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var qd=u((xO,Jd)=>{var zA=require("../node_modules/express/index.js"),qn=new zA.Router,Hd=kd(),{checkUserPermission:Jr}=v(),{portalModules:qr,permissions:Gr}=S();qn.route("/").get(Jr(qr.STOCK_TRANSFER_REQUEST,Gr.READ)||Jr(qr.STOCK_TRANSFER,Gr.CREATE),Hd.get);qn.route("/items").get(Jr(qr.STOCK_TRANSFER_REQUEST,Gr.READ)||Jr(qr.STOCK_TRANSFER,Gr.CREATE),Hd.getItems);Jd.exports=qn});var Gd=u(ze=>{var{dbCreds:Y}=D();ze.salesQuotationQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocDueDate",
    T0."CardCode", T0."CardName", T0."NumAtCard",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."SlpCode" "SalesPersonCode",
    T2."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location",
    T0."CntctCode" "ContactPersonCode", T0."U_IsReprinted"
      FROM ${Y.CompanyDB}.OQUT T0, ${Y.CompanyDB}.QUT1 T1, ${Y.CompanyDB}.OSLP T2
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;ze.itemListForSalesQuotation=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."FreeTxt" "FreeText", TO_VARCHAR(T1."U_DocNum") AS "BundleNo", T1."U_TallySheet", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceBefDi" "PriceBeforDiscount",
    (SELECT E."ItmsGrpNam" FROM  ${Y.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod", ITM."ManSerNum", ITM."ManBtchNum",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${Y.CompanyDB}.SPP1 P WHERE P."ItemCode" = T1."ItemCode" 
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
              AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied"
  FROM ${Y.CompanyDB}.OQUT T0
    INNER JOIN ${Y.CompanyDB}.QUT1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Y.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;ze.updateSQSalesBatchSelectionDocNum=`UPDATE ${Y.CompanyDB}.QUT1 T1 SET
    T1."U_TallySheet" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ?`;ze.updateSalesQuotationReprintStatus=`UPDATE ${Y.CompanyDB}.OQUT T0 SET
  T0."U_IsReprinted" = 'Y'
WHERE T0."DocEntry" = ?`;ze.buildTimberTallyItemsQuery=(e,t)=>{let o=`SELECT 
    MAX(T1."ItemCode") AS "ItemCode",
    T0."Code" AS "U_Length",
    MAX(IFNULL(T1."BHeight1", 1)) AS "U_Height",
    MAX(IFNULL(T1."BWidth1", 1)) AS "U_Width",
    MAX(T2."BinAbsEntry") AS "BinAbsEntry",
    MAX(T2."BinCode") AS "BinCode",
    SUM(IFNULL(T2."U_AvlPcs", 0)) AS "U_AvlPcs",
    SUM(IFNULL(T2."U_AvlQty", 0)) AS "U_AvlQty"
FROM ${Y.CompanyDB}."@LENGTHMASTER" T0
LEFT JOIN ${Y.CompanyDB}.OITM T1 ON T1."ItemCode" = ?
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
    FROM ${Y.CompanyDB}."OBTN" T0
    LEFT JOIN ${Y.CompanyDB}."OBTQ" T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${Y.CompanyDB}."OBBQ" B ON T0."AbsEntry" = B."SnBMDAbs" AND T0."ItemCode" = B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${Y.CompanyDB}."OBIN" C ON B."BinAbs" = C."AbsEntry" AND B."WhsCode" = C."WhsCode"
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
ORDER BY CAST(T0."Code" AS DOUBLE) ASC`,o};ze.tallySheetRowsQuery=`SELECT T0."LineId", T0."U_Length", T0."U_Width", T0."U_Height", T0."U_Pieces" AS "U_NoOfPcs", T0."U_Qty" FROM ${Y.CompanyDB}."@TSH1" T0 WHERE T0."DocEntry" = ?`;ze.getUniqueId=`SELECT T0."DocNum", T0."DocEntry" 
    FROM ${Y.CompanyDB}.OQUT T0
  WHERE T0."U_POS_TransactionID" = ?`});var Gn=u(yt=>{var pt=b(),{buildHeaderRecQuery:VA,buildRowLevelQuery:QA}=_e(),mt=Gd();yt.getSalesQuotation=e=>{try{let t=VA(mt.salesQuotationQuery,e);return console.log("getSalesQuotation- sql: ",t),pt.executeWithValues(t)}catch(t){throw console.log("getSalesQuotation - controller - error: "+JSON.stringify(t.message)),t}};yt.getItemDetails=e=>{try{let t=QA(mt.itemListForSalesQuotation,e),o=pt.executeWithValues(t,[]);return o.forEach(r=>{if(r.U_TallySheet){let s=mt.tallySheetRowsQuery,n=pt.executeWithValues(s,[r.U_TallySheet]);Array.isArray(n)&&n.length>0&&(r.timberTallyRows=n,r.timberTally=[{TSH1Collection:n}])}}),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};yt.updateSQSalesBatchSelection=(e,t)=>{try{if(console.log("updateSQSalesBatchSelection %s",e.DocNum,t,e.U_ItemCode),e){let o=pt.executeWithValues(mt.updateSQSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode]);return console.log("updateSQSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("updateSQSalesBatchSelection - helper - error: "+JSON.stringify(o.message)),o}};yt.updateReprint=e=>{try{if(e){let t=pt.executeWithValues(mt.updateSalesQuotationReprintStatus,[e]);return console.log("updateSalesQuotationReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("SalesQuotationReprintStatus - helper - error: "+JSON.stringify(t.message)),t}};yt.getTimberTallyItems=e=>{try{let{itemCode:t,whsCode:o,binCode:r}=e;console.log("binCode from req:",r);let s=mt.buildTimberTallyItemsQuery(o,r),n=[t,t];o&&n.push(o),r&&n.push(r),console.log("getTimberTallyItems - params: ",n);let a=pt.executeWithValues(s,n);return console.log("getTimberTallyItems - rows returned: ",a?.length||0),a&&a.length>0&&console.log("getTimberTallyItems - results sample: ",JSON.stringify(a[0])),a&&a.length>0&&a[0].U_AvlPcs==="0"&&console.log("DEBUG - Found zero pieces. Row sample:",JSON.stringify(a.find(l=>l.U_AvlPcs!=="0")||a[0])),a}catch(t){throw console.log("getTimberTallyItems - helper - error: "+JSON.stringify(t.message)),t}};yt.getUniqueId=e=>{try{let t=mt.getUniqueId,o=pt.executeWithValues(t,[e]);return o&&o.length>0?o[0]:null}catch(t){throw console.log("getUniqueId - helper - error: "+JSON.stringify(t.message)),t}}});var jd=u(Eo=>{var jr=Gn();Eo.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=jr.getSalesQuotation(e.query);t.send(r)}catch(r){console.log("getSalesQuotation - controller - error: "+JSON.stringify(r.message)),o(r)}};Eo.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=jr.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};Eo.updateReprint=(e,t,o)=>{console.log("updateSalesQuotationReprint - body: "+JSON.stringify(e.body));let{DocEntry:r}=e.body;try{let s=jr.updateReprint(r);t.send({message:"Sales Quotation Reprint Status Updated Successfully",success:!0})}catch(s){console.log("updateSalesQuotationReprint - controller - error: "+JSON.stringify(s.message)),o(s)}};Eo.getTimberTallyItems=(e,t,o)=>{console.log("getTimberTallyItems - query: "+JSON.stringify(e.query));try{let r=jr.getTimberTallyItems(e.query);t.send(r)}catch(r){console.log("getTimberTallyItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Vd=u((vO,zd)=>{var YA=require("../node_modules/express/index.js"),No=new YA.Router,zr=jd(),{checkUserPermission:Vr}=v(),{portalModules:Qr,permissions:Yr}=S();No.route("/").get(Vr(Qr.SALES_QUOTATION,Yr.READ),zr.get);No.route("/items").get(Vr(Qr.SALES_QUOTATION,Yr.READ),zr.getItems);No.route("/timber-tally-items").get(Vr(Qr.SALES_QUOTATION,Yr.READ),zr.getTimberTallyItems);No.route("/reprint").patch(Vr(Qr.SALES_QUOTATION,Yr.READ),zr.updateReprint);zd.exports=No});var Qd=u(Io=>{var{serviceLayerAPI:Ve}=Q(),{portalModules:KA,serviceLayerApiURIs:XA}=S(),ZA=KA.SALES_QUOTATION,Kr=XA[ZA];Io.createSalesQuotation=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** SalesQuotation request: "+JSON.stringify(e)),Ve.defaults.headers.Cookie=t;let o=await Ve.post(Kr,e);return console.log(`Create SalesQuotation response: ${JSON.stringify(o.data.DocNum)}`),o.data?o.data:void 0}catch(o){throw console.log("Create SalesQuotation error: "+o),o}};Io.updateSalesQuotation=async(e,t)=>{try{return console.log("*** SalesQuotation update request: "+JSON.stringify(e)),Ve.defaults.headers.Cookie=t,!!await Ve.patch(`${Kr}(${e.DocEntry})`,e)}catch(o){throw console.log("update SalesQuotation error: "+o),o}};Io.getSalesQuotation=async(e,t)=>{try{console.log("*** SalesQuotation get request: "+JSON.stringify(e)),Ve.defaults.headers.Cookie=t;let o=await Ve.get(`${Kr}(${e})`);return o?o.data:null}catch(o){throw console.log("get SalesQuotation error: "+o),o}};Io.putSalesQuotation=async(e,t,o)=>{try{return console.log("*** SalesQuotation put request: "+JSON.stringify(t)),Ve.defaults.headers.Cookie=o,!!await Ve.put(`${Kr}(${e})`,t)}catch(r){throw console.log("put SalesQuotation error: "+r),r}}});var Kd=u(jn=>{var{serviceLayerAPI:Xr}=Q(),{portalModules:eE}=S(),Yd=eE.OTSH;jn.createTimberTally=async(e,t,o,r)=>{let s=Array.isArray(e)?e:[e];console.log("*** Timber Tally helper requests count: "+s.length);let n=[];for(let a of s)try{console.log("*** Timber Tally POST payload: "+JSON.stringify(a,null,2)),Xr.defaults.headers.Cookie=r;let l=await Xr.post(Yd,a),{DocNum:d,DocEntry:i,U_ItemCode:c}=l.data;console.log("*** Timber Tally response:**** "+JSON.stringify(l.data)),n.push({DocNum:d,DocEntry:i,U_ItemCode:c})}catch(l){console.error(`Error creating OTSH record for item ${a.U_ItemCode}:`,l.response?.data?.error?.message?.value||l.message)}return n};jn.updateTimberTally=async(e,t)=>{try{return Xr.defaults.headers.Cookie=t,(await Xr.patch(`${Yd}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update Timber Tally error: "+o.response?.data?.error?.message?.value||o.message),o}}});var eu=u((MO,Zd)=>{var{getSLConnection:Zr,invalidateSLCache:Xd}=te(),Do=Qd(),Vn=ho(),Qn=Kd(),{enableFircaIntegration:tE,objectCodes:oE,portalModules:rE,enableStoreBasedNumbering:sE}=S(),{submitInvoicetoFirca:nE}=xr(),{updateSQSalesBatchSelection:Yn,getUniqueId:aE}=Gn(),{getNumberingSeries:iE}=Er(),zn=new Map,lE=async(e,t,o)=>{let r=null;try{if(r=e.body.Unique,r){if(zn.has(r))return console.error(`[BACKEND] Concurrent request detected for Quotation UniqueID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});zn.set(r,!0);let i=await aE(r);if(i&&i.DocNum)return console.log(`[BACKEND] Sales Quotation with UniqueID ${r} already exists: DocNum ${i.DocNum}`),t.status(200).send({docNum:i.DocNum,isExist:!0})}let s="",n=e.body.CompanyCode?e.body.CompanyCode:"",a=parseFloat(e.session.userSessionLog?.salesDisc||0);if(Array.isArray(e.body.DocumentLines))for(let i of e.body.DocumentLines){let c=parseFloat(i.DiscountPercent||0);if(c>a)return console.error(`[BACKEND] Discount Limit Violation: Item ${i.ItemCode} has ${c}% but user only allowed ${a}%`),t.status(400).send({message:`Discount Limit is Exceeded: ${a}% (Item: ${i.ItemCode})`})}if(sE){let i=await iE(oE[rE.SALES_QUOTATION],e.session.userSessionLog.storeLocation);i&&(console.log("seriesResponse series:",i.Series),e.body.Series=i.Series)}let l=await Zr(e),d;try{d=await Do.createSalesQuotation(e.body,l)}catch(i){if(i?.response?.status===401)console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),Xd(e),l=await Zr(e),d=await Do.createSalesQuotation(e.body,l);else throw i}if(d.DocNum&&(s=d.DocNum,tE)){let i=await nE(d.DocEntry,n,"SalesQuotation")}if(Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){let i=await cE(d.DocEntry,d.DocNum,e.body.salesBatchSelection,l)}if(Array.isArray(e.body.timberTally)&&e.body.timberTally.length>0)for(let i of e.body.timberTally){let c=await uE(d.DocEntry,d.DocNum,[i],l);if(c&&c.length>0&&c[0]){let p=c[0],y=p.U_ItemCode||i.U_ItemCode;console.log(`[TimberTally] Linking Tally DocNum ${p.DocNum} to SQ DocEntry ${d.DocEntry} for item ${y}`),await Yn({...p,U_ItemCode:y},d.DocEntry)}}t.status(200).send({docNum:s})}catch(s){console.log("create SalesQuotation Controller: ",s?.response?.data||s.message),o(s)}finally{r&&zn.delete(r)}},cE=async(e,t,o,r)=>{try{let s=[],n=await Vn.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let l=await Yn(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create SalesQuotation SalesBatchSelection: ",s?.response?.data||s.message),s}},dE=async(e,t,o)=>{try{let r=await Zr(e),s=async a=>{try{return await a(r)}catch(l){if(l?.response?.status===401)return console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),Xd(e),r=await Zr(e),await a(r);throw l}};if(e.body.ItemsDeleted&&e.body.ItemsDeleted.length>0)try{console.log("Sales Quotation delete in Service Layer.",e.body.ItemsDeleted);let{DocEntry:a}=e.body;console.log(`Processing deletion of line items from Quotation ${a}:`,JSON.stringify(e.body.ItemsDeleted));let l=await s(c=>Do.getSalesQuotation(a,c));if(console.log("Fetched Quotation for update:",JSON.stringify(l)),!l||!l.DocumentLines)throw console.log("Fetched Quotation Error: ",JSON.stringify(l)),new Error("Quotation not found or invalid structure");let d=e.body.ItemsDeleted.map(c=>c.LineNum);l.DocumentLines=l.DocumentLines.filter(c=>!d.includes(c.LineNum)),console.log("Quotation after removing deleted lines:",JSON.stringify(l));let i=await s(c=>Do.putSalesQuotation(a,l,c));if(console.log("PUT Result after deleting lines:",i),!i)throw new Error("Failed to update quotation after deleting lines");console.log(`Deleted line items [${d}] successfully from Quotation ${a}`)}catch(a){throw console.error("Error while deleting line items:",a.message),a}if(console.log("Performing Sales Quotation Patch operation."),await s(a=>Do.updateSalesQuotation(e.body,a))){let{salesBatchSelection:a}=e.body;if(Array.isArray(a)&&a.length>0){let d=await Promise.all(a.map(i=>i.DocEntry?s(c=>Vn.updateSalesBatchSelection(i,c)):s(c=>Vn.createSalesBatchSelection(i,"",e.body.DocNum,c))))}let{timberTally:l}=e.body;if(Array.isArray(l)&&l.length>0){let d=await Promise.all(l.map(async i=>{if(i.DocEntry)return s(c=>Qn.updateTimberTally(i,c));{let c=await s(p=>Qn.createTimberTally(i,e.body.DocEntry,e.body.DocNum,p));if(c&&c.length>0&&c[0]){let p=c[0],y=p.U_ItemCode||i.U_ItemCode;console.log(`[TimberTally-Update] Linking Tally DocNum ${p.DocNum} to SQ DocEntry ${e.body.DocEntry} for item ${y}`),await Yn({...p,U_ItemCode:y},e.body.DocEntry)}return c}}))}t.status(200).send({docNum:e.body.DocNum})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("Update SalesQuotation Controller: ",r?.response?.data||r.message),o(r)}},uE=async(e,t,o,r)=>{try{return await Qn.createTimberTally(o,e,t,r)||[]}catch(s){throw console.log("create SalesQuotation TimberTally Error: ",s?.response?.data||s.message),s}};Zd.exports={create:lE,update:dE}});var au=u((FO,nu)=>{var pE=require("../node_modules/express/index.js"),tu=eu(),{portalModules:ou,permissions:ru}=S(),{checkUserPermission:su}=v(),Kn=new pE.Router;Kn.route("/").post(su([ou.SALES_QUOTATION],ru.CREATE),tu.create);Kn.route("/").patch(su(ou.SALES_QUOTATION,ru.WRITE),tu.update);nu.exports=Kn});var iu=u(es=>{var{dbCreds:Qe}=D(),{draftObjectCodes:$O}=S();es.saleOrderQuery=`SELECT DISTINCT T0."BPLId", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocType", 
    T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
      FROM ${Qe.CompanyDB}.ORDR T0, ${Qe.CompanyDB}.RDR1 T1
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"`;es.itemListForSaleOrder=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."PriceBefDi" "UnitPrice",
    T1."OpenCreQty" as "Quantity", T1."OpenQty", T1."WhsCode", T1."unitMsr" "UomCode",
    ITM."ManBtchNum", ITM."ManSerNum",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."Project"
  FROM ${Qe.CompanyDB}.ORDR T0
    INNER JOIN ${Qe.CompanyDB}.RDR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Qe.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;es.freightInfo=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${Qe.CompanyDB}."ORDR" T0, ${Qe.CompanyDB}."RDR3" T1, ${Qe.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `});var lu=u(ea=>{var Xn=b(),{buildHeaderRecQuery:mE,buildRowLevelQuery:yE}=_e(),Zn=iu();ea.getSaleOrders=e=>{try{let t=mE(Zn.saleOrderQuery,e);return console.log("getSalesQuotation- sql: ",t),Xn.executeWithValues(t)}catch(t){throw console.log("getSaleOrders - controller - error: "+JSON.stringify(t.message)),t}};ea.getItemDetails=e=>{try{let t=yE(Zn.itemListForSaleOrder,e),o=Xn.executeWithValues(t),r=Xn.executeWithValues(Zn.freightInfo+`(${docNum})`,[]);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o,freightInfo:r}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var du=u(ta=>{var cu=lu();ta.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=cu.getSaleOrders(e.query);t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};ta.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=cu.getItemDetails(e.query);console.log("getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var mu=u((JO,pu)=>{var gE=require("../node_modules/express/index.js"),oa=new gE.Router,uu=du();oa.route("/").get(uu.get);oa.route("/items").get(uu.getItems);pu.exports=oa});var gu=u(yu=>{var TE=b(),hE=po();yu.getTaxDefinition=()=>{try{return TE.executeWithValues(hE.selectTaxInfo)}catch(e){throw console.log("getTaxDefinition - controller - error: "+JSON.stringify(e.message)),e}}});var hu=u(Tu=>{var CE=gu();Tu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=CE.getTaxDefinition();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var fu=u((QO,Su)=>{var SE=require("../node_modules/express/index.js"),Cu=new SE.Router,fE=hu(),{checkUserPermission:jO}=v(),{portalModules:zO,permissions:VO}=S();Cu.route("/").get(fE.get);Su.exports=Cu});var Nu=u(Eu=>{var Au=rn();Eu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r,s;r=e.query.userCode??"",s=e.query.storeLocation??"";let n=[];n=Au.getSalesEmployees(s,r),Array.isArray(n)&&n.length===0&&(n=Au.getSalesEmployees(s,"")),t.send(n)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var bu=u((KO,Du)=>{var AE=require("../node_modules/express/index.js"),Iu=new AE.Router,EE=Nu();Iu.route("/").get(EE.get);Du.exports=Iu});var Ou=u(Ru=>{var NE=ao();Ru.getSalesEmployee=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=NE.getSalesEmployeeForUser(e.query.userId);t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Lu=u((ZO,xu)=>{var IE=require("../node_modules/express/index.js"),Uu=new IE.Router,DE=Ou();Uu.route("/sales-employee").get(DE.getSalesEmployee);xu.exports=Uu});var Bu=u(wu=>{var bE=b(),RE=po();wu.getPaymentTerms=()=>{try{return bE.executeWithValues(RE.selectPaymentTerms)}catch(e){throw console.log("getPaymentTerms - controller - error: "+JSON.stringify(e.message)),e}}});var _u=u(vu=>{var OE=Bu();vu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=OE.getPaymentTerms();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Fu=u((oU,Mu)=>{var UE=require("../node_modules/express/index.js"),Pu=new UE.Router,xE=_u();Pu.route("/").get(xE.get);Mu.exports=Pu});var Wu=u($u=>{var LE=b(),wE=po();$u.getBanks=()=>{try{return LE.executeWithValues(wE.selectBankInfo)}catch(e){throw console.log("getBanks - controller - error: "+JSON.stringify(e.message)),e}}});var Hu=u(ku=>{var BE=Wu();ku.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=BE.getBanks();t.send(r)}catch(r){console.log("get Banks - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Gu=u((nU,qu)=>{var vE=require("../node_modules/express/index.js"),Ju=new vE.Router,_E=Hu();Ju.route("/").get(_E.get);qu.exports=Ju});var zu=u(ju=>{var PE=co();ju.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=PE.getLocations();t.send(r)}catch(r){console.log("get Locations - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Yu=u((iU,Qu)=>{var ME=require("../node_modules/express/index.js"),Vu=new ME.Router,FE=zu();Vu.route("/").get(FE.get);Qu.exports=Vu});var Xu=u(Ku=>{var $E=b(),{dbCreds:ts}=D();Ku.getWarehouses=e=>{try{let t=[],o=`SELECT T0."WhsCode", T0."WhsName", T1."BinCode", T1."AbsEntry" "BinAbsEntry", T0."Location" "LocationCode",
        T2."Location" "LocationName", T0."U_GITWH" "GitWHCode"
      FROM ${ts.CompanyDB}.OWHS T0
        LEFT OUTER JOIN ${ts.CompanyDB}.OBIN T1 ON T0."DftBinAbs" = T1."AbsEntry"
        INNER JOIN ${ts.CompanyDB}.OLCT T2 ON T0."Location" = T2."Code"`,r=` WHERE T0."Inactive" ='N'`;e.branchId&&(o=o+` INNER JOIN ${ts.CompanyDB}.OBPL T3 ON T0."BPLid" = T3."BPLId"`,r=r+' AND T0."BPLid" = ?',t.push(e.branchId)),e.locationCode&&(r=r+' AND T0."Location" = ?',t.push(e.locationCode));let s=' ORDER BY T0."WhsCode"';return $E.executeWithValues(o+r+s,t)}catch(t){throw console.log("getWarehouses - error: "+JSON.stringify(t)),t}}});var ep=u(Zu=>{var WE=Xu();Zu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=WE.getWarehouses(e.query);t.send(r)}catch(r){console.log("get WHs - controller - error: "+JSON.stringify(r.message)),o(r)}}});var rp=u((dU,op)=>{var kE=require("../node_modules/express/index.js"),tp=new kE.Router,HE=ep();tp.route("/").get(HE.get);op.exports=tp});var np=u((uU,sp)=>{var{dbCreds:Z}=D(),JE=`SELECT T0."CardCode", T0."CardName", T0."Cellular", T0."U_OneTimeCustomer", T0."U_COD", T0."U_Fin_Status",
    T0."U_CustomerType",
    T0."CreditLine" as "CreditLimit", T0."CreditLine" - (T0."Balance" + T0."DNotesBal") as "AvailableBalance",
    T0."SlpCode" "SalesEmployeeCode", T0."LicTradNum"
  FROM ${Z.CompanyDB}.OCRD T0
WHERE T0."CardType" ='C'`,qE=`SELECT T0."CardCode", T1."AdresType", T1."Address", T1."Building", T1."Street",
  T1."City", T1."LicTradNum", T1."Block"
FROM ${Z.CompanyDB}.OCRD T0
  INNER JOIN ${Z.CompanyDB}.CRD1 T1 ON T0."CardCode" = T1."CardCode"
WHERE T1."AdresType" = 'S'
  AND T0."CardCode" = ?`,GE=`SELECT T0."CardCode", T0."Name", T0."CntctCode" AS "ContactCode" FROM ${Z.CompanyDB}.OCPR T0
  WHERE T0."CardCode" = ?`,jE=`SELECT "Price", "FromDate", "ToDate"
  FROM ${Z.CompanyDB}.SPP1
  WHERE "ItemCode" = ?
    AND "CardCode" = ?
    AND "FromDate" <= CURRENT_DATE
    AND IFNULL("ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,zE=`SELECT B."Price", A."FromDate", A."ToDate"
  FROM ${Z.CompanyDB}.SPP1 A
  INNER JOIN ${Z.CompanyDB}."ITM1" B
    ON A."ItemCode" = B."ItemCode"
            AND A."ListNum" = B."PriceList"
  WHERE A."ItemCode" = ?
    AND A."CardCode" = '*1'
    AND A."FromDate" <= CURRENT_DATE
    AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,VE=`SELECT T2."Price", CURRENT_DATE as "FromDate", CURRENT_DATE as "ToDate"
  FROM ${Z.CompanyDB}."OWHS" T0
    INNER JOIN ${Z.CompanyDB}."OBPL" T1
      ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${Z.CompanyDB}."ITM1" T2
      ON T1."U_PrcList" = T2."PriceList"
    WHERE T0."WhsCode" = ?
      AND T2."ItemCode" = ?
  LIMIT 1`,QE=`SELECT "Price", "ItemCode", "CardCode", "WhsCode"
FROM (
    SELECT S1."Price", S1."ItemCode", S1."CardCode", 'S101' AS "WhsCode", 1 AS "Priority"
    FROM ${Z.CompanyDB}."SPP1" S1
    WHERE S1."FromDate" <= CURRENT_DATE AND IFNULL(S1."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT B."Price", A."ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 2 AS "Priority"
    FROM ${Z.CompanyDB}."SPP1" A
    INNER JOIN ${Z.CompanyDB}."ITM1" B ON A."ItemCode" = B."ItemCode" AND A."ListNum" = B."PriceList"
    WHERE A."CardCode" = '*1' AND A."FromDate" <= CURRENT_DATE AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT T2."Price", T2."ItemCode", 'C4290' AS "CardCode", T0."WhsCode", 3 AS "Priority"
    FROM ${Z.CompanyDB}."OWHS" T0
    INNER JOIN ${Z.CompanyDB}."OBPL" T1 ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${Z.CompanyDB}."ITM1" T2 ON T1."U_PrcList" = T2."PriceList"
    
    UNION ALL
    
    SELECT "Price", "ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 4 AS "Priority"
    FROM ${Z.CompanyDB}."ITM1"
    WHERE "PriceList" = 1
)
WHERE "ItemCode" = ? 
  AND "CardCode" = ?
  AND "WhsCode" = ?
ORDER BY "Priority" ASC
LIMIT 1`;sp.exports={selectCustomerInfo:JE,selectCustomerAddress:qE,selectCustomerContactPerson:GE,selectCustomerSpecialPrice1:jE,selectCustomerSpecialPrice2:zE,selectCustomerSpecialPrice3:VE,selectCustomerSpecialPriceNew:QE}});var ap=u(bo=>{var Ht=b(),Jt=np();bo.getCustomerInfo=e=>{let t=Jt.selectCustomerInfo;e?.searchKey&&(t+=` AND (UPPER(T0."CardCode") LIKE UPPER('%${e.searchKey}%')
             OR UPPER(T0."CardName") LIKE UPPER('%${e.searchKey}%')
             OR T0."Cellular" LIKE '%${e.searchKey}%')`),e?.oneTimeCustomer==="Y"&&(t+=` AND T0."U_OneTimeCustomer" = 'Y'`);try{let o=Ht.executeWithValues(t,[]);return Array.isArray(o)&&o.length>0?e?.oneTimeCustomer==="Y"?o[0]:o:[]}catch(o){throw o}};bo.getCustomerAddress=e=>{try{let t=Ht.executeWithValues(Jt.selectCustomerAddress,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};bo.getCustomerContactPerson=e=>{try{let t=Ht.executeWithValues(Jt.selectCustomerContactPerson,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};bo.getCustomerSpecialPrice=(e,t,o)=>{try{let r=Ht.executeWithValues(Jt.selectCustomerSpecialPrice1,[t,e]);if(Array.isArray(r)&&r.length>0)return r[0];let s=Ht.executeWithValues(Jt.selectCustomerSpecialPrice2,[t]);if(Array.isArray(s)&&s.length>0)return s[0];let n=Ht.executeWithValues(Jt.selectCustomerSpecialPrice3,[o,t]);return Array.isArray(n)&&n.length>0?n[0]:""}catch(r){throw r}}});var ip=u(Ro=>{var{getCustomerInfo:YE,getCustomerAddress:KE,getCustomerContactPerson:XE,getCustomerSpecialPrice:ZE}=ap();Ro.get=(e,t,o)=>{console.log("*** getCustomerInfo - req.query: "+JSON.stringify(e.query));try{let r=YE(e.query);console.log("getCustomerInfo %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getCustomerInfo - controller - error: "+JSON.stringify(r)),o(r)}};Ro.getAddress=(e,t,o)=>{console.log("*** getAddress - req.params: "+JSON.stringify(e.params));try{let r=KE(e.params.cardCode);t.send(r)}catch(r){console.log("getAddress - controller - error: "+JSON.stringify(r)),o(r)}};Ro.getContactPerson=(e,t,o)=>{console.log("*** getContactPerson - req.params: "+JSON.stringify(e.params));try{let r=XE(e.params.cardCode);console.log("getContactPerson %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getContactPerson - controller - error: "+JSON.stringify(r)),o(r)}};Ro.getSpecialPrice=(e,t,o)=>{console.log("*** getSpecialPrice - req.params: "+JSON.stringify(e.params)),console.log("*** getSpecialPrice - req.query: "+JSON.stringify(e.query));try{let r=ZE(e.params.cardCode,e.query.itemCode,e.query.warehouseCode);console.log("getSpecialPrice %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getSpecialPrice - controller - error: "+JSON.stringify(r)),o(r)}}});var cp=u((yU,lp)=>{var eN=require("../node_modules/express/index.js"),Oo=new eN.Router,os=ip();Oo.route("/").get(os.get);Oo.route("/:cardCode/address").get(os.getAddress);Oo.route("/:cardCode/contact-person").get(os.getContactPerson);Oo.route("/:cardCode/special-price").get(os.getSpecialPrice);lp.exports=Oo});var dp=u(rs=>{var{dbCreds:gt}=D();rs.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${gt.CompanyDB}.ORIN T0, ${gt.CompanyDB}.RIN1 T1, ${gt.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;rs.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal"
  FROM ${gt.CompanyDB}.ORIN T0
    INNER JOIN ${gt.CompanyDB}.RIN1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${gt.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;rs.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${gt.CompanyDB}.ORIN T0 
  WHERE T0."U_POS_TransactionID" = ?`});var na=u(ss=>{var ra=b(),{buildHeaderRecQuery:tN,buildRowLevelQuery:oN}=_e(),sa=dp();ss.getCreditMemo=e=>{try{let t=tN(sa.creditMemoQuery,e);return console.log("getCreditMemo- sql: ",t),ra.executeWithValues(t)}catch(t){throw console.log("getCreditMemo - controller - error: "+JSON.stringify(t.message)),t}};ss.getItemDetails=e=>{try{let t=oN(sa.itemListForCreditMemo,e),o=ra.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};ss.getUniqueId=e=>{try{let t=ra.executeWithValues(sa.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUniqueId - Credit Memo Helper - error: "+JSON.stringify(t.message)),t}}});var pp=u(aa=>{var up=na();aa.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=up.getCreditMemo(e.query);t.send(r)}catch(r){console.log("get CreditMemo - controller - error: "+JSON.stringify(r.message)),o(r)}};aa.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=up.getItemDetails(e.query);console.log("getItems-CreditMemo controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Cp=u((CU,hp)=>{var rN=require("../node_modules/express/index.js"),ia=new rN.Router,mp=pp(),{checkUserPermission:yp}=v(),{portalModules:gp,permissions:Tp}=S();ia.route("/").get(yp(gp.CREDIT_MEMO,Tp.READ),mp.get);ia.route("/items").get(yp(gp.CREDIT_MEMO,Tp.READ),mp.getItems);hp.exports=ia});var Ap=u(fp=>{var{serviceLayerAPI:Sp}=Q(),{portalModules:sN,serviceLayerApiURIs:nN}=S(),aN=sN.CREDIT_MEMO,iN=nN[aN];fp.createCreditMemo=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemo request: "+JSON.stringify(e)),Sp.defaults.headers.Cookie=t;let o=await Sp.post(iN,e);return console.log(`Create CreditMemo response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemo error: "+o),o}}});var Np=u((fU,Ep)=>{var{getSLConnection:lN}=te(),cN=Ap(),dN=async(e,t,o)=>{try{let r=await lN(e),s=await cN.createCreditMemo(e.body,r);t.status(200).send({DocNum:s.DocNum})}catch(r){console.log("create CreditMemo Controller: "+JSON.stringify(r)),o(r)}};Ep.exports={create:dN}});var bp=u((AU,Dp)=>{var uN=require("../node_modules/express/index.js"),pN=Np(),{portalModules:mN,permissions:yN}=S(),{checkUserPermission:gN}=v(),Ip=new uN.Router;Ip.route("/").post(gN([mN.CREDIT_MEMO],yN.CREATE),pN.create);Dp.exports=Ip});var Rp=u(Uo=>{var{dbCreds:Ye}=D();Uo.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${Ye.CompanyDB}.ORRR T0, ${Ye.CompanyDB}.RRR1 T1, ${Ye.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;Uo.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal",
    T1."U_ReturnedInvoiceNos", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."U_ReturnReason"
  FROM ${Ye.CompanyDB}.ORRR T0
    INNER JOIN ${Ye.CompanyDB}.RRR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Ye.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;Uo.creditMemoAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${Ye.CompanyDB}.ORRR T0
  WHERE T0."DocEntry" = ?`;Uo.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${Ye.CompanyDB}.OADP T0`});var la=u(xo=>{var ns=b(),{buildHeaderRecQuery:TN,buildRowLevelQuery:hN}=_e(),as=Rp();xo.getCreditMemoRequest=e=>{try{let t=TN(as.creditMemoQuery,e,['T0."U_CODCntName"']);return console.log("getCreditMemoRequest- sql: ",t),ns.executeWithValues(t)}catch(t){throw console.log("getCreditMemoRequest - controller - error: "+JSON.stringify(t.message)),t}};xo.getItemDetails=e=>{try{let t=hN(as.itemListForCreditMemo,e),o=ns.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};xo.getAttachmentEntry=e=>{try{let t=ns.executeWithValues(as.creditMemoAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};xo.getAttachmentPath=()=>{try{let e=ns.executeWithValues(as.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(e.message)),e}}});var Up=u(ca=>{var Op=la();ca.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Op.getCreditMemoRequest(e.query);t.send(r)}catch(r){console.log("get CreditMemoRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};ca.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Op.getItemDetails(e.query);console.log("getItems-CreditMemoRequest controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var _p=u((DU,vp)=>{var CN=require("../node_modules/express/index.js"),da=new CN.Router,xp=Up(),{checkUserPermission:Lp}=v(),{portalModules:wp,permissions:Bp}=S();da.route("/").get(Lp(wp.CREDIT_MEMO_REQUEST,Bp.READ),xp.get);da.route("/items").get(Lp(wp.CREDIT_MEMO_REQUEST,Bp.READ),xp.getItems);vp.exports=da});var ma=u((Ke,Wp)=>{var{serviceLayerAPI:de}=Q(),{portalModules:Fp,serviceLayerApiURIs:SN}=S(),Pp=la(),fN=require("fs"),ua=require("path"),bU=require("../node_modules/pdfkit/js/pdfkit.js"),$p=require("../node_modules/multer/index.js"),AN=require("../node_modules/form-data/lib/form_data.js"),EN=require("../node_modules/axios/index.js"),NN=require("https"),IN=Fp.CREDIT_MEMO_REQUEST,pa=SN[IN],Mp=Fp.ATTACHMENTS,DN=$p.memoryStorage(),bN=$p({storage:DN});Ke.createCreditMemoRequest=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemoRequest request: "+JSON.stringify(e)),de.defaults.headers.Cookie=t;let o=await de.post(pa,e);return console.log(`Create CreditMemoRequest response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemoRequest error: "+o),o}};Ke.patchCreditMemoRequest=async(e,t,o)=>{try{return de.defaults.headers.Cookie=o,(await de.patch(`${pa}(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching CreditMemoRequest ${e}:`,r.response?.data||r.message),r}};Ke.patchInvoice=async(e,t,o)=>{try{return de.defaults.headers.Cookie=o,(await de.patch(`/Invoices(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching Invoice ${e}:`,r.response?.data||r.message),r}};Ke.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),de.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=ua.extname(s).replace(".",""),a=ua.basename(s,"."+n),l=s,i=(await Pp.getAttachmentPath()).AttachPath;console.log("source_dir",i);let c=ua.join(i,s);console.log("fullFilePath: *** "+c+" = "+r),fN.writeFileSync(c,r),console.log(`*** File saved successfully at ${c}`);let p={Attachments2_Lines:[{FileExtension:n,SourcePath:i,FileName:a}]},y={},g,E={Accept:"application/json","Content-Type":"application/json"};console.log("att_pdf",p);let h=await Pp.getAttachmentEntry(t);if(console.log("Invoice response",JSON.stringify(h)),h&&h?.AtcEntry!==null){if(g=h?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(g)),y=await de.patch(`${Mp}(${g})`,p),y&&y.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),y=await de.post(Mp,p,{headers:E}),console.log("Attachment Post API Called"),y.data){console.log("Attachment Post Response:"+JSON.stringify(y.data)),g=y.data.AbsoluteEntry;let T={AttachmentEntry:g},N=await de.patch(`${pa}(${t})`,T);if(N&&N.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",y.status),{message:"Unexpected response from server.",status:y.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};Ke.reopenInvoice=async(e,t)=>{try{console.log(`[SAP Action] Reopening Invoice: ${t}`),de.defaults.headers.Cookie=e;let o=await de.post(`/Invoices(${t})/Reopen`);return console.log(`[SAP Response] Reopen Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Reopening invoice ${t}:`,o.response?.data||o.message),o}};Ke.closeInvoice=async(e,t)=>{try{console.log(`[SAP Action] Closing Invoice: ${t}`),de.defaults.headers.Cookie=e;let o=await de.post(`/Invoices(${t})/Close`);return console.log(`[SAP Response] Close Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Closing invoice ${t}:`,o.response?.data||o.message),o}};Ke.createAttachment=async(e,t)=>{try{if(!e)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.originalname}`);let o=new AN;o.append("file",e.buffer,{filename:e.originalname,contentType:e.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await EN.post(s,o.getBuffer(),{headers:n,httpsAgent:new NN.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachment (Direct Upload) error:",JSON.stringify(r)),o?.response&&console.error(`*** status: ${o.response.status}`),null}};Wp.exports.upload=bN});var Jp=u((RU,Hp)=>{var{getSLConnection:RN}=te(),Le=ma(),kp=je(),ON=na(),ya=new Map,UN=async(e,t,o)=>{let r=!1,s=!0,n=null,a=null,l=null,d=!1,i=null;try{let c=JSON.parse(e.body.salesReturnData),p=c[0]||{},y=c[1]||[];if(i=p.Unique,i){if(ya.has(i))return console.error(`[BACKEND] Concurrent request detected for Return UniqueID: ${i}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});ya.set(i,!0)}if(i){console.log(`[Duplicate Check] Checking for existing return with Unique ID: ${i}`);let T=await ON.getUniqueId(i);if(T)return console.log(`[Duplicate Check] Duplicate found! Returning existing DocNum: ${T.DocNum}`),t.status(200).send({DocNum:T.DocNum,DocEntry:T.DocEntry,isExist:!0})}let g=e.file;if(a=await RN(e),!a)throw new Error("Session Login Failed");if(n=y?.[0]?.DocEntry,!n)throw new Error("Base Invoice DocEntry is missing");let E=await kp.getInvoiceByDocEntry(n,e);if(E?.DocumentStatus==="bost_Close"||E?.DocumentStatus==="C")try{console.log(`[Status] Invoice ${n} is closed. Attempting Reopen...`),await Le.reopenInvoice(a,n),console.log(`[Status] Reopen successful for ${n}`),r=!0}catch(T){let N=T.response?.data?.error?.message?.value||T.message;if(N.toLowerCase().includes("not supported")||N.includes("404")||T.response?.status===404)console.warn("[Fallback] SAP version does not support 'Reopen'. Falling back to Standalone mapping."),s=!1;else throw new Error(`Failed to reopen invoice: ${N}`)}if(l=E?.AttachmentEntry||null,l&&s)try{console.log(`[Attachment] Invoice ${n} has AttachmentEntry: ${l}. Temporarily clearing to prevent [131-102] folder error...`),await Le.patchInvoice(n,{AttachmentEntry:null},a),d=!0,console.log("[Attachment] Invoice attachment cleared. Native mapping ACTIVE \u2014 document link will be preserved.")}catch(T){let N=T.response?.data?.error?.message?.value||T.message;console.warn(`[Attachment Fallback] Could not temporarily clear invoice attachment (${N}). Falling back to Standalone mapping.`),s=!1}p.DocumentLines=p.DocumentLines.map((T,N)=>{let J=y[N],A={Quantity:Number(T.Quantity)};if(s&&(A.BaseType=13,A.BaseEntry=Number(n),A.BaseLine=J?Number(J.LineNum):N,E&&E.DocumentLines)){let f=E.DocumentLines.find(C=>C.LineNum===A.BaseLine);if(f){let C=Number(T.Quantity),x={},_={};if(Array.isArray(f.BatchNumbers)&&f.BatchNumbers.length>0){A.BatchNumbers=[],C=Number(T.Quantity);for(let I=0;I<f.BatchNumbers.length;I++){let B=f.BatchNumbers[I];if(C<=0)break;let U=Math.min(B.Quantity,C);A.BatchNumbers.push({BatchNumber:B.BatchNumber,Quantity:U,BaseLineNumber:N});let ge=A.BatchNumbers.length-1;x[I]=ge,_[ge]=U,C-=U}}let O={},k={};if(Array.isArray(f.SerialNumbers)&&f.SerialNumbers.length>0){A.SerialNumbers=[],C=Number(T.Quantity);for(let I=0;I<f.SerialNumbers.length;I++){let B=f.SerialNumbers[I];if(C<=0)break;A.SerialNumbers.push({InternalSerialNumber:B.InternalSerialNumber,Quantity:1,BaseLineNumber:N});let U=A.SerialNumbers.length-1;O[I]=U,k[U]=1,C-=1}}if(Array.isArray(f.DocumentLinesBinAllocations)&&f.DocumentLinesBinAllocations.length>0){A.DocumentLinesBinAllocations=[];for(let I=0;I<f.DocumentLinesBinAllocations.length;I++){let B=f.DocumentLinesBinAllocations[I],U,ge=0;if(A.BatchNumbers&&A.BatchNumbers.length>0?(U=x[B.SerialAndBatchNumbersBaseLine],U!==void 0&&(ge=_[U])):A.SerialNumbers&&A.SerialNumbers.length>0&&(U=O[B.SerialAndBatchNumbersBaseLine],U!==void 0&&(ge=k[U])),U!==void 0&&ge>0){let et=Math.min(B.Quantity,ge);et>0&&(A.DocumentLinesBinAllocations.push({BinAbsEntry:B.BinAbsEntry,Quantity:et,BaseLineNumber:N,SerialAndBatchNumbersBaseLine:U}),A.BatchNumbers&&A.BatchNumbers.length>0?_[U]-=et:A.SerialNumbers&&A.SerialNumbers.length>0&&(k[U]-=et))}}}}}return A}),console.log(`DEBUG: Mapping Mode: ${s?"NATIVE (linked)":"STANDALONE (unlinked)"}`),console.log("DEBUG: Mapped DocumentLines:",JSON.stringify(p.DocumentLines,null,2));let h=await Le.createCreditMemoRequest(p,a);if(console.log(`[Return] Created Return DocNum: ${h.DocNum}, DocEntry: ${h.DocEntry}`),d&&l)try{await Le.patchInvoice(n,{AttachmentEntry:l},a),console.log(`[Attachment] Restored AttachmentEntry (${l}) to Invoice ${n}`)}catch(T){console.warn("[Attachment Warning] Failed to restore invoice's AttachmentEntry:",T.response?.data||T.message)}if(l)try{await Le.patchCreditMemoRequest(h.DocEntry,{AttachmentEntry:l},a),console.log(`[Attachment] Linked base invoice AttachmentEntry (${l}) to Return ${h.DocEntry}`)}catch(T){console.warn("[Attachment Warning] Failed to link invoice attachment to return:",T.response?.data||T.message)}if(g){let T=await Le.createAttachment(g,a);if(T)try{await Le.patchCreditMemoRequest(h.DocEntry,{AttachmentEntry:T},a),console.log(`[Attachment] POS file attachment (${T}) linked to Return ${h.DocEntry}`)}catch(N){console.warn("[Attachment Warning] Failed to link POS attachment to Return:",N.response?.data||N.message)}}if(r)try{console.log(`[Status] Restoring Invoice ${n} to closed.`),await Le.closeInvoice(a,n)}catch{console.warn("[Status Warning] Failed to re-close invoice, but return was posted.")}y.length>0&&await kp.updateRemainingQuantity(y),t.status(200).send({DocNum:h.DocNum,DocEntry:h.DocEntry})}catch(c){let p=c.response?.data?.error?.message?.value||c.message;if(console.error("!!! FINAL ERROR !!!: "+p),d&&n&&a&&l)try{await Le.patchInvoice(n,{AttachmentEntry:l},a),console.log("[Cleanup] Restored invoice AttachmentEntry after error.")}catch(y){console.warn("[Cleanup Warning] Could not restore invoice AttachmentEntry:",y.message)}if(r&&n&&a)try{await Le.closeInvoice(a,n)}catch{}t.status(500).json({message:p})}finally{i&&ya.delete(i)}};Hp.exports={create:UN}});var jp=u((OU,Gp)=>{var xN=require("../node_modules/express/index.js"),LN=Jp(),{portalModules:wN,permissions:BN}=S(),{checkUserPermission:vN}=v(),qp=new xN.Router,_N=ma(),{upload:PN}=_N;qp.route("/").post(vN([wN.CREDIT_MEMO_REQUEST],BN.CREATE),PN.single("attachment"),LN.create);Gp.exports=qp});var zp=u(ga=>{var{dbCreds:we}=D();ga.inventoryCounting=`SELECT T0."DocNum", T0."DocEntry", T0."CountDate", T0."Time", T0."Status", T0."Remarks", T0."BPLId", T0."BPLName",
  T0."U_Location"
    FROM ${we.CompanyDB}.OINC T0
    JOIN ${we.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
  WHERE T0."Status" = 'O'
  AND T3."CounterId" = ?`;ga.itemListForInventoryCounting=`SELECT T1."ItemCode", T1."ItemDesc", T1."LineNum", T1."WhsCode", T4."BinCode", T1."CountQty", 
    T1."CountDate", T1."CountTime",T2."TotalQty", 
    (SELECT STRING_AGG(F."BcdCode", ', ') FROM  ${we.CompanyDB}.OBCD F
        WHERE F."ItemCode" = ITM."ItemCode") AS "CodeBars",  
    (SELECT E."ItmsGrpNam" FROM  ${we.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod" = ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod"
  FROM ${we.CompanyDB}.OINC T0
    INNER JOIN ${we.CompanyDB}.INC1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${we.CompanyDB}.INC9 T2 ON T0."DocEntry" = T2."DocEntry" 
    INNER JOIN ${we.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
    LEFT JOIN ${we.CompanyDB}.OBIN T4 ON T1."BinEntry" = T4."AbsEntry"
    INNER JOIN ${we.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T1."LineNum" = T2."LineNum" 
    AND T2."CounterNum" = T3."CounterNum"
    AND T0."DocNum" = ?
    AND T3."CounterId" = ?`});var Yp=u(Ta=>{var Vp=b(),{buildHeaderRecQuery:MN,buildRowLevelQuery:xU}=_e(),Qp=zp();Ta.getInventoryCounting=e=>{try{let t=MN(Qp.inventoryCounting,e,null,"CountDate");return console.log("getInventoryCounting- sql: ",t),Vp.executeWithValues(t,[e.counterId])}catch(t){throw console.log("getInventoryCounting - controller - error: "+JSON.stringify(t.message)),t}};Ta.getItemDetails=e=>{try{return{itemsList:Vp.executeWithValues(Qp.itemListForInventoryCounting,[e.docNum,e.counterId])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Xp=u(ha=>{var Kp=Yp();ha.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Kp.getInventoryCounting(e.query);t.send(r)}catch(r){console.log("get - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}};ha.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Kp.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}}});var tm=u((PU,em)=>{var FN=require("../node_modules/express/index.js"),Ca=new FN.Router,Zp=Xp(),{checkUserPermission:BU}=v(),{portalModules:vU,permissions:_U}=S();Ca.route("/").get(Zp.get);Ca.route("/items").get(Zp.getItems);em.exports=Ca});var rm=u(Sa=>{var{serviceLayerAPI:is}=Q(),{portalModules:$N,serviceLayerApiURIs:WN}=S(),kN=$N.INVENTORY_COUNTING,om=WN[kN];Sa.createInventoryCounting=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** InventoryCounting request: "+JSON.stringify(e)),is.defaults.headers.Cookie=t;let o=await is.post(om,e);return console.log(`Create InventoryCounting response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create InventoryCounting error: "+o),o}};Sa.updateInventoryCounting=async(e,t)=>{try{return console.log("*** InventoryCounting update request: "+JSON.stringify(e)),is.defaults.headers.Cookie=t,!!await is.patch(`${om}(${e.DocumentEntry})`,e)}catch(o){throw console.log("Create InventoryCounting error: "+o),o}}});var im=u(fa=>{var{getSLConnection:nm}=te(),am=rm(),sm=ho();fa.create=async(e,t,o)=>{try{let r=await nm(e),s=await am.createInventoryCounting(e.body,r),n="";s&&(n=s.DocumentNumber),t.status(200).send({docNum:n})}catch(r){console.log("create InventoryCounting Controller: "+JSON.stringify(r)),o(r)}};fa.update=async(e,t,o)=>{try{let r=await nm(e),{SalesBatchSelection:s}=e.body,n=e.body.DocNum;if(delete e.body.SalesBatchSelection,delete e.body.DocNum,console.log("Update InventoryCounting request: "+JSON.stringify(e.body)),await am.updateInventoryCounting(e.body,r)){if(Array.isArray(s)&&s.length>0){let l=await Promise.all(s.map(d=>d.DocEntry?(console.log("Update SBS -------->"),sm.updateSalesBatchSelection(d,r)):sm.createSalesBatchSelection(d,"",n,r)))}t.status(200).send({success:!0,message:"Success"})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("update InventoryCounting Controller: "+JSON.stringify(r)),o(r)}}});var dm=u((HU,cm)=>{var HN=require("../node_modules/express/index.js"),lm=im(),{portalModules:$U,permissions:WU}=S(),{checkUserPermission:kU}=v(),Aa=new HN.Router;Aa.route("/").post(lm.create);Aa.route("/").patch(lm.update);cm.exports=Aa});var um=u(Lo=>{var{dataSource:ls}=ie(),cs=Ys(),Ea="userGroupId";Lo.createUserGroup=async e=>{try{return await ls.getRepository(cs).save(e)}catch(t){throw t}};Lo.getUserGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ea]=e.id,delete e.id);try{let o=ls.getRepository(cs);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupId:"ASC"}})}catch(o){throw o}};Lo.updateUserGroup=async(e,t)=>{try{let o=ls.getRepository(cs),r={};return console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(r=await o.update({[Ea]:e},t)),r}catch(o){throw o}};Lo.deleteUserGroup=async e=>{try{return await ls.getRepository(cs).delete({[Ea]:e})}catch(t){throw t}}});var pm=u(qt=>{var wo=um();qt.create=async(e,t,o)=>{if(!e.body||!e.session.userId||!e.body.groupId){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await wo.createUserGroup(e.body);t.send(r)}catch(r){console.error("Error creating UserGroup!"),o(r)}};qt.findAll=async(e,t,o)=>{try{let r=await wo.getUserGroup(e.query);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};qt.findOne=async(e,t,o)=>{try{let r=await wo.getUserGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};qt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await wo.updateUserGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating UserGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};qt.delete=async(e,t,o)=>{try{let r=await wo.deleteUserGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserGroup!"),o(r)}}});var ym=u((GU,mm)=>{var JN=require("../node_modules/express/index.js"),Bo=pm(),Gt=new JN.Router;Gt.post("/",Bo.create);Gt.get("/",Bo.findAll);Gt.get("/:id",Bo.findOne);Gt.put("/:id",Bo.update);Gt.delete("/:id",Bo.delete);mm.exports=Gt});var Tm=u(jt=>{var vo=pr(),{formatDate:gm}=q(),qN="storeName";jt.create=async(e,t,o)=>{if(!e.body||!e.body[qN]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body),e.body.createdBy=e.session.userId,e.body.createdAt=gm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await vo.createStore(e.body);t.send(r)}catch(r){console.error("Error creating Store!"),o(r)}};jt.findAll=async(e,t,o)=>{try{let r=await vo.getStore(e.query);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};jt.findOne=async(e,t,o)=>{try{let r=await vo.getStore(e.params,1);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};jt.update=async(e,t,o)=>{if(e.params.id&&e.body){e.body.modifiedBy=e.session.userId,e.body.modifiedAt=gm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await vo.updateStore(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating Store!"),o(r)}}else t.status(400).send({message:"Invalid request!"})};jt.delete=async(e,t,o)=>{try{let r=await vo.deleteStore(e.params.id);t.send(r)}catch(r){console.error("Error deleting Store!"),o(r)}}});var fm=u(Tt=>{var{createStoreWarehouse:GN,getStoreWarehouse:hm,updateStoreWarehouse:jN,deleteStoreWarehouse:Cm,parentPrimaryKey:Na}=nt(),{formatDate:Sm}=q();Tt.create=async(e,t,o)=>{if(console.log("Create StoreWarehouse - req.body: ",e.body),console.log("Create StoreWarehouse - req.params: ",e.params),!e.body||!e.params[Na]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Sm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await GN(e.body,e.params[Na],r,s);t.send(n)}catch(n){console.error("Error creating StoreWarehouse!"),o(n)}};Tt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await hm(r);t.send(s)}catch(s){console.error("Error getting StoreWarehouse!"),o(s)}};Tt.findOne=async(e,t,o)=>{try{let r=await hm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreWarehouse!"),o(r)}};Tt.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Sm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await jN(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreWarehouse!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Tt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Cm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}};Tt.deleteAll=async(e,t,o)=>{if(!e.params[Na]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Cm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}}});var Im=u(ht=>{var{createStoreCounter:zN,getStoreCounter:Am,updateStoreCounter:VN,deleteStoreCounter:Em,parentPrimaryKey:Ia}=Ks(),{formatDate:Nm}=q();ht.create=async(e,t,o)=>{if(console.log("Create StoreCounter - req.body: ",e.body),console.log("Create StoreCounter - req.params: ",e.params),!e.body||!e.params[Ia]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Nm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await zN(e.body,e.params[Ia],r,s);t.send(n)}catch(n){console.error("Error creating StoreCounter!"),o(n)}};ht.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Am(r);t.send(s)}catch(s){console.error("Error getting StoreCounter!"),o(s)}};ht.findOne=async(e,t,o)=>{try{let r=await Am(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreCounter!"),o(r)}};ht.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Nm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await VN(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreCounter!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};ht.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}};ht.deleteAll=async(e,t,o)=>{if(!e.params[Ia]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}}});var Om=u(Ct=>{var{createStoreUser:QN,getStoreUser:Dm,updateStoreUser:YN,deleteStoreUser:bm,parentPrimaryKey:Da}=Xs(),{formatDate:Rm}=q();Ct.create=async(e,t,o)=>{if(console.log("Create StoreUser - req.body: ",e.body),console.log("Create StoreUser - req.params: ",e.params),!e.body||!e.params[Da]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Rm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await QN(e.body,e.params[Da],r,s);t.send(n)}catch(n){console.error("Error creating StoreUser!"),o(n)}};Ct.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Dm(r);t.send(s)}catch(s){console.error("Error getting StoreUser!"),o(s)}};Ct.findOne=async(e,t,o)=>{try{let r=await Dm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreUser!"),o(r)}};Ct.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Rm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await YN(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreUser!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};Ct.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await bm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}};Ct.deleteAll=async(e,t,o)=>{if(!e.params[Da]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await bm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}}});var xm=u((YU,Um)=>{var KN=require("../node_modules/express/index.js"),_o=Tm(),zt=fm(),Vt=Im(),Qt=Om(),{parentPrimaryKey:Yt}=nt(),{portalModules:P,permissions:$}=S(),{checkUserPermission:W}=v(),M=new KN.Router;M.post("/",W(P.STORE_SETUP,$.CREATE),_o.create);M.get("/",W(P.STORE_SETUP,$.READ),_o.findAll);M.get("/:id",W(P.STORE_SETUP,$.READ),_o.findOne);M.put("/:id",W(P.STORE_SETUP,$.WRITE),_o.update);M.delete("/:id",W(P.STORE_SETUP,$.CANCEL),_o.delete);M.post(`/:${Yt}/warehouse/`,W(P.STORE_WAREHOUSE,$.CREATE),zt.create);M.get(`/:${Yt}/warehouse/`,W([P.STORE_WAREHOUSE,P.INVOICE],$.READ),zt.findAll);M.get("/warehouse/find",W(P.STORE_WAREHOUSE,$.READ),zt.findAll);M.get("/warehouse/:id",W(P.STORE_WAREHOUSE,$.READ),zt.findOne);M.put("/warehouse/:id",W(P.STORE_WAREHOUSE,$.WRITE),zt.update);M.delete("/warehouse/:id",W(P.STORE_WAREHOUSE,$.CANCEL),zt.delete);M.post(`/:${Yt}/counter/`,W(P.STORE_COUNTER,$.CREATE),Vt.create);M.get(`/:${Yt}/counter/`,W(P.STORE_COUNTER,$.READ),Vt.findAll);M.get("/counter/find",W(P.STORE_COUNTER,$.READ),Vt.findAll);M.get("/counter/:id",W(P.STORE_COUNTER,$.READ),Vt.findOne);M.put("/counter/:id",W(P.STORE_COUNTER,$.WRITE),Vt.update);M.delete("/counter/:id",W(P.STORE_COUNTER,$.CANCEL),Vt.delete);M.post(`/:${Yt}/user/`,W(P.STORE_USER,$.CREATE),Qt.create);M.get(`/:${Yt}/user/`,W(P.STORE_USER,$.READ),Qt.findAll);M.get("/user/find",W(P.STORE_USER,$.READ),Qt.findAll);M.get("/user/:id",W(P.STORE_USER,$.READ),Qt.findOne);M.put("/user/:id",W(P.STORE_USER,$.WRITE),Qt.update);M.delete("/user/:id",W(P.STORE_USER,$.CANCEL),Qt.delete);Um.exports=M});var wm=u(Po=>{var{dataSource:ds}=ie(),us=js(),Lm="parkedTransactionId",XN="parkedDateTime",ZN="ASC",{getStoreWarehouse:eI}=nt();Po.createParkedTransaction=async e=>{try{return await ds.getRepository(us).save(e)}catch(t){throw t}};Po.getParkedTransaction=async(e,t,o=null)=>{t&&!e.storeId&&(e.storeId=t),console.log("filter: ",JSON.stringify(e)),e.id&&(e[Lm]=e.id,delete e.id);try{let r=ds.getRepository(us),s,n=[];if(t)try{n=(await eI({storeId:t})||[]).map(i=>i.warehouseCode),console.log(`[BACKEND] Fetched ${n.length} warehouses for storeId ${t}`)}catch(d){console.error(`[BACKEND] Error fetching warehouse list for storeId ${t}:`,d.message)}if(o===1?s=await r.findOneBy(e):s=await r.find({where:e,order:{[XN]:ZN}}),!s)return[];let a=Array.isArray(s)?s:[s],l=[];for(let d of a){let{data:i}=d,c;try{c=JSON.parse(i)}catch(g){console.error(`Error parsing data for record with storeId ${t}:`,g);continue}(c.salesItems||c.salesQuotationItems||[]).every(g=>!n||n.length===0?!0:n.includes(g.WhsCode))&&l.push(d)}return l}catch(r){throw r}};Po.getLatestNextRefNum=async()=>{try{let t=await ds.getRepository(us).find({order:{nextRefNum:"DESC"},take:1});return t.length===0?1:t[0].nextRefNum}catch(e){throw e}};Po.deleteParkedTransaction=async e=>{try{return await ds.getRepository(us).delete({[Lm]:e})}catch(t){throw t}}});var vm=u(Fo=>{var Mo=wm(),{formatDate:Bm}=q();Fo.create=async(e,t,o)=>{if(!e.body||!e.body.transactionType||!e.body.data){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let{userSessionLog:r}=e.session;e.body.userId=r.userId,e.body.userName=r.userName,e.body.storeId=r.storeId,e.body.storeLocation=r.storeLocation,e.body.storeCounterId=r.storeCounterId,e.body.counterCode=r.counterCode,e.body.parkedDateTime=Bm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let{data:s}=e.body;s&&typeof s=="object"&&!Array.isArray(s)&&(s=JSON.stringify(s),e.body.data=s);let n=await Mo.getLatestNextRefNum();e.body.transactionRefNum=`${n}-${Bm(new Date,"ddmm")}`,e.body.nextRefNum=n+1;let a=await Mo.createParkedTransaction(e.body);t.send({id:a.parkedTransactionId})}catch(r){console.error("Error creating ParkedTransaction!"),o(r)}};Fo.findAll=async(e,t,o)=>{try{let r=e.session.userSessionLog.storeId,s=await Mo.getParkedTransaction(e.query,r);t.send(s)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Fo.findOne=async(e,t,o)=>{try{let r=await Mo.getParkedTransaction(e.params,1);t.send(r)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Fo.delete=async(e,t,o)=>{try{let r=await Mo.deleteParkedTransaction(e.params.id);t.send(r)}catch(r){console.error("Error deleting ParkedTransaction!"),o(r)}}});var Pm=u((ZU,_m)=>{var tI=require("../node_modules/express/index.js"),ps=vm(),$o=new tI.Router;$o.post("/",ps.create);$o.get("/",ps.findAll);$o.get("/:id",ps.findOne);$o.delete("/:id",ps.delete);_m.exports=$o});var Mm=u(ba=>{var{cookieName:oI,httpStatusCodes:rI,recordState:sI}=S(),{formatDate:nI}=q(),{updateUserSessionLog:aI}=Ut(),{invalidateSLCache:iI}=te();ba.get=async(e,t,o)=>{try{let{permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:l,storeWHCode:d,userTIN:i,userGroup:c}=e.session;!c&&l?.userGroup&&(c=l.userGroup),!n&&l?.displayUserName&&(n=l.displayUserName),console.log("LOG LOGIN - BACKEND - session data retrieved:",{userName:s,displayUserName:n,userId:a,userGroup:c}),t.send({permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:l,storeWHCode:d,userTIN:i,userGroup:c})}catch(r){console.error("Error getting Session data!"),o(r)}};ba.delete=async(e,t,o)=>{console.log("Destroying session!");try{if(e.session&&e.session.cookie){if(e.session.userSessionLog&&e.session.userSessionLog.userSessionLogId){let r={sessionStatus:sI.INACTIVE,logoutTime:nI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")};await aI(e.session.userSessionLog.userSessionLogId,r)}t.clearCookie(oI,{path:"/"}),e.session.destroy(r=>{if(r)throw r}),iI(e)}t.status(rI.OK).json({message:"Logged out successfully!"})}catch(r){console.error("Error destroying session!"),o(r)}}});var Wm=u((tx,$m)=>{var Fm=Mm(),lI=require("../node_modules/express/index.js"),Ra=new lI.Router;Ra.get("/",Fm.get);Ra.delete("/logout",Fm.delete);$m.exports=Ra});var Hm=u(Kt=>{var Wo=Ut(),cI=nt(),dI=pr(),{formatDate:uI}=q(),{canAssignUserToCounter:km}=hr();Kt.create=async(e,t,o)=>{if(!e.body){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=!0;if(e.body.storeCounterId&&(r=await km(e.session.userId,e.body.storeCounterId)),r){e.body.loginTime=uI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let s=await Wo.createUserSessionLog(e.body);t.send(s)}}catch(r){console.error("Error creating UserSessionLog!"),o(r)}};Kt.findAll=async(e,t,o)=>{try{let r=await Wo.getUserSessionLog(e.query);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Kt.findOne=async(e,t,o)=>{try{let r=await Wo.getUserSessionLog(e.params,1);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};Kt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=!0;if(e.body.storeCounterId&&(r=await km(e.session.userId,e.body.storeCounterId)),r){let s="",n="";if(e.body.storeId){let i=await dI.getStore({storeId:e.body.storeId});console.log("store: ",i[0]),Array.isArray(i)&&i.length>0&&(n=i[0].locationCode,s=i[0].location,e.body.storeLocation=s,e.session.userSessionLog.storeLocation=s,e.session.userSessionLog.locationCode=n)}let a=await Wo.updateUserSessionLog(e.params.id,e.body);console.log("user-session-log.controller - update - response: ",a);let l="",{counterName:d}=e.body;if(e.body.storeId&&e.body.storeCounterId&&e.body.counterCode){e.session.userSessionLog.storeId=e.body.storeId,e.session.userSessionLog.storeCounterId=e.body.storeCounterId,e.session.userSessionLog.counterCode=e.body.counterCode,e.session.userSessionLog.counterName=d;let i=await cI.getStoreWarehouse({storeId:e.body.storeId});console.log("storeWarehouse: ",i[0]),Array.isArray(i)&&i.length>0&&(l=i[0].warehouseCode,e.session.storeWHCode=l)}t.send({...a,storeWHCode:l,storeLocation:s,locationCode:n})}}catch(r){console.error("Error updating UserSessionLog!"),e.session.userSessionLog.storeId="",e.session.userSessionLog.storeCounterId="",e.session.userSessionLog.counterCode="",e.session.storeWHCode="",o(r)}else t.status(400).send({message:"Invalid request!"})};Kt.delete=async(e,t,o)=>{try{let r=await Wo.deleteUserSessionLog(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserSessionLog!"),o(r)}}});var qm=u((rx,Jm)=>{var pI=require("../node_modules/express/index.js"),ko=Hm(),Xt=new pI.Router;Xt.post("/",ko.create);Xt.get("/",ko.findAll);Xt.get("/:id",ko.findOne);Xt.put("/:id",ko.update);Xt.delete("/:id",ko.delete);Jm.exports=Xt});var gs=u(Xe=>{var{dataSource:ms}=ie(),ys=Vs(),Ho="itemGroupMemberId";Xe.parentPrimaryKey="itemGroupId";Xe.createQCItemGroupMember=async(e,t)=>{try{let o;return Array.isArray(e)?o=e.map(s=>({...s,[Xe.parentPrimaryKey]:t})):o={...e,[Xe.parentPrimaryKey]:t},await ms.getRepository(ys).save(o)}catch(o){throw o}};Xe.getQCItemGroupMember=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ho]=e.id,delete e.id);try{let o=ms.getRepository(ys);return t===1?await o.findOneBy(e):await o.findBy(e)}catch(o){throw o}};Xe.updateQCItemGroupMember=async(e,t)=>{try{let o=ms.getRepository(ys);return t[Ho]&&delete t[Ho],await o.update({[Ho]:e},t)}catch(o){throw o}};Xe.deleteQCItemGroupMember=async e=>{e.id&&(e[Ho]=e.id,delete e.id);try{return await ms.getRepository(ys).delete(e)}catch(t){throw t}}});var zm=u(Jo=>{var{dataSource:Ts}=ie(),{createQCItemGroupMember:jm,updateQCItemGroupMember:mI}=gs(),hs=zs(),Cs="itemGroupId",Gm="itemGroupMemberId";Jo.createQCItemGroup=async e=>{try{let o=await Ts.getRepository(hs).save(e);if(e.items){let r=await jm(e.items,o[Cs]);o.items=r}return o}catch(t){throw t}};Jo.getQCItemGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Cs]=e.id,delete e.id);try{let o=Ts.getRepository(hs);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupName:"ASC"}})}catch(o){throw o}};Jo.updateQCItemGroup=async(e,t)=>{try{let o=Ts.getRepository(hs),r;t.items&&(r=t.items,delete t.items);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[Cs]:e},t)),r){let n=[];if(r.forEach(async a=>{a[Gm]?await mI(a[Gm],a):n.push(a)}),n.length>0){let a=await jm(n,e);s.items=a}}return s}catch(o){throw o}};Jo.deleteQCItemGroup=async e=>{try{return await Ts.getRepository(hs).delete({[Cs]:e})}catch(t){throw t}}});var Vm=u(Zt=>{var qo=zm();Zt.create=async(e,t,o)=>{if(!e.body||!e.body.groupName){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await qo.createQCItemGroup(e.body);t.send(r)}catch(r){console.error("Error creating QCItemGroup!"),o(r)}};Zt.findAll=async(e,t,o)=>{try{let r=await qo.getQCItemGroup(e.query);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Zt.findOne=async(e,t,o)=>{try{let r=await qo.getQCItemGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Zt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await qo.updateQCItemGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Zt.delete=async(e,t,o)=>{try{let r=await qo.deleteQCItemGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting QCItemGroup!"),o(r)}}});var Km=u(St=>{var{createQCItemGroupMember:yI,getQCItemGroupMember:Qm,updateQCItemGroupMember:gI,deleteQCItemGroupMember:Ym,parentPrimaryKey:Oa}=gs();St.create=async(e,t,o)=>{if(console.log("Create QCItemGroupMember - req.body: ",e.body),console.log("Create QCItemGroupMember - req.params: ",e.params),!e.body||!e.params[Oa]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await yI(e.body,e.params[Oa]);t.send(r)}catch(r){console.error("Error creating QCItemGroupMembers!"),o(r)}};St.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Qm(r);t.send(s)}catch(s){console.error("Error getting QCItemGroupMembers!"),o(s)}};St.findOne=async(e,t,o)=>{try{let r=await Qm(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroupMembers!"),o(r)}};St.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await gI(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroupMembers!"),o(r)}else t.status(400).send({message:"Invalid request!"})};St.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Ym(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}};St.deleteAll=async(e,t,o)=>{if(!e.params[Oa]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Ym(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}}});var Zm=u((lx,Xm)=>{var TI=require("../node_modules/express/index.js"),Go=Vm(),ft=Km(),{parentPrimaryKey:Ua}=gs(),ye=new TI.Router;ye.post("/",Go.create);ye.get("/",Go.findAll);ye.get("/:id",Go.findOne);ye.put("/:id",Go.update);ye.delete("/:id",Go.delete);ye.post(`/:${Ua}/item/`,ft.create);ye.get(`/:${Ua}/item/`,ft.findAll);ye.get("/item/find",ft.findAll);ye.get("/item/:id",ft.findOne);ye.put("/item/:id",ft.update);ye.delete("/item/:id",ft.delete);ye.delete(`/:${Ua}/item`,ft.deleteAll);Xm.exports=ye});var xa=u(jo=>{var{dbCreds:At}=D(),{draftObjectCodes:cx}=S();jo.selectApprovedDeliveries=`SELECT T0."DocNum", T0."DocStatus", T0."CANCELED", T0."ObjType", T0."DocDate", T0."DocTime", 
  T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal", T0."DocTotalFC", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."U_DraftDocEntry",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
  T0."BPLName"
     FROM ${At.CompanyDB}.ODLN T0, ${At.CompanyDB}.OUSR TOR
   WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
     AND T0."U_DraftStatus" = 'AUTO_APPROVED'`;jo.selectItemDetails=`SELECT T1."LineNum", T1."LineStatus", T0."DocNum", T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
    T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
  FROM ${At.CompanyDB}.ODLN T0, ${At.CompanyDB}.DLN1 T1
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `;jo.selectTaxTotal=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
    FROM ${At.CompanyDB}.ODLN T0
  LEFT JOIN ${At.CompanyDB}.DLN4 T1 ON T0."DocEntry" = T1."DocEntry"
    WHERE T0."DocNum" = ?`;jo.selectDeliveryWithCustomerRefNoQuery=`SELECT DISTINCT T0."NumAtCard" as "CustomerRefNo"
  FROM ${At.CompanyDB}.ODLN T0
WHERE T0."NumAtCard" IS NOT NULL
  AND T0."CANCELED" NOT IN ('Y','C')
  AND T0."NumAtCard" = ?`});var ty=u((mx,ey)=>{var{dbCreds:$e}=D(),{draftObjectCodes:ux,recordState:px}=S(),hI=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
    FROM ${$e.CompanyDB}.ODRF T0, ${$e.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."ObjType" = ?`,CI=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName",
T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
  FROM ${$e.CompanyDB}.ODRF T0, ${$e.CompanyDB}.OUSR TOR, ${$e.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ?
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,SI=`SELECT TRW."LineNum", TRW."LineStatus", TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${$e.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,fI=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
  FROM ${$e.CompanyDB}.ODRF T0
LEFT JOIN ${$e.CompanyDB}.DRF4 T1 ON T0."DocEntry" = T1."DocEntry"
  WHERE T0."DocEntry" IN `,AI=`UPDATE ${$e.CompanyDB}.ODRF T0 SET `;ey.exports={selectDrafts:hI,selectDraftsWithMultiApprover:CI,selectItemDetailsForDrafts:SI,selectDraftTaxTotal:fI,updateDraft:AI}});var Ss=u(eo=>{var zo=b(),{userRoles:yx,draftStatus:gx,portalModules:Tx}=S(),Vo=ty(),EI=' ORDER BY T0."DocEntry" ASC';eo.getDrafts=(e="",t=[])=>{try{let o=Vo.selectDrafts,r=zo.executeWithValues(o+e+EI,t);return console.log("getDraftItems: "+JSON.stringify(r)),r}catch(o){throw o}};eo.getDraftsForApprover=(e,t)=>{try{let o=zo.executeWithValues(Vo.selectDraftsWithMultiApprover,[e,t]);return console.log("getDraftItems: "+JSON.stringify(o)),o}catch(o){throw o}};eo.getDraftItems=e=>{try{let t=zo.executeWithValues(Vo.selectItemDetailsForDrafts+`(${e})`,[]);return console.log("getDraftItems: "+JSON.stringify(t)),t}catch(t){throw t}};eo.getDraftTax=e=>{try{let t=zo.executeWithValues(Vo.selectDraftTaxTotal+`(${e})`,[]);return console.log("getDraftTax: "+JSON.stringify(t)),t}catch(t){throw t}};eo.updateDraft=(e,t)=>{let o=[],r=[],s=" WHERE ";e.U_TargetRecDocNum&&(o.push('T0."U_TargetRecDocNum" = ?'),r.push(e.U_TargetRecDocNum)),e.U_DraftStatus&&(o.push('T0."U_DraftStatus" = ?'),r.push(e.U_DraftStatus)),t.DocEntry?(s=s+'T0."DocEntry" = ?',r.push(t.DocEntry)):t.DocNum&&(s=s+'T0."DocNum" = ?',r.push(t.DocNum));try{let n=Vo.updateDraft+o.join()+s;console.log("updateDraft - sql: ",n),console.log("updateDraft - values: ",r.join());let a=zo.executeWithValues(n,r);return Array.isArray(a)&&a.length>0?a:void 0}catch(n){throw n}}});var ry=u(Qo=>{var fs=b(),{itemTypes:Cx,draftStatus:Sx,userRoles:La,draftObjectCodes:NI,portalModules:II}=S(),As=xa(),DI=_t(),wa=Ss(),bI=II.DELIVERY;Qo.getDeliveryWithCustomerRefNo=e=>{try{let t=fs.executeWithValues(As.selectDeliveryWithCustomerRefNoQuery,[e]);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}};Qo.getItemDetails=e=>{try{console.log("docNum:"+e);let t=fs.executeWithValues(As.selectItemDetails+`(${e})`,[]);return console.log("Delivery - getItemDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Qo.getTaxDetails=e=>{try{console.log("docNum:"+e);let t=fs.executeWithValues(As.selectTaxTotal,[e]);return console.log("Delivery - getTaxDetails: "+JSON.stringify(t)),t}catch(t){throw t}};Qo.getDeliveryRecords=e=>{console.log("### getDeliveryRecords - filter: "+JSON.stringify(e));try{let t=[],o=[],r=NI[bI];if(e.userRole==La.APPROVER)t=wa.getDraftsForApprover(r,e.userId);else if(e.userRole==La.ORIGINATOR){let s=' AND T0."U_OriginatorId" = ?';t=wa.getDrafts(s,[r,e.userId]),o=oy(s,[e.userId])}else if(e.userRole==La.ADMIN){let s=[],n=` AND T0."U_OriginatorId" IN (${e.originatorIds})
                    AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`;s.push(e.fromDate,e.toDate),e.status&&e.status!=="ALL"&&(n=n+' AND T0."U_DraftStatus" IN (?)',s.push(e.status)),t=wa.getDrafts(n,[r,...s]),o=oy(n,s)}if(Array.isArray(t)&&t.length){let s=[];if(t.forEach(n=>{s.push(n.DocEntry)}),Array.isArray(s)&&s.length){let n=DI.getApproversForDraft(s);if(console.log("allApprovers: "+JSON.stringify(n)),Array.isArray(n)&&n.length){let a=[];t.forEach(l=>{n.forEach(d=>{l.DocEntry==d.U_DocEntry&&a.push(d)}),l.approvers=a,a=[]})}}}return[...t,...o]}catch(t){throw console.log("getDeliveryRecords - controller - error: "+JSON.stringify(t)),t}};var oy=(e="",t=[])=>{let o=' ORDER BY T0."DocEntry" ASC';try{let r=fs.executeWithValues(As.selectApprovedDeliveries+e+o,t);return console.log("getAutoApprovedRecords: "+JSON.stringify(r)),r}catch(r){throw r}}});var ny=u(Is=>{var Es=ry(),sy=Ss(),{recordTypes:Ns}=S();Is.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=[];e.query.customerRefNo?r=Es.getDeliveryWithCustomerRefNo(e.query.customerRefNo):e.query.userRole&&(r=Es.getDeliveryRecords(e.query)),t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};Is.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Ns.DIRECT?r=Es.getItemDetails(e.query.docNum):e.params.recordType===Ns.DRAFT&&(r=sy.getDraftItems(e.query.docEntry)),console.log("Delivery - getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}};Is.getTax=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Ns.DIRECT?r=Es.getTaxDetails(e.query.docNum):e.params.recordType===Ns.DRAFT&&(r=sy.getDraftTax(e.query.docEntry)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}}});var dy=u((Ex,cy)=>{var RI=require("../node_modules/express/index.js"),Ds=new RI.Router,{checkUserPermission:ay}=v(),Ba=ny(),{portalModules:iy,permissions:ly}=S();Ds.route("/").get(ay(iy.DELIVERY,ly.READ),Ba.get);Ds.route("/items/:recordType?").get(ay(iy.DELIVERY,ly.READ),Ba.getItems);Ds.route("/tax/:recordType?").get(Ba.getTax);cy.exports=Ds});var py=u(uy=>{var Nx=b(),{itemTypes:Ix,draftStatus:Dx,portalModules:bx}=S();uy.getDraft=async(e,t=null)=>{try{return(await t.get(`Drafts(${e})`)).data}catch(o){throw o}}});var fy=u(Ze=>{var OI=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:ue}=Q(),{sendMail:Cy}=Re(),va=_t(),Ox=ln(),my=Bt(),yy=Ar(),We=b(),ke=D(),Ux=xa(),{portalModules:UI,draftStatus:V,draftObjectCodes:Sy,systemCurrency:gy,serviceLayerApiURIs:xI,recordTypes:Ty}=S(),{getRandomNo:xx,formatDate:LI}=q(),wI=Ss(),BI=py(),Yo=UI.DELIVERY,Pa=xI[Yo];Ze.createDeliveryDraft=async(e,t,o)=>{if(console.log(`request: ${JSON.stringify(e)}`),o){ue.defaults.headers.Cookie=o;try{if(e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,Array.isArray(t)&&t.length){e.DocObjectCode=Sy[Yo],e.U_DraftStatus||(e.U_DraftStatus=V.PENDING),e.U_MultiLevelApproval=t?t[0].U_MultiLevelApproval:"",e.U_NoOfApprovals=t?parseInt(t[0].U_NoOfApprovals,10):0,console.log("*** DRAFTS request: "+JSON.stringify(e));let r=await ue.post("Drafts",e);return console.log("*** DRAFTS response: "+r),r.data?{draftNum:r.data.DocEntry}:void 0}else{e.U_DraftStatus=V.AUTO_APPROVED;let r=await Ze.createDelivery(e,o);return r?{docNum:r.data.DocNum}:void 0}}catch(r){throw console.log("Create Delivery error: "+r),r}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ze.createDelivery=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{ue.defaults.headers.Cookie=t,e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,e.U_DraftStatus=V.AUTO_APPROVED,console.log("*** Delivery request: "+JSON.stringify(e));let o=await ue.post(Pa,e);return console.log(`Create Delivery response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create Delivery error: "+o),o}};var hy=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o};Ze.createDeliveryFromDraft=async(e,t,o)=>{ue.defaults.headers.Cookie=o;try{console.log("draft: "+JSON.stringify(e));let r=[],s={},n=[],a=e.DocCurrency;Array.isArray(e.DocumentLines)&&e.DocumentLines.length&&e.DocumentLines.forEach(i=>{s={LineNum:i.LineNum,LocationCode:i.LocationCode,ItemCode:i.ItemCode,Quantity:i.Quantity,BaseType:i.BaseType,BaseEntry:i.BaseEntry,BaseLine:i.BaseLine,MeasureUnit:i.MeasureUnit,WarehouseCode:i.WarehouseCode},s.BatchNumbers=hy("Batch",i.BatchNumbers),s.SerialNumbers=hy("Serial",i.SerialNumbers),s.DocumentLinesBinAllocations=OI(i.DocumentLinesBinAllocations.sort((c,p)=>c.SerialAndBatchNumbersBaseLine-p.SerialAndBatchNumbersBaseLine)),r.push(s)}),r.sort((i,c)=>i.BaseLine-c.BaseLine),Array.isArray(e.DocumentAdditionalExpenses)&&e.DocumentAdditionalExpenses.length&&e.DocumentAdditionalExpenses.forEach(i=>{n.push({LineNum:i.LineNum,ExpenseCode:i.ExpenseCode,LineTotal:a===gy?i.LineTotal:i.LineTotalFC})});let l={DocDate:e.DocDate,DocDueDate:e.DocDueDate,CardCode:e.CardCode,CardName:e.CardName,Address:e.Address,NumAtCard:e.NumAtCard,DocCurrency:a,DocRate:e.DocRate,Reference1:e.Reference1,Reference2:e.Reference2,Comments:e.Comments,DocObjectCode:e.DocObjectCode,CreationDate:e.CreationDate,DocTime:e.DocTime,UpdateDate:e.UpdateDate,UpdateTime:e.UpdateTime,VatPercent:e.VatPercent,VatSum:e.VatSum,DiscountPercent:e.DiscountPercent,TotalDiscount:a===gy?e.TotalDiscount:e.TotalDiscountFC,U_OriginatorId:e.U_OriginatorId,U_ApproverId:e.U_ApproverId,U_DraftStatus:e.U_DraftStatus,U_MultiLevelApproval:e.U_MultiLevelApproval,U_NoOfApprovals:parseInt(e.U_NoOfApprovals,10),U_DraftDocEntry:t,DocumentLines:r,DocumentAdditionalExpenses:n};return e.BPL_IDAssignedToInvoice&&(l.BPL_IDAssignedToInvoice=e.BPL_IDAssignedToInvoice),console.log("***deliveryRequest: "+JSON.stringify(l)),await ue.post(Pa,l)}catch(r){let s=V.PENDING,n=await ue.patch(`Drafts(${t})`,{U_DraftStatus:s});throw console.log("resetDraftStatus - response.data: "+n),r}};var _a=async(e,t,o,r)=>{let s=isNaN(e.U_ApprovalLevel)?0:parseInt(e.U_ApprovalLevel);try{let n=e.DocEntry;console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let a;ue.defaults.headers.Cookie=o;let l=await ue.patch(`Drafts(${n})`,{Comments:e.Comments,U_DraftStatus:e.U_DraftStatus});if(console.log("PATCH Draft - response.data: "+JSON.stringify(l.data)),e.U_DraftStatus==V.APPROVED){let d=await BI.getDraft(n,ue);d&&(a=Ze.createDeliveryFromDraft(d,n,o))}if(l||a){let d=We.executeWithValues(ke.updateDraftApproversList,[t,e.U_RejectedReason,LI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(t===V.REJECTED&&va.setApprovalStatus(t,n),a){console.log("deliveryResponse.data.DocNum: "+a.data.DocNum),console.log("deliveryResponse.data.DocumentLines: "+JSON.stringify(a.data.DocumentLines));let g=wI.updateDraft({U_TargetRecDocNum:a.data.DocNum},{DocEntry:n});r!=="Y"&&va.setApprovalStatus(V.APPROVED,n)}let i=We.executeWithValues(ke.selectUserInfo,e.U_OriginatorId),c=We.executeWithValues(ke.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let p;if([V.APPROVED,V.PENDING].includes(e.U_DraftStatus)?p=V.APPROVED:p=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let g=yy.getMailBody(Yo,i[0].UserName,c[0].UserName,n,p);Cy(i[0].Email,yy.subject,g)}let y;return t===V.APPROVED&&(y=va.getApprovalInternalInDays(n,e.U_ApprovalLevel,r)),{draftStatus:p,noOfDays:y}}}catch(n){throw n}};Ze.updateDeliveryDraft=async(e,t)=>{if(console.log(`request: ${JSON.stringify(e)}`),t){ue.defaults.headers.Cookie=t;try{let o=e.U_DraftStatus;if(e.U_DraftStatus==V.APPROVED){let r=We.executeWithValues(ke.selectNoOfApprovalsForDraft,[Sy[Yo],e.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(r));let s=0,n;if(Array.isArray(r)&&r.length&&(s=parseInt(r[0].U_NoOfApprovals,10),n=r[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+s),n==="Y"){parseInt(e.U_ApprovalLevel)==s?e.U_DraftStatus=V.APPROVED:parseInt(e.U_ApprovalLevel)<s&&(e.U_DraftStatus=V.PENDING);let a=await _a(e,o,t,n);if(e.U_DraftStatus==V.PENDING){let l=parseInt(e.U_ApprovalLevel)+1,d=We.executeWithValues(ke.updateDraftNextApprovalLevel,[V.PENDING,e.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(d));let i=We.executeWithValues(ke.selectUserInfo,e.U_OriginatorId),c=We.executeWithValues(ke.selectDraftNextApproverDetails,[e.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(c)),Array.isArray(c)&&c.length&&i.length){let p=my.getMailBody(Yo,i[0].UserName,e.DocEntry);Cy(c[0].Email,my.subject,p)}}return a}else{let a=We.executeWithValues(ke.selectDraftApprovalStatusCount,[e.DocEntry,e.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(a));let l=0;return Array.isArray(a)&&a.length&&(l=a[0].Count),console.log("noOfApprovalsReceived: "+l),parseInt(l,10)+1>=parseInt(s,10)?(e.U_DraftStatus=V.APPROVED,console.log("****APPROVED")):(e.U_DraftStatus=V.PENDING,console.log("****PENDING")),await _a(e,o,t,n)}}else if(e.U_DraftStatus==V.REJECTED)return console.log("****REJECTED"),await _a(e,o,t)}catch(o){throw console.log("Delivery Draft error: "+o),o}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ze.getDeliveryDraft=async(e,t,o,r=!0)=>{if(o){ue.defaults.headers.Cookie=o;try{let s;if(e===Ty.DRAFT?s=await ue.get(`Drafts(${t.docEntry})`):e===Ty.DIRECT&&(s=await ue.get(`${Pa}(${t.docNum})`)),r){console.log("response.data: "+JSON.stringify(s.data));let n=We.executeWithValues(ke.allFreightInfo,[]),a=s.data.DocumentAdditionalExpenses.slice();if(Array.isArray(a)&&a.length&&n.forEach(l=>{a.forEach(d=>{l.FreightCode==d.ExpenseCode&&(d.FreightName=l.FreightName)})}),s.data)return{draft:s.data,draftStatus:s.data.U_DraftStatus,freightInfoForDraft:a,DocTotal:s.data.DocTotal,DocTotalFc:s.data.DocTotalFc};console.log("Failed to get Delivery Request details!.. Error-500");return}else return s.data}catch(s){throw console.log("Delivery Draft error: "+s),s}}else throw{message:"Unable to connect to the server. Please contact Administrator!"}}});var Ey=u((Hx,Ay)=>{var{In:wx}=require("../node_modules/typeorm/index.js"),{getSLConnection:$a}=te(),{sendMail:Bx}=Re(),vx=Bt(),_x=b(),Px=D(),{portalModules:vI,draftStatus:Mx,draftObjectCodes:Fx}=S(),{getRandomNo:$x,formatDate:Wx}=q(),bs=fy(),_I=ao(),{logger:kx}=En(),Ma=_t(),Fa=vI.DELIVERY,PI=async(e,t,o)=>{try{let r=e.session.userId;e.body.userId=e.session.userId;let s=Ma.getApprovers(r,Fa),n=await $a(e);if(Array.isArray(s)&&s.length>0){let a=await MI(e.body,s,n);t.status(200).send(a)}else{let a=await bs.createDelivery(e.body,n);t.status(200).send({docNum:a.DocNum})}}catch(r){console.log("create Delivery: "+JSON.stringify(r)),o(r)}},MI=async(e,t=[],o)=>{try{let r=e.userId,s=await bs.createDeliveryDraft(e,t,o);if(s.draftNum){let n=[];if(t.forEach(a=>{n.push(a.UserName)}),n.length>0){let{draftApproverRec:a,mailingList:l}=await Ma.createApproversForDraft(s.draftNum,t,Fa);if(a){let d=_I.getUserInfo(r);await Ma.notifyApprovers(Fa,d.UserName,s.draftNum,l)}}return{draftNum:s.draftNum,approverName:n.length>0?n.join(", "):""}}return}catch(r){throw r}},FI=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;try{let r=await $a(e),{draftStatus:s,noOfDays:n}=await bs.updateDeliveryDraft(e.body,r);t.status(200).send({draftStatus:s,noOfDays:n})}catch(r){console.log("Delivery Draft error: "+r),o(r)}},$I=async(e,t,o)=>{if(console.log(`get Delivery - req.params: ${JSON.stringify(e.params)}`),e.query.docEntry||e.query.docNum)try{let r=await $a(e),s=await bs.getDeliveryDraft(e.params.type,e.query,r);s?t.send(s):t.status(500).json({message:"Failed to get Delivery Request details!"})}catch(r){console.log("Delivery Draft error: "+r),o(r)}else t.status(500).send({error:"Invalid DocEntry!"})};Ay.exports={create:PI,update:FI,get:$I}});var Iy=u((Jx,Ny)=>{var WI=require("../node_modules/express/index.js"),Wa=Ey(),{portalModules:ka,permissions:Ha}=S(),{checkUserPermission:Ja}=v(),Rs=new WI.Router;Rs.route("/").post(Ja(ka.DELIVERY,Ha.CREATE),Wa.create);Rs.route("/draft").patch(Ja(ka.DELIVERY,Ha.WRITE),Wa.update);Rs.route("/items/:recordType?").get(Ja(ka.DELIVERY,Ha.READ),Wa.get);Ny.exports=Rs});var by=u((qx,Dy)=>{var{getSLConnection:qa}=te(),Ga=ho(),kI=async(e,t,o)=>{try{let r=await qa(e),s=await Ga.createSalesBatchSelection(e.body,e.body.invoiceDocEntry,e.body.invoiceDocNum,r);t.status(200).send(s)}catch(r){console.log("create SalesBatchSelection Controller: "+JSON.stringify(r)),o(r)}},HI=async(e,t,o)=>{try{if(!e.body||!Array.isArray(e.body)||e.body.length===0)throw new Error("Request body cannot be empty and must be an array");let r=await qa(e),s=await Promise.all(e.body.map(n=>Ga.updateSalesBatchSelection(n,r)));t.status(200).send(s)}catch(r){console.log("Update Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}},JI=async(e,t,o)=>{try{let r=await qa(e),{docNum:s,itemCodes:n}=e.body;if(!s||!n||!Array.isArray(n)||n.length===0)throw new Error("docNum and itemCodes are required, and itemCodes must be a non-empty array");let a=await Promise.all(n.map(l=>Ga.getSalesBatchSelection(s,l,r)));t.status(200).send(a)}catch(r){console.log("Get Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}};Dy.exports={create:kI,update:HI,get:JI}});var Oy=u((Gx,Ry)=>{var qI=require("../node_modules/express/index.js"),ja=by(),{portalModules:za,permissions:Va}=S(),{checkUserPermission:Qa}=v(),Ya=new qI.Router;Ya.route("/").post(Qa([za.INVOICE],Va.CREATE),ja.create).put(Qa(za.INVOICE,Va.WRITE),ja.update);Ya.route("/get").post(Qa([za.INVOICE],Va.READ),ja.get);Ry.exports=Ya});var Ly=u(xy=>{var GI=b(),{dbCreds:Uy}=D();xy.getBomChildren=async e=>{let t=`
    SELECT 
      T0."Father" AS "ParentItem", 
      T0."Code" AS "ItemCode", -- Mapped cleanly to ItemCode for the POS
      T0."Quantity" AS "BomQuantity",
      T1."ItemName",
      T1."InvntryUom",
      T1."ManBtchNum",
      T1."ManSerNum"
    FROM ${Uy.CompanyDB}.ITT1 T0
    INNER JOIN ${Uy.CompanyDB}.OITM T1 ON T0."Code" = T1."ItemCode"
    WHERE T0."Father" = ?
  `;return await GI.executeWithValues(t,[e])}});var By=u(wy=>{var jI=Ly();wy.getChildren=async(e,t,o)=>{try{let r=e.params.father,s=await jI.getBomChildren(r);t.send(s)}catch(r){o(r)}}});var _y=u((Vx,vy)=>{vy.exports=e=>{let t=By();var o=require("../node_modules/express/index.js").Router();o.get("/children/:father",t.getChildren),e.use("/api/v1/custom/bom",o)}});var Fy=u((Xx,My)=>{var Ko=require("../node_modules/express/index.js"),zI=require("http"),VI=require("https"),Qx=require("../node_modules/http-proxy/index.js"),QI=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:YI}=D(),KI=require("../node_modules/cookie-parser/index.js"),Yx=require("../node_modules/morgan/index.js"),to=require("path"),Kx=require("../node_modules/rotating-file-stream/index.js"),Os=require("cluster"),XI=require("os").cpus().length,ZI=oi(),eD=di(),tD=Ol(),oD=pc(),rD=Cc(),{sessionValidator:sD}=v(),nD=bc(),aD=xc(),iD=$c(),lD=zc(),cD=Zc(),dD=Ed(),uD=xd(),pD=_d(),mD=qd(),yD=Vd(),gD=au(),TD=mu(),hD=fu(),CD=bu(),SD=Lu(),fD=Fu(),AD=Gu(),ED=Yu(),ND=rp(),ID=cp(),DD=Cp(),bD=bp(),RD=_p(),OD=jp(),UD=tm(),xD=dm(),LD=ym(),wD=xm(),BD=Pm(),vD=Wm(),_D=qm(),PD=Zm(),MD=dy(),FD=Iy(),$D=Oy(),Us,Be="/api/v1/service",w="/api/v1/custom",WD=async()=>{process.env.NODE_ENV==="development"?await Py():Os.isMaster?(console.log(`Number of CPUs is ${XI}`),console.log(`Master ${process.pid} is running`),Os.fork(),Os.on("exit",(e,t,o)=>{console.log(`worker ${e.process.pid} died`),console.log("Let's fork another worker!"),Os.fork()})):await Py()},Py=()=>new Promise((e,t)=>{let o=Ko(),r=require("fs"),s=process.env.HOST;process.env.NODE_ENV==="development"?(o.use(Ko.static(to.join(__dirname,"../../","build"))),o.get("/",(a,l)=>{l.sendFile(to.join(__dirname,"../../","build","index.html"))})):(o.use(Ko.static(to.join(__dirname,"../../../","UI"))),o.get("/",(a,l)=>{l.sendFile(to.join(__dirname,"../../../","UI","index.html"))}));let n=process.env.API_PORT||2020;if(process.env.HTTPS==="true"){let a={cert:r.readFileSync(to.join(__dirname,"../../",process.env.SSL_CRT_FILE||"certificate/certificate.crt"),"utf8"),key:r.readFileSync(to.join(__dirname,"../../",process.env.SSL_KEY_FILE||"certificate/private-key.pem"),"utf8")};Us=VI.createServer(a,o)}else Us=zI.createServer(o);o.use(ZI()),o.use(KI()),o.use(Ko.json()),o.use(Ko.urlencoded({extended:!0})),o.use(eD),o.use(sD),o.use(Be,oD),o.use(`${Be}/business-partner`,nD),o.use(`${Be}/invoice`,dD),o.use(`${Be}/sales-quotation`,gD),o.use(`${Be}/credit-memo`,bD),o.use(`${Be}/credit-memo-request`,OD),o.use(`${Be}/inventory-counting`,xD),o.use(`${Be}/item`,uD),o.use(`${Be}/sales-batch-selection`,$D),o.use(`${Be}/delivery`,FD),o.use(w,tD),o.use(`${w}/user/group`,LD),o.use(`${w}/store`,wD),o.use(`${w}/parked-transaction`,BD),o.use(`${w}/user-session-log`,_D),o.use(`${w}/session`,vD),o.use(`${w}/invoice`,lD),o.use(`${w}/firca`,cD),o.use(`${w}/cash-denomination`,aD),o.use(`${w}/credit-card`,iD),o.use(`${w}/stock-transfer-request-new`,mD),o.use(`${w}/sales-quotation`,yD),o.use(`${w}/sale-order`,TD),o.use(`${w}/customer`,ID),o.use(`${w}/tax`,hD),o.use(`${w}/sales-employees`,CD),o.use(`${w}/payment-terms`,fD),o.use(`${w}/user`,SD),o.use(`${w}/banks`,AD),o.use(`${w}/locations`,ED),o.use(`${w}/warehouse`,ND),o.use(`${w}/credit-memo`,DD),o.use(`${w}/credit-memo-request`,RD),o.use(`${w}/inventory-counting`,UD),o.use(`${w}/item-master`,pD),o.use(`${w}/delivery`,MD),o.use(`${w}/qc-item-group`,PD),_y()(o),o.use(rD),o.get("/ping",(a,l)=>{l.status(200).json({status:"ok",time:new Date().toISOString()})}),o.get("/health",(a,l)=>{let d=QI.createConnection();d.connect(YI,i=>{if(i)return console.error("[HEALTH CHECK] HANA DB connection failed:",i.message),l.status(503).json({status:"error",service:"HANA DB",host:process.env.HANA_HOST,port:process.env.HANA_PORT,message:i.message,time:new Date().toISOString()});d.disconnect(),l.status(200).json({status:"ok",service:"HANA DB",host:process.env.HANA_HOST,port:process.env.HANA_PORT,time:new Date().toISOString()})})}),Us.listen(n,s).on("listening",()=>{console.log(`Web server listening on ${n} (HTTPS: ${process.env.HTTPS==="true"})`),e()}).on("error",a=>{t(a)})}),kD=()=>new Promise((e,t)=>{Us.close(o=>{if(o){t(o);return}e()})});My.exports={initialize:WD,close:kD}});require("../node_modules/dotenv/lib/main.js").config();var $y=Fy(),HD=ie(),JD=async()=>{try{console.log("Initializing Database"),await HD.dataSource.initialize(),console.log("Database has been initialized by TypeORM!"),console.log("Initializing Web server"),await $y.initialize()}catch(e){console.error(e),process.exit(1)}};JD();var Ka=async e=>{let t=e;console.log("Shutting down...");try{console.log("Closing Web server"),await $y.close()}catch(o){console.log("Encountered error when closing Web server",o),t=t||o}console.log("Exiting process"),t?process.exit(1):process.exit(0)};process.on("SIGTERM",()=>{console.log("Received SIGTERM"),Ka()});process.on("SIGINT",()=>{console.log("Received SIGINT"),Ka()});process.on("uncaughtException",e=>{console.log("Uncaught exception"),console.error(e),Ka(e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled Promise Rejection at:",t,"reason:",e)});
//!@#$%^&*()-+<>
