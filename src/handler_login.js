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
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import HandlerSignup from './handler_signup';

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
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },

    modal: {
    
  
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto'
    },
    papers: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },

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

class HandlerLogin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {email: '', password: '',  loginStatus:false,       fireRedirect: false,

        user: <HandlerSignup handleModalClose={this.handleModalClose} />, id:'', username: '',
      
        redirect: "/homepage",
        showModal: false,
        open: false
      };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.goToStore = this.goToStore.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  goToStore(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    
    if(value=="u")
      this.setState({fireRedirect: true, redirect: this.state.user});
    else 
      this.setState({fireRedirect: true, redirect: this.state.user});    

    event.preventDefault();
  }

  handleClose(event) {
    this.setState({fireRedirect: false});
  };
  handleModalClose = ()=>{
    this.setState({showModal: false, fireRedirect: false})}

    
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
            "type": "handler",
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
            self.setState({loginStatus:true, id: response.data.user.id, username: response.data.user.name}); 
            }
            })
            .catch(function (error) {
            console.log(error);
            alert("Something seems to be wrong....\nPlease retry with a different username/password\nYou can also try signing up")
            });

            event.preventDefault();
            }
      
           
    render() {
        const { classes } = this.props;
        if(this.state.loginStatus){
            return <Redirect to={"handler-homepage"  } />
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" value="u" onClick={this.goToStore}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={this.state.fireRedirect}
    onClose={this.handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={this.state.fireRedirect} >
      <div className={classes.papers}>
        {this.state.redirect}
      </div>
    </Fade>
  </Modal>
    
    </Container>
   
        );


    }

}
export default withStyles(useStyles)(HandlerLogin);