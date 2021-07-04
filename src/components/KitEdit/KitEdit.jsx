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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
    // ⬇ Sending data to our saga: 
    dispatch({ type: 'SUBMIT_KIT_EDIT', payload: kitEdit });
    // ⬇ Send user back to detail view:
    history.push(`/kitdetail/${kitDetail.id}`);
  } // End handleSubmit

  /** ⬇ handleDelete:
   * When clicked, this will ask the user to confirm deletion then send to the dashboard. 
   */
  const handleDelete = event => {
    console.log('In handleDelete, kit:', kitEdit.name);
    // ⬇ Don't submit until confirm:
    event.preventDefault();
    swal({
      title: "This will delete this kit!",
      text: "Are you sure you wish to proceed?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }) // End config
      .then((willDelete) => {
        if (willDelete) {
          swal("This kit has been deleted!", {
            icon: "success",
          });
          // ⬇ Sending data to our saga: 
          dispatch({ type: 'DELETE_KIT', payload: kitEdit });
          // ⬇ Send user back to dashboard:
          history.push(`/dashboard`);
        } // End if
      }); // End swal
  } // End handleDelete
  //#endregion ⬆⬆ Event handles above. 


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
            value={kitsCategories?.id}
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
            value={eventsCategories?.id}
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
