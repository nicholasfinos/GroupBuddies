module.exports = app => {
  const subject = require("../controllers/subject.controller");
  // const peerRequest = require("../controllers/peerRequest.controller");
  var router = require("express").Router();

  // Retrieves all Subjects made by a particular user
  router.get("/view/:username", subject.viewSubjects);

  // Create a new Subject
  router.post("/create/:username", subject.createSubject);

  //Find one subject 
  router.get("/findOne/:subjectName", subject.findOneSubject);

  //Find Tutorial associated to Subject 
  router.get("/findTutorial/:subjectName", subject.findTutorial);

  router.get(`/create/:username`, subject.getAll)

  router.get("/findTutorialByTutor/:_id", subject.findTutorialByTutor)

  // app.get("/api/request/create/:username", subject.getPeers)

  app.use('/api/subject', router);
};
