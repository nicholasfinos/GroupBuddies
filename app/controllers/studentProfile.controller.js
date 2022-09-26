const db = require("../models");
const StudentProfile = require("../models/studentProfile.model");

exports.getStudentProfile = async (req, res) => {
  const studentProfile = new StudentProfile ({
    student: req.body.id,
    username: req.body.username,
    subjectName: req.body.subjectName,
    tutorialNumber: req.body.tutorialNumber,
    subjectTopics: req.body.subjectTopics
  })

  studentProfile.save((err, studentProfile) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })
}

exports.getStudentUsername = (req, res) => {
  StudentProfile.find({username: req.body.username})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retriving Student Profile" });
  })
}

exports.getProfile = (req, res) => {
  StudentProfile.findById(req.params.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retriving Student Profile" });
  })
}