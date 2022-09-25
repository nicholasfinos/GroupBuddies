import React, { Component } from "react";
import SubjectDataService from "../services/subject-service";
import TutorDataService from "../services/tutor-service";
import { Link, Switch, Route } from "react-router-dom";
import { Button, Input } from "@material-ui/core";
import viewSubject from "../components/viewSubjects";
import { Grid, ListItem } from "@material-ui/core";
import PeerRequestDataService from "../services/peer-request-service";
import viewPeerRequests from "./viewPeerRequests";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class EditPeerRequest extends Component {
    constructor(props) {
        super(props);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.updateRequest = this.updateRequest.bind(this);

        this.state = {
            id: null,
            subjectName: "",
            username: "",
            yesPeers: [],
            noPeers: [],
            message: "",
            currentIndex: -1,
            status: null,
            creator: "",
        }
    }

    componentDidMount() {
        const URL = String(this.props.location.pathname);
        const requestId = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.getRequest(requestId);
    }

    //   retrieveRequests() {
    //     const URL = String(this.props.match.path);
    //     const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
    //     PeerRequestDataService.getPeerRequests(username)
    //       .then(response => {
    //         this.setState({
    //           requests: response.data
    //         });
    //         console.log(response.data);
    //       })
    //       .catch(e => {
    //         console.log(e);
    //       }
    //       );
    //   }

    //   refreshList() {
    //     this.retrieveRequests();
    //     this.setState({
    //       currentRequest: null,
    //       currentIndex: -1
    //     });
    //   }

    getRequest(requestId) {
        const URL = String(this.props.match.path).slice(0, -1);
        // console.log(this.props.match.path)
        const username = String(URL.substring(URL.lastIndexOf("/") + 1, URL.length));
        this.setState({ username: username })
        PeerRequestDataService.getPeerRequest(username, requestId)
            .then((response) => {
                this.setState({
                    id: response.data[0]._id,
                    subjectName: response.data[0].subjectName,
                    creator: response.data[0].username,
                    yesPeers: response.data[0].yesPeers,
                    noPeers: response.data[0].noPeers,
                    status: response.data[0].status,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            }
        );
    }

    onChangeStatus(e) {
        console.log(e.target.value);
        this.setState({ status: e.target.value, message: "" });
    }

    updateRequest() {
        var data = {
            id: this.state.id,
            username: this.state.creator,
            subjectName: this.state.subjectName,
            yesPeers: this.state.yesPeers,
            noPeers: this.state.noPeers,
            status: this.state.status,
        };
        
        PeerRequestDataService.updatePeerRequest(this.state.username, data.id, data)
          .then((response) => {
            this.setState({
                id: response.data.id,
                creator: response.data.creator,
                subjectName:response.data.subjectName,
                yesPeers: response.data.yesPeers,
                noPeers: response.data.noPeers,
                status: response.data.status,
                message: ""
            });
            console.log(response.data);
            window.location.reload();
          })
          .catch((e) => {
            console.log(e);
          });
    }

    goBack = (username) => {
        this.props.history.push("/request/view/" + username);
        window.location.reload();
    }

    render() {
        const { subjectName, username, yesPeers, noPeers, creator, status } = this.state;

        return (
            <div style={{ fontFamily: "Times New Roman", textAlign: "center" }}>
                <h3>Peer Request for <i>{subjectName}</i> by <i>{creator}</i></h3>
                <form>
                    <label htmlFor="username">Subject Name: {subjectName}</label>
                    <br />
                    <label htmlFor="subject-topics">Created By: {creator}</label>
                    <br />
                    <div className="form-group">
                        <label htmlFor="group-assessment">Status:</label>
                        {!status ? (
                             <select className="border" style={{ minWidth: "500px" }} value={status} onChange={this.onChangeStatus} validations={[required]} >
                                <option default value="false">Idle</option>
                                <option value="true">Actioned</option>
                            </select>
                        ) : (
                            <select className="border" style={{ minWidth: "500px" }} value={status} onChange={this.onChangeStatus} validations={[required]} >
                             <option value="false">Idle</option>
                             <option default value="true">Actioned</option>
                            </select>
                        )}
                    </div>
                    <br />
                    <div className="list-group">
                        <h2>Peers You Wish To Be With:</h2>
                        <div className="list-group">
                            {yesPeers && yesPeers.map((yesPeer, index) => (
                            <ListItem divider button style={{ padding: "20px" }} key={index}>
                                {"Name: " + yesPeer.username}
                            </ListItem>
                            ))}
                        </div>

                        <br />
                        <br />
                        <h2>Peers Don't You Wish To Be With:</h2>
                        <div className="list-group">
                            {noPeers && noPeers.map((noPeer, index) => (
                            <ListItem divider button style={{ padding: "20px" }} key={index}>
                                {"Name: " + noPeer.username}
                            </ListItem>
                            ))}
                        </div>
                    </div>
                    <div>
                        <br />
                        <Button size="small" variant="contained" style={{ maxWidth: "700px", marginLeft: "225px" }} onClick={this.updateRequest}>Save</Button>
                        <Link style={{ WebkitTextFillColor: "black" }} to={"/request/view/" + username}>Go Back?</Link>
                        <Switch>
                            <Route path={"/request/view/" + username} component={viewPeerRequests} />
                        </Switch>
                    </div>
                </form>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default EditPeerRequest;