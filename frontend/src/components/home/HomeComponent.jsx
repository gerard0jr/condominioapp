import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { logout } from '../../services/auth.js'

import {AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Snackbar} from '@material-ui/core';
import {Menu, ChevronLeft, ChevronRight, Home, Close} from '@material-ui/icons';

export default class HomeComponent extends Component {
  state = {
    left: false,
    user: {},
    open: false
  }

    logout = () => {
      logout()
      .then(res => {
        console.log(res)
        this.setState({ open: true })
        this.props.history.push('/auth/login')
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
    const { left, user, open } = this.state
    const { logout, handleClose } = this
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
    )
    return (
      <div>
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
            <Link style={{borderRadius:"5px", textDecoration:"none", color:"white", backgroundColor:"#8bc34a"}} to="/app">
              <Button color="inherit">Inicio</Button>
            </Link>
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
          message={<span id="message-id">Sesión cerrada correctamente</span>}
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
