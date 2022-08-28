import React from "react";
import "./studentProfile.css";
import UserService from "../services/user.service"

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: "",
      preferredName: "",
      year: '1',
      course: 'Software Engineering',
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ studentName: name });
  }

  newSubject = () => {
    this.setState = ({
      studentName: "",
    });
    this.componentDidMount();
  };

  handleFullNameChange = (event) => {
    this.setState({
      studentName: event.target.value
    })
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

  updateStudentProfile = (event) => {
    event.preventDefault()

    let data = {
      username: "student",
      year: this.state.year,
      course: this.state.course,
      studentName: this.state.studentName,
      preferredName: this.state.preferredName
    }
    
    console.log(data);
    UserService.updateStudent(data);
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
                    <input type="text" placeholder="Enter your name" required onChange={this.handleFullNameChange} />
                  </div>
                  <div class="input-box">
                    <span class="details">Preferred Name</span>
                    <input type="text" placeholder="Enter your email" required onChange={this.handlePreferredNameChange} />
                  </div>
                  <div class="input-box">
                    <label className="details">Year:</label>
                    <select className="info-card" value={this.state.year} onChange={this.handleYearChange}>
                      <option value="1">Yr 1</option>
                      <option value="2">Yr 2</option>
                      <option value="3">Yr 3</option>
                    </select>
                  </div>
                  <div class="input-box">
                    <label className="details">Degree:</label>
                    <select className="info-card" value={this.state.course} onChange={this.handleCourseChange}>
                      <option value="Software Engineering">Software Engo</option>
                      <option value="Finance">Finance</option>
                      <option value="Philosophy">Philosophy</option>
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