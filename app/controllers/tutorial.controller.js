const Tutorial = require("../models/tutorial.model");

exports.getTutorial = (req, res) => {
  console.log(req.body)
  Tutorial.findById(req.body.id)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res
      .status(500)
      .send({ message: "Error retriving Tutorial related to " + req.body.id });
  })
}