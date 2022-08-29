/*import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@material-ui/core'
import {Container} from '@material-ui/core'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/auth";
import { Avatar } from "@material-ui/core";

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

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/account");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }


  return (
    <Box display="flex" alignItems="center" justifyContent="center" flex={1} flexDirection="column">
      <form noValidate={true} autoComplete="off">
        <Box>
        <Typography variant="h2">Login</Typography>
          <TextField
            fullWidth={true}
            id="username"
            type="email"
            label="Email"
            placeholder="Email"
            margin="dense"
          />
          <TextField
            fullWidth={true}
            value={password}
            
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            margin="dense"
          />
          <Button
            variant ="text"
             fullWidth={true}
             size = "small"
             color = 'error'
           >
            Don't know your account details?
          </Button>
        </Box>
        <Box sx={{ 
        m: 5 ,
        }}>
          <Button
             type="submit"
             variant="contained"
             fullWidth={true}
           >
            Login
          </Button>

        </Box>
      </form>
    </Box>
     
     
    /*
      <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form" onSubmit={handleLogin} ref={form}>
        <h3 style={{color: "light grey"}}>Login</h3>
        <div>
            <label htmlFor="username">Username</label>
            <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required]}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]}/>
        </div>
        <span style={{display: "inline-block"}} class="password"><a href="/login">Forgot password?</a></span>
        <div>
            <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
                <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
            </button>
        </div>

        {message && (
            <div className="form-group">
            <div className="alert alert-danger" role="alert">{message}</div>
            </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
  

  )
};

export default Login;

*/