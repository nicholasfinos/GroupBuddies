const mongoose = require("mongoose");

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }],
    subjectName: String,
    tutorialNumber: String,
    groupNumber: String,
    groupTopics: Array
  })
);

module.exports = Group;