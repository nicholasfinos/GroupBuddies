const Subject = require("../models/subject.model");

//Create and Save a new Subject
exports.createSubject = (req, res) => {
  //Create Subject
  const subject = new Subject({
    username: req.body.username,
    subjectName: req.body.subjectName,
    tutorialNumber: parseInt(req.bod.tutorialNumber),
    groupAssessment: false,
    semester: req.body.semester,
    subjectTopic: "",
  });

  if(req.body.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  }
  else {
    subject.groupAssessment = false;
  }

  if(req.body.subjectTopic.length !== 0) {
    subject.subjectTopic = req.body.subjectTopic.split(",");
  }

  subject.save((err, subject) => {
    if(err) {
      res.status(500).send({message:err});
      return;
    }
    else {
      res
        .status(200)
        .send({
          message: "Subject has been created for: " + req.body.username,
        });
    }
  });
};