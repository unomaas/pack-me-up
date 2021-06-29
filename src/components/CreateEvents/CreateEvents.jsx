//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './CreateEvents.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 


export default function CreateKits() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const eventsCategories = useSelector(store => store.eventsReducer.eventsCategoriesReducer);
  const [newEvent, setNewEvent] = useState({});
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENT_CATEGORIES' })
  }, []);
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the kit object with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setNewEvent({ ...newEvent, [key]: value });
  } // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will post the object to the DB and send the user back to the dashboard. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, newEvent:', newEvent);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending newPlant to our reducer: 
    dispatch({ type: 'ADD_NEW_EVENT', payload: newEvent });
    // ⬇ Send the user back:
    // history.push('/dashboard');
  } // End handleSubmit
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="CreateEvents-wrapper">

      <h2>Add a New Event</h2>

      <div className="CreateEvents-form">

        <form onSubmit={handleSubmit}>
          <TextField
            label="Event Name?"
            className={classes.input}
            onChange={event => handleChange('name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
          />
          &nbsp;

          <TextField
            label="Event Category?"
            className={classes.select}
            onChange={event => handleChange('event_category', event.target.value)}
            required
            select
          >
            {eventsCategories?.map(eventCategory => (
              <MenuItem key={eventCategory.id} value={eventCategory.id}>{eventCategory.name}</MenuItem>
            ))}
          </TextField>
          <br /> <br />

          <TextField
            label="Description?"
            className={classes.input}
            onChange={event => handleChange('description', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }} 
          />
          <br /> <br />

          <TextField
            helperText="Start Date?"
            onChange={event => handleChange('date_start', event.target.value)}
            required
            type="date"
            defaultValue="1/1/1111"
          />
          &nbsp;

          <TextField
            helperText="End Date?"
            onChange={event => handleChange('date_end', event.target.value)}
            required
            type="date"
            // defaultValue={newEvent.date_start}
          />
          &nbsp;

          <br /> <br />

          {/* <TextField
            label="Add a New Kit Category?"
            className={classes.input}
            onChange={event => handleChange('name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
          />
          <br /> <br /> */}

          <Button
            name="cancel"
            onClick={() => history.push(`/dashboard`)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <ArrowBackIcon />
          </Button> &nbsp;

          <Button
            name="submit"
            type="submit"
            variant="outlined"
            color="primary"
            size="small"
          >
            <CheckCircleOutlineIcon />
          </Button>
        </form>

      </div>
    </div>
  ) // End return
} // End CreateKits
