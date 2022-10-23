import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Box, Button, Grid, ListItem, Paper, styled, Typography } from "@material-ui/core";
import TutorialPage from "./tutorialPage";
import { Link, Switch, Route } from "react-router-dom";


const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));


const Backing = styled(Paper)(({ theme }) => ({
  height: '74vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
  width: 1100,
   background: '#fff0e7',
}));


class TutorialList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorial = this.retrieveTutorial.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      currentTutorial: null,
      id: null,
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
    this.setState({id: _id});
    TutorDataService.getTutorials(_id)
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
    const { currentIndex, tutorials, currentTutorial, id } = this.state;

    return (
      <Grid align="center">
      <Backing>
      <div style={{textAlign: "center",}}>
     
        <BigText variant="h2">View Tutorials</BigText>
        <Grid container align="center" >
          <Grid item align="center" xs={6}>
            <Box paddingTop={2}>
            <Typography variant="h5">Tutorial List</Typography>
            </Box>
            <Box borderColor={'black'} bgcolor={'#D3D3D3'}  border={1} minHeight={300} maxHeight={300} maxWidth={300}>
            <div className="list-group">
              {tutorials && tutorials.map((tutorial, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveTutorial(tutorial, index)} divider button style={{ padding: "5px" }} key={index}> {"Subject: " + tutorial?.subjectName + " Number: " + tutorial?.number} </ListItem>
              ))}
            </div>
            </Box>
          </Grid>
          <Grid item xs={3}>
            {currentTutorial ? (
              <div style={{ }}>
                
                <div>
                  <Grid align={'center'}>
                  <Box paddingTop={2}>
                  <Typography variant="h5">{currentTutorial.subjectName}</Typography>
                
                  </Box>
                  <Box borderColor={'black'} bgcolor={'#D3D3D3'}  border={1} minHeight={300} maxHeight={300} maxWidth={300}>
                  <Box paddingTop={2}>
                    <Typography variant="h6">Tutorial Number: {currentTutorial.number}</Typography>
                  </Box>
                  <Box paddingTop={1}>
                    <Typography variant="h6">Day: {currentTutorial.day}</Typography>
                  </Box>
                  <Box paddingTop={1}>
                    <Typography variant="h6">Time Slot: {currentTutorial.timeSlot}</Typography>
                  </Box>
                  
                  <Box paddingTop={10}>
                  <Button variant="contained" component={Link} to={"/tutorial/" + id + "/" + currentTutorial._id}>Edit Tutorial</Button>
                  </Box>
                  
                  </Box> 
                  </Grid>
                </div>
              </div>
            ) : (
              <div style={{ }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on a tutorial...</i></p>
                <div style={{ float: "left", width: "100%" }}>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      </Backing>
      </Grid>
    );
  }
}

export default TutorialList