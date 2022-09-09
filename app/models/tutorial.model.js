const mongoose = require("mongoose")

const Tutorial = mongoose.model(
    "Tutorial",
    new mongoose.Schema({
        subjectName: String,
        number: String,
        timeSlot: String,
        day: String,
        tutor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        allStudents: Array,
        UnselectedStudents: Array,
        numberGroups: Number,
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }]
    })
);

module.exports = Tutorial;