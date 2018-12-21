import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { signup } from '../../services/auth'
import { TextField, MenuItem, Button } from '@material-ui/core'

export default class Signup extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {}
    }
    
    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
        signup(user)
        .then(res => {
            if(res.status !== 200){
                return this.setState({open: true, message: res.data.message})
            }
            localStorage.setItem('user', JSON.stringify(res.data))
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
      const { handleChange, checkPassword, handleSubmit, checkEmail } = this
      const { user, disabled, error } = this.state
    return (
      <div>
          <h2>Registro de usuario</h2>
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
            id="home"
            label="Departamento/No. Interior"
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
        <Button type="submit" id="sendButton" disabled={disabled} variant="contained" color="primary" style={{margin:"1em"}}>
            Crear
        </Button>
        </form>
      </div>
    )
  }
}

const jobs = [
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