import React, { Component } from 'react'
import Dashboard from './Dashboard';
import { getResidence, deleteReport } from '../../services/database'
import { IconButton, Snackbar, Chip, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';
import { Close } from '@material-ui/icons';

export default class Landing extends Component {
  state = {
    user: {},
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
    totalOutcome: 0,
    detail: "",
    openDialog: false,
    openDialogInfo: false,
    report: 0, 
    reports: []
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({user})
    if (!user) return this.props.history.push('/auth/login')
    getResidence(user.residence)
    .then(residence => this.setState({residence, reports: residence.reports}))
    .catch(err => console.log(err))
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    this.setState({ open: false });
  }

  closeDialog = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    this.setState({ openDialog: false, openDialogInfo: false });
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

  openDial = description => e => {
    this.setState({openDialog: true, detail:description })
  }

  openDialInfo = (description, id) => e => {
    this.setState({openDialogInfo: true, detail:description, report: id })
  }

  resolved =  e => {
    const { residence, detail } = this.state
    let deletedItem = {
      "id": detail
    }
    deleteReport(residence._id,deletedItem)
    .then(newResidence => this.setState({open: true, openDialog:false, message:"Reporte resuelto", residence: newResidence}))
    .catch(err => console.log(err))
  }

  render() {
    const { user,residence, open, message, page, page2,rowsPerPage, rowsPerPage2, incomeDetails, outcomeDetails, openDialog, openDialogInfo, report, reports } = this.state
    const { handleChangePage, handleChangePage2, handleChangeRowsPerPage, handleClose, resolved, closeDialog, openDial, openDialInfo } = this
    console.log(reports)
    return (
      <div style={{backgroundColor:"#ececec", height:"100%"}}>
        <div style={{
            width:"100vw",
            height:"25vh",
            position: "relative"
            }}>
            <div style={{
                width:"100%",
                height:"100%",
                backgroundColor:"rgba(0,0,0,0.5)",
                position: "absolute",
                top:"0",
                left:"0"
            }}></div>
            <div style={{
                backgroundImage:'url(/apartments.jpg)',
                backgroundSize:"cover",
                backgroundRepeat:"no-repeat",
                backgroundPosition: "center",
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
                fontSize: "2em",
                fontFamily: "Roboto",
                textShadow: "1px 1px 4px #000"
            }}><h2>{residence.residenceName}</h2>
            </div>
            <div className="chipContainer">
              <Chip className="chipClass"
              label={residence.residenceName ? residence.street + " #" + residence.number + ", " + residence.remainAddress : "Dirección"} />
            </div>
        </div>
        
        <Dashboard {...user} {...residence} handleChangePage={handleChangePage} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} page={page} 
                rowsPerPage={rowsPerPage} incomeDetails={incomeDetails} 
                handleChangePage2={handleChangePage2} page2={page2} 
                rowsPerPage2={rowsPerPage2} outcomeDetails={outcomeDetails} residence={residence}
                openDial={openDial} openDialInfo={openDialInfo} />
        <Dialog
          open={openDialog}
          onClose={closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">{"¿Se resolvió el reporte?"}</DialogTitle>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              No
            </Button>
            <Button onClick={resolved} color="primary" autoFocus>
              Resuelto
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogInfo}
          onClose={closeDialog}
          aria-labelledby="responsive-dialog-title-view"
        >
        <DialogTitle id="responsive-dialog-title-view">{"Reporte"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {reports.length !== 0 ? reports[report].description : "" }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Regresar
            </Button>
          </DialogActions>
        </Dialog>
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

