import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const CreateNewSubject = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [subjectName, setSubjectName] = useState("");
  const [tutorialNumbers, setTutorialNumbers] = useState("");
  const [groupAssessment, setGroupAssessment] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeSubjectName = (e) => {
    const subjectName = e.target.value;
    setSubjectName(subjectName);
  };

  const onChangeTutorialNumbers = (e) => {
    const tutorialNumbers = e.target.value;
    setTutorialNumbers(tutorialNumbers);
  };

  const onChangeGroupAssessment = (e) => {
    const groupAssessment = e.target.value;
    setGroupAssessment(groupAssessment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
  };

  return (
        <Form style={{textAlign: "center", maxWidth: '100%', fontFamily: "Times New Roman"}} className="form" onSubmit={handleSubmit} ref={form}>
            <h3 style={{color: "light grey"}}>Create a New Subject</h3>
                <div className="card">
                    <div className="form-group">
                        <label htmlFor="subject-name">Subject Name: </label>
                        <Input className="form-control" style={{minWidth: '500px'}} type="text" name="username" value={subjectName} onChange={onChangeSubjectName} validations={[required]}/>
                    </div>
                    
                    <div className="form-group">
                        <label style={{marginLeft: "220px"}} htmlFor="tutorial numbers">Number of Tutorials:</label>
                        <select className="form-group border" style={{minWidth: "500px"}} onChange={onChangeTutorialNumbers} validations={[required]}>
                            <option value="" disabled selected>Select your option</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label style={{marginLeft: "220px"}} htmlFor="group-assessment">Group Assessment:</label>
                        <select className="border" style={{minWidth: "500px"}} onChange={onChangeGroupAssessment} validations={[required]}>
                            <option value="" disabled selected>Select your option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    
                    {/* subject topics */}
                    <div className="form-group">
                        <label style={{marginLeft: "220px"}} htmlFor="subject-topics">Subject Topics:</label>
                        <textarea className="border" style={{minWidth: "500px"}} id="topics" name="topics" rows="5" placeholder="Please seperate each topic with a comma..." validations={[required]}></textarea>
                    </div>

                    {/* assign tutors */}
                    <div className="form-group">
                        <label style={{marginLeft: "220px"}} htmlFor="subject-topics">Assign Tutors:</label>
                        <div id="checkboxes" style={{minWidth: "500px"}} >
                            {/* to be made dynamic with list of tutor names*/}
                            <label style={{display: "inline-flex"}}  for="one"><input style={{width: "auto"}} type="checkbox" id="one" value="John Doe" validations={[required]}/>John Doe</label>
                        </div>
                    </div>    
                </div>
                
                <div>
                    <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
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
};

export default CreateNewSubject;