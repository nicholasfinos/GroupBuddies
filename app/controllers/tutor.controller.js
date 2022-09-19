const User = require("../models/user.model");
const Role = require("../models/role.model");
const Tutorial = require("../models/tutorial.model");
const Group = require("../models/group.model");
const StudentProfile = require("../models/studentProfile.model");
const Subject = require("../models/subject.model");
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
        .send({ message: "Error retriving Group related to " + req.params.id });
    })
};

exports.addGroup = (req, res) => {
  if(req.body.groups.length !== 0) {
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
    { id: req.body.id },
    {
      $inc: { numberGroups: 1 },
      $push: { groups: data }
    }
  ).then((y) => { })

  Tutorial.find({id: req.body._id})
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
    username: req.body.student.username
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
      console.log(req.body.studentList[i]);
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

exports.autoSort = (req, res) => {//req: list students, number groups, tutorial id 
  //console.log(req.body);
  var tutorial = req.body.tutorial;
  var subject = req.body.subject;
  var studentList = req.body.studentList;
  var groupSize = req.body.groupSize;
  var topic1 = [];
  var topic2 = [];
  var topic3 = [];
  var topic4 = [];
  var topic5 = [];
  var topic6 = [];
  var topic7 = [];
  var topic8 = [];
  var topic9 = [];
  var topic10 = [];
  var topicList = [];
  topicList.push(topic1);
  topicList.push(topic2);
  topicList.push(topic3);
  topicList.push(topic4);
  topicList.push(topic5);
  topicList.push(topic6);
  topicList.push(topic7);
  topicList.push(topic8);
  topicList.push(topic9);
  topicList.push(topic10);
  //Adding students into Topic List
  for (let i = 0; i < 1; i++) {
    StudentProfile.findById(studentList[i]._id)
      .then((stu) => {
        var x = 0;
        for (let j = 0; j < subject.subjectTopics.length; j++) {
          if (subject.subjectTopics[j] === stu.subjectTopcis[x]) { //Remeber to change
            if (x === 0) {
              topicList[j].push(0, stu);
            }
            // else if (x === 1) {
            //   topicList[j].add(((topicList[j].length - 1) / 2), stu);
            // }
            // else {
            //   topicList[j].add(stu);
            //   break;
            // }
            x++;
          }
      }
      console.log(topicList);
    })
    }
    console.log(topicList);

  // //Remove Topic list that are empty
  // var removeList = new ArrayList();
  // for (let i = 0; i < topicList.size; i++) {
  //   if (topicList[i].size === 0) {
  //     removeList.add(i);
  //   }
  // }

  // for (let j = 0; j < removeList.size; j++) {
  //   topicList.remove(removeList[j]);
  // }

  // //Creating Groups for Tutorial
  // var groupSize = parseInt(req.body.numberGroups);
  // var groupID = new ArrayList();

  // for (let i = 1; i <= groupSize; i++) {
  //   var group = {
  //     subjectName: subject.subjectName,
  //     tutorialNumber: tutorial.number,
  //     groupNumber: i
  //   }

  //   group.save((err, group) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     groupID.add(group._id);
  //   })
  // }

  // //Adding Students into Groups
  // var k = 0;
  // var start = 0;
  // //If their is equal topic and group size then do else statement
  // if (topicList.size !== groupSize) {
  //   while (studentList.size !== 0) {
  //     for (let i = 0; i < groupID.size; i++) {
  //       var student = topicList[k];

  //       //Add student into group
  //       Group.updateOne(
  //         { _id: groupID[i] },
  //         { $push: { students: student.id } }
  //       );

  //       //Incase topic is empty after removing student
  //       var removeTopic = new ArrayList();

  //       //Remove student from all list
  //       for (let j = 0; j < topicList.size; j++) {
  //         topicList[j].remove(student);
  //         if (topicList[j].size === 0) {
  //           removeTopic.add(j);
  //         }
  //       }

  //       for (let m = 0; m < removeTopic.size; m++) {
  //         topicList.remove(removeTopic[m]);
  //       }

  //       studentList.remove(student);

  //       //If K is at end of topic list then restart to beginning
  //       if (k === topicList.size - 1) {
  //         k = 0;
  //       }
  //       else {
  //         k++;
  //       }
  //     }
  //   }
  // }
  // else {
  //   while (studentList.size !== 0) {
  //     for (let i = 0; i < groupID.size; i++) {
  //       var student = topicList[k];

  //       //Add student into group //Need to figure out how to add group topics
  //       Group.updateOne(
  //         { _id: groupID[i] },
  //         { $push: { students: student.id } },
  //         { $inc: { groupTopics: 1 } }
  //       );

  //       //Incase topic is empty after removing student
  //       var removeTopic = new ArrayList();

  //       //Remove student from all list
  //       for (let j = 0; j < topicList.size; j++) {
  //         topicList[j].remove(student);
  //         if (topicList[j].size === 0) {
  //           removeTopic.add(j);
  //         }
  //       }

  //       for (let m = 0; m < removeTopic.size; m++) {
  //         topicList.remove(removeTopic[m]);
  //       }

  //       studentList.remove(student);

  //       //If K is at end of topic list then restart to beginning
  //       if (k === topicList.size - 1) {
  //         k = 0;
  //       }
  //       else {
  //         k++;
  //       }
  //     }
  //   }
  //   start++;
  //   if (start === topicList.size) {
  //     start = 0;
  //   }
  //   k = start;
  // }

  // Tutorial.findById(req.params._id)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving role: tutor."
  //     }
  //     );
  //   });
};