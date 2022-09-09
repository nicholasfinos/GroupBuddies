import React from "react";
import { ListItem } from "@material-ui/core";
import TutorialDataService from "../services/tutorial-service";
import GroupDataService from "../services/tutorial-service";
import StudentProfileDataServcie from "../services/studentProfile-service";

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
    

    this.state = {
      studentList: [],
      groupList: [],
      currentStudent: null,
      currentGroup: null,
      groupMembers: [],
      tutorial: null,
      tutor: null,
    }
  };

  componentDidMount() {
    const URL = String(this.props.match.path);
    const tutorialID = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    TutorialDataService.getTutorial(tutorialID)
      .then(response => {
        this.setState({
          tutorial: response.data,
          tutor: response.data.tutor
        });
      })
      .catch(e => {
        console.log(e);
      });

      this.retrieveListStduents();
      this.retrieveListGroups();
  }

  retrieveListStduents() {
    TutorialDataService.getUnselectedStudent(this.state.tutorial)
      .then(response => {
        this.setState({
          studentList: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveListGroups() {
    TutorialDataService.listGroups(this.state.tutorial)
      .then(response => {
        this.setState({
          groupList: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setCurrentGroup(group) {
    this.setState({
      currentGroup: group
    });

    GroupDataService.viewStudent(group)
    .then(response => {
      this.setState({
        groupMembers: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  setCurrentStudent(member) {
    StudentProfileDataServcie.getStudent(member)
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
    TutorialDataService.addGroup(this.state.tutorial)
    .then(response => {
      this.setCurrentGroup(response.data);
      this.retrieveListGroups();
    })
    .catch(e => {
      console.log(e);
    });
  }

  removeGroup() {
    TutorialDataService.removeGroup(this.state.currentGroup)
    .then(response => {
      this.setState({
        currentGroup: null,
        currentStudent: null
      })

      this.retrieveListStduents();
      this.retrieveListGroups();
    })
    .catch(e => {
      console.log(e);
    });
  }

  autoSort() {
    console.log("AutoSorted!!!");
  }

  render() {
    const {studentList, groupList, currentStudent, currentGroup, groupMembers} = this.state;
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
                <ListItem key={index} onClick={() => { this.setCurrentGroup(group) }}>
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
                <ListItem key={index} onClick={() => { this.setCurrentStudent(member) }}>
                  {member.username}
                </ListItem>
              ))}
            </div>
            <button className="button">Remove from Group</button>
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
            <button className="button">Add to Group</button>
          </div>
          <div className="column">
            <label>Students</label>
            <div className="box">
              {studentList && studentList.map((student, index) => (
                <ListItem onClick={() => { this.setCurrentStudent(student) }}>
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