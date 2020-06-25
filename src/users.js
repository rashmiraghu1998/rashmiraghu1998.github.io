import React, { Component ,  useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Redirect } from "react-router-dom";
import { Grid } from '@material-ui/core';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = ((theme) => ({
  root: {
    flexGrow: 4,
    backgroundColor: theme.palette.background.paper,
  },
}));


class Users extends Component {
  
  constructor(props){
    super(props)
    this.state={users: [], courses: [], value:0 , url: "/homepage", redirect: false}
    this.courses = this.courses.bind(this)
    this.users = this.users.bind(this)
    this.courses();
    this.users();
  }
    handleChange = (event, newValue) => {
      this.setState({value: newValue})
  };

    courses(){
    var self = this;
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    axios.get(apiBaseUrl+"course", {headers: {"Authorization": localStorage.getItem("bearer_token")}})
    .then(function (response) {
    if(response.status == 200){
        console.log(response.data.courses);
        self.setState({courses:response.data.courses})
        console.log(self.state)
     }
    })
    .catch(function (error) {
    console.log(error);
    alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
    self.setState({redirect:true, url: "/admin" }); 
    self.props.handleModalClose();

    });
  }

  users(){
    var self = this;
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    axios.get(apiBaseUrl+"user", {headers: {"Authorization": localStorage.getItem("bearer_token")}})
    .then(function (response) {
    if(response.status == 200){
        console.log(response.data.users);
        self.setState({users:response.data.users})
        console.log(self.state)
     }
    })
    .catch(function (error) {
    console.log(error);
    alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
    self.setState({redirect:true, url: "/admin" }); 
    self.props.handleModalClose();

    });
  }

  render() {

    const classes = this.props
    const users = this.state.users
    const courses = this.state.courses

    if(this.state.redirect)
    {
      return <Redirect to={this.state.url}/>
    }
    console.log(users)
    var userColumns = [
      {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'emailId',
        field: 'id',
        sort: 'asc',
        width: 270
      },
      {
        label: 'User type',
        field: 'type',
        sort: 'asc',
        width: 270
      }
      
     
    ];
  
    console.log(this.state.users)
   var userData = {
     columns: userColumns,
     rows: users
   }
   var courseColumns = [
    {
      label: 'CourseCode',
      field: 'id',
      sort: 'asc',
      width: 270
    }
  ];

  console.log(this.state.users)
 var courseData = {
   columns: courseColumns,
   rows: courses
 }


    return (
      <div className={classes.root}>
  <Grid container 
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      
      style={{ top: '100px', position:"absolute" }}>
        
          <Tabs
             // a number of your choice
            
            value={this.state.value}
            onChange={this.handleChange}
            
          >
            <LinkTab style={{minwidth:'500px' }} label="Users"  {...a11yProps(0)} />
            <LinkTab label="Courses"  {...a11yProps(1)} />
            
          </Tabs>
        
        <TabPanel value={this.state.value} index={0}>

         <MDBDataTable
         
         
         hover
         data={userData}
       />

        
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        {/* {courses.map(home => <div>{home.CourseName}</div>)} */}
      
        <MDBDataTable

      hover
      data={courseData}
    />
        
        </TabPanel>
      
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(Users);


