module.exports = app => {
  const bom = require("../controllers/bom.controller.js");
  var router = require("express").Router();
  
  // Retrieve BOM children by Parent ItemCode
  router.get("/children/:father", bom.getChildren);
  
  app.use('/api/v1/custom/bom', router);
};
