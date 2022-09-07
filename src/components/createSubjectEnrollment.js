import React from "react";
import { Button, Input } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";

class CreateSubjectEnrollment extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    // this.retrieveTutors = this.retrieveTutors.bind(this);
    // this.refreshList = this.refreshList.bind(this);

    this.state = {
      subjectName: "",
      strengths: [],
      weaknessess: [],
      username: "",
      submitted: false,
      message: "",
      topcs: "",
      subjects: [],
      currentIndex: -1,
      currentTopic: null,
      selectedSubject: false,
      currentSubject: "",
      addedTopics: [],
      currentTopicIndex: -1,
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
    });
  }

  retrieveSubjects() {
    EnrollmentDataService.getAllSubjects()
      .then(response => {
        this.setState({
          subjects: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveAddSubject(subject, index) {
    this.setState({
      currentSubject: subject,
      currentIndex: index,
      selectedSubject: true,
      topics: subject.subjectTopics,
    });
  }

  addTopic(topic, index) {
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

    if (alreadyExists === false) {
      topicsList.push(topic);
      this.setState({
        currentTopic: topic,
        currentTopicIndex: index,
        addedTopics: topicsList,
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

  saveEnrollment = () => {
    var i, j
    const weaknesses = []
    var exists = false;
    const subjectTopics = this.state.currentSubject.subjectTopics
    const addedTopics = this.state.addedTopics

    for (i = 0; i <= subjectTopics.length; i++) {
      for (j = 0; j <= addedTopics.length; j++) {
        if (subjectTopics[i] === addedTopics[j]) {
          exists = true;
          break;
        } else {
          exists = false;
        }
      }

      if (exists === false) {
        weaknesses.push(subjectTopics[i])
      }
    }

    const data = {
      username: this.state.username,
      subjectName: this.state.currentSubject.subjectName,
      strengths: this.state.addedTopics,
      weaknesses: weaknesses
    };

    EnrollmentDataService.create(this.state.username, data)
      .then((response) => {
        this.setState({
          subjectName: response.data.subjectName,
          submitted: true,
          strengths: response.data.strengths,
          weaknessess: response.data.weaknesses,
          message: ""
        });
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
      strengths: "",
      weaknessess: "",
      submitted: false,
      subjects: [],
      message: "",
      topics: [],
      currentTopic: null,
      selectedSubject: false,
    });
    this.componentDidMount();
  }

  render() {
    const { topics, currentIndex, addedTopics, currentTopicIndex, currentSubject, subjects } = this.state;
    return (
      <div style={{ textAlign: "center", maxWidth: '90%', fontFamily: "Times New Roman", marginLeft: "110px" }} className="form">
        <h3>Create a Subject Enrollment</h3>
        {this.state.submitted ? (
          <div>
            <p><i>You created a subject enrollment successfully!</i></p>
            <Button size="small" variant="contained" onClick={this.newEnrollment}>{" "}Create a Subject Enrollment{" "}</Button>
          </div>
        ) : (
          <div className="card" style={{ maxWidth: "100%", marginLeft: "0px", paddingLeft: "0px", paddingRight: "120px" }}>
            {!this.state.selectedSubject ? (
              <div>
                <label htmlFor="subject-name" style={{ marginLeft: '210px' }}><i>Please select a Subject to enroll into:</i></label>
                {subjects && subjects.map((subject, index) => (
                  <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentIndex} onClick={() => this.setActiveAddSubject(subject, index)} divider button key={index}>
                    {subject.subjectName}
                  </ListItem>
                ))}
              </div>
            ) : (
              <div>
                <br />
                <div style={{ alignContent: "space-between" }}>
                  <h4>Selected Subject: </h4>
                  <i><h4> {this.state.currentSubject.subjectName}</h4>
                  </i>
                </div>
                <br />
                <Grid container style={{ maxWidth: "1000px" }}>
                  <Grid item md={4}>
                    {currentSubject ? (
                      <Grid item md={4} style={{ minWidth: "400px" }}>
                        <h4>Subject Topics</h4>
                        <i>Please select your strengths from the list:</i>
                        <div style={{ flexDirection: "column", minWidth: "400px" }}>
                          {topics && topics.map((topic, index) => (
                            <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentTopicIndex} onClick={() => this.addTopic(topic, index)} divider button key={index}>
                              {topic}
                            </ListItem>
                          ))}
                        </div>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item md={4} style={{ paddingLeft: "100px", minWidth: "400px" }}>
                    <h4 style={{ paddingLeft: "50px" }}>Subject Strengths</h4>
                    <div style={{ paddingLeft: "50px" }}>
                      {addedTopics.map((addedTopic, index) => (
                        <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentIndex} onClick={() => this.deleteTopic(index)} divider button key={index}>
                          {" "}{addedTopic}
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                  <br />
                  <br />
                </Grid>
                <div className="form-group">
                  <Button size="small" variant="contained" style={{ maxWidth: "700px", marginLeft: "225px" }} onClick={this.saveEnrollment}>Submit</Button>
                  <Button size="small" variant="contained" onClick={() => window.location.reload()}>{" "}Back{" "}</Button>
                </div>
              </div>
            )}
            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  };
}

export default CreateSubjectEnrollment;
