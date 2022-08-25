const Subject = require("../models/subject.model");

exports.viewSubjects = (req, res) => {
  Subject.find({subjectCoordinator: req.params.username})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects.",
      });
    });
};

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: req.params.username,
    subjectName: req.body.subjectName,
    groupAssessment: req.body.groupAssessment,
    numberTutorials: req.body.numberTutorials,
    topics: req.body.topics,
    semester: req.body.semester,
  });

  if(req.body.topics?.length !== 0){
    const splitQuery = req.body.topics?.split(",")
    var i = 0
    for (i = 0; i < splitQuery?.length; i++){
        subject.subjectTopics[i] = splitQuery[i].trim()
    }
  }

  // temp solution: (perm. soln to make all fields compulsory)
  if(req.body.numberTutorials === undefined){
    subject.numberTutorials = 0;
  } else {
    subject.numberTutorials = parseInt(req.body.numberTutorials);
  }

  if(req.params.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  } else {
    subject.groupAssessment = false;
  }

  console.log(subject)

  subject.save((err, subject) => {
    if (err) {
      res.status(500).send({ message : err });
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