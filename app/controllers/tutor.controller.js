const User = require("../models/user.model");
const Role = require("../models/role.model");
const Tutorial = require("../models/tutorial.model");
const Group = require("../models/group.model");
const StudentProfile = require("../models/studentProfile.model");
const Subject = require("../models/subject.model");
// const ArrayList = require("arraylist");

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

exports.getGroup = (req, res) => {
  Group.findById(req.params._id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Group related to " + req.params._id });
    })
};

exports.addGroup = (req, res) => {
  if (req.body.groups.length !== 0) {
    var group = new Group({
      subjectName: req.body.subjectName,
      tutorialNumber: req.body.number,
      groupNumber: parseInt(req.body.groups[req.body.groups.length - 1].groupNumber) + 1
    })
  }
  else {
    var group = new Group({
      subjectName: req.body.subjectName,
      tutorialNumber: req.body.number,
      groupNumber: 1
    })
  }

  var data = {
    _id: group._id,
    groupNumber: group.groupNumber
  }

  group.save((err, group) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })

  Tutorial.updateOne(
    { _id: req.body._id },
    {
      $inc: { numberGroups: 1 },
      $push: { groups: data }
    }
  ).then((y) => { })

  Tutorial.find({ _id: req.body._id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial" });
    })
}

exports.addStudentGroup = (req, res) => {
  StudentProfile.updateOne(
    { username: req.body.student.username },
    {
      $set: { groupNumber: req.body.group.groupNumber }
    }
  ).then((h) => console.log(h));

  var addedStudent = {
    _id: req.body.student._id,
    username: req.body.student.username,
    subjectTopics: req.body.student.subjectTopics
  }

  var ungroupedList = req.body.tutorial.UnselectedStudents.filter(student => student.username !== req.body.student.username);

  Tutorial.updateOne(
    {
      _id: req.body.tutorial._id
    },
    {
      $set: { UnselectedStudents: ungroupedList }
    }
  ).then((h) => console.log(h));

  Group.updateOne(
    { _id: req.body.group._id },
    {
      $push: { students: addedStudent }
    }
  ).then((g) => console.log(g));
}

exports.removeStudentGroup = (req, res) => {
  Tutorial.find({
    subjectName: req.body.group.subjectName,
    tutorialNumber: req.body.group.tutorialNumber
  })
    .then((tut) => {
      var stu = {
        _id: req.body.student._id,
        username: req.body.student.username,
        subjectTopics: req.body.student.subjectTopics
      }

      Tutorial.updateOne(
        {
          _id: req.body.tutorial._id
        },
        {
          $push: { UnselectedStudents: stu }
        }
      ).then((h) => console.log(h));
    })

  var studentListlist = req.body.group.students.filter(student => student.username !== req.body.student.username);

  Group.updateOne(
    {
      _id: req.body.group._id
    },
    {
      $set: { students: studentListlist }
    }
  ).then((g) => console.log(g));

  StudentProfile.updateOne(
    { username: req.body.student.username },
    {
      $set: { groupNumber: "" }
    }
  ).then((h) => console.log(h));
}

exports.removeGroup = (req, res) => {
  if (req.body.studentList.length !== 0) {
    for (let i = 0; i < req.body.studentList.length; i++) {
      Tutorial.updateOne(
        {
          _id: req.body.tutorial._id
        },
        { $push: { UnselectedStudents: req.body.studentList[i] } }
      ).then((g) => console.log(g));
    }
  }

  var removedGroup = {
    _id: req.body.group._id,
    groupNumber: req.body.group.groupNumber
  }

  Tutorial.find({
    _id: req.body.tutorial._id
  })
    .then((data) => {
      var list = data[0].groups.filter(group => group.groupNumber !== removedGroup.groupNumber);

      Tutorial.updateOne({
        _id: req.body.tutorial._id
      },
        {
          $set: { groups: list },
          $inc: { numberGroups: -1 },
        }).then(
          Group.deleteOne({
            subjectName: req.body.group.subjectName,
            tutorialNumber: req.body.group.tutorialNumber,
            groupNumber: req.body.group.groupNumber
          }).then((g) => console.log(g))
        ).catch((e) => { console.log(e) });
    })
}

exports.getTutorial = (req, res) => {
  Tutorial.findById(req.params._id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial related to " + req.params._id });
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

exports.autoSort = (req, res) => {
  var tutorial = req.body.tutorial;
  var subject = req.body.subject;
  var studentList = req.body.studentList;
  var groupSize = parseInt(req.body.groupSize);
  var topicList = [[], [], [], [], [], [], [], [], [], []];

  //Adding students into Topic List
  for (let i = 0; i < studentList.length; i++) {
    var x = 0;
    for (let j = 0; j < subject.subjectTopics.length; j++) {
      if (subject.subjectTopics[j] === studentList[i].subjectTopics[x]) {
        if (x === 0) {
          topicList[j].push(studentList[i]);
        }
        else if (x === 1) {
          topicList[j].splcie(((topicList[j].length - 1) / 2), 0, studentList[i]);
        }
        else {
          topicList[j].splcie(topicList[j].length - 1, 0, studentList[i])
          break;
        }
        x++;
      }
    }
  }
  //Remove Topic list that are empty
  var z = 0;
  while (z < topicList.length) {
    if (topicList[z].length === 0) {
      topicList.splice(z, 1);
    }
    else {
      z++;
    }
  }

  //Creating Groups for Tutorial
  var groupID = [];
  var groups = []

  for (let i = 1; i <= groupSize; i++) {
    var group;
    if (tutorial.groups.length === 0) {
      group = new Group({
        subjectName: subject.subjectName,
        tutorialNumber: tutorial.number,
        groupNumber: i,
        students: ""
      })
    }
    else {
      group = new Group({
        subjectName: subject.subjectName,
        tutorialNumber: tutorial.number,
        groupNumber: parseInt(tutorial.groups[tutorial.groups.length - 1].groupNumber) + i,
        students: ""
      })
    }

    groups.push(group);

    var data = {
      _id: group._id,
      groupNumber: group.groupNumber
    }

    groupID.push(data);
  }

  Tutorial.updateOne(
    {
      _id: tutorial._id
    },
    {
      $push: { groups: groupID },
      $inc: { numberGroups: groupID.length }
    }
  ).then((a) => console.log(a));

  //Adding Students into Groups
  var k = 0;
  var start = 0;
  var groupList = []

  for (let i = 0; i < groupSize; i++) {
    groupList.push([]);
  }

  //If their is equal topic and group size then do else statement
  if (topicList.length !== groupSize) {
    while (topicList.length !== 0) {
      for (let i = 0; i < groupID.length; i++) {
        if (topicList.length === 0) {
          break;
        }
        var student = topicList[k][0];
        //console.log("1st")
        //console.log("Student: ", student);

        //Add Student Group
        //console.log("2nd");
        groupList[i].push(student);
        //console.log("GroupList", groupList)

        StudentProfile.updateOne(
          {
            username: student.username
          },
          { $set: { groupNumber: groupID[i].groupNumber } }
        ).then((u) => console.log(u));

        //Remove Student and Topic
        var z = 0;
        while (z < topicList.length) {
          var y = 0;
          while (y < topicList[z].length) {
            if (topicList[z][y].username === student.username) {
              // console.log("3rd");
              //console.log("List: ", z + " Pos: ", y);
              topicList[z].splice(y, 1);
            }
            else {
              y++;
            }
          }
          if (topicList[z].length === 0) {
            //console.log("4th")
            //console.log("Remove List", z);
            topicList.splice(z, 1);
          }
          else {
            z++;
          }
        }

        //If K is at end of topic list then restart to beginning
        if (k >= topicList.length - 1) {
          //console.log("5th restart list")
          k = 0;
        }
        else {
          k++;
          //console.log("6th k: ", k)
        }
      }
    }
  }
  else {
    while (studentList.size !== 0) {
      for (let i = 0; i < groupID.size; i++) {
        var student = topicList[k];

        //Add Student Group
        console.log("2nd");
        groupList[i].push(student);
        console.log("GroupList", groupList)

        //Remove Student and Topic
        var z = 0;
        while (z < topicList.length) {
          var y = 0;
          while (y < topicList[z].length) {
            if (topicList[z][y].username === student.username) {
              console.log("3rd");
              console.log("List: ", z + " Pos: ", y);
              topicList[z].splice(y, 1);
            }
            else {
              y++;
            }
          }
          if (topicList[z].length === 0) {
            console.log("4th")
            console.log("Remove List", z);
            topicList.splice(z, 1);
          }
          else {
            z++;
          }
        }

        //If K is at end of topic list then restart to beginning
        if (k >= topicList.size - 1) {
          k = 0;
        }
        else {
          k++;
        }
      }
    }
    start++;
    if (start >= topicList.size) {
      start = 0;
    }
    k = start;
  }

  for (let i = 0; i < groupList.length; i++) {

    groups[i].students = groupList[i];

    groups[i].save((err, groups) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    })
  }

  var t = [];

  Tutorial.updateOne(
    {
      _id: tutorial._id
    },
    {
      $set: { UnselectedStudents: t }
    }
  ).then((h) => console.log(h));
};