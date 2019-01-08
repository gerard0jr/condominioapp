import React, { Component } from 'react'
import { getResidence, updateIncome, updateOutcome } from '../../services/database'
import { Input, Button, Snackbar, IconButton, InputAdornment, FormControl, InputLabel, TextField } from '@material-ui/core'
import { Close } from '@material-ui/icons';
import IncomeTable from './IncomeTable';
import OutcomeTable from './OutcomeTable';

export default class AdminDash extends Component {
    state = {
        residence: {
        },
        open: false,
        message: "",
        incomeObject: {},
        outcomeObject: {},
        page: 0,
        page2: 0,
        rowsPerPage: 5
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

    handleIncomeSubmit = e => {
    const { residence, incomeObject } = this.state
    e.preventDefault()
    updateIncome(residence._id, incomeObject)
    .then(res => {
        if(res.status === 500){
            return this.setState({open: true, message: res.data.message})
        }

        this.setState({open: true, message: "Se ha guardado correctamente", residence: res})
    })
    .catch(err => console.log(err))
    }

    handleOutcomeSubmit = e => {
        const { residence, outcomeObject } = this.state
        e.preventDefault()
        updateOutcome(residence._id, outcomeObject)
        .then(res => {
            if(res.status === 500){
                return this.setState({open: true, message: res.data.message})
            }
    
            this.setState({open: true, message: "Se ha guardado correctamente", residence: res})
        })
        .catch(err => console.log(err))
        }

    //Hacer un post para outcomeDetail, y una nueva funcion para outcomeDetail en database.js
    handleIncomeChange = e => {
        let {incomeObject} = this.state
        let name = e.target.name
        let value = e.target.value
        incomeObject[name] = value
        this.setState({incomeObject}, ()=>console.log(this.state))
    }

    handleOutcomeChange = e => {
        let {outcomeObject} = this.state
        let name = e.target.name
        let value = e.target.value
        outcomeObject[name] = value
        this.setState({outcomeObject}, ()=>console.log(this.state))
    }

    handleChangePage = (event, page) => {
        this.setState({ page })
    }

    handleChangePage2 = (event, page2) => {
        this.setState({ page2 })
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    }

  render() {
    const { residence, open, message, page, page2,rowsPerPage } = this.state
    const { handleIncomeChange, handleOutcomeChange, handleClose, handleIncomeSubmit, handleOutcomeSubmit,
            handleChangePage, handleChangePage2, handleChangeRowsPerPage } = this
    return (
      <div style={{
          marginTop:"6em"
      }}>
        <h2>Administra {residence.residenceName} </h2>
            <div className="admin-main-columns">
                <div id="ingresos" className="leftCol">
                    <h2>Ingresos</h2>
                    <form onSubmit={handleIncomeSubmit}>
                        <h3>Añadir concepto de ingreso</h3>
                        <div style={{alignItems: "baseline", display: "flex", justifyContent:"center"}} >
                            <TextField
                            name="incomeConcept"
                            required
                            id="concept"
                            label="Concepto"
                            placeholder="Cobro de mantenimiento"
                            onChange={handleIncomeChange}
                            style={{
                                marginLeft: 0,
                                marginRight: 0,
                                width: "48%"
                            }}
                            margin="normal"
                            />
                            <TextField
                            name="incomeValue"
                            required
                            id="amount"
                            type="number"
                            label="Monto"
                            placeholder="6000"
                            onChange={handleIncomeChange}
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
                    <form onSubmit={handleOutcomeSubmit}>
                        <h3>Añadir concepto de egreso</h3>
                        <div style={{alignItems: "baseline", display: "flex", justifyContent:"center"}} >
                            <TextField
                            name="outcomeConcept"
                            required
                            id="conceptO"
                            label="Concepto"
                            placeholder="Reparación de bomba de agua"
                            onChange={handleOutcomeChange}
                            style={{
                                marginLeft: 0,
                                marginRight: 0,
                                width: "48%"
                            }}
                            margin="normal"
                            />
                            <TextField
                            name="outcomeValue"
                            required
                            id="amountO"
                            type="number"
                            label="Monto"
                            placeholder="3500"
                            onChange={handleOutcomeChange}
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
                <IncomeTable handleChangePage={handleChangePage} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} 
                rowsPerPage={rowsPerPage} {...residence}/>
            </div>
            <div className="outcome-table">
                <OutcomeTable handleChangePage={handleChangePage2} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} page={page2} 
                rowsPerPage={rowsPerPage} {...residence}/>
            </div>
            
        </div>
        <FormControl style={{width:"80%"}}>
            <InputLabel htmlFor="adornment-amount">Ingresos totales</InputLabel>
            <Input
                disabled
                type="number"
                id="adornment-amount"
                value={residence.income}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl>
        <FormControl style={{width:"80%"}}>
            <InputLabel htmlFor="adornment-amount">Egresos totales</InputLabel>
            <Input
                disabled
                type="number"
                id="adornment-amount"
                value={residence.outcome}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
        </FormControl>
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
