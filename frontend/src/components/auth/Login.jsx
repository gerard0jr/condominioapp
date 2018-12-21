import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { login } from '../../services/auth'
import { TextField, Button, Snackbar, IconButton } from '@material-ui/core'
import {Close} from '@material-ui/icons';

export default class Login extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {},
        isAuth: false,
        open: false,
        message: ""
    }

    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.setState({ user: {}, isAuth: false });
        this.props.history.push('/app')
    }
    
    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
        login(user)
        .then(res => {
            console.log(res)
            if(res.email){
                console.log('logueado')
                localStorage.setItem('user', JSON.stringify(res))
                this.setState({open: true, message: "Inicio de sesión correcto, ¡Bienvenido(a)!"})
                this.props.history.push('/app/profile')
            }
            return this.setState({open: true, message: "Nombre de usuario o contraseña incorrectos"})
            
        })
        .catch(err => this.setState({message: err}))
    }

    handleChange = input => event => {
        const { user } = this.state
        user[input] = event.target.value
        this.setState({
          user
        })
      }

      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false });
      };

    checkEmail = input => event => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(emailRegEx.test(String(event.target.value).toLowerCase())) return this.setState({error: false, disabled: false})
        this.setState({error: true, disabled: true})
        
    }

  render() {
      const { handleChange, handleSubmit, checkEmail, handleClose } = this
      const { user, disabled, error, open, message } = this.state
    return (
      <div>
          <h2>Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
            <TextField
            error={error}
            required
            id="email"
            label="Email"
            onChange={handleChange('email')}
            onBlur={checkEmail()}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.email}
            margin="normal"
            type="email"
            />
        </div>
        {/* PASSWORD */}
        <div>
            <TextField
            required
            id="password"
            label="Contraseña"
            type="password"
            onChange={handleChange('password')}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.password}
            margin="normal"
            />
        </div>
       
        <Button type="submit" id="sendButton" disabled={disabled} variant="contained" color="primary" style={{margin:"1em"}}>
            Iniciar sesión
        </Button>
        </form>

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