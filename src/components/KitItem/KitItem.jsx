//#region ⬇⬇ Document setup below: 
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//#endregion ⬆⬆ Document setup above. 


export default function KitItem({ kit }) {
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
    <div className="KitItem-wrapper" key={kit?.id} style={{cursor: "pointer"}}
    >

      <div className="KitItem-name">
        <span onClick={() => history.push(`/kitdetail/${kit.id}`)}>{kit?.kit_name}</span>
      </div>

    </div>
  ) // End return
} // End KitItem