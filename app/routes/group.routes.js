module.exports = app => {
    const group = require("../controllers/group.controller");
    var router = require("express").Router();
  
    // Get Group
    router.get("/viewGroup/:id", group.viewGroup);
  
    // Add Student into Group
    router.post("/addStudent/:id", group.addStudent);

    // Remove Student into Group
    router.post("/removeStudent/:id", group.removeStudent);
  
    app.use('/api/group', router);
};