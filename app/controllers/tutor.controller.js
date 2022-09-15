const User = require("../models/user.model");
const Role = require("../models/role.model");
const Tutoiral = require("../models/tutorial.model");

exports.findAllTutors = (req, res) => {
    Role.find({ name: "tutor" })
    .then(data => {
      const tutorId = data[0]._id
      User.find({ roles: [tutorId] })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutor."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role: tutor."
      }
    );
  });
};

exports.getTutor = (req, res) => {
  User.findById(req.params._id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving role: tutor."
    }
  );
});
};

exports.findTutorial = (req, res) => {
    //Find all Tutorial that is associated to Tutor
    Tutoiral.find({ tutor: [req.params._id] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Tutorial " });
    })
};