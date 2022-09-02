module.exports = app => {
  const subject = require("../controllers/subject.controller");
  var router = require("express").Router();

  // Retrieves all Subjects made by a particular user
  router.get("/view/:username", subject.viewSubjects);

  // Create a new Subject
  router.post("/create/:username", subject.createSubject);

  //Find one subject 
  router.get("/findOne/:subjectName", subject.findOneSubject);

  // Retrieves a subject by id
  router.get("/:username/:subjectId", subject.findSubjectById);

  //Find Tutorial assocaited to Subject 
  router.get("/findTutorial/:subjectName", subject.findTutorial);

  router.get("/findTutorialByTutor/:_id", subject.findTutorialByTutor)

  router.put("/:username/:subjectId", subject.updateSubject);

  app.use('/api/subject', router);
};
