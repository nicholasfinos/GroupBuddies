const db = require("../models");
const { role: Role } = db;

exports.getRoleId = (req, res) => {
    Role.find({name: req.params.rolename})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Role related to " + req.params.rolename });
    })
};