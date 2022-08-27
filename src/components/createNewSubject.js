import React from "react";
import { Button } from "@material-ui/core";
import { Grid, ListItem } from "@material-ui/core"; 
import TutorDataService from "../services/tutor-service";
import SubjectDataService from "../services/subject-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class CreateSubject extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    this.onChangeTutorialNumbers = this.onChangeTutorialNumbers.bind(this);
    this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);
    this.onChangeSubjectTopics = this.onChangeSubjectTopics.bind(this);
    this.retrieveTutors = this.retrieveTutors.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);

    this.state = {
      subjectName: "",
      tutorialNumbers: "",
      groupAssessment: "",
      semester: "",
      subjectTopics: "",
      username: "",
      submitted: false,
      tutors: [],
      assignedTutor: "",
      currentItem: null,
      currentIndex: -1,
      addedtutors: [],
      message: ""
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({username: name});
    this.retrieveTutors();
  }

  onChangeGroupAssessment(e) {
    this.setState({ groupAssessment: e.target.value });
  }

  onChangeSemester(e) {
    this.setState({ semester: e.target.value });
  }

  onChangeSubjectName(e) {
    this.setState({ subjectName: e.target.value });
  }

  onChangeTutorialNumbers(e) {
    this.setState({ tutorialNumbers: e.target.value });
  }

  onChangeSubjectTopics(e) {
    this.setState({ subjectTopics: e.target.value });
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
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

  refreshList() {
    this.retrieveTutors();
    this.setState({
      currentTutor: null,
      currentIndex: -1
    });
  }

  saveSubject = () => {
    var data;
    data = {
      username: this.state?.username,
      subjectName: this.state?.subjectName,
      tutorialNumbers: this.state?.tutorialNumbers,
      groupAssessment: this.state?.groupAssessment,
      semester: this.state?.semester,
      subjectTopics: this.state?.subjectTopics,
      assignedTutor: this.state?.assignedTutors
    }
    console.log(data)

    SubjectDataService.findOne(data.subjectName)
      .then((response) => {
        console.log(response.data);
        if (response.data === null) {
          SubjectDataService.create(data, data.username)
            .then((response) => {
              this.setState({
                subjectName: response.data?.subjectName,
                tutorialNumbers: response.data?.tutorialNumbers,
                groupAssessment: response.data?.groupAssessment,
                semester: response.data?.semester,
                subjectTopics: response.data?.subjectTopics,
                submitted: true,
                assignedTutor: response.data?.assignedTutors
              });
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
        else {
          this.setState({message: "Duplicate subject"})
        }
      })


  }

  // Create new subject page
  newSubject = () => {
    this.setState({
      subjectName: "",
      tutorialNumbers: "",
      groupAssessment: "",
      semester: "",
      subjectTopics: "",
      username: "",
      submitted: false,
      tutors: [],
      assignedTutor: ""
    });
    this.componentDidMount();
  }

  addTutor(index) {
    //Create a tutor object
    const listTutor = this.state.tutors

    var data = {
      username: listTutor[index].username,
      email: listTutor[index].email,
      password: listTutor[index].password,
      name: listTutor[index].name,
    };

    //Push it to addedTutor list
    const list = this.state.addedtutors;
    list.push(data);

    //Save value
    this.setState({
      addedtutors: list,
      currentItem: null,
    });
  }

  deleteTutor(index) {
    //Pop the selected tutor
    const list = this.state.addedtutors;
    list.splice(index, 1);

    //Save Value
    this.setState({
      addedtutors: list,
      currentItem: null,
    });
  }

  render() {
    const { tutors, currentIndex, currentItem, addedtutors } = this.state; 
    return (
      <div style={{ textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman" }} className="form">
        <h3>Create a New Subject</h3>
        {this.state.submitted ? (
          <div>
            <p><i>You created a subject successfully!</i></p>
            <Button size="small" variant="contained" onClick={this.newSubject}>{" "}Create a Subject{" "}</Button>
          </div>
        ) : (
          <div className="card">
              <div className="form-group">
                <label htmlFor="subject-name">Subject Name: </label>
                  <input className="form-control" style={{maxWidth: '500px'}} type="text" name="subjectName" onChange={this.onChangeSubjectName} validations={[required]}/>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester: </label>
                  <input className="form-control" style={{maxWidth: '500px'}} type="text" name="semester" onChange={this.onChangeSemester} validations={[required]}/>
              </div>
                    
              <div className="form-group">
                <label style={{marginLeft: "220px"}} htmlFor="tutorial numbers">Number of Tutorials:</label>
                <select className="form-group border" style={{minWidth: "500px"}} onChange={this.onChangeTutorialNumbers} validations={[required]}>
                  <option value="" disabled selected>Select your option</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
                    
              <div className="form-group">
                <label style={{marginLeft: "220px"}} htmlFor="group-assessment">Group Assessment:</label>
                <select className="border" style={{minWidth: "500px"}} onChange={this.onChangeGroupAssessment} validations={[required]}>
                  <option value="" disabled selected>Select your option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              
              <div className="form-group">
                <label style={{marginLeft: "220px"}} htmlFor="subject-topics">Subject Topics:</label>
                <textarea className="border" style={{minWidth: "500px"}} id="topics" name="topics" rows="5" placeholder="Please seperate each topic with a comma..." onChange={this.onChangeSubjectTopics} validations={[required]}></textarea>
              </div>

              <div>
                <Grid container>
                  <Grid item md={4}>
                    <h4>Tutors</h4>
                    <div className="form-group">
                      {tutors && tutors.map((tutor, index) => (
                        <ListItem style={{ paddingP: "20px"}} selected={index === currentIndex} onClick={() => this.addTutor(index)} divider button key={index}>
                            {"Name: " + tutor?.username}                     
                        </ListItem>
                      ))}
                    </div>
                  </Grid>
                  <Grid item md={8}>
                    <h4>Assigned Tutors to Tutorial Class</h4>
                    <div className="form-group">
                      {addedtutors.map((addedTutor, index) => (
                        <ListItem style={{padding: "20px"}} selected={index === currentIndex} onClick={() => this.deleteTutor(index)} divider button key={index}>
                          {"Name: " + addedTutor?.username}
                        </ListItem>
                      ))}
                    </div>
                  </Grid> 
                </Grid>
              </div>          
          <Button size="small" variant="contained" onClick={this.saveSubject}>Submit</Button>
          <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  };
}

export default CreateSubject;