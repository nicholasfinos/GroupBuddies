import React, { Component } from "react";
import "./studentProfile.css";
import UserDataService from '../services/user-service';
import RoleDataService from '../services/role-service';
import { Grid, Paper, Divider} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const paperStyling = { padding: 40, height: '100%', width: '80%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const btnstyle = { margin: '40px 0', borderRadius: 10, width: '75%', align:'center', marginLeft:'13%'}
const typ1 = { fontWeight: 600, fontFamily: "Arial" }

class Account extends Component {
  constructor(props) {
    super(props);
    this.retrieveUser = this.retrieveUser.bind(this);
    
    this.state = {
        currentUser: "",
        student: false,
        firstLogin: true,
        studentId: "",
    };
  }

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {
    const URL = String(this.props.match.path);
    const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    RoleDataService.getRoleId('student')
        .then(response => {
            this.setState({
                studentId: response.data
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
            if (this.state.currentUser[0].roles.includes(this.state.studentId[0]._id)){
                if (!this.state.currentUser[0].hasOwnProperty('course')){
                    this.props.history.push("/profile/" + this.state.currentUser[0]?.username)
                }
                else {
                    this.setState({
                        student: true,
                        firstLogin: false
                    })
                }
            } else {
                this.setState({
                    student: false, 
                    firstLogin: false
                })
            }
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        }
    );
  }

  render() {
    const { currentUser, student, firstLogin } = this.state;

    return (
      <><Grid>
            {!firstLogin ? ( 
                <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling} >
                  <Grid align='center' direction="column" spacing={5}>
                    <Typography variant='h4' fontFamily='BlinkMacSystemFont' style={typ1}> {currentUser[0].username}'s Account </Typography>
                  </Grid>
                  <br></br>
                  <Grid container spacing ={5}>
                    <Grid item xs={6}>
                      <Grid container direction="column" spacing={5}>
                        <Grid item>
                          <Typography variant='h6' fontFamily='BlinkMacSystemFont' style={typ1}> Preferred Name: </Typography>
                          <Typography variant='body2' fontFamily='BlinkMacSystemFont' style={typ1}> {currentUser[0].preferredName} </Typography>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Typography variant='h6' fontFamily='BlinkMacSystemFont' style={typ1}> Year: </Typography>
                          <Typography variant='body2' fontFamily='BlinkMacSystemFont' style={typ1}> {currentUser[0].year} </Typography>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Typography variant='h6' fontFamily='BlinkMacSystemFont' style={typ1}> Degree: </Typography>
                          <Typography variant='body2' fontFamily='BlinkMacSystemFont' style={typ1}> {currentUser[0].course} </Typography>
                          <Divider />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <div className="skills-box">
                        <p>skills gonna go here</p>
                      </div>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Button component={Link} to={"/profile/" + currentUser[0].username} color="primary" variant="contained" style={btnstyle} fullWidth>Edit</Button>
                </Paper>
            ) :
                (<></>)}
            </Grid>
        </>
    );
  }
}

export default Account;