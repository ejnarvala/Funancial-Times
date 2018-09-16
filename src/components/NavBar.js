import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"UnifrakturMaguntia"',
    fontSize: 50,
  },
  palette: {
        primary: { main: "#000000"},
        secondary: {main: "#FFFFFF"}
  },
});

const NavBar = () => {
    return(
        <div>
        <MuiThemeProvider theme={theme}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="title" color="secondary" align="center">Funancial Times</Typography>
                </Toolbar>
            </AppBar>
        </MuiThemeProvider>
        </div>
    )
}
export default NavBar;