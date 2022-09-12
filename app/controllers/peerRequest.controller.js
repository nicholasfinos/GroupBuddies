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
    status: req.body.status,
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
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Peers in " + req.params.subjectName });
    })
};

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

exports.getPeerRequest = (req, res) => {
  PeerRequest.find({_id: req.params.requestId})
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retrieving Peer Request with ID: " + req.params.requestId });
  })
};

exports.updatePeerRequest = (req, res) => {
  if (Object.keys(req.body).length === 0){
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  PeerRequest.findByIdAndUpdate(req.body.id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  Peer Request!`,
        });
      } else res.send({ message: " Peer Request was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Peer Request",
      });
  });
}