import { Grid, Paper, TextField } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../actions/auth";
import { Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core";
import { createTheme } from "@material-ui/core";
import logo from "../media/groupbuddies-logo.png"
import { Button } from "@material-ui/core";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";




const paperStyling = {padding : 40, height: '60vh ', width: 420, margin: '20px auto', background: '#fff0e7', borderRadius: 20/*border: '2px solid'*/}
const btnstyle={margin:'40px 0', borderRadius: 10,}
const typ1={fontWeight: 600, fontFamily: "Arial" }
const type2={margin:'5px 0', fontWeight: 60,}

 document.body.style = 'background: #101c2c;';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );  
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    //form.current.validateAll();

    //if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/account");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    /*} else {
      setLoading(false);
    }*/
  };

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  return (
    

            
    <Grid>
  
          <Paper bgcolor  sx={{borderColor: 'black'}} elevation={10} style ={paperStyling}  /*variant={"outlined"}*/>
            <Grid align = 'center' >
            <img src={logo} id="groupbuddieslogo" height="100" alt=""/>
            <Typography variant ='h4' fontFamily='BlinkMacSystemFont' style={typ1}> Group Buddies </Typography>
            <Typography variant='subtitle2'> To begin, enter your UTS account details</Typography>
            </Grid>
            <form onSubmit={handleLogin}>
              <TextField label = 'Email' placeholder= "enter email" fullWidth required onChange={onChangeUsername} /*validations={[required]}*//>
              <TextField label = 'Password' placeholder= "enter password" fullWidth required  onChange={onChangePassword} /*validations={[required]}*//>
            
              <Button type='submit' color="primary"   variant="contained" style={btnstyle} fullWidth>Sign in</Button>

            </form>
          </Paper>

        
    </Grid>







  )
  
}
export default Login;
