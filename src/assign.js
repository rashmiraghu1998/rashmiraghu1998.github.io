import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";

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

class Assign extends Component {
  constructor(props) {
    super(props);
    this.state = {users: [], courses: [], assigned: [], handler: "", url: "/homepage", check: false, redirect: false};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.ids = this.ids.bind(this);
    this.getCoursesAndUsers();
  }

  handleChangeValue = (event, values) => {
    this.setState({
      handler: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.handler);
    });
  }
  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }
  onTagsChange = (event, values) => {
    this.setState({
      assigned: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.tags);
    });
  }

    
handleSubmit(event) {
  var self = this;
  var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
  {this.state.assigned.map(e=>{

    var payload={
      'handler': this.state.handler
    }

    var headers = {
      "Authorization": localStorage.getItem("bearer_token")
    }
  axios.patch(apiBaseUrl+"course/"+e, payload, {headers: headers})
  .then(function (response) {
  if(response.status == 200){
    console.log("success")
    self.setState({redirect: true})
   
   }

  })
  .catch(function (error) {
  console.log(error);
  alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
  self.setState({redirect:true, url: "/admin" }); 
  self.props.handleModalClose();
  });
})}
if(self.state.check)
{
  this.setState( {users: [], courses: [],handler: "", assigned: [], redirect: false});
}
else
{
  this.props.handleModalClose();
}
  event.preventDefault();
  
}
  
          

         ids(data, word) {
          switch(word){
            case "id": return data.map(function (d) {
              return d.id})
            case "user": return data.filter(d => d.handler !== "").map(d => {return d.handler}) 
            
          }
          
        }
          getCoursesAndUsers(){
          var self = this;
          var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
          var headers = {
            "Authorization": localStorage.getItem("bearer_token")
          }
          axios.get(apiBaseUrl+"course", {headers: headers})
          .then(function (response) {
          if(response.status == 200){
              console.log(response.data);
              self.setState({courses: Array.from(new Set(self.ids(response.data.courses, "id")))})
              console.log(self.state)
           }

          })
          .catch(function (error) {
          console.log(error);
          alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
          self.setState({redirect:true, url: "/admin" }); 
          self.props.handleModalClose();
      
          });

          axios.get(apiBaseUrl+"user"+"?type=handler", {headers: headers})
          .then(function (response) {
          if(response.status == 200){
              console.log(response.data);
              self.setState({users: Array.from(new Set(self.ids(response.data.users, "id")))})
              console.log(self.state)
           }
          else{
          console.log("Error");
          alert("Error");        
          }
          })
          .catch(function (error) {
          console.log(error);
          });

        event.preventDefault();
        }
       
    render() {
        const { classes } = this.props;
        console.log(this.state.users)
        if(this.state.redirect){
          return <Redirect to={this.state.url}  />
       }

        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Assign courses to users
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
              <Autocomplete
      id="Course_handlers"
      options={this.state.users}
      getOptionLabel={option => option}
      
      onChange = {this.handleChangeValue}
      renderInput={params => <TextField {...params} label="Course Handler" variant="outlined" />}
    />
              </Grid>
              <Grid item xs={12} >
              <Autocomplete
        multiple
        id="tags-outlined"
        options={this.state.courses}
        getOptionLabel={option => option}
        filterSelectedOptions
        onChange = {this.onTagsChange}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Courses"
            placeholder="Courses"
          />
        )}
        />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox  onChange={this.handleChangeCheckbox} color="primary" />}
                  label="Assign to more than one user"
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
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

export default withStyles(useStyles)(Assign);