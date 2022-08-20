const mongoose = require("mongoose");

const StudentProfile = mongoose.model(
  "StudentProfile",
  new mongoose.Schema({
    userId: String,
    strengths: [],
    weaknesses: []
  })
);

module.exports = StudentProfile;