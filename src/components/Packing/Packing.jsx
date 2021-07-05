//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Packing.css';
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



export default function Packing() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const events = useSelector((store) => store.eventsReducer.eventsReducer);
  const [eventToPackFor, setEventToPackFor] = useState();
  const addedKits = useSelector((store) => store.eventsKitsReducer);

  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    // dispatch({ type: 'FETCH_EVENTS_KITS', payload: { id: params.id } }),
    dispatch({ type: 'FETCH_ALL_EVENTS' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setEventToPackFor({ ...eventToPackFor, [key]: value });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = () => {
    console.log('In handleEventSubmit, kitToAdd:', eventToPackFor);
    // ⬇ Don't submit if they haven't selected: 
    if (eventToPackFor) {
      // ⬇ Sending data to our saga: 
      dispatch({
        type: 'FETCH_EVENTS_KITS',
        payload: {
          id: eventToPackFor.event_id
        } // End payload
      }) // End dispatch
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
    <div className="Packing-wrapper">

      <h2>Select an Event to Pack For:</h2>

      <TextField
        label="Select Event"
        className={classes.select}
        onChange={event => handleChange('event_id', event.target.value)}
        required
        select
        size="small"
      >
        {events?.map(event => (
          <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
        ))}
      </TextField>

      <Button
        name="eventSubmit"
        // onClick={() => handleEventSubmit(eventToPackFor)}
        onClick={() => history.push(`/packingfor/${eventToPackFor.event_id}`)}
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
