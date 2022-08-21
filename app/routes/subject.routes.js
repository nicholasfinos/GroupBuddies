module.exports = app => {
    const subjects = require("../controllers/subject.controller.js");
    var router = require("express").Router();

    //Create a new Subject
    router.post("/create/:username", subjects.createSubject);

    app.use('/api/subject', router);
};