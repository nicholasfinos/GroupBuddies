import React from "react";
import { FormControl, FormHelperText, InputAdornment, ListItem, OutlinedInput } from "@material-ui/core";
import TutorDataService from "../services/tutor-service";
import StudentProfileDataServcie from "../services/studentProfile-service";
import SubjectDataService from "../services/subject-service";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const Backing = styled(Paper)(({ theme }) => ({
  height: '74vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
  background: '#fff0e7',
}));

const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

class TutorialPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeGroupSize = this.onChangeGroupSize.bind(this);

    this.state = {
      studentList: [],
      groupList: [],
      currentStudent: null,
      currentGroup: null,
      groupMembers: [],
      tutorial: null,
      currentIndex: null,
      groupSize: null,
      message: ""
    };
  }

  componentDidMount() {
    const URL = String(this.props.location.pathname);
    const _id = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));

    TutorDataService.getTutorial(_id)
      .then(response => {
        console.log(response.data);
        this.setState({
          tutorial: response.data,
          studentList: response.data.UnselectedStudents,
          groupList: response.data.groups
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setCurrentGroup(group) {
    TutorDataService.getGroup(group._id)
      .then(response => {
        this.setState({
          currentGroup: response.data,
          groupMembers: response.data.students
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setCurrentMember(member) {
    StudentProfileDataServcie.getProfile(member._id)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setCurrentStudent(member) {
    StudentProfileDataServcie.getProfile(member._id)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  addGroup() {
    TutorDataService.addGroup(this.state.tutorial)
      .then(response => {
        this.setState({
          tutorial: response.data,
          groupList: response.data.groups
        })
      })
      .catch(e => {
        console.log(e);
      });
    window.location.reload();
  }

  addStudentGroup() {
    if (this.state.currentStudent !== null && this.state.currentGroup) {
      var data = {
        tutorial: this.state.tutorial,
        student: this.state.currentStudent,
        group: this.state.currentGroup
      }

      TutorDataService.addStudentGroup(data)
        .then(response => {
          this.setCurrentGroup(this.state.currentGroup);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  removeGroup() {
    if (this.state.currentGroup !== null) {
      var data = {
        group: this.state.currentGroup,
        tutorial: this.state.tutorial,
        studentList: this.state.groupMembers
      }
      TutorDataService.removeGroup(data)
        .then(response => {
          this.setState({
            groupList: response.data.groups,
            tutorial: response.data,
            currentGroup: null
          })
        })
        .catch(e => {
          console.log(e);
        });
    }
    window.location.reload();
  }

  removeStudentGroup() {
    if (this.state.currentStudent !== null && this.state.currentGroup) {
      var data = {
        student: this.state.currentStudent,
        group: this.state.currentGroup,
        tutorial: this.state.tutorial
      }

      TutorDataService.removeStudentGroup(data)
        .then(response => {
          this.setCurrentGroup(this.state.currentGroup);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  onChangeGroupSize(e) {
    if (parseInt(e.target.value) < 1) {
      this.setState({ message: "Group Size cannot be less than 1!" })
    } else {
      this.setState({ message: "" })
    }
    this.setState({ groupSize: e.target.value });
  }

  autoSort() {
    if (this.state.groupSize >= 1) {
      SubjectDataService.findSubjectByName(this.state.tutorial.subjectName)
        .then(response => {
          var data = {
            studentList: this.state.studentList,
            tutorial: this.state.tutorial,
            groupSize: this.state.groupSize,
            subject: response.data[0]
          }
          TutorDataService.autoSort(this.state.tutorial._id, data)
            .then(response => {
              console.log(response)
            })
            .catch(e => {
              console.log(e);
            });

          const URL = String(this.props.location.pathname);
          const _id = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));

          TutorDataService.getTutorial(_id)
            .then(response => {
              this.setState({
                tutorial: response.data,
                studentList: response.data.UnselectedStudents,
                groupList: response.data.groups,
                groupSize: null,
                currentStudent: null,
                currentGroup: null
              });
            })
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      console.log("Group Size value must be greater then 1");
    }
  }
  render() {
    const { studentList, groupList, currentStudent, currentGroup, groupMembers, currentIndex, message, tutorial } = this.state;

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Backing>
          <Grid align='center'>
            <BigText variant="h2"> Edit Tutorial </BigText>
            <Button component={Link} to={"/tutor/viewTutorial/" + tutorial?.tutor}>Return</Button>
            <hr />
            <Grid alignContent="center" container spacing={3} margin={2} >
              <Grid container item xs={4} direction="column">
                <Box paddingBottom={2} >
                  <Typography variant="h6">Groups</Typography>
                  <Divider variant="middle" margin="5" padding="4px" />
                  <div className="box">
                    <Box style={{ maxHeight: 135, overflow: 'auto' }}>
                      {groupList && groupList.map((group, index) => (
                        <ListItem style={{ padding: "5px", marginLeft: "15px", maxWidth: "200px" }} selected={index === currentIndex} onClick={() => this.setCurrentGroup(group)} divider button key={index}>
                          {"Group " + group.groupNumber}
                        </ListItem>
                      ))}
                    </Box>
                  </div>
                  <stack direction="row" spacing={2}>
                    <Button variant="text" size="medium" className="button" onClick={() => { this.addGroup() }}>Add Group</Button>
                    <Button variant="text" size="medium" className="button" onClick={() => { this.removeGroup() }}>Remove Group</Button>
                  </stack>
                  <Divider variant="middle" padding={10} margin={5} />
                </Box>
                <Typography variant="h6"> Auto Grouping</Typography>
                <Divider variant="middle" sx={{ borderBottomWidth: 4 }} />
                <Box padding={2} >
                  <FormControl sx={{ m: 2, p: 5 }} variant="outlined">
                    <OutlinedInput
                      id="groupSize"
                      onChange={this.onChangeGroupSize}
                      endAdornment={<InputAdornment position="end">Groups</InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                    />
                    <FormHelperText id="outlined-weight-helper-text">Number of Groups to be Made</FormHelperText>
                  </FormControl>
                  <Button variant="text" size="medium" color="default" className="button" onClick={() => { this.autoSort() }}>Automatic Sort</Button>
                </Box>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mr: "-2px" }} />
              <Grid container item xs={4} direction="column" >
                <Typography variant="h6">Members</Typography>
                <Typography>{currentGroup && `Group ${currentGroup.groupNumber}`}</Typography>
                <Box style={{ maxHeight: 250, overflow: 'auto', minHeight: 250 }}>
                  {groupMembers && groupMembers.map((member, index) => (
                    <ListItem style={{ padding: "5px", marginLeft: "5px", alignItems: "center", maxWidth: 390 }} selected={index === currentIndex} onClick={() => this.setCurrentMember(member)} divider button key={index}>
                      {member && member.username}
                    </ListItem>
                  ))}
                </Box>
                <Divider variant="middle" sx={{ borderBottomWidth: 4 }} />

                <Button className="button" onClick={() => { this.removeStudentGroup() }}>Remove student from Group</Button>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
              <Grid container item xs={3} direction="column" >
                <Typography variant="h6">Student Info</Typography>
                <Box style={{ maxHeight: 100, overflow: 'auto', minHeight: 100, maxWidth: 405, minWidth: 405, }}>
                  <div className="box">
                    <ListItem>
                      {currentStudent && ("Name: " + currentStudent.username)}
                    </ListItem>
                    <ListItem>
                      {currentStudent && ("Proficient Subject Topics: " + currentStudent.subjectTopics)}
                    </ListItem>
                  </div>
                </Box>
                <Divider variant="middle" margin="5" padding="4px" />
                <Button className="button" onClick={() => { this.addStudentGroup() }}>Add to Group</Button>
                <Divider variant="middle" margin="5" padding="4px" />
                <Typography variant="h6">Ungrouped Students</Typography>
                <Box style={{ maxHeight: 160, overflow: 'auto', minHeight: 160, maxWidth: 405 }}>
                  <Divider variant="middle" sx={{ borderBottomWidth: 4 }} />
                  {studentList && studentList.map((student, index) => (
                    <ListItem style={{ padding: "5px" }} selected={index === currentIndex} onClick={() => this.setCurrentStudent(student)} divider button key={index}>
                      {student.username}
                    </ListItem>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Backing>
      </Box>
    )
  };
}

export default TutorialPage;