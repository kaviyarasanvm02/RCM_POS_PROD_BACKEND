var u=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Xa=u((vN,Ka)=>{var By=require("../node_modules/cors/lib/index.js"),vy=()=>{let e=[process.env.REACT_APP_URL];console.log("whitelist: "+JSON.stringify(e));let t={credentials:!0,allowedHeaders:["Content-Type","Authorization"],origin:(o,r)=>{process.env.NODE_ENV==="development"||e.indexOf(o)!==-1||!o?r(null,!0):r(new Error("Not allowed by CORS"))}};return console.log("corsOptions: ",t),By(t)};Ka.exports=vy});var C=u((_N,ei)=>{var _y="YYYY-MM-DD",Py=["January","February","March","April","May","June","July","August","September","October","November","December"],My="FJD",Fy="\\\\172.18.20.16\\rcmsapshared\\",V={USER:"User",USER_GROUP:"User Group",APPROVAL:"Approval",INVOICE:"Invoice",INCOMING_PAYMENT:"Incoming Payment",JOURNAL_ENTRY:"Journal Entry",CREDIT_MEMO:"Credit Memo",CREDIT_MEMO_REQUEST:"Credit Memo",STORE_SETUP:"Store Setup",STORE_WAREHOUSE:"Store Warehouse",STORE_COUNTER:"Store Counter",STORE_USER:"Store User",SALES_QUOTATION:"Sales Quotation",BUSINESS_PARTNER:"Business Partners",INVOICE:"Invoice",STOCK_TRANSFER_REQUEST:"Stock Transfer Request",STOCK_TRANSFER:"Stock Transfer",INVENTORY_COUNTING:"Inventory Counting",APPROVAL_STATUS_REPORT:"Approval Status Report",SALES_ORDER:"Sales Order",DELIVERY:"Delivery",ITEM:"Item",OSBS:"OSBS",OTSH:"OTSH",ATTACHMENTS:"Attachments2"},$y={[V.INVOICE]:13,[V.CREDIT_MEMO_REQUEST]:234000031,[V.INCOMING_PAYMENT]:24,[V.SALES_ORDER]:17,[V.SALES_QUOTATION]:23,[V.STOCK_TRANSFER_REQUEST]:1250000001},Wy={[V.BUSINESS_PARTNER]:"BusinessPartners",[V.INVOICE]:"Invoices",[V.INCOMING_PAYMENT]:"IncomingPayments",[V.JOURNAL_ENTRY]:"JournalEntries",[V.SALES_QUOTATION]:"Quotations",[V.INVENTORY_COUNTING]:"InventoryCountings",[V.CREDIT_MEMO_REQUEST]:"ReturnRequest",[V.DELIVERY]:"DeliveryNotes",[V.ITEM]:"Items"},ky={STOCK_TRANSFER_REQUEST:1250000001,STOCK_TRANSFER:67,[V.DELIVERY]:15},Hy={INCOMING_PAYMENT:"INCOMING_PAYMENT",OUTGOING_PAYMENT:"OUTGOING_PAYMENT",COUNTER_TO_COUNTER:"COUNTER_TO_COUNTER",OPENING_BALANCE:"OPENING_BALANCE",CLOSING_BALANCE:"CLOSING_BALANCE"},Jy=[],qy={READ:"U_AllowRead",WRITE:"U_AllowWrite",CREATE:"U_AllowCreate",CANCEL:"U_AllowCancel"},Gy={ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER",TEMPLATE:"TEMPLATE",ADMIN:"ADMIN"},jy={PENDING:"PENDING",APPROVED:"APPROVED",GENERATED:"GENERATED",REJECTED:"REJECTED",FAILED:"FAILED",NOT_REQUIRED:"NOT_REQUIRED",NOT_ASSIGNED:"NOT_ASSIGNED",AUTO_APPROVED:"AUTO_APPROVED"},zy={ACTIVE:"ACTIVE",INACTIVE:"INACTIVE"},Vy={DIRECT:"direct",DRAFT:"draft"},Qy={BATCHES:"Batches",SERIAL_NUMBERS:"Serial Numbers",NORMAL:"Normal",LABOR:"Labor"},Yy={ITEM_WITHOUT_QRCODE:"ITEM_WITHOUT_QRCODE",BATCH_SERIAL_WITH_ALL_BINS:"BATCH_SERIAL_WITH_ALL_BINS",BATCH_SERIAL_IN_A_BIN:"BATCH_SERIAL_IN_A_BIN"},Za={REDIS:"REDIS",FILE:"FILE"},Ky=17,Xy=Za.FILE,Zy="ONE",eg="kiafn239df#@asdf$%^13423#$%@sdfgdf",tg={OK:200,CREATED:201,ACCEPTED:202,NO_CONTENT:204,BAD_REQUEST:400,UNAUTHORIZED:401,FORBIDDEN:403,NOT_FOUND:404,INTERNAL_SERVER_ERROR:500,BAD_GATEWAY:502,SERVICE_UNAVAILABLE:503};ei.exports={enableLocationBasedCreditCardAccount:!0,dateFormat:_y,months:Py,saltRounds:10,systemCurrency:My,defaultBranchId:1,portalModules:V,serviceLayerApiURIs:Wy,trxTypes:Hy,draftObjectCodes:ky,permissions:qy,userRoles:Gy,draftStatus:jy,recordState:zy,recordTypes:Vy,itemTypes:Qy,requestTypes:Yy,sessionStoreTypes:Za,sessionStore:Xy,cookieName:Zy,sessionSecret:eg,sessionMaxAgeInHours:Ky,httpStatusCodes:tg,fircaIntegrationWaitTime:1e4,enableFircaIntegration:!0,enableStoreBasedNumbering:!0,isHomeDeliveryEnabled:!0,objectCodes:$y,attachmentPath:Fy,EXCLUDED_ITEM_GROUPS:Jy}});var oi=u((PN,ti)=>{var og=require("../node_modules/redis/dist/index.js"),eo=og.createClient({host:"localhost",port:6379});eo.on("connect",function(e){console.log("Connected to redis successfully")});eo.on("error",e=>{console.error("Redis connection error:",e)});var rg=(e,t)=>{eo.set(e,t,o=>{o?console.error("Error setting value in Redis:",o):console.log("Value set in Redis:",e,t)})},sg=(e,t)=>{eo.get(e,(o,r)=>{o?(console.error("Error getting value from Redis:",o),t(o,null)):(console.log("Value retrieved from Redis:",e,r),t(null,r))})};ti.exports={redisClient:eo,setValue:rg,getValue:sg}});var li=u((MN,ii)=>{var Os=require("../node_modules/express-session/index.js"),ng=require("../node_modules/connect-redis/dist/cjs/index.js"),ag=require("../node_modules/session-file-store/index.js"),{sessionStoreTypes:ri,sessionStore:si,cookieName:ig,sessionSecret:lg,sessionMaxAgeInHours:ai}=C(),{redisClient:cg}=oi(),Us="";if(si===ri.REDIS){let e=ng(Os);Us=new e({client:cg})}else if(si===ri.FILE){let e=ag(Os);Us=new e({ttl:60*60*parseInt(ai),retries:5,factor:1,minTimeout:50,maxTimeout:100})}var ni=process.env.HTTPS==="true",dg=Os({store:Us,name:ig,secret:lg,resave:!1,saveUninitialized:!1,rolling:!0,cookie:{secure:ni,sameSite:ni?"none":"lax",httpOnly:!0,maxAge:1e3*60*60*parseInt(ai)}});ii.exports=dg});var D=u((WN,ci)=>{var{draftObjectCodes:FN,draftStatus:xs,recordState:$N}=C(),ug=30,m={CompanyDB:process.env.SERVICE_LAYER_COMPANYDB,UserName:process.env.SERVICE_LAYER_USERNAME,Password:process.env.SERVICE_LAYER_PASSWORD},pg={serverNode:`${process.env.HANA_HOST}:${process.env.HANA_PORT}`,host:process.env.HANA_HOST,port:process.env.HANA_PORT,user:process.env.HANA_USER,password:process.env.HANA_PASSWORD,pooling:process.env.HANA_POOLING==="true",maxPoolSize:process.env.HANA_MAX_POOL_SIZE,connectionLifetime:process.env.HANA_CONNECTION_LIFE_TIME},mg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."Fax", T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked",
    T0."U_TempPasswordFlag", T0."U_PortalUser", T0."U_PortalPassword" as "Password", T0."SalesDisc"
  FROM ${m.CompanyDB}.OUSR T0
  WHERE UPPER(T0."USER_CODE") = UPPER(?)`,yg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
WHERE T0."U_PortalUser" = 'Y'
  AND UPPER(T0."USER_CODE") = UPPER(?)
  AND UPPER(T0."E_Mail") = UPPER(?)`,gg=`SELECT T0."U_NAME" as "UserName", T0."E_Mail" "Email" FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."INTERNAL_K" = ?`,Tg=`SELECT DISTINCT T0."INTERNAL_K" "U_UserId", T0."U_NAME" as "UserName"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND  T1."U_GroupName" LIKE `,hg=`SELECT DISTINCT T1."U_GroupName", T1."U_GroupId"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T0."INTERNAL_K" = ?`,Cg=`SELECT T3."U_ModuleName", T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
  ORDER BY T3."U_ModuleName" ASC`,Sg=`SELECT T2."U_AllowRead", T2."U_AllowWrite", T2."U_AllowCancel", T2."U_AllowCreate"
  FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}."@PORTALUSERGROUPS" T1,
    ${m.CompanyDB}."@PORTALPERMISSIONS" T2, ${m.CompanyDB}."@PORTALMODULES" T3
  WHERE T0."U_PortalGroupId" = T1."U_GroupId"
    AND T1."U_GroupId" = T2."U_GroupId"
    AND T2."U_ModuleId" = T3."U_ModuleId"
    AND T0."INTERNAL_K" = ?
    AND T3."U_ModuleName" IN `,fg=`SELECT F."ExpnsCode" "FreightCode", F."ExpnsName" "FreightName"
  FROM ${m.CompanyDB}.OEXD F`,Eg=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${m.CompanyDB}."OPOR" T0, ${m.CompanyDB}."POR3" T1, ${m.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `,Ag=`SELECT T1."BPLId", T1."BPLName" FROM ${m.CompanyDB}.OBPL T1`,Ig=`SELECT "WhsCode" FROM ${m.CompanyDB}.OWHS WHERE "U_PICKLIST"='Y'`,Dg=`SELECT T1."BPLId", T2."BPLName", T1."AcsDsbldBP"
    FROM ${m.CompanyDB}.OUSR T0, ${m.CompanyDB}.USR6 T1, ${m.CompanyDB}.OBPL T2
  WHERE T0."USER_CODE" = T1."UserCode"
    AND T1."BPLId" = T2."BPLId"
    AND T2."Disabled" != 'Y'
    AND T0."INTERNAL_K" = ?`,Ng=`SELECT T0."ItemCode", T0."ItemName", T0."InvntryUom" FROM ${m.CompanyDB}.OITM T0
    WHERE `,bg=`SELECT 
  T0."ItemCode", 
  T0."WhsCode", 
  T0."OnHand", 
  T2."SalUnitMsr" AS "SalesUOM"
FROM 
  ${m.CompanyDB}.OITW T0
JOIN ${m.CompanyDB}.OWHS T1 ON T0."WhsCode" = T1."WhsCode"
JOIN ${m.CompanyDB}.OITM T2 ON T0."ItemCode" = T2."ItemCode"`,Rg=`SELECT A."ItemCode", A."ItemName", A."CodeBars", A."FrgnName", C."WhsCode", D."BinCode", D."AbsEntry" "BinAbsEntry", C."OnHandQty",
    A."ManBtchNum", A."ManSerNum", A."InvntItem",
    (SELECT MAX(B."Price") FROM  ${m.CompanyDB}.ITM1 B
      WHERE B."ItemCode"=A."ItemCode" AND B."PriceList"=?) AS "Price"
  FROM ${m.CompanyDB}.OITM A, ${m.CompanyDB}.OIBQ C, ${m.CompanyDB}.OBIN D
WHERE A."ItemCode"=C."ItemCode"
  AND D."AbsEntry"=C."BinAbs"
  AND C."OnHandQty">0`,Og=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."ListNum" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."ListNum") AS "PriceListName",
      A."U_FCCC" AS "FCCCItem",
      A."SalUnitMsr" as "SalesUOM",
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
  1=1`,Ug=`SELECT A."ItemCode", A."ItemName", F."BcdCode" as CodeBars, A."FrgnName", IFNULL(B."WhsCode", '') as "WhsCode", 
    IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry",
    (SELECT E."ItmsGrpNam" FROM  ${m.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=A."ItmsGrpCod") AS "ItmsGrpName", 
    A."ItmsGrpCod",
    IFNULL(C."OnHandQty", 0) as "OnHandQty", A."ManBtchNum", A."ManSerNum", A."InvntItem", O."U_PrcList" AS "PriceList",
    (SELECT G."ListName" FROM  ${m.CompanyDB}.OPLN G
        WHERE G."ListNum" = O."U_PrcList") AS "PriceListName",
    A."U_FCCC" AS "FCCCItem",
    A."SalUnitMsr" as "SalesUOM",
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
  1=1`,xg=`SELECT T0."AbsEntry", T0."BinCode"
  FROM ${m.CompanyDB}."OBIN" T0`,Lg=`SELECT IFNULL(D."BinCode", '') as "BinCode", IFNULL(D."AbsEntry", 0) as "BinAbsEntry"
  FROM ${m.CompanyDB}.OBIN D
    LEFT JOIN ${m.CompanyDB}.OIBQ C ON D."AbsEntry" = C."BinAbs"
  WhERE C."WhsCode" = ? AND C."ItemCode" = ?`,wg=`SELECT DISTINCT T0."ItemCode", T0."BatchNum", T0."IntrSerial", T2."WhsCode", T2."BinCode",
T2."AbsEntry" "BinAbsEntry", T0."Quantity", T0."InDate"
  FROM ${m.CompanyDB}."OIBT" T0, ${m.CompanyDB}."OIBQ" T1, ${m.CompanyDB}."OBIN" T2
WHERE T0."ItemCode"=T1."ItemCode" 
  AND T0."WhsCode"=T2."WhsCode"
  AND T1."BinAbs"=T2."AbsEntry"
  AND T0."Quantity" > 0
  AND T1."OnHandQty" > 0`,Bg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "BatchNumberProperty",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OBBQ A
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode"
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,vg=`SELECT A."ItemCode",A."WhsCode", C."BinCode", C."AbsEntry", B."DistNumber" AS "InternalSerialNumber",SUM(A."OnHandQty") "OnHandQty"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  INNER JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs"
WHERE A."OnHandQty">0`,_g=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "BatchNumberProperty",A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OBBQ A 
  INNER JOIN ${m.CompanyDB}.OBTN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,Pg=`SELECT A."ItemCode", B."itemName" AS "ItemName", A."WhsCode",B."DistNumber" AS "InternalSerialNumber",A."OnHandQty",C."BinCode" AS "BinCode",
  C."AbsEntry" "BinAbsEntry", D."Location" "LocationCode", E."Location" "LocationName", B."InDate"
FROM ${m.CompanyDB}.OSBQ A 
  INNER JOIN ${m.CompanyDB}.OSRN B ON B."AbsEntry"=A."SnBMDAbs" AND A."ItemCode"=B."ItemCode" 
  LEFT JOIN ${m.CompanyDB}.OBIN C ON C."AbsEntry"=A."BinAbs" AND A."WhsCode"=C."WhsCode"
  INNER JOIN  ${m.CompanyDB}.OWHS D ON D."WhsCode"=A."WhsCode"
  INNER JOIN ${m.CompanyDB}.OLCT E ON D."Location"=E."Code"
WHERE A."OnHandQty">0`,Mg=`SELECT DISTINCT T0."NumAtCard" as "VendorRefNo"
    FROM ${m.CompanyDB}.OPDN T0
  WHERE T0."NumAtCard" IS NOT NULL
    AND T0."CANCELED" NOT IN ('Y','C')
    AND T0."NumAtCard"=`,Fg=`SELECT T0."INTERNAL_K" as "InternalKey", T0."USER_CODE" as "UserCode", T0."U_NAME" as "UserName",
    T0."PortNum" as "MobileNo", T0."E_Mail", T0."U_PortalGroupId", T1."U_GroupName", T0."U_PortalUser", 
    T0."U_PortalBadLoginCount", T0."U_PortalAccountLocked"
  FROM ${m.CompanyDB}.OUSR T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALUSERGROUPS" T1
    ON T0."U_PortalGroupId" = T1."U_GroupId"
  WHERE T0."U_PortalUser" = ?
    AND T0."U_NAME" IS NOT NULL
  ORDER BY T0."U_PortalUser" DESC, T0."U_NAME" ASC`,$g=`SELECT T0."U_GroupId", T0."U_GroupName", T1."U_PermissionId", T1."U_ModuleId", T2."U_ModuleName", 
    T1."U_AllowRead", T1."U_AllowWrite", T1."U_AllowCancel", T1."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALPERMISSIONS" T1 ON T0."U_GroupId" = T1."U_GroupId"
    FULL OUTER JOIN ${m.CompanyDB}."@PORTALMODULES" T2 ON T1."U_ModuleId" = T2."U_ModuleId"
  WHERE T0."U_GroupName" IS NOT NULL
    ORDER BY T2."U_ModuleName" ASC, T0."U_GroupName" ASC`,Wg=`SELECT T0."U_PermissionId", T0."U_GroupId", T0."U_ModuleId", T1."U_ModuleName", T0."U_AllowRead", T0."U_AllowWrite", 
    T0."U_AllowCancel", T0."U_AllowCreate"
  FROM ${m.CompanyDB}."@PORTALPERMISSIONS" T0, ${m.CompanyDB}."@PORTALMODULES" T1
  WHERE T0."U_ModuleId" = T1."U_ModuleId"
    AND T0."U_GroupId" = `,kg=`SELECT T0."U_NAME" as "UserName", T0."U_PortalGroupId" FROM ${m.CompanyDB}.OUSR T0
    WHERE T0."U_PortalGroupId"=`,Hg=`SELECT T0."U_ModuleId", T0."U_ModuleName" FROM ${m.CompanyDB}."@PORTALMODULES" T0
    ORDER BY T0."U_ModuleName"`,Jg=`SELECT T0."U_GroupId", T0."U_GroupName" FROM ${m.CompanyDB}."@PORTALUSERGROUPS" T0
    ORDER BY T0."U_GroupName"`,qg=`SELECT T0."INTERNAL_K" as "U_UserId", T0."U_NAME" as "UserName"
    FROM ${m.CompanyDB}.OUSR T0
  WHERE T0."U_PortalUser"='Y'
    ORDER BY T0."U_NAME"`,Gg=`INSERT INTO ${m.CompanyDB}."@PORTALUSERGROUPS" ("Code", "Name", "U_GroupName", "U_GroupId")
    VALUES (?, ?, ?, ?)`,jg=`INSERT INTO ${m.CompanyDB}."@PORTALPERMISSIONS" ("Code", "Name", "U_GroupId", "U_ModuleId",
    "U_AllowRead", "U_AllowWrite", "U_AllowCancel", "U_AllowCreate", "U_PermissionId")
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,zg=`UPDATE ${m.CompanyDB}."@PORTALUSERGROUPS"
    SET "Code"=?, "Name"=?, "U_GroupName"=?
  WHERE "U_GroupId"=?`,Vg=`UPDATE ${m.CompanyDB}.OUSR
    SET "U_PortalPassword"=?, "U_TempPasswordFlag"=?
  WHERE "INTERNAL_K"=?`,Qg=`UPDATE ${m.CompanyDB}."@PORTALPERMISSIONS"
    SET "Code"=?, "Name"=?, "U_GroupId"=?, "U_ModuleId"=?,
    "U_AllowRead"=?, "U_AllowWrite"=?, "U_AllowCancel"=?, "U_AllowCreate"=?
  WHERE "U_PermissionId"=?`,Yg=`DELETE FROM ${m.CompanyDB}."@PORTALUSERGROUPS" WHERE "U_GroupId" = `,Kg=`DELETE FROM ${m.CompanyDB}."@PORTALPERMISSIONS" WHERE "U_GroupId" = `,Xg=`SELECT T0."DocEntry", T0."U_Name", T0."U_Description", T0."U_DocumentName", T0."U_Terms", 
    T0."U_NoOfApprovals", T0."U_MultiLevelApproval", T0."U_Active"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0`,Zg=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0`,e0=`SELECT T0."LineId", T0."DocEntry", T0."U_UserId", T0."U_ApprovalLevel"
    FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0`,t0=`SELECT T0."DocEntry" FROM ${m.CompanyDB}."@APPROVALHEADER" T0
    ORDER BY T0."DocEntry" ASC`,o0=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALORIGINATOR" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,r0=`SELECT T0."LineId" FROM ${m.CompanyDB}."@APPROVALAPPROVER" T0
    WHERE T0."DocEntry"=?
  ORDER BY T0."LineId" ASC`,s0=`INSERT INTO ${m.CompanyDB}."@APPROVALHEADER" ("U_Name", "U_Description", "U_DocumentName", "U_Terms",
    "U_NoOfApprovals", "U_MultiLevelApproval", "U_Active", "DocEntry") VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,n0=`INSERT INTO ${m.CompanyDB}."@APPROVALORIGINATOR" ("U_UserId", "DocEntry", "LineId") VALUES (?, ?, ?)`,a0=`INSERT INTO ${m.CompanyDB}."@APPROVALAPPROVER" ("U_UserId", "U_ApprovalLevel", "DocEntry", "LineId") VALUES (?, ?, ?, ?)`,i0=`UPDATE ${m.CompanyDB}."@APPROVALHEADER" SET "U_Name"=?, "U_Description"=?, "U_DocumentName"=?,
    "U_Terms"=?, "U_NoOfApprovals"=?, "U_MultiLevelApproval"=?, "U_Active"=? WHERE "DocEntry" = ?`,l0=`UPDATE ${m.CompanyDB}."@APPROVALORIGINATOR" SET "U_UserId"=? WHERE "DocEntry"=? AND "LineId"=?`,c0=`UPDATE ${m.CompanyDB}."@APPROVALAPPROVER" SET "U_UserId"=?, "U_ApprovalLevel"=? WHERE "DocEntry"=? AND "LineId"=?`,d0=`DELETE FROM ${m.CompanyDB}."@APPROVALHEADER" WHERE "DocEntry"=?`,u0=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry" = ?`,p0=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry" = ?`,m0=`DELETE FROM ${m.CompanyDB}."@APPROVALORIGINATOR" WHERE "DocEntry"=? AND "LineId"=?`,y0=`DELETE FROM ${m.CompanyDB}."@APPROVALAPPROVER" WHERE "DocEntry"=? AND "LineId"=?`,g0=`SELECT T0."U_MultiLevelApproval", T0."U_NoOfApprovals",
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
    AND T4."U_ModuleName" = ?`,T0=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
  T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
  WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
AND T0."U_DocEntry" IN `,h0=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_DraftStatus" = ?`,C0=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
   FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,S0=`SELECT T0."DocDate"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."DocEntry" = ?`,f0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS"
  SET "U_DraftStatus" = ?
WHERE "U_DocEntry" = ?
  AND "U_ApprovalLevel" = ?`,E0=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
  FROM ${m.CompanyDB}."@APPROVALSTATUS" T0, ${m.CompanyDB}.OUSR TAP
WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
  AND T0."U_DocEntry" = ?
  AND T0."U_ApprovalLevel" = ?`,A0=`INSERT INTO ${m.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", "U_DraftStatus",
  "U_ApproverId", "U_ApprovalLevel") VALUES (?, ?, ?, ?, ?, ?)`,I0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
  "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
WHERE "U_ApprovalStatusId" = ?`,D0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
    WHERE "U_DraftStatus" IN ('${xs.PENDING}', '${xs.NOT_ASSIGNED}')
  AND "U_DocEntry" = ?`,N0=`UPDATE ${m.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
     WHERE "U_DocEntry" = ?`,b0=`SELECT T0."U_NoOfApprovals", T0."U_MultiLevelApproval"
    FROM ${m.CompanyDB}.ODRF T0
  WHERE T0."ObjType" = ?
    AND T0."DocEntry" = ?`,R0=`UPDATE ${m.CompanyDB}.ODRF T0 SET T0."U_TargetRecDocNum" = ?
  WHERE T0."DocEntry" = ?`,O0=`SELECT T0."U_DocEntry", T0."U_RejectedReason" FROM ${m.CompanyDB}."@APPROVALSTATUS" T0
    WHERE T0."U_DraftStatus" = '${xs.REJECTED}'
  AND T0."U_DocEntry" IN `,U0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALAPPROVER" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,x0=`SELECT COUNT(T1."U_UserId") "Count"
  FROM ${m.CompanyDB}."@APPROVALHEADER" T0, ${m.CompanyDB}."@APPROVALORIGINATOR" T1,
  ${m.CompanyDB}."@PORTALMODULES" T4
WHERE T0."DocEntry" = T1."DocEntry"
  AND T0."U_Active" = 'Y'
  AND T1."U_UserId" = ?
  AND T4."U_ModuleId" = T0."U_DocumentName"
  AND T4."U_ModuleName" = ?`,L0=`SELECT T1."U_DocEntry", T1."U_DraftStatus", T0."U_DraftStatus" "ActualStatus", T0."U_OriginatorId"
  FROM ${m.CompanyDB}.ODRF T0, ${m.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
  AND T1."U_ApproverId" = ?
  AND T0."ObjType" = ?
  AND T0."CreateDate" > TO_DATE('01/03/20', 'MM/DD/YY')`,w0=`SELECT T0."DocEntry", T0."U_DraftStatus"
  FROM ${m.CompanyDB}.ODRF T0
WHERE T0."U_OriginatorId" = ?
  AND T0."ObjType" = ?`;ci.exports={dbCreds:m,serviceLayerSessionMaxAge:ug,dbConfig:pg,validateUserLogin:mg,validateUserEmail:yg,getUserPermissionsForAllModules:Cg,checkUserPermission:Sg,allFreightInfo:fg,freightInfoForPO:Eg,branch:Ag,userBranches:Dg,itemsList:Ng,itemQuantityInWarehouse:bg,picklistWarehouses:Ig,binsAndItemQuantityInWarehouse:Rg,binsAndItemQuantityInWarehouseWithPrice:Og,binsAndItemQuantityInWarehouseWithPriceList:Ug,binsList:xg,selectInfoFromBatchSerialNo:wg,batchForItemAndWH:Bg,serialForItemAndWH:vg,getAllBinsForBatch:_g,getAllBinsForSerial:Pg,vendorRefNoQuery:Mg,portalModules:Hg,portalUserGroups:Jg,updatePortalPassword:Vg,portalUsers:qg,allUsers:Fg,userGroupsWithPermissions:$g,userPermissionsForGivenGroup:Wg,usersInGivenGroup:kg,insertUserGroup:Gg,insertPermissions:jg,updateUserGroup:zg,updatePermissions:Qg,deleteUserGroup:Yg,deletePermissions:Kg,selectApprovalHeader:Xg,selectApprovalOriginator:Zg,selectApprovalApprover:e0,allHeaderIds:t0,allApproverIds:r0,allOriginatorIds:o0,insertApprovalHeader:s0,insertApprovalOriginator:n0,insertApprovalApprover:a0,updateApprovalHeader:i0,updateApprovalOriginator:l0,updateApprovalApprover:c0,deleteApprovalTemplate1:d0,deleteApprovalTemplate2:u0,deleteApprovalTemplate3:p0,deleteApprovalOriginator:m0,deleteApprovalApprover:y0,selectApproverForOriginator:g0,selectUserInfo:gg,selectUsersInUserGroup:Tg,selectUserGroupInUser:hg,updateDraftTargetRecDocNum:R0,selectRejectedReason:O0,selectNoOfApprovalsForDraft:b0,selectDraftApproversList:T0,insertDraftApproversList:A0,updateDraftApproversList:I0,updateApprovalStatus:D0,updateApprovalStatusRecState:N0,selectDraftApprovalStatusCount:h0,updateDraftNextApprovalLevel:f0,selectDraftNextApproverDetails:E0,selectDraftApprovalDate:C0,selectDraftCreationDate:S0,selectApproverCount:U0,selectOriginatorCount:x0,selectDraftsForApprover:L0,selectDraftsForOriginator:w0,binsListForItem:Lg}});var N=u((kN,di)=>{var Ls=require("../node_modules/@sap/hana-client/lib/index.js"),{dbConfig:ws}=D(),B0=(e,t)=>{let o=Ls.createConnection();o.connect(ws,async r=>{r&&(console.error(r),t(r,null)),o.exec(e,(s,n)=>{s&&(console.error(s),t(s,null)),t(null,n),o.disconnect(a=>{a&&console.error(a)})})})},v0=(e,t=[])=>{Array.isArray(t)||(t=[t]);try{let o=Ls.createConnection();o.connect(ws);let r=o.exec(e,t);return o.disconnect(),r}catch(o){throw console.error("executeWithValues: "+JSON.stringify(o)),o}},_0=(e,t)=>{if(t.length)try{let o=Ls.createConnection();o.connect(ws);let s=o.prepare(e).execBatch(t);return o.disconnect(),s}catch(o){throw console.error("executeWithValues: "+JSON.stringify(o)),o}else return 0};di.exports={executeQuery:B0,executeWithValues:v0,executeBatchInsertUpdate:_0}});var Bs=u((JN,pi)=>{var{dbCreds:Le}=D(),{draftObjectCodes:ui,recordState:HN}=C(),P0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName"
    FROM ${Le.CompanyDB}.ODRF T0, ${Le.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${ui.STOCK_TRANSFER_REQUEST}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,M0=`SELECT T0."DocNum", T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode"
  FROM ${Le.CompanyDB}.ODRF T0, ${Le.CompanyDB}.OUSR TOR, ${Le.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${ui.STOCK_TRANSFER_REQUEST}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,F0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${Le.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,$0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
  T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
  T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
    FROM ${Le.CompanyDB}.OWTQ T0
  LEFT OUTER JOIN ${Le.CompanyDB}.OUSR TOR ON T0."U_OriginatorId" = TOR."INTERNAL_K"
  WHERE T0."DocStatus" = 'O'`,W0=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation", T1."U_FromBinLoc"
 FROM ${Le.CompanyDB}.WTQ1 T1
   WHERE T1."DocEntry" IN `;pi.exports={selectStockTransRequestDrafts:P0,selectStockTransRequestDraftsWithMultiApprover:M0,selectApprovedSTR:$0,selectItemDetailsForSTRDrafts:F0,selectItemDetailsForSTRs:W0}});var vs=u((qN,yi)=>{var{dbCreds:Ie}=D(),{draftObjectCodes:mi}=C(),k0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."U_TargetRecDocNum",
  T0."U_ToBinLocation", T0."BPLName"
    FROM ${Ie.CompanyDB}.ODRF T0, ${Ie.CompanyDB}.OUSR TOR
  WHERE T0."ObjType" = ${mi.STOCK_TRANSFER}
    AND T0."U_OriginatorId" = TOR."INTERNAL_K"`,H0=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", T0."CreateDate",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName"
  FROM ${Ie.CompanyDB}.ODRF T0, ${Ie.CompanyDB}.OUSR TOR, ${Ie.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ${mi.STOCK_TRANSFER}
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,J0=`SELECT TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", TRW."unitMsr" AS "InvntryUom",
  TRW."WhsCode", TRW."FromWhsCod" as "FromWarehouse", "U_FromBinLoc", TRW."U_ToBinLocation"
FROM ${Ie.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,q0=`SELECT T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
 T0."U_DraftStatus", T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode",
 T0."U_ToBinLocation", T0."BPLName"
    FROM ${Ie.CompanyDB}.OWTR T0, ${Ie.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."U_DraftStatus" = 'AUTO_APPROVED'`,G0=`SELECT T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
   T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
 FROM ${Ie.CompanyDB}.WTR1 T1
   WHERE T1."DocEntry" IN `,j0=`SELECT T0."DocEntry", T0."DocNum"
   FROM ${Ie.CompanyDB}.OWTR T0
 WHERE T0."DocNum" = ?`;yi.exports={selectStockTransDrafts:k0,selectStockTransDraftsWithMultiApprover:H0,selectApprovedSTs:q0,selectItemDetailsForSTDrafts:J0,selectItemDetailsForSTs:G0,selectSTDocEntry:j0}});var _s=u((GN,Ti)=>{var to=N(),z0=D(),St=Bs(),{userRoles:Ct,draftStatus:V0}=C(),gi=' ORDER BY T0."DocEntry" ASC',Q0=(e,t)=>{console.log("*** getTransferRequestRecords - req.query: "+JSON.stringify(e.query)),console.log("*** getTransferRequestRecords - req.params: "+JSON.stringify(e.params));let o=[],r=[],s=[],n=[],a=[],l=[],{userId:d}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let i;e.params.recordType==="direct"?i=St.selectItemDetailsForSTRs:e.params.recordType==="draft"&&(i=St.selectItemDetailsForSTRDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=to.executeWithValues(i+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&d){let i,c="";if(e.query.userRole==Ct.APPROVER?i=St.selectStockTransRequestDraftsWithMultiApprover:e.query.userRole==Ct.ORIGINATOR&&(i=St.selectStockTransRequestDrafts,c=` AND T0."U_OriginatorId" = ? ${gi}`,l=Yo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+c,[d])),e.query.userRole==Ct.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                        AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,y=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',y.push(e.query.status)),l=Yo(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' `+p,y),p=p+gi,o=to.executeWithValues(St.selectStockTransRequestDrafts+p,y)}else o=to.executeWithValues(i+c,[d]);Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length&&(e.query.userRole==Ct.ORIGINATOR||e.query.userRole==Ct.ADMIN||e.query.userRole==Ct.APPROVER)&&(s=to.executeWithValues(z0.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),Array.isArray(s)&&s.length&&o.forEach(p=>{n=[],s.forEach(y=>{p.DocEntry==y.U_DocEntry&&n.push(y)}),p.approvers=n}))),t.send([...o,...l])}else e.query.requestStatus===V0.APPROVED&&(console.log("***** getApprovedSTRRecords"),l=Yo(),t.send(l))}catch(i){console.log("getTransferRequestRecords - controller - error: "+JSON.stringify(i)),t.status(500).send({message:i.message})}},Yo=(e="",t=[])=>{let o=[];try{return o=to.executeWithValues(St.selectApprovedSTR+e,t),o}catch(r){throw r}};Ti.exports={getTransferRequestRecords:Q0,getApprovedSTRRecords:Yo}});var Ci=u((jN,hi)=>{var Y0=require("../node_modules/nodemailer/lib/nodemailer.js"),K0=Y0.createTransport({host:process.env.SMTP_SERVER,port:25,secure:!1,auth:{user:process.env.SMTP_USERNAME,pass:process.env.SMTP_PASSWORD},tls:{rejectUnauthorized:!1}});hi.exports={transporter:K0}});var De=u((zN,fi)=>{var Si=require("path"),{transporter:X0}=Ci(),Z0=async(e,t,o)=>{let r={from:process.env.SMTP_USERNAME,to:e,subject:t,html:o,attachments:[{filename:"logo.png",path:Si.join(__dirname,"../assets/img/client-logo.png"),cid:"client_logo_pic"},{filename:"n-app-logo.png",path:Si.join(__dirname,"../assets/img/n-app-logo.png"),cid:"app_logo_pic"}]};console.log("__dirname: "+__dirname);try{console.log("Sending mail....");let s=await X0.sendMail(r);return console.log("Email sent: "+s.response),!0}catch(s){return console.log("sendMail: "+JSON.stringify(s)),!1}};fi.exports={sendMail:Z0}});var Ms=u((KN,Ai)=>{var Et=N(),eT=D(),Ke=vs(),{sendMail:VN}=De(),{userRoles:ft,portalModules:QN,draftStatus:YN}=C(),Ei=' ORDER BY T0."DocEntry" ASC',tT=(e,t)=>{console.log("### getTransferRecords - req.query: "+JSON.stringify(e.query));let o=[],r=[],s=[],n=[],a=[],l=[],{userId:d}=e.session;try{if(e.params.type==="rows"&&e.params.docEntry&&e.params.recordType){let i;e.params.recordType==="direct"?i=Ke.selectItemDetailsForSTs:e.params.recordType==="draft"&&(i=Ke.selectItemDetailsForSTDrafts),console.log("type: "+e.params.type+" docEntry:"+e.params.docEntry),o=Et.executeWithValues(i+`(${e.params.docEntry})`,[]),t.send({rows:o})}else if(e.query.userRole&&d){let i,c="";if(e.query.userRole==ft.APPROVER?i=Ke.selectStockTransDraftsWithMultiApprover:e.query.userRole==ft.ORIGINATOR&&(i=Ke.selectStockTransDrafts,c=` AND T0."U_OriginatorId" = ? ${Ei}`,l=Ps(c,[d])),e.query.userRole==ft.ADMIN){let p=` AND T0."U_OriginatorId" IN (${e.query.originatorIds})
                      AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`,y=[e.query.fromDate,e.query.toDate];e.query.status&&e.query.status!=="ALL"&&(p=p+' AND T0."U_DraftStatus" IN (?)',y.push(e.query.status)),p=p+Ei,o=Et.executeWithValues(Ke.selectStockTransDrafts+p,y),l=Ps(p,y)}else o=Et.executeWithValues(i+c,[d]);if(Array.isArray(o)&&o.length&&(o.forEach(p=>{r.push(p.DocEntry)}),Array.isArray(r)&&r.length)){(e.query.userRole==ft.ORIGINATOR||e.query.userRole==ft.ADMIN||e.query.userRole==ft.APPROVER)&&(s=Et.executeWithValues(eT.selectDraftApproversList+`(${r}) ORDER BY T0."U_ApprovalLevel" ASC`,[]),console.log("allApprovers: "+JSON.stringify(s)),Array.isArray(s)&&s.length&&o.forEach(y=>{n=[],s.forEach(g=>{y.DocEntry==g.U_DocEntry&&n.push(g)}),y.approvers=n}));let p=Et.executeWithValues(Ke.selectItemDetailsForSTDrafts+`(${r})`);if(Array.isArray(p)&&p.length){let y;o.forEach(g=>{a=[],p.forEach(E=>{g.DocEntry===E.DocEntry&&a.push(E),y||(y=E.FromWhsCod)}),g.itemList=a,g.FromWhsCod=y})}}t.send([...o,...l])}}catch(i){console.log("getTransferRecords - controller - error: "+JSON.stringify(i)),t.status(500).send({message})}},Ps=(e="",t=[])=>{let o=[0],r=[],s=[];try{return s=Et.executeWithValues(Ke.selectApprovedSTs+e,t),console.log("reqsCreatedByApprover: "+JSON.stringify(s)),s}catch(n){throw n}};Ai.exports={getTransferRecords:tT,getApprovedSTRecords:Ps}});var Ni=u((XN,Di)=>{var{dbCreds:Ii}=D(),oT=`UPDATE ${Ii.CompanyDB}.OBTN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`,rT=`UPDATE ${Ii.CompanyDB}.OSRN SET "U_ReservedFor" = ?
    WHERE "DistNumber" = ?`;Di.exports={updateReservedCustForBatch:oT,updateReservedCustForSerial:rT}});var Ri=u((ZN,bi)=>{var{dbCreds:J}=D(),sT=`SELECT T0."ItemCode", T0."DistNumber" As "U_Batch", T0."U_Width" As "U_Width", T0."U_Height" As "U_Height", 
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
  FROM ${J.CompanyDB}.OBTN T0
    INNER JOIN ${J.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${J.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${J.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
  WHERE 1=1`,nT=`SELECT DISTINCT T0."ItemCode", T0."DistNumber" AS "U_Batch", T0."U_Width" As "U_Width", 
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
    FROM ${J.CompanyDB}.OBTN T0
      LEFT JOIN ${J.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${J.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${J.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,aT=`SELECT DISTINCT T0."ItemCode", '' AS "U_Batch", T0."U_Width" As "U_Width", 
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
    FROM ${J.CompanyDB}.OBTN T0
      LEFT JOIN ${J.CompanyDB}.OBTQ T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
      LEFT JOIN ${J.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${J.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
    WHERE 1=1`,iT=`SELECT T0."ItemCode",
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
      FROM ${J.CompanyDB}."OBTN" T0
      LEFT JOIN ${J.CompanyDB}."OBTQ" T1
        ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
      LEFT JOIN ${J.CompanyDB}."OBBQ" B ON T0."AbsEntry"=B."SnBMDAbs" AND T0."ItemCode"=B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
      LEFT JOIN ${J.CompanyDB}."OBIN" C ON B."BinAbs"=C."AbsEntry" AND B."WhsCode"=C."WhsCode"
      WHERE 1=1`,lT=`SELECT DISTINCT T0."ItemCode",
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
    FROM ${J.CompanyDB}."OBTN" T0
    LEFT JOIN ${J.CompanyDB}."OBTQ" T1
      ON T0."SysNumber"=T1."SysNumber" AND T0."ItemCode"=T1."ItemCode"
    WHERE 1=1`,cT=`SELECT 1
      FROM ${J.CompanyDB}."OBTN" S0
    INNER JOIN ${J.CompanyDB}."OBTQ" S1
      ON S0."SysNumber"=S1."SysNumber" AND S0."ItemCode"=S1."ItemCode"
      WHERE S0."U_Width"  = T0."U_Width"
        AND S0."U_Height" = T0."U_Height"
        AND S0."U_Length" = T0."U_Length"`;bi.exports={selectTimYardItemInfo:sT,selectTimYardItemInitialInfo1:nT,selectTimYardItemInitialInfo2:aT,selectTimyardItemInitialInfo3:iT,selectTimyardItemInitialInfo4:lT,selectTimYardItemExistsCheck:cT}});var W=u((eb,xi)=>{var Oi=["January","February","March","April","May","June","July","August","September","October","November","December"],Ui=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dT=async e=>{let t=require("dns"),o=e.connection.remoteAddress;return o==="127.0.0.1"||o==="::1"?"localhost":new Promise((r,s)=>{t.reverse(o,(n,a)=>{if(n)console.error(n),r(o);else{let l=a[0]||o;r(l)}})})},uT=(e,t)=>{try{let o=e.getTime(),r=t.getTime();return Math.abs(o-r)/(1e3*60)}catch(o){return console.log(o),0}},pT=(e,t)=>{e=new Date(e);let o="NA";if(e!="Invalid Date"){let r=e.getDate().toString().padStart(2,"0"),s=(e.getMonth()+1).toString().padStart(2,"0"),n=e.getFullYear(),a=e.toLocaleString("default",{month:"short"});if(t.includes("MMMM D, YYYY")?o=`${Oi[e.getMonth()]} ${e.getDate()}, ${n}`:t.includes("MMM D, YYYY")?o=`${Oi[e.getMonth()].substr(0,3)} ${e.getDate()}, ${n}`:t.includes("YYYY-MM-DD")?o=n+"-"+s+"-"+r:t.includes("YYYY/MM/DD")?o=n+"/"+s+"/"+r:t==="DD/MM/YYYY"?o=r+"/"+s+"/"+n:t==="DD/MM/YY"?o=r+"/"+s+"/"+n.toString().substr(-2):t==="DDMMM"?o=r+a:["DDMM","ddmm"].includes(t)&&(o=r+s),t.includes("hh:mm")){let l=parseInt(e.getHours(),10);console.log("hour: "+l);let d="AM";l>12?(l-=12,d="PM"):l===0&&(l=12),o=`${o} ${l}:${e.getMinutes().toString().padStart(2,"0")} ${d}`}else t.includes("HH24:MI:SS.FF2")?o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}.00`:t.includes("HH24:MI:SS")&&(o=`${o} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`)}return o},mT=e=>{let t=new Date(e);return t instanceof Date&&!isNaN(t)},yT=()=>{let e=new Date().getTime(),t=Math.floor(Math.random()*Math.pow(10,15)),o=Math.floor(Math.random()*Math.pow(10,15));console.log("random1: "+t+" random2: "+o+" millisec: "+e);let r=(e+t+o).toString();return r.slice(r.length-9)},gT=(e,t,o,r,s,n)=>{let a=month=dow="*";if(console.log(`cycle: ${e}, dayOfWeek: ${t}, dayOfMonth: ${o}, hour: ${r}, minute: ${s}, amPm: ${n}`),r=parseInt(r),n==="PM"&&r<12?r+=12:n==="AM"&&r===12&&(r=0),e==="Weekly")for(let l=0;l<Ui.length;l++)Ui[l]===t&&(dow=l);else e==="Monthly"&&(a=o);return[s,r,a,month,dow].join(" ")};xi.exports={formatDate:pT,getRandomNo:yT,getCronExpression:gT,getClientHostname:dT,getTimeDifference:uT,isValidDate:mT}});var we=u(F=>{var{isValidDate:Li}=W(),TT=50;F.buildHeaderRecQuery=(e,t,o=null,r="DocDate")=>{let s="",n="";if(t.searchKey){let d=['T0."DocNum"','T0."NumAtCard"','T0."Comments"'];o&&d.push(...o),s+=F.buildWildCardSearchCondition(d,t.searchKey),t.salesEmployeeCode&&(s+=F.buildEqualCondition('T0."SlpCode"',t.salesEmployeeCode)),t.locationName&&(s+=F.buildEqualCondition('T0."U_Location"',t.locationName)),n=F.buildLimitOffset(1,TT)}else{let d=F.buildHeaderRecFilterConditions(t,r);s=d.filter,n=d.limitOffset}t.IsHomeDelivery&&(s+=F.buildEqualCondition('T0."U_IsHomeDelivery"',t.IsHomeDelivery),t.userId&&(s+=F.buildEqualCondition('T0."U_DeliveryAgentId"',t.userId)));let a=' ORDER BY T0."DocNum" ASC';return e+s+a+n};F.buildRowLevelQuery=(e,t)=>{let o="";t.lineStatus&&(o+=F.buildEqualCondition('T1."LineStatus"',t.lineStatus));let r=' ORDER BY T1."LineNum" ASC';return e+`(${t.docNum.toString()})`+o+r};F.buildHeaderRecFilterConditions=(e,t)=>{let o="",r="";return e.fromDate&&e.toDate&&(o+=F.buildDateRangeCondition(`T0."${t}"`,e.fromDate,e.toDate)),e.cardCode&&(o+=F.buildEqualCondition('T0."CardCode"',e.cardCode)),e.docStatus&&(o+=F.buildEqualCondition('T0."DocStatus"',e.docStatus)),e.locationName&&(o+=F.buildEqualCondition('T0."U_Location"',e.locationName)),e.salesEmployeeCode&&(o+=F.buildEqualCondition('T0."SlpCode"',e.salesEmployeeCode)),e.pageNum&&e.pageSize&&(r=F.buildLimitOffset(e.pageNum,e.pageSize)),{filter:o,limitOffset:r}};F.buildLimitOffset=(e=1,t)=>{let o="";if(!isNaN(e)&&!isNaN(t)&&t>0){let r=(e-1)*t,s=e*t;o=` LIMIT ${t} OFFSET ${r} `}return o};F.buildDateRangeCondition=(e,t,o)=>{let r="";return Li(t)&&Li(o)&&(r=` AND ${e} BETWEEN TO_DATE('${t}') AND TO_DATE('${o}') `),r};F.buildEqualCondition=(e,t)=>{let o="";return e&&t&&(o=` AND ${e} = '${t}' `),o};F.buildWildCardSearchCondition=(e,t)=>{let o="";if(t)return isNaN(t)&&(t=t.toUpperCase()),o=` AND ( ${e.map(s=>`UPPER(${s}) LIKE '%${t}%'`).join(" OR ")} ) `,o}});var Xo=u((rb,_i)=>{var me=D(),wi=Ni(),oo=Ri(),ye=N(),{buildLimitOffset:hT,buildWildCardSearchCondition:CT}=we(),{itemTypes:At,requestTypes:Bi,EXCLUDED_ITEM_GROUPS:ob}=C(),Xe=(e,t=!1,o="T0")=>e&&e.displayUserName&&e.displayUserName.startsWith("Ammunition")?` AND ${o}."ItmsGrpCod" = '130'`:t?` AND ${o}."ItmsGrpCod" != '130'`:"",ST=e=>{console.log("*** req.query: "+JSON.stringify(e.query));let t=Xe(e.userSessionLog,!0,"T0"),o="",r=[],s="",n="";e.pageNum&&e.pageSize&&(o=hT(e.pageNum,e.pageSize)),e.searchKey&&(s=CT(['T0."ItemCode"','T0."ItemName"','T0."FrgnName"'],e.searchKey));let a=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."InvntryUom",
             T0."ManBtchNum", T0."ManSerNum", T0."InvntItem",
             T0."CodeBars", T0."AvgPrice", T0."SpcialDisc" "Discount",
             (SELECT MAX(A."Price") FROM  ${me.dbCreds.CompanyDB}.ITM1 A 
                WHERE A."ItemCode"=T0."ItemCode" AND A."PriceList"='1') AS "Price"
              FROM ${me.dbCreds.CompanyDB}.OITM T0
             WHERE T0."frozenFor" = 'N' ${t}`;if(e.itemType){let l="",d="";e.itemCodes&&(l=e.itemCodes,Array.isArray(l)?l="'"+l.join("','")+"'":l="'"+l+"'",d=` AND T0."ItemCode" IN (${l})`),console.log("** itemCodes: "+l),e.itemType===At.NORMAL?a=`SELECT T0."ItemCode"
              FROM ${me.dbCreds.CompanyDB}.OITM T0
            WHERE T0."ManBtchNum" ='N' AND T0."ManSerNum" ='N' AND T0."frozenFor" = 'N' ${t}
              ${d}`:e.itemType===At.LABOR&&(a=`SELECT T0."ItemCode"
              FROM ${me.dbCreds.CompanyDB}.OITM T0
            WHERE T0."InvntItem" ='N' AND T0."frozenFor" = 'N' ${t}
              ${d}`)}n=' ORDER BY T0."ItemCode" ASC';try{console.log("getItems - sql+filter+orderBy+limitOffset: ",a+s+n+o),console.log("getItems - values: ",r);let l=ye.executeWithValues(a+s+n+o,r),d=[];return e.query&&(e.itemType===At.NORMAL||e.itemType===At.LABOR)?(l.forEach(i=>{d.push(i.ItemCode)}),console.log("getItems - itemCodes - %s",JSON.stringify(d)),d):(console.log("getItems - rows - %s",JSON.stringify(l)),l)}catch(l){throw console.log("getItems - helper - error: "+JSON.stringify(l)),l}},fT=async e=>{let t,o=[],r="";console.log("filter.itemAndWHCodes: "+e.itemAndWHCodes);let s=Xe(e.userSessionLog);if(e.type===Bi.BATCH_SERIAL_IN_A_BIN)try{let n=await vi(e.itemType,e.itemCode,e.warehouseCode,e.binCode,e.userSessionLog);return console.log("getBatchSerialInfo: "+JSON.stringify(n)),n}catch(n){throw n}else if(e.type===Bi.BATCH_SERIAL_WITH_ALL_BINS)try{let n,a,l=[],d=[],i=Ko(e.itemAndWHCodes,"A");if(r=i.where+' GROUP BY A."ItemCode", C."BinCode", C."AbsEntry", A."WhsCode",B."DistNumber"',o=i.values,console.log("BATCH_SERIAL_WITH_ALL_BINS - values: "+o.toString()),n=ye.executeWithValues(me.batchForItemAndWH+r+s,o),a=ye.executeWithValues(me.serialForItemAndWH+r+s,o),Array.isArray(n)&&n.length>0){let c=Ko(n,"A");r=c.where,o=c.values,l=ye.executeWithValues(me.getAllBinsForBatch+r,o)}if(Array.isArray(a)&&a.length>0){let c=Ko(a,"A");r=c.where,o=c.values,console.log("binsListForSerial - values: "+o.toString()),d=ye.executeWithValues(me.getAllBinsForSerial+r,o),console.log("binsListForSerial - result: "+JSON.stringify(d))}if(Array.isArray(l)&&l.length>0){let c=[];n.forEach(p=>{l.forEach(y=>{p.ItemCode===y.ItemCode&&p.WhsCode===y.WhsCode&&p.BatchNumberProperty===y.BatchNumberProperty&&c.push({BatchNumberProperty:y.BatchNumberProperty,BinCode:y.BinCode,BinAbsEntry:y.BinAbsEntry,OnHandQty:y.OnHandQty})}),p.DocumentLinesBinAllocations=c,c=[]})}if(Array.isArray(d)&&d.length>0){let c=[];a.forEach(p=>{d.forEach(y=>{p.ItemCode===y.ItemCode&&p.WhsCode===y.WhsCode&&p.InternalSerialNumber===y.InternalSerialNumber&&c.push({InternalSerialNumber:y.InternalSerialNumber,BinCode:y.BinCode,BinAbsEntry:y.BinAbsEntry,OnHandQty:y.OnHandQty})}),p.DocumentLinesBinAllocations=c,c=[]})}return[...n,...a]}catch(n){throw n}else{if(console.log("filter: "+e),e.batchSerialNo&&e.binCode)r=' AND B."DistNumber" = ? AND C."BinCode" = ?',o=[e.batchSerialNo,e.binCode];else if(e.batchSerialNo)r=' AND B."DistNumber" = ?',o=[e.batchSerialNo];else if(e.warehouseCode)r+=' AND A."WhsCode" = ?',o=[e.warehouseCode],e.binCode&&(r+=' AND C."BinCode" = ?',o.push(e.binCode));else if(e.itemAndWHCodes){let n=Ko(e.itemAndWHCodes,"A");r=n.where,o=n.values}e.itemCode&&(r=' AND A."ItemCode" = ?',o=[e.itemCode]);try{console.log("getBatchSerialInfo - values: "+o.toString());let n=ye.executeWithValues(me.getAllBinsForBatch+r,o),a=ye.executeWithValues(me.getAllBinsForSerial+r,o);return[...n,...a]}catch(n){throw n}}},vi=(e,t,o,r,s=null)=>{let n=[],a,l,d=Xe(s);e===At.BATCHES?l=me.getAllBinsForBatch:e===At.SERIAL_NUMBERS&&(l=me.getAllBinsForSerial),t&&n.push(`A."ItemCode" IN ('${t}')`),o&&n.push(`A."WhsCode" IN ('${o}')`),r&&n.push(`C."BinCode" IN ('${r}')`),n.length&&(l=`${l} AND ${n.join(" AND ")}`),d&&(l+=d.replace("T0.","A."));try{return a=ye.executeWithValues(l),console.log("getBatchSerialRecords - result: "+JSON.stringify(a)),a}catch(i){throw i}},ET=(e,t,o)=>{let r=[],s,n;e?n=wi.updateReservedCustForBatch:t&&(n=wi.updateReservedCustForSerial);try{return s=ye.executeWithValues(n,o),console.log("setBatchSerialReservedCust - result: "+JSON.stringify(s)),s}catch(a){throw a}},Ko=(e,t)=>{let o=[],r="";return Array.isArray(e)&&e.length&&(e.forEach(s=>{r?r+=" OR ":r+=" AND (",!s.BatchNumberProperty&&!s.InternalSerialNumber&&(s=JSON.parse(s)),s.BatchNumberProperty||s.InternalSerialNumber?(r+=`(B."DistNumber"=? AND ${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.BatchNumberProperty?s.BatchNumberProperty:s.InternalSerialNumber),o.push(s.ItemCode),o.push(s.WhsCode)):(r+=`(${t}."ItemCode" = ? AND ${t}."WhsCode" = ?)`,o.push(s.itemCode),o.push(s.warehouseCode))}),r+=")"),{where:r,values:o}},AT=e=>{let t=[],o,r;r=oo.selectTimYardItemInfo,Xe(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItems - Query: "+r);try{return o=ye.executeWithValues(r),console.log("getTimYardItemRecords - result: "+JSON.stringify(o)),Array.isArray(o)&&o.length>0&&(o=o.filter(n=>parseFloat(n.U_AvlQty)>0||parseFloat(n.U_AvlPcs)>0)),o}catch(n){throw n}},IT=e=>{let t=[],o,r;r=oo.selectTimYardItemInitialInfo1,Xe(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),console.log("getTimYardItemInitial1Records - Query: "+r);try{return o=ye.executeWithValues(r),o}catch(n){throw n}},DT=e=>{let t=[],o,r,s,n;r=oo.selectTimyardItemInitialInfo3,Xe(e.userSessionLog)&&t.push(`T0."ItemCode" IN (SELECT "ItemCode" FROM OITM WHERE "ItmsGrpCod" = '130')`),e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`T1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(r=`${r} AND ${t.join(" AND ")}`),s=oo.selectTimyardItemInitialInfo4,t=[],e.itemCode&&t.push(`T0."ItemCode" IN ('${e.itemCode}')`),t.length&&(s=`${s} AND ${t.join(" AND ")}`),n=oo.selectTimYardItemExistsCheck,t=[],e.itemCode&&t.push(`S0."ItemCode" IN ('${e.itemCode}')`),e.warehouseCode&&t.push(`S1."WhsCode" IN ('${e.warehouseCode}')`),t.length&&(n=`${n} AND ${t.join(" AND ")}`),r=r+" UNION "+s+" AND NOT EXISTS ("+n+" )",console.log("getTimYardItemInitialRecords - Query: "+r);try{o=ye.executeWithValues(r);let l=o.map(i=>{if(i.U_Batch&&i.U_Batch.trim()!=="")return i;let c=i.ItemCode.toString().slice(-6),p="";i.U_Length!==void 0&&i.U_Length!==null&&(p=parseFloat(i.U_Length));let y=p!==""?`SC${e.warehouseCode}${c}_${p}`:`SC${e.warehouseCode}${c}`;return{...i,U_Batch:y}});console.log("getTimYardItemInitialRecords - enriched: "+JSON.stringify(l));let d=l;return Array.isArray(l)&&l.length>0&&(d=l.filter(i=>parseFloat(i.U_AvlQty)>0||parseFloat(i.U_AvlPcs)>0)),d}catch(l){throw l}};_i.exports={getItems:ST,getBatchSerialInfo:fT,getBatchSerialRecords:vi,setBatchSerialReservedCust:ET,getTimYardItemRecords:AT,getTimYardItemInitial1Records:IT,getTimYardItemInitial3Records:DT,getAmmoFilter:Xe}});var Fi=u((lb,Mi)=>{var Ne=N(),ge=D(),sb=Bs(),Pi=vs(),{getApprovedSTRRecords:NT}=_s(),{getApprovedSTRecords:bT}=Ms(),{getBatchSerialInfo:RT,getItems:OT,getTimYardItemRecords:UT,getTimYardItemInitial1Records:nb,getTimYardItemInitial2Records:ab,getTimYardItemInitial3Records:xT}=Xo(),{portalModules:ro,draftObjectCodes:Fs,draftStatus:Ze,itemTypes:ib}=C(),LT=(e,t)=>{let o;e.query.moduleName===ro.STOCK_TRANSFER&&(o=Pi.selectSTDocEntry);try{let r=Ne.executeWithValues(o,[e.query.docNum]);console.log("getDocEntry: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getDocEntry - controller - error: "+JSON.stringify(r.message)),t.status(500).send({message:r.message})}},wT=(e,t)=>{try{t.send({serverDateTime:new Date})}catch(o){console.log("err: "+JSON.stringify(o)),t.status(500).send({message:JSON.stringify(o)})}},BT=(e,t)=>{try{let o=Ne.executeWithValues(ge.picklistWarehouses,[]);t.send(o)}catch(o){console.log("getPicklistWarehouses - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},vT=(e,t)=>{try{let o=Ne.executeWithValues(ge.userBranches,[e.session.userId]);console.log("getUserBranches- branchList: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},_T=(e,t)=>{try{let o=Ne.executeWithValues(ge.allFreightInfo,[]);console.log("getFreightList- allFreightInfo: "+JSON.stringify(o)),t.send(o)}catch(o){console.log("getItemDetails - controller - error: "+JSON.stringify(o.message)),t.status(500).send({message:o.message})}},PT=(e,t)=>{console.log("*** req.query: "+JSON.stringify(e.query));try{let o=OT({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){console.log("getItemsList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},MT=(e,t)=>{try{Ne.executeQuery(ge.portalModules,(o,r)=>{if(o)throw o;console.log("getPortalModules %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalModules - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},FT=(e,t)=>{let o,r=0,s=0,n=0,a=0,l=0,d=0,i,c,{userId:p}=e.session;console.log("getDraftsCount - req.session.userId: ",p);let y=[p];if(e.query.moduleName){if(e.query.moduleName==ro.STOCK_TRANSFER_REQUEST){o=Fs.STOCK_TRANSFER_REQUEST;let g=NT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(g)&&g.length>0&&(s=s+g.length,l=l+g.length)}else if(e.query.moduleName==ro.STOCK_TRANSFER){o=Fs.STOCK_TRANSFER;let g=bT(` AND T0."U_DraftStatus" = 'AUTO_APPROVED' AND T0."U_OriginatorId" = ?`,[p]);Array.isArray(g)&&g.length>0&&(s=s+g.length,l=l+g.length)}else e.query.moduleName==ro.DELIVERY&&(o=Fs[ro.DELIVERY],i=Pi.selectApprovedSTs+' AND T0."U_OriginatorId" = ?');o&&y.push(o);try{let g=Ne.executeWithValues(ge.selectDraftsForApprover,y),E=Ne.executeWithValues(ge.selectDraftsForOriginator,y);Array.isArray(g)&&g.length&&g.forEach(T=>{T.U_DraftStatus===Ze.PENDING&&T.ActualStatus!==Ze.APPROVED?r++:T.U_DraftStatus===Ze.APPROVED?s++:T.U_DraftStatus===Ze.REJECTED&&n++}),Array.isArray(E)&&E.length&&E.forEach(T=>{T.U_DraftStatus===Ze.PENDING?a++:T.U_DraftStatus===Ze.APPROVED?l++:T.U_DraftStatus===Ze.REJECTED&&d++}),t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:l,originatorRejected:d})}catch(g){t.status(500).send({message:g.message})}}else t.send({approverPending:r,approverApproved:s,approverRejected:n,originatorPending:a,originatorApproved:l,originatorRejected:d})},$T=(e,t)=>{let o=e.query.itemCode;Array.isArray(o)?o="'"+o.join("','")+"'":o="'"+o+"'",console.log("** itemCodes: "+o);let r=ge.itemQuantityInWarehouse,s=[],n=[];e.query.itemCode&&s.push(`T0."ItemCode" IN (${o})`),e.query.warehouseCode&&s.push(`T0."WhsCode" IN (${e.query.warehouseCode})`);let d=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND T2."ItmsGrpCod" = '130'`:` AND T2."ItmsGrpCod" != '130'`;s.length&&(r=`${r} AND ${s.join(" AND ")} ${d} ORDER BY T0."OnHand" DESC`),console.log("getItemCountInWarehouse - sql: "+r);try{n=Ne.executeWithValues(r),console.log("getItemCountInWarehouse - result: "+JSON.stringify(n)),t.send(n)}catch(i){t.status(500).send({message:i.message})}},WT=(e,t)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));let o="",r=[],s="",n="";e.query.searchKey&&(s=` AND (
                UPPER(A."ItemCode") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."ItemName") LIKE '%${e.query.searchKey}%'
                  OR UPPER(A."FrgnName") LIKE '%${e.query.searchKey}%' ) `);let d=(e.session?.userSessionLog?.displayUserName||"").startsWith("Ammunition")?` AND A."ItmsGrpCod" = '130'`:` AND A."ItmsGrpCod" != '130'`,i,c=e.query.itemCode,p=e.query.warehouseCode,y=e.query.binCode,g=e.query.barCode,E=e.query.cardCode,T=e.query.branch;if(e.params.type==="available-item-qty"){i=ge.binsAndItemQuantityInWarehouse,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),e.session?.userSessionLog?.storeLocation==="Labasa"?r.push("2"):r.push("1");let h=[];c&&h.push(`A."ItemCode" IN ('${c}')`),g&&h.push(`A."CodeBars" IN ('${g}')`),p&&h.push(`C."WhsCode" IN ('${p}')`),y&&h.push(`D."BinCode" IN ('${y}')`),h.length&&(i=`${i} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else if(e.params.type==="available-item-qty-price"){i=ge.binsAndItemQuantityInWarehouseWithPrice,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(E);let h=[];c&&h.push(`A."ItemCode" IN ('${c}')`),g&&h.push(`F."BcdCode" IN ('${g}')`),p&&h.push(`B."WhsCode" IN ('${p}')`),y&&h.push(`D."BinCode" IN ('${y}')`),h.length&&(i=`${i} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else if(e.params.type==="available-item-qty-price-with-pricelist"){i=ge.binsAndItemQuantityInWarehouseWithPriceList,console.log("Store Location: ",e.session?.userSessionLog?.storeLocation),r.push(E),r.push(T);let h=[];c&&h.push(`A."ItemCode" IN ('${c}')`),g&&h.push(`F."BcdCode" IN ('${g}')`),p&&h.push(`B."WhsCode" IN ('${p}')`),y&&h.push(`D."BinCode" IN ('${y}')`),h.length&&(i=`${i} AND ${h.join(" AND ")}`),n=' ORDER BY D."BinCode" ASC',i=i+s+d+n+o,console.log("getBinsAndItemQtyForWarehouse - sql: "+i)}else{i=ge.binsList;let h=[];p&&h.push(`T0."WhsCode" IN ('${p}')`),h.length&&(i=`${i} WHERE ${h.join(" AND ")} ORDER BY T0."BinCode" ASC`)}if(e.query.pageNum&&e.query.pageSize){let h=e.query.pageNum,A=e.query.pageSize,$=(h-1)*A,I=h*A;o=" LIMIT ? OFFSET ? ",r=[A,$]}try{let h=Ne.executeWithValues(i,r);t.send(h)}catch(h){t.status(500).send({message:h.message})}},kT=async(e,t)=>{try{let o=await RT({...e.query,userSessionLog:e.session.userSessionLog});t.send(o)}catch(o){t.status(500).send({message:o.message})}},HT=async(e,t)=>{try{console.log("getTimYardItemInfo: ",e.query);let o=[];e.query.isStockCounter==="true"?o=await xT({...e.query,userSessionLog:e.session.userSessionLog}):o=await UT({...e.query,userSessionLog:e.session.userSessionLog}),console.log("getTimYardItemInfo: "+JSON.stringify(o)),t.send(o)}catch(o){t.status(500).send({message:o.message})}},JT=async(e,t)=>{console.log("req.query"+JSON.stringify(e.query));try{let o=Ne.executeWithValues(ge.binsListForItem,[e.query.warehouseCode,e.query.itemCode]);t.send(o)}catch(o){console.log("getBins - error: "+JSON.stringify(o.message)),next(o)}};Mi.exports={getDocEntry:LT,getServerDateTime:wT,getUserBranches:vT,getFreightList:_T,getItemsList:PT,getPortalModules:MT,getDraftsCount:FT,getItemCountInWarehouse:$T,getBinsAndItemQtyForWarehouse:WT,getBatchSerialNoInfo:kT,getTimYardItemInfo:HT,getBinListbyItem:JT,getPicklistWarehouses:BT}});var $s=u((cb,$i)=>{var qT="Temporary password",GT=e=>`
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
  `;$i.exports={subject:qT,getMailBody:GT}});var Zo=u((db,Wi)=>{var Ws=require("../node_modules/bcrypt/bcrypt.js"),jT=async e=>{try{let o=await Ws.genSalt(10);return await Ws.hash(e,o)}catch(o){throw o}},zT=async(e,t)=>{let o=!1;try{o=await Ws.compare(e,t)}catch(r){console.log("Bcrypt error - comparePassword: "+r)}finally{return o}};Wi.exports={generateHash:jT,comparePassword:zT}});var ks=u((ub,ki)=>{var VT=()=>{let t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";let o="";for(let r=0;r<8;r++)o+=t.charAt(Math.floor(Math.random()*t.length));return o};ki.exports={generatePassword:VT}});var qi=u(Ji=>{var{dbCreds:Hi}=D();Ji.selectSalesEmployeeForUser=`SELECT T0."USER_CODE", T1."SalePerson" "SlpCode"
  FROM ${Hi.CompanyDB}.OUSR T0, ${Hi.CompanyDB}.OUDG T1
WHERE T0."DfltsGroup" = T1."Code"
  AND T0."INTERNAL_K" = ?`});var so=u((mb,Gi)=>{var et=N(),It=D(),{generatePassword:QT}=ks(),{generateHash:YT}=Zo(),{selectSalesEmployeeForUser:KT}=qi(),XT=e=>{try{return et.executeWithValues(KT,[e])}catch(t){throw console.log("getSalesEmployeeForUser - controller - error: "+JSON.stringify(t.message)),t}},Hs=e=>{let t=`${It.selectUsersInUserGroup} '%${e}%' ORDER BY T0."U_NAME" ASC`;try{let o=et.executeWithValues(t);return Array.isArray(o)&&o.length>0?o:void 0}catch(o){throw o}},ZT=e=>{try{let t=et.executeWithValues(It.selectUserGroupInUser,e);return console.log("getUserGroupByUser- rows: "+JSON.stringify(t)),Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},eh=e=>{try{let t=Hs(e);if(console.log("userRC: ",JSON.stringify(t)),Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.U_UserId)}),o}return}catch(t){throw t}},th=e=>{try{let t=Hs(e);if(Array.isArray(t)&&t.length>0){let o=[];return t.forEach(r=>{o.push(r.UserName)}),o}return}catch(t){throw t}},oh=e=>{try{let t=et.executeWithValues(It.selectUserInfo,e);return Array.isArray(t)&&t.length>0?t[0]:void 0}catch(t){throw t}},rh=e=>{try{let t=et.executeWithValues(It.getUserPermissionsForAllModules,e);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}},sh=(e,t)=>{try{let o=et.executeWithValues(It.validateUserEmail,[e,t]);return Array.isArray(o)&&o.length>0?o[0]:void 0}catch(o){throw o}},nh=async e=>{try{let t=QT(),o=await YT(t);return et.executeWithValues(It.updatePortalPassword,[o,"Y",e])>0?t:void 0}catch(t){throw t}};Gi.exports={getUserInfo:oh,getUserPermissions:rh,getUsersByUserGroup:Hs,getUserGroupByUser:ZT,getUserIDsByUserGroup:eh,getUserNamesByUserGroup:th,getUserInfoWithUserNameMail:sh,setTemporaryPassword:nh,getSalesEmployeeForUser:XT}});var er=u((yb,ji)=>{var{EntitySchema:ah}=require("../node_modules/typeorm/index.js");ji.exports=new ah({name:"StoreCounters",tableName:"StoreCounters",columns:{storeCounterId:{name:"StoreCounterId",primary:!0,type:"int",generated:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,unique:!1,nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,unique:!0,nullable:!1},userId:{name:"UserId",type:"int",nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",default:()=>"CURRENT_TIMESTAMP"},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeCounters"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"storeCounters"}}})});var tr=u((gb,zi)=>{var{EntitySchema:ih}=require("../node_modules/typeorm/index.js");zi.exports=new ih({name:"Stores",tableName:"Stores",columns:{storeId:{name:"StoreId",primary:!0,type:"int",generated:!0},storeName:{name:"StoreName",type:"nvarchar",length:200,unique:!0,nullable:!1},storeCode:{name:"StoreCode",type:"nvarchar",length:100,unique:!0,nullable:!0},location:{name:"Location",type:"nvarchar",length:400,unique:!1,nullable:!1},locationCode:{name:"LocationCode",type:"nvarchar",length:100,unique:!1,nullable:!0},defaultWarehouseCode:{name:"DefaultWarehouseCode",type:"nvarchar",length:100,unique:!1,nullable:!0},description:{name:"Description",type:"nvarchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}},relations:{storeWarehouses:{type:"one-to-many",target:"StoreWarehouses",inverseSide:"stores"},storeCounters:{type:"one-to-many",target:"StoreCounters",inverseSide:"stores"},storeUsers:{type:"one-to-many",target:"StoreUsers",inverseSide:"stores"},cashDenominations:{type:"one-to-many",target:"CashDenominations",inverseSide:"stores"}}})});var Js=u((Tb,Vi)=>{var{EntitySchema:lh}=require("../node_modules/typeorm/index.js");Vi.exports=new lh({name:"CashDenominations",tableName:"CashDenominations",columns:{cashDenominationId:{name:"CashDenominationId",primary:!0,type:"int",generated:!0},storeId:{name:"StoreId",type:"int",nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},trxNumber:{name:"TrxNumber",type:"int",unique:!0,nullable:!0},trxType:{name:"TrxType",type:"nvarchar",length:100,unique:!1,nullable:!1},dateTime:{name:"DateTime",type:"timestamp",nullable:!0},_5cCoin:{name:"5cCoin",type:"int",default:0},_10cCoin:{name:"10cCoin",type:"int",default:0},_20cCoin:{name:"20cCoin",type:"int",default:0},_50cCoin:{name:"50cCoin",type:"int",default:0},_1$Coin:{name:"1DollarCoin",type:"int",default:0},_2$Coin:{name:"2DollarCoin",type:"int",default:0},_5$Note:{name:"5DollarNote",type:"int",default:0},_10$Note:{name:"10DollarNote",type:"int",default:0},_20$Note:{name:"20DollarNote",type:"int",default:0},_50$Note:{name:"50DollarNote",type:"int",default:0},_100$Note:{name:"100DollarNote",type:"int",default:0}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"cashDenominations"},storeCounters:{type:"many-to-one",target:"StoreCounters",joinColumn:{name:"StoreCounterId"},inverseSide:"cashDenominations"}}})});var qs=u((Cb,Qi)=>{var{recordState:hb}=C(),{EntitySchema:ch}=require("../node_modules/typeorm/index.js");Qi.exports=new ch({name:"ParkedTransactions",tableName:"ParkedTransactions",columns:{parkedTransactionId:{name:"ParkedTransactionsId",primary:!0,type:"int",generated:!0},transactionType:{name:"TransactionType",type:"nvarchar",length:50},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!1},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!1},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!1},transactionRefNum:{name:"TransactionRefNum",type:"nvarchar",length:"100"},nextRefNum:{name:"NextRefNum",type:"int"},data:{name:"Data",type:"nclob",nullable:!1},parkedDateTime:{name:"ParkedDateTime",type:"timestamp"}}})});var Gs=u((Sb,Yi)=>{var{EntitySchema:dh}=require("../node_modules/typeorm/index.js");Yi.exports=new dh({name:"QCItemGroup",tableName:"QCItemGroup",columns:{itemGroupId:{name:"ItemGroupId",primary:!0,type:"int",generated:!0},groupName:{name:"GroupName",type:"varchar",length:100,unique:!0,nullable:!1},description:{name:"Description",type:"varchar",length:300,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int"},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0}},relations:{itemGroupMembers:{type:"one-to-many",target:"QCItemGroupMembers",inverseSide:"itemGroup"}}})});var js=u((fb,Ki)=>{var{EntitySchema:uh}=require("../node_modules/typeorm/index.js");Ki.exports=new uh({name:"QCItemGroupMembers",tableName:"QCItemGroupMembers",columns:{itemGroupMemberId:{name:"ItemGroupMemberId",primary:!0,type:"int",generated:!0},itemCode:{name:"ItemCode",type:"varchar",length:100,unique:!0},itemName:{name:"ItemName",type:"varchar",length:400,unique:!1,nullable:!0},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"varchar",length:100,nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"varchar",length:100,nullable:!0},itemGroupId:{name:"ItemGroupId",type:"int"}},relations:{itemGroup:{type:"many-to-one",target:"QCItemGroup",onDelete:"CASCADE",joinColumn:{name:"ItemGroupId"},inverseSide:"itemGroupMembers"}}})});var or=u((Eb,Xi)=>{var{EntitySchema:ph}=require("../node_modules/typeorm/index.js");Xi.exports=new ph({name:"StoreUsers",tableName:"StoreUsers",columns:{storeUserId:{name:"storeUserId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int",nullable:!1},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeUsers"}}})});var zs=u((Ab,Zi)=>{var{EntitySchema:mh}=require("../node_modules/typeorm/index.js");Zi.exports=new mh({name:"StoreWarehouses",tableName:"StoreWarehouses",columns:{storeWarehouseId:{name:"StoreWarehouseId",primary:!0,type:"int",generated:!0},warehouseCode:{name:"WarehouseCode",type:"nvarchar",length:100,unique:!1},warehouseName:{name:"WarehouseName",type:"nvarchar",length:400,unique:!1,nullable:!1},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0},storeId:{name:"StoreId",type:"int"}},relations:{stores:{type:"many-to-one",target:"Stores",joinColumn:{name:"StoreId"},inverseSide:"storeWarehouses"}}})});var Vs=u((Ib,el)=>{var{EntitySchema:yh}=require("../node_modules/typeorm/index.js");el.exports=new yh({name:"UserGroups",tableName:"UserGroups",columns:{userGroupId:{name:"UserGroupId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},groupId:{name:"GroupId",type:"int"},createdBy:{name:"CreatedBy",type:"int",nullable:!1},createdAt:{name:"CreatedAt",type:"timestamp",nullable:!0},modifiedBy:{name:"ModifiedBy",type:"int",nullable:!0},modifiedAt:{name:"ModifiedAt",type:"timestamp",nullable:!0}}})});var rr=u((Db,tl)=>{var{recordState:gh}=C(),{EntitySchema:Th}=require("../node_modules/typeorm/index.js");tl.exports=new Th({name:"UserSessionLog",tableName:"UserSessionLog",columns:{userSessionLogId:{name:"UserSessionLogId",primary:!0,type:"int",generated:!0},userId:{name:"UserId",type:"int"},userName:{name:"UserName",type:"nvarchar",length:200,unique:!1,nullable:!1},storeId:{name:"StoreId",type:"int",nullable:!0},storeLocation:{name:"StoreLocation",type:"nvarchar",length:100,nullable:!0},storeCounterId:{name:"StoreCounterId",type:"int",nullable:!0},counterCode:{name:"CounterCode",type:"nvarchar",length:100,nullable:!0},counterName:{name:"CounterName",type:"nvarchar",length:100,nullable:!0},clientIp:{name:"ClientIp",type:"varchar",length:"100"},sessionStatus:{name:"SessionStatus",type:"nvarchar",length:50,default:gh.ACTIVE,unique:!1,nullable:!1},loginTime:{name:"LoginTime",type:"timestamp"},logoutTime:{name:"LogoutTime",type:"timestamp",default:"",nullable:!0}}})});var ne=u((Nb,ol)=>{var hh=require("../node_modules/typeorm/index.js"),Ch=er(),Sh=tr(),fh=Js(),Eh=qs(),Ah=Gs(),Ih=js(),Dh=or(),Nh=zs(),bh=Vs(),Rh=rr(),Oh=new hh.DataSource({type:process.env.TYPEORM_TYPE,host:process.env.HANA_HOST,port:process.env.HANA_PORT,username:process.env.HANA_USER,password:process.env.HANA_PASSWORD,schema:process.env.SERVICE_LAYER_COMPANYDB,synchronize:!1,logging:!1,entities:[Ch,Sh,fh,Eh,Ah,Ih,Dh,Nh,bh,Rh]});console.log("Database configuration loaded.");ol.exports={dataSource:Oh}});var Nt=u(no=>{var{dataSource:sr}=ne(),nr=rr(),Dt="userSessionLogId",Uh="loginTime",{recordState:bb}=C();no.createUserSessionLog=async e=>{try{return await sr.getRepository(nr).save(e)}catch(t){throw t}};no.getUserSessionLog=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Dt]=e.id,delete e.id);try{let o=sr.getRepository(nr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Uh]:"DESC"}})}catch(o){throw o}};no.updateUserSessionLog=async(e,t)=>{try{let o=sr.getRepository(nr);t[Dt]&&(e||(e=t[Dt]),delete t[Dt]);let r={};return Object.keys(t).length>0&&(r=await o.update({[Dt]:e},t)),r}catch(o){throw o}};no.deleteUserSessionLog=async e=>{try{return await sr.getRepository(nr).delete({[Dt]:e})}catch(t){throw t}}});var tt=u($e=>{var{dataSource:ar}=ne(),ir=zs(),xh="storeWarehouseId",Lh="warehouseCode";$e.parentPrimaryKey="storeId";$e.createStoreWarehouse=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[$e.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[$e.parentPrimaryKey]:t,createdBy:o,createdAt:r},await ar.getRepository(ir).save(s)}catch(s){throw s}};$e.getStoreWarehouse=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[xh]=e.id,delete e.id);try{let o=ar.getRepository(ir);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Lh]:"ASC"}})}catch(o){throw o}};$e.updateStoreWarehouse=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await ar.getRepository(ir).save(r)}catch(r){throw r}};$e.deleteStoreWarehouse=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await ar.getRepository(ir).delete(t)}catch(o){throw o}}});var dr=u(ao=>{var{dataSource:lr}=ne(),{createStoreWarehouse:sl,updateStoreWarehouse:wh}=tt(),cr=tr(),bt="storeId",Bh="storeName",rl="storeWarehouseId,";ao.createStore=async e=>{try{let o=await lr.getRepository(cr).save(e);if(e.warehouses){let r=await sl(e.warehouses,o[bt]);o.warehouses=r}return o}catch(t){throw t}};ao.getStore=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[bt]=e.id,delete e.id);try{let o=lr.getRepository(cr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Bh]:"ASC"}})}catch(o){throw o}};ao.updateStore=async(e,t)=>{try{let o=lr.getRepository(cr);t[bt]&&delete t[bt];let r;t.warehouses&&(r=t.warehouses,delete t.warehouses);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[bt]:e},t)),r){let n=[];if(r.forEach(async a=>{a[rl]?await wh(a[rl],a):n.push(a)}),n.length>0){let a=await sl(n,e);s.warehouses=a}}return s}catch(o){throw o}};ao.deleteStore=async e=>{try{return await lr.getRepository(cr).delete({[bt]:e})}catch(t){throw t}}});var Qs=u(We=>{var{dataSource:ur}=ne(),pr=er(),vh="storeCounterId",_h="counterName";We.parentPrimaryKey="storeId";We.createStoreCounter=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[We.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[We.parentPrimaryKey]:t,createdBy:o,createdAt:r},await ur.getRepository(pr).save(s)}catch(s){throw s}};We.getStoreCounter=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[vh]=e.id,delete e.id);try{let o=ur.getRepository(pr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[_h]:"ASC"}})}catch(o){throw o}};We.updateStoreCounter=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await ur.getRepository(pr).save(r)}catch(r){throw r}};We.deleteStoreCounter=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await ur.getRepository(pr).delete(t)}catch(o){throw o}}});var Ys=u(ke=>{var{dataSource:mr}=ne(),yr=or(),Ph="storeUserId",Mh="userName";ke.parentPrimaryKey="storeId";ke.createStoreUser=async(e,t,o,r)=>{try{let s;return Array.isArray(e)?s=e.map(a=>({...a,[ke.parentPrimaryKey]:t,createdBy:o,createdAt:r})):s={...e,[ke.parentPrimaryKey]:t,createdBy:o,createdAt:r},await mr.getRepository(yr).save(s)}catch(s){throw s}};ke.getStoreUser=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ph]=e.id,delete e.id);try{let o=mr.getRepository(yr);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[Mh]:"ASC"}})}catch(o){throw o}};ke.updateStoreUser=async(e,t,o)=>{try{let r;return Array.isArray(e)?r=e.map(n=>({...n,modifiedBy:t,modifiedAt:o})):r={...e,modifiedBy:t,modifiedAt:o},await mr.getRepository(yr).save(r)}catch(r){throw r}};ke.deleteStoreUser=async e=>{let t;e.id.includes(",")?t=e.id.split(","):t=e.id;try{return await mr.getRepository(yr).delete(t)}catch(o){throw o}}});var Ks=u(nl=>{var Fh=dr(),$h=tt(),Wh=Qs(),kh=Ys(),Hh=Nt();nl.getUserStoreInfo=async e=>{try{let t=null,o=null,r="",s="",n="",a="",l="";console.log(`LOG LOGIN - Starting Store/Terminal lookup for UserId: ${e}`);let d=await kh.getStoreUser({userId:e});Array.isArray(d)&&d.length>0&&(t=d[0].storeId,console.log(`LOG LOGIN - Found primary Store assignment: StoreId ${t}`));let i=t?{userId:e,storeId:t}:{userId:e},c=await Wh.getStoreCounter(i);if(Array.isArray(c)&&c.length>0){let p=null;if(c.length>1){console.log(`LOG LOGIN - WARNING: Multiple terminals (${c.length}) found for user ${e}. Checking last used terminal...`);let y=await Hh.getUserSessionLog({userId:e},5);if(Array.isArray(y)&&y.length>0)for(let g of y){let E=c.find(T=>T.storeCounterId===g.storeCounterId);if(E){p=E,console.log(`LOG LOGIN - Stickiness: Picking last used terminal: ${p.counterName}`);break}}}p||(p=c[0]),t||(t=p.storeId,console.log(`LOG LOGIN - StoreId inferred from terminal: ${t}`)),o=p.storeCounterId,r=p.counterCode,s=p.counterName,console.log(`LOG LOGIN - Final Terminal assignment: ${s} (${r})`)}else console.log(`LOG LOGIN - No terminal assignment found for user ${e} (StoreId: ${t||"None"})`);if(t){let p=await Fh.getStore({storeId:t});if(Array.isArray(p)&&p.length>0){n=p[0].locationCode,a=p[0].location;let y=await $h.getStoreWarehouse({storeId:t});Array.isArray(y)&&y.length>0&&(l=y[0].warehouseCode)}}return{storeId:t,storeCounterId:o,counterCode:r,counterName:s,locationCode:n,storeLocation:a,storeWHCode:l}}catch(t){throw console.error(`LOG LOGIN - ERROR in getUserStoreInfo for user ${e}:`,t),t}}});var il=u(al=>{var{dataSource:Jh}=ne(),qh=tr(),Bb=er(),vb=or();al.isUserAssignedToCounter=async(e,t)=>{try{let r=await Jh.getRepository(qh).createQueryBuilder("store").innerJoin("store.storeUsers","user").innerJoin("store.storeCounters","counter").where("user.userId = :userId",{userId:e}).andWhere("counter.storeCounterId = :counterId",{counterId:t}).getOne();return console.log("isUserAssignedToCounter - result: ",r),!!r}catch(o){throw o}}});var cl=u(ll=>{var{Between:Gh}=require("../node_modules/typeorm/index.js"),{dataSource:jh}=ne(),zh=rr(),{recordState:Vh}=C();ll.isCounterOccupied=async e=>{let t=jh.getRepository(zh),o=new Date;o.setUTCHours(0,0,0,0);let r=new Date;r.setUTCHours(23,59,59,999);let s=await t.findOne({where:{storeCounterId:e,loginTime:Gh(o.toISOString(),r.toISOString()),sessionStatus:Vh.ACTIVE}});return console.log("isCounterOccupied - existingSession: ",s),!!s}});var gr=u(dl=>{var{isUserAssignedToCounter:Qh}=il(),{isCounterOccupied:Yh}=cl();dl.canAssignUserToCounter=async(e,t)=>{try{if(await Qh(e,t)){if(await Yh(t))throw new Error("Counter already occupied by another user. Make sure you have selected the correct counter!");return!0}else throw new Error("User doesnt have access to this Counter. Please contact Admin!")}catch(o){throw o}}});var ul=u(Zs=>{var{dbCreds:Xs}=D();Zs.selectLocations=`SELECT T0."Code", T0."Location" FROM ${Xs.CompanyDB}.OLCT T0`;Zs.locationDefaults=`SELECT T0."Code" AS "Location", T0."U_AccountCode" AS "AccountCode", T0."U_OTCCardCode", T0."U_CODCardCode",
    T0."U_LocName", T0."U_LocAddress", T0."U_Store", T0."U_Phone", T0."U_Website", T0."U_Email", T1."U_Branch" AS "Branch"
    FROM ${Xs.CompanyDB}."@LOCACCOUNTMAPPING" T0
    INNER JOIN ${Xs.CompanyDB}."OLCT" T1 ON T0."Code" = T1."Location"
  WHERE UPPER(T0."Code") = UPPER(?)`});var io=u(en=>{var pl=N(),ml=ul();en.getLocations=()=>{try{return pl.executeWithValues(ml.selectLocations)}catch(e){throw console.log("getLocations - controller - error: "+JSON.stringify(e.message)),e}};en.getLocationDefaults=e=>{try{let t=pl.executeWithValues(ml.locationDefaults,[e]);return console.log("getLocationDefaults- rows: "+JSON.stringify(t)),t}catch(t){throw console.log("getLocationDefaults - controller - error: "+JSON.stringify(t.message)),t}}});var co=u(lo=>{var{dbCreds:Rt}=D();lo.selectTaxInfo=`SELECT "Name", "Code", "Rate" FROM ${Rt.CompanyDB}.OVTG
WHERE "Inactive" = 'N'`;lo.selectSalesEmployees=`SELECT T0."SlpCode", T0."SlpName", T0."Active", T3."SalesDisc"
    FROM ${Rt.CompanyDB}.OSLP T0
    LEFT JOIN ${Rt.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${Rt.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."Active" ='Y'`;lo.selectPaymentTerms=`SELECT T0."GroupNum" "PaymentTermCode", T0."PymntGroup" FROM ${Rt.CompanyDB}.OCTG T0`;lo.selectBankInfo=`SELECT T0."BankCode", T0."BankName" FROM ${Rt.CompanyDB}.ODSC T0 WHERE T0."CountryCod" ='FJ'`});var tn=u(yl=>{var Kh=N(),Xh=co();yl.getSalesEmployees=(e,t)=>{try{let o;return o=Xh.selectSalesEmployees,e&&(o=o+`AND T0."Fax" IN ('${e}')`),t&&(o=o+`AND UPPER(T0."U_POSUser") IN  (UPPER('${t}'))`),console.log("Sql:",o),Kh.executeWithValues(o)}catch(o){throw console.log("getSalesEmployees - controller - error: "+JSON.stringify(o.message)),o}}});var fl=u((Jb,Sl)=>{var ae=N(),ee=D(),{getRandomNo:gl,formatDate:Zh,getClientHostname:eC}=W(),Tr=$s(),{sendMail:Tl}=De(),{generateHash:tC,comparePassword:hl}=Zo(),be=so(),{createUserSessionLog:oC}=Nt(),{getUserStoreInfo:rC}=Ks(),{canAssignUserToCounter:Hb}=gr(),{getLocationDefaults:sC}=io(),{getSalesEmployees:nC}=tn(),aC=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=ae.executeWithValues(ee.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{console.log("rows[0].Password: "+s[0].Password);let n=s[0].Password&&(await hl(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(r=n||a,console.log("isUserAuthenticated: "+r),r)if(s[0].U_TempPasswordFlag==="Y")t.send({tempPasswordFlag:!0,UserName:s[0].UserName});else{let l=s[0].InternalKey,{storeId:d,storeCounterId:i,counterCode:c,counterName:p,locationCode:y,storeLocation:g,storeWHCode:E}=await rC(l),T="",h=await be.getSalesEmployeeForUser(l);if(Array.isArray(h)&&h.length>0&&(T=h[0].SlpCode),!T){let R=await nC(g,e.body.userName);Array.isArray(R)&&R.length>0&&(T=R[0].SlpCode,console.log("LOG LOGIN - BACKEND - Fallback found SalesEmployeeCode:",T))}let A="";if(g){let R=await sC(g);Array.isArray(R)&&R.length>0&&(A=R[0])}let $="",I=await be.getUserGroupByUser(l);Array.isArray(I)&&I.length>0&&($=I[0].U_GroupName),e.session.userId=l,e.session.userName=process.env.SERVICE_LAYER_USERNAME,e.session.password=process.env.SERVICE_LAYER_PASSWORD,e.session.slCookie="",e.session.slLoginTime="",e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=$;let f=await eC(e),S={userId:l,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:T,userGroup:$,storeId:d||null,storeCounterId:i||null,counterCode:c,counterName:p,locationCode:y,storeLocation:g,locationDefaults:A,clientIp:f,loginTime:Zh(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},x=await oC(S);e.session.userSessionLog=x,e.session.storeWHCode=E,e.session.userSessionLog.locationCode=y;let v={InternalKey:l,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:x,storeWHCode:E,userGroup:$,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",v.userGroup),console.log("userSalesEmployeeCode (nested):",v.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let R=be.getUserPermissions(s[0].InternalKey);R&&(e.session.permissions=R,v.permissions=R),t.send(v)}catch(R){console.log("validateUserLogin - getUserPermissions - error: "+JSON.stringify(R)),t.status(500).send({message:R.message+". Unable to get User Permissions"})}}}r||(console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"}))}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}},iC=async(e,t,o)=>{try{let r=be.getUserInfo(e.body.internalKey);if(r){let s=await be.setTemporaryPassword(e.body.internalKey);if(s){let n=Tr.getMailBody(s);await Tl(r.Email,Tr.subject,n)?console.log("Temporary password has been sent to the mailid"):console.log("Unable to send temporary password to the mailid!"),t.status(200).send({tempPassword:s})}else t.status(500).send({message:"Unable to set temp password!"})}else console.log("Invalid user details!"),t.status(500).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("generateTempPassword - controller - error: "+JSON.stringify(r)),o(r)}},lC=async(e,t,o)=>{try{let r=be.getUserInfoWithUserNameMail(e.body.userName,e.body.mailId);if(console.log("handleForgotPassword %s",JSON.stringify(r)),r)if(r.U_PortalAccountLocked==="Y")console.log("userRec.U_PortalAccountLocked: "+r.U_PortalAccountLocked),t.status(401).send({message:"Your account is locked. Please contact Admin!"});else{let s=await be.setTemporaryPassword(r.InternalKey);if(s){let n=Tr.getMailBody(s);await Tl(e.body.mailId,Tr.subject,n)?t.status(200).send({message:"Temporary password has been sent to your email"}):t.status(200).send({message:"Unable to send temporary password to your mail. Please contact Admin!"})}}else console.log("Invalid user details!"),t.status(401).send({message:"Invalid user details. Please try again!"})}catch(r){console.log("handleForgotPassword - controller - error: "+JSON.stringify(r)),t.status(500).send({message:r.message})}},cC=async(e,t)=>{let o={},r=!1,s=await tC(e.body.newPassword);try{let n=ae.executeWithValues(ee.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(n)),Array.isArray(n)&&n.length&&(r=await hl(e.body.password,n[0].Password),r))try{let a=ae.executeWithValues(ee.updatePortalPassword,[s,"N",n[0].InternalKey]);if(console.log("updatePortalPassword %s",JSON.stringify(a)),a>0)if(e.body.screen&&e.body.screen==="Login"){e.session.userName=n[0].UserName,e.session.userId=n[0].InternalKey,o={InternalKey:n[0].InternalKey,UserName:n[0].UserName,permissions:[]};try{let l=be.getUserPermissions(n[0].InternalKey);console.log("validateUserLogin - getUserPermissionsForAllModules %s",l),l&&(e.session.permissions=l,o.permissions=l),t.send(o)}catch(l){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(l)),t.status(500).send({message:l.message+". Unable to get User Permissions"})}}else t.status(200).send({message:"Password updated successfully"})}catch(a){console.log("updatePortalPassword - error: "+JSON.stringify(a)),t.status(500).send({message:"Password update failed!"})}r||(console.log("Invalid username/password!"),t.status(401).send({message:"Invalid username/password!"}))}catch(n){console.log("validateUserLogin - controller - error: "+JSON.stringify(n)),t.status(500).send({message:n.message})}},dC=(e,t)=>{try{let o=ae.executeWithValues(ee.allUsers,[e.query.isPortalUser]);t.send(o)}catch(o){console.log("getAllUsers - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},uC=(e,t)=>{try{let o=be.getUsersByUserGroup(e.params.groupName);t.send(o)}catch(o){console.log("getUsersByUserGroup - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},pC=(e,t)=>{try{ae.executeQuery(ee.portalUsers,(o,r)=>{if(o)throw o;console.log("getPortalUsersList %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUsersList - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},mC=(e,t)=>{try{ae.executeQuery(ee.portalUserGroups,(o,r)=>{if(o)throw o;console.log("getAllPortalGroups %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getAllPortalGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o})}},yC=(e,t)=>{try{Cl(o=>{console.log("getPortalUserGroups - userGroups: "+JSON.stringify(o)),t.send(o)})}catch(o){console.log("getPortalUserGroups - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},Cl=e=>{try{ae.executeQuery(ee.userGroupsWithPermissions,(t,o)=>{if(t)throw t;e(o)})}catch(t){throw console.log("getAllUserGroupsWithPermissions - controller - error: "+JSON.stringify(t)),t}},gC=(e,t,o)=>{try{let r=be.getUserPermissions(e.params.userId);t.send(r)}catch(r){console.log("getUserPermissions - controller - error: "+JSON.stringify(r)),o(r)}},TC=(e,t)=>{console.log("req.params: %s",JSON.stringify(e.params));try{ae.executeQuery(`${ee.userPermissionsForGivenGroup}'${e.params.id}'`,(o,r)=>{if(o)throw o;console.log("getPortalUserPermissions %s",JSON.stringify(r)),t.send(r)})}catch(o){console.log("getPortalUserPermissions - controller - error: "+JSON.stringify(o)),next(o)}},hC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s=0,n=[],a=[],l=ee.updateUserGroup,d=e.body.U_GroupId;d||(d=parseInt(gl()),l=ee.insertUserGroup);let i=[d,e.body.U_GroupName,e.body.U_GroupName,d];console.log("userGroupValues: "+i),e.body.permissionsList.forEach(c=>{r=c.U_PermissionId,r?a.push([r,r,d,c.U_ModuleId,c.U_AllowRead,c.U_AllowWrite,c.U_AllowCancel,c.U_AllowCreate,r]):(r=parseInt(gl()),n.push([r,r,d,c.U_ModuleId,c.U_AllowRead,c.U_AllowWrite,c.U_AllowCancel,c.U_AllowCreate,r]))});try{if(ae.executeWithValues(l,i)){let p=ae.executeBatchInsertUpdate(ee.insertPermissions,n);s+=p,console.log("insertPermissions insertRows: "+p);let y=ae.executeBatchInsertUpdate(ee.updatePermissions,a);s+=y,console.log("updatePermissions updateRows: "+y),console.log("createUpdateUserGroupWithPermissions result: "+s),s>0?Cl(g=>{t.send(g)}):t.status(201).send({})}else console.log("createUpdateUserGroupWithPermissions -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"})}catch(c){console.log("createUpdateUserGroupWithPermissions - controller - error: "+JSON.stringify(c)),o(c)}},CC=(e,t,o)=>{console.log("req.param.id: %s",e.params.id);try{ae.executeQuery(`${ee.usersInGivenGroup}'${e.params.id}'`,(r,s)=>{if(r)throw r;if(Array.isArray(s)&&s.length){let n=s.map(a=>a.UserName);t.status(400).send({users:n,error:"Please remove the users from this Group to delete it"})}else ae.executeQuery(`${ee.deletePermissions}'${e.params.id}'`,(n,a)=>{if(n)throw n;console.log("deletePermission rows: "+a),ae.executeQuery(`${ee.deleteUserGroup}'${e.params.id}'`,(l,d)=>{l?t.status(500).send({err:l}):d>0?t.status(200).send("Success!"):(console.log("deletePortalUserGroup %s",d),t.status(201).send({rows:d}))})})})}catch(r){console.log("deletePortalUserGroup - controller - error: "+JSON.stringify(r)),t.status(500).send({error:r.message})}};Sl.exports={validateUserLogin:aC,generateTempPassword:iC,updatePortalPassword:cC,handleForgotPassword:lC,getAllUsers:dC,getUsersByUserGroup:uC,getAllPortalGroups:mC,getPortalUserGroups:yC,getPortalUserPermissions:TC,getUserPermissions:gC,getPortalUsersList:pC,createUpdateUserGroupWithPermissions:hC,deletePortalUserGroup:CC}});var Al=u(El=>{var{setBatchSerialReservedCust:SC}=Xo();El.patch=(e,t)=>{console.log("*** setBatchSerialReservedCust - req.params: "+JSON.stringify(e.params));try{let o=SC(e.params.batchNumber,e.params.serialNumber,e.params.customerCode);console.log("setBatchSerialReservedCust %s",JSON.stringify(o)),t.send(o)}catch(o){console.log("setBatchSerialReservedCust - controller - error: "+JSON.stringify(o));let r="Something went wrong. Please try again or contact your administrator";o.message&&(r=o.message),t.status(500).send({message:r})}}});var Dl=u((jb,Il)=>{var K=N(),Q=D(),{getRandomNo:Gb}=W(),te={TEMPLATE:"TEMPLATE",ORIGINATOR:"ORIGINATOR",APPROVER:"APPROVER"},ot=[],He=[],on=(e,t)=>{console.log("BEFORE: approverPrimaryKeyList: "+JSON.stringify(He)),console.log("docEntry: "+t);let o,r=[],s=1,n="LineId";e===te.TEMPLATE?(o=Q.allHeaderIds,n="DocEntry"):e===te.APPROVER?o=Q.allApproverIds:e===te.ORIGINATOR&&(o=Q.allOriginatorIds);try{if(e===te.ORIGINATOR)if(ot.length>0)r=ot;else if(r=K.executeWithValues(o,t),r.length>0)ot=r;else return ot.push({LineId:s}),s;else if(e===te.APPROVER)if(He.length>0)r=He;else if(r=K.executeWithValues(o,t),r.length>0)He=r;else return He.push({LineId:s}),s;else r=K.executeWithValues(o,t);console.log("primaryKeyList %s",JSON.stringify(r));let a=r.length;if(a){if(r[a-1][n]===a)s=a+1,e===te.ORIGINATOR?ot.push({LineId:s}):e===te.APPROVER&&He.push({LineId:s});else if(a>0){for(let l=0;l<r[a-1][n];l++)if(r[l][n]!=l+1){s=l+1,e===te.ORIGINATOR?ot.splice(l,0,{LineId:s}):e===te.APPROVER&&He.splice(l,0,{LineId:s});break}}}return console.log("AFTER: approverPrimaryKeyList: "+JSON.stringify(He)),console.log("primaryKey: "+s),s}catch(a){throw a}},rn=()=>{let e=[],t=[],o=[];try{if(e=K.executeWithValues(Q.selectApprovalHeader),console.log("approvalHeaderList %s",JSON.stringify(e)),e.length){let r=[],s=[];t=K.executeWithValues(Q.selectApprovalOriginator),console.log("approvalOriginatorList.length: "+t.length),o=K.executeWithValues(Q.selectApprovalApprover),console.log("approvalApproverList.length: "+o.length),e.forEach(n=>{r=[],s=[],t.forEach(a=>{n.DocEntry===a.DocEntry&&r.push(a)}),n.Originator=r,o.forEach(a=>{n.DocEntry===a.DocEntry&&s.push(a)}),n.Approver=s})}}catch(r){throw r}finally{return e}},fC=(e,t)=>{try{t.send(rn())}catch(o){console.log("getApprovalTemplates - controller - error: "+JSON.stringify(o)),t.status(500).send({error:o.message})}},EC=(e,t,o)=>{console.log("req.body: %s",JSON.stringify(e.body));let r,s,n=[],a=[],l=[],d=[],i=Q.updateApprovalHeader,c=e.body.activeApprovalTemplateId;c||(c=on(te.TEMPLATE),i=Q.insertApprovalHeader);let p=[e.body.templateName,e.body.description,e.body.moduleId,e.body.terms,e.body.noOfApprovals,e.body.multiLevelApproval,e.body.isActive,c];console.log("approvalHeaderValues: "+p);let y;e.body.activeApprovalApproverList.forEach(g=>{r=g.LineId,y=isNaN(parseInt(g.U_ApprovalLevel,10))?null:parseInt(g.U_ApprovalLevel,10),r?(a.push([g.U_UserId,y,c,r]),console.log("approverValuesForUpdate: "+a)):(r=on(te.APPROVER,c),n.push([g.U_UserId,y,c,r]),console.log("approverValuesForInsert: "+n))}),e.body.activeApprovalOriginatorList.forEach(g=>{s=g.LineId,s?(d.push([g.U_UserId,c,s]),console.log("originatorValuesForUpdate: "+d)):(s=on(te.ORIGINATOR,c),l.push([g.U_UserId,c,s]),console.log("originatorValuesForInsert: "+l))});try{let g=K.executeWithValues(i,p),E=0,T=0,h=0,A=0;g?(n.length>0&&(E=K.executeBatchInsertUpdate(Q.insertApprovalApprover,n)),console.log("insertApproverRows: "+E),a.length>0&&(T=K.executeBatchInsertUpdate(Q.updateApprovalApprover,a)),console.log("updateApproverRows: "+T),l.length>0&&(h=K.executeBatchInsertUpdate(Q.insertApprovalOriginator,l)),console.log("insertOriginatorRows: "+h),d.length>0&&(A=K.executeBatchInsertUpdate(Q.updateApprovalOriginator,d)),console.log("updateOriginatorRows: "+A),E+T+h+A>0?t.status(200).send(rn()):t.status(201).send({})):(console.log("createUpdateApprovalTemplate -inner catch - error: "+JSON.stringify(err)),t.status(500).send({message:"Unable to create new User Group"}))}catch(g){console.log("createUpdateApprovalTemplate - controller - error: "+g.message),t.status(500).send({message:g.message})}finally{ot=[]}},AC=(e,t,o)=>{console.log("req.param.templateId: %s",e.params.templateId),console.log("req.param.lineId: %s",e.params.lineId),console.log("req.param.recordType: %s",e.params.recordType);let r=0,s=0,n=0;try{e.params.recordType==te.TEMPLATE?(r=K.executeWithValues(Q.deleteApprovalTemplate3,e.params.templateId),s=K.executeWithValues(Q.deleteApprovalTemplate2,e.params.templateId),n=K.executeWithValues(Q.deleteApprovalTemplate1,e.params.templateId)):e.params.recordType==te.APPROVER?s=K.executeWithValues(Q.deleteApprovalApprover,[e.params.templateId,e.params.lineId]):e.params.recordType==te.ORIGINATOR&&(r=K.executeWithValues(Q.deleteApprovalOriginator,[e.params.templateId,e.params.lineId])),console.log("templateRows: "+n+" originatorRows: "+r+"approverRows: "+s),n>0||r>0||s>0?t.status(200).send(rn()):t.status(201).send({})}catch(a){console.log("deleteApprovalTemplate - controller - error: "+JSON.stringify(a)),t.status(500).send({message:a.message})}};Il.exports={getApprovalTemplates:fC,createUpdateApprovalTemplate:EC,deleteApprovalTemplate:AC}});var L=u((Vb,Nl)=>{var{httpStatusCodes:sn}=C(),{formatDate:zb}=W(),IC=(e,t,o)=>{let{permissions:r,userName:s,userId:n}=e.session;!e.url.endsWith("/login")&&!e.url.endsWith("/update-password")&&!e.url.endsWith("/forgot-password")&&(!s||!n||!Array.isArray(r)||r.length===0)?(console.log("sessionValidator - session is INVALID"),t.status(sn.UNAUTHORIZED).json({message:"Invalid session. Login to continue!"})):(console.log("sessionValidator - session is VALID!"),o())},DC=(e,t)=>[(o,r,s)=>{Array.isArray(e)||(e=[e]);try{let n=!1,{permissions:a}=o.session;Array.isArray(a)&&a.length&&a.find(l=>e.includes(l.U_ModuleName)&&l[t]==="Y")&&(n=!0),n?s():r.status(sn.FORBIDDEN).send({message:"User unauthorized to perform the operation"})}catch(n){console.log("checkUserPermission - controller - error: "+JSON.stringify(n)),r.status(sn.INTERNAL_SERVER_ERROR).send({message:n.message})}}];Nl.exports={sessionValidator:IC,checkUserPermission:DC}});var Rl=u((Qb,bl)=>{var NC=require("../node_modules/express/index.js"),ue=Fi(),de=fl(),bC=Al(),hr=Dl(),RC=_s(),OC=Ms(),{portalModules:Ce,permissions:Se}=C(),{checkUserPermission:fe}=L(),O=new NC.Router;O.route("/server-date").get(ue.getServerDateTime);O.route("/get-docentry").get(ue.getDocEntry);O.route("/login").get((e,t)=>t.status(405).send({message:"Login endpoint only accepts POST requests"})).post(de.validateUserLogin);O.route("/forgot-password").post(de.handleForgotPassword);O.route("/update-password").patch(de.updatePortalPassword);O.route("/temp-password").post(de.generateTempPassword);O.route("/branch").get(ue.getUserBranches);O.route("/freights").get(ue.getFreightList);O.route("/item").get(ue.getItemsList);O.route("/item-qty-in-warehouse").get(ue.getItemCountInWarehouse);O.route("/picklist-warehouses").get(ue.getPicklistWarehouses);O.route("/bin-location/:type?").get(ue.getBinsAndItemQtyForWarehouse);O.route("/modules").get(ue.getPortalModules);O.route("/approval-template/:recordType?/:templateId?/:lineId?").get(fe(Ce.APPROVAL,Se.READ),hr.getApprovalTemplates).put(fe(Ce.APPROVAL,Se.WRITE),hr.createUpdateApprovalTemplate).post(fe(Ce.APPROVAL,Se.CREATE),hr.createUpdateApprovalTemplate).delete(hr.deleteApprovalTemplate);O.route("/users").get(de.getAllUsers);O.route("/portal-users").get(de.getPortalUsersList);O.route("/user-groups/:id?").get(fe(Ce.USER_GROUP,Se.READ),de.getAllPortalGroups).put(fe(Ce.USER_GROUP,Se.WRITE),de.createUpdateUserGroupWithPermissions).post(fe(Ce.USER_GROUP,Se.CREATE),de.createUpdateUserGroupWithPermissions).delete(fe(Ce.USER_GROUP,Se.CANCEL),de.deletePortalUserGroup);O.route("/user-groups/:id?/permissions").get(fe(Ce.USER_GROUP,Se.READ),de.getPortalUserPermissions);O.get("/user-groups/:groupName/user",de.getUsersByUserGroup);O.get("/user/:userId/permissions",de.getUserPermissions);O.route("/stock-transfer-request/:type?/:recordType?/:docEntry?").get(fe(Ce.STOCK_TRANSFER_REQUEST,Se.READ)||fe(Ce.STOCK_TRANSFER,Se.CREATE),RC.getTransferRequestRecords);O.route("/stock-transfer/:type?/:recordType?/:docEntry?").get(fe(Ce.STOCK_TRANSFER,Se.READ),OC.getTransferRecords);O.route("/count").get(ue.getDraftsCount);O.route("/batch-serial-info").get(ue.getBatchSerialNoInfo).patch(bC.patch);O.route("/tim-yard-items").get(ue.getTimYardItemInfo);O.route("/bincode-info").get(ue.getBinListbyItem);bl.exports=O});var j=u((Yb,Ul)=>{var UC=require("../node_modules/axios/index.js"),xC=require("../node_modules/axios-retry/dist/cjs/index.js").default,LC=require("https"),Ol=UC.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new LC.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}});xC(Ol,{retries:3});Ul.exports={serviceLayerAPI:Ol}});var X=u((Zb,Bl)=>{var{serviceLayerAPI:Kb}=j(),{dbCreds:uo,serviceLayerSessionMaxAge:xl}=D(),{getTimeDifference:Xb}=W(),wC=require("../node_modules/axios/index.js"),BC=require("https"),Ll=wC.create({baseURL:process.env.SERVICE_LAYER_API_BASE_URL,httpsAgent:new BC.Agent({rejectUnauthorized:!1}),headers:{"Content-Type":"text/json;charset=utf-8"}}),Ot=null,rt=null,vC=async e=>{try{if(Ot&&rt){let s=Math.abs(new Date-new Date(rt))/6e4;if(console.log(`*** getSLConnection - in-memory cookie age: ${s} min`),s<xl-5)return Ot}if(e.session.slCookie&&e.session.slLoginTime){let s=Math.abs(new Date-new Date(e.session.slLoginTime))/6e4;if(console.log(`*** getSLConnection - session cookie exists, age: ${s} min`),s<xl-5)return console.log("*** getSLConnection - returning SESSION CACHED SL cookie"),Ot=e.session.slCookie,rt=e.session.slLoginTime,e.session.slCookie}console.log("*** getSLConnection - NO cached cookie or expired, RE-AUTHENTICATING...");let t=uo.UserName,o=uo.Password;e.session&&e.session.userName&&e.session.password?(console.log(`*** getSLConnection - Using session user credentials for: ${e.session.userName}`),t=e.session.userName,o=process.env.SERVICE_LAYER_PASSWORD||uo.Password):console.log("*** getSLConnection - Using fallback dbCreds");let r=await wl(t,o);return Ot=r,rt=new Date().toISOString(),e.session.slCookie=r,e.session.slLoginTime=rt,r}catch(t){throw t}},wl=async(e,t)=>{let o=null;try{let r=await Ll.post("Login?prefer=return-no-content",{CompanyDB:uo.CompanyDB,UserName:e,Password:t});console.log(`***Login - openSLConnection - response: ${r.status}`);let s=r.headers["set-cookie"];return Array.isArray(s)?o=s.map(n=>n.split(";")[0]).join("; "):o=s,console.log("cookie: "+o),console.log("response.data.SessionId: "+r.data.SessionId),o}catch(r){throw console.log("openSLConnection - error:",r?.response?.data||r.message),r}},_C=async()=>{let e=null;try{let t=await Ll.post("Login?prefer=return-no-content",uo);console.log(`***Login - openDBConnection - response: ${t.status}`);let o=t.headers["set-cookie"];return Array.isArray(o)?e=o.map(r=>r.split(";")[0]).join("; "):e=o,console.log("cookie: "+e),console.log("response.data.SessionId: "+t.data.SessionId),e}catch(t){throw console.log("openDBConnection - error:",t?.response?.data||t.message),t}},PC=(e,t)=>{Ot=e,rt=t||new Date().toISOString(),console.log("*** setSLCache - SL cookie cached in memory")},MC=e=>{Ot=null,rt=null,e&&e.session&&(e.session.slCookie=null,e.session.slLoginTime=null),console.log("*** invalidateSLCache - SL cookie cache cleared")};Bl.exports={openDBConnection:_C,openSLConnection:wl,getSLConnection:vC,setSLCache:PC,invalidateSLCache:MC}});var nn=u((eR,vl)=>{var FC="POS - Welcome mail",$C=(e,t,o)=>`
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
  `;vl.exports={subject:FC,getMailBody:$C}});var Fl=u((tR,Ml)=>{var{serviceLayerAPI:_l}=j(),{getSLConnection:WC}=X(),{generatePassword:kC}=ks(),{sendMail:HC}=De(),Pl=nn(),JC=async(e,t,o)=>{console.log(`updateUserDetails - req.body: ${JSON.stringify(e.body)}`);let r,s={eMail:e.body.eMail,MobilePhoneNumber:e.body.MobilePhoneNumber,U_PortalUser:e.body.U_PortalUser,U_PortalGroupId:e.body.U_PortalGroupId,U_PortalAccountLocked:e.body.U_PortalAccountLocked,U_PortalBadLoginCount:e.body.U_PortalBadLoginCount};e.body.isNewUser&&(r=kC(),s.U_TempPasswordFlag="Y");let n;try{n=await WC(e)}catch(a){console.log("updateUserDetails: "+JSON.stringify(a)),o(a)}if(n){_l.defaults.headers.Cookie=n;let a="";try{let l=await _l.patch(`Users(${e.body.InternalKey})`,s);if(l.status=="200"||l.status=="201"||l.status=="204"){if(e.body.isNewUser){let d=Pl.getMailBody(e.body.adminUser,e.body.userName,r);await HC(e.body.eMail,Pl.subject,d)?a="Portal access invite has been sent to user's email":a="Portal access has been given, but unable to send temporary password to user's mail. Please share it manually."}else a="User details updated successfully";t.status(200).send({message:a})}else t.status(500).send({message:"Update failed!"})}catch(l){console.log("Update User Details - Error: "+l),o(l)}}};Ml.exports={updateUserDetails:JC}});var kl=u((oR,Wl)=>{var{dbCreds:ie}=D(),{draftStatus:$l}=C(),qC=`SELECT DISTINCT T0."U_ApprovalStatusId", T0."U_DocEntry", T0."U_ApproverId", TAP."U_NAME" as "Approver",
   T0."U_DraftStatus", T0."U_ApprovalLevel", T0."U_RejectedReason", T0."U_DateTime"
 FROM ${ie.CompanyDB}."@APPROVALSTATUS" T0, ${ie.CompanyDB}.OUSR TAP
   WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
 AND T0."U_DocEntry" IN `,GC=`SELECT COUNT(T0."U_ApprovalStatusId") as "Count"
   FROM ${ie.CompanyDB}."@APPROVALSTATUS" T0, ${ie.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,jC=`SELECT T0."U_ApproverId"
   FROM ${ie.CompanyDB}."@APPROVALSTATUS" T0, ${ie.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_DraftStatus" = ?`,zC=`SELECT TO_CHAR(T0."U_DateTime", 'YYYY-MM-DD') "DocDate"
    FROM ${ie.CompanyDB}."@APPROVALSTATUS" T0
  WHERE T0."U_DocEntry" = ?
    AND T0."U_ApprovalLevel" = ?`,VC=`UPDATE ${ie.CompanyDB}."@APPROVALSTATUS" T0
   SET T0."U_DraftStatus" = ?
 WHERE T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,QC=`SELECT TAP."U_NAME" as "Approver", TAP."E_Mail" "Email"
   FROM ${ie.CompanyDB}."@APPROVALSTATUS" T0, ${ie.CompanyDB}.OUSR TAP
 WHERE T0."U_ApproverId" = TAP."INTERNAL_K"
   AND T0."U_DocEntry" = ?
   AND T0."U_ApprovalLevel" = ?`,YC=`INSERT INTO ${ie.CompanyDB}."@APPROVALSTATUS" ("DocEntry", "U_ApprovalStatusId", "U_DocEntry", 
  "U_DraftStatus", "U_ApproverId", "U_ApprovalLevel", "U_ModuleName") VALUES (?, ?, ?, ?, ?, ?, ?)`,KC=`UPDATE ${ie.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?, "U_RejectedReason" = ?,
   "U_DateTime" = TO_TIMESTAMP(?, 'YYYY-MM-DD HH24:MI:SS.FF2')
 WHERE "U_ApprovalStatusId" = ?`,XC=`UPDATE ${ie.CompanyDB}."@APPROVALSTATUS" SET "U_DraftStatus" = ?
     WHERE "U_DraftStatus" IN ('${$l.PENDING}', '${$l.NOT_ASSIGNED}')
   AND "U_DocEntry" = ?`,ZC=`UPDATE ${ie.CompanyDB}."@APPROVALSTATUS" SET "U_State" = ?
      WHERE "U_DocEntry" = ?`;Wl.exports={selectDraftApproversList:qC,insertDraftApproversList:YC,updateDraftApproversList:KC,updateApprovalStatus:XC,updateApprovalStatusRecState:ZC,selectDraftApprovalStatusCount:GC,selectDraftApprovalRecords:jC,updateDraftNextApprovalLevel:VC,selectDraftNextApproverDetails:QC,selectDraftApprovalDate:zC}});var Ut=u((sR,Hl)=>{var{portalModules:rR}=C(),eS="Approval request",tS=(e,t,o)=>`
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
  `;Hl.exports={subject:eS,getMailBody:tS}});var Lt=u((aR,ql)=>{var xt=N(),Cr=D(),an=kl(),{draftStatus:st,portalModules:nR}=C(),{getRandomNo:oS}=W(),{sendMail:rS}=De(),Jl=Ut(),sS=(e,t=0,o,r)=>{let s,n=100,a,l=[],d=new ProductionDraftQueries(r);t=parseInt(t),t===1||o==="N"?(a=Cr.selectDraftCreationDate,l=[e]):(a=an.selectDraftApprovalDate,l=[e,t-1]),console.log("sql: "+a);try{let i=xt.executeWithValues(a,l);console.log("getApprovalInternalInDays %s",JSON.stringify(i)),Array.isArray(i)&&i.length&&(s=i[0].DocDate)}catch(i){console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(i))}if(s){let i=Math.abs(new Date-new Date(s));n=Math.ceil(i/(1e3*60*60*24))-1}return n},nS=(e,t,o)=>{let r;e===st.APPROVED?r=st.GENERATED:e===st.REJECTED&&(r=st.NOT_REQUIRED);try{let s=an.updateApprovalStatus,n=[r,t],a=xt.executeWithValues(s,n);return console.log("setApprovalStatus %s",JSON.stringify(a)),!0}catch(s){return console.log("getApprovalInternalInDays - controller - error: "+JSON.stringify(s)),!1}},aS=(e,t)=>{try{let o=xt.executeWithValues(Cr.selectApproverForOriginator,[e,t]);return console.log("result: "+JSON.stringify(o)),o}catch(o){throw o}},iS=e=>{try{let t=xt.executeWithValues(Cr.selectDraftApproversList+`(${e}) ORDER BY T0."U_ApprovalLevel" ASC`,[]);return console.log("result: "+JSON.stringify(t)),t}catch(t){throw t}},lS=(e,t,o)=>{try{let r=an.updateApprovalStatusRecState,s=[t,e],n=xt.executeWithValues(r,s);return console.log("draftApproverRec: "+JSON.stringify(n)),!0}catch(r){throw r}},cS=async(e,t,o)=>{let r=[],s=[],n,a;try{t.map(i=>{n=0,a=oS(),i.U_MultiLevelApproval==="Y"?(n=i.U_ApprovalLevel,i.U_ApprovalLevel==1?(s.push({UserName:i.UserName,Email:i.Email}),r.push([a,a,e,st.PENDING,i.ApproverId,n])):r.push([a,a,e,st.NOT_ASSIGNED,i.ApproverId,n])):(s.push({UserName:i.UserName,Email:i.Email}),r.push([a,a,e,st.PENDING,i.ApproverId,n]))});let l=Cr.insertDraftApproversList;console.log("multiApproverList: "+r),console.log("mailingList: "+s);let d=xt.executeBatchInsertUpdate(l,r);return console.log("draftApproverRec: "+JSON.stringify(d)),{draftApproverRec:d,mailingList:s}}catch(l){throw l}},dS=async(e,t,o,r)=>{try{let s=Jl.getMailBody(e,t,o);r.forEach(async n=>{await rS(n.Email,Jl.subject,s)})}catch(s){throw s}};ql.exports={getApprovalInternalInDays:sS,setApprovalStatus:nS,getApprovers:aS,getApproversForDraft:iS,updateDraftApprovers:lS,createApproversForDraft:cS,notifyApprovers:dS}});var Sr=u((lR,Gl)=>{var{portalModules:iR}=C(),uS="Request status update",pS=(e,t,o,r,s)=>`
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
  `;Gl.exports={subject:uS,getMailBody:pS}});var zl=u(jl=>{var{dbCreds:mS}=D();jl.numberingSeries=`SELECT T0."Series", T0."SeriesName", T0."InitialNum"
    FROM ${mS.CompanyDB}.NNM1 T0
  WHERE T0."ObjectCode" = ?
        AND LOWER(T0."Remark") = ?`});var fr=u(Vl=>{var yS=N(),gS=zl();Vl.getNumberingSeries=(e,t)=>{try{let o=yS.executeWithValues(gS.numberingSeries,[e,t.toLowerCase()]);return Array.isArray(o)&&o.length>0?o[0]:null}catch(o){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(o.message)),o}}});var Zl=u((mR,Xl)=>{var TS=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:Be}=j(),{getSLConnection:Yl}=X(),{sendMail:dn}=De(),ln=Lt(),Er=Ut(),Ql=Sr(),Ee=N(),Ae=D(),{portalModules:po,draftObjectCodes:Kl,draftStatus:k,systemCurrency:uR,objectCodes:hS,enableStoreBasedNumbering:CS}=C(),{getRandomNo:SS,formatDate:fS}=W(),pR=N(),{getNumberingSeries:ES}=fr(),AS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await Yl(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,Be.defaults.headers.Cookie=r;try{let n=Ee.executeWithValues(Ae.selectApproverForOriginator,[s,po.STOCK_TRANSFER_REQUEST]);console.log("approverRec: "+JSON.stringify(n));let a=Ee.executeWithValues(Ae.selectUserInfo,s),l=TS(e.body);if(l.branchId&&(l.BPLID=l.branchId,delete l.branchId),l.U_OriginatorId=s,delete l.userId,Array.isArray(n)&&n.length){l.DocObjectCode=Kl.STOCK_TRANSFER_REQUEST,l.U_DraftStatus=k.PENDING,l.U_MultiLevelApproval=n[0].U_MultiLevelApproval,l.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createSTR Draft - request: "+JSON.stringify(l));let d=await Be.post("StockTransferDrafts",l);if(console.log("*** DRAFTS response: "+d),d.data){let i=[];n.forEach(T=>{i.push(T.UserName)}),t.status(200).send({draftNum:d.data.DocEntry,approverName:i.join(", "),response:d.data});let c=[],p=[],y,g;n.map(T=>{y=0,g=SS(),T.U_MultiLevelApproval==="Y"?(y=T.U_ApprovalLevel,T.U_ApprovalLevel==1?(p.push({UserName:T.UserName,Email:T.Email}),c.push([g,g,d.data.DocEntry,k.PENDING,T.ApproverId,y])):c.push([g,g,d.data.DocEntry,k.NOT_ASSIGNED,T.ApproverId,y])):(p.push({UserName:T.UserName,Email:T.Email}),c.push([g,g,d.data.DocEntry,k.PENDING,T.ApproverId,y]))}),console.log("multiApproverList: "+c),console.log("mailingList: "+p);let E=Ee.executeBatchInsertUpdate(Ae.insertDraftApproversList,c);if(console.log("draftApproverRec: "+JSON.stringify(E)),E){let T=Er.getMailBody(po.STOCK_TRANSFER_REQUEST,a[0].UserName,d.data.DocEntry);p.forEach(async h=>{await dn(h.Email,Er.subject,T)})}}}else{let d=[...e.body.StockTransferLines];d.forEach(p=>{p.FromWarehouseCode=p.U_FromWarehouse,delete p.availableQuantity,delete p.U_FromWarehouse}),console.log("stockTransferLines: "+JSON.stringify(d));let i={FromWarehouse:e.body.FromWarehouse,U_FromBinLoc:e.body.U_FromBinLoc,ToWarehouse:e.body.ToWarehouse,U_ToBinLocation:e.body.U_ToBinLocation,Comments:e.body.Comments,SalesPersonCode:e.body.SalesPersonCode,U_DraftStatus:k.AUTO_APPROVED,StockTransferLines:d,U_OriginatorId:s};if(CS){let p=await ES(hS[po.STOCK_TRANSFER_REQUEST],e.session.userSessionLog.storeLocation);p&&(console.log("seriesResponse series:",p.Series),i.Series=p.Series)}console.log("InventoryTransferRequests - request: "+JSON.stringify(i));let c=await Be.post("InventoryTransferRequests",i);c.data?t.status(200).send({stockTransferRequestNum:c.data.DocNum}):(console.log("Create Stock Transfer Request failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}}catch(n){console.log("Create Stock Transfer Request error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},cn=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await Be.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==k.APPROVED)try{let a=await Be.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let l=[],d={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.U_FromWarehouse,U_ToBinLocation:c.U_ToBinLocation},l.push(d)}),l.sort((c,p)=>c.BaseLine-p.BaseLine);let i={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:l};a.BPLID&&(i.BPLID=a.BPLID),console.log("InventoryTransferRequests - request: "+JSON.stringify(i)),s=await Be.post("InventoryTransferRequests",i)}catch(a){let l=await Be.patch(`Drafts(${e.DocEntry})`,{U_DraftStatus:k.PENDING});throw console.log("resetDraftStatus - response.data: "+l),a}if(n||s){let a=Ee.executeWithValues(Ae.updateDraftApproversList,[o,e.U_RejectedReason,fS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===k.REJECTED&&ln.setApprovalStatus(o,e.DocEntry),s){let p=await Be.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&ln.setApprovalStatus(k.APPROVED,e.DocEntry)}let l=Ee.executeWithValues(Ae.selectUserInfo,e.U_OriginatorId),d=Ee.executeWithValues(Ae.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(d));let i;if([k.APPROVED,k.PENDING].includes(e.U_DraftStatus)?i=k.APPROVED:i=e.U_DraftStatus,Array.isArray(d)&&d.length&&Array.isArray(l)&&l.length){let p=Ql.getMailBody(po.STOCK_TRANSFER_REQUEST,l[0].UserName,d[0].UserName,e.DocEntry,i);await dn(l[0].Email,Ql.subject,p)}let c;o===k.APPROVED&&(c=ln.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:i,noOfDays:c})}}catch(s){next(s)}},IS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await Yl(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){Be.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==k.APPROVED){let a=Ee.executeWithValues(Ae.selectNoOfApprovalsForDraft,[Kl.STOCK_TRANSFER_REQUEST,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let l=0,d;if(Array.isArray(a)&&a.length&&(l=parseInt(a[0].U_NoOfApprovals,10),d=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+l),d==="Y"){if(parseInt(s.U_ApprovalLevel)==l?s.U_DraftStatus=k.APPROVED:parseInt(s.U_ApprovalLevel)<l&&(s.U_DraftStatus=k.PENDING),await cn(s,t,n,d),s.U_DraftStatus==k.PENDING){let i=parseInt(s.U_ApprovalLevel)+1,c=Ee.executeWithValues(Ae.updateDraftNextApprovalLevel,[k.PENDING,s.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let p=Ee.executeWithValues(Ae.selectUserInfo,s.U_OriginatorId),y=Ee.executeWithValues(Ae.selectDraftNextApproverDetails,[s.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(y)),Array.isArray(y)&&y.length&&p.length){let g=Er.getMailBody(po.STOCK_TRANSFER_REQUEST,p[0].UserName,s.DocEntry);await dn(y[0].Email,Er.subject,g)}}}else{let i=Ee.executeWithValues(Ae.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(i));let c=0;Array.isArray(i)&&i.length&&(c=i[0].Count),console.log("noOfApprovalsReceived: "+c),parseInt(c,10)+1>=parseInt(l,10)?(s.U_DraftStatus=k.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=k.PENDING,console.log("****PENDING")),await cn(s,t,n,d)}}else s.U_DraftStatus==k.REJECTED&&(console.log("****REJECTED"),await cn(s,t,n))}catch(n){console.log("Stock Transfer Request Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};Xl.exports={createStockTransferRequest:AS,updateDraft:IS}});var ac=u((gR,nc)=>{var rc=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:ve}=j(),{getSLConnection:sc}=X(),{sendMail:mn}=De(),un=Lt(),Ar=Ut(),ec=Sr(),Te=N(),he=D(),{portalModules:Ir,draftObjectCodes:yn,draftStatus:H,systemCurrency:yR}=C(),{getRandomNo:DS,formatDate:NS}=W(),tc=async(e,t,o)=>{try{e.requestType==="BIN_TO_BIN"?(e.U_DraftStatus="BIN_TO_BIN",delete e.requestType):e.U_DraftStatus=H.AUTO_APPROVED,console.log("StockTransfers - request: "+JSON.stringify(e));let r=await ve.post("StockTransfers",e);r.data?t.status(200).send({stockTransferRequestNum:r.data.DocNum}):(console.log("Create Stock Transfer failed!.. Error-400"),t.status(500).json({error:{message:"Stock Transfer Request Creation failed"}}))}catch(r){throw r}},bS=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`);let r=await sc(e);if(r!==null){let s=e.session.userId;e.body.userId=e.session.userId,ve.defaults.headers.Cookie=r;try{let n=Te.executeWithValues(he.selectApproverForOriginator,[s,Ir.STOCK_TRANSFER]);console.log("approverRec: "+JSON.stringify(n));let a=Te.executeWithValues(he.selectUserInfo,s),l=[],d={},i=rc(e.body);if(i.branchId&&(i.BPLID=i.branchId,delete i.branchId),delete i.userId,i.U_OriginatorId=s,i.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,BaseType:c.BaseType,BaseEntry:c.BaseEntry,BaseLine:c.BaseLine,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.U_FromWarehouse,U_ToBinLocation:c.U_ToBinLocation,BatchNumbers:c.BatchNumbers,SerialNumbers:c.SerialNumbers,StockTransferLinesBinAllocations:RS(c.StockTransferLinesBinAllocations)},l.push(d),d={}}),delete i.StockTransferLines,i.StockTransferLines=l,i.requestType==="BIN_TO_BIN")await tc(i,t);else if(Array.isArray(n)&&n.length){i.DocObjectCode=yn.STOCK_TRANSFER,i.U_DraftStatus=H.PENDING,i.U_MultiLevelApproval=n[0].U_MultiLevelApproval,i.U_NoOfApprovals=parseInt(n[0].U_NoOfApprovals,10),console.log("*** createST Draft - request: "+JSON.stringify(i));let c=await ve.post("StockTransferDrafts",i);if(console.log("*** DRAFTS response: "+c),c.data){let p=[];n.forEach(A=>{p.push(A.UserName)}),t.status(200).send({draftNum:c.data.DocEntry,approverName:p.join(", "),response:c.data});let y=[],g=[],E,T;n.map(A=>{E=0,T=DS(),A.U_MultiLevelApproval==="Y"?(E=A.U_ApprovalLevel,A.U_ApprovalLevel==1?(g.push({UserName:A.UserName,Email:A.Email}),y.push([T,T,c.data.DocEntry,H.PENDING,A.ApproverId,E])):y.push([T,T,c.data.DocEntry,H.NOT_ASSIGNED,A.ApproverId,E])):(g.push({UserName:A.UserName,Email:A.Email}),y.push([T,T,c.data.DocEntry,H.PENDING,A.ApproverId,E]))}),console.log("multiApproverList: "+y),console.log("mailingList: "+g);let h=Te.executeBatchInsertUpdate(he.insertDraftApproversList,y);if(console.log("draftApproverRec: "+JSON.stringify(h)),h){let A=Ar.getMailBody(Ir.STOCK_TRANSFER,a[0].UserName,c.data.DocEntry);g.forEach(async $=>{await mn($.Email,Ar.subject,A)})}}}else await tc(i,t)}catch(n){console.log("Create Stock Transfer error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})},oc=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o},RS=e=>{let t=[];return Array.isArray(e)&&e.length>0&&e.forEach(o=>{o.ToBinLoc?t.push({BinAbsEntry:OS(o.ToBinLoc),Quantity:o.Quantity,AllowNegativeQuantity:o.AllowNegativeQuantity,SerialAndBatchNumbersBaseLine:o.SerialAndBatchNumbersBaseLine,BinActionType:o.BinActionType,BaseLineNumber:o.BaseLineNumber}):t.push(o)}),t},OS=e=>{try{let t=Te.executeWithValues(he.binsList+' WHERE T0."BinCode" = ?',e);return console.log("getBinAbsEntry - result: "+JSON.stringify(t)),t[0].AbsEntry}catch(t){return console.log(`Error getting AbsEntry for BinCode - ${e} ERROR: ${t}`),0}},pn=async(e,t,o,r)=>{try{console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let s,n;if(n=await ve.patch(`Drafts(${e.DocEntry})`,e),console.log("PATCH Draft - response.data: "+JSON.stringify(n.data)),e.U_DraftStatus==H.APPROVED)try{let a=await ve.get(`StockTransferDrafts(${e.DocEntry})`);a=a.data,console.log("draftResponse: "+JSON.stringify(a));let l=[],d={};Array.isArray(a.StockTransferLines)&&a.StockTransferLines.length&&a.StockTransferLines.forEach(c=>{d={LineNum:c.LineNum,ItemCode:c.ItemCode,Quantity:c.Quantity,BaseType:yn.STOCK_TRANSFER_REQUEST,BaseEntry:c.BaseEntry,BaseLine:c.BaseLine,MeasureUnit:c.MeasureUnit,WarehouseCode:c.WarehouseCode,FromWarehouseCode:c.FromWarehouseCode,U_ToBinLocation:c.U_ToBinLocation},d.BatchNumbers=oc("Batch",c.BatchNumbers),d.SerialNumbers=oc("Serial",c.SerialNumbers),d.StockTransferLinesBinAllocations=rc(c.StockTransferLinesBinAllocations),l.push(d)}),l.sort((c,p)=>c.BaseLine-p.BaseLine);let i={DocDate:a.DocDate,FromWarehouse:a.FromWarehouse,U_ToBinLocation:a.U_ToBinLocation,ToWarehouse:a.ToWarehouse,Comments:a.Comments,U_OriginatorId:a.U_OriginatorId,U_ApproverId:a.U_ApproverId,U_DraftStatus:a.U_DraftStatus,U_MultiLevelApproval:a.U_MultiLevelApproval,U_NoOfApprovals:parseInt(a.U_NoOfApprovals,10),U_DraftDocEntry:e.DocEntry,StockTransferLines:l};a.BPLID&&(i.BPLID=a.BPLID),console.log("StockTransfers - request: "+JSON.stringify(i)),s=await ve.post("StockTransfers",i)}catch(a){let l=await ve.patch(`StockTransferDrafts(${e.DocEntry})`,{U_DraftStatus:H.PENDING});throw console.log("resetDraftStatus - response.data: "+l),a}if(n||s){let a=Te.executeWithValues(he.updateDraftApproversList,[o,e.U_RejectedReason,NS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(o===H.REJECTED&&un.setApprovalStatus(o,e.DocEntry),s){let p=await ve.patch(`Drafts(${e.DocEntry})`,{U_TargetRecDocNum:s.data.DocNum});r!=="Y"&&un.setApprovalStatus(H.APPROVED,e.DocEntry)}let l=Te.executeWithValues(he.selectUserInfo,e.U_OriginatorId),d=Te.executeWithValues(he.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(l)),console.log("approverRec: "+JSON.stringify(d));let i;if([H.APPROVED,H.PENDING].includes(e.U_DraftStatus)?i=H.APPROVED:i=e.U_DraftStatus,Array.isArray(d)&&d.length&&Array.isArray(l)&&l.length){let p=ec.getMailBody(Ir.STOCK_TRANSFER,l[0].UserName,d[0].UserName,e.DocEntry,i);await mn(l[0].Email,ec.subject,p)}let c;o===H.APPROVED&&(c=un.getApprovalInternalInDays(e.DocEntry,e.U_ApprovalLevel,r)),t.status(200).send({draftStatus:i,noOfDays:c})}}catch(s){next(s)}},US=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;let r;try{r=await sc(e)}catch(n){console.log("updateDraft: "+JSON.stringify(n)),o(n)}let s=e.body;if(r){ve.defaults.headers.Cookie=r;try{let n=s.U_DraftStatus;if(s.U_DraftStatus==H.APPROVED){let a=Te.executeWithValues(he.selectNoOfApprovalsForDraft,[yn.STOCK_TRANSFER,s.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(a));let l=0,d;if(Array.isArray(a)&&a.length&&(l=parseInt(a[0].U_NoOfApprovals,10),d=a[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+l),d==="Y"){if(parseInt(s.U_ApprovalLevel)==l?s.U_DraftStatus=H.APPROVED:parseInt(s.U_ApprovalLevel)<l&&(s.U_DraftStatus=H.PENDING),await pn(s,t,n,d),s.U_DraftStatus==H.PENDING){let i=parseInt(s.U_ApprovalLevel)+1,c=Te.executeWithValues(he.updateDraftNextApprovalLevel,[H.PENDING,s.DocEntry,i]);console.log("setNextApprovalStatus: "+JSON.stringify(c));let p=Te.executeWithValues(he.selectUserInfo,s.U_OriginatorId),y=Te.executeWithValues(he.selectDraftNextApproverDetails,[s.DocEntry,i]);if(console.log("nextApproverDetails: "+JSON.stringify(y)),Array.isArray(y)&&y.length&&p.length){let g=Ar.getMailBody(Ir.STOCK_TRANSFER,p[0].UserName,s.DocEntry);await mn(y[0].Email,Ar.subject,g)}}}else{let i=Te.executeWithValues(he.selectDraftApprovalStatusCount,[s.DocEntry,s.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(i));let c=0;Array.isArray(i)&&i.length&&(c=i[0].Count),console.log("noOfApprovalsReceived: "+c),parseInt(c,10)+1>=parseInt(l,10)?(s.U_DraftStatus=H.APPROVED,console.log("****APPROVED")):(s.U_DraftStatus=H.PENDING,console.log("****PENDING")),await pn(s,t,n,d)}}else s.U_DraftStatus==H.REJECTED&&(console.log("****REJECTED"),await pn(s,t,n))}catch(n){console.log("Stock Transfer Draft error: "+n),o(n)}}else t.status(500).send({error:"Unable to connect to the server. Please contact Administrator!"})};nc.exports={createStockTransfer:bS,updateDraft:US}});var lc=u(ic=>{var xS=N(),LS=D(),{getRandomNo:TR,formatDate:wS,getClientHostname:BS}=W(),hR=$s(),{sendMail:CR}=De(),{generateHash:SR,comparePassword:vS}=Zo(),gn=so(),{openSLConnection:_S,setSLCache:PS}=X(),{createUserSessionLog:MS}=Nt(),{getUserStoreInfo:FS}=Ks(),{canAssignUserToCounter:fR}=gr(),{getLocationDefaults:$S}=io();ic.validateUserLogin=async(e,t,o)=>{console.log("validateUserLogin - req.body: "+JSON.stringify(e.body));try{let r=!1,s=xS.executeWithValues(LS.validateUserLogin,[e.body.userName]);if(console.log("validateUserLogin %s",JSON.stringify(s)),Array.isArray(s)&&s.length)if(s[0].U_PortalAccountLocked==="Y")console.log("rows[0].U_PortalAccountLocked: "+s[0].U_PortalAccountLocked),o({statusCode:401,message:"Your account is locked. Please contact Admin!"});else if(s[0].U_PortalUser!=="Y")console.log("rows[0].U_PortalUser: "+s[0].U_PortalUser),o({statusCode:401,message:"User is unauthorized. Please contact Admin!"});else{let n=s[0].Password&&(await vS(e.body.password,s[0].Password)||e.body.password===s[0].Password),a=e.body.password===process.env.SERVICE_LAYER_PASSWORD;if(!n&&!a)return console.log("Password mismatch for user: "+e.body.userName),o({statusCode:401,message:"Invalid username/password!"});let l=process.env.SERVICE_LAYER_PASSWORD||e.body.password,d=await _S(e.body.userName,l);if(console.log("slCookie: "+d),PS(d),d){let i=s[0].InternalKey,{storeId:c,storeCounterId:p,counterCode:y,counterName:g,locationCode:E,storeLocation:T,storeWHCode:h}=await FS(i),A="",$=await gn.getSalesEmployeeForUser(i);Array.isArray($)&&$.length>0&&(A=$[0].SlpCode);let I=await gn.getUserGroupByUser(i),f=Array.isArray(I)&&I.length>0&&I[0].U_GroupName?I[0].U_GroupName.trim():"";console.log("DEBUG LOGIN - DB lookup for UserId:",i,"resulted in groups:",JSON.stringify(I)),console.log("DEBUG LOGIN - Assigned userGroup:",f),e.session.userId=i,e.session.userName=e.body.userName,e.session.password=e.body.password,e.session.slCookie=d,e.session.slLoginTime=new Date,e.session.userTIN=s[0].Fax,e.session.displayUserName=s[0].UserName,e.session.userGroup=f,await new Promise(G=>{e.session.save(Xt=>{Xt?(console.log("Session save error (continuing with in-memory cache):",Xt),G()):(console.log("Session saved successfully with slCookie and userGroup:",f),G())})});let S=await BS(e),x="";if(T){let G=await $S(T);Array.isArray(G)&&G.length>0&&(x=G[0])}let v={userId:i,userName:e.body.userName,userTIN:s[0].Fax,displayUserName:s[0].UserName,salesDisc:s[0].SalesDisc,userSalesEmployeeCode:A,storeId:c||null,storeCounterId:p||null,counterCode:y,counterName:g,locationCode:E,storeLocation:T,locationDefaults:x,clientIp:S,loginTime:wS(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),logoutTime:""},R=await MS(v);R.userGroup=f,R.userSalesEmployeeCode=A,e.session.userSessionLog=R,e.session.storeWHCode=h,e.session.userSessionLog.locationCode=E;let Z={InternalKey:i,UserName:s[0].UserName,UserTIN:s[0].Fax,userSessionLog:R,storeWHCode:h,userGroup:f,permissions:[]};console.log("=========================================="),console.log("LOG LOGIN - FINAL BACKEND RESPONSE READY:"),console.log("userGroup:",Z.userGroup),console.log("userSalesEmployeeCode (nested):",Z.userSessionLog.userSalesEmployeeCode),console.log("==========================================");try{let G=gn.getUserPermissions(i);G&&(e.session.permissions=G,Z.permissions=G),t.send(Z)}catch(G){console.log("validateUserLogin - getUserPermissionsForAllModules - error: "+JSON.stringify(G)),t.status(500).send({message:G.message+". Unable to get User Permissions"})}}}else console.log("Invalid username/password!"),o({statusCode:401,message:"Invalid username/password!"})}catch(r){console.log("validateUserLogin - controller - error: "+JSON.stringify(r)),o(r)}}});var uc=u((IR,dc)=>{var WS=require("../node_modules/express/index.js"),kS=Fl(),cc=Zl(),AR=ac(),HS=lc(),{portalModules:Tn,permissions:hn}=C(),{checkUserPermission:Cn}=L(),Dr=new WS.Router;Dr.route("/login").post(HS.validateUserLogin);Dr.route("/users").patch(Cn(Tn.USER,hn.WRITE),kS.updateUserDetails);Dr.route("/stock-transfer-request").post(Cn(Tn.STOCK_TRANSFER_REQUEST,hn.CREATE),cc.createStockTransferRequest).patch(Cn(Tn.STOCK_TRANSFER_REQUEST,hn.WRITE),cc.updateDraft);dc.exports=Dr});var fn=u((DR,pc)=>{var Sn=require("../node_modules/bunyan/lib/bunyan.js"),JS=require("path"),{formatDate:qS}=W(),GS=()=>{let e=JS.resolve(__dirname,"../../logs/pos.json"),t=process.env.NODE_ENV||"production",o=Sn.createLogger({dateTime:qS(new Date,"YYYY-MM-DD HH24:MI:SS"),name:"POS",streams:[{level:Sn.INFO,stream:process.stdout},{level:Sn.ERROR,type:"rotating-file",path:e,period:"1d",count:5}]});return console.log("Bunyan logger initialized.."),o},jS=e=>{try{GS().error(e)}catch(t){console.log("Error initializing Bunyan Logger: ",JSON.stringify(t))}};pc.exports={logError:jS}});var gc=u((NR,yc)=>{var{httpStatusCodes:mc}=C(),zS=e=>{let t=mc.INTERNAL_SERVER_ERROR,o="Unexpected error! Contact Admin.";return e.response?(console.log("error.response.data"+JSON.stringify(e.response.data)),console.log("error.response.status:"+e.response.status),console.log("error.response.headers: "+JSON.stringify(e.response.headers)),e.response.status&&(t=e.response.status,o=e.response.data.error.message.value)):e.message?o=e.message:e.request?console.log("error.request: "+JSON.stringify(e.request)):console.log("Catch else - Error",e.message),e.code&&(t=e.code>=300?e.code:mc.INTERNAL_SERVER_ERROR),{statusCode:t,message:o}};yc.exports={serviceLayerErrorHandler:zS}});var hc=u((bR,Tc)=>{var{logError:VS}=fn(),{serviceLayerErrorHandler:QS}=gc(),{httpStatusCodes:YS}=C(),KS=(e,t,o,r)=>{console.error(e);let{statusCode:s,message:n}=QS(e);s||(s=e.statusCode||YS.INTERNAL_SERVER_ERROR),n||(n=e.detail?e.detail:e.message?e.message:e),VS({method:t.method,url:t.url,statusCode:s,message:n,stack:e.stack,requestBody:t.body,requestParams:t.params,requestQuery:t.query}),o.status(s).json({message:n})};Tc.exports=KS});var fc=u(Sc=>{var{serviceLayerAPI:Cc}=j(),{portalModules:XS,serviceLayerApiURIs:ZS}=C(),ef=XS.BUSINESS_PARTNER,tf=ZS[ef];Sc.createBusinessPartner=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** BusinessPartner request: "+JSON.stringify(e)),Cc.defaults.headers.Cookie=t;let o=await Cc.post(tf,e);return o.data?o.data:void 0}catch(o){throw console.log("Create BusinessPartner error: "+o),o}}});var Ac=u((OR,Ec)=>{var{getSLConnection:of}=X(),rf=fc(),sf=async(e,t,o)=>{try{let r=await of(e),s=await rf.createBusinessPartner(e.body,r);t.status(200).send({CardCode:s.CardCode})}catch(r){console.log("create Biz Partner: "+JSON.stringify(r)),o(r)}};Ec.exports={create:sf}});var Nc=u((UR,Dc)=>{var nf=require("../node_modules/express/index.js"),af=Ac(),{portalModules:lf,permissions:cf}=C(),{checkUserPermission:df}=L(),Ic=new nf.Router;Ic.route("/").post(df([lf.INVOICE],cf.CREATE),af.create);Dc.exports=Ic});var In=u(Nr=>{var{dataSource:En}=ne(),An=Js(),bc="cashDenominationId",uf="dateTime";Nr.createCashDenomination=async e=>{try{return await En.getRepository(An).save(e)}catch(t){throw t}};Nr.getCashDenominations=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[bc]=e.id,delete e.id);try{let o=En.getRepository(An);return t===1?await o.findOneBy(e):await o.find({where:e,order:{[uf]:"ASC"}})}catch(o){throw o}};Nr.deleteCashDenominations=async e=>{try{return await En.getRepository(An).delete({[bc]:e})}catch(t){throw t}}});var Rc=u(br=>{var Dn=In(),pf="trxType";br.create=async(e,t,o)=>{if(!e.body||!e.body[pf]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await Dn.createCashDenomination(e.body);t.send(r)}catch(r){console.error("Error creating CashDenomination!"),o(r)}};br.findAll=async(e,t,o)=>{try{let r=await Dn.getCashDenominations(e.query);t.send(r)}catch(r){console.error("Error getting CashDenomination!"),o(r)}};br.delete=async(e,t,o)=>{try{let r=await Dn.deleteCashDenominations(e.params.id);t.send(r)}catch(r){console.error("Error deleting CashDenomination!"),o(r)}}});var Uc=u((wR,Oc)=>{var mf=require("../node_modules/express/index.js"),Nn=Rc(),{portalModules:bn,permissions:Rn}=C(),{checkUserPermission:On}=L(),Rr=new mf.Router;Rr.post("/",On(bn.INVOICE,Rn.CREATE),Nn.create);Rr.get("/",On(bn.INVOICE,Rn.READ),Nn.findAll);Rr.delete("/:id",On(bn.INVOICE,Rn.CANCEL),Nn.delete);Oc.exports=Rr});var Lc=u(xc=>{var{dbCreds:yf}=D();xc.creditCards=`SELECT T0."CreditCard", T0."CardName", T0."AcctCode", T0."CompanyId" "SurchargeAccount",
    T0."Phone" "SurchargePercentage"
  FROM ${yf.CompanyDB}.OCRC T0`});var Bc=u(wc=>{var gf=N(),Tf=Lc();wc.getCreditCards=()=>{try{return gf.executeWithValues(Tf.creditCards)}catch(e){throw console.log("getCreditCards - controller - error: "+JSON.stringify(e.message)),e}}});var _c=u(vc=>{var{enableLocationBasedCreditCardAccount:hf}=C(),Cf=Bc(),{getLocationDefaults:Sf}=io();vc.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Cf.getCreditCards();if(hf&&e.query.location){let s=Sf(e.query.location);r&&Array.isArray(s)&&s.length>0&&r.forEach(n=>{n.AcctCode=s[0].AccountCode})}t.send(r)}catch(r){console.log("Credit Card - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Fc=u((PR,Mc)=>{var ff=require("../node_modules/express/index.js"),Pc=new ff.Router,Ef=_c(),{checkUserPermission:Af}=L(),{portalModules:If,permissions:Df}=C();Pc.route("/").get(Af(If.INVOICE,Df.READ),Ef.get);Mc.exports=Pc});var $c=u(oe=>{var{dbCreds:b}=D();oe.invoice=`SELECT DISTINCT T0."DocNum", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocDueDate", T0."BPLId" AS "branch",
    T0."CardCode", T0."CardName", T2."Cellular", T0."NumAtCard", T2."LicTradNum", T2."QryGroup36", T4."U_Change" as "Change",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."U_PaymentType", T0."SlpCode" "SalesPersonCode",
    T5."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location", T0."U_IsReprinted",
    T0."U_AmtTender", T0."U_DeliveryApp"
      FROM ${b.CompanyDB}.OINV T0
      INNER JOIN ${b.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
      LEFT JOIN ${b.CompanyDB}.OCRD T2 ON T0."CardCode" = T2."CardCode"
      LEFT JOIN ${b.CompanyDB}.RCT2 T3 ON T0."DocEntry" = T3."DocEntry"
      LEFT JOIN ${b.CompanyDB}.ORCT T4 ON T3."DocNum" = T4."DocEntry"
      LEFT JOIN ${b.CompanyDB}.OSLP T5 ON T0."SlpCode" = T5."SlpCode"
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"`;oe.itemListForInvoice=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", IFNULL(TO_VARCHAR(T1."U_DocNum"), (SELECT MIN(B."BatchNum") FROM ${b.CompanyDB}.IBT1 B WHERE B."BaseEntry" = T1."DocEntry" AND B."BaseLinNum" = T1."LineNum" AND B."BaseType" = 13)) AS "BundleNo", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceAfVAT" as "NetUnitPrice", T1."PriceBefDi" "PriceBeforDiscount", T1."U_DeliveryApp",
    (SELECT E."ItmsGrpNam" FROM  ${b.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod",
    IFNULL((SELECT SUM(S1."U_NoOfPcs") FROM  ${b.CompanyDB}."@OSBS" S0
        INNER JOIN  ${b.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Pcs",
    IFNULL((SELECT SUM(S1."U_SelQty") FROM  ${b.CompanyDB}."@OSBS" S0
        INNER JOIN  ${b.CompanyDB}."@SBS1" S1 ON S0."DocEntry" = S1."DocEntry" 
        WHERE S0."DocNum" = T1."U_DocNum" GROUP by S1."DocEntry"), 0) AS "Volume",
     T1."CogsOcrCod" AS "COGSBranch",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
        FROM ${b.CompanyDB}.SPP1 P WHERE P."ItemCode" = ITM."ItemCode" 
          AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
            AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied",
      T0."U_IsReprinted"
  FROM ${b.CompanyDB}.OINV T0
    INNER JOIN ${b.CompanyDB}.INV1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${b.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;oe.invoiceFircaURL=`SELECT T0."DocNum", T0."U_VerifyURL"
    FROM ${b.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;oe.invoiceAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${b.CompanyDB}.OINV T0
  WHERE T0."DocEntry" = ?`;oe.invoiceUDFData=`SELECT T0."DocNum", T0."U_InvCount", T0."U_SDCTime", T0."U_SDCInvNum", T0."U_VehicleNo", T0."U_TINNO"
    FROM ${b.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;oe.updateTransRef=`UPDATE ${b.CompanyDB}.OCRH T0
    SET T0."TransRef" = ? 
      WHERE T0."RctAbs" = ?;`;oe.updateInvoiceItem=`UPDATE ${b.CompanyDB}.INV1 T1 SET
    T1."U_ReturnedQty" = ?, T1."U_RemainingOpenQty" = ?
  WHERE T1."DocEntry" = ? AND T1."LineNum" = ?`;oe.updateInvoiceReprintStatus=`UPDATE ${b.CompanyDB}.OINV T0 SET
    T0."U_IsReprinted" = 'Y'
  WHERE T0."DocEntry" = ?`;oe.invoiceDeliveyCodeData=`SELECT T0."DeliveryCode", T0."DocNum",
    FROM ${b.CompanyDB}.OINV T0
  WHERE T0."DocNum" = ?`;oe.updateSalesBatchSelectionDocNum=`UPDATE ${b.CompanyDB}.INV1 T1 SET
    T1."U_DocNum" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ? AND T1."LineNum" = ?`;oe.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${b.CompanyDB}.OINV T0
  WHERE T0."U_POS_TransactionID" = ?`;oe.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${b.CompanyDB}.OADP T0`;oe.getTimberItems=`SELECT DISTINCT I1."ItemCode", I1."WhsCode", I1."LineNum" + 1 AS "SNo", T9."BatchNum", 
    T9."Quantity" AS "SelectedQty", T25."U_Length", T25."U_Height", T25."U_Width",
    (T9."Quantity" / ((T25."U_Height" / 1000) * (T25."U_Width" / 1000) * T25."U_Length")) AS "NoofPieces",
    ITM."ItemName" AS "Description", T10."WhsName", T10."Street", T10."Block", T10."City"
      FROM ${b.CompanyDB}."IBT1" T9
      INNER JOIN ${b.CompanyDB}."OIBT" T25 
          ON T9."BatchNum" = T25."BatchNum" AND T25."ItemCode" = T9."ItemCode"
      LEFT JOIN ${b.CompanyDB}."@SBS1" SBS1 
          ON SBS1."U_Batch" = T25."BatchNum"
      INNER JOIN ${b.CompanyDB}."INV1" I1 
          ON I1."DocEntry" = T9."BaseEntry" AND I1."ItemCode" = T9."ItemCode"
      INNER JOIN ${b.CompanyDB}."OINV" I0 
          ON I1."DocEntry" = I0."DocEntry"
      LEFT JOIN ${b.CompanyDB}."OITM" ITM 
          ON ITM."ItemCode" = I1."ItemCode"
      LEFT JOIN ${b.CompanyDB}."OWHS" T10 
          ON I1."WhsCode" = T10."WhsCode"
      WHERE 
          I0."DocEntry" = ?
          AND ITM."ItmsGrpCod" = '156'`;oe.getSalesEmployeeDiscount=`SELECT T3."SalesDisc"
    FROM ${b.CompanyDB}.OSLP T0
    LEFT JOIN ${b.CompanyDB}.OHEM T1 ON T0."SlpCode" = T1."salesPrson"
    LEFT JOIN ${b.CompanyDB}.OUSR T3 ON T1."userId" = T3."USERID"
    WHERE T0."SlpCode" = ?`});var kc=u(Wc=>{var Nf=require("../node_modules/axios/index.js");Wc.getQRCodeDataURI=async e=>{try{let t="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=",o=await Nf.get(`${t}${encodeURIComponent(e)}`,{responseType:"arraybuffer"});return`data:image/png;base64,${Buffer.from(o.data,"binary").toString("base64")}`}catch(t){throw t}}});var Je=u(_=>{var re=N(),{buildHeaderRecQuery:bf,buildRowLevelQuery:Rf}=we(),se=$c(),{getQRCodeDataURI:Of}=kc(),{serviceLayerAPI:$R}=j(),{getSLConnection:Hc}=X(),Jc=require("../node_modules/axios/index.js"),Uf=require("https");_.getInvoiceByDocEntry=async(e,t=null)=>{try{if(!e&&e!==0)throw new Error("Invalid docEntry passed to getInvoiceByDocEntry");let r=`${process.env.SERVICE_LAYER_API_BASE_URL||"http://172.18.30.114:50001/b1s/v1"}/Invoices(${e})`,s=new Uf.Agent({rejectUnauthorized:!1}),n=await Hc(t);if(!n)throw new Error("Could not retrieve SL Cookie");let a;try{return console.log(`[Invoice Helper] Fetching status: ${r}`),a=await Jc({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:n},timeout:15e3}),a.data}catch(l){if(l.response?.status===401){console.log("\u{1F501} SAP Session expired \u2014 re-logging and retrying...");let d=await Hc(t);return(await Jc({method:"GET",url:r,httpsAgent:s,headers:{"Content-Type":"application/json",Cookie:d},timeout:15e3})).data}throw l}}catch(o){let r=o.response?.data?.error?.message?.value||o.message;throw console.log("getInvoiceByDocEntry - SL Error:",r),new Error(r)}};_.getInvoices=e=>{try{let t=bf(se.invoice,e,['T0."U_CODCntName"']);return console.log("getSalesQuotation- sql: ",t),re.executeWithValues(t)}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};_.updateInvoiceReprintStatus=e=>{try{let t=re.executeWithValues(se.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}catch(t){throw console.log("getInvoices - controller - error: "+JSON.stringify(t.message)),t}};_.getItemDetails=e=>{try{let t=Rf(se.itemListForInvoice,e);return{itemsList:re.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.getTimberItemDetails=e=>{try{let t=se.getTimberItems;return{itemsList:re.executeWithValues(t,[e])}}catch(t){throw console.log("getTimberItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.getAttachmentEntry=e=>{try{let t=re.executeWithValues(se.invoiceAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};_.getFircaInfo=e=>{try{let t=re.executeWithValues(se.invoiceFircaURL,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getFircaInfo - controller - error: "+JSON.stringify(t.message)),t}};_.getDeliveryInfo=e=>{try{let t=re.executeWithValues(se.invoiceDeliveyCodeData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getDeliveryInfo - controller - error: "+JSON.stringify(t.message)),t}};_.getUDFInfo=e=>{try{let t=re.executeWithValues(se.invoiceUDFData,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUDFInfo - controller - error: "+JSON.stringify(t.message)),t}};_.updateTransRef=(e,t)=>{try{return re.executeWithValues(se.updateTransRef,[t,e])}catch(o){throw console.log("updateTransRef - controller - error: "+JSON.stringify(o.message)),o}};_.getFircaQRCodeDataURI=async e=>{try{let t=_.getFircaInfo(e);console.log("getFircaQRCode - url: "+JSON.stringify(t));let o;return t&&t.U_VerifyURL&&(o=await Of(t.U_VerifyURL)),o}catch(t){throw console.log("getFircaQRCode - helper: "+JSON.stringify(t.message)),t}};_.getDeliveryCode=async e=>{try{let t=_.getDeliveryInfo(e);return console.log("get Delivery Code: "+JSON.stringify(t)),t}catch(t){throw console.log("getDeliveryCode - helper: "+JSON.stringify(t.message)),t}};_.getUDFData=async e=>{try{let t=_.getUDFInfo(e);return console.log("get UDF Data: "+JSON.stringify(t)),t}catch(t){throw console.log("get UDF Data - helper: "+JSON.stringify(t.message)),t}};_.updateRemainingQuantity=e=>{try{if(Array.isArray(e)&&e.length>0){let t=e.map(r=>[r.U_ReturnedQty,r.U_RemainingOpenQty,r.DocEntry,r.LineNum]);console.log("updateRemainingQuantity- updateRequest: "+JSON.stringify(t));let o=re.executeBatchInsertUpdate(se.updateInvoiceItem,t);return console.log("updateRemainingQuantity- response: "+JSON.stringify(o)),o}return null}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};_.updateReprint=e=>{try{if(e){let t=re.executeWithValues(se.updateInvoiceReprintStatus,[e]);return console.log("updateInvoiceReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(t.message)),t}};_.updateSalesBatchSelection=(e,t)=>{try{if(console.log("updateSalesBatchSelection %s %s %s %s",e.DocNum,t,e.U_ItemCode,e.U_LineNum),e){let o=re.executeWithValues(se.updateSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode,e.U_LineNum]);return console.log("updateSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("InvoiceReprintStatus - controller - error: "+JSON.stringify(o.message)),o}};_.getUniqueId=e=>{try{let t=re.executeWithValues(se.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getNumberingSeries - Helper - error: "+JSON.stringify(t.message)),t}};_.getAttachmentPath=()=>{try{let e=re.executeWithValues(se.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentPath - Helper - error: "+JSON.stringify(e.message)),e}};_.getSalesEmployeeDiscount=e=>{try{let t=re.executeWithValues(se.getSalesEmployeeDiscount,[e]);return Array.isArray(t)&&t.length>0?t[0].SalesDisc:0}catch(t){return console.log("getSalesEmployeeDiscount - helper - error: "+JSON.stringify(t.message)),0}}});var qc=u(nt=>{var wt=Je();nt.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=wt.getInvoices(e.query);t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};nt.updateReprint=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));let{DocEntry:r,U_IsReprinted:s}=e.body;try{let n=wt.updateInvoiceReprintStatus(r,s);t.send({message:"Invoice Reprint Status Updated Successfully",success:!0})}catch(n){console.log("getInvoice - controller - error: "+JSON.stringify(n.message)),o(n)}};nt.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=wt.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};nt.getFircaQRCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await wt.getFircaQRCodeDataURI(e.query.docNum);t.send(r)}catch(r){console.log("getFircaCode - controller - error: "+JSON.stringify(r.message)),o(r)}};nt.getDeliveryCode=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query));try{let r=await wt.getDeliveryCode(e.query.docNum);console.log("getDeliveryCode - Response: "+JSON.stringify(r)),t.send({DeliveryCode:r.DeliveryCode})}catch(r){console.log("getDeliveryCode - controller - error: "+JSON.stringify(r.message)),o(r)}};nt.checkDeliveryConfirmation=async(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.body));try{let r=!1,s=await wt.getDeliveryCode(e.body.docNum);console.log("checkDeliveryConfirmation - Response: "+JSON.stringify(s)),e.body.DeliveryCode===s.DeliveryCode&&(r=!0),t.send({isValid:r})}catch(r){console.log("checkDeliveryConfirmation - controller - error: "+JSON.stringify(r.message)),o(r)}}});var jc=u((HR,Gc)=>{var xf=require("../node_modules/express/index.js"),at=new xf.Router,Bt=qc(),{checkUserPermission:vt}=L(),{portalModules:_t,permissions:Pt}=C();at.route("/").get(vt(_t.INVOICE,Pt.READ),Bt.get);at.route("/reprint").patch(vt(_t.INVOICE,Pt.READ),Bt.updateReprint);at.route("/items").get(vt(_t.INVOICE,Pt.READ),Bt.getItems);at.route("/firca-code").get(vt(_t.INVOICE,Pt.READ),Bt.getFircaQRCode);at.route("/delivery-code").get(vt(_t.INVOICE,Pt.READ),Bt.getDeliveryCode);at.route("/delivery-confirmation").post(vt(_t.INVOICE,Pt.READ),Bt.checkDeliveryConfirmation);Gc.exports=at});var Or=u(zc=>{var Lf=require("../node_modules/axios/index.js"),wf=require("https");zc.submitInvoicetoFirca=async(e,t,o)=>{try{if(!process.env.FIRCA_API_BASE_URL)return console.log("FIRCA_API_BASE_URL is not defined. Skipping Firca integration."),!1;let r="";o=="Invoice"?r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_INVOICE_URI:r=process.env.FIRCA_API_BASE_URL+"/"+process.env.FIRCA_SALES_QUOTATION_URI;let s={DocEntry:e,CompanyCode:t},n=await Lf.post(r,s,{httpsAgent:new wf.Agent({rejectUnauthorized:!1}),auth:{username:process.env.FIRCA_USERNAME,password:process.env.FIRCA_PASSWORD}});return console.log("submitInvoicetoFirca - response: "+JSON.stringify(n.data)),n.data.statusCode===1}catch(r){throw r}}});var Qc=u(Vc=>{var{enableFircaIntegration:Bf}=C(),{submitInvoicetoFirca:vf}=Or(),{getFircaQRCodeDataURI:_f,getUDFData:Pf,updateReprint:Mf,getTimberItemDetails:Ff}=Je();Vc.createFirca=async(e,t,o)=>{try{if(e.body.invoice){let r={},s=e.body.invoice;console.log("req.query"+JSON.stringify(e.body.invoice));let n=s.CompanyCode?s.CompanyCode:"",a=s.DocEntry?s.DocEntry:"",l=s.DocNum?s.DocNum:"";if(Bf&&await vf(a,n,"Invoice")){let c=await _f(l);console.log("qrCodeDataURI",c),r.qrCode=c}let d=await Pf(l);if(d&&(r.InvCount=d.U_InvCount,r.SDCTime=d.U_SDCTime,r.SDCInvNum=d.U_SDCInvNum,r.VehicleNo=d.U_VehicleNo,Mf(a)&&console.log("Reprint Updated Successfully!")),a){let i=Ff(a);r.timItemList=i}t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'Firca' property!"})}catch(r){console.log("create Invoice: "+JSON.stringify(r)),o(r)}}});var Xc=u((GR,Kc)=>{var $f=require("../node_modules/express/index.js"),Yc=new $f.Router,Wf=Qc(),{checkUserPermission:kf}=L(),{portalModules:Hf,permissions:Jf}=C();Yc.route("/").post(kf(Hf.INVOICE,Jf.READ),Wf.createFirca);Kc.exports=Yc});var xr=u((Mt,rd)=>{var{serviceLayerAPI:Re}=j(),{portalModules:ed,serviceLayerApiURIs:td,attachmentPath:qf}=C(),Gf=Je(),jf=ed.INVOICE,xn=td[jf],Zc=ed.ATTACHMENTS,Un=require("fs"),Ur=require("path"),jR=require("../node_modules/pdfkit/js/pdfkit.js"),od=require("../node_modules/multer/index.js"),zf=od.memoryStorage(),Vf=od({storage:zf});Mt.createInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),Re.defaults.headers.Cookie=t;let o=await Re.post(xn,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Invoice error: "+o),o}};Mt.updateInvoice=async(e,t)=>{try{console.log("*** Invoice request: "+JSON.stringify(e)),Re.defaults.headers.Cookie=t;let o=await Re.patch(`${xn}(${e.DocEntry})`,e);return o&&o.status===204?(console.log("*** Invoice updated successfully. No content in response."),{message:"Invoice updated successfully.",status:200}):(console.warn("*** Unexpected response status:",o.status),{message:"Unexpected response from server.",status:o.status})}catch(o){throw console.error("Create Invoice error:",o.message),console.error(o.stack),o}};Mt.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),Re.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=Ur.extname(s).replace(".",""),a=Ur.basename(s,"."+n),l=s,d=Ur.join(qf,"assets/attachment");Un.existsSync(d)||Un.mkdirSync(d,{recursive:!0});let i=Ur.join(d,s);console.log("fullFilePath: *** "+i+" = "+r),Un.writeFileSync(i,r),console.log(`*** File saved successfully at ${i}`);let c={Attachments2_Lines:[{FileExtension:n,SourcePath:d.replace(/\\/g,"/"),UserID:e.session.userId,FileName:a}]},p={},y,g={Accept:"application/json","Content-Type":"application/json"},E=await Gf.getAttachmentEntry(t||e.body.DocEntry);if(console.log("Invoice response",JSON.stringify(E)),E&&E?.AtcEntry!==null){if(y=E?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(y)),p=await Re.patch(`${Zc}(${y})`,c),p&&p.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),p=await Re.post(Zc,c,{headers:g}),console.log("Attachment Post API Called"),p.data){console.log("Attachment Post Response:"+JSON.stringify(p.data)),y=p.data.AbsoluteEntry;let T={AttachmentEntry:y},h=await Re.patch(`${xn}(${t||e.body.DocEntry})`,T);if(h&&h.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",p.status),{message:"Unexpected response from server.",status:p.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};var zR=Je(),Qf=require("../node_modules/form-data/lib/form_data.js"),Yf=require("../node_modules/axios/index.js"),Kf=require("https");Mt.createAttachmentEntry=async(e,t)=>{try{if(!e.file)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.file.originalname}`);let o=new Qf;o.append("file",e.file.buffer,{filename:e.file.originalname,contentType:e.file.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await Yf.post(s,o.getBuffer(),{headers:n,httpsAgent:new Kf.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachmentEntry (Direct Upload) error:",JSON.stringify(r)),o.response&&console.error(`*** status: ${o.response.status}`),null}};Mt.linkAttachmentToDocument=async(e,t,o,r)=>{try{let s=td[e];if(!s)throw new Error(`Unknown docType: ${e}`);Re.defaults.headers.Cookie=r;let n={AttachmentEntry:o};console.log(`*** Linking Attachment ${o} to ${e} (${s}) DocEntry ${t}...`);let a=await Re.patch(`${s}(${t})`,n);return a.status===204?(console.log(`*** Successfully linked attachment to ${e} ${t}`),!0):(console.warn(`*** Unexpected response during linking: ${a.status}`),!1)}catch(s){return console.error(`linkAttachmentToDocument error linking to ${e}:`,s.response?.data||s.message),!1}};rd.exports.upload=Vf});var nd=u(Ln=>{var{serviceLayerAPI:Lr}=j(),{portalModules:Xf,serviceLayerApiURIs:Zf}=C(),eE=Xf.INCOMING_PAYMENT,sd=Zf[eE];Ln.createIncomingPayment=async(e,t)=>{try{e.DocObjectCode="bopot_IncomingPayments",console.log("*** IncomingPayment request: "+JSON.stringify(e)),console.log("*** [DEBUG] IncomingPayment final request payload: "+JSON.stringify(e)),Lr.defaults.headers.Cookie=t;let o=await Lr.post(sd,e);return console.log(`Create IncomingPayment response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create IncomingPayment error: "+o),o}};Ln.updatePaymentAttachment=async(e,t,o)=>{try{if(console.log("*** IncomingPayment Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Payment Attachment: No file uploaded!",status:200,success:!1};let s=await xr().createAttachmentEntry(e,o);if(s){let n={Attachments2_Lines:[{FileName:require("path").basename(e.file.originalname,require("path").extname(e.file.originalname)),FileExtension:require("path").extname(e.file.originalname).replace(".",""),SourcePath:C().attachmentPath.replace(/\\/g,"/")}]};if(Lr.defaults.headers.Cookie=o,(await Lr.patch(`${sd}(${t})`,n)).status===204)return console.log("*** IncomingPayment Attachment linked successfully."),{message:"Payment Attachment updated successfully.",status:200,absEntry:s}}return{message:"Failed to link attachment",status:500}}catch(r){throw console.error("Payment Attachment upload error:",r.response?.data||r.message),r}}});var go=u(yo=>{var{serviceLayerAPI:_e}=j(),{portalModules:tE}=C(),oE=N(),{dbCreds:rE}=D(),{getInvoiceByDocEntry:sE}=Je(),mo=tE.OSBS;yo.getSalesBatchSelection=async(e,t,o)=>{try{_e.defaults.headers.Cookie=o;let r=await _e.get(`${mo}?$filter=U_InvNo eq '${e}' and U_ItemCode eq '${t}'`);if(Array.isArray(r?.data?.value)&&r.data.value.length>0){let s=r.data.value[0],n={};try{let a=`SELECT "DocEntry" FROM ${rE.CompanyDB}.OINV WHERE "DocNum" = ?`,l=oE.executeWithValues(a,[e]);if(l&&l.length>0){let d=l[0].DocEntry;console.log(`[getSalesBatchSelection] Fetching Invoice ${d} (DocNum ${e}) for bin enrichment...`);let i=await sE(d,{headers:{Cookie:o}});i&&Array.isArray(i.DocumentLines)&&i.DocumentLines.forEach(c=>{c.ItemCode===t&&Array.isArray(c.DocumentLinesBinAllocations)&&(c.DocumentLinesBinAllocations.forEach(p=>{p.BinAbsEntry&&(n[p.SerialAndBatchNumbersBaseLine]=n[p.SerialAndBatchNumbersBaseLine]||{})}),Array.isArray(c.BatchNumbers)&&c.BatchNumbers.forEach((p,y)=>{let g=c.DocumentLinesBinAllocations.find(E=>E.SerialAndBatchNumbersBaseLine===y);g&&(n[p.BatchNumber]={BinAbsEntry:g.BinAbsEntry,BinCode:""})}))})}}catch(a){console.warn("[getSalesBatchSelection] Bin enrichment failed:",a.message)}if(Array.isArray(s.SBS1Collection)){let a=(i,c,p,y)=>`${i}_${parseFloat(c)}_${parseFloat(p)}_${parseFloat(y).toFixed(5)}`,l=new Set,d=[];s.SBS1Collection.forEach(i=>{let c=a(i.U_Batch,i.U_Width,i.U_Height,i.U_Length);if(!l.has(c)){l.add(c);let p=n[i.U_Batch];d.push({...i,BinAbsEntry:p?.BinAbsEntry||null,BinCode:p?.BinCode||""})}}),console.log(`[getSalesBatchSelection] Deduplicated and enriched SBS1Collection: ${d.length} rows`),s.SBS1Collection=d}return s}return null}catch(r){throw console.log("Get SalesBatchSelection error: "+r),r}};yo.updateSalesBatchSelection=async(e,t)=>{try{return _e.defaults.headers.Cookie=t,(await _e.patch(`${mo}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update SalesBatchSelection error: "+o),o}};yo.updateOSBSForQuotation=async(e,t,o)=>{let r=[],s=String(e);console.log(`[updateOSBSForQuotation] Starting update for SQ DocNum: ${s}, items: ${t.length}`);for(let n of t)try{_e.defaults.headers.Cookie=o;let a=`${mo}?$filter=U_InvNo eq '${s}' and U_ItemCode eq '${n.U_ItemCode}'`;console.log(`[updateOSBSForQuotation] GET: ${a}`);let l=await _e.get(a);if(console.log(`[updateOSBSForQuotation] GET result count: ${l?.data?.value?.length}`),Array.isArray(l?.data?.value)&&l.data.value.length>0){let d=l.data.value[0];console.log("[updateOSBSForQuotation] Existing OSBS record:",JSON.stringify(d,null,2));let i=Array.isArray(d.SBS1Collection)?d.SBS1Collection:[],c=n.SBS1Collection||[],p=(S,x,v,R)=>`${S}_${parseFloat(x)}_${parseFloat(v)}_${parseFloat(R).toFixed(5)}`,y=new Map,g=[],E=[];i.forEach((S,x)=>{let v=p(S.U_Batch,S.U_Width,S.U_Height,S.U_Length);y.has(v)?E.push(x):(y.set(v,x),g.push(x))}),console.log(`[updateOSBSForQuotation] Existing rows: ${i.length}, Canonical: ${g.length}, Duplicates to zero: ${E.length}`);let T={};c.forEach(S=>{let x=p(S.U_Batch,S.U_Width,S.U_Height,S.U_Length);T[x]||(T[x]={pcs:0}),T[x].pcs+=parseInt(S.U_NoOfPcs)||1});let h=i.map((S,x)=>{let v=p(S.U_Batch,S.U_Width,S.U_Height,S.U_Length),R=y.get(v)===x,Z=Math.round(parseFloat(S.U_AvlPcs)||0),G=parseFloat(S.U_AvlQty)||0;if(!R||!T[v]||T[v].pcs<=0)return{LineId:S.LineId,U_Batch:S.U_Batch,U_Width:S.U_Width,U_Height:S.U_Height,U_Length:S.U_Length,U_AvlQty:S.U_AvlQty,U_NoOfPcs:0,U_SelQty:0,U_AvlPcs:S.U_AvlPcs,U_BalPcs:Z,U_BalAvlQty:G};let Xt=T[v],Zt=Math.min(Xt.pcs,Z);Xt.pcs-=Zt;let wy=G/(Z||1),Ya=Zt===Z?G:parseFloat((Zt*wy).toFixed(5));return{LineId:S.LineId,U_Batch:S.U_Batch,U_Width:S.U_Width,U_Height:S.U_Height,U_Length:S.U_Length,U_AvlQty:S.U_AvlQty,U_NoOfPcs:Zt,U_SelQty:Ya,U_AvlPcs:S.U_AvlPcs,U_BalPcs:Z-Zt,U_BalAvlQty:parseFloat((G-Ya).toFixed(5))}});Object.keys(T).forEach(S=>{T[S].pcs>0&&console.warn(`[updateOSBSForQuotation] Spec ${S} still has ${T[S].pcs} pieces unmet after assignment.`)});let A=h.reduce((S,x)=>S+x.U_NoOfPcs,0),$=Number(h.reduce((S,x)=>S+x.U_SelQty,0).toFixed(5)),I=n.U_TotalQty||$,f={U_Quantity:A||d.U_Quantity||1,U_TotalQty:I,U_LineNum:d.U_LineNum,U_WhsCode:n.U_WhsCode||d.U_WhsCode,SBS1Collection:h};console.log(`[updateOSBSForQuotation] PATCHing OSBS DocEntry: ${d.DocEntry}, U_Qty: ${f.U_Quantity}, U_TotalQty: ${f.U_TotalQty}, Canonical: ${g.length}, ZeroedDupes: ${E.length}`),await _e.patch(`${mo}(${d.DocEntry})`,f),r.push({updated:!0,DocEntry:d.DocEntry,item:n.U_ItemCode}),console.log(`[updateOSBSForQuotation] PATCH success for DocEntry: ${d.DocEntry}`)}else console.warn(`[updateOSBSForQuotation] No OSBS found for SQ DocNum: ${s}, Item: ${n.U_ItemCode}. Cannot update.`),r.push({updated:!1,item:n.U_ItemCode})}catch(a){let l=a.response?.data?.error?.message?.value||a.message;console.error(`[updateOSBSForQuotation] Error for SQ ${s}, Item ${n.U_ItemCode}: ${l}`),r.push({updated:!1,item:n.U_ItemCode,error:l})}return r};yo.createSalesBatchSelection=async(e,t,o,r)=>{console.log("*** SalesBatchSelection request: "+JSON.stringify(e));let s=Array.isArray(e)?e:[e],n=[];for(let a of s)try{_e.defaults.headers.Cookie=r,a.U_InvNo=o;let l=await _e.post(mo,a),{DocNum:d,U_LineNum:i,U_ItemCode:c}=l.data;console.log("*** SalesBatchSelection response:**** "+JSON.stringify(l.data)),n.push({DocNum:d,U_LineNum:i??a.U_LineNum,U_ItemCode:c})}catch(l){console.error(`Error creating OSBS record for item ${a.U_ItemCode||a.ItemCode}:`,l.response?.data?.error?.message?.value)}return n}});var ld=u(id=>{var{serviceLayerAPI:ad}=j(),{portalModules:nE,serviceLayerApiURIs:aE}=C(),iE=nE.JOURNAL_ENTRY,lE=aE[iE];id.createJournalEntry=async(e,t)=>{try{console.log("*** JournalEntry request: "+JSON.stringify(e)),ad.defaults.headers.Cookie=t;let o=await ad.post(lE,e);return o.data?o.data:void 0}catch(o){throw console.log("Create JournalEntry error: "+o),o}}});var Sd=u((tO,Cd)=>{var{getSLConnection:Bn,invalidateSLCache:cE}=X(),it=xr(),yd=nd(),gd=go(),{updateOSBSForQuotation:dE}=gd,uE=ld(),KR=In(),{formatDate:Td}=W(),{trxTypes:XR,defaultBranchId:ZR,fircaIntegrationWaitTime:eO,enableFircaIntegration:cd,objectCodes:dd,portalModules:Br,enableStoreBasedNumbering:wr,isHomeDeliveryEnabled:ud}=C(),{submitInvoicetoFirca:pE}=Or(),{getFircaQRCodeDataURI:mE,getUDFData:pd,updateSalesBatchSelection:yE,updateTransRef:gE,getUniqueId:TE,getItemDetails:hE,getTimberItemDetails:CE,getSalesEmployeeDiscount:SE}=Je(),{getNumberingSeries:md}=fr(),wn=new Map,fE=async(e,t,o)=>{let r=null;try{if(typeof e.body.request=="string"){let s=JSON.parse(e.body.request);Object.assign(e.body,s)}if(typeof e.body.invoice=="string"&&(e.body.invoice=JSON.parse(e.body.invoice)),typeof e.body.incomingPayment=="string"&&(e.body.incomingPayment=JSON.parse(e.body.incomingPayment)),typeof e.body.salesBatchSelection=="string"&&(e.body.salesBatchSelection=JSON.parse(e.body.salesBatchSelection)),typeof e.body.journalEntry=="string"&&(e.body.journalEntry=JSON.parse(e.body.journalEntry)),e.body.invoice){if(r=e.body.invoice.Unique,r){if(wn.has(r))return console.error(`[BACKEND] Concurrent request detected for TransactionID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});wn.set(r,!0)}console.time("2. [BACKEND] Total Invoice Create API Duration");let s={},n="",a={};console.time("2.1 [BACKEND] Parallel DB Queries");let l=Bn(e),d,i=e.body.invoice,c=parseFloat(e.session.userSessionLog?.salesDisc||0);if(c===0&&i.SalesPersonCode)try{let I=SE(i.SalesPersonCode);I>0&&(console.log(`[BACKEND] Discount Fallback: Using SalesPerson ${i.SalesPersonCode} limit: ${I}%`),c=parseFloat(I))}catch(I){console.error("[BACKEND] Discount Fallback failed:",I.message)}if(Array.isArray(i.DocumentLines))for(let I of i.DocumentLines){let f=parseFloat(I.DiscountPercent||0);if(f>c)return console.error(`[BACKEND] Discount Limit Violation: Item ${I.ItemCode} has ${f}% but user only allowed ${c}%`),t.status(400).send({message:`Discount Limit is Exceeded: ${c}% (Item: ${I.ItemCode})`})}let p=i.CompanyCode?i.CompanyCode:"";typeof ud<"u"&&ud&&i.U_IsHomeDelivery==="Y"&&(d=Math.floor(1e5+Math.random()*9e5),i.U_DeliveryCode=d);let y=Promise.resolve(null);typeof wr<"u"&&wr&&(y=md(dd[Br.INVOICE],e.session.userSessionLog.storeLocation));let g=TE(i.Unique),E=Promise.resolve(null);e.body.incomingPayment&&typeof wr<"u"&&wr&&(E=md(dd[Br.INCOMING_PAYMENT],e.session.userSessionLog.storeLocation));let[T,h,A,$]=await Promise.all([l,y,g,E]);if(console.timeEnd("2.1 [BACKEND] Parallel DB Queries"),h&&(console.log("seriesResponse series:",h.Series),i.Series=h.Series),A?.DocNum)console.log("uniqueResponse unique:",A?.DocNum),s.DocNum=A.DocNum,s.DocEntry=A.DocEntry,s.isExist=!0;else{if(e.body.sqDocNum&&Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){console.log("[BACKEND] Updating OSBS for source SQ DocNum:",e.body.sqDocNum);try{let f=await dE(e.body.sqDocNum,e.body.salesBatchSelection,T);console.log("[BACKEND] OSBS update result:",JSON.stringify(f))}catch(f){console.warn("[BACKEND] OSBS pre-update failed (non-fatal):",f.message)}}Array.isArray(i.DocumentLines)&&i.DocumentLines.forEach(f=>{if(Array.isArray(f.BatchNumbers)&&f.BatchNumbers.length>0){let S=[],x=new Map;if(f.BatchNumbers.forEach(v=>{let R=`${v.BatchNumber}_${v.BaseLineNumber}`;if(x.has(R))x.get(R).Quantity=parseFloat((x.get(R).Quantity+v.Quantity).toFixed(5));else{let Z={...v};x.set(R,Z),S.push(Z)}}),f.BatchNumbers=S,Array.isArray(f.DocumentLinesBinAllocations)&&f.DocumentLinesBinAllocations.length>0){let v=f.DocumentLinesBinAllocations[0].BinAbsEntry;f.DocumentLinesBinAllocations=S.map((R,Z)=>({BinAbsEntry:v,Quantity:R.Quantity,SerialAndBatchNumbersBaseLine:Z,BaseLineNumber:R.BaseLineNumber}))}}});let I;try{console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice"),I=await it.createInvoice(i,T),console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice")}catch(f){if(f?.response?.status===401)console.log("*** 401 Unauthorized from SL (Invoice) - Invalidating cache and retrying..."),cE(),T=await Bn(e),console.time("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)"),I=await it.createInvoice(i,T),console.timeEnd("2.4 [BACKEND] SAP API: serviceLayerHelper.createInvoice (Retry)");else throw console.timeEnd("2. [BACKEND] Total Invoice Create API Duration"),f}if(I.DocEntry){if(e.file){console.log(`[BACKEND] Attachment found for Invoice ${I.DocEntry}. Creating entry...`);let f=await it.createAttachmentEntry(e,T);if(f){console.log(`[BACKEND] Attachment Entry ${f} created. Linking to Invoice...`);let S=await it.linkAttachmentToDocument(Br.INVOICE,I.DocEntry,f,T);console.log(`[BACKEND] Invoice ${I.DocEntry} link result: ${S}`),e.absEntry=f}else console.warn(`[BACKEND] Failed to create attachment entry for Invoice ${I.DocEntry}`)}if(s.DocNum=I.DocNum,s.DocEntry=I.DocEntry,s.isExist=!1,e.body.incomingPayment){$&&(console.log("ipSeriesResponse series:",$.Series),e.body.incomingPayment.Series=$.Series),console.time("2.6 [BACKEND] processPayment");let f=await EE(I.DocEntry,e.body.incomingPayment,T,e.absEntry);if(console.timeEnd("2.6 [BACKEND] processPayment"),f){if(s.IncomingPaymentDocNum=f.DocNum,n=f.DocEntry,e.absEntry){console.log(`[BACKEND] Linking attachment ${e.absEntry} to Incoming Payment DocEntry ${n} via robust method...`);let S=await yd.updatePaymentAttachment(e,n,T);console.log(`[BACKEND] Attachment linking result for Payment ${n}: ${JSON.stringify(S)}`)}if(e.body?.journalEntry){console.time("2.7 [BACKEND] processJournalEntry");let S=await AE(e.body.journalEntry,I.DocNum,f.DocNum,T);console.timeEnd("2.7 [BACKEND] processJournalEntry"),s.JournalEntryDocNum=S?.JdtNum}}}if(cd){console.time("2.8 [BACKEND] FIRCA Integration");try{if(await pE(I.DocEntry,p,"Invoice")){let S=await mE(I.DocNum);S&&(s.qrCode=S,console.log("FIRCA qrCodeDataURI computed successfully."))}}catch(f){console.error("FIRCA error:",f)}console.timeEnd("2.8 [BACKEND] FIRCA Integration")}console.time("2.9 [BACKEND] getUDFData");try{let f=await pd(I.DocNum);(!f||!f.U_SDCInvNum)&&cd&&(console.log("SDC Details not yet available, waiting 3 seconds before retry..."),await new Promise(S=>setTimeout(S,3e3)),f=await pd(I.DocNum)),f&&(console.log("UDF Data fetched successfully. Inv:",f.U_InvCount),s.InvCount=f.U_InvCount,s.SDCTime=f.U_SDCTime,s.SDCInvNum=f.U_SDCInvNum,s.VehicleNo=f.U_VehicleNo,s.TradeNum=f.U_TINNO)}catch(f){console.error("UDF Error:",f)}console.timeEnd("2.9 [BACKEND] getUDFData")}}if(console.log("*************invoiceSalesBatchResponse start************ "),e.body.salesBatchSelection.length>0){console.time("2.10 [BACKEND] createSalesBatchSelection");let I=await IE(s.DocEntry,s.DocNum,e.body.salesBatchSelection,T);console.timeEnd("2.10 [BACKEND] createSalesBatchSelection"),console.log("*************invoiceSalesBatchResponse************: ",I)}if(console.log("*************invoiceSalesBatchResponse end************ "),e.body.invoice.U_PaymentType==="Card"){if(console.log("*************CreditCard Management referenece start************ "),e.body.incomingPayment?.TransferReference&&e.body.incomingPayment?.TransferReference!==""){console.log("*************CreditCard Management referenece************: ",n+" - "+e.body.incomingPayment.TransferReference);let I=await gE(n,e.body.incomingPayment?.TransferReference);console.log("*************CreditCard Management referenece************: ",I)}console.log("*************CreditCard Management referenece end************ ")}if(s.DocNum){let I=hE({docNum:s.DocNum});s.itemList=I}if(s.DocEntry){let I=CE(s.DocEntry);s.timItemList=I}e.absEntry&&(console.log(`[BACKEND] Adding AbsoluteEntry ${e.absEntry} to final API response.`),s.AttachmentEntry=e.absEntry),console.timeEnd("2. [BACKEND] Total Invoice Create API Duration"),t.status(200).send(s)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(s){console.log("create Invoice: ",s?.response?.data||s.message),o(s)}finally{r&&wn.delete(r)}},EE=async(e,t,o,r)=>{try{return t.PaymentInvoices[0].DocEntry=e,Array.isArray(t.PaymentChecks)&&t.PaymentChecks.length>0&&(t.PaymentChecks[0].DueDate=Td(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")),await yd.createIncomingPayment(t,o)}catch(s){throw s}},AE=async(e,t,o,r)=>{let s=Td(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{return e.Reference=t,e.Reference2=o,e.TaxDate=s,e.DueDate=s,e.ReferenceDate=s,await uE.createJournalEntry(e,r)}catch(n){throw n}},IE=async(e,t,o,r)=>{try{let s=[];console.log("********* createSalesBatchSelection ****request: ",o);let n=await gd.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let l=await yE(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create Invoice: ",s?.response?.data||s.message),s}},DE=async(e,t,o)=>{try{if(e.body){if(typeof e.body.request=="string"){let d=JSON.parse(e.body.request);Object.assign(e.body,d)}let r={},s=await Bn(e),n,a=e.body;a.U_DeliveryStatus=a.U_DeliveryStatus||"DELIVERED",a.U_IsPaymentReceived=a.U_IsPaymentReceived||"Y",console.log("*************request: ",a);let l=await it.updateInvoice(a,s);(!l||l.status===200||l.DocEntry)&&(r.DocNum=a.DocNum,r.DocEntry=a.DocEntry,r.message=l.message,await hd(e,a.DocEntry,s)&&console.log("Attachment updated")),t.status(200).send(r)}else t.status(400).send({message:"Invalid Request. Missing 'invoice' property!"})}catch(r){console.log("create Invoice: ",r?.response?.data||r.message),o(r)}},hd=async(e,t,o)=>{try{if(!e.file)return null;let r=await it.createAttachmentEntry(e,o);return r?await it.linkAttachmentToDocument(Br.INVOICE,t,r,o):null}catch(r){console.log("updateAttach error: ",r?.response?.data||r.message)}};Cd.exports={create:fE,update:DE,updateAttach:hd}});var Ed=u((oO,fd)=>{var NE=require("../node_modules/express/index.js"),vn=Sd(),{portalModules:_n,permissions:Pn}=C(),{checkUserPermission:Mn}=L(),bE=xr(),vr=new NE.Router,{upload:Fn}=bE;vr.route("/").post(Mn([_n.INVOICE],Pn.CREATE),Fn.single("attachment"),vn.create);vr.route("/").patch(Mn([_n.INVOICE],Pn.WRITE),Fn.single("Attachment"),vn.update);vr.route("/attachment").patch(Mn([_n.INVOICE],Pn.WRITE),Fn.single("Attachment"),vn.updateAttach);fd.exports=vr});var Dd=u(Id=>{var{serviceLayerAPI:Ad}=j(),{portalModules:RE,serviceLayerApiURIs:OE}=C(),UE=RE.ITEM,xE=OE[UE];Id.createItem=async(e,t)=>{try{Ad.defaults.headers.Cookie=t;let o=await Ad.post(xE,e);return o.data?o.data:void 0}catch(o){throw console.log("Create Item Helper error: "+o),o}}});var bd=u((sO,Nd)=>{var{getSLConnection:LE}=X(),wE=Dd(),BE=async(e,t,o)=>{try{let r=await LE(e);console.log("*** Item request: "+JSON.stringify(e.body));let s=await wE.createItem(e.body,r);t.status(200).send({ItemCode:s.ItemCode})}catch(r){console.log("create Item: "+JSON.stringify(r)),o(r)}};Nd.exports={create:BE}});var Ud=u((lO,Od)=>{var vE=require("../node_modules/express/index.js"),_E=bd(),{portalModules:nO,permissions:aO}=C(),{checkUserPermission:iO}=L(),Rd=new vE.Router;Rd.route("/").post(_E.create);Od.exports=Rd});var xd=u(To=>{var{dbCreds:_r}=D();To.items=`SELECT T0."ItemCode", T0."ItemName", T0."FrgnName", T0."ItmsGrpCod", T0."ChapterID", T0."validFor",
    T0."ManBtchNum", T0."SellItem", T0."InvntItem",
    T0."PrchseItem", T0."OnHand", T0."IsCommited", T0."OnOrder", T0."SalUnitMsr", T0."BuyUnitMsr",
    T0."IUoMEntry", T0."PrdStdCst", T0."UserText", T0."InvntryUom",
    T0."U_SG1", T0."U_SG2", T0."U_SG3"
  FROM ${_r.CompanyDB}.OITM T0
    WHERE 1 = 1`;To.itemGroups=`SELECT T0."ItmsGrpCod" "ItemGroupCode", T0."ItmsGrpNam" "ItemGroupName"
    FROM ${_r.CompanyDB}.OITB T0`;To.itemSubGroups=`SELECT "FieldID", "FldValue" as "Value", "Descr" as "Description"
    FROM ${_r.CompanyDB}."UFD1"
  WHERE "TableID"='OITM'
    AND "FieldID" = ?`;To.itemMaxSequenceNo=`SELECT MAX(T0."U_SEQ") as "MaxNo" FROM ${_r.CompanyDB}.OITM T0`});var Ld=u(ho=>{var Pr=N(),Mr=xd(),{getAmmoFilter:PE}=Xo();ho.getItems=e=>{try{let t="",o=[],r="",s="";if(e?.pageNum&&e?.pageSize){let d=e.pageNum,i=e.pageSize,c=(d-1)*i,p=d*i;t=" LIMIT ? OFFSET ? ",o=[i,c]}if(e?.searchKey){let{searchKey:d}=e;isNaN(d)&&(d=d.toUpperCase()),r=` AND (
                  UPPER(T0."ItemCode") LIKE '%${d}%'
                    OR UPPER(T0."ItemName") LIKE '%${d}%'
                    OR UPPER(T0."FrgnName") LIKE '%${d}%' ) `}let n=PE(e.userSessionLog,!0,"T0"),a=Mr.items+r+n+s+t;return Pr.executeWithValues(a,o)}catch(t){throw console.log("getItems - controller - error: "+JSON.stringify(t.message)),t}};ho.getItemGroups=()=>{try{return Pr.executeWithValues(Mr.itemGroups,[])}catch(e){throw console.log("getItemGroups - controller - error: "+JSON.stringify(e.message)),e}};ho.getItemSubGroups=e=>{try{return Pr.executeWithValues(Mr.itemSubGroups,[e])}catch(t){throw console.log("getItemSubGroups - controller - error: "+JSON.stringify(t.message)),t}};ho.getMaxSequenceNo=()=>{try{let e=Pr.executeWithValues(Mr.itemMaxSequenceNo,[]);return console.log("getItemGroups-: "+JSON.stringify(e)),Array.isArray(e)&&e.length>0?e[0].MaxNo:0}catch(e){throw console.log("getMaxSequenceNo - controller - error: "+JSON.stringify(e.message)),e}}});var wd=u(Co=>{var Fr=Ld();Co.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Fr.getItems({...e.query,userSessionLog:e.session.userSessionLog});t.send(r)}catch(r){console.log("getInvoice - controller - error: "+JSON.stringify(r.message)),o(r)}};Co.getGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Fr.getItemGroups();t.send(r)}catch(r){console.log("getGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Co.getSubGroups=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params.subGroupId));try{let r=Fr.getItemSubGroups(e.params.subGroupId);t.send(r)}catch(r){console.log("getSubGroups - controller - error: "+JSON.stringify(r.message)),o(r)}};Co.getNextNo=(e,t,o)=>{try{let r=1,s=Fr.getMaxSequenceNo();isNaN(parseInt(s))||(r=parseInt(s)+1),t.send({nextNumber:r})}catch(r){console.log("getNextNo - controller - error: "+JSON.stringify(r.message)),o(r)}}});var vd=u((gO,Bd)=>{var ME=require("../node_modules/express/index.js"),So=new ME.Router,$r=wd(),{checkUserPermission:pO}=L(),{portalModules:mO,permissions:yO}=C();So.route("/").get($r.get);So.route("/next-number").get($r.getNextNo);So.route("/groups").get($r.getGroups);So.route("/sub-groups/:subGroupId").get($r.getSubGroups);Bd.exports=So});var _d=u($n=>{var{dbCreds:Wr}=D();$n.stockTransferRequest=`SELECT T0."DocNum", T0."DocNum" as "DocEntry", T0."DocEntry" as "ActualDocEntry", T0."DocDate", T0."Comments",
    T0."U_DraftStatus", T0."U_OriginatorId", T1."U_NAME" as "Originator", T0."Filler" "FromWarehouse",
    T0."ToWhsCode", T0."U_ToBinLocation", T0."BPLName", T0."SlpCode" "SalesPersonCode", T0."U_Location"
      FROM ${Wr.CompanyDB}.OWTQ T0, ${Wr.CompanyDB}.OUSR T1
    WHERE T0."UserSign" = T1."USERID"`;$n.itemListForSTR=`SELECT T1."DocEntry", T1."LineNum", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity",
    T1."unitMsr" AS "InvntryUom", T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_ToBinLocation",
    T1."U_FromBinLoc"
  FROM ${Wr.CompanyDB}.WTQ1 T1, ${Wr.CompanyDB}.OWTQ T0
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `});var Fd=u(Wn=>{var Pd=N(),{buildHeaderRecQuery:FE,buildRowLevelQuery:$E}=we(),Md=_d();Wn.getStockTransferRequest=e=>{try{let t=FE(Md.stockTransferRequest,e);return console.log("getStockTransferRequest- sql: ",t),Pd.executeWithValues(t)}catch(t){throw console.log("getStockTransferRequest - controller - error: "+JSON.stringify(t.message)),t}};Wn.getItemDetails=e=>{try{let t=$E(Md.itemListForSTR,e);return{itemsList:Pd.executeWithValues(t,[])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Wd=u(kn=>{var $d=Fd();kn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=$d.getStockTransferRequest(e.query);t.send(r)}catch(r){console.log("getStockTransferRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};kn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=$d.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Jd=u((SO,Hd)=>{var WE=require("../node_modules/express/index.js"),Hn=new WE.Router,kd=Wd(),{checkUserPermission:kr}=L(),{portalModules:Hr,permissions:Jr}=C();Hn.route("/").get(kr(Hr.STOCK_TRANSFER_REQUEST,Jr.READ)||kr(Hr.STOCK_TRANSFER,Jr.CREATE),kd.get);Hn.route("/items").get(kr(Hr.STOCK_TRANSFER_REQUEST,Jr.READ)||kr(Hr.STOCK_TRANSFER,Jr.CREATE),kd.getItems);Hd.exports=Hn});var qd=u(qe=>{var{dbCreds:z}=D();qe.salesQuotationQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocDueDate",
    T0."CardCode", T0."CardName", T0."NumAtCard",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."VatSum", T0."VatPercent", T0."GroupNum" "PaymentTermCode", T0."SlpCode" "SalesPersonCode",
    T2."SlpName" "SalesPersonName",
    T0."Address2" "ShipTo", T0."U_CODEmail", T0."U_CODCntName", T0."U_CODTlePhone", T0."U_Location",
    T0."CntctCode" "ContactPersonCode", T0."U_IsReprinted"
      FROM ${z.CompanyDB}.OQUT T0, ${z.CompanyDB}.QUT1 T1, ${z.CompanyDB}.OSLP T2
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;qe.itemListForSalesQuotation=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."FreeTxt" "FreeText", TO_VARCHAR(T1."U_DocNum") AS "BundleNo", T1."U_TallySheet", 
    T1."Quantity", T1."OpenQty", T1."Price", T1."DiscPrcnt" "DiscountPercent", T1."unitMsr" "UomCode", T1."VatGroup",
    T1."WhsCode", T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."PriceBefDi" "PriceBeforDiscount",
    (SELECT E."ItmsGrpNam" FROM  ${z.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod"=ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod", ITM."ManSerNum", ITM."ManBtchNum",
    ITM."U_FCCC" AS "FCCCItem",
    CASE 
      WHEN EXISTS (
        SELECT 1 
          FROM ${z.CompanyDB}.SPP1 P WHERE P."ItemCode" = T1."ItemCode" 
            AND CURRENT_DATE >= P."FromDate" AND CURRENT_DATE <= P."ToDate" 
              AND (P."CardCode" = T0."CardCode" OR P."CardCode" = '*1')
      ) THEN 'Y'
      ELSE 'N'
      END AS "DiscApplied"
  FROM ${z.CompanyDB}.OQUT T0
    INNER JOIN ${z.CompanyDB}.QUT1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${z.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;qe.updateSQSalesBatchSelectionDocNum=`UPDATE ${z.CompanyDB}.QUT1 T1 SET
    T1."U_TallySheet" = ?
  WHERE T1."DocEntry" = ? AND T1."ItemCode" = ?`;qe.updateSalesQuotationReprintStatus=`UPDATE ${z.CompanyDB}.OQUT T0 SET
  T0."U_IsReprinted" = 'Y'
WHERE T0."DocEntry" = ?`;qe.buildTimberTallyItemsQuery=(e,t)=>{let o=`SELECT 
    MAX(T1."ItemCode") AS "ItemCode",
    T0."Code" AS "U_Length",
    MAX(IFNULL(T1."BHeight1", 1)) AS "U_Height",
    MAX(IFNULL(T1."BWidth1", 1)) AS "U_Width",
    MAX(T2."BinAbsEntry") AS "BinAbsEntry",
    MAX(T2."BinCode") AS "BinCode",
    SUM(IFNULL(T2."U_AvlPcs", 0)) AS "U_AvlPcs",
    SUM(IFNULL(T2."U_AvlQty", 0)) AS "U_AvlQty"
FROM ${z.CompanyDB}."@LENGTHMASTER" T0
LEFT JOIN ${z.CompanyDB}.OITM T1 ON T1."ItemCode" = ?
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
    FROM ${z.CompanyDB}."OBTN" T0
    LEFT JOIN ${z.CompanyDB}."OBTQ" T1 ON T0."SysNumber" = T1."SysNumber" AND T0."ItemCode" = T1."ItemCode"
    LEFT JOIN ${z.CompanyDB}."OBBQ" B ON T0."AbsEntry" = B."SnBMDAbs" AND T0."ItemCode" = B."ItemCode" AND B."OnHandQty" > 0 AND T1."WhsCode" = B."WhsCode"
    LEFT JOIN ${z.CompanyDB}."OBIN" C ON B."BinAbs" = C."AbsEntry" AND B."WhsCode" = C."WhsCode"
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
ORDER BY CAST(T0."Code" AS DOUBLE) ASC`,o};qe.tallySheetRowsQuery=`SELECT T0."LineId", T0."U_Length", T0."U_Width", T0."U_Height", T0."U_Pieces" AS "U_NoOfPcs", T0."U_Qty" FROM ${z.CompanyDB}."@TSH1" T0 WHERE T0."DocEntry" = ?`;qe.getUniqueId=`SELECT T0."DocNum", T0."DocEntry" 
    FROM ${z.CompanyDB}.OQUT T0
  WHERE T0."U_POS_TransactionID" = ?`});var Jn=u(dt=>{var lt=N(),{buildHeaderRecQuery:kE,buildRowLevelQuery:HE}=we(),ct=qd();dt.getSalesQuotation=e=>{try{let t=kE(ct.salesQuotationQuery,e);return console.log("getSalesQuotation- sql: ",t),lt.executeWithValues(t)}catch(t){throw console.log("getSalesQuotation - controller - error: "+JSON.stringify(t.message)),t}};dt.getItemDetails=e=>{try{let t=HE(ct.itemListForSalesQuotation,e),o=lt.executeWithValues(t,[]);return o.forEach(r=>{if(r.U_TallySheet){let s=ct.tallySheetRowsQuery,n=lt.executeWithValues(s,[r.U_TallySheet]);Array.isArray(n)&&n.length>0&&(r.timberTallyRows=n,r.timberTally=[{TSH1Collection:n}])}}),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};dt.updateSQSalesBatchSelection=(e,t)=>{try{if(console.log("updateSQSalesBatchSelection %s",e.DocNum,t,e.U_ItemCode),e){let o=lt.executeWithValues(ct.updateSQSalesBatchSelectionDocNum,[e.DocNum,t,e.U_ItemCode]);return console.log("updateSQSalesBatchSelection %s",JSON.stringify(o)),!0}return null}catch(o){throw console.log("updateSQSalesBatchSelection - helper - error: "+JSON.stringify(o.message)),o}};dt.updateReprint=e=>{try{if(e){let t=lt.executeWithValues(ct.updateSalesQuotationReprintStatus,[e]);return console.log("updateSalesQuotationReprintStatus %s",JSON.stringify(t)),!0}return null}catch(t){throw console.log("SalesQuotationReprintStatus - helper - error: "+JSON.stringify(t.message)),t}};dt.getTimberTallyItems=e=>{try{let{itemCode:t,whsCode:o,binCode:r}=e;console.log("binCode from req:",r);let s=ct.buildTimberTallyItemsQuery(o,r),n=[t,t];o&&n.push(o),r&&n.push(r),console.log("getTimberTallyItems - params: ",n);let a=lt.executeWithValues(s,n);return console.log("getTimberTallyItems - rows returned: ",a?.length||0),a&&a.length>0&&console.log("getTimberTallyItems - results sample: ",JSON.stringify(a[0])),a&&a.length>0&&a[0].U_AvlPcs==="0"&&console.log("DEBUG - Found zero pieces. Row sample:",JSON.stringify(a.find(l=>l.U_AvlPcs!=="0")||a[0])),a}catch(t){throw console.log("getTimberTallyItems - helper - error: "+JSON.stringify(t.message)),t}};dt.getUniqueId=e=>{try{let t=ct.getUniqueId,o=lt.executeWithValues(t,[e]);return o&&o.length>0?o[0]:null}catch(t){throw console.log("getUniqueId - helper - error: "+JSON.stringify(t.message)),t}}});var Gd=u(fo=>{var qr=Jn();fo.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=qr.getSalesQuotation(e.query);t.send(r)}catch(r){console.log("getSalesQuotation - controller - error: "+JSON.stringify(r.message)),o(r)}};fo.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=qr.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}};fo.updateReprint=(e,t,o)=>{console.log("updateSalesQuotationReprint - body: "+JSON.stringify(e.body));let{DocEntry:r}=e.body;try{let s=qr.updateReprint(r);t.send({message:"Sales Quotation Reprint Status Updated Successfully",success:!0})}catch(s){console.log("updateSalesQuotationReprint - controller - error: "+JSON.stringify(s.message)),o(s)}};fo.getTimberTallyItems=(e,t,o)=>{console.log("getTimberTallyItems - query: "+JSON.stringify(e.query));try{let r=qr.getTimberTallyItems(e.query);t.send(r)}catch(r){console.log("getTimberTallyItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var zd=u((IO,jd)=>{var JE=require("../node_modules/express/index.js"),Eo=new JE.Router,Gr=Gd(),{checkUserPermission:jr}=L(),{portalModules:zr,permissions:Vr}=C();Eo.route("/").get(jr(zr.SALES_QUOTATION,Vr.READ),Gr.get);Eo.route("/items").get(jr(zr.SALES_QUOTATION,Vr.READ),Gr.getItems);Eo.route("/timber-tally-items").get(jr(zr.SALES_QUOTATION,Vr.READ),Gr.getTimberTallyItems);Eo.route("/reprint").patch(jr(zr.SALES_QUOTATION,Vr.READ),Gr.updateReprint);jd.exports=Eo});var Vd=u(Ao=>{var{serviceLayerAPI:Ge}=j(),{portalModules:qE,serviceLayerApiURIs:GE}=C(),jE=qE.SALES_QUOTATION,Qr=GE[jE];Ao.createSalesQuotation=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** SalesQuotation request: "+JSON.stringify(e)),Ge.defaults.headers.Cookie=t;let o=await Ge.post(Qr,e);return console.log(`Create SalesQuotation response: ${JSON.stringify(o.data.DocNum)}`),o.data?o.data:void 0}catch(o){throw console.log("Create SalesQuotation error: "+o),o}};Ao.updateSalesQuotation=async(e,t)=>{try{return console.log("*** SalesQuotation update request: "+JSON.stringify(e)),Ge.defaults.headers.Cookie=t,!!await Ge.patch(`${Qr}(${e.DocEntry})`,e)}catch(o){throw console.log("update SalesQuotation error: "+o),o}};Ao.getSalesQuotation=async(e,t)=>{try{console.log("*** SalesQuotation get request: "+JSON.stringify(e)),Ge.defaults.headers.Cookie=t;let o=await Ge.get(`${Qr}(${e})`);return o?o.data:null}catch(o){throw console.log("get SalesQuotation error: "+o),o}};Ao.putSalesQuotation=async(e,t,o)=>{try{return console.log("*** SalesQuotation put request: "+JSON.stringify(t)),Ge.defaults.headers.Cookie=o,!!await Ge.put(`${Qr}(${e})`,t)}catch(r){throw console.log("put SalesQuotation error: "+r),r}}});var Yd=u(qn=>{var{serviceLayerAPI:Yr}=j(),{portalModules:zE}=C(),Qd=zE.OTSH;qn.createTimberTally=async(e,t,o,r)=>{let s=Array.isArray(e)?e:[e];console.log("*** Timber Tally helper requests count: "+s.length);let n=[];for(let a of s)try{console.log("*** Timber Tally POST payload: "+JSON.stringify(a,null,2)),Yr.defaults.headers.Cookie=r;let l=await Yr.post(Qd,a),{DocNum:d,DocEntry:i,U_ItemCode:c}=l.data;console.log("*** Timber Tally response:**** "+JSON.stringify(l.data)),n.push({DocNum:d,DocEntry:i,U_ItemCode:c})}catch(l){console.error(`Error creating OTSH record for item ${a.U_ItemCode}:`,l.response?.data?.error?.message?.value||l.message)}return n};qn.updateTimberTally=async(e,t)=>{try{return Yr.defaults.headers.Cookie=t,(await Yr.patch(`${Qd}(${e.DocEntry})`,e)).data}catch(o){throw console.log("Update Timber Tally error: "+o.response?.data?.error?.message?.value||o.message),o}}});var Zd=u((bO,Xd)=>{var{getSLConnection:Kr,invalidateSLCache:Kd}=X(),Io=Vd(),jn=go(),zn=Yd(),{enableFircaIntegration:VE,objectCodes:QE,portalModules:YE,enableStoreBasedNumbering:KE}=C(),{submitInvoicetoFirca:XE}=Or(),{updateSQSalesBatchSelection:Vn,getUniqueId:ZE}=Jn(),{getNumberingSeries:eA}=fr(),Gn=new Map,tA=async(e,t,o)=>{let r=null;try{if(r=e.body.Unique,r){if(Gn.has(r))return console.error(`[BACKEND] Concurrent request detected for Quotation UniqueID: ${r}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});Gn.set(r,!0);let i=await ZE(r);if(i&&i.DocNum)return console.log(`[BACKEND] Sales Quotation with UniqueID ${r} already exists: DocNum ${i.DocNum}`),t.status(200).send({docNum:i.DocNum,isExist:!0})}let s="",n=e.body.CompanyCode?e.body.CompanyCode:"",a=parseFloat(e.session.userSessionLog?.salesDisc||0);if(Array.isArray(e.body.DocumentLines))for(let i of e.body.DocumentLines){let c=parseFloat(i.DiscountPercent||0);if(c>a)return console.error(`[BACKEND] Discount Limit Violation: Item ${i.ItemCode} has ${c}% but user only allowed ${a}%`),t.status(400).send({message:`Discount Limit is Exceeded: ${a}% (Item: ${i.ItemCode})`})}if(KE){let i=await eA(QE[YE.SALES_QUOTATION],e.session.userSessionLog.storeLocation);i&&(console.log("seriesResponse series:",i.Series),e.body.Series=i.Series)}let l=await Kr(e),d;try{d=await Io.createSalesQuotation(e.body,l)}catch(i){if(i?.response?.status===401)console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),Kd(e),l=await Kr(e),d=await Io.createSalesQuotation(e.body,l);else throw i}if(d.DocNum&&(s=d.DocNum,VE)){let i=await XE(d.DocEntry,n,"SalesQuotation")}if(Array.isArray(e.body.salesBatchSelection)&&e.body.salesBatchSelection.length>0){let i=await oA(d.DocEntry,d.DocNum,e.body.salesBatchSelection,l)}if(Array.isArray(e.body.timberTally)&&e.body.timberTally.length>0)for(let i of e.body.timberTally){let c=await sA(d.DocEntry,d.DocNum,[i],l);if(c&&c.length>0&&c[0]){let p=c[0],y=p.U_ItemCode||i.U_ItemCode;console.log(`[TimberTally] Linking Tally DocNum ${p.DocNum} to SQ DocEntry ${d.DocEntry} for item ${y}`),await Vn({...p,U_ItemCode:y},d.DocEntry)}}t.status(200).send({docNum:s})}catch(s){console.log("create SalesQuotation Controller: ",s?.response?.data||s.message),o(s)}finally{r&&Gn.delete(r)}},oA=async(e,t,o,r)=>{try{let s=[],n=await jn.createSalesBatchSelection(o,e,t,r);return n.length>0&&(n.forEach(async a=>{let l=await Vn(a,e)}),s.push(n.DocNum)),s}catch(s){throw console.log("create SalesQuotation SalesBatchSelection: ",s?.response?.data||s.message),s}},rA=async(e,t,o)=>{try{let r=await Kr(e),s=async a=>{try{return await a(r)}catch(l){if(l?.response?.status===401)return console.log("*** 401 Unauthorized from SL - Invalidating cache and retrying..."),Kd(e),r=await Kr(e),await a(r);throw l}};if(e.body.ItemsDeleted&&e.body.ItemsDeleted.length>0)try{console.log("Sales Quotation delete in Service Layer.",e.body.ItemsDeleted);let{DocEntry:a}=e.body;console.log(`Processing deletion of line items from Quotation ${a}:`,JSON.stringify(e.body.ItemsDeleted));let l=await s(c=>Io.getSalesQuotation(a,c));if(console.log("Fetched Quotation for update:",JSON.stringify(l)),!l||!l.DocumentLines)throw console.log("Fetched Quotation Error: ",JSON.stringify(l)),new Error("Quotation not found or invalid structure");let d=e.body.ItemsDeleted.map(c=>c.LineNum);l.DocumentLines=l.DocumentLines.filter(c=>!d.includes(c.LineNum)),console.log("Quotation after removing deleted lines:",JSON.stringify(l));let i=await s(c=>Io.putSalesQuotation(a,l,c));if(console.log("PUT Result after deleting lines:",i),!i)throw new Error("Failed to update quotation after deleting lines");console.log(`Deleted line items [${d}] successfully from Quotation ${a}`)}catch(a){throw console.error("Error while deleting line items:",a.message),a}if(console.log("Performing Sales Quotation Patch operation."),await s(a=>Io.updateSalesQuotation(e.body,a))){let{salesBatchSelection:a}=e.body;if(Array.isArray(a)&&a.length>0){let d=await Promise.all(a.map(i=>i.DocEntry?s(c=>jn.updateSalesBatchSelection(i,c)):s(c=>jn.createSalesBatchSelection(i,"",e.body.DocNum,c))))}let{timberTally:l}=e.body;if(Array.isArray(l)&&l.length>0){let d=await Promise.all(l.map(async i=>{if(i.DocEntry)return s(c=>zn.updateTimberTally(i,c));{let c=await s(p=>zn.createTimberTally(i,e.body.DocEntry,e.body.DocNum,p));if(c&&c.length>0&&c[0]){let p=c[0],y=p.U_ItemCode||i.U_ItemCode;console.log(`[TimberTally-Update] Linking Tally DocNum ${p.DocNum} to SQ DocEntry ${e.body.DocEntry} for item ${y}`),await Vn({...p,U_ItemCode:y},e.body.DocEntry)}return c}}))}t.status(200).send({docNum:e.body.DocNum})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("Update SalesQuotation Controller: ",r?.response?.data||r.message),o(r)}},sA=async(e,t,o,r)=>{try{return await zn.createTimberTally(o,e,t,r)||[]}catch(s){throw console.log("create SalesQuotation TimberTally Error: ",s?.response?.data||s.message),s}};Xd.exports={create:tA,update:rA}});var nu=u((RO,su)=>{var nA=require("../node_modules/express/index.js"),eu=Zd(),{portalModules:tu,permissions:ou}=C(),{checkUserPermission:ru}=L(),Qn=new nA.Router;Qn.route("/").post(ru([tu.SALES_QUOTATION],ou.CREATE),eu.create);Qn.route("/").patch(ru(tu.SALES_QUOTATION,ou.WRITE),eu.update);su.exports=Qn});var au=u(Xr=>{var{dbCreds:je}=D(),{draftObjectCodes:OO}=C();Xr.saleOrderQuery=`SELECT DISTINCT T0."BPLId", T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."DocType", 
    T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
      FROM ${je.CompanyDB}.ORDR T0, ${je.CompanyDB}.RDR1 T1
    WHERE T0."DocType" = 'I'
      AND T0."DocEntry" = T1."DocEntry"`;Xr.itemListForSaleOrder=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", T1."PriceBefDi" "UnitPrice",
    T1."OpenCreQty" as "Quantity", T1."OpenQty", T1."WhsCode", T1."unitMsr" "UomCode",
    ITM."ManBtchNum", ITM."ManSerNum",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."Project"
  FROM ${je.CompanyDB}.ORDR T0
    INNER JOIN ${je.CompanyDB}.RDR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${je.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;Xr.freightInfo=`SELECT T0."DocNum", T0."DocEntry", T1."LineNum", T1."ExpnsCode" as "FreightCode",
  F."ExpnsName" "FreightName", (T1."LineTotal"-T1."PaidSys") "FreightAmount",
  (T1."TotalFrgn"-T1."PaidFC") as "FreightAmountFC"
    FROM ${je.CompanyDB}."ORDR" T0, ${je.CompanyDB}."RDR3" T1, ${je.CompanyDB}.OEXD F
  WHERE T0."DocEntry" = T1."DocEntry"
    AND T1."ExpnsCode" = F."ExpnsCode"
    AND T1."Status" = 'O'
    AND T0."DocNum" IN `});var iu=u(Xn=>{var Yn=N(),{buildHeaderRecQuery:aA,buildRowLevelQuery:iA}=we(),Kn=au();Xn.getSaleOrders=e=>{try{let t=aA(Kn.saleOrderQuery,e);return console.log("getSalesQuotation- sql: ",t),Yn.executeWithValues(t)}catch(t){throw console.log("getSaleOrders - controller - error: "+JSON.stringify(t.message)),t}};Xn.getItemDetails=e=>{try{let t=iA(Kn.itemListForSaleOrder,e),o=Yn.executeWithValues(t),r=Yn.executeWithValues(Kn.freightInfo+`(${docNum})`,[]);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o,freightInfo:r}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var cu=u(Zn=>{var lu=iu();Zn.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=lu.getSaleOrders(e.query);t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};Zn.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=lu.getItemDetails(e.query);console.log("getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var pu=u((wO,uu)=>{var lA=require("../node_modules/express/index.js"),ea=new lA.Router,du=cu();ea.route("/").get(du.get);ea.route("/items").get(du.getItems);uu.exports=ea});var yu=u(mu=>{var cA=N(),dA=co();mu.getTaxDefinition=()=>{try{return cA.executeWithValues(dA.selectTaxInfo)}catch(e){throw console.log("getTaxDefinition - controller - error: "+JSON.stringify(e.message)),e}}});var Tu=u(gu=>{var uA=yu();gu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=uA.getTaxDefinition();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Su=u((FO,Cu)=>{var pA=require("../node_modules/express/index.js"),hu=new pA.Router,mA=Tu(),{checkUserPermission:_O}=L(),{portalModules:PO,permissions:MO}=C();hu.route("/").get(mA.get);Cu.exports=hu});var Au=u(Eu=>{var fu=tn();Eu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r,s;r=e.query.userCode??"",s=e.query.storeLocation??"";let n=[];n=fu.getSalesEmployees(s,r),Array.isArray(n)&&n.length===0&&(n=fu.getSalesEmployees(s,"")),t.send(n)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Nu=u((WO,Du)=>{var yA=require("../node_modules/express/index.js"),Iu=new yA.Router,gA=Au();Iu.route("/").get(gA.get);Du.exports=Iu});var Ru=u(bu=>{var TA=so();bu.getSalesEmployee=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=TA.getSalesEmployeeForUser(e.query.userId);t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var xu=u((HO,Uu)=>{var hA=require("../node_modules/express/index.js"),Ou=new hA.Router,CA=Ru();Ou.route("/sales-employee").get(CA.getSalesEmployee);Uu.exports=Ou});var wu=u(Lu=>{var SA=N(),fA=co();Lu.getPaymentTerms=()=>{try{return SA.executeWithValues(fA.selectPaymentTerms)}catch(e){throw console.log("getPaymentTerms - controller - error: "+JSON.stringify(e.message)),e}}});var vu=u(Bu=>{var EA=wu();Bu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=EA.getPaymentTerms();t.send(r)}catch(r){console.log("get Tax - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Mu=u((GO,Pu)=>{var AA=require("../node_modules/express/index.js"),_u=new AA.Router,IA=vu();_u.route("/").get(IA.get);Pu.exports=_u});var $u=u(Fu=>{var DA=N(),NA=co();Fu.getBanks=()=>{try{return DA.executeWithValues(NA.selectBankInfo)}catch(e){throw console.log("getBanks - controller - error: "+JSON.stringify(e.message)),e}}});var ku=u(Wu=>{var bA=$u();Wu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=bA.getBanks();t.send(r)}catch(r){console.log("get Banks - controller - error: "+JSON.stringify(r.message)),o(r)}}});var qu=u((VO,Ju)=>{var RA=require("../node_modules/express/index.js"),Hu=new RA.Router,OA=ku();Hu.route("/").get(OA.get);Ju.exports=Hu});var ju=u(Gu=>{var UA=io();Gu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=UA.getLocations();t.send(r)}catch(r){console.log("get Locations - controller - error: "+JSON.stringify(r.message)),o(r)}}});var Qu=u((YO,Vu)=>{var xA=require("../node_modules/express/index.js"),zu=new xA.Router,LA=ju();zu.route("/").get(LA.get);Vu.exports=zu});var Ku=u(Yu=>{var wA=N(),{dbCreds:Zr}=D();Yu.getWarehouses=e=>{try{let t=[],o=`SELECT T0."WhsCode", T0."WhsName", T1."BinCode", T1."AbsEntry" "BinAbsEntry", T0."Location" "LocationCode",
        T2."Location" "LocationName", T0."U_GITWH" "GitWHCode"
      FROM ${Zr.CompanyDB}.OWHS T0
        LEFT OUTER JOIN ${Zr.CompanyDB}.OBIN T1 ON T0."DftBinAbs" = T1."AbsEntry"
        INNER JOIN ${Zr.CompanyDB}.OLCT T2 ON T0."Location" = T2."Code"`,r=` WHERE T0."Inactive" ='N'`;e.branchId&&(o=o+` INNER JOIN ${Zr.CompanyDB}.OBPL T3 ON T0."BPLid" = T3."BPLId"`,r=r+' AND T0."BPLid" = ?',t.push(e.branchId)),e.locationCode&&(r=r+' AND T0."Location" = ?',t.push(e.locationCode));let s=' ORDER BY T0."WhsCode"';return wA.executeWithValues(o+r+s,t)}catch(t){throw console.log("getWarehouses - error: "+JSON.stringify(t)),t}}});var Zu=u(Xu=>{var BA=Ku();Xu.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=BA.getWarehouses(e.query);t.send(r)}catch(r){console.log("get WHs - controller - error: "+JSON.stringify(r.message)),o(r)}}});var op=u((ZO,tp)=>{var vA=require("../node_modules/express/index.js"),ep=new vA.Router,_A=Zu();ep.route("/").get(_A.get);tp.exports=ep});var sp=u((eU,rp)=>{var{dbCreds:Y}=D(),PA=`SELECT T0."CardCode", T0."CardName", T0."Cellular", T0."U_OneTimeCustomer", T0."U_COD", T0."U_Fin_Status",
    T0."U_CustomerType",
    T0."CreditLine" as "CreditLimit", T0."CreditLine" - (T0."Balance" + T0."DNotesBal") as "AvailableBalance",
    T0."SlpCode" "SalesEmployeeCode", T0."LicTradNum"
  FROM ${Y.CompanyDB}.OCRD T0
WHERE T0."CardType" ='C'`,MA=`SELECT T0."CardCode", T1."AdresType", T1."Address", T1."Building", T1."Street",
  T1."City", T1."LicTradNum", T1."Block"
FROM ${Y.CompanyDB}.OCRD T0
  INNER JOIN ${Y.CompanyDB}.CRD1 T1 ON T0."CardCode" = T1."CardCode"
WHERE T1."AdresType" = 'S'
  AND T0."CardCode" = ?`,FA=`SELECT T0."CardCode", T0."Name", T0."CntctCode" AS "ContactCode" FROM ${Y.CompanyDB}.OCPR T0
  WHERE T0."CardCode" = ?`,$A=`SELECT "Price", "FromDate", "ToDate"
  FROM ${Y.CompanyDB}.SPP1
  WHERE "ItemCode" = ?
    AND "CardCode" = ?
    AND "FromDate" <= CURRENT_DATE
    AND IFNULL("ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,WA=`SELECT B."Price", A."FromDate", A."ToDate"
  FROM ${Y.CompanyDB}.SPP1 A
  INNER JOIN ${Y.CompanyDB}."ITM1" B
    ON A."ItemCode" = B."ItemCode"
            AND A."ListNum" = B."PriceList"
  WHERE A."ItemCode" = ?
    AND A."CardCode" = '*1'
    AND A."FromDate" <= CURRENT_DATE
    AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
  LIMIT 1`,kA=`SELECT T2."Price", CURRENT_DATE as "FromDate", CURRENT_DATE as "ToDate"
  FROM ${Y.CompanyDB}."OWHS" T0
    INNER JOIN ${Y.CompanyDB}."OBPL" T1
      ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${Y.CompanyDB}."ITM1" T2
      ON T1."U_PrcList" = T2."PriceList"
    WHERE T0."WhsCode" = ?
      AND T2."ItemCode" = ?
  LIMIT 1`,HA=`SELECT "Price", "ItemCode", "CardCode", "WhsCode"
FROM (
    SELECT S1."Price", S1."ItemCode", S1."CardCode", 'S101' AS "WhsCode", 1 AS "Priority"
    FROM ${Y.CompanyDB}."SPP1" S1
    WHERE S1."FromDate" <= CURRENT_DATE AND IFNULL(S1."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT B."Price", A."ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 2 AS "Priority"
    FROM ${Y.CompanyDB}."SPP1" A
    INNER JOIN ${Y.CompanyDB}."ITM1" B ON A."ItemCode" = B."ItemCode" AND A."ListNum" = B."PriceList"
    WHERE A."CardCode" = '*1' AND A."FromDate" <= CURRENT_DATE AND IFNULL(A."ToDate", '2999-12-31') >= CURRENT_DATE
    
    UNION ALL
    
    SELECT T2."Price", T2."ItemCode", 'C4290' AS "CardCode", T0."WhsCode", 3 AS "Priority"
    FROM ${Y.CompanyDB}."OWHS" T0
    INNER JOIN ${Y.CompanyDB}."OBPL" T1 ON T0."BPLid" = T1."BPLId"
    INNER JOIN ${Y.CompanyDB}."ITM1" T2 ON T1."U_PrcList" = T2."PriceList"
    
    UNION ALL
    
    SELECT "Price", "ItemCode", 'C4290' AS "CardCode", 'S101' AS "WhsCode", 4 AS "Priority"
    FROM ${Y.CompanyDB}."ITM1"
    WHERE "PriceList" = 1
)
WHERE "ItemCode" = ? 
  AND "CardCode" = ?
  AND "WhsCode" = ?
ORDER BY "Priority" ASC
LIMIT 1`;rp.exports={selectCustomerInfo:PA,selectCustomerAddress:MA,selectCustomerContactPerson:FA,selectCustomerSpecialPrice1:$A,selectCustomerSpecialPrice2:WA,selectCustomerSpecialPrice3:kA,selectCustomerSpecialPriceNew:HA}});var np=u(Do=>{var Ft=N(),$t=sp();Do.getCustomerInfo=e=>{let t=$t.selectCustomerInfo;e?.searchKey&&(t+=` AND (UPPER(T0."CardCode") LIKE UPPER('%${e.searchKey}%')
             OR UPPER(T0."CardName") LIKE UPPER('%${e.searchKey}%')
             OR T0."Cellular" LIKE '%${e.searchKey}%')`),e?.oneTimeCustomer==="Y"&&(t+=` AND T0."U_OneTimeCustomer" = 'Y'`);try{let o=Ft.executeWithValues(t,[]);return Array.isArray(o)&&o.length>0?e?.oneTimeCustomer==="Y"?o[0]:o:[]}catch(o){throw o}};Do.getCustomerAddress=e=>{try{let t=Ft.executeWithValues($t.selectCustomerAddress,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};Do.getCustomerContactPerson=e=>{try{let t=Ft.executeWithValues($t.selectCustomerContactPerson,[e]);return Array.isArray(t)&&t.length>0?t:[]}catch(t){throw t}};Do.getCustomerSpecialPrice=(e,t,o)=>{try{let r=Ft.executeWithValues($t.selectCustomerSpecialPrice1,[t,e]);if(Array.isArray(r)&&r.length>0)return r[0];let s=Ft.executeWithValues($t.selectCustomerSpecialPrice2,[t]);if(Array.isArray(s)&&s.length>0)return s[0];let n=Ft.executeWithValues($t.selectCustomerSpecialPrice3,[o,t]);return Array.isArray(n)&&n.length>0?n[0]:""}catch(r){throw r}}});var ap=u(No=>{var{getCustomerInfo:JA,getCustomerAddress:qA,getCustomerContactPerson:GA,getCustomerSpecialPrice:jA}=np();No.get=(e,t,o)=>{console.log("*** getCustomerInfo - req.query: "+JSON.stringify(e.query));try{let r=JA(e.query);console.log("getCustomerInfo %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getCustomerInfo - controller - error: "+JSON.stringify(r)),o(r)}};No.getAddress=(e,t,o)=>{console.log("*** getAddress - req.params: "+JSON.stringify(e.params));try{let r=qA(e.params.cardCode);t.send(r)}catch(r){console.log("getAddress - controller - error: "+JSON.stringify(r)),o(r)}};No.getContactPerson=(e,t,o)=>{console.log("*** getContactPerson - req.params: "+JSON.stringify(e.params));try{let r=GA(e.params.cardCode);console.log("getContactPerson %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getContactPerson - controller - error: "+JSON.stringify(r)),o(r)}};No.getSpecialPrice=(e,t,o)=>{console.log("*** getSpecialPrice - req.params: "+JSON.stringify(e.params)),console.log("*** getSpecialPrice - req.query: "+JSON.stringify(e.query));try{let r=jA(e.params.cardCode,e.query.itemCode,e.query.warehouseCode);console.log("getSpecialPrice %s",JSON.stringify(r)),t.send(r)}catch(r){console.log("getSpecialPrice - controller - error: "+JSON.stringify(r)),o(r)}}});var lp=u((rU,ip)=>{var zA=require("../node_modules/express/index.js"),bo=new zA.Router,es=ap();bo.route("/").get(es.get);bo.route("/:cardCode/address").get(es.getAddress);bo.route("/:cardCode/contact-person").get(es.getContactPerson);bo.route("/:cardCode/special-price").get(es.getSpecialPrice);ip.exports=bo});var cp=u(ts=>{var{dbCreds:ut}=D();ts.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${ut.CompanyDB}.ORIN T0, ${ut.CompanyDB}.RIN1 T1, ${ut.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;ts.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal"
  FROM ${ut.CompanyDB}.ORIN T0
    INNER JOIN ${ut.CompanyDB}.RIN1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${ut.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;ts.getUniqueId=`SELECT T0."DocNum", T0."DocEntry"
    FROM ${ut.CompanyDB}.ORIN T0 
  WHERE T0."U_POS_TransactionID" = ?`});var ra=u(os=>{var ta=N(),{buildHeaderRecQuery:VA,buildRowLevelQuery:QA}=we(),oa=cp();os.getCreditMemo=e=>{try{let t=VA(oa.creditMemoQuery,e);return console.log("getCreditMemo- sql: ",t),ta.executeWithValues(t)}catch(t){throw console.log("getCreditMemo - controller - error: "+JSON.stringify(t.message)),t}};os.getItemDetails=e=>{try{let t=QA(oa.itemListForCreditMemo,e),o=ta.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};os.getUniqueId=e=>{try{let t=ta.executeWithValues(oa.getUniqueId,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getUniqueId - Credit Memo Helper - error: "+JSON.stringify(t.message)),t}}});var up=u(sa=>{var dp=ra();sa.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=dp.getCreditMemo(e.query);t.send(r)}catch(r){console.log("get CreditMemo - controller - error: "+JSON.stringify(r.message)),o(r)}};sa.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=dp.getItemDetails(e.query);console.log("getItems-CreditMemo controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var hp=u((iU,Tp)=>{var YA=require("../node_modules/express/index.js"),na=new YA.Router,pp=up(),{checkUserPermission:mp}=L(),{portalModules:yp,permissions:gp}=C();na.route("/").get(mp(yp.CREDIT_MEMO,gp.READ),pp.get);na.route("/items").get(mp(yp.CREDIT_MEMO,gp.READ),pp.getItems);Tp.exports=na});var fp=u(Sp=>{var{serviceLayerAPI:Cp}=j(),{portalModules:KA,serviceLayerApiURIs:XA}=C(),ZA=KA.CREDIT_MEMO,eI=XA[ZA];Sp.createCreditMemo=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemo request: "+JSON.stringify(e)),Cp.defaults.headers.Cookie=t;let o=await Cp.post(eI,e);return console.log(`Create CreditMemo response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemo error: "+o),o}}});var Ap=u((cU,Ep)=>{var{getSLConnection:tI}=X(),oI=fp(),rI=async(e,t,o)=>{try{let r=await tI(e),s=await oI.createCreditMemo(e.body,r);t.status(200).send({DocNum:s.DocNum})}catch(r){console.log("create CreditMemo Controller: "+JSON.stringify(r)),o(r)}};Ep.exports={create:rI}});var Np=u((dU,Dp)=>{var sI=require("../node_modules/express/index.js"),nI=Ap(),{portalModules:aI,permissions:iI}=C(),{checkUserPermission:lI}=L(),Ip=new sI.Router;Ip.route("/").post(lI([aI.CREDIT_MEMO],iI.CREATE),nI.create);Dp.exports=Ip});var bp=u(Ro=>{var{dbCreds:ze}=D();Ro.creditMemoQuery=`SELECT DISTINCT T0."DocEntry", T0."DocDate", T0."DocTime", T0."DocNum", T0."CardCode", T0."CardName",
    T0."Comments", T0."DocStatus", T0."DocCur", T0."DocRate", T0."DocTotal", T0."DocTotalFC",
    T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
    T0."U_Location", T0."SlpCode" "SalesPersonCode", T2."SlpName" "SalesPersonName"
      FROM ${ze.CompanyDB}.ORRR T0, ${ze.CompanyDB}.RRR1 T1, ${ze.CompanyDB}.OSLP T2
    WHERE T0."DocType"='I'
      AND T0."DocEntry" = T1."DocEntry"
      AND T0."SlpCode" = T2."SlpCode"`;Ro.itemListForCreditMemo=`SELECT T0."DocNum", T0."DocEntry",
    T1."LineNum", T1."ItemCode", ITM."ItemName", T1."LineStatus", 
    T1."Quantity", T1."Price", T1."WhsCode", T1."unitMsr" "UomCode",
    T1."VatPrcnt" "TaxPercent", T1."VatSum" "TaxLocal", T1."VatSumFrgn" "TaxForeign",
    T1."LineTotal",
    T1."U_ReturnedInvoiceNos", T1."U_ReturnedQty", T1."U_RemainingOpenQty", T1."U_ReturnReason"
  FROM ${ze.CompanyDB}.ORRR T0
    INNER JOIN ${ze.CompanyDB}.RRR1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${ze.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T0."DocNum" IN `;Ro.creditMemoAttachmentEntry=`SELECT T0."DocNum", T0."AtcEntry"
    FROM ${ze.CompanyDB}.ORRR T0
  WHERE T0."DocEntry" = ?`;Ro.AttachmentPath=`SELECT T0."AttachPath"
    FROM ${ze.CompanyDB}.OADP T0`});var aa=u(Oo=>{var rs=N(),{buildHeaderRecQuery:cI,buildRowLevelQuery:dI}=we(),ss=bp();Oo.getCreditMemoRequest=e=>{try{let t=cI(ss.creditMemoQuery,e,['T0."U_CODCntName"']);return console.log("getCreditMemoRequest- sql: ",t),rs.executeWithValues(t)}catch(t){throw console.log("getCreditMemoRequest - controller - error: "+JSON.stringify(t.message)),t}};Oo.getItemDetails=e=>{try{let t=dI(ss.itemListForCreditMemo,e),o=rs.executeWithValues(t);return console.log("getItemDetails- controller: "+JSON.stringify(o)),{itemsList:o}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}};Oo.getAttachmentEntry=e=>{try{let t=rs.executeWithValues(ss.creditMemoAttachmentEntry,[e]);return Array.isArray(t)&&t.length>0?t[0]:null}catch(t){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(t.message)),t}};Oo.getAttachmentPath=()=>{try{let e=rs.executeWithValues(ss.AttachmentPath);return Array.isArray(e)&&e.length>0?e[0]:null}catch(e){throw console.log("getAttachmentEntry - controller - error: "+JSON.stringify(e.message)),e}}});var Op=u(ia=>{var Rp=aa();ia.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Rp.getCreditMemoRequest(e.query);t.send(r)}catch(r){console.log("get CreditMemoRequest - controller - error: "+JSON.stringify(r.message)),o(r)}};ia.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Rp.getItemDetails(e.query);console.log("getItems-CreditMemoRequest controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItems - controller - error: "+JSON.stringify(r.message)),o(r)}}});var vp=u((yU,Bp)=>{var uI=require("../node_modules/express/index.js"),la=new uI.Router,Up=Op(),{checkUserPermission:xp}=L(),{portalModules:Lp,permissions:wp}=C();la.route("/").get(xp(Lp.CREDIT_MEMO_REQUEST,wp.READ),Up.get);la.route("/items").get(xp(Lp.CREDIT_MEMO_REQUEST,wp.READ),Up.getItems);Bp.exports=la});var ua=u((Ve,$p)=>{var{serviceLayerAPI:le}=j(),{portalModules:Mp,serviceLayerApiURIs:pI}=C(),_p=aa(),mI=require("fs"),ca=require("path"),gU=require("../node_modules/pdfkit/js/pdfkit.js"),Fp=require("../node_modules/multer/index.js"),yI=require("../node_modules/form-data/lib/form_data.js"),gI=require("../node_modules/axios/index.js"),TI=require("https"),hI=Mp.CREDIT_MEMO_REQUEST,da=pI[hI],Pp=Mp.ATTACHMENTS,CI=Fp.memoryStorage(),SI=Fp({storage:CI});Ve.createCreditMemoRequest=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** CreditMemoRequest request: "+JSON.stringify(e)),le.defaults.headers.Cookie=t;let o=await le.post(da,e);return console.log(`Create CreditMemoRequest response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create CreditMemoRequest error: "+o),o}};Ve.patchCreditMemoRequest=async(e,t,o)=>{try{return le.defaults.headers.Cookie=o,(await le.patch(`${da}(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching CreditMemoRequest ${e}:`,r.response?.data||r.message),r}};Ve.patchInvoice=async(e,t,o)=>{try{return le.defaults.headers.Cookie=o,(await le.patch(`/Invoices(${e})`,t)).status===204}catch(r){throw console.error(`[SAP Error] Patching Invoice ${e}:`,r.response?.data||r.message),r}};Ve.updateInvoiceAttachment=async(e,t,o)=>{try{if(console.log("*** Invoice Attachment request: start "),!e.file)return console.warn("*** Unexpected response status:","No file uploaded"),{message:"Invoice Attachment: No file uploaded!",status:200,success:!1};console.log("*** File details:",e.file),le.defaults.headers.Cookie=o;let r=e.file.buffer,s=e.file.originalname,n=ca.extname(s).replace(".",""),a=ca.basename(s,"."+n),l=s,i=(await _p.getAttachmentPath()).AttachPath;console.log("source_dir",i);let c=ca.join(i,s);console.log("fullFilePath: *** "+c+" = "+r),mI.writeFileSync(c,r),console.log(`*** File saved successfully at ${c}`);let p={Attachments2_Lines:[{FileExtension:n,SourcePath:i,FileName:a}]},y={},g,E={Accept:"application/json","Content-Type":"application/json"};console.log("att_pdf",p);let T=await _p.getAttachmentEntry(t);if(console.log("Invoice response",JSON.stringify(T)),T&&T?.AtcEntry!==null){if(g=T?.AtcEntry,console.log("Invoice Attachment Entry: ",JSON.stringify(g)),y=await le.patch(`${Pp}(${g})`,p),y&&y.status===204)return console.log("*** Invoice Attachment updated successfully. No content in response."),{message:"Invoice Attachment updated successfully.",status:200}}else if(console.log("Attachment Post API Calling"),y=await le.post(Pp,p,{headers:E}),console.log("Attachment Post API Called"),y.data){console.log("Attachment Post Response:"+JSON.stringify(y.data)),g=y.data.AbsoluteEntry;let h={AttachmentEntry:g},A=await le.patch(`${da}(${t})`,h);if(A&&A.status===204)return console.log("*** Invoice Attachment and Invoice updated successfully. No content in response."),{message:"Invoice Attachment and Invoice updated successfully.",status:200}}return console.warn("*** Unexpected response status:",y.status),{message:"Unexpected response from server.",status:y.status}}catch(r){console.error("Invoice Attachment upload error:",r.response?.data||r.message),console.error(r.stack)}};Ve.reopenInvoice=async(e,t)=>{try{console.log(`[SAP Action] Reopening Invoice: ${t}`),le.defaults.headers.Cookie=e;let o=await le.post(`/Invoices(${t})/Reopen`);return console.log(`[SAP Response] Reopen Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Reopening invoice ${t}:`,o.response?.data||o.message),o}};Ve.closeInvoice=async(e,t)=>{try{console.log(`[SAP Action] Closing Invoice: ${t}`),le.defaults.headers.Cookie=e;let o=await le.post(`/Invoices(${t})/Close`);return console.log(`[SAP Response] Close Success for ${t}`),o.data}catch(o){throw console.error(`[SAP Error] Closing invoice ${t}:`,o.response?.data||o.message),o}};Ve.createAttachment=async(e,t)=>{try{if(!e)return null;console.log(`*** [DEBUG] Attempting DIRECT multipart upload to SAP Attachments2: ${e.originalname}`);let o=new yI;o.append("file",e.buffer,{filename:e.originalname,contentType:e.mimetype||"application/octet-stream"});let s=`${process.env.SERVICE_LAYER_API_BASE_URL.replace(/[\\/]+$/,"")}/Attachments2`,n={...o.getHeaders(),Cookie:t,Accept:"application/json",Prefer:"odata.maxpagesize=0"};console.log(`*** [DEBUG] Uploading to SL: ${s}`);let a=await gI.post(s,o.getBuffer(),{headers:n,httpsAgent:new TI.Agent({rejectUnauthorized:!1}),maxContentLength:1/0,maxBodyLength:1/0});return a.data&&a.data.AbsoluteEntry?(console.log(`*** [SUCCESS] Attachment created directly in SAP. AbsoluteEntry: ${a.data.AbsoluteEntry}`),a.data.AbsoluteEntry):(console.warn("*** [WARNING] Direct attachment creation response did not contain AbsoluteEntry:",a.data),null)}catch(o){let r=o.response?.data||o.message;return console.error("createAttachment (Direct Upload) error:",JSON.stringify(r)),o?.response&&console.error(`*** status: ${o.response.status}`),null}};$p.exports.upload=SI});var Hp=u((TU,kp)=>{var{getSLConnection:fI}=X(),Oe=ua(),Wp=Je(),EI=ra(),pa=new Map,AI=async(e,t,o)=>{let r=!1,s=!0,n=null,a=null,l=null,d=!1,i=null;try{let c=JSON.parse(e.body.salesReturnData),p=c[0]||{},y=c[1]||[];if(i=p.Unique,i){if(pa.has(i))return console.error(`[BACKEND] Concurrent request detected for Return UniqueID: ${i}. Blocking.`),t.status(409).send({message:"Transaction already processing. Please wait."});pa.set(i,!0)}if(i){console.log(`[Duplicate Check] Checking for existing return with Unique ID: ${i}`);let h=await EI.getUniqueId(i);if(h)return console.log(`[Duplicate Check] Duplicate found! Returning existing DocNum: ${h.DocNum}`),t.status(200).send({DocNum:h.DocNum,DocEntry:h.DocEntry,isExist:!0})}let g=e.file;if(a=await fI(e),!a)throw new Error("Session Login Failed");if(n=y?.[0]?.DocEntry,!n)throw new Error("Base Invoice DocEntry is missing");let E=await Wp.getInvoiceByDocEntry(n,e);if(E?.DocumentStatus==="bost_Close"||E?.DocumentStatus==="C")try{console.log(`[Status] Invoice ${n} is closed. Attempting Reopen...`),await Oe.reopenInvoice(a,n),console.log(`[Status] Reopen successful for ${n}`),r=!0}catch(h){let A=h.response?.data?.error?.message?.value||h.message;if(A.toLowerCase().includes("not supported")||A.includes("404")||h.response?.status===404)console.warn("[Fallback] SAP version does not support 'Reopen'. Falling back to Standalone mapping."),s=!1;else throw new Error(`Failed to reopen invoice: ${A}`)}if(l=E?.AttachmentEntry||null,l&&s)try{console.log(`[Attachment] Invoice ${n} has AttachmentEntry: ${l}. Temporarily clearing to prevent [131-102] folder error...`),await Oe.patchInvoice(n,{AttachmentEntry:null},a),d=!0,console.log("[Attachment] Invoice attachment cleared. Native mapping ACTIVE \u2014 document link will be preserved.")}catch(h){let A=h.response?.data?.error?.message?.value||h.message;console.warn(`[Attachment Fallback] Could not temporarily clear invoice attachment (${A}). Falling back to Standalone mapping.`),s=!1}p.DocumentLines=p.DocumentLines.map((h,A)=>{let $=y[A],I={Quantity:Number(h.Quantity)};return s&&(I.BaseType=13,I.BaseEntry=Number(n),I.BaseLine=$?Number($.LineNum):A),I}),console.log(`DEBUG: Mapping Mode: ${s?"NATIVE (linked)":"STANDALONE (unlinked)"}`),console.log("DEBUG: Mapped DocumentLines:",JSON.stringify(p.DocumentLines,null,2));let T=await Oe.createCreditMemoRequest(p,a);if(console.log(`[Return] Created Return DocNum: ${T.DocNum}, DocEntry: ${T.DocEntry}`),d&&l)try{await Oe.patchInvoice(n,{AttachmentEntry:l},a),console.log(`[Attachment] Restored AttachmentEntry (${l}) to Invoice ${n}`)}catch(h){console.warn("[Attachment Warning] Failed to restore invoice's AttachmentEntry:",h.response?.data||h.message)}if(l)try{await Oe.patchCreditMemoRequest(T.DocEntry,{AttachmentEntry:l},a),console.log(`[Attachment] Linked base invoice AttachmentEntry (${l}) to Return ${T.DocEntry}`)}catch(h){console.warn("[Attachment Warning] Failed to link invoice attachment to return:",h.response?.data||h.message)}if(g){let h=await Oe.createAttachment(g,a);if(h)try{await Oe.patchCreditMemoRequest(T.DocEntry,{AttachmentEntry:h},a),console.log(`[Attachment] POS file attachment (${h}) linked to Return ${T.DocEntry}`)}catch(A){console.warn("[Attachment Warning] Failed to link POS attachment to Return:",A.response?.data||A.message)}}if(r)try{console.log(`[Status] Restoring Invoice ${n} to closed.`),await Oe.closeInvoice(a,n)}catch{console.warn("[Status Warning] Failed to re-close invoice, but return was posted.")}y.length>0&&await Wp.updateRemainingQuantity(y),t.status(200).send({DocNum:T.DocNum,DocEntry:T.DocEntry})}catch(c){let p=c.response?.data?.error?.message?.value||c.message;if(console.error("!!! FINAL ERROR !!!: "+p),d&&n&&a&&l)try{await Oe.patchInvoice(n,{AttachmentEntry:l},a),console.log("[Cleanup] Restored invoice AttachmentEntry after error.")}catch(y){console.warn("[Cleanup Warning] Could not restore invoice AttachmentEntry:",y.message)}if(r&&n&&a)try{await Oe.closeInvoice(a,n)}catch{}t.status(500).json({message:p})}finally{i&&pa.delete(i)}};kp.exports={create:AI}});var Gp=u((hU,qp)=>{var II=require("../node_modules/express/index.js"),DI=Hp(),{portalModules:NI,permissions:bI}=C(),{checkUserPermission:RI}=L(),Jp=new II.Router,OI=ua(),{upload:UI}=OI;Jp.route("/").post(RI([NI.CREDIT_MEMO_REQUEST],bI.CREATE),UI.single("attachment"),DI.create);qp.exports=Jp});var jp=u(ma=>{var{dbCreds:Ue}=D();ma.inventoryCounting=`SELECT T0."DocNum", T0."DocEntry", T0."CountDate", T0."Time", T0."Status", T0."Remarks", T0."BPLId", T0."BPLName",
  T0."U_Location"
    FROM ${Ue.CompanyDB}.OINC T0
    JOIN ${Ue.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
  WHERE T0."Status" = 'O'
  AND T3."CounterId" = ?`;ma.itemListForInventoryCounting=`SELECT T1."ItemCode", T1."ItemDesc", T1."LineNum", T1."WhsCode", T4."BinCode", T1."CountQty", 
    T1."CountDate", T1."CountTime",T2."TotalQty", 
    (SELECT STRING_AGG(F."BcdCode", ', ') FROM  ${Ue.CompanyDB}.OBCD F
        WHERE F."ItemCode" = ITM."ItemCode") AS "CodeBars",  
    (SELECT E."ItmsGrpNam" FROM  ${Ue.CompanyDB}.OITB E
        WHERE E."ItmsGrpCod" = ITM."ItmsGrpCod") AS "ItmsGrpName", 
    ITM."ItmsGrpCod"
  FROM ${Ue.CompanyDB}.OINC T0
    INNER JOIN ${Ue.CompanyDB}.INC1 T1 ON T0."DocEntry" = T1."DocEntry"
    INNER JOIN ${Ue.CompanyDB}.INC9 T2 ON T0."DocEntry" = T2."DocEntry" 
    INNER JOIN ${Ue.CompanyDB}.INC8 T3 ON T0."DocEntry" = T3."DocEntry"
    LEFT JOIN ${Ue.CompanyDB}.OBIN T4 ON T1."BinEntry" = T4."AbsEntry"
    INNER JOIN ${Ue.CompanyDB}.OITM ITM ON T1."ItemCode" = ITM."ItemCode"
  WHERE T1."LineNum" = T2."LineNum" 
    AND T2."CounterNum" = T3."CounterNum"
    AND T0."DocNum" = ?
    AND T3."CounterId" = ?`});var Qp=u(ya=>{var zp=N(),{buildHeaderRecQuery:xI,buildRowLevelQuery:SU}=we(),Vp=jp();ya.getInventoryCounting=e=>{try{let t=xI(Vp.inventoryCounting,e,null,"CountDate");return console.log("getInventoryCounting- sql: ",t),zp.executeWithValues(t,[e.counterId])}catch(t){throw console.log("getInventoryCounting - controller - error: "+JSON.stringify(t.message)),t}};ya.getItemDetails=e=>{try{return{itemsList:zp.executeWithValues(Vp.itemListForInventoryCounting,[e.docNum,e.counterId])}}catch(t){throw console.log("getItemDetails - controller - error: "+JSON.stringify(t.message)),t}}});var Kp=u(ga=>{var Yp=Qp();ga.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=Yp.getInventoryCounting(e.query);t.send(r)}catch(r){console.log("get - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}};ga.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r=Yp.getItemDetails(e.query);t.send(r)}catch(r){console.log("getItems - InventoryCounting - controller - error: "+JSON.stringify(r.message)),o(r)}}});var em=u((NU,Zp)=>{var LI=require("../node_modules/express/index.js"),Ta=new LI.Router,Xp=Kp(),{checkUserPermission:AU}=L(),{portalModules:IU,permissions:DU}=C();Ta.route("/").get(Xp.get);Ta.route("/items").get(Xp.getItems);Zp.exports=Ta});var om=u(ha=>{var{serviceLayerAPI:ns}=j(),{portalModules:wI,serviceLayerApiURIs:BI}=C(),vI=wI.INVENTORY_COUNTING,tm=BI[vI];ha.createInventoryCounting=async(e,t)=>{try{e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),console.log("*** InventoryCounting request: "+JSON.stringify(e)),ns.defaults.headers.Cookie=t;let o=await ns.post(tm,e);return console.log(`Create InventoryCounting response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create InventoryCounting error: "+o),o}};ha.updateInventoryCounting=async(e,t)=>{try{return console.log("*** InventoryCounting update request: "+JSON.stringify(e)),ns.defaults.headers.Cookie=t,!!await ns.patch(`${tm}(${e.DocumentEntry})`,e)}catch(o){throw console.log("Create InventoryCounting error: "+o),o}}});var am=u(Ca=>{var{getSLConnection:sm}=X(),nm=om(),rm=go();Ca.create=async(e,t,o)=>{try{let r=await sm(e),s=await nm.createInventoryCounting(e.body,r),n="";s&&(n=s.DocumentNumber),t.status(200).send({docNum:n})}catch(r){console.log("create InventoryCounting Controller: "+JSON.stringify(r)),o(r)}};Ca.update=async(e,t,o)=>{try{let r=await sm(e),{SalesBatchSelection:s}=e.body,n=e.body.DocNum;if(delete e.body.SalesBatchSelection,delete e.body.DocNum,console.log("Update InventoryCounting request: "+JSON.stringify(e.body)),await nm.updateInventoryCounting(e.body,r)){if(Array.isArray(s)&&s.length>0){let l=await Promise.all(s.map(d=>d.DocEntry?(console.log("Update SBS -------->"),rm.updateSalesBatchSelection(d,r)):rm.createSalesBatchSelection(d,"",n,r)))}t.status(200).send({success:!0,message:"Success"})}else t.status(500).send({success:!1,message:"Failed to update the record."})}catch(r){console.log("update InventoryCounting Controller: "+JSON.stringify(r)),o(r)}}});var cm=u((LU,lm)=>{var _I=require("../node_modules/express/index.js"),im=am(),{portalModules:OU,permissions:UU}=C(),{checkUserPermission:xU}=L(),Sa=new _I.Router;Sa.route("/").post(im.create);Sa.route("/").patch(im.update);lm.exports=Sa});var dm=u(Uo=>{var{dataSource:as}=ne(),is=Vs(),fa="userGroupId";Uo.createUserGroup=async e=>{try{return await as.getRepository(is).save(e)}catch(t){throw t}};Uo.getUserGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[fa]=e.id,delete e.id);try{let o=as.getRepository(is);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupId:"ASC"}})}catch(o){throw o}};Uo.updateUserGroup=async(e,t)=>{try{let o=as.getRepository(is),r={};return console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(r=await o.update({[fa]:e},t)),r}catch(o){throw o}};Uo.deleteUserGroup=async e=>{try{return await as.getRepository(is).delete({[fa]:e})}catch(t){throw t}}});var um=u(Wt=>{var xo=dm();Wt.create=async(e,t,o)=>{if(!e.body||!e.session.userId||!e.body.groupId){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await xo.createUserGroup(e.body);t.send(r)}catch(r){console.error("Error creating UserGroup!"),o(r)}};Wt.findAll=async(e,t,o)=>{try{let r=await xo.getUserGroup(e.query);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};Wt.findOne=async(e,t,o)=>{try{let r=await xo.getUserGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting UserGroup!"),o(r)}};Wt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await xo.updateUserGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating UserGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Wt.delete=async(e,t,o)=>{try{let r=await xo.deleteUserGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserGroup!"),o(r)}}});var mm=u((vU,pm)=>{var PI=require("../node_modules/express/index.js"),Lo=um(),kt=new PI.Router;kt.post("/",Lo.create);kt.get("/",Lo.findAll);kt.get("/:id",Lo.findOne);kt.put("/:id",Lo.update);kt.delete("/:id",Lo.delete);pm.exports=kt});var gm=u(Ht=>{var wo=dr(),{formatDate:ym}=W(),MI="storeName";Ht.create=async(e,t,o)=>{if(!e.body||!e.body[MI]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body),e.body.createdBy=e.session.userId,e.body.createdAt=ym(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await wo.createStore(e.body);t.send(r)}catch(r){console.error("Error creating Store!"),o(r)}};Ht.findAll=async(e,t,o)=>{try{let r=await wo.getStore(e.query);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Ht.findOne=async(e,t,o)=>{try{let r=await wo.getStore(e.params,1);t.send(r)}catch(r){console.error("Error getting Store!"),o(r)}};Ht.update=async(e,t,o)=>{if(e.params.id&&e.body){e.body.modifiedBy=e.session.userId,e.body.modifiedAt=ym(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let r=await wo.updateStore(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating Store!"),o(r)}}else t.status(400).send({message:"Invalid request!"})};Ht.delete=async(e,t,o)=>{try{let r=await wo.deleteStore(e.params.id);t.send(r)}catch(r){console.error("Error deleting Store!"),o(r)}}});var Sm=u(pt=>{var{createStoreWarehouse:FI,getStoreWarehouse:Tm,updateStoreWarehouse:$I,deleteStoreWarehouse:hm,parentPrimaryKey:Ea}=tt(),{formatDate:Cm}=W();pt.create=async(e,t,o)=>{if(console.log("Create StoreWarehouse - req.body: ",e.body),console.log("Create StoreWarehouse - req.params: ",e.params),!e.body||!e.params[Ea]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Cm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await FI(e.body,e.params[Ea],r,s);t.send(n)}catch(n){console.error("Error creating StoreWarehouse!"),o(n)}};pt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Tm(r);t.send(s)}catch(s){console.error("Error getting StoreWarehouse!"),o(s)}};pt.findOne=async(e,t,o)=>{try{let r=await Tm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreWarehouse!"),o(r)}};pt.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Cm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await $I(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreWarehouse!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};pt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await hm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}};pt.deleteAll=async(e,t,o)=>{if(!e.params[Ea]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await hm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreWarehouse!"),o(r)}}});var Im=u(mt=>{var{createStoreCounter:WI,getStoreCounter:fm,updateStoreCounter:kI,deleteStoreCounter:Em,parentPrimaryKey:Aa}=Qs(),{formatDate:Am}=W();mt.create=async(e,t,o)=>{if(console.log("Create StoreCounter - req.body: ",e.body),console.log("Create StoreCounter - req.params: ",e.params),!e.body||!e.params[Aa]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=Am(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await WI(e.body,e.params[Aa],r,s);t.send(n)}catch(n){console.error("Error creating StoreCounter!"),o(n)}};mt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await fm(r);t.send(s)}catch(s){console.error("Error getting StoreCounter!"),o(s)}};mt.findOne=async(e,t,o)=>{try{let r=await fm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreCounter!"),o(r)}};mt.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=Am(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await kI(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreCounter!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};mt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}};mt.deleteAll=async(e,t,o)=>{if(!e.params[Aa]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Em(e.params);t.send(r)}catch(r){console.error("Error deleting StoreCounter!"),o(r)}}});var Rm=u(yt=>{var{createStoreUser:HI,getStoreUser:Dm,updateStoreUser:JI,deleteStoreUser:Nm,parentPrimaryKey:Ia}=Ys(),{formatDate:bm}=W();yt.create=async(e,t,o)=>{if(console.log("Create StoreUser - req.body: ",e.body),console.log("Create StoreUser - req.params: ",e.params),!e.body||!e.params[Ia]){t.status(400).send({message:"Invalid request!"});return}let r=e.session.userId,s=bm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await HI(e.body,e.params[Ia],r,s);t.send(n)}catch(n){console.error("Error creating StoreUser!"),o(n)}};yt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Dm(r);t.send(s)}catch(s){console.error("Error getting StoreUser!"),o(s)}};yt.findOne=async(e,t,o)=>{try{let r=await Dm(e.params,1);t.send(r)}catch(r){console.error("Error getting StoreUser!"),o(r)}};yt.update=async(e,t,o)=>{if(e.body){let r=e.session.userId,s=bm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");try{let n=await JI(e.body,r,s);t.send(n)}catch(n){console.error("Error updating StoreUser!"),o(n)}}else t.status(400).send({message:"Invalid request!"})};yt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Nm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}};yt.deleteAll=async(e,t,o)=>{if(!e.params[Ia]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Nm(e.params);t.send(r)}catch(r){console.error("Error deleting StoreUser!"),o(r)}}});var Um=u(($U,Om)=>{var qI=require("../node_modules/express/index.js"),Bo=gm(),Jt=Sm(),qt=Im(),Gt=Rm(),{parentPrimaryKey:jt}=tt(),{portalModules:w,permissions:P}=C(),{checkUserPermission:M}=L(),B=new qI.Router;B.post("/",M(w.STORE_SETUP,P.CREATE),Bo.create);B.get("/",M(w.STORE_SETUP,P.READ),Bo.findAll);B.get("/:id",M(w.STORE_SETUP,P.READ),Bo.findOne);B.put("/:id",M(w.STORE_SETUP,P.WRITE),Bo.update);B.delete("/:id",M(w.STORE_SETUP,P.CANCEL),Bo.delete);B.post(`/:${jt}/warehouse/`,M(w.STORE_WAREHOUSE,P.CREATE),Jt.create);B.get(`/:${jt}/warehouse/`,M([w.STORE_WAREHOUSE,w.INVOICE],P.READ),Jt.findAll);B.get("/warehouse/find",M(w.STORE_WAREHOUSE,P.READ),Jt.findAll);B.get("/warehouse/:id",M(w.STORE_WAREHOUSE,P.READ),Jt.findOne);B.put("/warehouse/:id",M(w.STORE_WAREHOUSE,P.WRITE),Jt.update);B.delete("/warehouse/:id",M(w.STORE_WAREHOUSE,P.CANCEL),Jt.delete);B.post(`/:${jt}/counter/`,M(w.STORE_COUNTER,P.CREATE),qt.create);B.get(`/:${jt}/counter/`,M(w.STORE_COUNTER,P.READ),qt.findAll);B.get("/counter/find",M(w.STORE_COUNTER,P.READ),qt.findAll);B.get("/counter/:id",M(w.STORE_COUNTER,P.READ),qt.findOne);B.put("/counter/:id",M(w.STORE_COUNTER,P.WRITE),qt.update);B.delete("/counter/:id",M(w.STORE_COUNTER,P.CANCEL),qt.delete);B.post(`/:${jt}/user/`,M(w.STORE_USER,P.CREATE),Gt.create);B.get(`/:${jt}/user/`,M(w.STORE_USER,P.READ),Gt.findAll);B.get("/user/find",M(w.STORE_USER,P.READ),Gt.findAll);B.get("/user/:id",M(w.STORE_USER,P.READ),Gt.findOne);B.put("/user/:id",M(w.STORE_USER,P.WRITE),Gt.update);B.delete("/user/:id",M(w.STORE_USER,P.CANCEL),Gt.delete);Om.exports=B});var Lm=u(vo=>{var{dataSource:ls}=ne(),cs=qs(),xm="parkedTransactionId",GI="parkedDateTime",jI="ASC",{getStoreWarehouse:zI}=tt();vo.createParkedTransaction=async e=>{try{return await ls.getRepository(cs).save(e)}catch(t){throw t}};vo.getParkedTransaction=async(e,t,o=null)=>{t&&!e.storeId&&(e.storeId=t),console.log("filter: ",JSON.stringify(e)),e.id&&(e[xm]=e.id,delete e.id);try{let r=ls.getRepository(cs),s,n=[];if(t)try{n=(await zI({storeId:t})||[]).map(i=>i.warehouseCode),console.log(`[BACKEND] Fetched ${n.length} warehouses for storeId ${t}`)}catch(d){console.error(`[BACKEND] Error fetching warehouse list for storeId ${t}:`,d.message)}if(o===1?s=await r.findOneBy(e):s=await r.find({where:e,order:{[GI]:jI}}),!s)return[];let a=Array.isArray(s)?s:[s],l=[];for(let d of a){let{data:i}=d,c;try{c=JSON.parse(i)}catch(g){console.error(`Error parsing data for record with storeId ${t}:`,g);continue}(c.salesItems||c.salesQuotationItems||[]).every(g=>!n||n.length===0?!0:n.includes(g.WhsCode))&&l.push(d)}return l}catch(r){throw r}};vo.getLatestNextRefNum=async()=>{try{let t=await ls.getRepository(cs).find({order:{nextRefNum:"DESC"},take:1});return t.length===0?1:t[0].nextRefNum}catch(e){throw e}};vo.deleteParkedTransaction=async e=>{try{return await ls.getRepository(cs).delete({[xm]:e})}catch(t){throw t}}});var Bm=u(Po=>{var _o=Lm(),{formatDate:wm}=W();Po.create=async(e,t,o)=>{if(!e.body||!e.body.transactionType||!e.body.data){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let{userSessionLog:r}=e.session;e.body.userId=r.userId,e.body.userName=r.userName,e.body.storeId=r.storeId,e.body.storeLocation=r.storeLocation,e.body.storeCounterId=r.storeCounterId,e.body.counterCode=r.counterCode,e.body.parkedDateTime=wm(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let{data:s}=e.body;s&&typeof s=="object"&&!Array.isArray(s)&&(s=JSON.stringify(s),e.body.data=s);let n=await _o.getLatestNextRefNum();e.body.transactionRefNum=`${n}-${wm(new Date,"ddmm")}`,e.body.nextRefNum=n+1;let a=await _o.createParkedTransaction(e.body);t.send({id:a.parkedTransactionId})}catch(r){console.error("Error creating ParkedTransaction!"),o(r)}};Po.findAll=async(e,t,o)=>{try{let r=e.session.userSessionLog.storeId,s=await _o.getParkedTransaction(e.query,r);t.send(s)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Po.findOne=async(e,t,o)=>{try{let r=await _o.getParkedTransaction(e.params,1);t.send(r)}catch(r){console.error("Error getting ParkedTransaction!"),o(r)}};Po.delete=async(e,t,o)=>{try{let r=await _o.deleteParkedTransaction(e.params.id);t.send(r)}catch(r){console.error("Error deleting ParkedTransaction!"),o(r)}}});var _m=u((HU,vm)=>{var VI=require("../node_modules/express/index.js"),ds=Bm(),Mo=new VI.Router;Mo.post("/",ds.create);Mo.get("/",ds.findAll);Mo.get("/:id",ds.findOne);Mo.delete("/:id",ds.delete);vm.exports=Mo});var Pm=u(Da=>{var{cookieName:QI,httpStatusCodes:YI,recordState:KI}=C(),{formatDate:XI}=W(),{updateUserSessionLog:ZI}=Nt(),{invalidateSLCache:eD}=X();Da.get=async(e,t,o)=>{try{let{permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:l,storeWHCode:d,userTIN:i,userGroup:c}=e.session;!c&&l?.userGroup&&(c=l.userGroup),!n&&l?.displayUserName&&(n=l.displayUserName),console.log("LOG LOGIN - BACKEND - session data retrieved:",{userName:s,displayUserName:n,userId:a,userGroup:c}),t.send({permissions:r,userName:s,displayUserName:n,userId:a,userSessionLog:l,storeWHCode:d,userTIN:i,userGroup:c})}catch(r){console.error("Error getting Session data!"),o(r)}};Da.delete=async(e,t,o)=>{console.log("Destroying session!");try{if(e.session&&e.session.cookie){if(e.session.userSessionLog&&e.session.userSessionLog.userSessionLogId){let r={sessionStatus:KI.INACTIVE,logoutTime:XI(new Date,"YYYY-MM-DD HH24:MI:SS.FF2")};await ZI(e.session.userSessionLog.userSessionLogId,r)}t.clearCookie(QI,{path:"/"}),e.session.destroy(r=>{if(r)throw r}),eD(e)}t.status(YI.OK).json({message:"Logged out successfully!"})}catch(r){console.error("Error destroying session!"),o(r)}}});var $m=u((qU,Fm)=>{var Mm=Pm(),tD=require("../node_modules/express/index.js"),Na=new tD.Router;Na.get("/",Mm.get);Na.delete("/logout",Mm.delete);Fm.exports=Na});var km=u(zt=>{var Fo=Nt(),oD=tt(),rD=dr(),{formatDate:sD}=W(),{canAssignUserToCounter:Wm}=gr();zt.create=async(e,t,o)=>{if(!e.body){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=!0;if(e.body.storeCounterId&&(r=await Wm(e.session.userId,e.body.storeCounterId)),r){e.body.loginTime=sD(new Date,"YYYY-MM-DD HH24:MI:SS.FF2");let s=await Fo.createUserSessionLog(e.body);t.send(s)}}catch(r){console.error("Error creating UserSessionLog!"),o(r)}};zt.findAll=async(e,t,o)=>{try{let r=await Fo.getUserSessionLog(e.query);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};zt.findOne=async(e,t,o)=>{try{let r=await Fo.getUserSessionLog(e.params,1);t.send(r)}catch(r){console.error("Error getting UserSessionLog!"),o(r)}};zt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=!0;if(e.body.storeCounterId&&(r=await Wm(e.session.userId,e.body.storeCounterId)),r){let s="",n="";if(e.body.storeId){let i=await rD.getStore({storeId:e.body.storeId});console.log("store: ",i[0]),Array.isArray(i)&&i.length>0&&(n=i[0].locationCode,s=i[0].location,e.body.storeLocation=s,e.session.userSessionLog.storeLocation=s,e.session.userSessionLog.locationCode=n)}let a=await Fo.updateUserSessionLog(e.params.id,e.body);console.log("user-session-log.controller - update - response: ",a);let l="",{counterName:d}=e.body;if(e.body.storeId&&e.body.storeCounterId&&e.body.counterCode){e.session.userSessionLog.storeId=e.body.storeId,e.session.userSessionLog.storeCounterId=e.body.storeCounterId,e.session.userSessionLog.counterCode=e.body.counterCode,e.session.userSessionLog.counterName=d;let i=await oD.getStoreWarehouse({storeId:e.body.storeId});console.log("storeWarehouse: ",i[0]),Array.isArray(i)&&i.length>0&&(l=i[0].warehouseCode,e.session.storeWHCode=l)}t.send({...a,storeWHCode:l,storeLocation:s,locationCode:n})}}catch(r){console.error("Error updating UserSessionLog!"),e.session.userSessionLog.storeId="",e.session.userSessionLog.storeCounterId="",e.session.userSessionLog.counterCode="",e.session.storeWHCode="",o(r)}else t.status(400).send({message:"Invalid request!"})};zt.delete=async(e,t,o)=>{try{let r=await Fo.deleteUserSessionLog(e.params.id);t.send(r)}catch(r){console.error("Error deleting UserSessionLog!"),o(r)}}});var Jm=u((jU,Hm)=>{var nD=require("../node_modules/express/index.js"),$o=km(),Vt=new nD.Router;Vt.post("/",$o.create);Vt.get("/",$o.findAll);Vt.get("/:id",$o.findOne);Vt.put("/:id",$o.update);Vt.delete("/:id",$o.delete);Hm.exports=Vt});var ms=u(Qe=>{var{dataSource:us}=ne(),ps=js(),Wo="itemGroupMemberId";Qe.parentPrimaryKey="itemGroupId";Qe.createQCItemGroupMember=async(e,t)=>{try{let o;return Array.isArray(e)?o=e.map(s=>({...s,[Qe.parentPrimaryKey]:t})):o={...e,[Qe.parentPrimaryKey]:t},await us.getRepository(ps).save(o)}catch(o){throw o}};Qe.getQCItemGroupMember=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Wo]=e.id,delete e.id);try{let o=us.getRepository(ps);return t===1?await o.findOneBy(e):await o.findBy(e)}catch(o){throw o}};Qe.updateQCItemGroupMember=async(e,t)=>{try{let o=us.getRepository(ps);return t[Wo]&&delete t[Wo],await o.update({[Wo]:e},t)}catch(o){throw o}};Qe.deleteQCItemGroupMember=async e=>{e.id&&(e[Wo]=e.id,delete e.id);try{return await us.getRepository(ps).delete(e)}catch(t){throw t}}});var jm=u(ko=>{var{dataSource:ys}=ne(),{createQCItemGroupMember:Gm,updateQCItemGroupMember:aD}=ms(),gs=Gs(),Ts="itemGroupId",qm="itemGroupMemberId";ko.createQCItemGroup=async e=>{try{let o=await ys.getRepository(gs).save(e);if(e.items){let r=await Gm(e.items,o[Ts]);o.items=r}return o}catch(t){throw t}};ko.getQCItemGroup=async(e,t=null)=>{console.log("filter: ",JSON.stringify(e)),e.id&&(e[Ts]=e.id,delete e.id);try{let o=ys.getRepository(gs);return t===1?await o.findOneBy(e):await o.find({where:e,order:{groupName:"ASC"}})}catch(o){throw o}};ko.updateQCItemGroup=async(e,t)=>{try{let o=ys.getRepository(gs),r;t.items&&(r=t.items,delete t.items);let s={};if(console.log("Object.keys(newData).length: ",Object.keys(t).length),Object.keys(t).length>0&&(s=await o.update({[Ts]:e},t)),r){let n=[];if(r.forEach(async a=>{a[qm]?await aD(a[qm],a):n.push(a)}),n.length>0){let a=await Gm(n,e);s.items=a}}return s}catch(o){throw o}};ko.deleteQCItemGroup=async e=>{try{return await ys.getRepository(gs).delete({[Ts]:e})}catch(t){throw t}}});var zm=u(Qt=>{var Ho=jm();Qt.create=async(e,t,o)=>{if(!e.body||!e.body.groupName){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await Ho.createQCItemGroup(e.body);t.send(r)}catch(r){console.error("Error creating QCItemGroup!"),o(r)}};Qt.findAll=async(e,t,o)=>{try{let r=await Ho.getQCItemGroup(e.query);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Qt.findOne=async(e,t,o)=>{try{let r=await Ho.getQCItemGroup(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroup!"),o(r)}};Qt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await Ho.updateQCItemGroup(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroup!"),o(r)}else t.status(400).send({message:"Invalid request!"})};Qt.delete=async(e,t,o)=>{try{let r=await Ho.deleteQCItemGroup(e.params.id);t.send(r)}catch(r){console.error("Error deleting QCItemGroup!"),o(r)}}});var Ym=u(gt=>{var{createQCItemGroupMember:iD,getQCItemGroupMember:Vm,updateQCItemGroupMember:lD,deleteQCItemGroupMember:Qm,parentPrimaryKey:ba}=ms();gt.create=async(e,t,o)=>{if(console.log("Create QCItemGroupMember - req.body: ",e.body),console.log("Create QCItemGroupMember - req.params: ",e.params),!e.body||!e.params[ba]){t.status(400).send({message:"Invalid request!"});return}console.log("req.body: ",e.body);try{let r=await iD(e.body,e.params[ba]);t.send(r)}catch(r){console.error("Error creating QCItemGroupMembers!"),o(r)}};gt.findAll=async(e,t,o)=>{let r={...e.params,...e.query};console.log("req.params: ",JSON.stringify(e.params)),console.log("req.query: ",JSON.stringify(e.query));try{let s=await Vm(r);t.send(s)}catch(s){console.error("Error getting QCItemGroupMembers!"),o(s)}};gt.findOne=async(e,t,o)=>{try{let r=await Vm(e.params,1);t.send(r)}catch(r){console.error("Error getting QCItemGroupMembers!"),o(r)}};gt.update=async(e,t,o)=>{if(e.params.id&&e.body)try{let r=await lD(e.params.id,e.body);t.send(r)}catch(r){console.error("Error updating QCItemGroupMembers!"),o(r)}else t.status(400).send({message:"Invalid request!"})};gt.delete=async(e,t,o)=>{if(!e.params.id){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Qm(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}};gt.deleteAll=async(e,t,o)=>{if(!e.params[ba]){t.status(400).send({message:"Invalid Id!"});return}try{let r=await Qm(e.params);t.send(r)}catch(r){console.error("Error deleting QCItemGroupMembers!"),o(r)}}});var Xm=u((KU,Km)=>{var cD=require("../node_modules/express/index.js"),Jo=zm(),Tt=Ym(),{parentPrimaryKey:Ra}=ms(),pe=new cD.Router;pe.post("/",Jo.create);pe.get("/",Jo.findAll);pe.get("/:id",Jo.findOne);pe.put("/:id",Jo.update);pe.delete("/:id",Jo.delete);pe.post(`/:${Ra}/item/`,Tt.create);pe.get(`/:${Ra}/item/`,Tt.findAll);pe.get("/item/find",Tt.findAll);pe.get("/item/:id",Tt.findOne);pe.put("/item/:id",Tt.update);pe.delete("/item/:id",Tt.delete);pe.delete(`/:${Ra}/item`,Tt.deleteAll);Km.exports=pe});var Oa=u(qo=>{var{dbCreds:ht}=D(),{draftObjectCodes:XU}=C();qo.selectApprovedDeliveries=`SELECT T0."DocNum", T0."DocStatus", T0."CANCELED", T0."ObjType", T0."DocDate", T0."DocTime", 
  T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal", T0."DocTotalFC", T0."Comments", T0."CreateDate",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."U_DraftDocEntry",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC",
  T0."BPLName"
     FROM ${ht.CompanyDB}.ODLN T0, ${ht.CompanyDB}.OUSR TOR
   WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
     AND T0."U_DraftStatus" = 'AUTO_APPROVED'`;qo.selectItemDetails=`SELECT T1."LineNum", T1."LineStatus", T0."DocNum", T1."DocEntry", T1."ItemCode", T1."Dscription" as "ItemName", T1."Quantity", T1."unitMsr" AS "InvntryUom",
    T1."WhsCode", T1."FromWhsCod" "FromWarehouse", T1."U_FromBinLoc", T1."U_ToBinLocation"
  FROM ${ht.CompanyDB}.ODLN T0, ${ht.CompanyDB}.DLN1 T1
    WHERE T0."DocEntry" = T1."DocEntry"
      AND T0."DocNum" IN `;qo.selectTaxTotal=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
    FROM ${ht.CompanyDB}.ODLN T0
  LEFT JOIN ${ht.CompanyDB}.DLN4 T1 ON T0."DocEntry" = T1."DocEntry"
    WHERE T0."DocNum" = ?`;qo.selectDeliveryWithCustomerRefNoQuery=`SELECT DISTINCT T0."NumAtCard" as "CustomerRefNo"
  FROM ${ht.CompanyDB}.ODLN T0
WHERE T0."NumAtCard" IS NOT NULL
  AND T0."CANCELED" NOT IN ('Y','C')
  AND T0."NumAtCard" = ?`});var ey=u((ox,Zm)=>{var{dbCreds:Pe}=D(),{draftObjectCodes:ex,recordState:tx}=C(),dD=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
  T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
  T0."U_OriginatorId", T0."U_ApproverId", T0."U_DraftStatus", TOR."U_NAME" as "Originator",
  T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T0."ToWhsCode", T0."Filler" "FromWarehouse",
  T0."U_TargetRecDocNum", T0."U_ToBinLocation", T0."BPLName",
  T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
    FROM ${Pe.CompanyDB}.ODRF T0, ${Pe.CompanyDB}.OUSR TOR
  WHERE T0."U_OriginatorId" = TOR."INTERNAL_K"
    AND T0."ObjType" = ?`,uD=`SELECT T0."DocEntry", T0."DocStatus", T0."DocDate", T0."DocTime", T0."Comments", 
T0."CreateDate", T0."CardCode", T0."CardName", T0."NumAtCard", T0."DocTotal",
T0."U_OriginatorId", TOR."U_NAME" as "Originator", T0."ToWhsCode", T0."Filler" "FromWarehouse",
T0."U_MultiLevelApproval", T0."U_NoOfApprovals", T1."U_ApprovalStatusId", T1."U_DocEntry", T1."U_ApproverId",
T0."U_DraftStatus", T1."U_ApprovalLevel", T1."U_RejectedReason", T0."U_TargetRecDocNum",
T0."U_ToBinLocation", T0."BPLName",
T0."DocCur", T0."DiscPrcnt" "DiscountPercent", T0."DiscSum" "TotalDiscount", T0."DiscSumFC" "TotalDiscountFC"
  FROM ${Pe.CompanyDB}.ODRF T0, ${Pe.CompanyDB}.OUSR TOR, ${Pe.CompanyDB}."@APPROVALSTATUS" T1
WHERE T0."ObjType" = ?
  AND T0."U_OriginatorId" = TOR."INTERNAL_K"
  AND T0."DocEntry" = T1."U_DocEntry"
  AND T1."U_ApproverId" = ?
  AND T1."U_DraftStatus" != 'NOT_ASSIGNED'
ORDER BY T0."DocEntry" ASC`,pD=`SELECT TRW."LineNum", TRW."LineStatus", TRW."DocEntry", TRW."LineNum", TRW."ItemCode", TRW."Dscription" as "ItemName", TRW."Quantity", 
  TRW."unitMsr" AS "InvntryUom", TRW."WhsCode", TRW."U_FromWarehouse", TRW."U_ToBinLocation",
  TRW."U_FromBinLoc"
FROM ${Pe.CompanyDB}.DRF1 TRW
  WHERE TRW."DocEntry" IN `,mD=`SELECT T0."DocEntry", T0."DocNum", T1."TaxSum", T1."TaxSumFrgn", T1."TaxSumSys"
  FROM ${Pe.CompanyDB}.ODRF T0
LEFT JOIN ${Pe.CompanyDB}.DRF4 T1 ON T0."DocEntry" = T1."DocEntry"
  WHERE T0."DocEntry" IN `,yD=`UPDATE ${Pe.CompanyDB}.ODRF T0 SET `;Zm.exports={selectDrafts:dD,selectDraftsWithMultiApprover:uD,selectItemDetailsForDrafts:pD,selectDraftTaxTotal:mD,updateDraft:yD}});var hs=u(Yt=>{var Go=N(),{userRoles:rx,draftStatus:sx,portalModules:nx}=C(),jo=ey(),gD=' ORDER BY T0."DocEntry" ASC';Yt.getDrafts=(e="",t=[])=>{try{let o=jo.selectDrafts,r=Go.executeWithValues(o+e+gD,t);return console.log("getDraftItems: "+JSON.stringify(r)),r}catch(o){throw o}};Yt.getDraftsForApprover=(e,t)=>{try{let o=Go.executeWithValues(jo.selectDraftsWithMultiApprover,[e,t]);return console.log("getDraftItems: "+JSON.stringify(o)),o}catch(o){throw o}};Yt.getDraftItems=e=>{try{let t=Go.executeWithValues(jo.selectItemDetailsForDrafts+`(${e})`,[]);return console.log("getDraftItems: "+JSON.stringify(t)),t}catch(t){throw t}};Yt.getDraftTax=e=>{try{let t=Go.executeWithValues(jo.selectDraftTaxTotal+`(${e})`,[]);return console.log("getDraftTax: "+JSON.stringify(t)),t}catch(t){throw t}};Yt.updateDraft=(e,t)=>{let o=[],r=[],s=" WHERE ";e.U_TargetRecDocNum&&(o.push('T0."U_TargetRecDocNum" = ?'),r.push(e.U_TargetRecDocNum)),e.U_DraftStatus&&(o.push('T0."U_DraftStatus" = ?'),r.push(e.U_DraftStatus)),t.DocEntry?(s=s+'T0."DocEntry" = ?',r.push(t.DocEntry)):t.DocNum&&(s=s+'T0."DocNum" = ?',r.push(t.DocNum));try{let n=jo.updateDraft+o.join()+s;console.log("updateDraft - sql: ",n),console.log("updateDraft - values: ",r.join());let a=Go.executeWithValues(n,r);return Array.isArray(a)&&a.length>0?a:void 0}catch(n){throw n}}});var oy=u(zo=>{var Cs=N(),{itemTypes:ix,draftStatus:lx,userRoles:Ua,draftObjectCodes:TD,portalModules:hD}=C(),Ss=Oa(),CD=Lt(),xa=hs(),SD=hD.DELIVERY;zo.getDeliveryWithCustomerRefNo=e=>{try{let t=Cs.executeWithValues(Ss.selectDeliveryWithCustomerRefNoQuery,[e]);return Array.isArray(t)&&t.length>0?t:void 0}catch(t){throw t}};zo.getItemDetails=e=>{try{console.log("docNum:"+e);let t=Cs.executeWithValues(Ss.selectItemDetails+`(${e})`,[]);return console.log("Delivery - getItemDetails: "+JSON.stringify(t)),t}catch(t){throw t}};zo.getTaxDetails=e=>{try{console.log("docNum:"+e);let t=Cs.executeWithValues(Ss.selectTaxTotal,[e]);return console.log("Delivery - getTaxDetails: "+JSON.stringify(t)),t}catch(t){throw t}};zo.getDeliveryRecords=e=>{console.log("### getDeliveryRecords - filter: "+JSON.stringify(e));try{let t=[],o=[],r=TD[SD];if(e.userRole==Ua.APPROVER)t=xa.getDraftsForApprover(r,e.userId);else if(e.userRole==Ua.ORIGINATOR){let s=' AND T0."U_OriginatorId" = ?';t=xa.getDrafts(s,[r,e.userId]),o=ty(s,[e.userId])}else if(e.userRole==Ua.ADMIN){let s=[],n=` AND T0."U_OriginatorId" IN (${e.originatorIds})
                    AND T0."DocDate" BETWEEN TO_DATE(?) AND TO_DATE(?)`;s.push(e.fromDate,e.toDate),e.status&&e.status!=="ALL"&&(n=n+' AND T0."U_DraftStatus" IN (?)',s.push(e.status)),t=xa.getDrafts(n,[r,...s]),o=ty(n,s)}if(Array.isArray(t)&&t.length){let s=[];if(t.forEach(n=>{s.push(n.DocEntry)}),Array.isArray(s)&&s.length){let n=CD.getApproversForDraft(s);if(console.log("allApprovers: "+JSON.stringify(n)),Array.isArray(n)&&n.length){let a=[];t.forEach(l=>{n.forEach(d=>{l.DocEntry==d.U_DocEntry&&a.push(d)}),l.approvers=a,a=[]})}}}return[...t,...o]}catch(t){throw console.log("getDeliveryRecords - controller - error: "+JSON.stringify(t)),t}};var ty=(e="",t=[])=>{let o=' ORDER BY T0."DocEntry" ASC';try{let r=Cs.executeWithValues(Ss.selectApprovedDeliveries+e+o,t);return console.log("getAutoApprovedRecords: "+JSON.stringify(r)),r}catch(r){throw r}}});var sy=u(As=>{var fs=oy(),ry=hs(),{recordTypes:Es}=C();As.get=(e,t,o)=>{console.log("req.query"+JSON.stringify(e.query));try{let r=[];e.query.customerRefNo?r=fs.getDeliveryWithCustomerRefNo(e.query.customerRefNo):e.query.userRole&&(r=fs.getDeliveryRecords(e.query)),t.send(r)}catch(r){console.log("get - controller - error: "+JSON.stringify(r.message)),o(r)}};As.getItems=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Es.DIRECT?r=fs.getItemDetails(e.query.docNum):e.params.recordType===Es.DRAFT&&(r=ry.getDraftItems(e.query.docEntry)),console.log("Delivery - getItems- controller: "+JSON.stringify(r)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}};As.getTax=(e,t,o)=>{console.log("req.query: "+JSON.stringify(e.query)),console.log("req.params: "+JSON.stringify(e.params));try{let r;e.params.recordType===Es.DIRECT?r=fs.getTaxDetails(e.query.docNum):e.params.recordType===Es.DRAFT&&(r=ry.getDraftTax(e.query.docEntry)),t.send(r)}catch(r){console.log("getItemDetails - controller - error: "+JSON.stringify(r.message)),o(r)}}});var cy=u((ux,ly)=>{var fD=require("../node_modules/express/index.js"),Is=new fD.Router,{checkUserPermission:ny}=L(),La=sy(),{portalModules:ay,permissions:iy}=C();Is.route("/").get(ny(ay.DELIVERY,iy.READ),La.get);Is.route("/items/:recordType?").get(ny(ay.DELIVERY,iy.READ),La.getItems);Is.route("/tax/:recordType?").get(La.getTax);ly.exports=Is});var uy=u(dy=>{var px=N(),{itemTypes:mx,draftStatus:yx,portalModules:gx}=C();dy.getDraft=async(e,t=null)=>{try{return(await t.get(`Drafts(${e})`)).data}catch(o){throw o}}});var Sy=u(Ye=>{var ED=require("../node_modules/lodash.clonedeep/index.js"),{serviceLayerAPI:ce}=j(),{sendMail:hy}=De(),wa=Lt(),hx=nn(),py=Ut(),my=Sr(),Me=N(),Fe=D(),Cx=Oa(),{portalModules:AD,draftStatus:q,draftObjectCodes:Cy,systemCurrency:yy,serviceLayerApiURIs:ID,recordTypes:gy}=C(),{getRandomNo:Sx,formatDate:DD}=W(),ND=hs(),bD=uy(),Vo=AD.DELIVERY,va=ID[Vo];Ye.createDeliveryDraft=async(e,t,o)=>{if(console.log(`request: ${JSON.stringify(e)}`),o){ce.defaults.headers.Cookie=o;try{if(e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,Array.isArray(t)&&t.length){e.DocObjectCode=Cy[Vo],e.U_DraftStatus||(e.U_DraftStatus=q.PENDING),e.U_MultiLevelApproval=t?t[0].U_MultiLevelApproval:"",e.U_NoOfApprovals=t?parseInt(t[0].U_NoOfApprovals,10):0,console.log("*** DRAFTS request: "+JSON.stringify(e));let r=await ce.post("Drafts",e);return console.log("*** DRAFTS response: "+r),r.data?{draftNum:r.data.DocEntry}:void 0}else{e.U_DraftStatus=q.AUTO_APPROVED;let r=await Ye.createDelivery(e,o);return r?{docNum:r.data.DocNum}:void 0}}catch(r){throw console.log("Create Delivery error: "+r),r}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ye.createDelivery=async(e,t)=>{console.log(`request: ${JSON.stringify(e)}`);try{ce.defaults.headers.Cookie=t,e.branchId&&(e.BPL_IDAssignedToInvoice=e.branchId,delete e.branchId),e.U_OriginatorId=e.userId,e.U_DraftStatus=q.AUTO_APPROVED,console.log("*** Delivery request: "+JSON.stringify(e));let o=await ce.post(va,e);return console.log(`Create Delivery response: ${JSON.stringify(o.data)}`),o.data?o.data:void 0}catch(o){throw console.log("Create Delivery error: "+o),o}};var Ty=(e,t)=>{let o=[],r={};return Array.isArray(t)&&t.length&&t.forEach(s=>{r={},r.BaseLineNumber=s.BaseLineNumber,r.Quantity=s.Quantity,e==="Batch"?(r.BatchNumberProperty=s.BatchNumberProperty,r.BatchNumber=s.BatchNumber):e==="Serial"&&(r.InternalSerialNumber=s.InternalSerialNumber),o.push(r)}),o};Ye.createDeliveryFromDraft=async(e,t,o)=>{ce.defaults.headers.Cookie=o;try{console.log("draft: "+JSON.stringify(e));let r=[],s={},n=[],a=e.DocCurrency;Array.isArray(e.DocumentLines)&&e.DocumentLines.length&&e.DocumentLines.forEach(i=>{s={LineNum:i.LineNum,LocationCode:i.LocationCode,ItemCode:i.ItemCode,Quantity:i.Quantity,BaseType:i.BaseType,BaseEntry:i.BaseEntry,BaseLine:i.BaseLine,MeasureUnit:i.MeasureUnit,WarehouseCode:i.WarehouseCode},s.BatchNumbers=Ty("Batch",i.BatchNumbers),s.SerialNumbers=Ty("Serial",i.SerialNumbers),s.DocumentLinesBinAllocations=ED(i.DocumentLinesBinAllocations.sort((c,p)=>c.SerialAndBatchNumbersBaseLine-p.SerialAndBatchNumbersBaseLine)),r.push(s)}),r.sort((i,c)=>i.BaseLine-c.BaseLine),Array.isArray(e.DocumentAdditionalExpenses)&&e.DocumentAdditionalExpenses.length&&e.DocumentAdditionalExpenses.forEach(i=>{n.push({LineNum:i.LineNum,ExpenseCode:i.ExpenseCode,LineTotal:a===yy?i.LineTotal:i.LineTotalFC})});let l={DocDate:e.DocDate,DocDueDate:e.DocDueDate,CardCode:e.CardCode,CardName:e.CardName,Address:e.Address,NumAtCard:e.NumAtCard,DocCurrency:a,DocRate:e.DocRate,Reference1:e.Reference1,Reference2:e.Reference2,Comments:e.Comments,DocObjectCode:e.DocObjectCode,CreationDate:e.CreationDate,DocTime:e.DocTime,UpdateDate:e.UpdateDate,UpdateTime:e.UpdateTime,VatPercent:e.VatPercent,VatSum:e.VatSum,DiscountPercent:e.DiscountPercent,TotalDiscount:a===yy?e.TotalDiscount:e.TotalDiscountFC,U_OriginatorId:e.U_OriginatorId,U_ApproverId:e.U_ApproverId,U_DraftStatus:e.U_DraftStatus,U_MultiLevelApproval:e.U_MultiLevelApproval,U_NoOfApprovals:parseInt(e.U_NoOfApprovals,10),U_DraftDocEntry:t,DocumentLines:r,DocumentAdditionalExpenses:n};return e.BPL_IDAssignedToInvoice&&(l.BPL_IDAssignedToInvoice=e.BPL_IDAssignedToInvoice),console.log("***deliveryRequest: "+JSON.stringify(l)),await ce.post(va,l)}catch(r){let s=q.PENDING,n=await ce.patch(`Drafts(${t})`,{U_DraftStatus:s});throw console.log("resetDraftStatus - response.data: "+n),r}};var Ba=async(e,t,o,r)=>{let s=isNaN(e.U_ApprovalLevel)?0:parseInt(e.U_ApprovalLevel);try{let n=e.DocEntry;console.log("updateDraftAndNotifyOriginator: "+JSON.stringify(e));let a;ce.defaults.headers.Cookie=o;let l=await ce.patch(`Drafts(${n})`,{Comments:e.Comments,U_DraftStatus:e.U_DraftStatus});if(console.log("PATCH Draft - response.data: "+JSON.stringify(l.data)),e.U_DraftStatus==q.APPROVED){let d=await bD.getDraft(n,ce);d&&(a=Ye.createDeliveryFromDraft(d,n,o))}if(l||a){let d=Me.executeWithValues(Fe.updateDraftApproversList,[t,e.U_RejectedReason,DD(new Date,"YYYY-MM-DD HH24:MI:SS.FF2"),e.U_ApprovalStatusId]);if(t===q.REJECTED&&wa.setApprovalStatus(t,n),a){console.log("deliveryResponse.data.DocNum: "+a.data.DocNum),console.log("deliveryResponse.data.DocumentLines: "+JSON.stringify(a.data.DocumentLines));let g=ND.updateDraft({U_TargetRecDocNum:a.data.DocNum},{DocEntry:n});r!=="Y"&&wa.setApprovalStatus(q.APPROVED,n)}let i=Me.executeWithValues(Fe.selectUserInfo,e.U_OriginatorId),c=Me.executeWithValues(Fe.selectUserInfo,e.userId);console.log("originatorRec: "+JSON.stringify(i)),console.log("approverRec: "+JSON.stringify(c));let p;if([q.APPROVED,q.PENDING].includes(e.U_DraftStatus)?p=q.APPROVED:p=e.U_DraftStatus,Array.isArray(c)&&c.length&&Array.isArray(i)&&i.length){let g=my.getMailBody(Vo,i[0].UserName,c[0].UserName,n,p);hy(i[0].Email,my.subject,g)}let y;return t===q.APPROVED&&(y=wa.getApprovalInternalInDays(n,e.U_ApprovalLevel,r)),{draftStatus:p,noOfDays:y}}}catch(n){throw n}};Ye.updateDeliveryDraft=async(e,t)=>{if(console.log(`request: ${JSON.stringify(e)}`),t){ce.defaults.headers.Cookie=t;try{let o=e.U_DraftStatus;if(e.U_DraftStatus==q.APPROVED){let r=Me.executeWithValues(Fe.selectNoOfApprovalsForDraft,[Cy[Vo],e.DocEntry]);console.log("draftApprovalDetails: "+JSON.stringify(r));let s=0,n;if(Array.isArray(r)&&r.length&&(s=parseInt(r[0].U_NoOfApprovals,10),n=r[0].U_MultiLevelApproval),console.log("noOfApprovalsRequired: "+s),n==="Y"){parseInt(e.U_ApprovalLevel)==s?e.U_DraftStatus=q.APPROVED:parseInt(e.U_ApprovalLevel)<s&&(e.U_DraftStatus=q.PENDING);let a=await Ba(e,o,t,n);if(e.U_DraftStatus==q.PENDING){let l=parseInt(e.U_ApprovalLevel)+1,d=Me.executeWithValues(Fe.updateDraftNextApprovalLevel,[q.PENDING,e.DocEntry,l]);console.log("setNextApprovalStatus: "+JSON.stringify(d));let i=Me.executeWithValues(Fe.selectUserInfo,e.U_OriginatorId),c=Me.executeWithValues(Fe.selectDraftNextApproverDetails,[e.DocEntry,l]);if(console.log("nextApproverDetails: "+JSON.stringify(c)),Array.isArray(c)&&c.length&&i.length){let p=py.getMailBody(Vo,i[0].UserName,e.DocEntry);hy(c[0].Email,py.subject,p)}}return a}else{let a=Me.executeWithValues(Fe.selectDraftApprovalStatusCount,[e.DocEntry,e.U_DraftStatus]);console.log("approvedStatus: "+JSON.stringify(a));let l=0;return Array.isArray(a)&&a.length&&(l=a[0].Count),console.log("noOfApprovalsReceived: "+l),parseInt(l,10)+1>=parseInt(s,10)?(e.U_DraftStatus=q.APPROVED,console.log("****APPROVED")):(e.U_DraftStatus=q.PENDING,console.log("****PENDING")),await Ba(e,o,t,n)}}else if(e.U_DraftStatus==q.REJECTED)return console.log("****REJECTED"),await Ba(e,o,t)}catch(o){throw console.log("Delivery Draft error: "+o),o}}else throw new Error("Unable to connect to the server. Please contact Administrator!")};Ye.getDeliveryDraft=async(e,t,o,r=!0)=>{if(o){ce.defaults.headers.Cookie=o;try{let s;if(e===gy.DRAFT?s=await ce.get(`Drafts(${t.docEntry})`):e===gy.DIRECT&&(s=await ce.get(`${va}(${t.docNum})`)),r){console.log("response.data: "+JSON.stringify(s.data));let n=Me.executeWithValues(Fe.allFreightInfo,[]),a=s.data.DocumentAdditionalExpenses.slice();if(Array.isArray(a)&&a.length&&n.forEach(l=>{a.forEach(d=>{l.FreightCode==d.ExpenseCode&&(d.FreightName=l.FreightName)})}),s.data)return{draft:s.data,draftStatus:s.data.U_DraftStatus,freightInfoForDraft:a,DocTotal:s.data.DocTotal,DocTotalFc:s.data.DocTotalFc};console.log("Failed to get Delivery Request details!.. Error-500");return}else return s.data}catch(s){throw console.log("Delivery Draft error: "+s),s}}else throw{message:"Unable to connect to the server. Please contact Administrator!"}}});var Ey=u((Lx,fy)=>{var{In:Ex}=require("../node_modules/typeorm/index.js"),{getSLConnection:Ma}=X(),{sendMail:Ax}=De(),Ix=Ut(),Dx=N(),Nx=D(),{portalModules:RD,draftStatus:bx,draftObjectCodes:Rx}=C(),{getRandomNo:Ox,formatDate:Ux}=W(),Ds=Sy(),OD=so(),{logger:xx}=fn(),_a=Lt(),Pa=RD.DELIVERY,UD=async(e,t,o)=>{try{let r=e.session.userId;e.body.userId=e.session.userId;let s=_a.getApprovers(r,Pa),n=await Ma(e);if(Array.isArray(s)&&s.length>0){let a=await xD(e.body,s,n);t.status(200).send(a)}else{let a=await Ds.createDelivery(e.body,n);t.status(200).send({docNum:a.DocNum})}}catch(r){console.log("create Delivery: "+JSON.stringify(r)),o(r)}},xD=async(e,t=[],o)=>{try{let r=e.userId,s=await Ds.createDeliveryDraft(e,t,o);if(s.draftNum){let n=[];if(t.forEach(a=>{n.push(a.UserName)}),n.length>0){let{draftApproverRec:a,mailingList:l}=await _a.createApproversForDraft(s.draftNum,t,Pa);if(a){let d=OD.getUserInfo(r);await _a.notifyApprovers(Pa,d.UserName,s.draftNum,l)}}return{draftNum:s.draftNum,approverName:n.length>0?n.join(", "):""}}return}catch(r){throw r}},LD=async(e,t,o)=>{console.log(`req.body: ${JSON.stringify(e.body)}`),e.body.userId=e.session.userId;try{let r=await Ma(e),{draftStatus:s,noOfDays:n}=await Ds.updateDeliveryDraft(e.body,r);t.status(200).send({draftStatus:s,noOfDays:n})}catch(r){console.log("Delivery Draft error: "+r),o(r)}},wD=async(e,t,o)=>{if(console.log(`get Delivery - req.params: ${JSON.stringify(e.params)}`),e.query.docEntry||e.query.docNum)try{let r=await Ma(e),s=await Ds.getDeliveryDraft(e.params.type,e.query,r);s?t.send(s):t.status(500).json({message:"Failed to get Delivery Request details!"})}catch(r){console.log("Delivery Draft error: "+r),o(r)}else t.status(500).send({error:"Invalid DocEntry!"})};fy.exports={create:UD,update:LD,get:wD}});var Iy=u((wx,Ay)=>{var BD=require("../node_modules/express/index.js"),Fa=Ey(),{portalModules:$a,permissions:Wa}=C(),{checkUserPermission:ka}=L(),Ns=new BD.Router;Ns.route("/").post(ka($a.DELIVERY,Wa.CREATE),Fa.create);Ns.route("/draft").patch(ka($a.DELIVERY,Wa.WRITE),Fa.update);Ns.route("/items/:recordType?").get(ka($a.DELIVERY,Wa.READ),Fa.get);Ay.exports=Ns});var Ny=u((Bx,Dy)=>{var{getSLConnection:Ha}=X(),Ja=go(),vD=async(e,t,o)=>{try{let r=await Ha(e),s=await Ja.createSalesBatchSelection(e.body,e.body.invoiceDocEntry,e.body.invoiceDocNum,r);t.status(200).send(s)}catch(r){console.log("create SalesBatchSelection Controller: "+JSON.stringify(r)),o(r)}},_D=async(e,t,o)=>{try{if(!e.body||!Array.isArray(e.body)||e.body.length===0)throw new Error("Request body cannot be empty and must be an array");let r=await Ha(e),s=await Promise.all(e.body.map(n=>Ja.updateSalesBatchSelection(n,r)));t.status(200).send(s)}catch(r){console.log("Update Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}},PD=async(e,t,o)=>{try{let r=await Ha(e),{docNum:s,itemCodes:n}=e.body;if(!s||!n||!Array.isArray(n)||n.length===0)throw new Error("docNum and itemCodes are required, and itemCodes must be a non-empty array");let a=await Promise.all(n.map(l=>Ja.getSalesBatchSelection(s,l,r)));t.status(200).send(a)}catch(r){console.log("Get Sales Batch Selection Controller: "+JSON.stringify(r)),o(r)}};Dy.exports={create:vD,update:_D,get:PD}});var Ry=u((vx,by)=>{var MD=require("../node_modules/express/index.js"),qa=Ny(),{portalModules:Ga,permissions:ja}=C(),{checkUserPermission:za}=L(),Va=new MD.Router;Va.route("/").post(za([Ga.INVOICE],ja.CREATE),qa.create).put(za(Ga.INVOICE,ja.WRITE),qa.update);Va.route("/get").post(za([Ga.INVOICE],ja.READ),qa.get);by.exports=Va});var xy=u((Fx,Uy)=>{var Qo=require("../node_modules/express/index.js"),FD=require("http"),$D=require("https"),_x=require("../node_modules/http-proxy/index.js"),WD=require("../node_modules/cookie-parser/index.js"),Px=require("../node_modules/morgan/index.js"),Kt=require("path"),Mx=require("../node_modules/rotating-file-stream/index.js"),bs=require("cluster"),kD=require("os").cpus().length,HD=Xa(),JD=li(),qD=Rl(),GD=uc(),jD=hc(),{sessionValidator:zD}=L(),VD=Nc(),QD=Uc(),YD=Fc(),KD=jc(),XD=Xc(),ZD=Ed(),eN=Ud(),tN=vd(),oN=Jd(),rN=zd(),sN=nu(),nN=pu(),aN=Su(),iN=Nu(),lN=xu(),cN=Mu(),dN=qu(),uN=Qu(),pN=op(),mN=lp(),yN=hp(),gN=Np(),TN=vp(),hN=Gp(),CN=em(),SN=cm(),fN=mm(),EN=Um(),AN=_m(),IN=$m(),DN=Jm(),NN=Xm(),bN=cy(),RN=Iy(),ON=Ry(),Rs,xe="/api/v1/service",U="/api/v1/custom",UN=async()=>{process.env.NODE_ENV==="development"?await Oy():bs.isMaster?(console.log(`Number of CPUs is ${kD}`),console.log(`Master ${process.pid} is running`),bs.fork(),bs.on("exit",(e,t,o)=>{console.log(`worker ${e.process.pid} died`),console.log("Let's fork another worker!"),bs.fork()})):await Oy()},Oy=()=>new Promise((e,t)=>{let o=Qo(),r=require("fs"),s=process.env.HOST;process.env.NODE_ENV==="development"?(o.use(Qo.static(Kt.join(__dirname,"../../","build"))),o.get("/",(a,l)=>{l.sendFile(Kt.join(__dirname,"../../","build","index.html"))})):(o.use(Qo.static(Kt.join(__dirname,"../../../","UI"))),o.get("/",(a,l)=>{l.sendFile(Kt.join(__dirname,"../../../","UI","index.html"))}));let n=process.env.API_PORT||2020;if(process.env.HTTPS==="true"){let a={cert:r.readFileSync(Kt.join(__dirname,"../../",process.env.SSL_CRT_FILE||"certificate/certificate.crt"),"utf8"),key:r.readFileSync(Kt.join(__dirname,"../../",process.env.SSL_KEY_FILE||"certificate/private-key.pem"),"utf8")};Rs=$D.createServer(a,o)}else Rs=FD.createServer(o);o.use(HD()),o.use(WD()),o.use(Qo.json()),o.use(Qo.urlencoded({extended:!0})),o.use(JD),o.use(zD),o.use(xe,GD),o.use(`${xe}/business-partner`,VD),o.use(`${xe}/invoice`,ZD),o.use(`${xe}/sales-quotation`,sN),o.use(`${xe}/credit-memo`,gN),o.use(`${xe}/credit-memo-request`,hN),o.use(`${xe}/inventory-counting`,SN),o.use(`${xe}/item`,eN),o.use(`${xe}/sales-batch-selection`,ON),o.use(`${xe}/delivery`,RN),o.use(U,qD),o.use(`${U}/user/group`,fN),o.use(`${U}/store`,EN),o.use(`${U}/parked-transaction`,AN),o.use(`${U}/user-session-log`,DN),o.use(`${U}/session`,IN),o.use(`${U}/invoice`,KD),o.use(`${U}/firca`,XD),o.use(`${U}/cash-denomination`,QD),o.use(`${U}/credit-card`,YD),o.use(`${U}/stock-transfer-request-new`,oN),o.use(`${U}/sales-quotation`,rN),o.use(`${U}/sale-order`,nN),o.use(`${U}/customer`,mN),o.use(`${U}/tax`,aN),o.use(`${U}/sales-employees`,iN),o.use(`${U}/payment-terms`,cN),o.use(`${U}/user`,lN),o.use(`${U}/banks`,dN),o.use(`${U}/locations`,uN),o.use(`${U}/warehouse`,pN),o.use(`${U}/credit-memo`,yN),o.use(`${U}/credit-memo-request`,TN),o.use(`${U}/inventory-counting`,CN),o.use(`${U}/item-master`,tN),o.use(`${U}/delivery`,bN),o.use(`${U}/qc-item-group`,NN),o.use(jD),Rs.listen(n,s).on("listening",()=>{console.log(`Web server listening on ${n} (HTTPS: ${process.env.HTTPS==="true"})`),e()}).on("error",a=>{t(a)})}),xN=()=>new Promise((e,t)=>{Rs.close(o=>{if(o){t(o);return}e()})});Uy.exports={initialize:UN,close:xN}});require("../node_modules/dotenv/lib/main.js").config();var Ly=xy(),LN=ne(),wN=async()=>{try{console.log("Initializing Database"),await LN.dataSource.initialize(),console.log("Database has been initialized by TypeORM!"),console.log("Initializing Web server"),await Ly.initialize()}catch(e){console.error(e),process.exit(1)}};wN();var Qa=async e=>{let t=e;console.log("Shutting down...");try{console.log("Closing Web server"),await Ly.close()}catch(o){console.log("Encountered error when closing Web server",o),t=t||o}console.log("Exiting process"),t?process.exit(1):process.exit(0)};process.on("SIGTERM",()=>{console.log("Received SIGTERM"),Qa()});process.on("SIGINT",()=>{console.log("Received SIGINT"),Qa()});process.on("uncaughtException",e=>{console.log("Uncaught exception"),console.error(e),Qa(e)});process.on("unhandledRejection",(e,t)=>{console.error("Unhandled Promise Rejection at:",t,"reason:",e)});
//!@#$%^&*()-+<>
