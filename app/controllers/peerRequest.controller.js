const PeerRequest = require("../models/peerRequest.model");

exports.getPeerRequests = (req, res) => {
    PeerRequest.find({username: req.params.username})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Peer Requests related to " + req.params.username });
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
    PeerRequest.find({subjectName: req.params.subjectName})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving Peers in " + req.params.subjectName });
    })
};