const controller = require("../controllers/subject.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    
    app.get("/api/subject/view", controller.viewSubject);

    app.post("/api/subject/create/:username", controller.createSubject);
};