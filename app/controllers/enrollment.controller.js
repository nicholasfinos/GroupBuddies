const Enrollment = require("../models/enrollment.model");
const User = require("../models/user.model");
const Subject = require("../models/subject.model");

exports.createEnrollmentRequest = (req, res) => {
    const enrollment = new Enrollment({
        subjectName: req.body.subjectName,
        username: req.params.username,
        strengths: req.body.strengths,
        weaknesses: req.body?.weaknesses,
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

exports.getAll = (req, res) => {
    Enrollment.find()
    .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retreiving Enrollments"});
      })
}

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