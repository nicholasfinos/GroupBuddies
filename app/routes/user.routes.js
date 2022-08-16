const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/student", [authJwt.verifyToken], controller.studentBoard);

  app.get(
    "/api/test/tutor",
    [authJwt.verifyToken, authJwt.isTutor],
    controller.TutorBoard
  );

  app.get(
    "/api/test/subjectcoordinator",
    [authJwt.verifyToken, authJwt.isSubjectCoordinator],
    controller.SubjectCoordinatorBoard
  );
};