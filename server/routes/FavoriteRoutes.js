const controller = require("../controller/FavoriteController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/favorite/create", controller.create);
  app.delete("/api/favorite/delete", controller.delete);
  app.get("/api/favorite/findAll", controller.findAll);
  app.get("/api/favorite/findOne", controller.findOne);

};
