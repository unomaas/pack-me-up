//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './PackingDetail.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles, theme, StyledTableCell, StyledTableRow } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 



export default function PackingDetail() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const items = useSelector((store) => store.itemsReducer.itemsReducer);
  const kits = useSelector((store) => store.kitsReducer.kitsReducer);
  const addedKits = useSelector((store) => store.eventsKitsReducer);
  const [kitToPackFor, setKitToPackFor] = useState();
  const [showTable, setShowTable] = useState(false);


  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
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
    setKitToPackFor({ ...kitToPackFor, [key]: value });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = kitToPackFor => {
    console.log('In handleSubmit, kitToPackFor:', kitToPackFor);
    // ⬇ Don't submit if they haven't selected: 
    // if (kitToAdd) {
    //   // ⬇ Sending data to our saga: 
    //   dispatch({
    //     type: 'ADD_EVENTS_KITS', payload: {
    //       kit_id: kitToAdd.kit_id,
    //       event_id: params.id
    //     }
    //   });
    // } // End if
    // ⬇ Show table of items after submit:
    // setShowTable(true);
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
    <div className="PackingDetail-wrapper">

      <h2>Select a Kit to Start Packing:</h2>

      <TextField
        label="Select Kit"
        className={classes.select}
        onChange={event => handleChange('kit_id', event.target.value)}
        required
        select
        size="small"
      >
        {addedKits?.map(kit => (
          <MenuItem key={kit.kit_id} value={kit.kit_id}>{kit.name}</MenuItem>
        ))}
      </TextField>

      <Button
        name="eventSubmit"
        onClick={() => handleSubmit(kitToPackFor)}
        // onClick={() => history.push(`/packingfor/${eventToPackFor.event_id}`)}
        color="primary"
        size="small"
        variant="outlined"
      >
        <CheckCircleOutlineIcon />
      </Button>

      <br /> <br />

    </div>
  )
}
