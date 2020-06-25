import MultipleValueTextInput from 'react-multivalue-text-input';
import React, { Component } from 'react';
import Course from './course'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import HandlerProfile from './handler_profile'
import { FormControlLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";

import axios from 'axios';
const tagsList = [];

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
class TagDetails extends Component {

  constructor(props)
  {
    super(props);
    this.state = {tags: [], fireRedirect: false, contentId: this.props.contentId, courseCode: this.props.courseCode}
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    

    var self = this;
    console.log(self)
    console.log(this.props.contentId)
    console.log(this.props.courseCode)
    self.setState({tags: tagsList, fireRedirect:true})
    console.log(self.state.tags);
    console.log(tagsList);
   
    
        var self = this;
        console.log(self);
        
        var payload=
          {
           tags: tagsList
          }

          var headers = {
            "Authorization":localStorage.getItem("bearer_token")
          }
        
        axios.post((window.url_prefix+"/college/BMS/branch/CSE/sem/5/course/"+this.state.courseCode+"/content/"+this.state.contentId+"/tags"), payload, {headers: headers})
        .then(function (response) {
        if(response.status == 200){
        console.log("Successfully added");
       
        self.setState({fireRedirect:true});   
        self.props.handleModalClose(); 
    
         }
        })
        .catch(function (error) {
        console.log(error);
        alert("You have been logged out due to security reasons...You will be redirect to the mainpage page if you click on 'OK'");
        self.setState({redirect:true, url: "/" }); 
        self.props.handleModalClose();
    
        });
      
      
        event.preventDefault();

        }



  
  render() {

    const {classes}  = this.props;
    return(
  


  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add tags
          </Typography>
           
              <form onSubmit = {this.handleSubmit} >
              
<br/>
<br/>
<b>
                <h5>

                Please enter out the tags corresponding 
                <br/>to the content </h5></b>

                <h6>Tags</h6>
                <Grid item md={8} >
                <MultipleValueTextInput width="100%"
                    onItemAdded={(item, allItems) => tagsList=allItems}
                    onItemDeleted={(item, allItems) =>  tagsList=allItems}
                    
                    placeholder="Enter keywords; separate them with COMMA or ENTER."
                />
              </Grid>
                 
    

            <Grid container justify="flex-end">
              <Grid item>
              </Grid>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
            >
              Create
            </Button>
            </Grid>
  


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

   
     
    )
  }
}


export default withStyles(useStyles)(TagDetails);