//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Dashboard.css';
import KitItem from '../KitItem/KitItem';
import EventItem from '../EventItem/EventItem';
// ⬇ Dependent functionality:
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
//#endregion ⬆⬆ Document setup above. 


export default function Dashboard() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.eventsReducer);
  const kits = useSelector((store) => store.kitsReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_KITS' }),
    dispatch({ type: 'FETCH_ALL_EVENTS' })
  }, []); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:

  // const handleCreateKit = () => {
  //   console.log('In handleCreateKit');
  //   history.push(`/createkit`);
  // }; // End handleCreateKit

  // const handleCreateEvent = () => {
  //   console.log('In handleCreateEvent');
  //   history.push(`/createevent`);
  // }; // End handleCreateEvent

  // const handleStartPacking = () => {
  //   console.log('In handleStartPacking');
  //   history.push(`/packing`);
  // }; // End handleStartPacking

  //#endregion ⬆⬆ Event handles above. 

  
  // ⬇ Rendering:
  return (
    <div className="Dashboard-wrapper">

      <h2>Welcome to Your Dashboard</h2>

      <div className="Dashboard-calendar"></div>

      <div className="Dashboard-buttons">
        <button onClick={() => history.push(`/createkit`)}>
          Create New Kits
        </button>
        <button onClick={() => history.push(`/createevent`)}>
          Create New Events
        </button>
        <button onClick={() => history.push(`/packing`)}>
          Start Packing!
        </button>
      </div>

      <div className="Dashboard-kitlist">
        <h2>Kit Data Here</h2>
        {/* {kits.map(kit => {
          return <KitItem key={kit.id} kit={kit} />
        })} */}
      </div>

      <div className="Dashboard-eventlist">
        <h2>Event Data Here</h2>
        {/* {events.map(event => {
          return <EventItem key={event.id} event={event} />
        })} */}
      </div>

    </div>
  ) // End return
} // End Dashboard
