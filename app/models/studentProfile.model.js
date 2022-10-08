const mongoose = require("mongoose");

const StudentProfile = mongoose.model(
  "StudentProfile",
  new mongoose.Schema({
    username: String,
    subjectName: String,
    tutorialNumber: String,
    groupNumber: String,
    subjectTopics: Array,
  })
);

module.exports = StudentProfile;