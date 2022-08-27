const { ConnectionPoolClosedEvent } = require("mongodb");
const Subject = require("../models/subject.model");
const User = require("../models/user.model");

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

exports.findOneSubject = (req, res) => {
  Subject.findOne({subjectName: req.body.subjectName})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Subject with name " + req.body.subjectName});
    })
}

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: req.params.username,
    subjectName: req.body.subjectName,
    groupAssessment: req.body.groupAssessment,
    tutorialNumbers: parseInt(req.body.tutorialNumbers),
    subjectTopics: req.body.subjectTopics,
    semester: req.body.semester,
  });

  if(req.body.subjectTopics?.length !== 0){
    const splitQuery = req.body.subjectTopics?.split(",")
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

  if(req.body.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  } else {
    subject.groupAssessment = false;
  }

  User.find({username: req.params.username})
    .then((data) => {
      subject.subjectCoordinator = data;

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
    })
};