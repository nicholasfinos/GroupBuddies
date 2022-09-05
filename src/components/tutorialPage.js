import React, { useState } from "react";
import "./tutorialPage.css";
import { ListItem } from "@material-ui/core";

const TutorialPage = () => {
  const [studentList, setStudentList] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  return (
    <div className="main">
      <div className="column">
        <label>Groups</label>
        <div className="box">
          <ListItem>
            {"Name"}
          </ListItem></div>
        <button className="button">Add Group</button>
        <button className="button">Remove Group</button>
        <button className="button">Automatic Sort</button>
      </div>
      <div className="column">
        <label>Members</label>
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
            {"Name"}
          </ListItem>
        </div>
        <button className="button">Add to Group</button>
      </div>
      <div className="column">
        <label>Students</label>
        <div className="box">
          <ListItem>
            {"Name"}
          </ListItem>
        </div>
      </div>
    </div>
  );
}

export default TutorialPage;