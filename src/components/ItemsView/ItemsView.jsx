//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './ItemsView.css';
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


export default function ItemsView({ kit }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();
  const items = useSelector((store) => store.itemsReducer.itemsReducer);
  // const itemsEdit = useSelector((store) => store.itemsEditReducer.itemsEditReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_ITEMS', payload: { id: params.id } });
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the reducer with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    dispatch({
      type: 'ITEM_EDIT_ONCHANGE',
      payload: { key: key, value: value }
    });
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will submit the new movie to the DB and send the user back to the home page. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit, item:', item);
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Sending data to our saga: 
    dispatch({ type: 'SUBMIT_ITEM_EDIT', payload: itemEdit });
    // ⬇ Send user back to detail view:
    // history.push(`/kitdetail/${kitDetail.id}`);
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
    <div>
      <h4>Items Here</h4>
    </div>
  )
}
