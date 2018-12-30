import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#e9c750',
        },
        secondary: {
          main: '#1890ff',
        }
      }
    })
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <Routes/>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;

//rgb(116, 39, 172)