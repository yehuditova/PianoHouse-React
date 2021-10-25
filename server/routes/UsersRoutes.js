const controller = require("../controller/UsersController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/user/create", controller.create);
  app.get("/api/user/findOne", controller.findOne);
  app.get("/api/user/find", controller.find);
  app.put("/api/user/update", controller.findAndUpdate);

};
