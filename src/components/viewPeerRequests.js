import React, { Component } from "react";
import { Grid, ListItem } from "@material-ui/core";
import PeerRequestDataService from "../services/peer-request-service";
import UserDataService from '../services/user-service';
import RoleDataService from '../services/role-service';
import EditPeerRequest from "./editPeerRequest";
import { Link, Switch, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";

const paperStyling = { padding: 40, height: '100%', width: '80%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const subjectScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '580px' }
const tutorialScrollable = { overflowY: 'auto', overflowX: 'hidden', maxHeight: '200px' }

class viewPeerRequests extends Component {
  constructor(props) {
    super(props);

    this.retrievePeerRequests = this.retrievePeerRequests.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRequest = this.setActiveRequest.bind(this);

    this.state = {
      requests: [],
      request: null,
      currentIndex: -1,
      yesPeers: [],
      noPeers: [],
      isTutor: null,
      username: null,
      status: null,
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: username })
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
      request: null,
      currentIndex: -1
    });
  }

  setActiveRequest(request, index) {
    console.log(request);
    this.setState({
      request: request,
      currentIndex: index,
      yesPeers: request.yesPeers,
      noPeers: request.noPeers,
      status: request.status,
    });
  }


  render() {
    const { requests, isTutor, status, username, request, subjectName, yesPeers, noPeers, currentIndex } = this.state;

    return (
      <Grid style={{ textAlign: "center" }}>
        <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling}>
          {!isTutor ? (
            <div style={{}}>
              <h3>Peer Requests</h3>
              <hr className="new5"></hr>
              <Grid container>
                <Grid item md={6}>
                  <div style={{ width: "90%" }}>
                    <h2>My Peer Request List</h2>
                    <div className="list-group" style={subjectScrollable}>
                      {requests && requests.map((request, index) => (
                        <ListItem selected={index === currentIndex} onClick={() => this.setActiveRequest(request, index)} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + request?.subjectName + " | Tutorial Number: " + request?.tutorialNumber} </ListItem>
                      ))}
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  {request ? (
                    <div style={{ "minWidth": "450px" }}>
                      <div>
                        <h2>Peer Request</h2>
                        <div>
                          <label><strong>Subject Name:</strong></label>{" "}{request.subjectName}
                        </div>

                        <br />
                        <h3>Peers You Wish To Be With:</h3>
                        <div className="list-group" style={tutorialScrollable}>
                          {yesPeers && yesPeers.map((yesPeer, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                              {"Name: " + yesPeer.username}
                            </ListItem>
                          ))}
                        </div>

                        <br />
                        <h3>Peers Don't You Wish To Be With:</h3>
                        <div className="list-group" style={tutorialScrollable}>
                          {noPeers && noPeers.map((noPeer, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                              {"Name: " + noPeer.username}
                            </ListItem>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", marginLeft: "100px", transform: "translateY(-30%)" }}>
                      <br />
                      <p><i>Please click on a Request...</i></p>
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
                  {request ? (
                    <div style={{ "marginLeft": "50px", "minWidth": "450px" }}>
                      <br />
                      <div>
                        <h2>Peer Request</h2>
                        <div>
                          <label><strong>Subject Name:</strong></label>{" "}{request.subjectName}
                        </div>

                        <br />
                        <h2>Peers Student Wishes To Be With:</h2>
                        <div className="list-group" style={tutorialScrollable}>
                          {yesPeers && yesPeers.map((yesPeer, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                              {"Name: " + yesPeer.username}
                            </ListItem>
                          ))}
                        </div>

                        <br />
                        <h2>Peers Student Doesn't Wish To Be With:</h2>
                        <div className="list-group" style={tutorialScrollable}>
                          {noPeers && noPeers.map((noPeer, index) => (
                            <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "20px" }} key={index}>
                              {"Name: " + noPeer.username}
                            </ListItem>
                          ))}
                        </div>
                      </div>

                      <div>
                        {!status ? (
                          <label><strong>Status:</strong> Idle</label>
                        ) : (
                          <label><strong>Status:</strong> Actioned</label>
                        )}
                      </div>

                      <br />
                      <div>
                        <Link style={{ WebkitTextFillColor: "black" }} to={"/request/edit/" + username + "/" + request._id}>Edit</Link>
                        <Switch>
                          <Route exact path={"/request/edit/" + username + "/" + request._id} component={EditPeerRequest} />
                        </Switch>
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
        </Paper>
      </Grid>
    );
  }
}

export default viewPeerRequests