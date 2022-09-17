const User = require("../models/user.model");
const Role = require("../models/role.model");
const Tutorial = require("../models/tutorial.model");
const Group = require("../models/group.model");
const StudentProfile = require("../models/studentProfile.model");
const ArrayList = require("arraylist");

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

exports.getUnListedStudent = (req, res) => {
  Tutorial.findById(req.params._id)
    .then(data => {
      res.send(data.UnselectedStudents);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role: tutor."
      }
      );
    });
};

exports.getlistGroups = (req, res) => {
  Tutorial.findById(req.params._id)
    .then(data => {
      res.send(data.groups);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role: tutor."
      }
      );
    });
};

exports.addGroup = (req, res) => {
  var group = new Group({
    subjectName: req.body.subjectName,
    tutorialNumber: req.body.number,
    groupNumber: req.body.numberGroups + 1
  })
  
  Tutorial.updateOne(
    { id: req.body.id },
    {
      $inc: { numberGroups: 1 },
      $push: { groups: group.id }
    }
  ).then((y) => { })

  group.save((err, group) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })
}

exports.addStudentGroup = (req, res) => {
  StudentProfile.updateOne(
    {id: req.body.student.id},
    {
      $set: {GroupNumber: req.body.group.groupNumber}
    }
  ).then((h) => console.log(h));

  Group.updateOne(
    {id: req.body.group.id},
    {
      $push: {students: req.body.student.id}
    }
  ).then((g) => console.log(g));
}

exports.removeStudentGroup = (req, res) => {
  Tutorial.updateOne(
    {
      subjectName: req.body.group.subjectName,
      tutorialNumber: req.body.group.tutorialNumber
    },
    {
      $push: {UnselectedStudents: req.body.student.id}
    }
  ).then((h) => console.log(h));

  Group.updateOne(
    {id: req.body.group.id},
    {
      $pull: {students: req.body.student.id}
    }
  ).then((g) => console.log(g));
}

exports.removeGroup = (req, res) => {
  if (req.body.students.size !== 0) {
    var listStudent = new ArrayList();
    listStudent = req.body.students;

    for (let i = 0; i < listStudent.size; i++) {
      Tutorial.updateOne(
        {
          subjectName: req.body.subjectName,
          tutorialNumber: req.body.tutorialNumber
        },
        { $push: { UnselectedStudents: listStudent[i] } }
      )
    }
  }

  Tutorial.updateOne({
    subjectName: req.body.subjectName,
    number: req.body.tutorialNumber
  },
    {
      $pull: { groups: req.body.id },
      $inc: { numberGroups: -1 },
    }).then((e) => { console.log(e) });

  Group.deleteOne({id: req.body.id});
}

exports.getTutorial = (req, res) => {
  Tutorial.findById(req.params._id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial related to " + req.params.id });
    })
};

exports.findTutorials = (req, res) => {
  //Find all Tutorial that is associated to Tutor
  Tutorial.find({ tutor: [req.params._id] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Tutorial " });
    })
};