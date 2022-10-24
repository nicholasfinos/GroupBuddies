import React from "react";
import { Button, ButtonGroup, Divider, Input, styled } from "@material-ui/core";
import SubjectDataService from "../services/subject-service";
import PeerRequestDataService from "../services/peer-request-service";
import { Grid, ListItem, Paper, Box, Typography } from "@material-ui/core";

const Backing = styled(Paper)(({ theme }) => ({
  height: '72vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
   background: '#fff0e7',
   width: 800
}));

const Backing2 = styled(Paper)(({ theme }) => ({
  height: '72vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
   background: '#fff0e7',
   width: 1100
}));

const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));

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
      tutroials: [],
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
        tutroials: res.data
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
          tutorialNumber: this.state?.currentSubject.number,
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

  setActiveSelectSubject(tutorial, index) {
    this.setState({
      currentSubject: tutorial,
      currentIndex: index,
      selectedSubject: true,
      peers: tutorial.allStudents,
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
      tutroials: [],
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
    const { tutroials, peers, currentNoPeerIndex, addedNoPeers, addedYesPeers, currentYesPeerIndex, currentSubject, currentIndex} = this.state;
    return (
      <Box sx={{ flexGrow: 1 }}>
      
      <Grid align="center">
      <div style={{ textAlign: "center", maxWidth: '90%', fontFamily: "Times New Roman", marginLeft: "110px" }} className="form">
        
        {this.state.submitted ? (
          <div>
            <p><i>You created a subject peer request successfully!</i></p>
            <Button size="small" variant="contained" onClick={this.newPeerRequest}>{" "}Create a New Peer Request{" "}</Button>
          </div>
        ) : (



          
          <Box sx={{ flexGrow: 1 }}>
            {!this.state.selectedSubject ? (
              <Grid align="center">
              <Backing>
                <Box paddingTop={5}>
              <BigText variant="h2">Create a Peer Request</BigText>
               </Box>
              <Box alignContent={'center'}>
                <Typography htmlFor="subject-name" marginLeft='100'>Please select a Subject to create a peer request for:</Typography>
                <Grid align='center'>
                <Box borderColor={'black'} bgcolor={'white'}  border={1} maxWidth={400} maxHeight={350} overflow={'auto'}>
                {tutroials && tutroials.map((tutorial, index) => (
                  <ListItem style={{ padding: "20px", maxWidth: "400px", alignContent: 'center', paddingLeft:'10'}} selected={index === currentIndex} onClick={() => this.setActiveSelectSubject(tutorial, index)} divider button key={index}>
                    {"Subject Name: " + tutorial.subjectName + " | Tutorial Number: " + tutorial.number}
                  </ListItem>
                ))}
                </Box>
                </Grid>
              </Box>
              </Backing>
              </Grid>



            
            ) : (
              
              <Box>
                <Grid align='center'>
                  <Backing2>
                  <Box paddingTop={5} paddingBottom={2}>
                    <BigText variant='h3'>Create a Peer Request for {this.state.currentSubject.subjectName} </BigText>
                  </Box>
                
                
                <Grid container style={{ maxWidth: "1000px" }}>
                  <Grid item md={4}>
                    {currentSubject ? (
                      <Grid item md={4} style={{ minWidth: "400px" }}>
                         <Typography variant='h6'>Peers you wish to be grouped with:</Typography>
                         <Box maxWidth={300}>
                         <Typography variant='caption'>Please select the peers you are happy to be grouped with from the following list</Typography>
                         </Box>
                        
                         <Box  borderColor={'black'} bgcolor={'white'}  border={1} style={{minHeight: 100, maxHeight: 100, overflow: 'auto'}}>
                        <div style={{ flexDirection: "column" }}>
                          {peers && peers.map((peer, index) => (
                            <ListItem style={{ padding: "0px" }} selected={index === currentYesPeerIndex} onClick={() => this.addYesPeer(peer, index)} divider button key={index}>
                              {peer.username}
                            </ListItem>
                          ))}
                        </div>
                        </Box>

                        <Typography variant='h6'>Peers you don't wish to be grouped with:</Typography>
                        <Box maxWidth={305}>
                         <Typography variant='caption'>Please select the peers you don't wish to be grouped with from the following list</Typography>
                         </Box>
                         <Box  borderColor={'black'} bgcolor={'white'}  border={1} style={{minHeight: 100, maxHeight: 100, overflow: 'auto'}}>
                        <div style={{ flexDirection: "column", minWidth: "" }}>
                          {peers && peers.map((peer, index) => (
                            <ListItem style={{ padding: "0px"}} selected={index === currentNoPeerIndex} onClick={() => this.addNoPeer(peer, index)} divider button key={index}>
                              {peer.username}
                            </ListItem>
                          ))}
                        </div>
                        </Box>
                      </Grid>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                  <Grid item md={4} style={{ paddingLeft: "150px", minWidth: "500px" }}>
                  <Typography variant='h6'>Peers to request grouping with:</Typography>
                    
                    <Box  borderColor={'black'} bgcolor={'white'}  border={1} style={{minHeight: 125, maxHeight: 125, overflow: 'auto'}} >
                      {addedYesPeers.map((addedYesPeer, index) => (
                        <ListItem style={{ padding: "5px",  }} selected={index === currentYesPeerIndex} onClick={() => this.deleteYesPeer(index)} divider button key={index}>
                          {" "}{addedYesPeer.username}
                        </ListItem>
                      ))}
                      </Box>
                    
                    
             
                      <Typography variant='h6'>Peers to request avoiding:</Typography>
                      <Box  borderColor={'black'} bgcolor={'white'}  border={1} style={{minHeight: 125, maxHeight: 125, overflow: 'auto'}} >
                      {addedNoPeers.map((addedNoPeer, index) => (
                        <ListItem style={{ padding: "5px",  }} selected={index === currentNoPeerIndex} onClick={() => this.deleteNoPeer(index)} divider button key={index}>
                          {" "}{addedNoPeer.username}
                        </ListItem>
                      ))}
                      
                      </Box>
                      <Box paddingTop={2}>
                      <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
    >
      <Button onClick={this.savePeerRequest}>Submit</Button>
      <Button onClick={() => window.location.reload()}>Return</Button>
    </ButtonGroup>
    </Box>
                </Grid>
                
                </Grid>
                
                
                
                
                </Backing2>
                </Grid>
              </Box>
            )}
            <p>{this.state.message}</p>
          </Box>
        )}
      </div>
      </Grid>
     
      
      </Box>
      /*
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
                {tutroials && tutroials.map((tutorial, index) => (
                  <ListItem style={{ padding: "20px", marginLeft: "15px", maxWidth: "400px" }} selected={index === currentIndex} onClick={() => this.setActiveSelectSubject(tutorial, index)} divider button key={index}>
                    {"Subject Name: " + tutorial.subjectName + " | Tutorial Number: " + tutorial.number}
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
                              {peer.username}
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
                              {peer.username}
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
                          {" "}{addedYesPeer.username}
                        </ListItem>
                      ))}
                    </div>
                    
                    <br/>
                    
                    <div style={{ paddingLeft: "50px", marginTop: "300px"}}>
                      {addedNoPeers.map((addedNoPeer, index) => (
                        <ListItem style={{ padding: "20px", minWidth: "300px" }} selected={index === currentNoPeerIndex} onClick={() => this.deleteNoPeer(index)} divider button key={index}>
                          {" "}{addedNoPeer.username}
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
      */
    );
  };
  
}

export default CreatePeerRequest;