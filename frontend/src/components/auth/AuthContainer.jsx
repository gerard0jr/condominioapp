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

          <Link exact to="/login" 
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
              <Button color="inherit">Iniciar sesión</Button>
            </Link>
            </Toolbar>
        </AppBar>
        
      </div>
    )
  }
}
