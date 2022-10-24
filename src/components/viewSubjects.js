import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Box, Button, Grid, ListItem, styled, Typography } from "@material-ui/core";
import EditSubject from "./editSubject";
import { Link, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";

const paperStyling = { padding: 40, height: '100%', width: '100%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '550px', width: '300px' }
const tutorialScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '500px' }

const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

const Backing2 = styled(Paper)(({ theme }) => ({
  height: '72vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
   background: '#fff0e7',
   width: 1100
}));


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
      <Grid  align={'center'} >
        <Backing2>
        <BigText variant="h2"> Edit Tutorial </BigText>
          <hr className="new5"></hr>
          <Grid container >
            <Grid item xs={6} >
              <div style={{ width: "90%" }}>
              <Typography variant="h4">Subject List</Typography>
                <Box borderColor={'black'} bgcolor={'white'}  border={1} minHeight={330} maxHeight={330} maxWidth={350}>
                <div style={subjectScrollable}>
                  <div className="list-group">
                    {subjects && subjects.map((subject, index) => (
                      <ListItem selected={index === currentIndex} onClick={() => this.setActiveSubject(subject, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + subject?.subjectName} </ListItem>
                    ))}
                  </div>
                </div>
                </Box>
              </div>
            </Grid>
            <Grid item xs={6}>
              {currentSubject ? (
                <Grid container spacing={2}>
                  <Grid item xs={6} align='center'>
                    <div style={{ }}>
                    <Typography variant="h4">{currentSubject.subjectName}</Typography>
                      <Box borderColor={'black'} bgcolor={'white'}  border={1} minHeight={330} maxHeight={330} maxWidth={350}>
                      <div>
                        <Typography><strong>Subject Coordinator:</strong></Typography>{" "}{subjectCoordinator}
                      </div>
                      <div>
                        <Typography><strong>Subject Name:</strong></Typography>{" "}{currentSubject.subjectName}
                      </div>
                      <div>
                        <Typography><strong>Number of Tutorials:</strong></Typography>{" "}{currentSubject.tutorialNumbers}
                      </div>
                      <div>
                        <Typography><strong>Semester:</strong></Typography>{" "}{currentSubject.semester}
                      </div>
                      <div>
                        <Typography><strong>Group Assessment:</strong></Typography>{" "}{this.state.groupAssessment}
                      </div>
                      <div>
                        <Typography><strong>Subject Topics:</strong></Typography><br />{" "}{this.state.subjectTopics}
                      </div>
                      </Box>
                    </div>
                    
                  </Grid>
                  <Grid item xs={6} align={'center'}>
                    <div>
                    <Typography variant="h4">Tutorial List</Typography>
                    <Box borderColor={'black'} bgcolor={'white'}  border={1} minHeight={330} maxHeight={330} maxWidth={350}>
                      <div style={tutorialScrollable}>
                        <div className="list-group">
                          {tutorials && tutorials.map((tutorial, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutorial(tutorial, index)} divider button style={{ padding: "20px" }} key={index}> {"Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                          ))}
                        </div>
                      </div>
                      </Box>
                      <div>
                        
                      </div>
                      
                    </div>
                  </Grid>
                  <Box paddingLeft={27}>
                      <Button  maxWidth disableElevation
      variant="contained"
      
      aria-label="Disabled elevation buttons" component={Link} to={"/subject/" + this.state.subjectCoordinator + "/" + currentSubject._id}>Edit Subject</Button>
                        </Box>
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
          </Backing2>
      </Grid>
    );
  }
}

export default SubjectList