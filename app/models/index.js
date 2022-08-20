const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.studentProfile = require("./studentProfile.model");
db.refreshToken = require("./refreshToken.model");

db.ROLES = ["student", "tutor", "subjectcoordinator"];

module.exports = db;