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

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', phno: '',  name: "", check: false, redirect: false, url: "/homepage"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value}); 
  }
   handleChangeValue(event) {
    this.setState({phno: event.target.value});
  }  

  handleChangeName(event)
  {
    this.setState({name: event.target.value})
  }
  handleChangeCheckbox(event)
  {
    this.setState({check: event.target.checked})
  }


        handleSubmit(event) {
          var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
          var self = this;
          console.log(this);
          var payload={
          "id_list": [this.state.email],
          "type": "handler"
          }
          console.log(payload)
      
          axios.post(apiBaseUrl+"user/_add", payload, {headers: { "Authorization": localStorage.getItem("bearer_token")}})
          .then(function (response) {
          console.log(response);
          if(response.status == 200){
          console.log("Successfully created user");   
          self.setState({redirect:false}); 
          self.props.handleModalClose();
          }
          })
          .catch(function (error) {
          console.log(error);
          alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
          self.setState({redirect:true, url: "/admin" }); 
          self.props.handleModalClose();
      
          });

        
          event.preventDefault();
          }
       

    render() {
        const { classes } = this.props;
        if(this.state.redirect){
          return <Redirect to={this.state.url} />
       }
        return (<Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create user
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>      
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email_id"
                  label="Email Address"
                  value={this.state.email} onChange={this.handleChange}
                  name="email_id"

                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox  onChange={this.handleChangeCheckbox} color="primary" />}
                  label="create one more user"
                />
              </Grid>
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

export default withStyles(useStyles)(UserSignup);