import React, { Component } from 'react'
import { getResidence, updateData } from '../../services/database'
import { Input, Button, Snackbar, IconButton, InputAdornment, FormControl, InputLabel } from '@material-ui/core'
import { Close } from '@material-ui/icons';

export default class AdminDash extends Component {
    state = {
        residence: {},
        open: false,
        message: ""
    }
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/auth/login')
        getResidence(user.residence)
        .then(residence => this.setState({residence}))
        .catch(err => console.log(err))
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleChange = input => event => {
        const { residence } = this.state
        residence[input] = parseInt(event.target.value)
        this.setState({
          residence
        })
      }

    handleSubmit = (e) => {
    const { residence } = this.state
    e.preventDefault()
    updateData(residence._id, residence)
    .then(res => {
        if(res.status === 500){
            return this.setState({open: true, message: res.data.message})
        }

        this.setState({open: true, message: "Se ha guardado correctamente", residence: res})
    })
    .catch(err => console.log(err))
    }

  render() {
    const { residence, open, message } = this.state
    const { handleChange, handleClose, handleSubmit } = this
    return (
      <div style={{
          marginTop:"6em"
      }}>
        <h2>Administra {residence.residenceName} </h2>
        <form onSubmit={handleSubmit}>
            <div className="admin-main-columns">
                <div id="ingresos" className="leftCol">
                    <h2>Ingresos</h2>
                    <FormControl style={{width:"80%"}}>
                        <InputLabel htmlFor="adornment-amount">Ingresos totales</InputLabel>
                        <Input
                            type="number"
                            id="adornment-amount"
                            value={residence.income}
                            onChange={handleChange('income')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </div>
                <div id="egresos" className="rightCol">
                    <h2>Egresos</h2>
                    <FormControl style={{width:"80%"}}>
                        <InputLabel htmlFor="adornment-amount">Egresos totales</InputLabel>
                        <Input
                            type="number"
                            id="adornment-amount"
                            value={residence.outcome}
                            onChange={handleChange('outcome')}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                </div>
            </div>
            <Button type="submit" id="sendButton" variant="contained" color="secondary" style={{margin:"1em"}}>
                Guardar
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
