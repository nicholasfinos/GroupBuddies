module.exports = app => {
  const subject = require("../controllers/subject.controller");
  var router = require("express").Router();

  // Retrieves all Subjects made by a particular user
  router.get("/view/:username", subject.viewSubjects);

  // Create a new Subject
  router.post("/create/:username", subject.createSubject);

  app.use('/api/subject', router);
};
