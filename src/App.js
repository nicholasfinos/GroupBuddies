import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import Account from "./components/account";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";
import BoardStudent from "./components/boardStudent";
import BoardTutor from "./components/boardTutor";
import logo from "./media/groupbuddies-logo.png"
import name from "./media/groupbuddies.png"
import createSubject from "./components/createNewSubject";
import viewTutors from "./components/viewTutors";
import viewSubject from "./components/viewSubjects";
import viewTutorial from "./components/viewTutorial";
import StudentProfile from "./components/studentProfile";
import { AppBar, Button } from "@material-ui/core";

const App = () => {
  const [ShowSubjectCoordinator, setShowSubjectCoordinator] = useState(false);
  const [showTutor, setShowTutor] = useState(false);
  const [showStudent, setShowStudent] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowSubjectCoordinator(currentUser.roles.includes("ROLE_SUBJECTCOORDINATOR"));
      setShowTutor(currentUser.roles.includes("ROLE_TUTOR"));
      setShowStudent(currentUser.roles.includes("ROLE_STUDENT"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <>
      <AppBar style={{background: '#fff0e7', textColor: 'black'}} justifyContent="space-between" position="static" fullwidth>
        <toolbar style={{textColor: ''}} justifyContent="space-between">
        <img src={logo} id="groupbuddieslogo" height="100" alt="" />
            <Button  component={Link} to={"/home"}>Home</Button>

            {showTutor && (
              <li className="nav-item" style={{ paddingLeft: "150px" }}>
                <Link to={"/tutor"} className="nav-link">Tutor Board</Link>
                <Link to={"/tutor/viewTutorial/" + currentUser?.id} className="nav-link">View Tutorial Class</Link>
              </li>
            )}

            {ShowSubjectCoordinator && (
              <li className="nav-item" style={{ paddingLeft: "150px" }}>
                <Link to={"/subject/create/" + currentUser?.username} className="nav-link">Create New Subject</Link>
                <Link to={"/subject/view/" + currentUser?.username} className="nav-link">View a Subject</Link>
                <Link to={"/tutor/view"} className="nav-link">View Tutors</Link>
              </li>
            )}

            {showStudent && (
              
              <><Button  component={Link} to={"/student"}>Student Board</Button><Button  component={Link} to={"/profile/" + currentUser?.username}>My Profile</Button></>
              
              
            )}

          {currentUser ? (
    
              <><Button  component={Link} to={"/account/"}>My Account</Button><Button  onClick={logOut}>Logout </Button></> 
              
           
          ) : (
            
              <Button  component={Link} to={"/login"}>Login</Button>
            
          )}
          </toolbar>
        </AppBar>

        <div className="container" style={{ marginTop: 20 }}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path={"/account/" + currentUser?.username} component={Account} />
            <Route path="/student" component={BoardStudent} />
            <Route exact path="/tutor" component={BoardTutor} />
            <Route path={"/subject/create/" + currentUser?.username} component={createSubject} />
            <Route path={"/subject/view/" + currentUser?.username} component={viewSubject} />
            <Route path="/tutor/view" component={viewTutors} />
            <Route path={"/tutor/viewTutorial/" + currentUser?.id} component={viewTutorial} />
            <Route path={"/profile/" + currentUser?.username} component={StudentProfile} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;