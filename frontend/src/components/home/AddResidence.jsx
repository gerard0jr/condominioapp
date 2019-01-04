import React, { Component } from 'react'
import { TextField, Button, Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { newResidence } from '../../services/database'

export default class AddResidence extends Component {
    state = { 
        disabled: true,
        error: false,
        open: false,
        message: "",
        residence: {}
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleSubmit = (e) => {
        const { residence } = this.state
        e.preventDefault()
        newResidence(residence)
        .then(response => {
            if(response.status === 500){
                return this.setState({open: true, message: response.data.message})
            }
            this.setState({open: true, message: "Creado correctamente"})
            this.props.history.push('/auth/signup')
        })
        .catch(err => console.log(err))
    }

    handleChange = input => event => {
        const { residence } = this.state
        residence[input] = event.target.value
        this.setState({
          residence
        })
      }
  render() {
    const { handleChange, handleSubmit, handleClose } = this
    const { residence, open, message } = this.state
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
            }}><h2>Nuevo Condominio</h2>
            </div>
        </div>
        <h3>Ingresa los datos de tu unidad habitacional/condominio</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                required
                id="name"
                label="Nombre"
                placeholder="Unidad Los Rosales"
                onChange={handleChange('residenceName')}
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                    width: "50%"
                }}
                value={residence.residenceName}
                margin="normal"
                />
            </div>
            <div>
                <TextField
                required
                id="concept"
                label="Concepto"
                placeholder="Los rosales"
                onChange={handleChange('street')}
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                    width: "30%"
                }}
                value={residence.street}
                margin="normal"
                />
                <TextField
                required
                id="number"
                label="Número"
                placeholder="76"
                onChange={handleChange('number')}
                style={{
                    marginLeft: "1em",
                    marginRight: 0,
                    width: "19%"
                }}
                value={residence.number}
                margin="normal"
                />
            </div>
            <div>
                <TextField
                required
                id="address"
                label="Dirección"
                placeholder="Col. Anzures, Alcaldía Miguel Hidalgo, CDMX"
                onChange={handleChange('remainAddress')}
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                    width: "50%"
                }}
                value={residence.remainAddress}
                margin="normal"
                />
            </div>
            <Button type="submit" id="sendButton" variant="contained" color="secondary" style={{margin:"1em"}}>
                Crear
            </Button>
        </form>
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
