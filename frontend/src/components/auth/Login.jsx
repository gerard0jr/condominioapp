import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { login } from '../../services/auth'
import { TextField, Button } from '@material-ui/core'

export default class Login extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {}
    }
    
    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
        login(user)
        .then(res => {
            this.setState({user})
            this.props.history.push('/home')
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

    checkEmail = input => event => {
        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(emailRegEx.test(String(event.target.value).toLowerCase())) return this.setState({error: false, disabled: false})
        this.setState({error: true, disabled: true})
        
    }

  render() {
      const { handleChange, handleSubmit, checkEmail } = this
      const { user, disabled, error } = this.state
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
      </div>
    )
  }
}