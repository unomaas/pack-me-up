//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './KitEdit.css';
// ⬇ Dependent functionality:
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/EditOutlined';
//#endregion ⬆⬆ Document setup above. 


export default function KitEdit() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const kitDetail = useSelector((store) => store.kitsReducer.kitsDetailReducer);
  const kitEdit = useSelector((store) => store.kitsReducer.kitsEditReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_KIT', payload: { id: params.id } });
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
    dispatch({ type: 'SUBMIT_KIT_EDIT', payload: kitEdit }); // movie is already an object, defined above. 
    // ⬇ Send user back to detail view:
    history.push(`/kitdetail/${kitDetail.id}`);
  } // End handleSubmit
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div>

    </div>
  )
}
