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
import FileViewer from 'react-file-viewer';
import Paper from '@material-ui/core/Paper'
import GetAppIcon from '@material-ui/icons/GetApp';
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

const type = 'pdf'
const useStyles = (theme => ({
  paper: {
  
    // /* spacing as needed */
  
    /* let it scroll */
   overflowY: "auto",
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class LoadDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {items:[],Branch: "", file: props.file, Semester: "", Credits: "", url: "/homepage", course_code: props.courseCode, content_id: localStorage.getItem("contentId")}
    console.log(props);
    this.getContent();
    console.log(props);
  }
  



  // getContent = async () => {
  //   console.log(this.props.courseCode)
  //   let res = await axios.get(window.url_prefix+"/college/BMS/branch/CSE/sem/5/course/"+this.state.course_code+"/content/"+this.state.content_id, {headers: window.bearer_token});
  //   let { data } = res.data;
  //   this.setState({ items: res.data});
  //   console.log(this.state.items);
  // };

  getContent(){
    var self = this;
  var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/course/"+this.state.course_code+"/content/"+this.state.content_id;

  var header = { "Authorization": localStorage.getItem("bearer_token")};
  axios.get(apiBaseUrl,  {
    headers: header}  )
  .then(function (response) {
  if(response.status == 200){
      console.log(response.data);

      self.setState({items: response.data})

      console.log(self.state.items)
  
   }

  })
  .catch(function (error) {
  console.log(error);
  alert("You have been logged out due to security reasons...You will be redirect to the mainpage page if you click on 'OK'");
  self.setState({redirect:true, url: "/" }); 
  self.props.handleModalClose();

  });

  }
  render() {
    const { classes } = this.props;

    if(this.state.redirect)
    {
      return <Redirect to={this.state.url}/>
    }
    return (

<div className={classes.paper}>
      <br>
      </br>
      <Grid container spacing={3}>
        <Grid item xs align="center">
        <a href={this.state.file} download>
           <Avatar>
             <GetAppIcon/>
             </Avatar></a><br/>
             Download
             <br/>
             <br/>
             { Object.keys(this.state.items).map(key => 
                 <Container  maxHeight="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
        {this.state.items[key].map((tile) => (
           
           <Grid>

           <h5>Id: {tile.id}</h5>
           <h5>Name: {tile.name}</h5>
           <h5>Course code: {tile.course_code}</h5>
           <h5>Author: {tile.author}</h5>

           
               </Grid>  

          ))}
        </Grid>
      </Container> 
       ) }
            

         
        </Grid>
        <Grid item xs={9}>
          
            
      <FileViewer 
        fileType={type}
        filePath={this.state.file}
/>
        </Grid>
        
      </Grid>
    

 
    </div>
       );
  }

}

export default withStyles(useStyles)(LoadDetails);