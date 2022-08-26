const db = require("../models");
const { user: User, studentProfile: StudentProfile } = db;

exports.getStudentProfile = async (req, res) => {
  // need a user, strengths, weaknesses

  if (!req.body._id) {
    return res.status(400).json({ message: "No User" })
  }

  if (!req.body.strengths) {
    return res.status(400).json({ message: "No Strengths" })
  }

  if (!req.body.weaknesses) {
    return res.status(400).json({ message: "No Weaknesses" })
  }

  User.findOne({
    _id: req.body._id
  })
    .then(async (data) => {
      await new StudentProfile({
        userId: data._id,
        strengths: [req.body.strengths],
        weaknesses: [req.body.weaknesses]
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added profile to studentProfiles collection");
      });
      return res.status(200).send({ message: "Complete" });
    });
}