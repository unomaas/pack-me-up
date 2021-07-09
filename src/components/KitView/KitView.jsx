//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
// import './ItemView.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete'; 
import { useStyles, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 


export default function KitView({ event }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const classes = useStyles();
  const params = useParams();
  const kits = useSelector((store) => store.kitsReducer.kitsReducer);
  const addedKits = useSelector((store) => store.eventsKitsReducer);
  const [kitToAdd, setKitToAdd] = useState();
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS_KITS', payload: { id: params.id } }),
      dispatch({ type: 'FETCH_ALL_KITS' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setKitToAdd({ ...kitToAdd, [key]: value });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = kitToAdd => {
    console.log('In handleSubmit, kitToAdd:', kitToAdd);
    // ⬇ Don't submit if they haven't selected: 
    if (kitToAdd) {
      // ⬇ Sending data to our saga: 
      dispatch({
        type: 'ADD_EVENTS_KITS', 
        payload: {
          kit_id: kitToAdd.kit_id,
          event_id: params.id
        } // End payload
      }); // End dispatch
    } // End if
  } // End handleSubmit

  /** ⬇ handleDelete:
   * When clicked, this will delete the clicked item. 
   */
  const handleRemove = kit => {
    console.log('In handleRemove, kit:', kit);
    dispatch({ type: 'DELETE_EVENTS_KITS', payload: kit });
  } // End handleDelete
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="ItemsView-wrapper">

      <TableContainer className="ItemsView-table" component={Paper}>
        <Table size="small">

          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.tableHeader} colSpan={3} align="center">
                Select Kits to Bring With:
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            <StyledTableRow>
              <TableCell>

                <TextField
                  label="Add a Kit?"
                  className={classes.select}
                  onChange={event => handleChange('kit_id', event.target.value)}
                  required
                  select
                  size="small"
                >
                  {kits?.map(kit => (
                    <MenuItem key={kit.id} value={kit.id}>{kit.kit_name}</MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell
                padding="none"
                align="right"
              >
                <Button
                  name="submit"
                  onClick={() => handleSubmit(kitToAdd)}
                  color="primary"
                  className={classes.buttons}
                >
                  <CheckCircleOutlineIcon />
                </Button>
              </TableCell>
            </StyledTableRow>

            {addedKits.map((kit) => (
              <StyledTableRow key={kit.id}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableRows}
                >
                  {kit.kit_name}
                </TableCell>

                <TableCell
                  padding="none"
                  align="right"
                >
                  <Button
                    name="delete"
                    onClick={() => handleRemove(kit)}
                    color="secondary"
                    className={classes.buttons}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>

    </div>
  )
}
