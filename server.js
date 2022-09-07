const express = require("express");
// express is for building the REST APIs
const bodyParser = require("body-parser");
// body-parser helps to parse the request and create the req.body object
const cors = require("cors");
// cors provides Express middleware to enable CORS
const bcrypt = require("bcryptjs");
const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const User = require("./app/models/user.model");
const Subject = require("./app/models/subject.model");
const Tutorial = require("./app/models/tutorial.model");
const { Promise } = require("mongodb");
const Role = db.role;

db.mongoose
  .connect(`mongodb://127.0.0.1:27017/GroupBuddies`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    server: { poolsize: 1 }
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

db.mongoose.set('useFindAndModify', false); // to use findOneAndUpdate

var corsOptions = {
  origin: "http://localhost:8081"
};

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GroupBuddies backend." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/subject.routes')(app);
require('./app/routes/tutor.routes')(app);
require('./app/routes/studentProfile.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/enrollment.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// add roles to database
async function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "student"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'student' to roles collection");
        Role.find({ name: "student" })
          .then(data => {
            const studentId = data[0]._id
            new User({
              username: "student",
              email: "student@student.uts.edu.au",
              password: bcrypt.hashSync("student", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'student' to Users collection");
            });

            new User({
              username: "graceBilliris",
              email: "grace.billiris@student.uts.edu.au",
              password: bcrypt.hashSync("grace", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'grace' to Users collection");
            });

            new User({
              username: "yeran",
              email: "yeran.h@student.uts.edu.au",
              password: bcrypt.hashSync("yeran", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'yeran' to Users collection");
            });

            new User({
              username: "nicholasFinos",
              email: "nicholas.finos@student.uts.edu.au",
              password: bcrypt.hashSync("nicholas", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'nicholas' to Users collection");
            });

            new User({
              username: "jeromeSario",
              email: "jerome.sario@student.uts.edu.au",
              password: bcrypt.hashSync("jerome", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'jerome' to Users collection");
            });

            new User({
              username: "ashishChadha",
              email: "ashish.chadha@student.uts.edu.au",
              password: bcrypt.hashSync("ashish", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'ashish' to Users collection");
            });

            new User({
              username: "lukaRyan",
              email: "luka.ryan@student.uts.edu.au",
              password: bcrypt.hashSync("luka", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'luka' to Users collection");
            });

            new User({
              username: "lachlanSinclair",
              email: "lachlan.sinclar@student.uts.edu.au",
              password: bcrypt.hashSync("lachlan", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'lachlan' to Users collection");
            });
          })
      });


      new Role({
        name: "subjectcoordinator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'subjectcoordinator' to roles collection");
        Role.find({ name: "subjectcoordinator" })
          .then(data => {
            const subjectcoordinatorId = data[0]._id
            new User({
              username: "subjectcoordinator",
              email: "subjectcoordinator@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'subjectcoordinator' to Users collection");
            })

            new User({
              username: "tianqingzhu",
              email: "tianqingzhu@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Subject Coordinator: 'Tianqing Zhu' to Users collection");
            });

            new User({
              username: "danicaSolina",
              email: "danica.solina@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Subject Coordinator: 'danicaSolina' to Users collection");
              User.findOne({ username: "danicaSolina" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Mathematical Modelling 1' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'danicaSolina' as a subjectCoordinator in subject: 'MM1'")
                    }
                  })
                }
              })
            })

            new User({
              username: "evaCheng",
              email: "eva.cheng@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Subject Coordinator: 'evaCheng' to Users collection");
              User.findOne({ username: "evaCheng" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Engineering Communication' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'evaCheng' as a subjectCoordinator in subject: 'Eng Com'")
                    }
                  })
                }
              })
            })

            new User({
              username: "araAsatryan",
              email: "ara.asatryan@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Subject Coordinator: 'araAsatryan' to Users collection");
              User.findOne({ username: "araAsatryan" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Mathematical Modelling 2' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'araAsatryan' as a subjectCoordinator in subject: 'MM2'")
                    }
                  })
                }
              })

              User.findOne({ username: "araAsatryan" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Physical Modelling' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'araAsatryan' as a subjectCoordinator in subject: 'Phys Mod'")
                    }
                  })
                }
              })
            })

            new User({
              username: "taniaMachet",
              email: "tania.machet@uts.edu.au",
              password: bcrypt.hashSync("subcord", 8),
              roles: [subjectcoordinatorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Subject Coordinator: 'taniaMachet' to Users collection");
              User.findOne({ username: "taniaMachet" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Design and Innovation Fundamentals' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'taniaMachet' as a subjectCoordinator in subject: 'DIF'")
                    }
                  })
                }
              });
            })
          })
      })

      new Role({
        name: "tutor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'tutor' to roles collection");
        Role.find({ name: "tutor" })
          .then(data => {
            const tutorId = data[0]._id
            new User({
              username: "tutor",
              email: "tutor@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'tutor' to Users collection");
            });
          })

        Role.find({ name: "tutor" })
          .then(data => {
            const tutorId = data[0]._id
            new User({
              username: "shengshen",
              email: "shengshen@uts.edu.au",
              password: bcrypt.hashSync("shen", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'Sheng Shen' to Users collection");
            });

            new User({
              username: "tutor2",
              email: "tutor2@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'Tutor 2' to Users collection");
            });

            new User({
              username: "dannySolo",
              email: "danny.solo@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'dannySolo' to Users collection");
              User.findOne({ username: "dannySolo" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Mathematical Modelling 1' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'dannySolo' as a tutor in subject: 'MM1'")
                    }
                  })
                }
              })
            });

            new User({
              username: "wilderPedromo",
              email: "wilder.pedromo@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'wilderPedromo' to Users collection");
              User.findOne({ username: "wilderPedromo" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Engineering Communication' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'wilderPedromo' as a tutor in subject: 'Eng Com'")
                    }
                  })
                }
              })
            });

            new User({
              username: "adamSmith",
              email: "adam.smith@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'adamSmith' to Users collection");
              User.findOne({ username: "adamSmith" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Engineering Communication' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'adamSmith' as a tutor in subject: 'Eng Com'")
                    }
                  })
                }
              })
            });

            new User({
              username: "laurenGraham",
              email: "lauren.graham@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'laurenGraham' to Users collection");
              User.findOne({ username: "laurenGraham" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Engineering Communication' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'laurenGraham' as a tutor in subject: 'Eng Com'")
                    }
                  })
                }
              })
            });

            new User({
              username: "matthewPaul",
              email: "matthew.paul@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'matthewPaul' to Users collection");
              User.findOne({ username: "matthewPaul" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Engineering Communication' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'matthewPaul' as a tutor in subject: 'Eng Com'")
                    }
                  })
                }
              })
            });

            new User({
              username: "jasonStanley",
              email: "jason.stanley@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'jasonStanley' to Users collection");
              User.findOne({ username: "jasonStanley" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Mathematical Modelling 2' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'jasonStanley' as a tutor in subject: 'MM2'")
                    }
                  })
                }
              })
            });

            new User({
              username: "johnGaspar",
              email: "john.gaspar@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'johnGaspar' to Users collection");
              User.findOne({ username: "johnGaspar" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Design and Innovation Fundamentals' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'johnGaspar' as a tutor in subject: 'DIF'")
                    }
                  })
                }
              })
            });

            new User({
              username: "mahiraMohamed",
              email: "mahira.mohamed@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'mahiraMohamed' to Users collection");
              User.findOne({ username: "mahiraMohamed" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Design and Innovation Fundamentals' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'mahiraMohamed' as a tutor in subject: 'DIF'")
                    }
                  })
                }
              })
            });

            new User({
              username: "kendalScott",
              email: "kendal.scott@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'kendalScott' to Users collection");
              User.findOne({ username: "kendalScott" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Design and Innovation Fundamentals' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'kendalScott' as a tutor in subject: 'DIF'")
                    }
                  })
                }
              })
            });

            new User({
              username: "hanainQureshi",
              email: "hanain.qureshi@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'hanainQureshi' to Users collection");
              User.findOne({ username: "hanainQureshi" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Design and Innovation Fundamentals' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'hanainQureshi' as a tutor in subject: 'DIF'")
                    }
                  })
                }
              })
            });

            new User({
              username: "paulDamian",
              email: "paul.damian@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'paulDamian' to Users collection");
              User.findOne({ username: "paulDamian" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Physical Modelling' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'paulDamian' as a tutor in subject: 'Phys Mod'")
                    }
                  })
                }
              })
            });

            new User({
              username: "scottStark",
              email: "scott.stark@uts.edu.au",
              password: bcrypt.hashSync("tutor", 8),
              roles: [tutorId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added Tutor: 'scottStark' to Users collection");
              User.findOne({ username: "scottStark" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  // console.log("UserId : ", docs._id);
                  Subject.findOneAndUpdate({ subjectName: 'Physical Modelling' }, { $set: { tutors: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'scottStark' as a tutor in subject: 'Phys Mod'")
                    }
                  })
                }
              })
            });
          });
      })
    }
  })

  settingUpSubjects();
}

async function settingUpSubjects() {
  Subject.create({
    subjectName: "Mathematical Modelling 1",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Matrix multiplication and determinants",
      "Vectors and their application to physical problems",
      "Complex numbers",
      "Functions and their relationship to measurement and the interpretation of physical results",
      "Differentiation",
      "Differential equations arising from physical problems",
      "Oscillatory motion",
      "Trigonometric functions and inverse trigonometric functions",
      "Integrals",
      "Inverse functions",
      "Hyperbolic functions",
      "Methods of integration",
      "Solution of differential equations by integration"
    ],
    semester: "Autumn 2020",
    groupAssessment: false,
    tutorials: [],
    tutorialNumbers: 1
  })
  console.log('creating MM1 - the subject')

  Subject.create({
    subjectName: "Mathematical Modelling 2",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Linear algebra including eigenvalues and eigenvectors and applications",
      "3D geometry and functions of several variables",
      "Partial derivatives",
      "Optimisation",
      "Multiple integrals and their applications",
      "Probability",
      "Descriptive statistics",
      "Probability distributions",
      "Statistical inference",
      "Introduction to linear regression"
    ],
    semester: "Spring 2020",
    groupAssessment: false,
    tutorials: [],
    tutorialNumbers: 1
  })
  console.log('creating MM2 - the subject')

  Subject.create({
    subjectName: "Engineering Communication",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Linear algebra including eigenvalues and eigenvectors and applications",
      "Engineering design process",
      "Finding, evaluating and referencing information Academic integrity",
      "Professional engineering documentation",
      "Effective written, visual and oral communication",
      "Teamwork processes and participation",
      "Reflective thinking and writing"
    ],
    semester: "Autumn 2020",
    groupAssessment: true,
    tutorials: [],
    tutorialNumbers: 4
  })
  console.log('creating Eng Com - the subject')

  Subject.create({
    subjectName: "Design and Innovation Fundamentals",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Engineers as designers and innovators",
      "Design and Engineering thinking",
      "Approaches for thinking and problem-solving in an engineering context",
      "The design process including problem definition, concept generation, requirements analysis, system design and detailed design",
      "New process and product development; lifecycles, research, technology, development and innovation",
      "Design considerations and trade-offs: including safe design, methods of managing risk and uncertainty, regulations and professionalism, sustainability, design for manufacture and business decisions involved in design and innovation",
      "Team dynamics and techniques to facilitate successfully working in concurrent engineering teams",
      "Review of written and oral communication skills"
    ],
    semester: "Spring 2021",
    groupAssessment: true,
    tutorials: [],
    tutorialNumbers: 4
  })
  console.log('creating DIF - the subject')

  Subject.create({
    subjectName: "Physical Modelling",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Motion in 1D",
      "Motion in 2D",
      "Force and motion",
      "Work, enegery and power",
      "Rotational knimematics",
      "Temperature and heat",
      "Thermal expansion",
      "Thermal processes",
      "Electric charge",
      "Electric circuits",
      "Fluids at rest",
      "Oscilations and waves",
      "Reflections and Mirrors",
      "Lenses"
    ],
    semester: "Autumn 2021",
    groupAssessment: false,
    tutorials: [],
    tutorialNumbers: 1
  })
  console.log('creating Phys Mod - the subject')
}