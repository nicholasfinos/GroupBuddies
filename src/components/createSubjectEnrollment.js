import React from "react";
import { Button} from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";
import { Paper} from "@material-ui/core";

const paperStyling = { padding: 40, height: '100%', width: '90%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = {overflowY: 'auto', overflowX:'hidden', maxHeight:'450px', marginLeft:'30%', width:'400px'}
const skillsScrollable = {overflowY: 'auto', overflowX:'hidden', maxHeight:'400px', width:'100%', flexDirection: "column", minWidth: "400px", padding:"20px"}  


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
      <div>
        <h3 style={{textAlign:'center'}}>Create a Subject Enrollment</h3>
      <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
        <form>
      <div style={{background:"white"}}>
        
        {this.state.submitted ? (
          <div>
            <p><i>You created a subject enrollment successfully!</i></p>
            <Button size="small" color="primary" variant="contained" onClick={this.newEnrollment}>{" "}Create a Subject Enrollment{" "}</Button>
          </div>
        ) : (
          <Grid>
            {!this.state.selectedSubject ? (
              <Grid>
                <label htmlFor="subject-name" ><i>Please select a Subject to enroll into:</i></label>
                <br/>
                <br/>
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
                      <Grid style={{ minWidth: "400px" }}>
                        <h4>Subject Topics</h4>
                        <i>Please select your strengths from the list:</i>
                        <br />
                        <div style={skillsScrollable}>
                          {topics && topics.map((topic, index) => (
                            <ListItem style={{ padding: "20px", marginLeft: "15px"}} selected={index === currentTopicIndex} onClick={() => this.addTopic(topic, index)} divider button key={index}>
                              {topic}
                            </ListItem>
                          ))}
                        </div>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                </Grid>
                <Grid item md={6}>
                <h4 >Subject Strengths</h4>
                <i>Click on strengths below to remove them:</i>
                <br />
                    <div style={skillsScrollable}>
                      {addedTopics.map((addedTopic, index) => (
                        <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentIndex} onClick={() => this.deleteTopic(index)} divider button key={index}>
                          {" "}{addedTopic}
                        </ListItem>
                      ))}
                    </div>
                </Grid>
                <Grid item md={12} spacing={8}>
                  <br />
                  <Button size="small" color="primary" variant="contained" style={{ maxWidth: "700px", marginRight:'10px'}} onClick={this.saveEnrollment}>Submit</Button>
                  <Button size="small" color="primary" variant="contained" style={{marginLeft:'10px'}} onClick={() => window.location.reload()}>{" "}Back{" "}</Button>
                </Grid>
              </Grid>
            )}
            <p>{this.state.message}</p>
          </Grid>
        )}
      </div>
      </form>
      </Paper>
      </div>
    );
  };
}

export default CreateSubjectEnrollment;
