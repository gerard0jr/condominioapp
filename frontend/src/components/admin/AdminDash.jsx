import React, { Component } from 'react'
import { getResidence, updateIncome, updateOutcome, updateTotalIncome, 
         updateTotalOutcome, deleteIncome, deleteOutcome } from '../../services/database'
import { Button, Snackbar, IconButton, TextField, Paper, CircularProgress } from '@material-ui/core'
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
        rowsPerPage: 5,
        rowsPerPage2: 5,
        incomeDetails: [],
        outcomeDetails: [],
        totalIncome: 0,
        totalOutcome: 0
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/auth/login')
        getResidence(user.residence)
        .then(residence => {
            this.setState({residence})
        })
        .catch(err => console.log(err))
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleIncomeSubmit = e => {
        e.preventDefault()
        const { residence, incomeObject } = this.state
        let income = 0
        residence.incomeDetail.forEach(concept => {
            income += Number(concept.incomeValue)
        })
        income += Number(incomeObject.incomeValue)
        updateIncome(residence._id, incomeObject)
        .then(res => {
            updateTotalIncome(residence._id, income)
            .then(result => {
                if(result.status === 500){
                    return this.setState({open: true, message: res.data.message})
                }
                this.setState({open: true, message: "Se ha guardado correctamente", residence: result})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    handleOutcomeSubmit = e => {
        e.preventDefault()
        const { residence, outcomeObject } = this.state
        let outcome = 0
        residence.outcomeDetail.forEach(concept => {
            outcome += Number(concept.outcomeValue)
        })
        outcome += Number(outcomeObject.outcomeValue)
        updateOutcome(residence._id, outcomeObject)
        .then(res => {
            updateTotalOutcome(residence._id, outcome)
            .then(result => {
                if(result.status === 500){
                    return this.setState({open: true, message: res.data.message})
                }
                this.setState({open: true, message: "Se ha guardado correctamente", residence: result})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
        }

    deleteIncomeItem = concept => (e) =>{
        const { residence } = this.state
        let deletedItem = {
            "id": concept
        }
        deleteIncome(residence._id, deletedItem)
        .then(newResidence => {
            let income = 0
            newResidence.incomeDetail.forEach(concept => {
                income += Number(concept.incomeValue)
            })
            updateTotalIncome(residence._id, income)
            .then(result => {
                if(result.status === 500){
                    return this.setState({open: true, message: result.data.message})
                }
                this.setState({open: true, message: "Se ha guardado correctamente", residence: result})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    deleteOutcomeItem = concept => (e) =>{
        const { residence } = this.state
        let deletedItem = {
            "id": concept
        }
        deleteOutcome(residence._id, deletedItem)
        .then(newResidence => {
            let outcome = 0
            newResidence.outcomeDetail.forEach(concept => {
                outcome += Number(concept.outcomeValue)
            })
            updateTotalOutcome(residence._id, outcome)
            .then(result => {
                if(result.status === 500){
                    return this.setState({open: true, message: result.data.message})
                }
                this.setState({open: true, message: "Se ha guardado correctamente", residence: result})
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    handleIncomeChange = e => {
        let {incomeObject} = this.state
        let name = e.target.name
        let value = e.target.value
        incomeObject[name] = value
        this.setState({incomeObject})
    }

    handleOutcomeChange = e => {
        let {outcomeObject} = this.state
        let name = e.target.name
        let value = e.target.value
        outcomeObject[name] = value
        this.setState({outcomeObject})
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

    handleChangeRowsPerPage2 = event => {
        this.setState({ rowsPerPage2: event.target.value })
    }

  render() {
    const { residence, open, message, page, page2,rowsPerPage, rowsPerPage2, incomeDetails, outcomeDetails } = this.state
    const { handleIncomeChange, handleOutcomeChange, handleClose, handleIncomeSubmit, handleOutcomeSubmit,
            handleChangePage, handleChangePage2, handleChangeRowsPerPage, deleteIncomeItem, deleteOutcomeItem } = this
    return (
      <div style={{
          marginTop:"6em",
          marginBottom:"1em"
      }}>
        <h2>Administra {residence.residenceName} </h2>
            <div className="admin-main-columns">
                <div id="ingresos" className="leftCol">
                    <form onSubmit={handleIncomeSubmit}>
                        <h4>Añadir concepto de ingreso</h4>
                        <div style={{alignItems: "baseline", 
                                    display: "flex", 
                                    justifyContent:"center",
                                    marginTop:"-2em",
                                    marginBottom:"2em"}} >                        
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
                    <form onSubmit={handleOutcomeSubmit}>
                        <h4>Añadir concepto de egreso</h4>
                        <div style={{alignItems: "baseline", 
                                    display: "flex", 
                                    justifyContent:"center",
                                    marginTop:"-2em",
                                    marginBottom:"2em"}} >  
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
                rowsPerPage={rowsPerPage} {...residence} incomeDetails={incomeDetails} 
                deleteIncomeItem={deleteIncomeItem}/>
            </div>
            <div className="outcome-table">
                <OutcomeTable handleChangePage2={handleChangePage2} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} page2={page2} 
                rowsPerPage2={rowsPerPage2} {...residence} outcomeDetails={outcomeDetails}
                deleteOutcomeItem={deleteOutcomeItem}/>
            </div>
            
        </div>
        <div className="tables">
            <Paper className="income-table" elevation={1} style={{margin:"1em"}}>
                <div>
                    <p style={{fontStyle:"italic", color: "#757575"}}>Ingresos totales:</p>
                    {residence.income ? <p style={{fontWeight:"bold"}}>${residence.income}</p> : <div style={{margin:"1em"}}><small >Cargando datos</small> <CircularProgress color="secondary"/></div>}
                </div>
            </Paper>
            <Paper className="income-table" elevation={1} style={{margin:"1em"}}>
                <div>
                    <p style={{fontStyle:"italic", color: "#757575"}}>Egresos totales:</p>
                    {residence.outcome ? <p style={{fontWeight:"bold"}}>${residence.outcome}</p> : <div style={{margin:"1em"}}><small>Cargando datos</small> <CircularProgress color="secondary"/></div>}
                </div>
            </Paper>
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
