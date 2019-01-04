import React, { Component } from 'react'
import { TextField, MenuItem, Button, Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

export default class AddResidence extends Component {
    state = { 
        disabled: true,
        error: false,
        open: false,
        message: "",
        residence: {}
    }
  render() {
    return (
      <div>
        Añadir Residencia
      </div>
    )
  }
}
