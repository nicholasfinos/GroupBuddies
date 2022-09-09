import React, { Component } from "react";
import { Grid, ListItem } from "@material-ui/core";
import PeerRequestDataService from "../services/peer-request-service";
import UserDataService from '../services/user-service';
import RoleDataService from '../services/role-service';

class viewPeerRequests extends Component {
  constructor(props) {
    super(props);

    this.retrievePeerRequests = this.retrievePeerRequests.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRequest = this.setActiveRequest.bind(this);

    this.state = {
      requests: [],
      currentRequest: null,
      currentIndex: -1,
      yesPeers: [],
      noPeers: [],
      isTutor: null,
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.retrievePeerRequests(username);
    this.checkUser(username)
  }

  checkUser(username) {
    RoleDataService.getRoleId('tutor')
      .then(response => {
        this.setState({
          tutorId: response.data
        });
      })
      .catch(e => {
        console.log(e);
      })

    UserDataService.getUser(username)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        if (this.state.currentUser[0].roles.includes(this.state.tutorId[0]._id)) {
          this.setState({
            isTutor: true
          })
        } else {
          this.setState({
            isTutor: false
          })
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      }
      );
  }

  retrievePeerRequests(username) {
    PeerRequestDataService.getPeerRequests(username)
      .then(response => {
        this.setState({
          requests: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.setActiveRequest();
    this.setState({
      currentRequest: null,
      currentIndex: -1
    });
  }

  setActiveRequest(request, index) {
    this.setState({
      currentRequest: request,
      currentIndex: index,
      yesPeers: request.yesPeers,
      noPeers: request.noPeers,
    });
  }

  render() {
    const { requests, isTutor, currentRequest, yesPeers, noPeers, currentIndex } = this.state;

    return (
      <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
        {!isTutor ? (
          <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
            <h3>Peer Requests</h3>
            <Grid container>
              <Grid item md={4}>
                <h2>My Peer Request List</h2>
                <div className="list-group">
                  {requests && requests.map((request, index) => (
                    <ListItem selected={index === currentIndex} onClick={() => this.setActiveRequest(request, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + request?.username + ", Subject: " + request?.subjectName} </ListItem>
                  ))}
                </div>
              </Grid>
              <Grid item md={4}>
                {currentRequest ? (
                  <div style={{ "marginLeft": "200px" }}>
                    <br />
                    <div>
                      <h2>Peer Request</h2>
                      <div>
                        <label><strong>Subject Name:</strong></label>{" "}{currentRequest.subjectName}
                      </div>

                      <br />
                      <h2>Peers You Wish To Be With:</h2>
                      <div className="list-group">
                        {yesPeers && yesPeers.map((yesPeer, index) => (
                          <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                            {"Name: " + yesPeer}
                          </ListItem>
                        ))}
                      </div>

                      <br />
                      <h2>Peers Don't You Wish To Be With:</h2>
                      <div className="list-group">
                        {noPeers && noPeers.map((noPeer, index) => (
                          <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                            {"Name: " + noPeer}
                          </ListItem>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                    <br />
                    <p style={{ marginLeft: "100px" }}><i>Please click on a Request...</i></p>
                    <div style={{ float: "left", width: "100%" }}>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        ) : (
          <div style={{ fontFamily: "Times New Roman", textAlign: "center", "width": "80%", "marginLeft": "130px" }}>
          <h3>Peer Requests</h3>
          <Grid container>
            <Grid item md={4}>
              <h2>Student Peer Request List</h2>
              <div className="list-group">
                {requests && requests.map((request, index) => (
                  <ListItem selected={index === currentIndex} onClick={() => this.setActiveRequest(request, index)} divider button style={{ padding: "20px" }} key={index}> {"Name: " + request?.username + ", Subject: " + request?.subjectName} </ListItem>
                ))}
              </div>
            </Grid>
            <Grid item md={4}>
              {currentRequest ? (
                <div style={{ "marginLeft": "200px" }}>
                  <br />
                  <div>
                    <h2>Peer Request</h2>
                    <div>
                      <label><strong>Subject Name:</strong></label>{" "}{currentRequest.subjectName}
                    </div>

                    <br />
                    <h2>Peers Student Wishes To Be With:</h2>
                    <div className="list-group">
                      {yesPeers && yesPeers.map((yesPeer, index) => (
                        <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                          {"Name: " + yesPeer}
                        </ListItem>
                      ))}
                    </div>

                    <br />
                    <h2>Peers Student Doesn't Wish To Be With:</h2>
                    <div className="list-group">
                      {noPeers && noPeers.map((noPeer, index) => (
                        <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                          {"Name: " + noPeer}
                        </ListItem>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                  <br />
                  <p style={{ marginLeft: "100px" }}><i>Please click on a Request...</i></p>
                  <div style={{ float: "left", width: "100%" }}>
                  </div>
                </div>
              )}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default viewPeerRequests