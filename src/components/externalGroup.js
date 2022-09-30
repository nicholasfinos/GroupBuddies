import React, { useEffect, useState } from "react";
import userService from "../services/user-service";
import subjectService from "../services/subject-service";
import "./externalGroups.css";
import { ListItem } from "@material-ui/core";

const CreateGroupPopup = ({ currentStudent, studentSubjects }) => {
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");

  const createStudyGroup = () => {
    if (currentStudent && groupName !== "" && subject !== "") {
      const group = {
        owner: currentStudent,
        groupName: groupName,
        subject: subject
      }

      console.log(group);

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
  const [studentSubjects, setStudentSubjects] = useState([])

  useEffect(() => {
    const URL = window.location.href;
    const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

    userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);
        subjectService.viewAllSubjects(username)
          .then((x) => {
            setStudentSubjects(x.data);
          })
        // search for my study groups (append the two lists together)
      });
  }, []);

  const deleteCurrentGroup = () => {
    console.log("deleted current Group")
  }

  return (
    <div className="main">
      <div className="columnDiv">
        <h3>My Study Groups</h3>
        <div>
          <div>GROUP</div>
          <div>GROUP</div>
          <div>GROUP</div>
        </div>
      </div>
      <div className="columnDiv">
        <h3>Current Group</h3>
        <div>
          <div>CURRENT GROUP</div>
        </div>
      </div>
      <div className="columnDiv">
        <button onClick={() => deleteCurrentGroup()}>Delete Current Group</button>
        <button>Find Groups</button>
        <button onClick={() => setIsCreating(!isCreating)}>Create a Group</button>
        {(isCreating && (studentSubjects.length > 0)) && <CreateGroupPopup currentStudent={currentStudent.username} studentSubjects={studentSubjects} />}
      </div>
    </div>
  );
}

export default ExternalGroup;