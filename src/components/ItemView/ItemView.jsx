//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './ItemView.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete'; import WorkIcon from '@material-ui/icons/Work';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import { useStyles, theme, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 



export default function ItemView({ kit }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const items = useSelector((store) => store.itemsReducer);
  // const [blankInput, setBlankInput] = useState('');
  const [newItem, setNewItem] = useState({ item_name: '' });
  const itemIsPacked = items?.item_is_packed;
  const [isPacked, setIsPacked] = useState(itemIsPacked);
  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
  // ⬇ GET on page load:
  // useEffect(() => {
  //   dispatch({ type: 'FETCH_ALL_ITEMS', payload: { id: kit.id } });
  // }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setNewItem({ ...newItem, [key]: value });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, newItem:', newItem);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Don't submit if they haven't entered text: 
    if (newItem.item_name) {
      // ⬇ Sending data to our saga: 
      dispatch({
        type: 'ADD_NEW_ITEM', payload: {
          item_name: newItem.item_name,
          kit_id: kit.id
        }
      });
    }
    // ⬇ Clearing inputs after submit:
    setNewItem({ item_name: '' });
  } // End handleSubmit

  /** ⬇ handleDelete:
   * When clicked, this will delete the clicked item. 
   */
  const handleDelete = item => {
    console.log('In handleDelete, item:', item);
    // ⬇ Set the input to the item name in case of edit or accident:
    setNewItem({ item_name: item.item_name });
    // ⬇ Delete item from DB:
    dispatch({ type: 'DELETE_ITEM', payload: item });
  } // End handleDelete

  /** ⬇ handlePacked:
   * When clicked, this will update the packed status of the item. 
   */
  const handlePacked = item => {
    console.log('isPacked is:', isPacked);
    dispatch({ type: 'FLIP_IS_PACKED', payload: item });
  } // End handlePacked
  //#endregion ⬆⬆ Event handles above. 

  // console.log('***ITEMVIEW KIT IS***:', kit);
  // ⬇ Rendering:
  return (
    <div className="ItemsView-wrapper">

      <TableContainer className="ItemsView-table" component={Paper}>
        <Table size="small">

          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHeader} colSpan={3} align="center">
                {kit.kit_name}'s Items:
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <StyledTableRow>

              {/* ⬇ Conditional rendering for the "Packed" button, depending on whether or not we're in the Packing View or Kits Detailed View:  */}
              {kit.event_id ? (
                // ⬇ If we're at the Packing View: 
                <TableCell colSpan={2}>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Add a new Item?"
                      value={newItem.item_name}
                      className={classes.input}
                      onChange={event => handleChange('item_name', event.target.value)}
                      required
                      type="search"
                      inputProps={{ maxLength: 50 }}
                      size="small"
                    />
                  </form>
                </TableCell>
              ) : (
                // ⬇ If we're at the Kits Detailed View: 
                <TableCell>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Add a new Item?"
                      value={newItem.item_name}
                      className={classes.input}
                      onChange={event => handleChange('item_name', event.target.value)}
                      required
                      type="search"
                      inputProps={{ maxLength: 50 }}
                      size="small"
                    />
                  </form>
                </TableCell>
              )}
              {/* ⬆ End kit.event_id ? conditional rendering. */}

              <TableCell
                padding="none"
                align="right"
              >
                <Button
                  name="submit"
                  onClick={handleSubmit}
                  color="primary"
                  size="small"
                  className={classes.buttons}
                >
                  <CheckCircleOutlineIcon />
                </Button>
              </TableCell>
            </StyledTableRow>

            {/* ⬇ Row for each item: */}
            {items.map((item) => (
              <StyledTableRow
                key={item.id}
                // ⬇ If item is packed, highlight the cell and strike the text: 
                className={item.item_is_packed ? "ItemsView-packed" : null}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableRows}
                >
                  {item.item_name}
                </TableCell>
                {/* ⬇ Conditional rendering for showing the Packed table cell: */}
                {kit.event_id ? (
                  // ⬇ If we're at the Packing View: 
                  <TableCell
                    padding="none"
                    align="right"
                    className={classes.tableCells}
                  >
                    <Button
                      color="primary"
                      size="small"
                      className={classes.buttons}
                      onClick={() => handlePacked(item)}
                    >
                      {/* ⬇ Conditional rendering for showing the Packed/Unpacked button: */}
                      {item.item_is_packed ? <WorkOffIcon /> : <WorkIcon />}
                      {/* ⬆ End Packed/Unpacked button conditional rendering. */}
                    </Button>
                  </TableCell>
                ) : (
                  // ⬇ If we're at the Kits Detailed View: 
                  <></>
                )}
                {/* ⬆ End Packed table cell conditional rendering. */}
                < TableCell
                  padding="none"
                  align="right"
                  className={classes.tableCells}
                >
                  <Button
                    name="delete"
                    onClick={() => handleDelete(item)}
                    color="secondary"
                    size="small"
                    className={classes.buttons}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer >

    </div >
  )
}
