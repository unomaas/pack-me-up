//#region ⬇⬇ Document setup below: 
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//#endregion ⬆⬆ Document setup above. 


export default function EventItem({ event }) {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleDetail:
   * When clicked, this will send the user to the details view page. 
   */
  const handleDetail = () => {
    console.log('In handleDetail, event:', event?.name);
    // ⬇ Navigate user to detailed view: 
    history.push(`/detail/${event.id}`);
  } // End handleDetail
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="EventItem-wrapper" key={event?.id} onClick={() => history.push(`/eventdetail/${event.id}`)}>

      <div className="EventItem-name">
        <p>{event?.name}</p>
      </div>

    </div>
  ) // End return
} // End EventItem