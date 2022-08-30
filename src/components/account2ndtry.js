import { useSelector } from "react-redux";
import React, {useState, useEffect, Component } from "react";
import { Redirect } from 'react-router-dom';
import UserDataService from '../services/user-service';
import RoleDataService from '../services/role-service';

class AccountTried extends Component {
  constructor(props) {
    super(props);
    // this.retrieveSubjects = this.retrieveSubjects.bind(this);
    this.retrieveUser = this.retrieveUser.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveSubject = this.setActiveSubject.bind(this);

    this.state = {
        currentUser: "",
        student: false,
        firstLogin: true,
        studentId: "",
        // showStudent: false,
        // setShowStudent: null,
    };

    // this.useSelector((state) => {
    //     this.currentUser = state.auth
    // })
    
    // this.useEffect((setShowStudent) => {
    //     if (this.state.currentUser) {
    //       setShowStudent(this.state.currentUser.roles.includes("ROLE_STUDENT"));
    //     }
    //   }, [this.state.currentUser])
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
        <div>
            {!firstLogin ? (
                <div>
                    <div className="container" style={{fontFamily: "Times New Roman"}}>
                        <><header className="jumbotron" style={{ textAlign: "center" }}>
                            {/* <h3><strong>{currentUser[0].username}</strong></h3> */}
                            <h3><strong>{currentUser[0].username}'s</strong> Account</h3>
                            {/* .charAt(0).toUpperCase() + currentUser[0].username.slice(1) */}
                            </header>
                            <p>
                                <strong>Id:</strong> {currentUser[0]._id}
                            </p>
                            <p>
                                <strong>Email:</strong> {currentUser[0].email}
                            </p>
                            {/* <strong>Authorities:</strong><ul>
                            {currentUser[0].roles &&
                                currentUser[0].roles.map((role, index) => <li key={index}>{role}</li>)}
                            </ul> */}
                        </>
                    </div>
                </div>
            ) : 
            (<></>
         )}
        </div>
    );
  }
}

export default AccountTried