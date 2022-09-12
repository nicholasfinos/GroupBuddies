import React from "react";
import { Button, Input } from "@material-ui/core";
import SubjectDataService from "../services/subject-service";
import PeerRequestDataService from "../services/peer-request-service";
import { Grid, ListItem } from "@material-ui/core";

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

    this.state = {
      subjectName: "",
      username: "",
      submitted: false,
      yesPeers: [],
      noPeers: [],
      message: "",
      peers: [],
      subjects: "",
      students: "",
      currentSubject: "",
      selectedSubject: false,
      currentYesPeer: "",
      currentNoPeer: "",
      currentNoPeerIndex: -1,
      currentYesPeerIndex: -1,
      addedYesPeers: [],
      addedNoPeers: []
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
    this.retrieveSubjects(name);
  }

  retrieveSubjects(username) {
    PeerRequestDataService.getSubjects(username)
    .then((res) => 
      this.setState({
        subjects: res.data
      })
    )
  }

  savePeerRequest = () => {
    if (this.state.currentSubject.subjectName.length !==0){
      if ((this.state.addedYesPeers.length !== 0) || (this.state.addedNoPeers[0].length !== 0)){
        var data = {
          username: this.state?.username,
          subjectName: this.state?.currentSubject.subjectName,
          yesPeers: this.state?.addedYesPeers,
          noPeers: this.state?.addedNoPeers,
        }
        
        PeerRequestDataService.createPeerRequests(this.state.username, data)
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
        this.setState({ message: "A Peer Preference must be filled out!" })
      }
    } else {
      this.setState({ message: "A subject must be selected!" })
    }
  }

  setActiveSelectSubject(subject, index) {
    this.setState({
      currentSubject: subject,
      currentIndex: index,
      selectedSubject: true,
      peers: subject.students,
    });
  }

  addYesPeer(peer, index) {
    const peersList = this.state.addedYesPeers;
    var i;
    var alreadyExists = false;
    for (i = 0; i <= peersList.length; i++) {
      if (peersList[i] === peer) {
        alreadyExists = true;
        return;
      } else {
        alreadyExists = false;
      }
    }

    if (alreadyExists === false) {
      peersList.push(peer);
      this.setState({
        currentYesPeer: peer,
        currentYesPeerIndex: index,
        addedYesPeers: peersList,
      });
    }
  }

  addNoPeer(peer, index) {
    const peersList = this.state.addedNoPeers;
    var i;
    var alreadyExists = false;
    for (i = 0; i <= peersList.length; i++) {
      if (peersList[i] === peer) {
        alreadyExists = true;
        return;
      } else {
        alreadyExists = false;
      }
    }

    if (alreadyExists === false) {
      peersList.push(peer);
      this.setState({
        currentNoPeer: peer,
        currentNoPeerIndex: index,
        addedNoPeers: peersList,
      });
    }
  }

  deleteYesPeer(index) {
    const list = this.state.addedYesPeers;
    list.splice(index, 1);

    this.setState({
      addedYesPeers: list,
      currentYesPeer: null,
      message: ""
    });
  }

  deleteNoPeer(index) {
    const list = this.state.addedNoPeers;
    list.splice(index, 1);

    this.setState({
      addedNoPeers: list,
      currentNoPeer: null,
      message: ""
    });
  }

  // Create new subject page
  newPeerRequest = () => {
    this.setState({
      subjectName: "",
      username: "",
      submitted: false,
      yesPeers: [],
      noPeers: [],
      message: "",
      peers: [],
      subjects: "",
      students: "",
      currentIndex: -1,
      currentSubject: "",
      selectedSubject: false,
      currentPeer: "",
      addedPeers: [],
    });
    this.componentDidMount();
  }

  render() {
    const { subjects, peers, currentNoPeerIndex, addedNoPeers, addedYesPeers, currentYesPeerIndex, currentSubject, currentIndex} = this.state;
    return (
      <div style={{ textAlign: "center", maxWidth: '90%', fontFamily: "Times New Roman", marginLeft: "110px" }} className="form">
        <h3>Create a Peer Request</h3>
        {this.state.submitted ? (
          <div>
            <p><i>You created a subject peer request successfully!</i></p>
            <Button size="small" variant="contained" onClick={this.newPeerRequest}>{" "}Create a New Peer Request{" "}</Button>
          </div>
        ) : (
          <div className="card" style={{ maxWidth: "100%", marginLeft: "0px", paddingLeft: "0px", paddingRight: "120px" }}>
            {!this.state.selectedSubject ? (
              <div>
                <label htmlFor="subject-name" style={{ marginLeft: '180px' }}><i>Please select a Subject to create a peer request for:</i></label>
                {subjects && subjects.map((subject, index) => (
                  <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentIndex} onClick={() => this.setActiveSelectSubject(subject, index)} divider button key={index}>
                    {subject.subjectName}
                  </ListItem>
                ))}
              </div>
            ) : (
              <div>
                <br />
                <div style={{ alignContent: "space-between" }}>
                  <h4>Selected Subject: </h4>
                  <i><h4> {this.state.currentSubject.subjectName}</h4>
                  </i>
                </div>
                <br />
                <Grid container style={{ maxWidth: "1000px" }}>
                  <Grid item md={4}>
                    {currentSubject ? (
                      <Grid item md={4} style={{ minWidth: "400px" }}>
                        <h4>Peers you wish to be grouped with:</h4>
                        <i>Please select the peers you are happy to be grouped with from the following list</i>
                        <div style={{ flexDirection: "column", minWidth: "400px" }}>
                          {peers && peers.map((peer, index) => (
                            <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentYesPeerIndex} onClick={() => this.addYesPeer(peer, index)} divider button key={index}>
                              {peer}
                            </ListItem>
                          ))}
                        </div>

                        <br/>
                        <br/>

                        <h4>Peers you don't wish to be grouped with:</h4>
                        <i>Please select the peers you don't wish to be grouped with from the following list</i>
                        <div style={{ flexDirection: "column", minWidth: "400px" }}>
                          {peers && peers.map((peer, index) => (
                            <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentNoPeerIndex} onClick={() => this.addNoPeer(peer, index)} divider button key={index}>
                              {peer}
                            </ListItem>
                          ))}
                        </div>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item md={4} style={{ paddingLeft: "100px", minWidth: "400px" }}>
                    <div style={{ paddingLeft: "50px" }}>
                      {addedYesPeers.map((addedYesPeer, index) => (
                        <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentYesPeerIndex} onClick={() => this.deleteYesPeer(index)} divider button key={index}>
                          {" "}{addedYesPeer}
                        </ListItem>
                      ))}
                    </div>
                    
                    <br/>
                    
                    <div style={{ paddingLeft: "50px", marginTop: "300px"}}>
                      {addedNoPeers.map((addedNoPeer, index) => (
                        <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentNoPeerIndex} onClick={() => this.deleteNoPeer(index)} divider button key={index}>
                          {" "}{addedNoPeer}
                        </ListItem>
                      ))}
                    </div>
                  <br />
                  <br />
                </Grid>
                </Grid>
                <div className="form-group">
                  <Button size="small" variant="contained" style={{ maxWidth: "700px", marginLeft: "225px" }} onClick={this.savePeerRequest}>Submit</Button>
                  <Button size="small" variant="contained" onClick={() => window.location.reload()}>{" "}Back{" "}</Button>
                </div>
              </div>
            )}
            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  };
}

export default CreatePeerRequest;