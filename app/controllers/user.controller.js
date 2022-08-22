exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
  
exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.TutorBoard = (req, res) => {
  res.status(200).send("Tutor Content.");
};

exports.SubjectCoordinatorBoard = (req, res) => {
  res.status(200).send("Subject Coordinator Content.");
};