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
import BoardSubjectCoordinator from "./components/boardSubjectCoordinator";
import BoardTutor from "./components/boardTutor";
import logo from "./media/groupbuddies-logo.png"
import name from "./media/groupbuddies.png"

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
      <div className="container" style={{fontFamily: "Times New Roman"}}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id="horizontal-style" style={{marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <a class="navbar-brand">
            <img src={logo} id="groupbuddieslogo" height="60" alt=""/>
          </a>
          <Link to="/" className="navbar-brand">
              <img src={name} id="groupbuddies" width="350" alt=""/>
            </Link>
          <div className="navbar-nav mr-auto" style={{paddingLeft: "5vw"}}>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">Home</Link>
            </li>

            {showTutor && ( 
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/tutor"} className="nav-link">Tutor Board</Link>
              </li>
            )}

            {ShowSubjectCoordinator && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/subjectcoordinator"} className="nav-link">Subject Coordinator Board</Link>
              </li>
            )}

            {showStudent && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/student"} className="nav-link">Student Board</Link>
              </li>
            )}

            {/* {currentUser && (
              <li className="nav-item" style={{paddingLeft: "150px"}}>
                <Link to={"/user"} className="nav-link">User</Link>
              </li>
            )} */}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto navbar-spread-style">
              <li className="nav-item">
                <Link to={"/account"} className="nav-link">My Account</Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
              </li>
            </div>
            ) : (
          <div className="navbar-nav ml-auto navbar-spread-style">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">Login</Link>
            </li>
          </div>
          )}
        </nav>

        <div className="container" style={{marginTop: 20}}>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route path="/student" component={BoardStudent} />
            <Route path="/tutor" component={BoardTutor} />
            <Route path="/subjectcoordinator" component={BoardSubjectCoordinator} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;