module.exports = app => {
    const tutor = require("../controllers/tutor.controller");
    var router = require("express").Router();
  
    // Retrieves all Tutors 
    router.get('/view', tutor.findAllTutors)

     // Retrieves all Tutors in the CreateNewSubject page
     router.get('/findTutorials/:_id', tutor.findTutorial)

     router.get('/find/:_id', tutor.getTutor)
  
    app.use('/api/tutor', router);
  };
  