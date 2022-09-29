import React from "react";
import "./studentProfile.css";
import UserService from "../services/user-service"
import { Grid, Paper, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

const paperStyling = { padding: 40, height: '100%', width: '65%', margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/ }
const btnstyle = { margin: '40px 0', borderRadius: 10, width: '75%', align:'center'}
const typ1 = { fontWeight: 600, fontFamily: "Arial" }

export default class StudentProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      preferredName: "",
      year: "",
      course: "",
    };
  }

  componentDidMount() {
    const URL = String(this.props.match.path);
    const name = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    this.setState({ username: name });
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

  updateStudentProfile = () => {
    let data = {
      username: this.state.username,
      year: this.state.year,
      course: this.state.course,
      preferredName: this.state.preferredName,
      studentName: this.state.username,
    }
    UserService.updateStudent(data);
  }

  onSubmit = () => {
    const username = this.state.username;
    this.updateStudentProfile();
    this.props.history.push("/account/" + username);
    window.location.reload();
  }

  render() {
    return (
      <Grid >
        <form onSubmit={this.onSubmit}>
          <Paper bgcolor sx={{ borderColor: 'black' }} elevation={10} style={paperStyling} >
            <Grid align='center'>
              <Typography variant='h4' fontFamily='BlinkMacSystemFont' style={typ1}> My Profile </Typography>
              <Typography variant='subtitle2'> Please complete the form to set up account</Typography>
            </Grid>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <TextField label='Username' disabled value={this.state.username} fullWidth required  />
              </Grid>
              <Grid item xs={8}>
                <TextField label='Preferred Name' placeholder="enter preferred name" onChange={this.handlePreferredNameChange} fullWidth required  />
              </Grid>
              <Grid item xs={12}>
                <label>Year:</label>
                <select className="info-card" value={this.state.year} onChange={this.handleYearChange}>
                  <option value="" disabled selected>Select your option</option>
                  <option value="1">Year 1</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4</option>
                  <option value="5">Year 5</option>
                  <option value="6">Year 6</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <label className="details">Degree:</label>
                <select className="info-card" value={this.state.course} onChange={this.handleCourseChange}>
                  <option value="" disabled selected>Select your option</option>
                  <option value="1">Bachelor of Engineering (Honours)</option>
                  <option value="2">Bachelor of Engineering Science</option>
                  <option value="3">Bachelor of Engineering Science Bachelor of Laws</option>
                  <option value="4">Bachelor of Engineering (Honours) Bachelor of Creative Intelligence and Innovation</option>
                  <option value="5">Bachelor of Engineering (Honours) Bachelor of Business</option>
                  <option value="6">Bachelor of Engineering (Honours) Bachelor of International Studies</option>
                  <option value="7">Bachelor of Engineering (Honours) Bachelor of Medical Science</option>
                  <option value="8">Bachelor of Engineering (Honours) Bachelor of Science</option>
                </select>
              </Grid>
            </Grid>
            <Button type='submit' color="primary" variant="contained" style={btnstyle} fullWidth>Submit</Button>
          </Paper>
        </form>
      </Grid >
    );
  };
}