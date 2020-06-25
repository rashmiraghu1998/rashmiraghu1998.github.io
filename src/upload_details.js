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
import TagDetails from './tag_details'
import { Redirect } from "react-router-dom";
import Course from './course'
import axios from 'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

class UploadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {items:[],Branch: "",files: "", check: "", url: "/homepage", contentId: "", url_redirect: false, Semester: "", Credits: "", course_code: "", redirect: false, course_name: "", name: "", type:"", author: "", unit: ""}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange. bind(this)
    this.handleUnitChange = this.handleUnitChange.bind(this)
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
    this.onChangeHandler = this.onChangeHandler. bind(this)
  }

  handleNameChange(event) {
    this.setState({name: event.target.value}); 
  }
  handleTypeChange(event) {
    this.setState({type: event.target.value}); 
  }
  handleAuthorChange(event) {
    this.setState({author: event.target.value}); 
  }
  handleUnitChange(event) {
    this.setState({unit: event.target.value}); 
  }

  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }
  onChangeHandler(event)
  {
    this.setState({files: event.target.files[0]})
    console.log("Here"+event.target.files[0]);
    console.log(this)
  }
  handle() {
    var self = this;
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    var self = this;
    console.log(self);
    console.log(self.state.files)
    var bodyFormData = new FormData();
    bodyFormData.append("file", self.state.files)
      var headers = {
        "Authorization": localStorage.getItem("bearer_token")
      }
    console.log(self)
    axios.post(apiBaseUrl+`course/${self.props.courseCode}/content/upload`, bodyFormData, {headers: headers})
    .then(function (response) {
    if(response.status == 200){
    console.log("Successfully added");
    // payload.append("object_name", response.data.object_name)
    axios.post(window.url_prefix+`/college/BMS/branch/CSE/sem/5/course/${self.props.courseCode}/content`,   {
      "name": self.state.name,
      "object_name": response.data.object_name,
      "type": self.state.files.type,
      "author":self.state.author,
      "unit": self.state.unit
    }, {headers: headers})
    .then(function (response) {
    if(response.status == 200){
    console.log("Successfully added");
    self.setState({redirect:true, contentId: response.data.id});    
     }
    })
    .catch(function (error) {
    console.log(error);
    alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
    self.setState({ url_redirect: true, url: "/handler" }); 
    self.props.handleModalClose();

    });
     }

    })
    .catch(function (error) {
    console.log(error);
    alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
    self.setState({url_redirect:true, url: "/handler" }); 
    self.props.handleModalClose();

    });
    console.log(self.state)
    event.preventDefault();
    }

   
  handleSubmit(event) {
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    var self = this;
    console.log(self);
    console.log(self.state.files)
    
    self.handle();
   
   

    event.preventDefault();
    }

       

    render() {
        const { classes } = this.props;
        const  item=this.state.items;
        if(this.state.url_redirect)
        {
          return <Redirect to={this.state.url}/>
        }
        if(this.state.redirect)
        {
          return <TagDetails contentId={this.state.contentId} courseCode={this.props.courseCode} handleModalClose={this.props.handleModalClose}/>
        }
        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create content
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="course_name"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="Course code"
                  value={this.props.courseCode} 
                  label="Course code"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="name"
                  name="course_name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  value={this.state.name} onChange={this.handleNameChange}
                  label="Name"
                  autoFocus
                />
              </Grid>
            
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="type"
                  label="Type"
                  value={this.state.type} onChange={this.handleTypeChange}
                  name="type"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="author"
                  label="author"
                  value={this.state.author} onChange={this.handleAuthorChange}
                  name="author"
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                 
                  name="unit"
                  variant="outlined"
                  required
                  fullWidth
                  id="unit"
                  value={this.state.unit} onChange={this.handleUnitChange}
                  label="unit"
                  autoFocus
                />
              </Grid>
            
             

           
              
<Button
  variant="contained"
 >
 
<input 
              color="primary" class="submit" type="file" name="file" onChange={this.onChangeHandler}/>
</Button>
              
            </Grid>
            <Button
         
         fullWidth
         variant="contained"
         color="primary"
         className={classes.submit}
         type="submit"
       
       >
         Next
      </Button>
     
   
            <Grid container justify="flex-end">
              <Grid item>
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

export default withStyles(useStyles)(UploadDetails);