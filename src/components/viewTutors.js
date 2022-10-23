import React, { Component } from "react";
import TutorDataService from "../services/tutor-service";
import SubjectDataService from "../services/subject-service";
import { Grid, ListItem } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";
import { Divider } from "@material-ui/core";

const paperStyling = { padding: 40, height: '100%', width: '80%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '450px', width: '300px' }
const tutorScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '350px' }

class TutorList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutors = this.retrieveTutors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutor = this.setActiveTutor.bind(this);

    this.state = {
      tutors: [],
      currentTutor: null,
      currentIndex: -1,
      tutorials: []
    };
  }

  componentDidMount() {
    this.retrieveTutors();
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
      }
      );
  }

  refreshList() {
    this.retrieveTutors();
    this.setState({
      currentTutor: null,
      currentIndex: -1
    });
  }

  setActiveTutor(tutor, index) {
    this.setState({
      currentTutor: tutor,
      currentIndex: index
    });

    TutorDataService.getTutorials(tutor._id)
      .then((response) => {
        this.setState({ tutorials: response.data });
      })
      .catch((e) => {
        console.log(e);
      })
  }

  render() {
    const { tutors, currentTutor, currentIndex, tutorials } = this.state;

    return (
      <Grid style={{ textAlign: "center" }}>
        <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
          <h3>View Tutors</h3>
          <p><i>To begin, please select a tutor...</i></p>
          <hr className="new5"></hr>
          <Grid container>
            <Grid item md={2}>
              <h2>Tutor List</h2>
              <div style={subjectScrollable}>
                <div className="list-group">
                  {tutors && tutors.map((tutor, index) => (
                    <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutor(tutor, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + tutor?.username} </ListItem>
                  ))}
                </div>
              </div>
              <Divider orientation="vertical" flexItem style={{ marginLeft: "20%" }}>
              </Divider>
            </Grid>
            <Grid item md={10}>
              {currentTutor ? (
                <div style={{ "marginLeft": "200px" }}>
                  <div>
                    <div>
                      <h2>Tutor Name: {currentTutor?.username}</h2>{" "}
                    </div>
                    <br />
                    <h2>Tutorial List:</h2>
                    <div style={tutorScrollable}>
                      <div className="list-group">
                        {tutorials && tutorials.map((tutorial, index) => (
                          <ListItem selected={index === currentIndex} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + tutorial?.subjectName + " Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", transform: "translateY(-30%)" }}>
                  <br />
                  <h1 style={{ marginLeft: "100px", marginTop: "40%" }}><i>Please click on a tutor...</i></h1>
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

export default TutorList