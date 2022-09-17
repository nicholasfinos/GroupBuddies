const StudentProfile = require("../models/studentProfile.model");
const Group = require("../models/group.model");
const Tutorial = require("../models/tutorial.model");
const Subject = require("../models/subject.model");
const ArrayList = require("arraylist");

exports.sortAutomatically = (req, res) => {//req: list students, number groups, tutorial id 
  var tutorial;
  var subject;
  var studentList = req.body.studentList;
  var topic1 = new ArrayList();
  var topic2 = new ArrayList();
  var topic3 = new ArrayList();
  var topic4 = new ArrayList();
  var topic5 = new ArrayList();
  var topic6 = new ArrayList();
  var topic7 = new ArrayList();
  var topic8 = new ArrayList();
  var topic9 = new ArrayList();
  var topic10 = new ArrayList();
  var topicList = new ArrayList();
  topicList.add(topic1);
  topicList.add(topic2);
  topicList.add(topic3);
  topicList.add(topic4);
  topicList.add(topic5);
  topicList.add(topic6);
  topicList.add(topic7);
  topicList.add(topic8);
  topicList.add(topic9);
  topicList.add(topic10);
  
  //Setting Tutorial and Subject
  Tutorial.findById(req.body.tutorialID)
      .then((data) => {
        tutorial = data;

        Subject.find({subjectName: data.subjectName})
        .then((x) => {
          subject = x;
        })
      })

  //Adding students into Topic List
  for(let i = 0; i < studentList.size; i++) {
    StudentProfile.find({
      username: studentList[i].username,
      subjectName: tutorial.subjectName
    })
    .then((data) => {
      var x = 0;
      for(let j = 0; j < subject.subjectTopics.size; j++) {
        if(subject.subjectTopics[j] === data.subjectTopics[x]) {
          if(x === 0) {
            topicList[j].add(0, studentList[i]);
          }
          else if(x === 1) {
            topicList[j].add(((topicList[j].size - 1)/2), studentList[i]);
          }
          else {
            topicList[j].add(studentList[i]);
          }
        }
      }
    })
  }

  //Remove Topic list that are empty
  var removeList = new ArrayList();
  for(let i = 0; i < topicList.size; i++) {
    if(topicList[i].size === 0) {
      removeList.add(i);
    }
  }

  for(let j = 0; j < removeList.size; j++) {
    topicList.remove(removeList[j]);
  }

  //Creating Groups for Tutorial
  var groupSize = parseInt(req.body.numberGroups);
  var groupID = new ArrayList();

  for(let i = 1; i <= groupSize; i++) {
    var group = {
      subjectName: subject.subjectName,
      tutorialNumber: tutorial.number,
      groupNumber: i
    }

    group.save((err, group) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      groupID.add(group._id);
    })
  }

  //Adding Students into Groups
  var k = 0;
  var start = 0;
  //If their is equal topic and group size then do else statement
  if(topicList.size !== groupSize) {
    while(studentList.size !== 0) {
      for(let i = 0; i < groupID.size; i++) {
        var student = topicList[k];
  
        //Add student into group
        Group.updateOne(
          {_id: groupID[i]},
          {$push: { students: student}}
        );
        
        //Incase topic is empty after removing student
        var removeTopic = new ArrayList();
  
        //Remove student from all list
        for(let j = 0; j < topicList.size; j++) {
          topicList[j].remove(student);
          if(topicList[j].size === 0) {
            removeTopic.add(j);
          }
        }
  
        for(let m = 0; m < removeTopic.size; m++) {
          topicList.remove(removeTopic[m]);
        }
  
        studentList.remove(student);
  
        //If K is at end of topic list then restart to beginning
        if(k === topicList.size - 1) {
          k = 0;
        }
        else {
          k++;
        }
      }
    }
  }
  else {
    while(studentList.size !== 0) {
      for(let i = 0; i < groupID.size; i++) {
        var student = topicList[k];
  
        //Add student into group //Need to figure out how to add group topics
        Group.updateOne(
          {_id: groupID[i]},
          {$push: { students: student}},
          {$inc: {groupTopics: 1}}
        );
        
        //Incase topic is empty after removing student
        var removeTopic = new ArrayList();
  
        //Remove student from all list
        for(let j = 0; j < topicList.size; j++) {
          topicList[j].remove(student);
          if(topicList[j].size === 0) {
            removeTopic.add(j);
          }
        }
  
        for(let m = 0; m < removeTopic.size; m++) {
          topicList.remove(removeTopic[m]);
        }
  
        studentList.remove(student);
  
        //If K is at end of topic list then restart to beginning
        if(k === topicList.size - 1) {
          k = 0;
        }
        else {
          k++;
        }
      }
    }
    start++;
    if(start === topicList.size) {
      start = 0;
    }
    k = start;
  }
};

exports.sortManually = (req, res) => {
  //Creating Groups for Tutorial
  var groupSize = parseInt(req.body.numberGroups);

  for(let i = 1; i <= groupSize; i++) {
    var group = {
      subjectName: req.body.subjectName,
      tutorialNumber: req.body.number,
      groupNumber: i,
      students: req.body.groupStudents[i],
      groupTopics: req.body.groupTopics[i]
    }

    group.save((err, group) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    })
  }
};

exports.getTutorial = (req, res) => {
  console.log(req.body)
  Tutorial.findById(req.body.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retriving Tutorial related to " + req.body.id });
  })
}

exports.getUnselectedStudent = (req, res) => {
  Tutorial.findById(req.body.id)
  .then((data) => {
    res.send(data.UnselectedStudents);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retriving List of Students" });
  })
}

exports.addGroup = (req, res) => {
  var group = {
    subjectName: req.body.subjectName,
    tutorialNumber: req.body.number,
    groupNumber: req.body.numberGroups + 1
  }

  Tutorial.updateOne(
    {id: req.body.id},
    {$inc: {numberGroups: 1}}
  );

  group.save((err, group) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  })
}

exports.removeGroup = (req, res) => {
  
  if(req.body.studentList.size !== 0) {
    var listStudent = new ArrayList();
    listStudent = req.body.students;

    for(let i = 0; i < listStudent.size; i++) {
      Tutorial.updateOne(
        {
          subjectName: req.body.subjectName,
          tutorialNumber: req.body.tutorialNumber
        },
        {$push: {UnselectedStudents: listStudent[i]}}
      )
    }
  }

  Tutorial.updateOne(
    {
      subjectName: req.body.subjectName,
      tutorialNumber: req.body.tutorialNumber
    },
    {
      $inc: {numberGroups: -1},
      $pull: {groups: req.body.id}
    }
  );

  Group.deleteOne({id: req.body.id});
}