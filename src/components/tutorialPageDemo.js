import React from "react";
import { ListItem } from "@material-ui/core";
import TutorDataService from "../services/tutor-service";
import StudentProfileDataServcie from "../services/studentProfile-service";
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

    this.retrieveListStduents = this.retrieveListStduents.bind(this);
    this.retrieveListGroups = this.retrieveListGroups.bind(this);
    this.retriveTutorial = this.retriveTutorial.bind(this);
    this.retriveTutor = this.retriveTutor.bind(this);


    this.state = {
      studentList: [],
      groupList: [],
      currentStudent: null,
      currentGroup: null,
      groupMembers: [],
      tutorial: null,
      tutor: null,
      currentIndex: null
    };
  }

  componentDidMount() {
    const URL = String(this.props.location.pathname);
    const id = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));

    const URL2 = String(this.props.match.path).slice(0, -1);;
    const username = String(URL.substring(URL2.lastIndexOf("/") + 1, URL2.length));

    this.retriveTutorial(id, username);
  }

  retriveTutorial(id, username) {
    TutorDataService.getTutorial(id)
      .then(response => {
        this.setState({
          tutorial: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });

    this.retriveTutor(id, username);
  }

  retriveTutor(id, username) {
    TutorDataService.getTutor(username)
      .then(response => {
        this.setState({
          tutor: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });

    this.retrieveListStduents(id);
  }

  retrieveListStduents(id) {
    TutorDataService.getUnListedStudent(id)
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          StudentProfileDataServcie.getProfile(response.data[i])
            .then(y => {
              this.state.studentList.push(y.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log(e);
      });

    this.retrieveListGroups(id);
  }

  retrieveListGroups(id) {
    TutorDataService.getlistGroups(id)
      .then(response => {
        if (response.data.length !== 0) {
          for (let i = 0; i < response.data.length; i++) {
            TutorDataService.getGroup(response.data[i])
              .then(x => {
                this.state.groupList.push(x.data);
              })
              .catch(e => {
                console.log(e);
              });
          }
          console.log(this.state);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  setCurrentGroup(group) {
    TutorDataService.getGroup(group.id)
      .then(response => {
        this.setState({
          currentGroup: response.data
        });
        for (let i = 0; i < response.data.students.length; i++) {
          StudentProfileDataServcie.getProfile(response.data.students[i])
            .then(response => {
              this.state.groupMembers.push(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
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
        //How do you refresh page
        this.setCurrentGroup(response.data);
        this.retrieveListGroups(this.state.tutorial.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addStudentGroup() {
    if (this.state.currentStudent !== null && this.state.currentGroup) {
      var data = {
        student: this.state.currentStudent,
        group: this.state.currentGroup
      }

      TutorDataService.addStudentGroup(data)
        .then(response => {
          this.setCurrentGroup(this.state.currentGroup);
          this.retrieveListStduents(this.state.tutorial.id);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  removeGroup() {
    if (this.state.currentGroup !== null) {
      TutorDataService.removeGroup(this.state.currentGroup)
        .then(response => {
          this.setState({
            currentGroup: null,
            currentStudent: null
          })

          this.retrieveListStduents(this.state.tutorial.id);
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
        group: this.state.currentGroup
      }

      TutorDataService.removeStudentGroup(data)
        .then(response => {
          this.setCurrentGroup(this.state.currentGroup);
          this.retrieveListStduents(this.state.tutorial.id);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  autoSort() {
    var data = {
      studentList: this.state.studentList
    }
    TutorDataService.autoSort(this.state.tutorial.id, data)
        .then(response => {
          this.retrieveListStduents(this.state.tutorial.id);
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
            <button className="button" onClick={() => { this.autoSort() }}>Automatic Sort</button>
          </div>
          <div className="column">
            <label>Members</label>
            <div className="box">
              {groupMembers && groupMembers.map((member, index) => (
                <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "200px" }} selected={index === currentIndex} onClick={() => this.setCurrentStudent(member)} divider button key={index}>
                  {member.username}
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
                {currentStudent && ("Name: " + currentStudent.username)}
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