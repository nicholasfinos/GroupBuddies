import React, { useEffect, useState } from "react";
import "./tutorialPage.css";
import { ListItem } from "@material-ui/core";
import tutorialService from "../services/tutorial-service";
import enrollmentService from "../services/enrollment-service";

const TutorialPage = () => {
  const [tutorial, setTutorial] = useState();
  const [studentList, setStudentList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [currentStudent, setCurrentStudent] = useState();
  const [currentGroup, setCurrentGroup] = useState();

  useEffect(() => {
    // tutorialService.getTutorial()
    //   .then(data => {
    //     setTutorial(data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    enrollmentService.getTutorialEnrollments()
      .then(data => {
        setStudentList(data.data);
      });

    // tutorialService.getGroups()
    //   .then(data => {
    //     setGroupList(data.data);
    //   })

  }, []);

  const addGroup = () => {
    console.log("added!!!");
    // need to either hard code the schema or get the group one here 
  }

  const removeGroup = () => {
    console.log("removed!!!");
    // get the group list
    // send all students to the student list (if there are any)
    // create a new list without that group and replace the old -> send to database
  }

  const autoSort = () => {
    console.log("AutoSorted!!!");
  }

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
            {/* {groupList && groupList.map((group, index) => (
              <ListItem key={index} onClick={() => { setCurrentGroup(group) }}>
                {"Group " + group.groupNumber}
              </ListItem>
            ))} */}
          </div>
          <button className="button" onClick={() => { addGroup() }}>Add Group</button>
          <button className="button" onClick={() => { removeGroup() }}>Remove Group</button>
          <button className="button" onClick={() => { autoSort() }}>Automatic Sort</button>
        </div>
        <div className="column">
          <label>Members</label>
          <div className="box">
            {/* {currentGroup && currentGroup.groupMembers.map((member, index) => (
              <ListItem key={index} onClick={() => { setCurrentStudent(member) }}>
                {member.username}
              </ListItem>
            ))} */}
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
              {currentStudent && "Name: " + currentStudent.username}
            </ListItem>
          </div>
          <button className="button">Add to Group</button>
        </div>
        <div className="column">
          <label>Students</label>
          <div className="box">
            {studentList && studentList.map((student, index) => (
              <ListItem onClick={() => { setCurrentStudent(student) }}>
                {student.username}
              </ListItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;