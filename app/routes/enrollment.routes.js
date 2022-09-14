module.exports = app => {
    const enrollment = require("../controllers/enrollment.controller");
    const subject = require("../controllers/subject.controller");
    var router = require("express").Router();
  
    // Creates an enrollment
    router.post(`/create/:username`, enrollment.createEnrollmentRequest);

    router.get(`/create/:username`, subject.getAll)

    router.get(`/view/:username`, enrollment.viewEnrollmentByUsername)
    
    router.get(`/tutorialEnrollments`, enrollment.getTutorialEnrollments)

    app.use('/api/enrollment', router);
};
  