import React from "react";
import { Button, Input } from "@material-ui/core";
import SubjectDataService from "../services/subject-service";
import PeerRequestDataService from "../services/peer-request-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class CreatePeerRequest extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeSubjectName = this.onChangeSubjectName.bind(this);
    this.onChangeYesPeers = this.onChangeYesPeers.bind(this);
    this.onChangeNoPeers = this.onChangeNoPeers.bind(this);
    // this.onChangeSubjectTopics = this.onChangeSubjectTopics.bind(this);
    // this.onChangeTimeSlot = this.onChangeTimeSlot.bind(this);
    // this.onChangeDay = this.onChangeDay.bind(this);
    // this.retrievePeerRequests = this.retrievePeerRequests.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.onChangeSemester = this.onChangeSemester.bind(this);

    this.state = {
      subjectName: "",
      username: "",
      submitted: false,
      yesPeers: [],
      noPeers: [],
      message: "",
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
  }

  onChangeSubjectName(e) {
    this.setState({ subjectName: e.target.value, message: "" });
    this.retrievePeers({subjectName: e.target.value});
  }

  onChangeYesPeers(e) {
    this.setState({ yesPeers: e.target.value, message: "" });
  }

  onChangeNoPeers(e) {
    this.setState({ noPeers: e.target.value, message: "" });
  }

  retrievePeers(subjectName) {
    SubjectDataService.getPeers(subjectName)
    .then((res) => 
      this.setState({
        // ...
      })
    )
  }

  savePeerRequest = () => {
    if (this.state.subjectName.length !==0){
      if (this.state.yesPeers[0].length !== 0 || this.state.noPeers[0].length !== 0){
        PeerRequestDataService.createPeerRequests(this.state.username)
          .then((res) => 
            this.setState({
              subjectName: res.subjectName,
              username: res.username,
              submitted: true,
              yesPeers: res.yesPeers,
              noPeers: res.noPeers,
            }
          ))
      } else {
        this.setState({ message: "Peer Preferences must be filled out" })
      }
    } else {
      this.setState({ message: "Subject Name must be filled out" })
    }
  }

  // Create new subject page
  newPeerRequest = () => {
    this.setState({
      subjectName: "",
      username: "",
      submitted: false,
      yesPeers: [],
      noPeers: [],
    });
    this.componentDidMount();
  }

  render() {
    const { tutors, currentIndex, addedtutors, currentRequest } = this.state;
    return (
      <div style={{textAlign: "center", maxWidth: '90%', fontFamily: "Times New Roman", marginLeft: "110px"}} className="form">
        <h3>Create a Peer Request</h3>
        {this.state.submitted ? (
          <div>
            <p><i>You created a peer request successfully!</i></p>
            <Button size="small" variant="contained" onClick={this.newPeerRequest}>{" "}Create a Peer Request{" "}</Button>
          </div>
        ) : (
          <div className="card" style={{maxWidth: "100%", marginLeft: "0px", paddingLeft: "0px", paddingRight: "120px"}}>
            <div className="form-group">
              <label htmlFor="subject-name" style={{marginLeft: '220px'}}>Subject Name: </label>
              <input className="form-control" style={{ maxWidth: '500px' }} type="text" name="subjectName" onChange={this.onChangeSubjectName} validations={[required]} />
            </div>

            <div className="form-group">
              <label style={{ marginLeft: "220px" }} htmlFor="yes-peers">Peers I am Happy to be grouped with:</label>
              <select className="form-group border" style={{ minWidth: "500px" }} onChange={this.onChangeYesPeers} validations={[required]}>
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
            <Button size="small" variant="contained" style={{maxWidth: "700px", marginLeft: "225px"}} onClick={this.savePeerRequest}>Submit</Button>
            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  };
}

export default CreatePeerRequest;