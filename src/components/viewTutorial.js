import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import { Grid, ListItem } from "@material-ui/core";

class TutorialList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorial = this.retrieveTutorial.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      tutorials: []
    };
  }

  componentDidMount() {
    this.retrieveTutorial();
  }

  retrieveTutorial() {
    const URL = String(this.props.match.path);
    const _id = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    console.log(_id);
    SubjectDataService.findTutorialByTutor(_id)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
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

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  render() {
    const { currentIndex, tutorials, currentTutorial } = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <h3>Tutors</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Tutorial List</h2>
            <div className="list-group">
              {tutorials && tutorials.map((tutorial, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutorial(tutorial, index)} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + tutorial?.subjectName + " Number: " + tutorial?.number} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={4}>
            {currentTutorial ? (
              <div style={{ "marginLeft": "200px" }}>
                <br />
                <div>
                  <h2>Tutorial</h2>
                  <div>
                    <label><strong>Tutorial Number:</strong></label>{" "}{currentTutorial.number}
                  </div>
                  <div>
                    <label><strong>Day:</strong></label>{" "}{currentTutorial.Day}
                  </div>
                  <div>
                    <label><strong>Time Slot:</strong></label>{" "}{currentTutorial.timeSlot}
                  </div>   
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on a tutorial...</i></p>
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

export default TutorialList