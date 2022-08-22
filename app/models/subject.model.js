const mongoose = require("mongoose")

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subjectName: String,
        numberTutorial: Number,
        semester: String,
        groupAssessment: Boolean,
        topics: Array,
        tutorial: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutorial"
        }],
        subjectCoordinator: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    })
);

module.exports = Subject;