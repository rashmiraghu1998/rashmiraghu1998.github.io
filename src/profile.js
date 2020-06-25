import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from './admin_homepage'
import Button from '@material-ui/core/Button';
import Details from './Details'
import Users from './users';
const drawerWidth = 240;

const useStyles = (theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false, profile: "home"}
    this.update = this.update.bind(this);
  }
  update(event) {
    var self = this;
    var value = event.currentTarget.value;
    console.log(event);
    console.log(value);
    console.log(event)
    this.setState({profile: event.currentTarget.value})
    event.preventDefault();
  }


  render(){
    const classes =  this.props;
  
    const handleDrawerOpen = () => {
     this.setState({open: true})
    };
  
    const handleDrawerClose = () => {
     this.setState({open: false})
    };


  
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
             Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon /> 
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Profile', 'Home', 'Users', 'Logout'].map((text, index) => (
                       <Button fullWidth  color="primary" value={text} onClick={this.update} >
                       {text}
                     </Button>
              
            ))}
          </List>

         
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {(() => {
        switch (this.state.profile) {
          case "Home":   
          console.log("home")
          return <Home />;
          case "Profile": 
          console.log("Profile")
          return <Details/>;
          case "Logout":
            console.log("here logout")
            console.log("here logout")
            localStorage.setItem("bearer_token", "Bearer")
            localStorage.setItem('emailId', "")
            localStorage.setItem("username", "")
            return <Redirect to='/admin'  />
          case "Users":
            return <Users/>
          default: 
          //console.log("Profile")
          return <Home/>;
        }
      })()}
        </main>   
      </div>
    );
  }
}

export default withStyles(useStyles)(Profile);