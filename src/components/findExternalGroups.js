import { Box, Button, Grid, ListItem, Paper, styled, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import userService from "../services/user-service";
import subjectService from "../services/subject-service";
import "./findExternalGroups.css";

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

const FindExternalGroups = () => {
  const [currentStudent, setCurrentStudent] = useState();
  const [subjects, setSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState();
  const [availableGroups, setAvailableGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();

  useEffect(async () => { // Get the student
    const URL = window.location.href;
    const username = URL.substring(URL.lastIndexOf("/") + 1, URL.length);

    await userService.getUser(username)
      .then((data) => {
        setCurrentStudent(data.data[0]);

        subjectService.viewAllSubjects(data.data[0].username)
          .then((data) => {
            setSubjects(data.data);
          })
      });
  }, []);

  const getSubjectGroups = (subject) => {
    if (currentSubject !== subject) {
      setCurrentSubject(subject);

      subjectService.getAllStudyGroups(subject, currentStudent.studentName)
        .then((data) => {
          setAvailableGroups(data.data.data);
        });
    }
  }

  const joinStudyGroup = () => {
    const data = {
      groupId: currentGroup._id,
      currentStudent: currentStudent.studentName
    }

    userService.joinStudyGroup(data);
  }

  return (
    <Box>
      <Backing2>
      <Grid align={'center'}>
      <BigText variant="h2">Find External Study Groups</BigText>
      <Typography>Browse created study groups for your classes</Typography>
      </Grid>
      <Grid  align={'center'} container spacing={1} alignItems={'center'}>
        
      <Grid item xs={4} align={'center'} >
      <Box paddingTop={3}>
      <BigText variant="h4">Classes</BigText>
      </Box>
      <Box borderColor={'black'}  minHeight={300} maxHeight={300}  maxWidth={320} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} >
      {subjects.map((subject, index) => (
          <ListItem onClick={() => getSubjectGroups(subject)} key={index}>
            {subject}
          </ListItem>
        ))}
      
      </Box>
      </Grid>

      <Grid item xs={4} align={'center'} >
      <Box paddingTop={3}>
      <BigText variant="h4">Study Groups</BigText>
      </Box>
      <Box borderColor={'black'}  minHeight={300} maxHeight={300}  maxWidth={320} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} >
      {(availableGroups.length > 0) && availableGroups.map((group, index) => (
          <ListItem onClick={() => setCurrentGroup(group)} key={index}>
            {group.name}
          </ListItem>
        ))}
      </Box>

      </Grid>

      <Grid item xs={4} align={'center'} >
      <Box paddingTop={4}>
      <BigText variant="h4">Selected Group</BigText>
      </Box>
      <Box borderColor={'black'}  minHeight={300} maxHeight={300}  maxWidth={320} border={1} bgcolor={'#D3D3D3'} overflow={'auto'} >
      {currentGroup &&
          <>
            <label>{currentGroup.name}</label>
            <p>{currentGroup.ownerName}</p>
            {currentGroup.members.map((member, index) => (
              <ListItem key={index}>
                {member}
              </ListItem>
            ))}
            <Button onClick={() => joinStudyGroup()}>Join Group</Button>
          </>
        }
      </Box>

      </Grid>


   
    </Grid>
    </Backing2>
    </Box>
  )
}

/*
<div className="main">
      <div className="columnDiv">
        <label>Your Subjects</label>
        {subjects.map((subject, index) => (
          <ListItem onClick={() => getSubjectGroups(subject)} key={index}>
            {subject}
          </ListItem>
        ))}
      </div>
      <div className="columnDiv">
        <label>{currentSubject}</label>
        {(availableGroups.length > 0) && availableGroups.map((group, index) => (
          <ListItem onClick={() => setCurrentGroup(group)} key={index}>
            {group.name}
          </ListItem>
        ))}
      </div>
      <div className="columnDiv">
        {currentGroup &&
          <>
            <label>{currentGroup.name}</label>
            <p>{currentGroup.ownerName}</p>
            {currentGroup.members.map((member, index) => (
              <ListItem key={index}>
                {member}
              </ListItem>
            ))}
            <button onClick={() => joinStudyGroup()}>Join Group</button>
          </>
        }
      </div>
    </div>

*/


export default FindExternalGroups;