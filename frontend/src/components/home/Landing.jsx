import React, { Component } from 'react'
import Dashboard from './Dashboard';
import { getResidence } from '../../services/database'
import { IconButton, Snackbar, Chip } from '@material-ui/core';
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
    totalOutcome: 0
  }
  
  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({user})
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
    const { user,residence, open, message, page, page2,rowsPerPage, rowsPerPage2, incomeDetails, outcomeDetails } = this.state
    const { handleChangePage, handleChangePage2, handleChangeRowsPerPage, handleClose } = this
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
                rowsPerPage2={rowsPerPage2} outcomeDetails={outcomeDetails} residence={residence}/>
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

