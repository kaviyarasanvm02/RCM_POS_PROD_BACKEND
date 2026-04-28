const helper = require("../helper/sales-quotation.js");
/**
 * Get the list of all Sales Quotation
 */
exports.get = (req, res, next) => {
  console.log("req.query"+ JSON.stringify(req.query));
  try {
    const rows = helper.getSalesQuotation(req.query);
    res.send(rows);
  }
  catch (err) {
    console.log("getSalesQuotation - controller - error: "+ JSON.stringify(err.message));
    next(err);
  }
}

/**
 * Get the list of Items under a Sales Quotation
 */
exports.getItems = (req, res, next) => {
  console.log("req.query: "+ JSON.stringify(req.query));
  console.log("req.params: "+ JSON.stringify(req.params));
  try {
    const results = helper.getItemDetails(req.query);
    // console.log("getItems- controller: "+JSON.stringify(results));

    res.send(results)
  }
  catch (err) {
    console.log("getItems - controller - error: "+ JSON.stringify(err.message));
    next(err);
  }
}

/**
 * Updates the reprint status of a Sales Quotation
 */
exports.updateReprint = (req, res, next) => {
  console.log("updateSalesQuotationReprint - body: "+ JSON.stringify(req.body));
  const { DocEntry } = req.body;
  try {
    const success = helper.updateReprint(DocEntry);
    res.send({message: "Sales Quotation Reprint Status Updated Successfully", success: true});
  }
  catch (err) {
    console.log("updateSalesQuotationReprint - controller - error: "+ JSON.stringify(err.message));
    next(err);
  }
}

/**
 * Get the list of Timber Tally items (lengths/dimensions)
 */
exports.getTimberTallyItems = (req, res, next) => {
  console.log("getTimberTallyItems - query: "+ JSON.stringify(req.query));
  try {
    const results = helper.getTimberTallyItems(req.query);
    res.send(results);
  }
  catch (err) {
    console.log("getTimberTallyItems - controller - error: "+ JSON.stringify(err.message));
    next(err);
  }
}

