import React, { Component } from 'react'
import { getResidence } from '../../services/database'

export default class AddReport extends Component {
    state = {
        residence: {
        },
        open: false,
        message: "",
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
    }

  render() {
    return (
      <div style={{marginTop:"6em"}}>
        <h2>¿Tienes algún problema? Reportalo aquí</h2>
      </div>
    )
  }
}
