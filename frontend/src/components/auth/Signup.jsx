import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { signup } from '../../services/auth'
import { getResidences } from '../../services/database'
import { TextField, MenuItem, Button, Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default class Signup extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {},
        open: false,
        message: "",
        residences: []
    }
    
    componentDidMount(){
        getResidences()
        .then(residences => this.setState({residences}))
        .catch(e => console.log(e))
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.setState({ user: {}, isAuth: false });
        this.props.history.push('/app')
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
        signup(user)
        .then(res => {
            console.log(res)
            if(res.status === 500){
                return this.setState({open: true, message: res.data.message})
            }
            localStorage.setItem('user', JSON.stringify(res))
            this.setState({open: true, message: "Registro correcto, ¡Bienvenido(a)!"})
            this.props.history.push('/app/profile')
        })
        .catch(err => console.log(err))
    }

    handleChange = input => event => {
        const { user } = this.state
        user[input] = event.target.value
        this.setState({
          user
        })
      }

    checkPassword = input => event => {
        const { user } = this.state
        console.log(user.password, event.target.value)
        if(user.password === event.target.value) return this.setState({disabled: false})
        this.setState({ disabled: true})
    }

    checkEmail = input => event => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(emailRegEx.test(String(event.target.value).toLowerCase())) return this.setState({error: false, disabled: false})
        this.setState({error: true, disabled: true})
        
    }

  render() {
      const { handleChange, checkPassword, handleSubmit, checkEmail, handleClose } = this
      const { user, disabled, error, residences, open, message } = this.state
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
                backgroundImage:'url(/signupBanner.jpg)',
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
            }}><h2>Registro de usuario</h2>
            </div>
        </div>
        <h3>Ingresa tus datos</h3>
        <form onSubmit={handleSubmit}>
            {/* NAME */}
        <div>
            <TextField
            required
            id="name"
            label="Nombre"
            onChange={handleChange('name')}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.name}
            margin="normal"
            />
        </div>
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
        {/* REPEAT PASSWORD */}
        <div>
            <TextField
            id="repeat-password"
            label="Repite tu contraseña"
            type="password"
            onChange={checkPassword()}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            margin="normal"
            />
        </div>
        {/* HOME */}
        <div>
            <TextField
            required
            InputLabelProps={{ shrink: true }}
            id="Residence"
            select
            label="Habitacional/Fracc."
            onChange={handleChange('residence')}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.residence}
            margin="normal"
            >
                {residences.map((residence, key) => (
                    <MenuItem key={key} value={residence._id}>
                    {residence.residenceName}
                    </MenuItem>
                ))}
            </TextField>
        </div>
        <div>
            <TextField
            required
            id="home"
            label="Interior"
            type="text"
            onChange={handleChange('home')}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.home}
            margin="normal"
            />
        </div>
        {/* JOB */}
        <div>
            <TextField
            InputLabelProps={{ shrink: true }}
            id="Job"
            select
            label="Profesión (Opcional)"
            onChange={handleChange('job')}
            style={{
                marginLeft: 0,
                marginRight: 0,
                width: 200
            }}
            value={user.job}
            margin="normal"
            helperText="Se mostrará tu profesión a los demás residentes"
            >
                {jobs.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
        <Button type="submit" id="sendButton" disabled={disabled} variant="contained" color="secondary" style={{margin:"1em"}}>
            Crear
        </Button>
        </form>
        <small>¿Tu unidad habitacional/ fraccionamiento no aparece en a lista? <Link style={{
            textDecoration: "none"
        }} to="/auth/add-residence">Agrégalo aquí</Link> </small>
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

const jobs = [
    {
        value: "none",
        label: "Ninguno"
    },
    {
        value: "plomero",
        label: "Plomero"
    },
    {
        value: "jardinero",
        label: "Jardinero"
    },
    {
        value: "mecánico",
        label: "Mecánico"
    },
    {
        value: "electricista",
        label: "Electricista"
    }, 
    {
        value: "abogado",
        label: "Abogado"
    },
    {
        value: "médico",
        label: "Médico"
    },
    {
        value: "dentista",
        label: "Dentista"
    },
    {
        value: "contador",
        label: "Contador"
    }    
]