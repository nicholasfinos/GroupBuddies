import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Grid, ListItem } from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import viewSubject from "../components/viewSubjects";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class EditSubject extends Component {
  constructor(props) {
    super(props);
    this.retrieveSubjects = this.retrieveSubjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    // this.setActiveSubject = this.setActiveSubject.bind(this);
    this.updateSubject = this.updateSubject.bind(this);
   
    this.state = {
      currentSubject: {
        id: null,
        tutorials: [],
        subjectName: "",
        semester: "",
        groupAssessment: "",
        subjectTopics: "",
        subjectCoordinator: "",
        tutors: [],
        addedtutors: [],
      },
      message: "",
      subjects: [],
      currentItem: null,
      currentIndex: -1
      }
  }

  componentDidMount() {
    // this.retrieveSubjects();
    this.getSubject();
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

  getSubject() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    SubjectDataService.view(username)
      .then((response) => {
        this.setState({
          currentSubject: response.data,
        });
        console.log(response.data);
        })
      .catch((e) => {
        console.log(e);
      }
    );
  }

  // setActiveSubject(subject, index) {
  //   if (subject.groupAssessment === true) {
  //     this.setState({
  //       currentSubject: subject,
  //       groupAssessment: "Yes",
  //       currentIndex: index
  //     });
  //   }
  //   else {
  //     this.setState({
  //       currentSubject: subject,
  //       groupAssessment: "No",
  //       currentIndex: index
  //     });
  //   }

  //   if (subject.subjectTopics.size !== 0) {
  //     var str = "";

  //     for (let i = 0; i < subject.subjectTopics.length; i++) {
  //       str += subject.subjectTopics[i] + ",";
  //     }

  //     this.setState({ subjectTopics: str });
  //   }

  //   TutorDataService.getTutor(subject.subjectCoordinator)
  //     .then((response) => {
  //       this.setState({ subjectCoordinator: response.data.username });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })

  //   SubjectDataService.findTutorial(subject.subjectName)
  //     .then((response) => {
  //       this.setState({ tutorials: response.data });
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // }

  setActiveTutorial(tutorial, index) {
    TutorDataService.getTutor(tutorial.tutor)
      .then((response) => {
        this.setState({ tutor: response.data.username });
      })
      .catch((e) => {
        console.log(e);
      })

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  onChangeGroupAssessment(e) {
    this.setState({ groupAssessment: e.target.value, message: "" });
  }

  onChangeSemester(e) {
    this.setState({ semester: e.target.value, message: "" });
  }

  onChangeSubjectName(e) {
    this.setState({ subjectName: e.target.value, message: "" });
  }

  onChangeTutorialNumbers(e) {
    this.setState({ tutorialNumbers: e.target.value, message: "" });
  }

  onChangeSubjectTopics(e) {
    this.setState({ subjectTopics: e.target.value, message: "" });
  }

  onChangeTimeSlot(e) {
    this.setState({ timeSlot: e.target.value, message: "" });
  }

  onChangeDay(e) {
    this.setState({ day: e.target.value, message: "" });
  }

  retrieveTutors() {
    TutorDataService.view()
      .then(response => {
        this.setState({
          tutors: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // refreshList() {
  //   this.retrieveTutors();
  //   this.setState({
  //     currentTutor: null,
  //     currentIndex: -1
  //   });
  // }

  setActiveAddItem(tutor, index) {
    this.setState({
      currentTutor: tutor,
      currentIndex: index,
      timeSlot: "",
      day: ""
    });
  }

  addTutor(tutor, tutorTimeSlot, tutorDay) {
    if(tutorTimeSlot.length !== 0 || tutorDay.length !== 0) {
      var data = {
        username: tutor.username,
        email: tutor.email,
        password: tutor.password,
        timeSlot: tutorTimeSlot,
        day: tutorDay
      };
  
      //Push it to addedTutor list
      const list = this.state.addedtutors;
      list.push(data);
  
      //Save value
      this.setState({
        addedtutors: list,
        currentTutor: null,
        message: ""
      });
    }
    else {
      this.setState({ message: "Please fill Time Slot and Day before adding Tutorial"})
    }
  }

  updateSubject() {
    // something
  }

  render() {
    const { currentSubject } = this.state;

    return (
      <div>
        {currentSubject ? (
          <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
            <h3>{this.state.currentSubject.subjectName}</h3>
            <form>
              <div>
                <label htmlFor="username">Subject Name</label>
                <Input style={{fontFamily: "Times New Roman"}} type="text" className="form-control" name="subject-name" value={currentSubject?.subjectName} disabled />
              </div>
              <div>
                <label htmlFor="semester">Semester</label>
                <Input style={{fontFamily: "Times New Roman"}} type="text" className="form-control" name="semester" value={currentSubject?.semester} disabled />
              </div>
              {/* <div>
                <Grid container>
                  <Grid item md={4}>
                    <h4>Menu</h4>
                    <div className="list-group">
                      {menus &&
                        menus.map((menu, index) => (
                          <ListItem style={{ padding: "20px" }} selected={index === currentIndex} onClick={() => this.setActiveAddItem(menu, index)} divider button key={index}>
                            {" "}{menu.name}, ${menu.price}{" "}
                          </ListItem>
                        ))}
                    </div>
                  </Grid>
                  <Grid item md={4}>
                    {currentItem ? (
                      <div>
                        <h4>Item Selected</h4>
                        <div>
                          <label><strong>Name:</strong></label>{" "}
                          {currentItem.name}
                        </div>
                        <div>
                          <label htmlFor="quantity">Quantity</label>
                          <Input aria-label="quantity" role="textbox" type="number" className="form-control" name="quantity" value={this.state.quantity} onChange={this.onChangeQuantity} required />
                          {this.state.verQuantity ? (
                            <div className="alert alert-danger" role="alert">Please enter numbers only.</div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <br />
                        <Button
                          style={{ backgroundColor: "#d3d3af", borderColor: "#d3d3af", WebkitTextFillColor: "white" }} size="small" variant="contained" onClick={() => this.addItem(currentItem, this.state.quantity)}>
                          Add Item
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item md={4}>
                    <h4>Added Items</h4>
                    <div className="list-group">
                      {currentBooking.meals.map((meal, index) => (
                        <ListItem style={{ padding: "20px" }} selected={index === currentIndex} onClick={() => this.deleteItem(index)} divider button key={index}>
                          {" "}{meal.name}, qty:{meal.quantity}, ${meal.price}{" "}
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div> */}
              <br />
              <div style={{ display: "inline-block" }}>
                <Link style={{ WebkitTextFillColor: "black" }} to={"/subject/" + currentSubject.username}>
                  Go Back?
                </Link>
                <Switch>
                  <Route exact path={"/subject/" + currentSubject.username} component={viewSubject} />
                </Switch>
              </div>
            </form>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Subject...</p>
          </div>
        )}
      </div>
    );
  }
}

export default EditSubject