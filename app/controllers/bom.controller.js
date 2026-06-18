const service = require("../entities/services/bom.service.js");
exports.getChildren = async (req, res, next) => {
  try {
    const father = req.params.father;
    const response = await service.getBomChildren(father);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
