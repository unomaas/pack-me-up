import { makeStyles, createMuiTheme, withStyles, TableCell, TableRow } from '@material-ui/core';


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
  }, 
  tableHeader: {
    fontSize: '1.2em'
  },
  tableRows: {
    fontSize: '.9em'
  }
}); // End useStyles

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export { useStyles, theme, StyledTableCell, StyledTableRow };
