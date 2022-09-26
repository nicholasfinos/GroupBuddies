import React from "react";
import { Button, Input } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";
import SubjectDataService from "../services/subject-service";

class ApproveSubjectEnrollment extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);

    this.state = {
      subjectName: "",
      username: "",
      topics: "",
      tutorials: "",
      subjects: [],
      currentIndex: -1,
      currentTopic: null,
      currentTutorial: null,
      currentSubject: "",
      status: "",
      isDecline: false,
      reason: "",
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

  setActiveAddSubject(subject) {
    this.setState({
      enrollments: null
    })
    EnrollmentDataService.viewEnrollmentBySubjectName(subject.subjectName)
      .then(response => {
        this.setState({
          currentSubject: subject,
          enrollments: response.data,
          currentEnrollment: null
        });
      })
  }

  setActiveEnrollment(enrollment) {
    this.setState({
      currentEnrollment: enrollment,
      subjectTopics: enrollment.subjectTopics,
    });
  }

  onChangeReason(e) {
    this.setState({ reason: e.target.value });
  }

  onChangeStatus(e) {
    if (e.target.value === "Declined") {
      this.setState(
        {
          status: e.target.value,
          isDecline: true
        }
      );
    }
    else {
      this.setState(
        {
          status: e.target.value,
          isDecline: false
        }
      );
    }
  }

  updateEnrollment = () => {
    var data;
    if (this.state.isDecline) {
      data = {
        status: this.state.status,
        enrollment: this.state.currentEnrollment,
        reason: this.state.reason
      };
    }
    else {
      data = {
        status: this.state.status,
        enrollment: this.state.currentEnrollment,
        reason: ""
      };
    }

    EnrollmentDataService.updateEnrollment(data)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        window.location.reload();
  }


  render() {
    const { currentSubject, subjects, enrollments, currentEnrollment, subjectTopics, status } = this.state;
    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <Grid container style={{ maxWidth: "1000px" }}>
          <Grid item md={4}>
            <h3>Subject List</h3>
            <div>
              {subjects && subjects.map((subject, index) => (
                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} onClick={() => this.setActiveAddSubject(subject, index)} divider button key={index}>
                  {subject.subjectName}
                </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={4}>
            {currentSubject ? (
              <Grid item md={4} style={{ minWidth: "300px", marginLeft: "75px" }}>
                <h3>{currentSubject.subjectName} Enrollments</h3>
                <div style={{ flexDirection: "column" }}>
                  {enrollments && enrollments.map((enrollment, index) => (
                    <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} onClick={() => this.setActiveEnrollment(enrollment, index)} divider button key={index}>
                      {"Name: " + enrollment?.username}
                    </ListItem>
                  ))}
                </div>
              </Grid>
            ) : (
              <div></div>
            )}
          </Grid>
          <Grid item md={4}>
            {currentEnrollment ? (
              <div style={{ marginLeft: "135px" }}>
                <br />
                <div style={{ minWidth: "400px" }}>
                  <label><strong>Name:</strong></label>{" "}{currentEnrollment.username}
                  <br />
                  <label><strong>Subject Topics:</strong></label>
                  <div className="list-group" >
                    {subjectTopics && subjectTopics.map((topic, index) => (
                      <ListItem divider style={{ padding: "20px", alignItems: 'center' }} key={index}> {topic}{" "} </ListItem>
                    ))}
                  </div>
                  <br />
                  <label><strong>Tutorial:</strong></label>{" "}{currentEnrollment.tutorialNumber}
                  <br />
                  <label><strong>Status:</strong></label>{" "}
                  <br />
                  <select className="border" style={{ minWidth: "300px" }} value={status} onChange={this.onChangeStatus}>
                    <option default value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                  <br />
                  {this.state.isDecline ? (
                    <div>
                      <label htmlFor="reason" >Reason for Declined Request: </label>
                      <input className="form-control" style={{ maxWidth: '500px' }} type="text" name="reason" onChange={this.onChangeReason} />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <br />
                  <br />
                  <Button size="small" variant="contained" style={{ maxWidth: "700px" }} onClick={this.updateEnrollment}>Update</Button>
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
  };
}

export default ApproveSubjectEnrollment;