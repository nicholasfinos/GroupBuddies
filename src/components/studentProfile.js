import React from "react";
import "./studentProfile.css";
import Form from "react-validation/build/form";
// import image from "../media/blank.webp";

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
    this.setState({ studentName: name });
  }

  // onChangeGroupAssessment(e) {
  //   this.setState({groupAssessment: e.target.value});
  // }

  newSubject = () => {
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
      year: event.target.value
    })
  }

  updateStudentProfile = () => { 
    // not sure how to actually link front and back end
    fetch('http://localhost:8080/api/student/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "student",
        year: this.state.year,
        course: this.state.course
      })
    })
  }

  render() {

    const { studentName } = this.state;

    return (
      <div style={{ textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman" }} className="form">
        <div className="big-container">
          <div className="container">
            <div className="title"> My Profile <i>{studentName}</i></div>
            <div className="content">
              <form onSubmit={this.updateStudentProfile}>
                <div class="user-details">
                  <div class="input-box">
                    <span class="details">Full Name</span>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div class="input-box">
                    <span class="details">Preferred Name</span>
                    <input type="text" placeholder="Enter your email" required />
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
                </div>
                <div class="button">
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default StudentProfile;