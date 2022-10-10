import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Link, Switch, Route } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import viewSubject from "../components/viewSubjects";
import { Grid, ListItem } from "@material-ui/core";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class EditSubject extends Component {
  constructor(props) {
    super(props);
    this.retrieveSubjects = this.retrieveSubjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.getSubject =this.getSubject.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
    this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);
    this.onChangeTutorialNumbers = this.onChangeTutorialNumbers.bind(this);
    this.onChangeSubjectTopics = this.onChangeSubjectTopics.bind(this);
   
    this.state = {
      id: null,
      tutorials: [],
      subjectName: "",
      semester: "",
      groupAssessment: "",
      subjectTopics: "",
      subjectCoordinator: "",
      tutorialNumbers: "",
      tutors: [],
      addedtutors: [],
      username: "",
      message: "",
      currentIndex: -1
    }
  }

  componentDidMount() {
    const URL = String(this.props.location.pathname);
    const subjectId = String(
      URL.substring(URL.lastIndexOf("/") + 1, URL.length)
    );
    this.getSubject(subjectId);
  }

  retrieveSubjects() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    SubjectDataService.view(username)
      .then(response => {
        this.setState({
          subjects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }
      );
  }

  refreshList() {
    this.retrieveSubjects();
    this.setState({
      currentSubject: null,
      currentIndex: -1
    });
  }

  getSubject(subjectId) {
    const URL = String(this.props.match.path).slice(0, -1);
    // console.log(this.props.match.path)
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({
      username: username
    })
    SubjectDataService.findSubjectById(username, subjectId)
      .then((response) => {
        this.setState({
          // currentSubject: response.data,
          id: response.data[0]._id,
          tutorials: response.data[0].tutorials,
          subjectName: response.data[0].subjectName,
          tutorialNumbers: response.data[0].tutorialNumbers,
          semester: response.data[0].semester,
          //groupAssessment: response.data[0].groupAssessment,
          subjectTopics: response.data[0].subjectTopics,
          subjectCoordinator: response.data[0].subjectCoordinator,
          tutors: response.data[0].tutors,
        });


        if(response.data[0].groupAssessment === true) {
          this.setState({ groupAssessment: "Yes"});
        }
        else {
          this.setState({ groupAssessment: "No"})
        }

        console.log(response.data);
        })
      .catch((e) => {
        console.log(e);
      }
    );
  }

  setActiveTutorial(tutorial, index) {
    TutorDataService.getTutor(tutorial.tutor)
      .then((response) => {
        this.setState({ tutor: response.data.username });
      })
      .catch((e) => {
        console.log(e);
      })

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  onChangeGroupAssessment(e) {
    console.log(e.target.value);
    this.setState({ groupAssessment: e.target.value, message: "" });
  }

  onChangeTutorialNumbers(e) {
    console.log(e.target.value);
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

  setActiveAddItem(tutor, index) {
    this.setState({
      currentTutor: tutor,
      currentIndex: index,
      timeSlot: "",
      day: ""
    });
  }

  addTutor(tutor, tutorTimeSlot, tutorDay) {
    if(tutorTimeSlot.length !== 0 || tutorDay.length !== 0) {
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
      this.setState({ message: "Please fill Time Slot and Day before adding Tutorial"})
    }
  }

  updateSubject() {
    var data =  {
      id: this.state?.id,
      subjectName: this.state?.subjectName,
      tutorialNumbers: this.state?.tutorialNumbers,
      groupAssessment: this.state?.groupAssessment,
      semester: this.state?.semester,
      subjectTopics: this.state?.subjectTopics
    };

    SubjectDataService.updateSubject(data)
      .then((response) => {
        this.setState({
          subjectName: response.data?.subjectName,
          tutorialNumbers: response.data?.tutorialNumbers,
          groupAssessment: response.data?.groupAssessment,
          semester: response.data?.semester,
          subjectTopics: response.data?.subjectTopics,
          assignedTutor: response.data?.assignedTutors,
          message: ""
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  goBack = (username) => {
    this.props.history.push("/subject/" + username);
    window.location.reload();
  }

  render() {
    const { subjectName, tutorials, semester, groupAssessment, subjectTopics, tutorialNumbers, subjectCoordinator, tutors, username } = this.state;

    return (
        <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
          <h3>{subjectName}</h3>
          <form>
            <div>
              <label htmlFor="username">Subject Name</label>
              <Input style={{fontFamily: "Times New Roman"}} type="text" className="form-control" name="subject-name" value={subjectName} disabled />
            </div>
            <div>
              <label htmlFor="semester">Semester</label>
              <Input style={{fontFamily: "Times New Roman"}} type="text" className="form-control" name="semester" value={semester} disabled/>
            </div>
            <div className="form-group">
              <label style={{ marginLeft: "220px" }} htmlFor="tutorial numbers">Number of Tutorials:</label>
              <select className="form-group border" style={{ minWidth: "500px" }} value={tutorialNumbers} onChange={this.onChangeTutorialNumbers} validations={[required]} disabled>
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
              <label style={{ marginLeft: "220px" }} htmlFor="group-assessment">Group Assessment:</label>
              <select className="border" style={{ minWidth: "500px" }} value={groupAssessment} onChange={this.onChangeGroupAssessment} validations={[required]} >
                <option value="" disabled selected>Select your option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ marginLeft: "220px" }} htmlFor="subject-topics">Subject Topics:</label>
              <textarea className="border" style={{ minWidth: "500px" }} id="topics" name="topics" value={subjectTopics} rows="5" placeholder="Please seperate each topic with a comma..." disabled ></textarea>
            </div>
            {/* onChange={this.onChangeSubjectTopics} validations={[required]}> */}
            <br/>
            <div>
              <br/>
              <Button size="small" variant="contained" style={{maxWidth: "700px", marginLeft: "225px"}} onClick={this.updateSubject}>Save</Button>
              <Link style={{ WebkitTextFillColor: "black" }} to={"/subject/view/" + username}>Go Back?</Link>
              <Switch>
                <Route path={"/subject/view/" + username} component={viewSubject} />
              </Switch>
            </div>
          </form>
          <p>{this.state.message}</p>
      </div>
    );
  }
}

export default EditSubject;