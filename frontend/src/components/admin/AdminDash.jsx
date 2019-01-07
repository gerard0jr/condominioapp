import React, { Component } from 'react'
import { getResidence, updateData } from '../../services/database'
import { Input, Button, Snackbar, IconButton, InputAdornment, FormControl, InputLabel, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import IncomeTable from './IncomeTable';
import OutcomeTable from './OutcomeTable';

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

        if(input === "incomeConcept"){
            residence.incomeDetail["concept"] = event.target.value
            this.setState({residence})
        } 

        if(input === "incomeValue"){
            residence.incomeDetail["value"] = event.target.value
            this.setState({residence})
        }

        if(input === "outcomeConcept"){
            residence.outcomeDetail["concept"] = event.target.value
            this.setState({residence})
        }
        if(input === "outcomeValue"){
            residence.outcomeDetail["value"] = event.target.value
            this.setState({residence})
        } 
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
    console.log(residence)
    return (
      <div style={{
          marginTop:"6em"
      }}>
        <h2>Administra {residence.residenceName} </h2>
            <div className="admin-main-columns">
                <div id="ingresos" className="leftCol">
                    <h2>Ingresos</h2>
                    <form onSubmit={handleSubmit}>
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
                        <h3>Añadir concepto de ingreso</h3>
                        <div style={{alignItems: "baseline", display: "flex", justifyContent:"center"}} >
                            <TextField
                            required
                            id="concept"
                            label="Concepto"
                            placeholder="Cobro de mantenimiento"
                            onChange={handleChange('incomeConcept')}
                            style={{
                                marginLeft: 0,
                                marginRight: 0,
                                width: "48%"
                            }}
                            margin="normal"
                            />
                            <TextField
                            required
                            id="amount"
                            type="number"
                            label="Monto"
                            placeholder="6000"
                            onChange={handleChange('incomeValue')}
                            style={{
                                marginLeft: "1em",
                                marginRight: 0,
                                width: "15%"
                            }}
                            margin="normal"
                            />
                            <Button type="submit" id="sendButton" variant="contained" color="secondary" 
                            style={{margin:"5px", minWidth: "36px"}}>
                                +
                            </Button>
                        </div>
                    </form>
                </div>
                <div id="egresos" className="rightCol">
                    <h2>Egresos</h2>
                    <form onSubmit={handleSubmit}>
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
                        <h3>Añadir concepto de egreso</h3>
                        <div style={{alignItems: "baseline", display: "flex", justifyContent:"center"}} >
                            <TextField
                            required
                            id="conceptO"
                            label="Concepto"
                            placeholder="Reparación de bomba de agua"
                            onChange={handleChange('outcomeConcept')}
                            style={{
                                marginLeft: 0,
                                marginRight: 0,
                                width: "48%"
                            }}
                            margin="normal"
                            />
                            <TextField
                            required
                            id="amountO"
                            type="number"
                            label="Monto"
                            placeholder="3500"
                            onChange={handleChange('outcomeValue')}
                            style={{
                                marginLeft: "1em",
                                marginRight: 0,
                                width: "15%"
                            }}
                            margin="normal"
                            />
                            <Button type="submit" id="sendButton" variant="contained" color="secondary" 
                            style={{margin:"5px", minWidth: "36px"}}>
                                +
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        <div className="tables">
            <div className="income-table">
                <IncomeTable/>
            </div>
            <div className="outcome-table">
                <OutcomeTable/>
            </div>
        </div>
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
