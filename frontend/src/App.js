import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#1a237e',
        },
        secondary: {
          main: '#0d47a1',
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
