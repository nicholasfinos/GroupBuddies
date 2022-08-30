import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Grid, ListItem } from "@material-ui/core";
import EditSubject from "./editSubject";
import { Link, Switch, Route } from "react-router-dom";

class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.retrieveSubjects = this.retrieveSubjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubject = this.setActiveSubject.bind(this);

    this.state = {
      subjects: [],
      tutorials: [],
      currentTutorial: null,
      currentSubject: null,
      groupAssessment: "",
      subjectTopics: "",
      currentIndex: -1,
      subjectCoordinator: "",
      tutor: ""
    };
  }

  componentDidMount() {
    this.retrieveSubjects();
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

  setActiveSubject(subject, index) {
    if (subject.groupAssessment === true) {
      this.setState({
        currentSubject: subject,
        groupAssessment: "Yes",
        currentIndex: index
      });
    }
    else {
      this.setState({
        currentSubject: subject,
        groupAssessment: "No",
        currentIndex: index
      });
    }

    if (subject.subjectTopics.size !== 0) {
      var str = "";

      for (let i = 0; i < subject.subjectTopics.length; i++) {
        str += subject.subjectTopics[i] + ",";
      }

      this.setState({ subjectTopics: str });
    }

    TutorDataService.getTutor(subject.subjectCoordinator)
      .then((response) => {
        this.setState({ subjectCoordinator: response.data.username });
      })
      .catch((e) => {
        console.log(e);
      })

    SubjectDataService.findTutorial(subject.subjectName)
      .then((response) => {
        this.setState({ tutorials: response.data });
      })
      .catch((e) => {
        console.log(e);
      })
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

  render() {
    const { subjects, currentSubject, currentIndex, tutorials, currentTutorial, subjectCoordinator, tutor } = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <h3>Subjects</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Subject List</h2>
            <div className="list-group">
              {subjects && subjects.map((subject, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveSubject(subject, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + subject?.subjectName} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={4}>
            {currentSubject ? (
              <div style={{ "marginLeft": "100px" }}>
                <br />
                <div>
                  <h2>Subject</h2>
                  <div>
                    <label><strong>Subject Coordinator:</strong></label>{" "}{subjectCoordinator}
                  </div>
                  <div>
                    <label><strong>Subject Name:</strong></label>{" "}{currentSubject.subjectName}
                  </div>
                  <div>
                    <label><strong>Number of Tutorials:</strong></label>{" "}{currentSubject.tutorialNumbers}
                  </div>
                  <div>
                    <label><strong>Semester:</strong></label>{" "}{currentSubject.semester}
                  </div>
                  <div>
                    <label><strong>Group Assessment:</strong></label>{" "}{this.state.groupAssessment}
                  </div>
                  <div>
                    <label><strong>Subject Topics:</strong></label>{" "}{this.state.subjectTopics}
                  </div>
                  <br />
                  <h2>Tutorial List</h2>
                  <div className="list-group">
                    {tutorials && tutorials.map((tutorial, index) => (
                      <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutorial(tutorial, index)} divider button style={{ padding: "20px" }} key={index}> {"Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                    ))}
                  </div>
                  <br/>
                  <div>
                    <Link style={{WebkitTextFillColor: "black"}} to={"/subject/" + this.state.subjectCoordinator + "/" + currentSubject._id}>Edit</Link>
                    <Switch>
                      <Route exact path={"/subject/" + this.state.subjectCoordinator + "/" + currentSubject?._id} component={EditSubject}/>
                    </Switch>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on a Subject...</i></p>
                <div style={{ float: "left", width: "100%" }}>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SubjectList