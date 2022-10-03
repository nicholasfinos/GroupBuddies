const mongoose = require("mongoose");

const StudentProfile = mongoose.model(
  "StudentProfile",
  new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String,
    subjectName: String,
    tutorialNumber: String,
    groupNumber: String,
    subjectTopics: Array,
  })
);

module.exports = StudentProfile;