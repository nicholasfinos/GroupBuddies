import React, { useEffect, useState } from "react";
import userService from "../services/user-service";
import subjectService from "../services/subject-service";
import "./externalGroups.css";
import { Box, Button, ButtonGroup, Grid, Link, ListItem, Paper, styled, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";



const Backing2 = styled(Paper)(({ theme }) => ({
  height: '74vh',
  borderRadius: 20,
  padding: 10,
  margin: 2,
   background: '#fff0e7',
   width: 1200
}));

const BigText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
}));



const CreateGroupPopup = ({ currentStudent }) => {
  const [groupName, setGroupName] = useState("");
  const [subject, setSubject] = useState("");
  const [studentSubjects, setStudentSubjects] = useState([])

  useEffect(() => {
    subjectService.viewAllSubjects(currentStudent.username)
      .then((x) => {
        setStudentSubjects(x.data);
      })
  }, [])

  const createStudyGroup = () => {
    if (currentStudent && groupName !== "" && subject !== "") {
      const group = {
        owner: currentStudent._id,
        ownerName: currentStudent.username,
        groupName: groupName,
        subject: subject
      }

      userService.createStudyGroup(group)
        .then(() => {
          console.log("Study Group Created");
        }).catch(error => {
          console.log(error);
        });

      window.location.reload();
    } else {
      alert("Please select a subject and name your group")
    }
  }

  return (
    <Box>
      <Grid>
        
    <div className="columnDiv" style={{ width: "100%" }}>
      <div>
        <Typography>Group Name</Typography>
        <Box paddingBottom={2} >
        <TextField id="filled-basic"  variant="filled" onChange={(e) => setGroupName(e.target.value)}/>
        </Box>
      </div>
      <div>
      <Typography>Subjects</Typography>
        
        <Box minHeight={100} maxHeight={100}  maxWidth={222} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} paddingBottom={3}>
        {studentSubjects.map((item, index) => (
          <ListItem
            onClick={() => setSubject(item)}
            style={{ padding: "0px" }}
            key={index}
            selected={subject === item}
          >
            {item}
          </ListItem>
        ))}
        </Box>
      </div>
      <Box paddingTop={2}>
      <Button  variant="outlined" onClick={() => createStudyGroup()}>Create Group</Button>
      </Box>
    </div>
   
    </Grid>
    </Box>
  );
}

const ExternalGroup = () => {
  const [currentStudent, setCurrentStudent] = useState();
  const [studyGroups, setStudyGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const [isCreating, setIsCreating] = useState(false);

  let history = useHistory();
  const URL = window.location.href;
  const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

  useEffect(() => { // Get the student
    userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);
      });
  }, []);

  useEffect(() => { // get the student's groups once their id has loaded
    if (currentStudent) {
      userService.getStudyGroups(currentStudent.username)
        .then((data) => {
          setStudyGroups(data.data.data);
        })
    }
  }, [currentStudent])

  const deleteCurrentGroup = () => {
    userService.deleteStudyGroup(currentStudent._id);
    window.location.reload();
  }

  const leaveCurrentGroup = () => {
    const data = {
      groupId: currentGroup._id,
      currentStudent: currentStudent.studentName
    }

    userService.leaveStudyGroup(data);
    window.location.reload();
  }

  const handleFindGroups = () => {
    history.push(`/study/find/${username}`);
  }

  return (

    <Box>
      <Grid align={'center'}>
        <Backing2>
          <BigText variant={'h3'}>My Study Groups</BigText>
           
     
          <Grid container>
        <Grid item xs={4}>
        <Box paddingTop={2} paddingLeft={5}>
        <Grid align="center">
          <Box>
        <BigText variant="h4">Joined Groups</BigText>
        <Box  maxWidth={250} >
        <Typography variant="caption">Study groups you have joined.</Typography>
        </Box>
        <Box borderColor={'black'} minHeight={300} maxHeight={300}  maxWidth={320} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} >
        <div>
          {studyGroups.map((item, index) => (
            <ListItem onClick={() => { setCurrentGroup(item) }} key={index}>
              {item.name}
            </ListItem>
          ))}
          
        </div>
        </Box>
        </Box>
        </Grid>
        </Box>
        </Grid>
        
      

      
        <Grid item xs={4}>
      <Grid align="center">
        <Box paddingTop={2}>
        <BigText variant="h4">Selected Group Info</BigText>
        </Box>
        <Box  maxWidth={250} >
        <Typography variant="caption">Details of selected group.</Typography>
        </Box>
        <Box borderColor={'black'}  minHeight={300} maxHeight={300}  maxWidth={320} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} >
        <div>
          {currentGroup &&
            <ListItem >
              <div className="columnDiv" style={{ width: "100%" }}>
                {currentGroup.ownerName}
                {(currentGroup.ownerName === currentStudent.studentName) ?
                  <button onClick={() => deleteCurrentGroup()}>Delete Current Group</button>
                  :
                  <button onClick={() => leaveCurrentGroup()}>Leave Current Group</button>
                }
              </div>
            </ListItem>
          }
        </div>
        </Box>
        </Grid>
        </Grid>
        

          


        <Grid item xs={3}>
        <Box paddingTop={2}>
           
        <BigText variant="h4">Create or Join a Group</BigText>
        <Box paddingTop={2}>
      <ButtonGroup>
                                disableElevation
                                variant="contained"
                                color='primary'
                                aria-label="Disabled elevation buttons"
                                
                                >
                                <Button onClick={() => handleFindGroups()}>Find Group</Button>
                                <Button onClick={() => setIsCreating(!isCreating)}>Create Group</Button>
                                </ButtonGroup>
      

            
                                </Box>
        </Box>
        {(isCreating) &&
  <CreateGroupPopup currentStudent={currentStudent} />
}
        </Grid>

        
        
      </Grid>
    
      
      

    </Backing2>
    </Grid>
    
    </Box>
  );
}

export default ExternalGroup;