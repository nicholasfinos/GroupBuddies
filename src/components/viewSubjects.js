import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Grid, ListItem } from "@material-ui/core";
import EditSubject from "./editSubject";
import { Link, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";

const paperStyling = { padding: 40, height: '100%', width: '100%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '550px', width: '300px' }
const tutorialScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '500px' }

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
        console.log(response);
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
      <Grid style={{ textAlign: "center" }}>
        <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
          <h3>View Subjects</h3>
          <hr className="new5"></hr>
          <Grid container>
            <Grid item md={3} >
              <div style={{ width: "90%" }}>
                <h2 >Subject List</h2>
                <div style={subjectScrollable}>
                  <div className="list-group">
                    {subjects && subjects.map((subject, index) => (
                      <ListItem selected={index === currentIndex} onClick={() => this.setActiveSubject(subject, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + subject?.subjectName} </ListItem>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item md={9}>
              {currentSubject ? (
                <Grid container>
                  <Grid item md={6}>
                    <div style={{ width: "90%", marginLeft: "5%" }}>
                      <h2>{currentSubject.subjectName}</h2>
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
                        <label><strong>Subject Topics:</strong></label><br />{" "}{this.state.subjectTopics}
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div>
                      <h2>Tutorial List</h2>
                      <div style={tutorialScrollable}>
                        <div className="list-group">
                          {tutorials && tutorials.map((tutorial, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutorial(tutorial, index)} divider button style={{ padding: "20px" }} key={index}> {"Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                          ))}
                        </div>
                      </div>
                      <br />
                      <div>
                        <Link style={{ WebkitTextFillColor: "black" }} to={"/subject/" + this.state.subjectCoordinator + "/" + currentSubject._id}>Edit</Link>
                        <Switch>
                          <Route exact path={"/subject/" + this.state.subjectCoordinator + "/" + currentSubject?._id} component={EditSubject} />
                        </Switch>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              ) : (
                <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                  <br />
                  <h1 style={{ marginTop: "35%" }}><i>Please click on a Subject...</i></h1>
                  <div style={{ float: "left", width: "100%" }}>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default SubjectList