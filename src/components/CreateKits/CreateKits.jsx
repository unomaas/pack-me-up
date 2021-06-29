//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './CreateKits.css';
// ⬇ Dependent functionality:
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//#endregion ⬆⬆ Document setup above. 


export default function CreateKits() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const [kit, setKit] = useState({});
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the kit object with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key:', key);
    setKit({ ...kit, [key]: value });
  } // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will post the object to the DB and send the user back to the dashboard. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, movie:', kit);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending newPlant to our reducer: 
    dispatch({ type: 'ADD_KIT', payload: kit });
    // ⬇ Send the user back:
    // history.push('/dashboard');
  } // End handleSubmit

  /** ⬇ handleCancel:
   * When clicked, this will send the user to the home page. 
   */
  const handleCancel = () => {
    history.push('/dashboard');
  } // End handleCancel
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="CreateKits-wrapper">

      <h2>Add a New Kit</h2>

      <div className="CreateKits-form">

        <form onSubmit={handleSubmit}>
          <TextField
            label="Kit Name?"
            onChange={event => handleChange('name', event.target.value)}
            required
            variant="outlined"
          />
          &nbsp;

          <TextField
            label="Kit Category?"
            onChange={event => handleChange('kit_category', event.target.value)}
            required
            variant="outlined"
            select
          >
            <MenuItem value='1'>Adventure</MenuItem>
            <MenuItem value='2'>Animated</MenuItem>
            <MenuItem value='3'>Biographical</MenuItem>
          </TextField>
          <br /> <br />

          <TextField
            label="Description?"
            onChange={event => handleChange('description', event.target.value)}
            required
            variant="outlined"
          />
          &nbsp;

          <TextField
            label="Event Category?"
            onChange={event => handleChange('event_category', event.target.value)}
            required
            variant="outlined"
            select
          >
            <MenuItem value='1'>Adventure</MenuItem>
            <MenuItem value='2'>Animated</MenuItem>
            <MenuItem value='3'>Biographical</MenuItem>
          </TextField>
          <br /> <br />

          <TextField
            label="Add a New Category?"
            onChange={event => handleChange('name', event.target.value)}
            required
            variant="outlined"
          />
          <br /> <br />


          <Button
            onClick={handleCancel}
            variant="outlined"
            color="secondary"
          >
            <ArrowBackIcon />
          </Button> &nbsp;

          <Button
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
