import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { logout } from '../../services/auth.js'

import {AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Snackbar} from '@material-ui/core';
import {Menu, ChevronLeft, ChevronRight, Home, Close} from '@material-ui/icons';

import Profile from './Profile'

export default class HomeComponent extends Component {
  state = {
    left: false,
    user: {},
    open: false,
    message:""
  }
  
  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return this.props.history.push('/auth/login')
    if (this.props.history.goBack.length === 0) this.setState({ open: true, message: "Bienvenido" })
    return this.setState({ user, isAuth: true });
    
}

    logout = () => {
      logout()
      .then(res => {
        localStorage.removeItem('user')
          this.props.history.push('/')
				
      })
      .catch(err => console.log(err))
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ open: false });
    };

  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open })
  }
  
  render() {
    const { left, open, message, user } = this.state
    const { logout, handleClose } = this
    const sideList = (
      <div style={{width: 250}}>
        <List>

          <Link exact to="/app" 
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
    )
    return (
      <div style={{marginBottom:"6em"}}>
        <AppBar position="Fixed">
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
            {/* PHOTO */}
            <div style={{display:"flex", flexWrap:"wrap", alignItems:"center"}}>
              <p>{user.role}</p>
              <Link to="/app/profile">
                <img style={{
                  width:"40px",
                  height:"40px",
                  borderRadius:"50%",
                  marginLeft:"10px"
                }} src={user.photoURL} alt={user.name}/>
              </Link>
            </div>
            </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}
