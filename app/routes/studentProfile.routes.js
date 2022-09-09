const controller = require("../controllers/studentProfile.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/studentProfile", controller.getStudentProfile);
}

module.exports = app => {
  const studentProfile = require("../controllers/studentProfile.controller");
  var router = require("express").Router();

  //Get Student Profile
  router.get("/getStudent", studentProfile.getStudentUsername)

  app.use('/api/studentProfile', router);
}