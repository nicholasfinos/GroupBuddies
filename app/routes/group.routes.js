module.exports = app => {
    const group = require("../controllers/group.controller");
    var router = require("express").Router();
  
    // Add Student into Group
    router.post("/addStudent/:id", group.addStudent);

    // Remove Student into Group
    router.post("/removeStudent/:id", group.removeStudent);
  
    app.use('/api/group', router);
};