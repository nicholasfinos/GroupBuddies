const Group = require("../models/group.model");

exports.viewGroup = (req, res) => {
  Group.findById(req.body.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retriving Group related to " + req.body.id });
    })
};

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