const mongoose = require("mongoose");

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    students: Array,
    subjectName: String,
    tutorialNumber: String,
    groupNumber: String,
    groupTopics: Array
  })
);

module.exports = Group;