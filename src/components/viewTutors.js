import React, { Component } from "react";
import TutorDataService from "../services/tutor-service";
import SubjectDataService from "../services/subject-service";
import { Box, Grid, ListItem, styled, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import "./studentProfile.css";
import { Divider } from "@material-ui/core";

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
      <Grid align={'center'} >
        <Backing2>
          <BigText variant="h2">View Tutors</BigText>
          <p><i>To begin, please select a tutor...</i></p>
          <hr className="new5"></hr>
          <Grid container direction="row" 
  >
    <Grid item xs={6} align={'center'}>
        <Typography variant="h4">Tutor List</Typography>
          <Box  borderColor={'black'} bgcolor={'white'}  border={1} minHeight={330} maxHeight={330} maxWidth={305} overflow={'auto'}>
           <div style={subjectScrollable}>
                <div className="list-group">
                  {tutors && tutors.map((tutor, index) => (
                    <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutor(tutor, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + tutor?.username} </ListItem>
                  ))}
                </div>
              </div>
              </Box>
    </Grid>
    <Grid item xs={5}>
    {currentTutor ? (
                <div>
                  <div>
                    <div>
                    <Typography variant="h4">{currentTutor?.username}'s Assigned Tutorials</Typography>
                      
                    </div>
                    <Box  borderColor={'black'} bgcolor={'white'}  border={1} minHeight={330} maxHeight={330} maxWidth={400} overflow={'auto'}>

                    <div style={tutorScrollable}>
                      <div className="list-group">
                        {tutorials && tutorials.map((tutorial, index) => (
                          <ListItem selected={index === currentIndex} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + tutorial?.subjectName + " Number: " + tutorial?.number + ", Day " + tutorial?.day + ", Time Slot: " + tutorial?.timeSlot} </ListItem>
                        ))}
                      </div>
                    </div>
                    </Box>
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
          </Backing2>
      </Grid>
    );
  }
}

export default TutorList