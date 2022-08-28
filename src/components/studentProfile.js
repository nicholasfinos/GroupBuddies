import React from "react";
import "./studentProfile.css";
import Form from "react-validation/build/form";

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    // this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);

    this.state = {
      studentName: "",
      preferredName: '',
      year: 'yr1',
      degree: 'deg1',
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({studentName: name});
  }

  // onChangeGroupAssessment(e) {
  //   this.setState({groupAssessment: e.target.value});
  // }

  newSubject = ()  => {
    this.setState = ({
      studentName: "",
    });
    this.componentDidMount();
  };

  handlePreferredNameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handleYearChange = (event) => {
    this.setState({
      year: event.target.value
    })
  }

  handleDegreeChange = (event) => {
    this.setState({
      degree: event.target.value
    })
  }

  render() {

    // const { studentName } = this.state;

    return (
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <div className="big-container">
          <div className="container">
            <div className="title"> My Profile</div>
            <div className="content">
              <form action="#">
              <div className="user-details">
          <div class="input-box">
            <span className="details">Full Name</span>
            <p>{this.state.studentName}</p>
          </div>
          <div className="input-box">
            <span className="details">Preferred Name</span>
            <input type="text" placeholder= {this.state.studentName} required/>
          </div>
          <div class="input-box">
          <label className="details">Year:</label>
            <select className="info-card" value={this.state.year} onChange={this.handleYearChange}>
              <option value="yr1">Yr 1</option>
              <option value="yr2">Yr 2</option>
              <option value="yr3">Yr 3</option>
            </select>
          </div>  
          <div class="input-box">
          <label className="details">Degree:</label>
            <select className="info-card" value={this.state.degree} onChange={this.handleDegreeChange}>
              <option value="deg1">Software Engo</option>
              <option value="deg2">Finance</option>
              <option value="deg3">Philosophy</option>
            </select>
          </div>
          <div class="input-box" style={{marginLeft:"35%"}}>
            <label className="details" style={{marginRight:"30%"}}>Skills:</label>
            <div style={{textAlign:"left"}}>
            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" />Critical thinking and problem solving</label><br></br>
            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" />Teamwork and collaboration</label><br></br>
            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" />Professionalism and strong work ethic</label><br></br>
            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" />Oral and written communications skills</label><br></br>
            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" />Leadership</label><br></br>
            </div>  
          </div>
          
        </div>
        <div className="info-card" style={{background: "#fef1e5"}}>
          <input type="submit" value="Register"/>
        </div>
              </form>
            </div>
          </div> 
        </div>
      </Form>
    );
  };
}

export default StudentProfile;