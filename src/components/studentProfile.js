import React from "react";

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
      year: event.target.value
    })
  }

  render() {

    const { studentName } = this.state;

    return (
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <h3 style={{color: "light grey"}}>My Profile <i>{studentName}</i></h3>

        <form>
          <div>
            <label>Name:</label>
            <p> {this.state.studentName}</p>
          </div>
          <div>
            <label>Preferred Name:</label>
            <input type='text' value={this.state.preferredName} onChange={this.handlePreferredNameChange}/>
          </div>
          <div>
            <label>Year:</label>
            <select value={this.state.year} onChange={this.handleYearChange}>
              <option value="yr1">Yr 1</option>
              <option value="yr2">Yr 2</option>
              <option value="yr3">Yr 3</option>
            </select>
          </div>
          <div>
            <label>Degree:</label>
            <select value={this.state.year} onChange={this.handleDegreeChange}>
              <option value="deg1">Software Engo</option>
              <option value="deg2">Finance</option>
              <option value="deg3">Philosophy</option>
            </select>
          </div>

          <button type="submit"> Submit </button>
        </form> 
      </Form>
    );
  };
}

export default StudentProfile;