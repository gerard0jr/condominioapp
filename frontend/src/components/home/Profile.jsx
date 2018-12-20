import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { profile } from '../../services/auth'
import { TextField, Button, MenuItem } from '@material-ui/core'

export default class Profile extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {}
    }
    
    componentDidMount = () => {
        profile()
        .then(res => {
            if(res.status === 403) return this.props.history.push('/login')
            return this.setState({user:res})
        })
        .catch(err => console.log(err))
    }

    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
    }

    handleChange = input => event => {
        const { user } = this.state
        user[input] = event.target.value
        this.setState({
          user
        })
      }


  render() {
      const { handleChange, handleSubmit } = this
      const { user, disabled, error } = this.state
    return (
      <div>
          <h2>Perfil</h2>
        <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <div>
            <TextField
            InputLabelProps={{ shrink: true }}
            error={error}
            disabled
            id="email"
            label="Email"
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
        {/* NAME */}
        <div>
            <TextField
            InputLabelProps={{ shrink: true }}
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
        {/* HOME */}
        <div>
            <TextField
            InputLabelProps={{ shrink: true }}
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
            Iniciar sesión
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