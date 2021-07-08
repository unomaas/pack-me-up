//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Packing.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MenuItem, TextField } from '@material-ui/core';
import { useStyles } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 


export default function Packing() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const events = useSelector((store) => store.eventsReducer.eventsReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_EVENTS' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 

  
  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (event) => {
    console.log('In handleChange, event:', event);
    history.push(`/packingfor/${event.id}`);
  }; // End handleChange
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="Packing-wrapper">

      <h2>Select an Event to Pack For:</h2>

      <TextField
        label="Select Event"
        className={classes.select}
        onChange={event => handleChange(event.target.value)}
        required
        select
        size="small"
      >
        {events?.map(event => (
          <MenuItem key={event.id} value={event}>{event.event_name}</MenuItem>
        ))}
      </TextField>

    </div>
  )
}
