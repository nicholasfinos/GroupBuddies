const Enrollment = require("../models/enrollment.model");
const User = require("../models/user.model");
const Subject = require("../models/subject.model");
const Tutorial = require("../models/tutorial.model");

exports.createEnrollmentRequest = (req, res) => {
  console.log(req.body)
    const enrollment = new Enrollment({

        subjectName: req.body.subjectName,
        username: req.params.username,
        subjectTopics: req.body.subjectTopics,
        tutorialNumber: req.body.tutorialNumber,
        status: "Pending",
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

exports.viewEnrollmentByUsername = (req, res) => {
    Enrollment.find({username: req.params.username})
    .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retreiving Enrollments"});
      })
}

exports.findTutorial = (req, res) => {
  console.log(req);
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

//     Role.find({ name: "tutor" })
//     .then(data => {
//       const tutorId = data[0]._id
//       User.find({ roles: [tutorId] })
//         .then(data => {
//           res.send(data);
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while retrieving tutor."
//           });
//         });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving role: tutor."
//       }
//     );
//   });