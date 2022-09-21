import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";

class ViewSubjectEnrollment extends Component {
  constructor(props) {
    super(props);
    this.retrieveEnrollments = this.retrieveEnrollments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEnrollment = this.setActiveEnrollment.bind(this);

    this.state = {
      enrollments: [],
      request: [],
      currentEnrollment: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveEnrollments();
  }

  retrieveEnrollments() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    EnrollmentDataService.viewEnrollmentByUsername(username)
      .then(response => {
        this.setState({
          enrollments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }
      );
  }

  refreshList() {
    this.retrieveEnrollments();
    this.setState({
      currentEnrollment: null,
      currentIndex: -1
    });
  }

  setActiveEnrollment(enrollment, index) {
    this.setState({
      currentEnrollment: enrollment,
      subjectTopics: enrollment.subjectTopics,
      currentIndex: index
    });
  }

  render() {
    const { enrollments, currentEnrollment, currentIndex, subjectTopics} = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <h3>My Enrollments</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Enrollment List</h2>
            <div className="list-group">
              {enrollments && enrollments.map((enrollment, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveEnrollment(enrollment, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + enrollment?.subjectName} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={4}>
            {currentEnrollment ? (
              <div style={{ "marginLeft": "200px" }}>
                <br />
                 <div style={{minWidth: "400px"}}>
                    <label><strong>Subject Name:</strong></label>{" "}{currentEnrollment.subjectName}
                    <br/>
                    <label><strong>Username:</strong></label>{" "}{currentEnrollment.username}
                    <br/>
                    <label><strong>Subject Topics:</strong></label>
                    <div className="list-group" >
                      {subjectTopics && subjectTopics.map((topic, index) => (
                        <ListItem selected={index === currentIndex} divider style={{ padding: "20px" }} key={index}> {topic}{" "} </ListItem>
                      ))} 
                    </div>
                    <br/>
                    <label><strong>Tutorial:</strong></label>{" "}{currentEnrollment.tutorialNumber}
                    <br/>
                    <label><strong>Status:</strong></label>{" "}{currentEnrollment.status}
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on an Enrollment Request...</i></p>
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

export default ViewSubjectEnrollment