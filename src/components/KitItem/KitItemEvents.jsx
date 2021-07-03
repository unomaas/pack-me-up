//#region ⬇⬇ Document setup below: 
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

//#endregion ⬆⬆ Document setup above. 


export default function KitItemEvents({ kit }) {
  //#region ⬇⬇ All state variables below:
  // const dispatch = useDispatch();
  const history = useHistory();
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleDetail:
   * When clicked, this will send the user to the details view page. 
   */
  // const handleDetail = () => {
  //   console.log('In handleDetail, kit:', kit?.name);
  //   // ⬇ Navigate user to detailed view: 
  //   history.push(`/detail/${kit.id}`);
  // } // End handleDetail
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="KitItemEvents-wrapper" key={kit?.id}>

      <div className="KitItem-name">
        {kit?.name}
        <Button
          color="primary"
          size="small"
        >
          Add
        </Button>
        <Button
          color="secondary"
          size="small"
        >
          Remove
        </Button>
      </div>

    </div>
  ) // End return
} // End KitItem