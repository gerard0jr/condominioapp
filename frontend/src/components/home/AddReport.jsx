import React, { Component } from 'react'
import { getResidence, newReport } from '../../services/database'
import { Snackbar, IconButton, TextField, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Link } from 'react-router-dom'

export default class AddReport extends Component {
    state = {
        user: {},
        residence: {
        },
        report: "",
        open: false,
        message: "",
        reportWithDetails: {}
    }
    
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/auth/login')
        getResidence(user.residence)
        .then(residence => {
            this.setState({residence, user})
        })
        .catch(err => console.log(err))
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    }

    handleSubmit = (e) => {
        const { residence,reportWithDetails } = this.state
        e.preventDefault()
        newReport(residence._id, reportWithDetails)
        .then(response => {
            if(response.status === 500){
                return this.setState({open: true, message: response.data.message})
            }
            this.setState({open: true, message: "Reporte creado correctamente"})
        })
        .catch(err => console.log(err))
    }

    handleChange = event => {
        let { user, report, reportWithDetails } = this.state
        report = event.target.value
        reportWithDetails = {
            "authorName": user.name,
            "authorPhoto": user.photoURL,
            "description": event.target.value,
            "home": user.home
        }
        this.setState({
          report, reportWithDetails
        })
      }

  render() {
      const { user, open, message, report } = this.state
      const { handleChange, handleClose, handleSubmit } = this
    return (
      <div style={{marginTop:"6em"}}>
        <h2>¿Tienes algún problema {user.name}? Repórtalo aquí</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                required
                id="name"
                label="Reporte:"
                placeholder="No hay agua en el edificio F"
                onChange={handleChange}
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                    width: "50%"
                }}
                value={report}
                margin="normal"
                />
            </div>
            <Button type="submit" id="sendButton" variant="contained" color="secondary" style={{margin:"1em"}}>
                Enviar reporte
            </Button>
        </form>
        <Link to="/app" style={{textDecoration:"none"}}>
            <Button id="sendButton" variant="contained" style={{backgroundColor:"#fff", margin:"1em"}}>
                Regresar
            </Button>
        </Link>
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
