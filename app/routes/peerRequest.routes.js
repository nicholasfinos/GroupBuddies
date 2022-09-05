const controller = require("../controllers/peerRequest.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/request/view/:username", controller.getPeerRequests);

  app.get("/api/request/create/:username/:subjectName", controller.getPeers);

  app.post("/api/request/create/:username", controller.createPeerRequests);
};