import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './globals.js'
import Login from "./login";

import { Redirect } from "react-router-dom";
import home from './admin_homepage';
import courseSignup from './course_signup';
import assign from './assign';
import UserSignup from './user_signup'
import Profile from './profile'
import HandlerProfile from './handler_profile'
import UserProfile from './user_profile'
import HandlerDetails from './Handler_details'
import DatatablePage from './datatable';
import HandlerLogin from './handler_login'
import UserLogin from './user_login'
import Course from './course'
import Random from './random_test'
import FirstPage from './first_page';

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={FirstPage} />
            <Route path='/admin' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/homepage" component={Profile}/>
            <Route path="/course-signup" component={courseSignup}/>
            <Route path="/handler-details" component={HandlerDetails}/>
            <Route path="/random" component={Random}/>
            <Route path="/user-signup" component={UserSignup}></Route>
            <Route path="/assign" component={assign}/>
            <Route path="/data" component={DatatablePage}/>
            <Route path="/handler" component={HandlerLogin}/>
            <Route path="/user" component={UserLogin}/>
            <Route path="/course/:courseCode" component={Course}/>
            <Route path="/user-homepage/:emailId/:username" component={UserProfile} />
            <Route path="/handler-homepage" component={HandlerProfile} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;