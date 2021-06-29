//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './CreateKits.css';
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
  const kitsCategories = useSelector(store => store.kitsReducer.kitsCategoriesReducer);
  const eventsCategories = useSelector(store => store.eventsReducer.eventsCategoriesReducer);
  const [kit, setKit] = useState({});
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_KIT_CATEGORIES' }),
      dispatch({ type: 'FETCH_EVENT_CATEGORIES' })
  }, []);
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the kit object with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    setKit({ ...kit, [key]: value });
  } // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will post the object to the DB and send the user back to the dashboard. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, kit:', kit);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending newPlant to our reducer: 
    // dispatch({ type: 'ADD_NEW_KIT', payload: kit });
    // ⬇ Send the user back:
    // history.push('/dashboard');
  } // End handleSubmit
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="CreateKits-wrapper">

      <h2>Add a New Kit</h2>

      <div className="CreateKits-form">

        <form onSubmit={handleSubmit}>
          <TextField
            label="Kit Name?"
            className={classes.input}
            onChange={event => handleChange('name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
          />
          &nbsp;

          <TextField
            label="Kit Category?"
            className={classes.select}
            onChange={event => handleChange('kit_category', event.target.value)}
            required
            select
            width="25%"
          >
            {kitsCategories?.map(kitCategory => (
              <MenuItem key={kitCategory.id} value={kitCategory.id}>{kitCategory.name}</MenuItem>
            ))}
          </TextField>
          <br /> <br />

          <TextField
            label="Description?"
            className={classes.input}
            onChange={event => handleChange('description', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 255 }}
          />
          &nbsp;

          <TextField
            label="Event Category?"
            className={classes.select}
            onChange={event => handleChange('event_category', event.target.value)}
            required
            select
            width="25%"
          >
            {eventsCategories?.map(eventCategory => (
              <MenuItem key={eventCategory.id} value={eventCategory.id}>{eventCategory.name}</MenuItem>
            ))}
          </TextField>
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
          >
            <ArrowBackIcon />
          </Button> &nbsp;

          <Button
            name="submit"
            type="submit"
            variant="outlined"
            color="primary"
          >
            <CheckCircleOutlineIcon />
          </Button>
        </form>

      </div>

    </div>
  ) // End return
} // End CreateKits
