//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './KitEdit.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from '../MuiStyling/MuiStyling';
//#endregion ⬆⬆ Document setup above. 


export default function KitEdit() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const kitDetail = useSelector((store) => store.kitsReducer.kitsDetailReducer);
  const kitEdit = useSelector((store) => store.kitsReducer.kitsEditReducer);
  const kitsCategories = useSelector(store => store.kitsReducer.kitsCategoriesReducer);
  const eventsCategories = useSelector(store => store.eventsReducer.eventsCategoriesReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_KIT', payload: { id: params.id } }),
      dispatch({ type: 'FETCH_KIT_CATEGORIES' }),
      dispatch({ type: 'FETCH_EVENT_CATEGORIES' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the editMovie reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    dispatch({
      type: 'KIT_EDIT_ONCHANGE',
      payload: { key: key, value: value }
    });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, kitEdit:', kitEdit);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending newPlant to our reducer: 
    dispatch({ type: 'SUBMIT_KIT_EDIT', payload: kitEdit });
    // ⬇ Send user back to detail view:
    history.push(`/kitdetail/${kitDetail.id}`);
  } // End handleSubmit
  //#endregion ⬆⬆ Event handles above. 



  console.log('kitDetail is:', kitDetail);
  // ⬇ Rendering:
  return (
    <div className="KitEdit-wrapper" key={kitDetail?.id}>

      <h2>Edit This Kit</h2>

      <div className="KitEdit-form">

        <form onSubmit={handleSubmit}>
          <TextField
            label="Kit Name?"
            defaultValue={kitDetail?.name}
            className={classes.input}
            onChange={event => handleChange('name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
            size="small"
          />
          &nbsp;

          <TextField
            label="Kit Category?"
            defaultValue={kitDetail?.kit_category}
            className={classes.select}
            onChange={event => handleChange('kit_category', event.target.value)}
            required
            select
            size="small"
          >
            {kitsCategories?.map(kitCategory => (
              <MenuItem key={kitCategory.id} value={kitCategory.id}>{kitCategory.name}</MenuItem>
            ))}
          </TextField>
          <br /> <br />

          <TextField
            label="Description?"
            defaultValue={kitDetail?.description}
            className={classes.input}
            onChange={event => handleChange('description', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 255 }}
            size="small"
          />
          &nbsp;

          <TextField
            label="Event Category?"
            defaultValue={kitDetail?.event_category}
            className={classes.select}
            onChange={event => handleChange('event_category', event.target.value)}
            required
            select
            size="small"
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
            onClick={() => history.push(`/kitdetail/${kitDetail.id}`)}
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
  )
}
