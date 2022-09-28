import React, { useEffect, useState } from "react";
import userService from "../services/user-service";
import "./externalGroups.css";

const CreateGroupPopup = ({ currentStudent }) => {
  const data = {
    owner: currentStudent,
    groupName: "",
    subject: ""
  }

  const createStudyGroup = () => {
    console.log(data);
    userService.createStudyGroup(data).then(
      console.log("Study Group Created")
    ).catch(error => {
      console.log(error);
    });
  }

  return (
    <div className="columnDiv">
      <label>Name</label>
      <label>Subject</label>
      <button onClick={createStudyGroup}>Create Group</button>
    </div>
  );
}

const ExternalGroup = () => {
  const [currentStudent, setCurrentStudent] = useState();
  const [currentGroup, setCurrentGroup] = useState();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const URL = window.location.href;
    const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

    userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);
        // search study groups
      });
  }, []);

  return (
    <>
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
          <button>Find Groups</button>
          <button onClick={() => setIsCreating(!isCreating)}>Create a Group</button>
          {isCreating && <CreateGroupPopup currentStudent={currentStudent.username} />}
        </div>
      </div>
    </>
  );
}

export default ExternalGroup;