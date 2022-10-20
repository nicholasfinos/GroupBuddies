import React, { Component } from "react";
import { Box, Button, Grid, ListItem, Paper, styled, Typography } from "@material-ui/core";
import PeerRequestDataService from "../services/peer-request-service";
import UserDataService from '../services/user-service';
import RoleDataService from '../services/role-service';
import EditPeerRequest from "./editPeerRequest";
import { Link, Switch, Route } from "react-router-dom"; 


const Backing = styled(Paper)(({ theme }) => ({
  height: '74vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
   background: '#fff0e7',
 
}));

const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

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
    this.setState({username: username})
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
      <Box>
        <Grid align='center'>
          <Backing>

      
      <div>
        {!isTutor ? (
          <div>
            <BigText variant={'h2'}>View Peer Requests </BigText>
            
            <Grid container align='center'>
              <Grid item md={4}>
              <Box padding={5} paddingLeft={15}>
                <BigText variant='h5'>My Peer Request List</BigText>
              
                <Box paddingLeft={5} style={{minHeight: 350, overflow: 'auto',maxHeight: 350,}}>
                <div className="list-group">
                  {requests && requests.map((request, index) => (
                    <ListItem selected={index === currentIndex} onClick={() => this.setActiveRequest(request, index)} divider button style={{ padding: "20px" }} key={index}> {"Subject: " + request?.subjectName + " | Tutorial Number: " + request?.tutorialNumber} </ListItem>
                  ))}
                </div>
                </Box>
                </Box>
              </Grid>
              <Grid item md={4}>
                {request ? (
                  <Box padding={5}>
                  <div style={{ "marginLeft": "50px",}}>
                    
                    <div>
                      
                      <BigText variant='h5'>My Peer Requests for: {request.subjectName}</BigText>
                     

                      <Box paddingTop={2}>
                      <Typography variant='h6'>Peers I wish to be grouped with: </Typography>
                      </Box>
                      <Box paddingLeft={10} style={{minHeight: 100, overflow: 'auto',maxHeight: 100,}}>
                      <div className="list-group">
                        {yesPeers && yesPeers.map((yesPeer, index) => (
                          <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "5px" }} key={index}>
                            {"Name: " + yesPeer.username}
                          </ListItem>
                        ))}
                      </div>
                      </Box>
                      <Box paddingLeft={4}>
                      <Typography variant='h6'>Peers I wish not be grouped with: </Typography>
                      </Box>
                      <Box paddingLeft={10} style={{minHeight: 100, overflow: 'auto',maxHeight: 100,}}>

                      <div className="list-group">
                        {noPeers && noPeers.map((noPeer, index) => (
                          <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "5px" }} key={index}>
                            {"Name: " + noPeer.username}
                          </ListItem>
                        ))}
                      </div>
                      </Box>
                    </div>
                  </div>
                  </Box>
                ) : (
                  <div style={{ display: "block", paddingTop: "", paddingBottom: "75px", marginLeft: "0px", transform: "translateY(-30%)" }}>
                    <Box paddingTop={12.6}>
                    <Typography variant="h6">Select a request to begin</Typography>
                    </Box>
                    <div style={{ float: "left", width: "100%" }}>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
          <BigText variant={'h2'}>View Peer Requests </BigText>
          <Grid container>
            <Grid item md={4}>
            <Box paddingLeft={0}>
            <Box paddingTop={5}>
            <BigText variant='h5'>Student Peer Request List</BigText>
            </Box>
            <Box paddingLeft={10} style={{minHeight: 400, overflow: 'auto',maxHeight: 350,}}>
              <div className="list-group">
                {requests && requests.map((request, index) => (
                  <ListItem selected={index === currentIndex} onClick={() => this.setActiveRequest(request, index)} divider button style={{ padding: "10px" }} key={index}> {"Name: " + request?.username + ", Subject: " + request?.subjectName} </ListItem>
                ))}
              </div>
              </Box>
              </Box>
            </Grid>
            <Grid item md={4}>
              {request ? (
                 <Box padding={5}>
                  
                  <div>
                  <BigText variant='h5'>Student request for: {request.subjectName}</BigText>
                   

                  <Box paddingTop={2}>
                      <Typography>Peers Student Wishes To Be With:</Typography>
                      </Box>
                      <Box paddingLeft={10} style={{minHeight: 100, overflow: 'auto',maxHeight: 100,}}>

                    <div className="list-group">
                      {yesPeers && yesPeers.map((yesPeer, index) => (
                        <ListItem selected={index === currentIndex} onClick={() => this.setActiveYesPeer(yesPeer, index)} divider button style={{ padding: "0px" }} key={index}>
                          {"Name: " + yesPeer.username}
                        </ListItem>
                      ))}
                    </div>
                    </Box>

                    <Typography>Peers Student Doesn't Wish To Be With:</Typography>
                    <Box paddingLeft={10} style={{minHeight: 100, overflow: 'auto',maxHeight: 100,}}>
                    <div className="list-group">
                      {noPeers && noPeers.map((noPeer, index) => (
                        <ListItem selected={index === currentIndex} onClick={() => this.setActiveNoPeer(noPeer, index)} divider button style={{ padding: "0px" }} key={index}>
                          {"Name: " + noPeer.username}
                        </ListItem>
                      ))}
                    </div>
                    </Box>
                  </div>
                  

                  <div>
                      {!status ? (
                        <label><strong>Request Status:</strong> Idle</label>
                      ) : (
                        <label><strong>Request Status:</strong> Actioned</label>
                      )}
                    </div>

                 
                  <div>
                    
                    
                    <Button variant="contained"  component={Link} to={"/request/edit/" + username + "/" + request._id}>Action Request</Button>
                  </div>
                  </Box>
                
              ) : (
                <div style={{ display: "block", paddingTop: "75px", paddingBottom: "75px", transform: "translateY(-30%)" }}>
                  <br />
                  <Typography variant="h6">Select a request to begin</Typography>
                  <div style={{ float: "left", width: "100%" }}>
                  </div>
                </div>
              )}
              </Grid>
            </Grid>
          </div>
        )}
      </div>
      </Backing>
      </Grid>
      </Box>
    );
  }
}

export default viewPeerRequests