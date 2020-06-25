import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
export default class HandlerDetails extends Component {
  constructor(props)
  {
    super(props)
    this.state = {password: "", username:localStorage.getItem("username"), url: "/homepage"}
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeValue(event) {
    this.setState({password: event.target.value});
  }  
  handleChange(event) {
    this.setState({username: event.target.value});
  }  
  handleSubmit(event) {
    var apiBaseUrl = window.url_prefix+"/college/BMS/branch/CSE/sem/5/";
    var self = this;
    console.log(this);
    var payload={
    "new_password":this.state.password
    }
    axios.post(apiBaseUrl+"user/_change_password", payload, {headers: {"Authorization": localStorage.getItem("bearer_token")} })
    .then(function (response) {
      console.log(response);
      if(response.status == 200){
      console.log("Successfully added");
       }
     } )
      .catch(function (error) {
      console.log(error);
      alert("You have been logged out due to security reasons...You will be redirect to the login page if you click on 'OK'");
      self.setState({redirect:true, url: "/handler" }); 
      self.props.handleModalClose();
  
      });
  
      event.preventDefault();
      }

  render() {
    if(this.state.redirect)
    {
      return <Redirect to={this.state.url} />
    }

    return (
      

      <div>
        <Grid container 
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}>
        <AccountCircleIcon style={{ fontSize: 200} }/>
        <br/>
        <br/>
        <Container>
        <form method="post" onSubmit={this.handleSubmit} validate>
        <Grid container>
        <Grid item  xs={5}>
        <h4 >User ID: </h4> 
        </Grid>
        <Grid item  xs={5}>
          <input  value= {localStorage.getItem("emailId")} disabled></input>
        
      </Grid>
   
      </Grid>
      <br/>
      <br/>
     
       <Grid container>
        <Grid item  xs={5}>
        <h4 >User Name: </h4> 
        </Grid>
        <Grid item  xs={5}>
          <input  value= {this.state.username} onChange={this.handleChange} disabled></input>
        
      </Grid>
</Grid>
<br/>
      <br/>
      <Grid container>
        <Grid item  xs={5}>
        <h4 >Change password </h4> 
        </Grid>
        <Grid item  xs={5}>
         
        <input
                
                  required
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password} onChange={this.handleChangeValue}
                  autoComplete="current-password"
                />
      </Grid>
      </Grid>
      <br/>
      <br/>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"

           
            >
              Save
            </Button>
</form>
      </Container>
      </Grid>
      </div>

    )
  }
}
