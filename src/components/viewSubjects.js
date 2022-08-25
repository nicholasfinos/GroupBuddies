import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import { Grid, ListItem } from "@material-ui/core";

class SubjectList extends Component {
  constructor(props) {
    super(props);
    this.retrieveSubjects = this.retrieveSubjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSubject = this.setActiveSubject.bind(this);

    this.state = {
      subjects: [],
      currentSubject: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveSubjects();
  }

  retrieveSubjects() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    SubjectDataService.view(username)
      .then(response => {
        this.setState({
          subjects: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }
      );
  }

  refreshList() {
    this.retrieveSubjects();
    this.setState({
      currentSubject: null,
      currentIndex: -1
    });
  }

  setActiveSubject(subject, index) {
    this.setState({
      currentSubject: subject,
      currentIndex: index
    });
  }

  render() {
    const { subjects, currentSubject, currentIndex } = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        <hr className="new5"></hr>
        <h3>Subjects</h3>
        <Grid container>
          <Grid item md={4}>
            <h2>Subject List</h2>
            <div className="list-group">
              {subjects && subjects.map((subject, index) => (
                <ListItem selected={index === currentIndex} onClick={() => this.setActiveSubject(subject, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + subject?.subjectName} </ListItem>
              ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentSubject ? (
              <div className="beige-border" style={{ "marginLeft": "200px" }}>
                <br />
                <div id="toPrint">
                  <h2>Subject</h2>
                  <div>
                    <label><strong>Subject Coordinator:</strong></label>{" "}{currentSubject.subjectCoordinator}
                  </div>
                  <div>
                    <label><strong>Subject Name:</strong></label>{" "}{currentSubject.subjectName}
                  </div>
                  <div>
                    <label><strong>Number of Tutorials:</strong></label>{" "}{currentSubject.numberTutorals}
                  </div>
                  <div>
                    <label><strong>Semester:</strong></label>{" "}{currentSubject.semester}
                  </div>
                  <div>
                    <label><strong>Group Assessment:</strong></label>{" "}{currentSubject.groupAssessment}
                  </div>
                  <div>
                    <label><strong>Subject Topics:</strong></label>{" "}{currentSubject.subjectTopics}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                <br />
                <p style={{ marginLeft: "100px" }}><i>Please click on a Subject...</i></p>
                <div style={{ float: "left", width: "100%" }}>
                  {/* <img src={Reserved} style={{ verticalAlign: "center", paddingLeft: 100, width: "500px", height: "300px" }} id="vibes" alt="" /> */}
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SubjectList