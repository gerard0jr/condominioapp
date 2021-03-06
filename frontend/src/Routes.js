import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeComponent from './components/home/HomeComponent';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/home/Profile';
import AuthContainer from './components/auth/AuthContainer';
import Landing from './components/home/Landing';
import AdminDash from './components/admin/AdminDash';
import AddResidence from './components/home/AddResidence';
import PublicLanding from './components/home/PublicLanding';
import AddReport from './components/home/AddReport';

const Routes = () => {
  return (<div>
    <Route exact path="/" component={AuthContainer} />
    <Route exact path="/" component={PublicLanding} />
    <Route path="/auth" component={AuthContainer} />
    <Switch>
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/add-residence" component={AddResidence} />
    </Switch>
    <Route path="/app" component={HomeComponent} />
    <Switch>
      <Route exact path="/app" component={Landing}/>
      <Route path="/app/profile" component={Profile} />
      <Route path="/app/admin" component={AdminDash} />
      <Route path="/app/addReport" component={AddReport} />
    </Switch>
  </div>
    
  )
}

export default Routes
