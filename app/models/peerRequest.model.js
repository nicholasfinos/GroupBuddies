const mongoose = require("mongoose");

const PeerRequest = mongoose.model(
  "PeerRequest",
  new mongoose.Schema({
    username: String,
    subjectName: String,
    tutorialNumber: String, 
    yesPeers: Array,
    noPeers: Array,
    status: Boolean,
  })
);

module.exports = PeerRequest;