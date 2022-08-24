module.exports = app => {
  const subject = require("../controllers/subject.controller");
  var router = require("express").Router();

  // Create a new Subject
  router.post("/create/:username", subject.createSubject);

  app.use('/api/subject', router);
};
