const Subject = require("../models/subject.model");
const User = require("../models/user.model");
const Tutorial = require("../models/tutorial.model");

exports.viewSubjects = (req, res) => {
  //Display all of the subject that is associated to User
  User.find({ username: req.params.username })
    .then((data) => {
      Subject.find({subjectCoordinator : [data[0]._id]})
        .then((doc) => {
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

exports.findTutorial = (req,res) => {
  //Find Tutoirals which is associated to Subject
  Tutorial.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial related to " + req.body.subjectName });
    })
};

exports.findTutorialByTutor = (req,res) => {
  //Find all Tutorial that is associated to Tutor
  Tutorial.find({ tutor: [req.params._id] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Tutorial " });
    })
};

exports.findOneSubject = (req, res) => {
  //Find a particular subject
  Subject.find({ subjectName: req.params.subjectName })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Subject with name " + req.body.subjectName });
    })
};

exports.createSubject = (req, res) => {
  // Create Subject
  const subject = new Subject({
    subjectCoordinator: req.params.username,
    subjectName: req.body.subjectName,
    groupAssessment: req.body.groupAssessment,
    tutorialNumbers: parseInt(req.body.tutorialNumbers),
    subjectTopics: req.body.subjectTopics,
    semester: req.body.semester,
    tutorials: null
  });

  //Convert the String topics into array
  // if (req.body.subjectTopics?.length !== 0) {
  //   const splitQuery = req.body.subjectTopics?.split(",")
  //   var i = 0
  //   for (i = 0; i < splitQuery?.length; i++) {
  //     subject.subjectTopics[i] = splitQuery[i].trim()
  //   }
  // }

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
      timeSlot: req.body.assignedTutor[i].timeSlot,
      day: req.body.assignedTutor[i].day,
      tutor: null,
      allStudents: null
    });


    //Assign Tutor to tutorial
    User.find({ username: req.body.assignedTutor[i].username })
      .then((data) => {
        tutorial.tutor = data
        tutorial.save((err, tutorial) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        })
      });

    if (i === 0) {
      subject.tutorials = tutorial._id;
    }
    else {
      subject.tutorials.push(tutorial._id);
    }
  }



  //Assign subject Coordinator to Subject and save
  User.find({ username: req.params.username })
    .then((data) => {
      subject.subjectCoordinator = data;

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