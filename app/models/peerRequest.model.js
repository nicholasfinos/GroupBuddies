const mongoose = require("mongoose");

const PeerRequest = mongoose.model(
  "PeerRequest",
  new mongoose.Schema({
    username: String,
    subjectName: String, 
    yesPeers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    noPeers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
  })
);

module.exports = PeerRequest;