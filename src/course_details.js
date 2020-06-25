import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Redirect } from "react-router-dom";
import Course from './course'
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        XkilUp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = (theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {items:[],Branch: "", Semester: "", Credits: "", course_code: "", course_name: ""}
    this.handleSubmit();
    this.handleSave = this.handleSave.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.handleCreditChange = this.handleCreditChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
  }

  handleCreditChange(event) {
    this.setState({Credits: event.target.value}); 
  }
  handleSemesterChange(event) {
    this.setState({Semester: event.target.value}); 
  }
  handleBranchChange(event) {
    this.setState({Branch: event.target.value}); 
  }

  handleSave() {
    var apiBaseUrl = "http://localhost:8080/update_course";
    var self = this;
    console.log(this);
    var course_name = this.props.course_name
    var course_code = this.props.course_code
    var payload = {"course_name": course_name,
    "course_code":course_code,
    "credits": this.state.Credits,
    "redirect": false,
"semester":this.state.Semester,"branch": this.state.Branch,
"syllabus_file_name": this.state.items.Syllabus_file_name,
"syllabus_file_type": this.state.items.Syllabus_file_type,
"syllabus_url": this.state.items.SyllabusUrl

}
console.log(this.props)
console.log(payload)
    // axios.put(apiBaseUrl, payload)
    // .then(function (response) {
      
    // if(response.status == 200){

    //     console.log(response.data);
    //     self.setState({redirect: true});
 
    //  }

    // else{
    // console.log("Error");
    // alert("Error");
    self.setState({redirect:false}); 

 
    // }    
    self.props.handleClose();

    // })
    // .catch(function (error) {
    // console.log(error);
    // });

    }
handleSubmit() {
        var apiBaseUrl = "http://localhost:8080/get_course";
        var self = this;
        console.log(this);
        var course_name = this.props.course_name
        var course_code = this.props.course_code
        axios.get(apiBaseUrl+"?courseName="+course_name+"&courseCode="+course_code)
        .then(function (response) {
        if(response.status == 200){
            console.log(response.data);
            self.setState({items:response.data, Branch: response.data.Branch, Semester: response.data.Semester, Credits: response.data.Credits});
         }
        else{
        console.log("Error");
        alert("Error");
        self.setState({redirect:false}); 

        }
        })
        .catch(function (error) {
        console.log(error);
        });

        }
       

    render() {
        const { classes } = this.props;
        const  item=this.state.items;
        
        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Course
          </Typography>
        
         
          <form className={classes.form} noValidate>
            {/* <h6>Course Name: <input disabled value={this.props.course_code}/></h6>
            <h6>Course Code: <input disabled value={this.props.course_name}/></h6>
            <h6>Credits <input  value={this.state.Credits} onChange={this.handleCreditChange}/></h6>
            <h6>Branch: <input  value={this.state.Branch} onChange={this.handleBranchChange}/></h6>
            <h6>Semester:  <input  value={this.state.Semester} onChange={this.handleSemesterChange} /></h6> */}
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="course_name"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="Name"
                  value={localStorage.getItem("course_name")} onChange={this.handleChangeName}
                  label="Name"
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                 disabled
                  fullWidth
                  id="course_code"
                  label="Course code"
                  value={localStorage.getItem("course_code")} onChange={this.handleChangeCode}
                  name="course_code"
                />
              </Grid>

             
   
            </Grid>
            </form>

     </div>
        <Box mt={5}>
          <Copyright />
        </Box>

      </Container>
      );
    }

}

export default withStyles(useStyles)(CourseDetails);