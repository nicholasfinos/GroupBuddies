import React from "react";
import "./studentProfile.css";
import UserService from "../services/user-service";

export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      preferredName: "",
      year: "",
      course: "",
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
  }

  handlePreferredNameChange = (event) => {
    this.setState({
      preferredName: event.target.value
    })
  }

  handleYearChange = (event) => {
    this.setState({
      year: event.target.value
    })
  }

  handleCourseChange = (event) => {
    this.setState({
      course: event.target.value
    })
  }

  updateStudentProfile = () => {
    let data = {
      username: this.state.username,
      year: this.state.year,
      course: this.state.course,
      preferredName: this.state.preferredName,
      studentName: this.state.username,
    }
    UserService.updateStudent(data);
  }

  onSubmit = () => {
    const username = this.state.username;
    this.updateStudentProfile();
    this.props.history.push("/account/" + username);
    window.location.reload();
  }

  render() {
    return (
      <div style={{ textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman" }} className="form">
        <div className="big-container">
          <div className="container">
            <div className="title"> My Profile</div>
            <div className="content">
              <form onSubmit={this.onSubmit}>
                <div class="user-details">
                  <div class="input-box">
                    <span class="details">Username</span>
                    <input type="text" disabled value={this.state.username}/>
                  </div>
                  <div class="input-box">
                    <span class="details">Preferred Name</span>
                    <input type="text" placeholder="Enter your preferred name" required onChange={this.handlePreferredNameChange} />
                  </div>
                  <div class="input-box">
                    <label className="details">Year:</label>
                    <select className="info-card" value={this.state.year} onChange={this.handleYearChange}>
                      <option value="" disabled selected>Select your option</option>
                      <option value="1">Year 1</option>
                      <option value="2">Year 2</option>
                      <option value="3">Year 3</option>
                      <option value="4">Year 4</option>
                      <option value="5">Year 5</option>
                      <option value="6">Year 6</option>
                    </select>
                  </div>
                  <div class="input-box">
                    <label className="details">Degree:</label>
                    <select className="info-card" value={this.state.course} onChange={this.handleCourseChange}>
                      <option value="" disabled selected>Select your option</option>
                      <option value="Software Engineering">Software Engo</option>
                      <option value="Finance">Finance</option>
                      <option value="Philosophy">Philosophy</option>
                    </select>
                  </div>
                </div>
                <div class="button" onSubmit={this.onSubmit}>
                  <input type="submit" value="Submit"/>
                </div>
              </form>
            </div>
          </div> 
        </div>
      </div>
    );
  };
}