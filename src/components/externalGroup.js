import React, { useEffect, useState } from "react";
import userService from "../services/user-service";
import subjectService from "../services/subject-service";
import "./externalGroups.css";
import { ListItem } from "@material-ui/core";

const CreateGroupPopup = ({ currentStudent }) => {
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [studentSubjects, setStudentSubjects] = useState([])

  useEffect(() => {
    subjectService.viewAllSubjects(currentStudent)
      .then((x) => {
        setStudentSubjects(x.data);
      })
  }, [])

  const createStudyGroup = () => {
    if (currentStudent && groupName !== "" && subject !== "") {
      const group = {
        owner: currentStudent,
        groupName: groupName,
        subject: subject
      }

      userService.createStudyGroup(group).then(() => {
        console.log("Study Group Created")
      }).catch(error => {
        console.log(error);
      });
    }
  }

  return (
    <div className="columnDiv" style={{ width: "100%" }}>
      <div>
        <label>Name</label>
        <input type="text" onChange={(e) => setGroupName(e.target.value)} />
      </div>
      <div>
        <label>Subjects</label>
        {studentSubjects.map((item, index) => (
          <ListItem
            onClick={() => setSubject(item)}
            style={{ padding: "0px" }}
            key={index}
            selected={subject === item}
          >
            {item}
          </ListItem>
        ))}
      </div>
      <button onClick={() => createStudyGroup()}>Create Group</button>
    </div>
  );
}

const ExternalGroup = () => {
  const [currentStudent, setCurrentStudent] = useState();
  const [studyGroups, setStudyGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => { // Get the student
    const URL = window.location.href;
    const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

    userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);
      });
  }, []);

  useEffect(() => { // get the student's groups once their id has loaded
    if (currentStudent) {
      userService.getStudyGroups(currentStudent._id)
        .then((data) => {
          console.log(data.data.data);
          setStudyGroups(data.data.data);
        })
    }
  }, [currentStudent])

  const getCurrentGroup = () => {
    console.log("Got current Group");
  }

  const deleteCurrentGroup = () => {
    console.log("deleted current Group")
  }

  return (
    <div className="main">
      <div className="columnDiv">
        <h3>My Study Groups</h3>
        <div>
          {studyGroups.map((item, index) => (
            <ListItem onClick={() => { setCurrentGroup(item) }}>{item.name}</ListItem>
          ))}
        </div>
      </div>
      <div className="columnDiv">
        <h3>Current Group</h3>
        <div>
          {currentGroup &&
            <ListItem>{currentGroup.owner}</ListItem>
          }
        </div>
      </div>
      <div className="columnDiv">
        <button onClick={() => deleteCurrentGroup()}>Delete Current Group</button>
        <button>Find Groups</button>
        <button onClick={() => setIsCreating(!isCreating)}>Create a Group</button>
        {(isCreating) &&
          <CreateGroupPopup currentStudent={currentStudent.username} />
        }
      </div>
    </div>
  );
}

export default ExternalGroup;