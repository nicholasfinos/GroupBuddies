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
const Role = db.role;

db.mongoose
  .connect(`mongodb://localhost:27017/GroupBuddies`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// add roles to database
function initial() {
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
          })
      });

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
            });
          })
      });
    }
  });
}