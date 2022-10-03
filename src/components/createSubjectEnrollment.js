import React from "react";
import { Button } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";

const paperStyling = { padding: 40, height: '100%', width: '100%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '450px', marginLeft: '30%', width: '400px' }
const skillsScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '400px', width: '100%', flexDirection: "column", minWidth: "400px", maxWidth: "500px", padding: "20px" }

class CreateSubjectEnrollment extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    // this.retrieveTutors = this.retrieveTutors.bind(this);
    // this.refreshList = this.refreshList.bind(this);

    this.state = {
      subjectName: "",
      username: "",
      submitted: false,
      message: "",
      topics: "",
      tutorials: "",
      subjects: [],
      currentIndex: -1,
      currentTopic: null,
      currentTutorial: null,
      selectedSubject: false,
      currentSubject: "",
      addedTopics: [],
      addedTutorials: [],
      currentTopicIndex: -1,
      currentTutorialIndex: -1,
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
    this.retrieveSubjects();
  }

  onChangeSubjectName(e) {
    this.setState({
      selectedSubject: true,
      subjectName: e.target.value,
      message: "",
      addedTopics: [],
      addedTutorials: [],
    });
  }

  retrieveSubjects() {
    EnrollmentDataService.getAllSubjects()
      .then(response => {
        this.setState({
          subjects: response.data,
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveAddSubject(subject, index) {
    console.log(subject);
    EnrollmentDataService.findTutorial(subject.subjectName)
      .then(response => {
        this.setState({
          currentSubject: subject,
          currentIndex: index,
          selectedSubject: true,
          topics: subject.subjectTopics,
          tutorials: response.data,
        });
      })
  }

  addTopic(topic) {
    const topicsList = this.state.addedTopics;
    var i;
    var alreadyExists = false;
    for (i = 0; i <= topicsList.length; i++) {
      if (topicsList[i] === topic) {
        alreadyExists = true;
        return;
      } else {
        alreadyExists = false;
      }
    }

    if (alreadyExists === false && topicsList.length < 3) {
      topicsList.push(topic);
      this.setState({
        currentTopic: topic,
        addedTopics: topicsList,
      });
    }
  }

  addTutorial(tutorial) {
    const tutorialList = this.state.addedTutorials;

    if (tutorialList.length < 1) {
      tutorialList.push(tutorial);
      this.setState({
        currentTutorial: tutorial,
        addedTutorial: tutorialList,
      });
    }
  }

  deleteTopic(index) {
    const list = this.state.addedTopics;
    list.splice(index, 1);

    this.setState({
      addedTopics: list,
      currentTopic: null,
      message: ""
    });
  }

  deleteTutorial(index) {
    const list = this.state.addedTutorials;
    list.splice(index, 1);

    this.setState({
      addedTutorials: list,
      currentTutorial: null,
      message: ""
    });
  }



  saveEnrollment = () => {
    const data = {
      username: this.state.username,
      subjectName: this.state.currentSubject.subjectName,
      subjectTopics: this.state.addedTopics,
      tutorialNumber: this.state.addedTutorials[0].number
    };
    console.log(data);
    EnrollmentDataService.create(this.state.username, data)
      .then((response) => {
        this.setState({
          submitted: true
        })
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Create new enrollment page
  newEnrollment = () => {
    this.setState({
      subjectName: "",
      username: "",
      submitted: false,
      subjects: [],
      message: "",
      topics: [],
      tutorials: [],
      currentTopic: null,
      currentTutorial: null,
      selectedSubject: false,
    });
    this.componentDidMount();
  }

  render() {
    const { topics, currentIndex, addedTopics, currentSubject, subjects, tutorials, addedTutorials, } = this.state;
    return (
      <div>
        <form>
          <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
            <h3 style={{ textAlign: "center" }}>Create a Subject Enrollment</h3>
            <hr className="new5"></hr>
            {this.state.submitted ? (
              <div>
                <p>You created a subject enrollment successfully!</p>
                <br />
                <p>Your enrollment is being processed. Visit "View subject enrollments" to view enrollment status</p>
                <Button size="small" variant="contained" onClick={this.newEnrollment}>{" "}Create a Subject Enrollment{" "}</Button>
              </div>
            ) : (
              <Grid>
                {!this.state.selectedSubject ? (
                  <Grid>
                    <label htmlFor="subject-name"><i>Please select a Subject to enroll into:</i></label>
                    <br />
                    <br />
                    <div style={subjectScrollable}>
                      {subjects && subjects.map((subject, index) => (
                        <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentIndex} onClick={() => this.setActiveAddSubject(subject, index)} divider button key={index}>
                          {subject.subjectName}
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item md={12}>
                      <br />
                      <div style={{ alignContent: "space-between" }}>
                        <h4>Selected Subject: </h4>
                        <i><h4> {this.state.currentSubject.subjectName}</h4>
                        </i>
                      </div>
                      <br />
                    </Grid>
                    <Grid item md={6}>
                      {currentSubject ? (
                        <div>
                          <h4>Subject Topics</h4>
                          <i>Please select your strengths from the list:</i>
                          <br />
                          <i>(Maximum of three)</i>
                          <div style={skillsScrollable}>
                            <div className="word-break">
                              {topics && topics.map((topic, index) => (
                                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "500px" }} onClick={() => this.addTopic(topic)} divider button key={index}>
                                  {topic}
                                </ListItem>
                              ))}
                            </div>

                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                    <Grid item md={6} className="info-card" style={{ minWidth: "400px" }}>
                      <h4>Your Subject Strengths</h4>
                      <i>Click a strength below to deselect it:</i>
                      <div >
                        {addedTopics.map((addedTopic, index) => (
                          <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentIndex} onClick={() => this.deleteTopic(index)} divider button key={index}>
                            {" "}{addedTopic}
                          </ListItem>
                        ))}
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      {/* <hr className="new5"></hr> */}
                    </Grid>
                    <Grid item md={6}>
                      {currentSubject ? (
                        <div style={{ paddingTop: "30px", minWidth: "400px" }}>
                          <h4>Tutorials</h4>
                          <i>Please select a tutorial from the list:</i>
                          <br />
                          <i>(Maximum of one)</i>
                          <div style={skillsScrollable}>
                            {tutorials && tutorials.map((tutorial, index) => (
                              <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} onClick={() => this.addTutorial(tutorial)} divider button key={index}>
                                {"Tutorial: " + tutorial.number + " | Day: " + tutorial.day + " | Time Slot: " + tutorial.timeSlot}
                              </ListItem>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid>
                    <Grid item md={6} style={{ paddingTop: "30px", minWidth: "400px" }}>
                      <div className="info-card" style={{ height: "450px" }}>
                        <h4 >Chosen Tutorial</h4>
                        <i>Click a tutorial below to deselect it:</i>
                        <div >
                          {addedTutorials.map((addedTutorial, index) => (
                            <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentIndex} onClick={() => this.deleteTutorial(index)} divider button key={index}>
                              {"Tutorial: " + addedTutorial.number + " | Day: " + addedTutorial.day + " | Time Slot: " + addedTutorial.timeSlot}
                            </ListItem>
                          ))}
                        </div>
                      </div>
                    </Grid>
                    <br />
                    <br />
                    <Grid item md={12}>
                      <br />
                      <br />
                      <Button size="small" color="primary" variant="contained" style={{ maxWidth: "700px", marginRight: "10px" }} onClick={this.saveEnrollment}>Submit</Button>
                      <Button size="small" color="primary" variant="contained" style={{ maxWidth: "700px", marginLeft: "10px" }} onClick={() => window.location.reload()}>{" "}Back{" "}</Button>
                    </Grid>
                  </Grid>
                )}
                <p>{this.state.message}</p>
              </Grid>
            )}
          </Paper>
        </form>
      </div>
    );
  };
}

export default CreateSubjectEnrollment;
