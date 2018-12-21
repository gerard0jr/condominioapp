import React, { Component } from 'react'
import { Link }  from 'react-router-dom'
import { update } from '../../services/auth'
import { TextField, Button, MenuItem, Snackbar, IconButton, CircularProgress} from '@material-ui/core'
import {Close} from '@material-ui/icons'
import firebase from '../../services/firebase'

export default class Profile extends Component {
    
    state = { 
        disabled: true,
        error: false,
        user: {},
        open: false,
        message:"",
        progress:0
    }
    
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/auth/login')
        return this.setState({ user, isAuth: true });
    }

    handleSubmit = (e) => {
        const { user } = this.state
        e.preventDefault()
        update(user)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res))
            this.setState({user, open:true, message:"Actualizado correctamente"})
        })
        .catch(err =>  console.log(err))

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

      uploadPhoto = (e) => {
        const { user } = this.state
        const file = e.target.files[0]
        console.log(file)
        const task = firebase.storage().ref('profilePics').child(file.name).put(file)

        task.on("state_changed", snap => {
            let progress = (snap.bytesTransferred / snap.totalBytes) * 100
            progress = Math.floor(progress)
            this.setState({ progress })
        })

        task
        .then(snap=>snap.ref.getDownloadURL())
        .then(link=>{
            user['photoURL'] = link
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({user})
        })

      }

      clickInput = () => {
        document.getElementById('photoUpload').click()
      }

  render() {
      const { handleChange, handleSubmit, handleClose, uploadPhoto, clickInput } = this
      const { user, error, open, message, progress } = this.state
    return (
      <div>
          <img onClick={clickInput} style={{
              width:"200px",
              height:"200px",
              borderRadius: "50%",
              objectFit:"contain",
              backgroundColor:"gray"
          }} src={user.photoURL} alt={user.name}/>
            {progress < 99 && progress > 0 ? 
            <CircularProgress
            variant="static"
            value={progress}
            /> : <div style={{display:"none"}}></div>}
          <h2>Perfil de {user.name}</h2>
        <form onSubmit={handleSubmit}>
        <input onChange={uploadPhoto} type="file" name="photoURL" id="photoUpload" style={{display:"none"}}/>
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
        
       
        <Button type="submit" id="sendButton" variant="contained" color="primary" style={{margin:"1em"}}>
            Actualizar perfil
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