const mongoose = require("mongoose")

const Subject = mongoose.model(
    "Subject",
    new mongoose.Schema({
        subjectName: String,
        numberTutorials: Number,
        semester: String,
        groupAssessment: Boolean,
        subjectTopics: Array,
        // tutorial: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Tutorial"
        // }],
        subjectCoordinator: String
        // [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // }]
    })
);

module.exports = Subject;