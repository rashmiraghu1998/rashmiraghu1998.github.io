import React, { Component } from "react";
import axios from 'axios';
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
  
  const useStyles = theme => ({
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
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  });

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {email: '', password: '',  loginStatus:false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        
      }
    
      handleChange(event) {
        this.setState({email: event.target.value}); 
      }
       handleChangeValue(event) {
        this.setState({password: event.target.value});
      }  
        
       
      handleSubmit(event) {
        var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
        var self = this;
        console.log(this);
        var payload={
        "id": this.state.email,
        "type": "admin",
        "password":this.state.password
        }
        axios.post(apiBaseUrl+"user/login", payload)
        .then(function (response) {
        console.log(response);

        if(response.status == 200){
        console.log("Login successful");
        window.bearer_token = "Bearer " +" "+response.data.token;
        localStorage.setItem("bearer_token", window.bearer_token)
        
        localStorage.setItem("username", response.data.user.name)
        localStorage.setItem("emailId", response.data.user.id)

        self.setState({loginStatus:true, id: response.data.user.id, username: response.data.user.name}); 
        }
       
       
        })
        .catch(function (error) {
        console.log(error);
        alert("Something seems to be wrong....\n Please retry with a different username/password")
        });

        event.preventDefault();
        }
  
      
           
    render() {
        const { classes } = this.props;
        if(this.state.loginStatus){
            return <Redirect to='/homepage'  />
         }
 
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form method="post" className={classes.form} onSubmit={this.handleSubmit} validate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={this.state.email} onChange={this.handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password} onChange={this.handleChangeValue}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
  
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>

    
        );


    }

}
export default withStyles(useStyles)(Login);