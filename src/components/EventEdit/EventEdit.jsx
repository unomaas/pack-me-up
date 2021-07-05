//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './EventEdit.css';
// ⬇ Dependent functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, MenuItem, TextField, Select } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles } from '../MuiStyling/MuiStyling';
import swal from 'sweetalert';
//#endregion ⬆⬆ Document setup above. 


export default function EventEdit() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const eventDetail = useSelector((store) => store.eventsReducer.eventsDetailReducer);
  const eventEdit = useSelector((store) => store.eventsReducer.eventsEditReducer);
  const eventsCategories = useSelector(store => store.eventsReducer.eventsCategoriesReducer);
  const today = new Date().toISOString().substring(0, 10);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_EVENT', payload: { id: params.id } }),
      dispatch({ type: 'FETCH_EVENT_CATEGORIES' })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await
  //       dispatch({ type: 'FETCH_SINGLE_EVENT', payload: { id: params.id } });
  //       dispatch({ type: 'FETCH_EVENT_CATEGORIES' });
  //       console.log(request);
  //       return request;
  //   }
  //   fetchData();
  // }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the editMovie reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    dispatch({
      type: 'EVENT_EDIT_ONCHANGE',
      payload: { key: key, value: value }
    });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, eventEdit:', eventEdit);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending data to our saga: 
    dispatch({ type: 'SUBMIT_EVENT_EDIT', payload: eventEdit });
    // ⬇ Send user back to dashboard:
    history.push(`/eventdetail/${eventDetail.id}`);
  } // End handleSubmit

  /** ⬇ handleDelete:
   * When clicked, this will ask the user to confirm deletion then send to the dashboard. 
   */
  const handleDelete = event => {
    console.log('In handleDelete, event:', eventDetail.event_name);
    // ⬇ Don't submit until confirm:
    event.preventDefault();
    swal({
      title: "This will delete this event!",
      text: "Do you wish to proceed?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }) // End config
      .then((willDelete) => {
        if (willDelete) {
          swal("This event has been deleted!", {
            icon: "success",
          });
          // ⬇ Sending data to our saga: 
          dispatch({ type: 'DELETE_EVENT', payload: eventDetail });
          // ⬇ Send user back to dashboard:
          history.push(`/dashboard`);
        } // End if
      }); // End swal
  } // End handleDelete
  //#endregion ⬆⬆ Event handles above. 


  console.log('eventDetail is:', eventDetail);
  // ⬇ Rendering:
  return (
    <div className="EventEdit-wrapper">

      <h2>Edit This Event</h2>

      <div className="EventEdit-form">

        <form onSubmit={handleSubmit}>
          <TextField
            // Input Label Props. 
            InputLabelProps={{ shrink: eventEdit.event_name }}
            label="Event Name?"
            value={eventEdit?.event_name}
            // defaultValue={eventEdit?.name}
            className={classes.input}
            onChange={event => handleChange('event_name', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
            size="small"
          />
          &nbsp;

          <TextField
            label="Event Category?"
            value={eventEdit?.event_category}
            // defaultValue={eventEdit?.name}
            //MAKE THE VALUE ON .MAP MATCH THE VALUE OF ABOVE.
            //CHANGE THE COMPONENT TO SELECT INSTEAD OF TEXTFIELD. 
            className={classes.select}
            onChange={event => handleChange('event_category', event.target.value)}
            required
            select
            size="small"
          >
            {eventsCategories?.map(eventCategory => (
              <MenuItem key={eventCategory.id} value={eventCategory.id}>{eventCategory.event_cat_name}</MenuItem>
            ))}
          </TextField>
          <br /> <br />

          <TextField
            InputLabelProps={{ shrink: eventEdit.event_description }}
            label="Description?"
            value={eventEdit?.event_description}
            // defaultValue={eventEdit?.description}
            className={classes.input}
            onChange={event => handleChange('event_description', event.target.value)}
            required
            type="search"
            inputProps={{ maxLength: 50 }}
            size="small"
          />
          <br /> <br />

          <TextField
            label="Start Date?"
            InputLabelProps={{ shrink: true }}
            // helperText="Start Date?"
            // value={today}
            // defaultValue={eventDetail?.date_start}
            onChange={event => handleChange('date_start', event.target.value)}
            required
            type="date"
            size="small"
          />
          &nbsp;

          <TextField
            label="End Date?"
            InputLabelProps={{ shrink: true }}
            // helperText="End Date?"
            // value={today}
            // defaultValue={eventDetail?.date_end}
            onChange={event => handleChange('date_end', event.target.value)}
            required
            type="date"
            size="small"
          // defaultValue={newEvent.date_start}
          />
          &nbsp;

          <br /> <br />

          <Button
            name="cancel"
            onClick={() => history.goBack()}
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
          </Button> &nbsp;

          <Button
            name="delete"
            onClick={handleDelete}
            variant="outlined"
            color="secondary"
            size="small"
          >
            <DeleteForeverIcon />
          </Button>
        </form>

      </div>
    </div>
  )
}
