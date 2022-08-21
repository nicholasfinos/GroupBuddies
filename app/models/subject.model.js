const mongoose = require("mongoose")

const Subject = mongoose.model({
    name: String,
    numberTutorial: Number,
    semester: String,
    groupAssessment: Boolean,
    topics: Array,
    tutroial: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tutorial"
    }],
    subjectCoordinator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = Subject;