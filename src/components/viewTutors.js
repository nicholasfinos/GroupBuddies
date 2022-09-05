import React, { Component } from "react";
import TutorDataService from "../services/tutor-service";
import SubjectDataService from "../services/subject-service";
import { Grid, ListItem } from "@material-ui/core";

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

    SubjectDataService.findTutorialByTutor(tutor._id)
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
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <h3>Tutors</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Tutor List</h2>
            <div className="list-group">
              {tutors && tutors.map((tutor, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutor(tutor, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + tutor?.username} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentTutor ? (
              <div style={{ "marginLeft": "200px" }}>
                <br />
                <div>
                  <h2>Tutor</h2>
                  <div>
                    <label><strong>Tutor Name:</strong></label>{" "}{currentTutor?.username}
                  </div>
                  <br />
                  <h2>Tutorial List</h2>
                  <div className="list-group">
                    {tutorials && tutorials.map((tutorial, index) => (
                      <ListItem selected={index === currentIndex} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + tutorial?.subjectName + " Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on a tutor...</i></p>
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

export default TutorList