const mongoose = require("mongoose");

const StudyGroup = mongoose.model(
  "StudyGroup",
  new mongoose.Schema({
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: String,
    members: Array,
    subjectName: String
  })
);

module.exports = StudyGroup;