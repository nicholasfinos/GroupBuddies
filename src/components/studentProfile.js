import React from "react";

import Form from "react-validation/build/form";

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    // this.onChangeGroupAssessment = this.onChangeGroupAssessment.bind(this);

    this.state = {
      studentName: "",
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

  render() {

    const { studentName } = this.state;

    return (
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form">
        <h3 style={{color: "light grey"}}>My Profile <i>{studentName}</i></h3>
    
      </Form>
    );
  };
}

export default StudentProfile;