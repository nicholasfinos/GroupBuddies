const mongoose = require("mongoose");

const Enrollment = mongoose.model(
  "Enrollment",
    new mongoose.Schema({
        subjectName: String,
        username: String, 
        strengths: [String],
        weaknesses: [String],
    })
);

module.exports = Enrollment;