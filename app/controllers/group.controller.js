const Group = require("../models/group.model");

exports.addStudent = (req, res) => {
  //Add student into group //Need to figure out how to add group topics
  Group.updateOne(
    {_id: req.body.groupID},
    {$push: { students: req.body.student._id}},
    {$inc: {groupTopics: 1}}
  );
};

exports.removeStudent = (req, res) => {
  //Add student into group //Need to figure out how to add group topics
  Group.updateOne(
    {_id: req.body.groupID},
    {$pull: { students: req.body.student._id}},
    {$inc: {groupTopics: -1}}
  );
};