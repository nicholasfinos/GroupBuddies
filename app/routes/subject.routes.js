module.exports = app => {
  const subject = require("../controllers/subject.controller");
  // const peerRequest = require("../controllers/peerRequest.controller");
  var router = require("express").Router();

  // Retrieves all Subjects made by a particular user
  router.get("/view/:username", subject.viewSubjects);

  // returns all student subjects
  router.get("/viewAll/:username", subject.viewStudentSubjects);

  // Create a new Subject
  router.post("/create/:username", subject.createSubject);

  //Find one subject 
  router.get("/findOne/:subjectName", subject.findSubject);

  router.get("/findTutorial/:subjectName", subject.findTutorial);

  //Find Tutorial associated to Subject 
  // Retrieves a subject by id
  router.get("/:username/:subjectId", subject.findSubjectById);

  router.get(`/create/:username`, subject.getAll)

  // app.get("/api/request/create/:username", subject.getPeers)
  //Update Subject with id
  router.put("/updateSubject", subject.updateSubject);

  app.use('/api/subject', router);
};