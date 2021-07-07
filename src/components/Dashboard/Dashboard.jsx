//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './Dashboard.css';
import KitItem from '../KitItem/KitItem';
import EventItem from '../EventItem/EventItem';
// ⬇ Dependent functionality:
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
//#endregion ⬆⬆ Document setup above. 


export default function Dashboard() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const events = useSelector((store) => store.eventsReducer.eventsReducer);
  const kits = useSelector((store) => store.kitsReducer.kitsReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_KITS' }),
      dispatch({ type: 'FETCH_ALL_EVENTS' }),
      dispatch({ type: 'CLEAR_DETAIL' }),
      dispatch({ type: 'CLEAR_EDIT' })
  }, []); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="Dashboard-wrapper">

      <h2>Welcome to Your Dashboard</h2>

      <div className="Dashboard-calendar"></div>

      <div className="Dashboard-buttons">
        <Button
          name="createkit"
          onClick={() => history.push(`/createkit`)}
          variant="outlined"
          size="small"
        >
          Create Kits
        </Button>

        <Button
          name="createevent"
          onClick={() => history.push(`/createevent`)}
          variant="outlined"
          size="small"
        >
          Create Events
        </Button>

        <Button
          name="packing"
          onClick={() => history.push(`/packingfor`)}
          variant="outlined"
          size="small"
        >
          Start Packing!
        </Button>
      </div>

      <div className="Dashboard-kitlist">
        <h2>List of Your Kits:</h2>
        {kits.map(kit => {
          return <KitItem key={kit.id} kit={kit} />
        })}
      </div>

      <div className="Dashboard-eventlist">
        <h2>List of Your Events:</h2>
        {events.map(event => {
          return <EventItem key={event.id} event={event} />
        })}
      </div>

    </div>
  ) // End return
} // End Dashboard
