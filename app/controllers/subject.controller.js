const Subject = require("../models/subject.model");
const User = require("../models/user.model");
const Tutorial = require("../models/tutorial.model");

exports.viewSubjects = (req, res) => {
  //Display all of the subject that is associated to User
  User.find({ username: req.params.username })
    .then((data) => {
      Subject.find({ subjectCoordinator: [data[0]._id] })
        .then((doc) => {
          console.log(doc);
          res.status(200).send(doc);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving subjects.",
          });
        });
    })
};

exports.findSubject = (req,res) => {
  //Find a particular subject
  Subject.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Subject with name " + req.body.subjectName });
    })
};

exports.findTutorial = (req, res) => {
  Tutorial.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial related to " + req.body.subjectName });
    })
};

exports.findSubjectById = (req, res) => {
  Subject.find({ _id: req.params.subjectId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Subject with name " + req.body.subjectName });
    })
};

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: null,
    subjectName: req.body.subjectName,
    groupAssessment: req.body.groupAssessment,
    tutorialNumbers: parseInt(req.body.tutorialNumbers),
    subjectTopics: req.body.subjectTopics,
    students: req.body.students,
    semester: req.body.semester,
    tutorials: null
  });


  //Convert the String topics into array
  if (req.body.subjectTopics.length !== 0) {
    const splitQuery = req.body.subjectTopics.split(",")
    var i = 0
    for (i = 0; i < splitQuery.length; i++) {
      subject.subjectTopics[i] = splitQuery[i].trim()
    }
  }

  //Convert string group Assessment to boolean
  if (req.body.groupAssessment === "Yes") {
    subject.groupAssessment = true;
  } else {
    subject.groupAssessment = false;
  }


  //Adding Tutorial class into Subject
  for (let i = 0; i < subject.tutorialNumbers; i++) {
    const tutorial = new Tutorial({
      subjectName: req.body.subjectName,
      number: (i + 1),
      tutor: null,
      allStudents: null,
      timeSlot: req.body.assignedTutor[i].timeSlot,
      day: req.body.assignedTutor[i].day
    });


    //Assign Tutor to tutorial
    User.find({ username: req.body.assignedTutor[i].username })
      .then((data) => {
        tutorial.tutor = data[0].id
        tutorial.save((err, tutorial) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })
      });

    if (i === 0) {
      subject.tutorials = tutorial.id;
    }
    else {
      subject.tutorials.push(tutorial.id);
    }
  }

  //Assign subject Coordinator to Subject and save
  User.find({ username: req.params.username })
    .then((data) => {
      subject.subjectCoordinator = data[0]._id;
      subject.save((err, subject) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        else {
          res
            .status(200)
            .send({
              message: "Subject " + subject.subjectName + " has been created for: " + req.params.username,
            });
        }
      });
    })
};

exports.getAll = (req, res) => {
  Subject.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Subjects"});
    })
};

// exports.getPeerUsername = (req, res) => {
//   User.find({_id: req.params.peerId})
//   .then((data) => {
//     res.send(data);
//   })
//   .catch((err) => {
//     res
//       .status(500)
//       .send({ message: "Error retrieving Peer's Username"});
//   })
// };

exports.getPeers = (req, res) => {
  Subject.find({subjectName: req.body.subjectName})
  .then((data) => {
    res.send(data[0].studentList);
  //   res.send(data.students);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retreiving Peers in " + req.params.subjectName });
  })
}

exports.updateSubject = (req, res) => {
}

exports.updateSubject = (req, res) => {
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  
  if (req.body.groupAssessment === "Yes") {
    req.body.groupAssessment = true;
  } else {
    req.body.groupAssessment = false;
  }

 /* if (req.body.subjectTopics?.length !== 0 && req.body.subjectTopics[0].length === 1) {
    var str = new ArrayList();
    const splitQuery = req.body.subjectTopics?.split(",")
    var i = 0
    for (i = 0; i < splitQuery?.length; i++) {
      str[i] = splitQuery[i].trim()
    }
    req.body.subjectTopics = str;
  }*/

  Subject.findByIdAndUpdate(req.body.id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Subject!`,
        });
      } else res.send({ message: "Subject was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Subject",
      });
    });
};
