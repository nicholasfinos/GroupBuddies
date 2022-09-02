const Subject = require("../models/subject.model");
const User = require("../models/user.model");
const Tutorial = require("../models/tutorial.model");
const { ObjectId } = require("mongodb");

exports.viewSubjects = (req, res) => {
  User.find({ username: req.params.username })
    .then((data) => {
      Subject.find({ subjectCoordinator: [data[0]._id] })
        .then((doc) => {
          res.status(200).send(doc);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving subjects.",
          });
        });
    })
};

exports.findTutorial = (req, res) => {
  Tutorial.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial related to " + req.body.subjectName });
    })
};

exports.findTutorialByTutor = (req, res) => {
  Tutorial.find({ tutor: [req.params._id] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Tutorial " });
    })
};

exports.findOneSubject = (req, res) => {
  Subject.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Subject with name " + req.body.subjectName });
    })
};

exports.findSubjectById = (req, res) => {
  Subject.find({ _id: req.params.subjectId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Subject with name " + req.body.subjectName });
    })
};

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: req.params.username,
    subjectName: req.body.subjectName,
    groupAssessment: req.body.groupAssessment,
    tutorialNumbers: parseInt(req.body.tutorialNumbers),
    subjectTopics: req.body.subjectTopics,
    semester: req.body.semester,
    tutorials: null
  });

  if (req.body.subjectTopics?.length !== 0) {
    const splitQuery = req.body.subjectTopics?.split(",")
    var i = 0
    for (i = 0; i < splitQuery?.length; i++) {
      subject.subjectTopics[i] = splitQuery[i].trim()
    }
  }

  if (req.body.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  } else {
    subject.groupAssessment = false;
  }


  for (let i = 0; i < subject.tutorialNumbers; i++) {
    const tutorial = new Tutorial({
      subjectName: req.body.subjectName,
      number: (i + 1),
      timeSlot: req.body.assignedTutor[i].timeSlot,
      day: req.body.assignedTutor[i].day,
      tutor: null,
      allStudents: null
    });

    User.find({ username: req.body.assignedTutor[i].username })
      .then((data) => {
        tutorial.tutor = data
        tutorial.save((err, tutorial) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })
      });

    if (i === 0) {
      subject.tutorials = tutorial._id;
    }
    else {
      subject.tutorials.push(tutorial._id);
    }
  }

  User.find({ username: req.params.username })
    .then((data) => {
      subject.subjectCoordinator = data;

      subject.save((err, subject) => {
        if (err) {
          res.status(500).send({ message: err });
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

exports.updateSubject = (req, res) => {
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  Subject.updateOne({_id: ObjectId(req.params.subjectId)},
    {$set: {
      "subjectTopics": req.body.subjectTopics,
      "tutorials": req.body.tutorials,
      "groupAssessment": req.body.groupAssessment, 
      "tutorialNumbers": req.body.tutorialNumbers,
      "semester": req.body.semester,
    }})
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subject!`,
        });
      } else res.send({ message: "Subject was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Subject",
      });
    });
};