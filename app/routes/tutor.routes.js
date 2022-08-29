module.exports = app => {
    const tutor = require("../controllers/tutor.controller");
    var router = require("express").Router();
  
    // Retrieves all Tutors 
    router.get('/view', tutor.findAllTutors)

     // Retrieves all Tutors in the CreateNewSubject page
     router.get('/find/:_id', tutor.findTutor)
  
    app.use('/api/tutor', router);
  };
  