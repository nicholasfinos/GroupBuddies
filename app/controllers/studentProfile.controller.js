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