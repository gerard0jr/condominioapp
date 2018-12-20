import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
import { Link } from 'react-router-dom'
import { profile, logout } from './services/auth'

import {AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Menu, ChevronLeft, ChevronRight, Home} from '@material-ui/icons';

class App extends Component {
  state = {
    left: false,
    user: {}
  }
   componentDidMount = () => {
     profile()
     .then(res => {
      if(res.status === 403) return this.setState({user: null})
      return this.setState({user:res})
     })
     .catch(err => console.log(err))
    }

    logout = () => {
      logout()
      .then(res => {
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
    }

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open })
  }
  
  render() {
    const { left, user } = this.state
    const { logout } = this
    console.log(user)
    const sideList = (
      <div style={{width: 250}}>
        <List>

          <Link exact to="/" 
            style={{textDecoration: "none"}}>
            <ListItem button >
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Link>
          
          <ListItem onClick={logout} button >
            <ListItemIcon><Home/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

        </List>
      </div>
    );
    return (
      <div className="App">
       <AppBar style={{backgroundColor:"#03a9f4"}} position="static">
            <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)}
                style={{ marginLeft: -12, marginRight: 20,}} 
                color="inherit" 
                aria-label="Menu">
                <Menu />
            </IconButton>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
            <IconButton style={{borderRadius:0}} onClick={this.toggleDrawer('left', false)}>
              { left ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
            <Divider/>
            <div tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}>
                {sideList}
            </div>
            </Drawer>
            <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                CONDOMI
            </Typography>
            {user == null ? <Link style={{borderRadius:"5px", textDecoration:"none", color:"white", backgroundColor:"#8bc34a"}} to="/login">
              <Button color="inherit">Inicia Sesión</Button>
            </Link> : <Link style={{borderRadius:"5px", textDecoration:"none", color:"white", backgroundColor:"#8bc34a"}} to="/">
              <Button color="inherit">Inicio</Button>
            </Link>}
            </Toolbar>
        </AppBar>
        <Routes/>
      </div>
    );
  }
}

export default App;
