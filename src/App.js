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
import viewPeerRequests from "./components/viewPeerRequests";
import CreatePeerRequest from "./components/createPeerRequest";
import CreateSubjectEnrollment from "./components/createSubjectEnrollment";
import ViewSubjectEnrollment from "./components/viewEnrollment";
import EditPeerRequest from "./components/editPeerRequest";
import EditSubject from "./components/editSubject";
import ApproveSubjectEnrollment from "./components/approveSubjectEnrollment";

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

  const logOut = (e) => {
    history.push("/");
    window.location.reload();
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

            <>
              <Button  component={Link} to={"/request/view/" + currentUser?.username}>View Peer Requests</Button>
              <Button component={Link} to={"/tutor/viewTutorial/" + currentUser?.id}>View Tutorial Class</Button>
             </>
            )}

            {ShowSubjectCoordinator && (
              <><Button component={Link} to={"/subject/create/" + currentUser?.username}>Create New Subject</Button><Button component={Link} to={"/subject/view/" + currentUser?.username}>View a Subject</Button><Button component={Link} to={"/tutor/view"}>View Tutors</Button> <Button component={Link} to={"/enrollment/viewrequest/" + currentUser?.username}> View Enrollment Requests</Button></>

            )}

            {showStudent && (

              
              <>
              <Button  component={Link} to={"/request/create/" + currentUser?.username}>Create Peer Request</Button>
              <Button  component={Link} to={"/request/view/" + currentUser?.username}>My Peer Requests</Button>
              <Button  component={Link} to={"/enrollment/create/" + currentUser?.username}>Create a Subject Enrollment</Button>
              <Button  component={Link} to={"/enrollment/view/" + currentUser?.username}>View Subject Enrollments</Button>
              <Button  component={Link} to={"/profile/" + currentUser?.username}>My Profile</Button>
              </>
              
              

            )}

          {currentUser ? (
    
              <><Button  component={Link} to={"/account/"}>My Account</Button>
              <Button component={Link} to={"/"} onClick={logOut}>Logout </Button>
              </> 
              
           
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
            <Route path={"/request/view/" + currentUser?.username} component={viewPeerRequests} />
            <Route path={"/request/edit/" + currentUser?.username + "/"} component={EditPeerRequest} />
            <Route path={"/request/create/" + currentUser?.username} component={CreatePeerRequest} />
            <Route path={"/enrollment/create/" + currentUser?.username} component={CreateSubjectEnrollment} />
            <Route path={"/enrollment/view/" + currentUser?.username} component={ViewSubjectEnrollment} />
            <Route path={"/enrollment/viewrequest/" + currentUser?.username} component={ApproveSubjectEnrollment} />
            <Route path={"/subject/" + currentUser?.username + "/"} component={EditSubject} />
          </Switch>
        </div>
      </>
    </Router>
  );
};

export default App;