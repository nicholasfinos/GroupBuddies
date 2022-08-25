import React from "react";
import { Button } from "@material-ui/core";
import SubjectDataService from "../services/subject-service";

class CreateSubject extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    this.onChangeTutorialNumbers = this.onChangeTutorialNumbers.bind(this);
    this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);
    this.onChangeSubjectTopics = this.onChangeSubjectTopics.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    
    this.state = {
      subjectName: "",
      tutorialNumbers: "",
      groupAssessment: "",
      semester: "",
      subjectTopics: "",
      username: ""
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({username: name});
  }

  onChangeGroupAssessment(e) {
    //Get List Size, compare with number tutorial 
    this.setState({groupAssessment: e.target.value});
  }
  
  onChangeSemester(e) {
    this.setState({semester: e.target.value});
  }

  onChangeSubjectName(e) {
    this.setState({subjectName: e.target.value});
  }

  onChangeTutorialNumbers(e) {
    this.setState({tutorialNumbers: e.target.value});
  }

  onChangeSubjectTopics(e) {
    this.setState({subjectTopics: e.target.value});
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
    }
    console.log(data)

    SubjectDataService.create(data, data.username)
      .then((response) => {
        this.setState({
          subjectName: response.data?.subjectName,
          tutorialNumbers: response.data?.tutorialNumbers,
          groupAssessment: response.data?.groupAssessment,
          semester: response.data?.semester,
          subjectTopics: response.data?.subjectTopics
        });
        console.log(response.data);        
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <div style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <h3 style={{color: "light grey"}}>Create a New Subject</h3>
          <div className="card">
            <div className="form-group">
              <label htmlFor="subject-name">Subject Name: </label>
                <input className="form-control" style={{minWidth: '500px'}} type="text" name="subjectName" onChange={this.onChangeSubjectName}/>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester: </label>
                <input className="form-control" style={{minWidth: '500px'}} type="text" name="semester" onChange={this.onChangeSemester}/>
            </div>
                  
            <div className="form-group">
              <label style={{marginLeft: "220px"}} htmlFor="tutorial numbers">Number of Tutorials:</label>
              <select className="form-group border" style={{minWidth: "500px"}} onChange={this.onChangeTutorialNumbers}>
                <option value="" disabled defaultValue={"Select your option"}></option>
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
              <select className="border" style={{minWidth: "500px"}} onChange={this.onChangeGroupAssessment}>
                <option value="" disabled defaultValue={"Select your option"}></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
                  
            {/* subject topics */}
            <div className="form-group">
              <label style={{marginLeft: "220px"}} htmlFor="subject-topics">Subject Topics:</label>
              <textarea className="border" style={{minWidth: "500px"}} id="topics" name="topics" rows="5" placeholder="Please seperate each topic with a comma..." onChange={this.onChangeSubjectTopics}></textarea>
            </div>

            {/* assign tutors */}
            <div className="form-group">
              <label style={{marginLeft: "220px"}} htmlFor="subject-topics">Assign Tutors:</label>
              <div id="checkboxes" style={{minWidth: "500px"}} >
                {/* to be made dynamic with list of tutor names*/}
                <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" id="one" value="John Doe"/>John Doe</label>
              </div>
            </div>    
      
        </div>
        <Button size="small" variant="contained" onClick={this.saveSubject}>Submit</Button>
      </div>
    );
  };
}

export default CreateSubject;