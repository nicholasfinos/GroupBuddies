const mongoose = require("mongoose");

const Enrollment = mongoose.model(
  "Enrollment",
    new mongoose.Schema({
        subjectName: String,
        username: String, 
        subjectTopics: Array,
        tutorialNumber: String,
        status: String,
    })
);

module.exports = Enrollment;