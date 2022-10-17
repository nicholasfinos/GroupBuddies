import React, { useState, useEffect } from "react";
import UserService from "../services/user-service";
import { Grid, Paper, TextField } from "@material-ui/core";
import logo from "../media/groupbuddies-logo.png"
import { styled } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ButtonGroup } from "@material-ui/core";
import { MobileStepper } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { KeyboardArrowLeft } from '@material-ui/icons';
import { KeyboardArrowRight } from '@material-ui/icons';


const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const slideSteps = [
    {
      label: 'Students',
      description: 'Students can easily view and manage class enrollments, along with setting peer preferences for class groupings. Additionally they can create external study groups for classes without in class groupings, to enhance their studies.',},

      {
        label: 'Tutors',
        description:
          'Tutors can quickly manage and view their classes, creating student groupings with our new patent pending algorithmic sorter to create the best experience for all your students.',
      },
      {
        label: 'Subject Coordinators',
        description: `Coordinators can efficiently manage subjects; assigning tutors and accepting student join requests.`,
      },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = slideSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const Item2 = styled(Paper)(({ theme }) => ({
    height: '75vh',
    borderRadius: 20,
    padding: 50,
     background: '#fff0e7',
  }));

  const BigText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
  }));

  const btnstyle = { margin: '10px 0', borderRadius: 10, }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={9}>
        <Grid item xs={6}>
          <BigText variant="h1">
            Groupwork made easy.  
          </BigText>
          <Typography variant="h6">A simplified solution for groupwork for all involved, Group Buddies provides revamped utility 
          for students, tutors and subject coordinators to create effective learning solutions both inside and outside of class.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Item2>
          <Grid align='center' >
          <img src={logo} id="groupbuddieslogo" height="250" alt="" />
        
          <Box sx={{ height: 2, maxWidth: 400, width: '100%', p: 3, bgcolor: '#fff0e7', background: '#fff0e7' }}>
          <Typography variant="h6">How can  <strong>Group Buddies</strong> help you?</Typography>
          </Box>

          <Box sx={{ height: 4, maxWidth: 400, width: '100%', p: 2, bgcolor: '#fff0e7', background: '#fff0e7' }}>
          <Typography variant="body1">{slideSteps[activeStep].label}</Typography>
          </Box>
      
      <Box sx={{ height: 100, maxWidth: 500, width: '100%', p: 2, bgcolor: '#fff0e7', background: '#fff0e7' }}>
      <Typography variant="subtitle2">{slideSteps[activeStep].description}</Typography>
      </Box>
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        style={{ backgroundColor: "transparent" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" background='#fff0e7' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      
      
          
















          </Grid>
          </Item2>
        </Grid>
        
        
      </Grid>
        


    </Box>
  );
};

export default Home;