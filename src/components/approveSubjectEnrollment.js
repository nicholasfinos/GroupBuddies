import React from "react";
import { Button} from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";
import SubjectDataService from "../services/subject-service";
import { Paper} from "@material-ui/core";
import "./studentProfile.css";
import { Divider} from "@material-ui/core";

const paperStyling = { padding: 40, height: '100%', width: '100%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }

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
      <div>
        <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
        <h3 style={{textAlign:"center"}}>View Subject Enrollments</h3>
        <p style={{textAlign:"center"}}><i>To begin, please click on a subject</i></p>
        <hr className="new5"></hr>

        <Grid container>
          <Grid item md={4}>
            
            <div style={{width:"95%"}}>
          <h3 style={{textAlign:"center"}}>Subject List</h3>
          <p style={{textAlign:"center"}}><i>Please select a subject</i></p>
            <div>
              {subjects && subjects.map((subject, index) => (
                <ListItem style={{ padding: "20px", maxWidth: "400px" }} onClick={() => this.setActiveAddSubject(subject, index)} divider button key={index}>
                  {subject.subjectName}
                </ListItem>
              ))}
            </div>
            </div>
          
          </Grid>
          <Divider orientation="vertical" flexItem>
          </Divider>
          <Grid item md={4}>
            <div style={{width:"95%", marginLeft:"2.5%"}}>
          {currentSubject ? (
              <Grid style={{ minWidth: "300px"}}>
                <h3 style={{textAlign:"center"}}>{currentSubject.subjectName} Enrollments</h3>
                <p style={{textAlign:"center"}}><i>Please select an enrollment request</i></p>
                <Grid style={{ flexDirection: "column" }}>
                  {enrollments && enrollments.map((enrollment, index) => (
                    <ListItem style={{ padding: "20px", maxWidth: "400px" }} onClick={() => this.setActiveEnrollment(enrollment, index)} divider button key={index}>
                      {"Name: " + enrollment?.username}
                    </ListItem>
                  ))}
                </Grid>
              </Grid>
            ) : (
              <div>
                <h3 style={{textAlign:"center"}}> Enrollments: </h3>
                <p style={{textAlign:"center"}}><i>Please select an enrollment request</i></p>
              </div>
            )}
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem></Divider>
          <Grid item md={3.9}>
            <div style={{width:"100%", marginLeft:"5%", textAlign:"center", maxWidth:"400px"}}>
          {currentEnrollment ? (
              <div>
                <div style={{ minWidth: "400px", maxWidth: "400px" }}>
                <h3 style={{textAlign:"center"}}>Details</h3>
                  <label><strong>Name:</strong></label>{" "}{currentEnrollment.username}
                  <br />
                  <label><strong>Subject Topics:</strong></label>
                  <div className="list-group" >
                    {subjectTopics && subjectTopics.map((topic, index) => (
                      <ListItem divider style={{ padding: "20px", alignItems: 'center', maxWidth:"400px",}} key={index}> {topic}{" "} </ListItem>
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
                  <Button color="primary" size="small" variant="contained" style={{ maxWidth: "700px"}} onClick={this.updateEnrollment}>Update</Button>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingBottom: "75px", textAlign:"center", marginLeft:"35%"}}>
                <h3 style={{textAlign:"center"}}>Details</h3>
                <p style={{textAlign:"center"}}><i>Please click on an Enrollment Request...</i></p>
                <div style={{ float: "left", width: "100%" }}>
                </div>
              </div>
            )}
            </div>
          </Grid>
        </Grid>
        </Paper>
      </div>
    );
  };
}

export default ApproveSubjectEnrollment;