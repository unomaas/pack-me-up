import { makeStyles, createMuiTheme, withStyles, TableCell, TableRow } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { green } from '@material-ui/core/colors';
import { StrikethroughS } from '@material-ui/icons';


// ⬇ Material-ui Theme: 
const theme = createMuiTheme({
  typography: {
    fontFamily: 'opendyslexicregular',
    fontSize: 12.5
  },
}) // End theme

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
    fontSize: '.8em',
  },
  tableCells: {
    width: '40px',
    minWidth: '40px',
    maxWidth: '40px'
  },
  buttons: {
    width: '40px',
    maxWidth: '40px', 
    maxHeight: '40px', 
    minWidth: '40px', 
    minHeight: '40px'
  }
}); // End useStyles

export { useStyles, theme, StyledTableCell, StyledTableRow };
