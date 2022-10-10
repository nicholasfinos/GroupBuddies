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
const PeerRequest = require("./app/models/peerRequest.model");
const StudentProfile = require("./app/models/studentProfile.model");
const { Promise } = require("mongodb");
const Role = db.role;
const students = [];

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
require('./app/routes/peerRequest.routes')(app);

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

            new User({
              username: "koreymedina",
              email: "korey.medina@student.uts.edu.au",
              password: bcrypt.hashSync("korey", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'Korey Medina' to Users collection");
            });

            new User({
              username: "julietfaulkner",
              email: "juliet.faulkner@student.uts.edu.au",
              password: bcrypt.hashSync("Juliet", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'Juliet' to Users collection");
            });

            new User({
              username: "hanancash",
              email: "hanan.cash@student.uts.edu.au",
              password: bcrypt.hashSync("hanan", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'hanancash' to Users collection");
            });

            new User({
              username: "melodyhyde",
              email: "melody.hyde@student.uts.edu.au",
              password: bcrypt.hashSync("melody", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'melodyhyde' to Users collection");
            });

            new User({
              username: "rexeastwood",
              email: "rex.eastwood@student.uts.edu.au",
              password: bcrypt.hashSync("rex", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'Rex Eastwood' to Users collection");
            });

            new User({
              username: "halleryan",
              email: "halle.ryan@student.uts.edu.au",
              password: bcrypt.hashSync("halle", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'halleryan' to Users collection");
            });

            new User({
              username: "giacomocraft",
              email: "giacomo.craft@student.uts.edu.au",
              password: bcrypt.hashSync("giacomocraft", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'giacomocraft' to Users collection");
            });

            new User({
              username: "natanmckay",
              email: "natan.mckay@student.uts.edu.au",
              password: bcrypt.hashSync("natan", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'natanmckay' to Users collection");
            });

            new User({
              username: "muhammedbarry",
              email: "muhammed.barry@student.uts.edu.au",
              password: bcrypt.hashSync("muhammed", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'muhammedbarry' to Users collection");
            });

            new User({
              username: "brodybarnett",
              email: "brody.barnett@student.uts.edu.au",
              password: bcrypt.hashSync("brody", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'brodybarnett' to Users collection");
            });

            new User({
              username: "hettieriggs",
              email: "hettie.riggs@student.uts.edu.au",
              password: bcrypt.hashSync("hettie", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'hettieriggs' to Users collection");
            });

            new User({
              username: "shannanflower",
              email: "shannan.flower@student.uts.edu.au",
              password: bcrypt.hashSync("shannan", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'shannanflower' to Users collection");
            });

            new User({
              username: "robynprice",
              email: "robyn.price@student.uts.edu.au",
              password: bcrypt.hashSync("robyn", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'robynprice' to Users collection");
            });

            new User({
              username: "kyronconnolly",
              email: "kyron.connolly@student.uts.edu.au",
              password: bcrypt.hashSync("kyron", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'kyronconnolly' to Users collection");
            });

            new User({
              username: "barrywhelan",
              email: "barry.whelan@student.uts.edu.au",
              password: bcrypt.hashSync("barry", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'barrywhelan' to Users collection");
            });

            new User({
              username: "lexamos",
              email: "lex.amos@student.uts.edu.au",
              password: bcrypt.hashSync("lex", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'lexamos' to Users collection");
            });

            new User({
              username: "henriettarussell",
              email: "henrietta.russell@student.uts.edu.au",
              password: bcrypt.hashSync("henrietta", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'henriettarussell' to Users collection");
            });

            new User({
              username: "abihastacey",
              email: "abiha.stacey@student.uts.edu.au",
              password: bcrypt.hashSync("abiha", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'abihastacey' to Users collection");
            });

            new User({
              username: "aliyahchristian",
              email: "aliyah.christian@student.uts.edu.au",
              password: bcrypt.hashSync("aliyah", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'aliyahchristian' to Users collection");
            });

            new User({
              username: "ubaidfitzpatrick",
              email: "ubaid.fitzpatrick@student.uts.edu.au",
              password: bcrypt.hashSync("ubaid", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'ubaidfitzpatrick' to Users collection");
            });

            new User({
              username: "jagdeepcorrea",
              email: "jagdeep.correa@student.uts.edu.au",
              password: bcrypt.hashSync("jagdeep", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'jagdeepcorrea' to Users collection");
            });

            new User({
              username: "alisarobins",
              email: "alisa.robins@student.uts.edu.au",
              password: bcrypt.hashSync("alisa", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'alisarobins' to Users collection");
            });

            new User({
              username: "pennysawyer",
              email: "penny.sawyer@student.uts.edu.au",
              password: bcrypt.hashSync("penny", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'pennysawyer' to Users collection");
            });

            new User({
              username: "maliktomlinson",
              email: "malik@student.uts.edu.au",
              password: bcrypt.hashSync("malik", 8),
              roles: [studentId]
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'maliktomlinson' to Users collection");
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
              console.log("added Subject Coordinator: 'subjectcoordinator' to Users collection");
              User.findOne({ username: "subjectcoordinator" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  Subject.findOneAndUpdate({ subjectName: 'Software Design Studio' }, { $set: { subjectCoordinator: docs._id } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'subjectcoordinator' as a subjectCoordinator in subject: 'Software Design Studio'")
                    }
                  })
                }
              })

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
              User.findOne({ username: "tutor" }, function (err, docs) {
                if (err) {
                  console.log(err)
                }
                else {
                  Tutorial.findOneAndUpdate({ subjectName: 'Software Design Studio' }, { $set: { tutor: [docs._id] } }, { returnNewDocument: true }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Adding 'tutor' as a tutor in tutorial for 'Software Design Studio'")
                    }
                  })
                }
              })
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
  /*
    -------------------
    //ALGORITHM TESTING
    -------------------
    1. Delete GroupBuddies Collection 
    2. Uncomment "settingUpProfiles();" and run node server.js
    3. Comment "settingUpProfiles"
    4. Uncomment "addingToTutorials();" and run node server.js
    5. Comment "addingToTutorials();"
    */

  //settingUpProfile();
  //addingToTutorials();
}

function settingUpProfile() {

  StudentProfile.create({
    username: "graceBilliris",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer", "Scrum Master", "Documentation"],
  })

  StudentProfile.create({
    username: "yeran",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer", "Scrum Master", "Fullstack Developer"],
  })

  StudentProfile.create({
    username: "nicholasFinos",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer", "Scrum Master", "MERN Stack"],
  })

  StudentProfile.create({
    username: "jeromeSario",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer", "UX Designer"],
  })

  StudentProfile.create({
    username: "ashishChadha",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer"],
  })

  StudentProfile.create({
    username: "lukaRyan",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["BA", "Documentation"],
  })

  StudentProfile.create({
    username: "lachlanSinclair",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer", "UX Designer"],
  })

  StudentProfile.create({
    username: "koreymedina",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer"],
  })

  StudentProfile.create({
    username: "julietfaulkner",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer"],
  })

  StudentProfile.create({
    username: "hanancash",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer"],
  })

  StudentProfile.create({
    username: "melodyhyde",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["UX Designer"],
  })

  StudentProfile.create({
    username: "rexeastwood",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["BA"],
  })

  StudentProfile.create({
    username: "halleryan",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Scrum Master"],
  })

  StudentProfile.create({
    username: "giacomocraft",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["MERN Stack"],
  })

  StudentProfile.create({
    username: "natanmckay",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Documentation"],
  })

  StudentProfile.create({
    username: "muhammedbarry",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer", "Documentation"],
  })

  StudentProfile.create({
    username: "brodybarnett",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer", "MERN Stack"],
  })

  StudentProfile.create({
    username: "hettieriggs",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer", "Scrum Master"],
  })

  StudentProfile.create({
    username: "shannanflower",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["UX Designer", "BA"],
  })

  StudentProfile.create({
    username: "robynprice",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer", "Documentation", "Backend Developer"],
  })

  StudentProfile.create({
    username: "kyronconnolly",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer", "MERN Stack", "Fullstack Developer"],
  })

  StudentProfile.create({
    username: "barrywhelan",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer", "Scrum Master"],
  })

  StudentProfile.create({
    username: "lexamos",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["UX Designer", "BA", "Scrum Master"],
  })

  StudentProfile.create({
    username: "henriettarussell",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Documentation", "UX Designer"],
  })

  StudentProfile.create({
    username: "abihastacey",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Scrum Master", "Frontend Developer"],
  })

  StudentProfile.create({
    username: "aliyahchristian",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Backend Developer", "BA"],
  })

  StudentProfile.create({
    username: "ubaidfitzpatrick",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Frontend Developer", "UX Designer"],
  })

  StudentProfile.create({
    username: "jagdeepcorrea",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["Fullstack Developer", "MERN Stack"],
  })

  StudentProfile.create({
    username: "alisarobins",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["UX Designer", "Frontend Developer"],
  })

  StudentProfile.create({
    username: "pennysawyer",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["UX Designer"],
  })

  StudentProfile.create({
    username: "maliktomlinson",
    subjectName: "Software Design Studio",
    tutorialNumber: "1",
    groupNumber: "",
    subjectTopics: ["MERN Stack"],
  })

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
    tutorialNumbers: 1,
    status: false,
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
    tutorialNumbers: 1,
    status: false,
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
    tutorialNumbers: 4,
    status: false,
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
    tutorialNumbers: 4,
    status: false,
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
    tutorialNumbers: 1,
    status: false,
  })
  console.log('creating Phys Mod - the subject')

  Tutorial.create({
    subjectName: "Software Design Studio",
    number: "1",
    timeSlot: "5pm",
    day: "Tuesday",
    tutor: null,
    allStudents: [],
    UnselectedStudents: [],
    numberGroups: 0,
    groups: []
  })

  Subject.create({
    subjectName: "Software Design Studio",
    subjectCoordinator: null,
    tutors: [],
    subjectTopics: [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "UX Designer",
      "BA",
      "Scrum Master",
      "MERN Stack",
      "Documentation"
    ],
    semester: "Spring 2022",
    groupAssessment: true,
    tutorials: [],
    tutorialNumbers: 1,
    status: false,
  })
  console.log('creating Software Design Studio - the subject')
}

function addingToTutorials() {
  Tutorial.find({ subjectName: "Software Design Studio" })
    .then((x) => {
      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            tutorials: x[0]._id
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "lachlanSinclair" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        });

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "graceBilliris" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "nicholasFinos" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "jeromeSario" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "ashishChadha" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "lukaRyan" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "koreymedina" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "hanancash" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "melodyhyde" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "rexeastwood" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "halleryan" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "giacomocraft" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "natanmckay" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "muhammedbarry" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "brodybarnett" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "hettieriggs" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "shannanflower" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "robynprice" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "kyronconnolly" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "barrywhelan" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "lexamos" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "henriettarussell" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "abihastacey" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "aliyahchristian" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "ubaidfitzpatrick" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "jagdeepcorrea" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "alisarobins" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "pennysawyer" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })

  StudentProfile.find({ username: "maliktomlinson" })
    .then((x) => {
      var data = {
        _id: x[0]?.id,
        username: x[0]?.username,
        subjectTopics: x[0]?.subjectTopics
      };
      Tutorial.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            UnselectedStudents: data,
            allStudents: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })

      Subject.updateOne(
        { subjectName: "Software Design Studio" },
        {
          $push: {
            students: data
          }
        }
      )
        .then((h) => {
          console.log(h);
        })
    })
}