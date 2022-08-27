const mongoose = require("mongoose")

const Tutorial = mongoose.model(
    "Tutorial",
    new mongoose.Schema({
        subjectName: String,
        number: String,
        timeSlot: String,
        day: String,
        tutor: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        allStudents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    })
);

module.exports = Tutorial;