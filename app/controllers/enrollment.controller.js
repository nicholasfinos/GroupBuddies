const Enrollment = require("../models/enrollment.model");
const User = require("../models/user.model");
const Subject = require("../models/subject.model");
const Tutorial = require("../models/tutorial.model");
const StudentProfile = require("../models/studentProfile.model")

exports.createEnrollmentRequest = (req, res) => {
  const enrollment = new Enrollment({

    subjectName: req.body.subjectName,
    username: req.params.username,
    subjectTopics: req.body.subjectTopics,
    tutorialNumber: req.body.tutorialNumber,
    status: "Pending",
    reason: ""
  })

  enrollment.save((err, enrollment) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    else {
      res
        .status(200)
        .send({
          message: "Enrollment " + enrollment.subjectName + " has been created for: " + req.params.username,
        });
    }
  })
};

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

exports.viewEnrollmentByUsername = (req, res) => {
  Enrollment.find({ username: req.params.username })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Enrollments" });
    })
}

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

exports.viewEnrollmentBySubjectName = (req, res) => {
  Enrollment.find({ subjectName: req.params.subjectName, status: {$eq: "Pending"} })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Enrollments" });
    })
}

exports.updateEnrollment = (req, res) => {

  Enrollment.updateOne(
    {
      _id: req.body.enrollment._id
    },
    {
      $set: { status: req.body.status, reason: req.body.reason}
    }
  ).then((a) => console.log(a));

  if(req.body.status !== "Declined") {
    User.find({
      username: req.body.enrollment.username
    }).then((data) => {
      var studentProfile = new StudentProfile({
        student: data._id,
        username: req.body.enrollment.username,
        subjectName: req.body.enrollment.subjectName,
        tutorialNumber: req.body.enrollment.tutorialNumber,
        groupNumber: "",
        subjectTopics: req.body.enrollment.subjectTopics,
      })
  
      studentProfile.save((err, studentProfile) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
      })
    })
  
  
    StudentProfile.find({ username: req.body.enrollment.username })
      .then((x) => {
        var data = {
          _id: x[0].id,
          username: x[0].username,
          subjectTopics: x[0].subjectTopics
        };
  
        Tutorial.updateOne(
          {
            subjectName: req.body.enrollment.subjectName,
            number: req.body.enrollment.tutorialNumber
          },
          {
            $push: {
              UnselectedStudents: data,
              allStudents: data
            }
          }
        ).then((h) => {
            console.log(h);
          })
  
          Subject.updateOne(
          {
            subjectName: req.body.enrollment.subjectName
          },
          {
            $push: {
              students: data
            }
          }
        ).then((h) => {
            console.log(h);
          })
      })
  }
}