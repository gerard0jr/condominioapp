import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeComponent from './components/home/HomeComponent';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/home/Profile';
import AuthContainer from './components/auth/AuthContainer';
import Landing from './components/home/Landing';

const Routes = () => {
  return (<div>
    <Route path="/auth" component={AuthContainer} />
    <Switch>
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/login" component={Login} />
    </Switch>
    <Route path="/app" component={HomeComponent} />
    <Switch>
      <Route exact path="/app" component={Landing}/>
      <Route path="/app/profile" component={Profile} />
    </Switch>
  </div>
    
  )
}

export default Routes
