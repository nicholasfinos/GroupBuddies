import { ListItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import userService from "../services/user-service";
import subjectService from "../services/subject-service";
import "./findExternalGroups.css";

const FindExternalGroups = () => {
  const [currentStudent, setCurrentStudent] = useState();
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState();
  const [availableGroups, setAvailableGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();

  useEffect(async () => { // Get the student
    const URL = window.location.href;
    const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

    await userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);

        subjectService.viewAllSubjects(data.data[0].username)
          .then((data) => {
            setSubjects(data.data);
          })
      });
  }, []);

  const getSubjectGroups = (subject) => {
    if (currentSubject !== subject) {
      setCurrentSubject(subject);

      subjectService.getAllStudyGroups(subject, currentStudent.studentName)
        .then((data) => {
          setAvailableGroups(data.data.data);
        });
    }
  }

  const joinStudyGroup = () => {
    const data = {
      groupId: currentGroup._id,
      currentStudent: currentStudent.studentName
    }

    userService.joinStudyGroup(data);
  }

  return (
    <div className="main">
      <div className="columnDiv">
        <label>Your Subjects</label>
        {subjects.map((subject, index) => (
          <ListItem onClick={() => getSubjectGroups(subject)} key={index}>
            {subject}
          </ListItem>
        ))}
      </div>
      <div className="columnDiv">
        <label>{currentSubject}</label>
        {(availableGroups.length > 0) && availableGroups.map((group, index) => (
          <ListItem onClick={() => setCurrentGroup(group)} key={index}>
            {group.name}
          </ListItem>
        ))}
      </div>
      <div className="columnDiv">
        {currentGroup &&
          <>
            <label>{currentGroup.name}</label>
            <p>{currentGroup.ownerName}</p>
            {currentGroup.members.map((member, index) => (
              <ListItem key={index}>
                {member}
              </ListItem>
            ))}
            <button onClick={() => joinStudyGroup()}>Join Group</button>
          </>
        }
      </div>
    </div>
  )
}

export default FindExternalGroups;