const Subject = require("../models/subject.model");

exports.viewSubject = (req, res) => {
  res.status(200).send("test");
};

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: req.params.username,
    subjectName: req.body.subjectName,
    numberTutorials: parseInt(req.body.numberTutorials),
    groupAssessment: req.body.groupAssessment,
    semester: req.body.semester
  });

  if(req.body.topics?.length !== 0){
    const splitQuery = req.body.topics?.split(",")
    var i = 0
    for (i = 0; i < splitQuery?.length; i++){
        subject.subjectTopics[i] = splitQuery[i].trim()
    }
  }

  if(req.params.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  }
  else {
    subject.groupAssessment = false;
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
          message: "Subject " + subject.subjectName + " has been created for: " + req.params.username,
        });
    }
  });
};