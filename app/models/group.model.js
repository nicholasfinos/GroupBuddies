const mongoose = require("mongoose");

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile"
    }],
    subjectName: String,
    tutorialNumber: String,
    groupNumber: String,
    groupTopics: Array
  })
);

module.exports = Group;