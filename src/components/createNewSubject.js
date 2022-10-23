import React from "react";
import { Button, Input } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import TutorDataService from "../services/tutor-service";
import SubjectDataService from "../services/subject-service";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";

const paperStyling = { padding: 40, height: '100%', width: '80%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '300px' }

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class CreateSubject extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    this.onChangeTutorialNumbers = this.onChangeTutorialNumbers.bind(this);
    this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);
    this.onChangeSubjectTopics = this.onChangeSubjectTopics.bind(this);
    this.onChangeTimeSlot = this.onChangeTimeSlot.bind(this);
    this.onChangeDay = this.onChangeDay.bind(this);
    this.retrieveTutors = this.retrieveTutors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);

    this.state = {
      subjectName: "",
      tutorialNumbers: "",
      groupAssessment: "",
      semester: "",
      subjectTopics: "",
      username: "",
      submitted: false,
      tutors: [],
      currentIndex: -1,
      addedtutors: [],
      currentTutor: null,
      timeSlot: "",
      day: "",
      message: ""
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
    this.retrieveTutors();
  }

  onChangeGroupAssessment(e) {
    this.setState({ groupAssessment: e.target.value, message: "" });
  }

  onChangeSemester(e) {
    this.setState({ semester: e.target.value, message: "" });
  }

  onChangeSubjectName(e) {
    this.setState({ subjectName: e.target.value, message: "" });
  }

  onChangeTutorialNumbers(e) {
    this.setState({ tutorialNumbers: e.target.value, message: "" });
  }

  onChangeSubjectTopics(e) {
    this.setState({ subjectTopics: e.target.value, message: "" });
  }

  onChangeTimeSlot(e) {
    this.setState({ timeSlot: e.target.value, message: "" });
  }

  onChangeDay(e) {
    this.setState({ day: e.target.value, message: "" });
  }

  retrieveTutors() {
    TutorDataService.view()
      .then(response => {
        this.setState({
          tutors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutors();
    this.setState({
      currentTutor: null,
      currentIndex: -1
    });
  }

  setActiveAddItem(tutor, index) {
    this.setState({
      currentTutor: tutor,
      currentIndex: index,
      timeSlot: "",
      day: ""
    });
  }

  addTutor(tutor, tutorTimeSlot, tutorDay) {
    if (tutorTimeSlot.length !== 0 || tutorDay.length !== 0) {
      var data = {
        username: tutor.username,
        email: tutor.email,
        password: tutor.password,
        timeSlot: tutorTimeSlot,
        day: tutorDay
      };

      //Push it to addedTutor list
      const list = this.state.addedtutors;
      list.push(data);

      //Save value
      this.setState({
        addedtutors: list,
        currentTutor: null,
        message: ""
      });
    }
    else {
      this.setState({ message: "Please fill Time Slot and Day before adding Tutorial" })
    }
  }

  deleteTutor(index) {
    //Pop the selected tutor
    const list = this.state.addedtutors;
    list.splice(index, 1);

    //Save Value
    this.setState({
      addedtutors: list,
      currentTutor: null,
      message: ""
    });
  }

  saveSubject = () => {
    if (this.state.subjectName.length !== 0 || this.state.semester !== 0) {
      if (parseInt(this.state.tutorialNumbers) === this.state.addedtutors.length) {
        if ((this.state.groupAssessment === "Yes") && (this.state.subjectTopics.length !== 0)) {
          var data;
          data = {
            username: this.state.username,
            subjectName: this.state.subjectName,
            tutorialNumbers: this.state.tutorialNumbers,
            groupAssessment: this.state.groupAssessment,
            semester: this.state.semester,
            subjectTopics: this.state.subjectTopics,
            assignedTutor: this.state.addedtutors
          }

          SubjectDataService.findSubjectByName(data.subjectName)
            .then((response) => {
              if (response.data.length === 0) {
                SubjectDataService.create(data, data.username)
                  .then((response) => {
                    this.setState({
                      subjectName: response.data.subjectName,
                      tutorialNumbers: response.data.tutorialNumbers,
                      groupAssessment: response.data.groupAssessment,
                      semester: response.data.semester,
                      subjectTopics: response.data.subjectTopics,
                      submitted: true,
                      assignedTutor: response.data.assignedTutors,
                      message: ""
                    });
                    console.log(response.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
              else {
                this.setState({ message: "Duplicate subject" })
              }
            })
        }
        else if (this.state.groupAssessment === "No") {
          var data;
          data = {
            username: this.state.username,
            subjectName: this.state.subjectName,
            tutorialNumbers: this.state.tutorialNumbers,
            groupAssessment: this.state.groupAssessment,
            semester: this.state.semester,
            subjectTopics: this.state.subjectTopics,
            assignedTutor: this.state.addedtutors
          }

          SubjectDataService.findSubjectByName(data.subjectName)
            .then((response) => {
              if (response.data.length === 0) {
                SubjectDataService.create(data, data.username)
                  .then((response) => {
                    this.setState({
                      subjectName: response.data.subjectName,
                      tutorialNumbers: response.data.tutorialNumbers,
                      groupAssessment: response.data.groupAssessment,
                      semester: response.data.semester,
                      subjectTopics: response.data.subjectTopics,
                      submitted: true,
                      assignedTutor: response.data.assignedTutors,
                      message: ""
                    });
                    console.log(response.data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
              else {
                this.setState({ message: "Duplicate subject" })
              }
            })
        }
        else {
          this.setState({ message: "For Group Assessment Subject Topics must be filled out" })
        }
      }
      else {
        this.setState({ message: "Number of Assigned Tutors must equal the Number Of Tutorial selected" })
      }
    }
    else {
      this.setState({ message: "Make sure to fill both Subject Name and Semester" })
    }
  }

  // Create new subject page
  newSubject = () => {
    this.setState({
      subjectName: "",
      tutorialNumbers: "",
      groupAssessment: "",
      semester: "",
      subjectTopics: "",
      username: "",
      submitted: false,
      tutors: [],
      currentIndex: -1,
      addedtutors: [],
      currentTutor: null,
      timeSlot: "",
      day: "",
      message: ""
    });
    this.componentDidMount();
  }

  render() {
    const { tutors, currentIndex, addedtutors, currentTutor } = this.state;
    return (
      <Grid style={{ textAlign: "center" }} className="form">
        <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
          <h3>Create a New Subject</h3>
          <hr className="new5"></hr>
          {this.state.submitted ? (
            <div>
              <p><i>You created a subject successfully!</i></p>
              <Button size="small" variant="contained" onClick={this.newSubject}>{" "}Create a Subject{" "}</Button>
            </div>
          ) : (
            <Grid>
              <div style={{ textAlign: "center", marginLeft: "5%" }}>
                <div className="form-group">
                  <label htmlFor="subject-name" style={{}}>Subject Name: </label>
                  <input className="form-control" style={{ maxWidth: '600px', marginTop: "4%" }} type="text" name="subjectName" onChange={this.onChangeSubjectName} validations={[required]} />
                </div>

                <div className="form-group">
                  <label htmlFor="semester" style={{}}>Semester: </label>
                  <input className="form-control" style={{ maxWidth: '600px' }} type="text" name="semester" onChange={this.onChangeSemester} validations={[required]} />
                </div>

                <div className="form-group">
                  <label style={{}} htmlFor="tutorial numbers">Number of Tutorials:</label>
                  <select className="form-group border" style={{ minWidth: "600px" }} onChange={this.onChangeTutorialNumbers} validations={[required]}>
                    <option value="" disabled selected>Select your option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{}} htmlFor="group-assessment">Group Assessment:</label>
                  <select className="border" style={{ minWidth: "600px" }} onChange={this.onChangeGroupAssessment} validations={[required]}>
                    <option value="" disabled selected>Select your option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label style={{}} htmlFor="subject-topics">Subject Topics:</label>
                  <textarea className="border" style={{ minWidth: "600px" }} id="topics" name="topics" rows="5" placeholder="Please seperate each topic with a comma..." onChange={this.onChangeSubjectTopics} validations={[required]}></textarea>
                </div>
              </div>
              <br />
              <div>
                <br />
                <Grid container>
                  <Grid item md={4}>
                    <h4>Tutors</h4>
                    <i>Please select a tutor from the list:</i>
                    <div style={subjectScrollable}>
                      <div className="form-group" style={{ flexDirection: "column" }}>
                        {tutors && tutors.map((tutor, index) => (
                          <ListItem style={{ padding: "20px", }} selected={index === currentIndex} onClick={() => this.setActiveAddItem(tutor, index)} divider button key={index}>
                            {tutor?.username}
                          </ListItem>
                        ))}
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    {currentTutor ? (
                      <div style={{ textAlign: "center" }}>
                        <h4>Tutor Selected</h4>
                        <label><strong>{"Name: " + currentTutor?.username}</strong></label>
                        <p><i>Please select a Day and Timeslot to assign tutor...</i></p>
                        <div className="form-group" style={{ marginLeft: "30px" }}>
                          <label htmlFor="Day" style={{ marginLeft: "50px" }}>Day:</label>
                          <select className="form-group border" style={{ marginRight: "20px" }} onChange={this.onChangeDay} validations={[required]}>
                            <option value="" disabled selected>Select a day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ marginLeft: "10px" }}>
                          <label htmlFor="timeSlot" style={{ paddingRight: "5px" }}>Time Slot: </label>
                          <input className="form-control" style={{ maxWidth: '150px' }} type="text" name="timeSlot" onChange={this.onChangeTimeSlot} validations={[required]} />
                        </div>
                        <Button color="primary" size="small" variant="contained" onClick={() => this.addTutor(currentTutor, this.state.timeSlot, this.state.day)}>Add Tutorial</Button>
                      </div>
                    ) : (
                      <div>
                        <h4>Tutor Selected</h4>
                      </div>
                    )}
                  </Grid>
                  <Grid item md={4} style={{}}>
                    <h4>Assigned Tutors to Tutorial Class</h4>
                    <p><i>Click a tutor below to unassign them from this subject...</i></p>
                    <div style={subjectScrollable}>
                      <div className="form-group" style={{ flexDirection: "column" }}>
                        {addedtutors.map((addedTutor, index) => (
                          <ListItem style={{ padding: "20px" }} selected={index === currentIndex} onClick={() => this.deleteTutor(index)} divider button key={index}>
                            {"Name: " + addedTutor?.username + ", TimeSlot: " + addedTutor.timeSlot}
                          </ListItem>
                        ))}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <br />
              <br />
              <Button color="primary" size="small" variant="contained" style={{ maxWidth: "700px" }} onClick={this.saveSubject}>Submit</Button>
              <p>{this.state.message}</p>

            </Grid>
          )}
        </Paper>
      </Grid>
    );
  };
}

export default CreateSubject;