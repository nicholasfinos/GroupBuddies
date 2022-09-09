const mongoose = require("mongoose")

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subjectName: String,
        tutorialNumbers: Number,
        semester: String,
        groupAssessment: Boolean,
        subjectTopics: Array,
        tutorials: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutorial"
        }],
        subjectCoordinator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Subject;