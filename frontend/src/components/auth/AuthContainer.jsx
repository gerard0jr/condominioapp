import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import {AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Menu, ChevronLeft, ChevronRight, Home} from '@material-ui/icons';

export default class AuthContainer extends Component {
  state = {
    left: false,
    user: {},
  }


  toggleDrawer = (side, open) => () => {
    this.setState({ [side]: open })
  }
  
  render() {
    const { left } = this.state
    const sideList = (
      <div style={{width: 250}}>
        <List>

          <Link exact to="/auth/login" 
            style={{textDecoration: "none"}}>
            <ListItem button >
              <ListItemIcon><Home/></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
          </Link>

        </List>
      </div>
    )
    return (
      <div style={{marginBottom:"4em"}}>
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
            </Toolbar>
        </AppBar>
        
      </div>
    )
  }
}
