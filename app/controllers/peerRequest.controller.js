const PeerRequest = require("../models/peerRequest.model");
const Subject = require("../models/subject.model");
const User = require("../models/user.model");
const Role = require("../models/role.model");

exports.getPeerRequests = (req, res) => {
  Role.find({ name: "tutor" })
    .then(data => {
      const tutorId = data[0]._id.toString()

      User.find({ username: req.params.username })
        .then(data => {
          if (data[0].roles[0]._id.toString() === tutorId) {
            PeerRequest.find()
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res
                  .status(500)
                  .send({ message: "Error retreiving Peer Requests related to " + req.params.username });
              })
          } else {
            PeerRequest.find({ username: req.params.username })
              .then((data) => {
                res.send(data);
              })
              .catch((err) => {
                res
                  .status(500)
                  .send({ message: "Error retreiving Peer Requests related to " + req.params.username });
              })
          }
        })
    })
};

exports.createPeerRequests = (req, res) => {
  const peerRequest = new PeerRequest({
    username: req.params.username,
    subjectName: req.body.subjectName,
    yesPeers: req.body.yesPeers,
    noPeers: req.body.noPeers,
  });

  peerRequest.save((err, peerRequest) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    else {
      res
        .status(200)
        .send({
          message: "Peer Request has been created for: " + req.params.username,
        });
    }
  });
};

exports.getPeers = (req, res) => {
  Subject.find({ subjectName: req.body.subjectName })
    .then((data) => {
      res.send(data[0].studentList);
      //   res.send(data.students);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Peers in " + req.params.subjectName });
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

exports.getAllSubjects = (req, res) => {
  Subject.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Subjects" });
    })
};