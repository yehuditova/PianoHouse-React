const controller = require("../controller/ItemsController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/item/create", controller.create);
  app.get("/api/item/findAll", controller.findAll);
  app.get("/api/item/findOne", controller.findOne);
  app.get("/api/item/findById", controller.findById);
};
