const controller = require("../controller/OrdersController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/order/create", controller.create);
  app.get("/api/order/findAll", controller.findAll);
};
