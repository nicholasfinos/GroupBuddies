import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Box, Grid, ListItem, Paper, styled, Typography } from "@material-ui/core";
import EnrollmentDataService from "../services/enrollment-service";

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
    const { enrollments, currentEnrollment, currentIndex, subjectTopics } = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <Backing2>
        <hr className="new5"></hr>
        <Box paddingBottom={2}>
        <BigText variant="h2">View Enrolled Subjects</BigText>
        </Box>
        <Grid container align='center'>
          <Grid item xs={5}>
            <Box paddingBottom={1}>
            <BigText variant="h5">Enrollment List</BigText>
            </Box>
            <Box borderColor={'black'} bgcolor={'white'}  border={1} minHeight={300} maxHeight={300}  maxWidth={320}  overflow={'auto'}>
            <div className="list-group">
              {enrollments && enrollments.map((enrollment, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveEnrollment(enrollment, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + enrollment?.subjectName} </ListItem>
              ))}
            </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            {currentEnrollment ? (
              <div style={{ }}>
              
                <Grid align={'center'}>
                <Box paddingLeft={5} paddingBottom={1} align={'center'}>
            <BigText variant="h5">Enrollment Details</BigText>
            </Box>
            </Grid>
                <Box borderColor={'black'} bgcolor={'white'}  border={1} minHeight={300} maxHeight={300}  minWidth={420}  overflow={'auto'}>

                <div style={{ minWidth: "400px" }}>
                <Box>
                  <Typography><strong>Subject Name:</strong></Typography>{" "}{currentEnrollment.subjectName}
                  <br />
                  <Typography><strong>Username:</strong></Typography>{" "}{currentEnrollment.username}
                  <br />
                  <Typography><strong>Subject Topics:</strong></Typography>
                  <Box maxWidth={100}>
                  <div className="list-group" >
                    {subjectTopics && subjectTopics.map((topic, index) => (
                      <ListItem selected={index === currentIndex} divider style={{ padding: "0px" }} key={index}> {topic}{" "} </ListItem>
                    ))}
                  </div>
                  </Box>
                  
                  <Typography> <strong>Tutorial: {" "}{currentEnrollment.tutorialNumber}</strong> </Typography>
                  
                  <Typography><strong>Status:</strong></Typography>{" "}{currentEnrollment.status}
                  
                  {currentEnrollment.reason ? (
                    <div>
                      <Typography><strong>Reason for Declined Request:</strong></Typography>{" "}{currentEnrollment.reason}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Box>
                </div>
                
                </Box>
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
        </Backing2>
      </div>
    );
  }
}

export default ViewSubjectEnrollment