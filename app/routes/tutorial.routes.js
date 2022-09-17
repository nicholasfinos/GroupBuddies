module.exports = app => {
    const tutorial = require("../controllers/tutorial.controller");
    var router = require("express").Router();
  
    // Sort Group Automatically
    router.post("/createAutomatically/:id", tutorial.sortAutomatically);
  
    // Sort Group Manually
    router.post("/createManually/:id", tutorial.sortManually);

    // Find Tutorial
    router.get("/getTutorial/:id", tutorial.getTutorial);

    // Find Unselected Students
    router.get("/getUnselectedStudent", tutorial.getUnselectedStudent);

    // Add Group
    router.post("/addGroup", tutorial.addGroup);

    // Remove Group
    router.post("/removeGroup", tutorial.removeGroup);
  
    app.use('/api/tutorial', router);
};
  