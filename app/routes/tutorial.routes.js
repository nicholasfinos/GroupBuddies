module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller");
    var router = require("express").Router();
  
    // Sort Group Automatically
    router.post("/createAutomatically/:id", tutorial.sortAutomatically);
  
    // Sort Group Manually
    router.post("/createManually/:id", tutorial.sortManually);

    // Find Tutorial
    router.get("/getTutorial/:id", tutorial.getTutorial);
  
    app.use('/api/tutorial', router);
};
  