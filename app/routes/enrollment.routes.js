module.exports = app => {
    const enrollment = require("../controllers/enrollment.controller");
    const subject = require("../controllers/subject.controller");
    var router = require("express").Router();
  
    // Creates an enrollment
    router.post(`/create/:username`, enrollment.createEnrollmentRequest);

    router.get(`/create/:username`, subject.getAll)

    router.get(`/view/:username`, enrollment.viewEnrollmentByUsername)

    router.get("/findTutorial/:subjectName", enrollment.findTutorial);

    router.get(`/view/:username`, enrollment.viewSubjects);

    router.get("/viewEnrollment/:subjectName", enrollment.viewEnrollmentBySubjectName);

    router.put("/updateEnrollment", enrollment.updateEnrollment);
  
    app.use('/api/enrollment', router);
};
  