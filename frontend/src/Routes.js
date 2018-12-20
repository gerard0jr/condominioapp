import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeComponent from './components/home/HomeComponent';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/home/Profile';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/logout" component={HomeComponent} />
    </Switch>
  )
}

export default Routes
