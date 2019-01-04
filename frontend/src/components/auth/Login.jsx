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
                this.props.history.push('/app')
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
      <div style={{marginBottom:"1em"}}>
        <div style={{
        width:"100vw",
        height:"40vh",
        position: "relative"
        }}>
          <div style={{
              width:"100%",
              height:"100%",
              backgroundColor:"rgba(0,0,0,0.15)",
              position: "absolute",
              top:"0",
              left:"0"
          }}></div>
          <div style={{
              backgroundImage:'url(/loginBanner2.jpg)',
              backgroundSize:"cover",
              backgroundRepeat:"no-repeat",
              backgroundPosition:"center",
              width:"100%",
              height:"100%"
              }}>
          </div>
          <div style={{
              textAlign: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5em",
              fontFamily: "Roboto",
              textShadow: "1px 1px 4px #000"
          }}><h2>¡Hola!</h2><h2> Ingresa a Querido Vecino</h2>
          </div>
        </div>
        <h3>Ingresa tus datos</h3>
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
       
        <Button type="submit" id="sendButton" disabled={disabled} variant="contained" color="secondary" style={{margin:"1em"}}>
            Iniciar sesión
        </Button>
        <div>
          <Button id="googleButton" color="secondary" style={{backgroundColor:"#34a853", margin:"1em", color:"white"}}>
            Inicia sesión con Google
          </Button>
        </div>
        <div>
          <small>¿No tienes cuenta? <Link style={{textDecoration:"none"}} to="/auth/signup">Crea una aquí</Link> </small> 
        </div>
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