const db = require("../models");
const { user: User } = db;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.TutorBoard = (req, res) => {
  res.status(200).send("Tutor Content.");
};

exports.SubjectCoordinatorBoard = (req, res) => {
  res.status(200).send("Subject Coordinator Content.");
};

exports.updateStudent = (req, res) => {
  User.findOneAndUpdate({
    username: req.body.username,
    year: req.body.year,
    course: req.body.course
  })
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!req.body.year || !req.body.course) {
        return res.status(404).send({ message: "Need year and course" });
      }

      res.status(200).send({
        year: user.year,
        course: user.course
      });
    })
}