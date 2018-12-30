import React, { Component } from 'react';
import './App.css';
import Routes from './Routes'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


class App extends Component {
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#000000',
        },
        secondary: {
          main: '#ff1493',
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