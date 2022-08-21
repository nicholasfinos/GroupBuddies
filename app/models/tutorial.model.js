const mongoose = require("mongoose")

const Tutorial = mongoose.model({
    number: String,
    timeSlot: String,
    tutor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    allStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = Tutorial;