import React from "react";
import { ListItem } from "@material-ui/core";
import TutorDataService from "../services/tutor-service";
import StudentProfileDataServcie from "../services/studentProfile-service";
import SubjectDataService from "../services/subject-service";
import viewTutorial from "../components/viewTutorial";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class TutorialPage extends React.Component {
  constructor(props) {
    super(props);

    this.retriveTutorial = this.retriveTutorial.bind(this);
    this.onChangeGroupSize = this.onChangeGroupSize.bind(this);


    this.state = {
      studentList: [],
      groupList: [],
      currentStudent: null,
      currentGroup: null,
      groupMembers: [],
      tutorial: null,
      currentIndex: null,
      groupSize: null
    };
  }

  componentDidMount() {
    const URL = String(this.props.location.pathname);
    const id = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));

    this.retriveTutorial(id);
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.groupList !== prevState.groupList) {
      this.setState({ groupList: this.state.groupList });
    }
  }

  retriveTutorial(id) {
    TutorDataService.getTutorial(id)
      .then(response => {
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
    StudentProfileDataServcie.getProfile(member.id)
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

        window.location.reload(false);
        // this.setCurrentGroup(response.data.groups[response.data.groups.length - 1]);
      })
      .catch(e => {
        console.log(e);
      });
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
          //How do you refresh page
          console.log(response);
          this.setState({
            groupList: response.data.groups,
            tutorial: response.data,
            currentGroup: null
          })

          window.location.reload(false);
          // this.setCurrentGroup(response.data.groups[response.data.groups.length - 1]);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  removeStudentGroup() {
    if (this.state.currentStudent !== null && this.state.currentGroup) {
      var data = {
        student: this.state.currentStudent,
        group: this.state.currentGroup,
        tutorial: this.state.tutorial
      }

      console.log(data);

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
    this.setState({ groupSize: e.target.value});
  }

  autoSort() {
    SubjectDataService.findSubjectByName(this.state.tutorial.subjectName)
    .then(response => {
      var data = {
        studentList: this.state.studentList,
        tutorial: this.state.tutorial,
        groupSize: this.state.groupSize,
        subject: response.data[0]
      }
      TutorDataService.autoSort(this.state.tutorial.id, data)
        .then(response => {
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch(e => {
      console.log(e);
    });
  }

  render() {
    const { studentList, groupList, currentStudent, currentGroup, groupMembers, currentIndex } = this.state;
    return (
      <div className="layout">
        <div className="header">
          <label style={{ margin: "0px", fontSize: "36px" }}>Tutorial 1</label>
          <button className="button" style={{ width: "100px", marginTop: "0px" }}>Return</button>
        </div>
        <div className="main">
          <div className="column">
            <label>Groups</label>
            <div className="box">
              {groupList && groupList.map((group, index) => (
                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "200px" }} selected={index === currentIndex} onClick={() => this.setCurrentGroup(group)} divider button key={index}>
                  {"Group " + group.groupNumber}
                </ListItem>
              ))}
            </div>
            <button className="button" onClick={() => { this.addGroup() }}>Add Group</button>
            <button className="button" onClick={() => { this.removeGroup() }}>Remove Group</button>
            <div>
              <label htmlFor="groupSize" >Group Size: </label>
              <input className="form-control" style={{ maxWidth: '500px' }} type="text" name="groupSize" onChange={this.onChangeGroupSize} />
            </div>
            <button className="button" onClick={() => { this.autoSort() }}>Automatic Sort</button>
          </div>
          <div className="column">
            <label>Members</label>
            <div>{currentGroup && `Group ${currentGroup.groupNumber}`}</div>
            <div className="box">
              {groupMembers && groupMembers.map((member, index) => (
                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "200px" }} selected={index === currentIndex} onClick={() => this.setCurrentMember(member)} divider button key={index}>
                  {member && member.username}
                </ListItem>
              ))}
            </div>
            <button className="button" onClick={() => { this.removeStudentGroup() }}>Remove from Group</button>
            <label>Topics</label>
            <div className="box">
              <ListItem>
                {"Name"}
              </ListItem>
              <ListItem>
                {"Name"}
              </ListItem>
              <ListItem>
                {"Name"}
              </ListItem>
            </div>
          </div>
          <div className="column">
            <label>Student Info</label>
            <div className="box">
              <ListItem>
                {currentStudent && ("Name: " + currentStudent.username, "Subject Topics: " + currentStudent.subjectTopics)}
              </ListItem>
            </div>
            <button className="button" onClick={() => { this.addStudentGroup() }}>Add to Group</button>
          </div>
          <div className="column">
            <label>Students</label>
            <div className="box">
              {studentList && studentList.map((student, index) => (
                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "200px" }} selected={index === currentIndex} onClick={() => this.setCurrentStudent(student)} divider button key={index}>
                  {student.username}
                </ListItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  };
}

export default TutorialPage;