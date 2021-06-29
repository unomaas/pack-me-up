import { makeStyles, createMuiTheme } from '@material-ui/core';


// ⬇ Material-ui Theme: 
const theme = createMuiTheme({
  typography: {
    fontFamily: 'opendyslexicregular',
    fontSize: 12.5
  },
}) // End theme

// ⬇ Material-ui Classes: 
const useStyles = makeStyles({
  input: {
    width: 225
  },
  select: {
    width: 175
  }
}); // End useStyles


export { useStyles, theme };
