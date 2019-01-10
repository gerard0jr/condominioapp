import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { logout } from '../../services/auth.js'
import { getResidence } from '../../services/database'

import {AppBar, Toolbar, Typography, Button, IconButton, 
  Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Snackbar} from '@material-ui/core';
import {Face, Menu, ChevronLeft, ChevronRight, Home, Close, RemoveCircle, InsertChart, ReportProblem} from '@material-ui/icons';

export default class HomeComponent extends Component {
  state = {
    left: false,
    user: {},
    thisUser: JSON.parse(localStorage.user),
    open: false,
    message:"",
    residence: ""
  }
  
  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return this.props.history.push('/auth/login')
    getResidence(user.residence)
    .then(residence => this.setState({residence}))
    .catch(err => console.log(err))

    if (this.props.history.goBack.length === 0) this.setState({ open: true, message: `Bienvenido ${user.name}` })
    return this.setState({ user, isAuth: true });
    
}

    logout = () => {
      logout()
      .then(res => {
        localStorage.removeItem('user')
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
    const { left, open, message, thisUser, residence, user } = this.state
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
          {user.role === "Administrador" ? <Link exact to="/app/admin" 
            style={{textDecoration: "none"}}>
            <ListItem button >
              <ListItemIcon><InsertChart/></ListItemIcon>
              <ListItemText primary="Administrador" />
            </ListItem>
          </Link> : ""}
          <Link exact to="/app/addReport" 
            style={{textDecoration: "none"}}>
            <ListItem button >
              <ListItemIcon><ReportProblem/></ListItemIcon>
              <ListItemText primary="Agregar reporte" />
            </ListItem>
          </Link>
          <Divider/>
          <ListItem onClick={logout} button >
            <ListItemIcon><RemoveCircle/></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

        </List>
      </div>
    )
    return (
      <div className="navMargin">
        <AppBar position="Fixed" style={{color:"white"}}>
            <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)}
                className="drawer-button" 
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
            <img className="imageLogo" src="/logo.png" alt="Logo"/>
            <div className="navCenterMargin">
              <Typography variant="h6" color="inherit">
                  {residence.residenceName}, {residence.number}
              </Typography>
            </div>
            {/* PHOTO */}
            <Link to="/app/profile" className="buttonNav">
              <Button type="submit" id="sendButton" variant="contained" color="secondary" style={{margin:"0.5em", padding:"2px 16px"}}>
                <div style={{display:"flex", flexWrap:"wrap", alignItems:"center"}}>
                  <p>{thisUser.role}</p>
                    <img className="photoNav" src={thisUser.photoURL} alt={thisUser.name}/>
                </div>
              </Button>
            </Link>
            </Toolbar>
        </AppBar>
        <Snackbar
          color="secondary"
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
