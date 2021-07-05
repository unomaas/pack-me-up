//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './KitDetail.css';
import ItemView from '../ItemView/ItemView';
// ⬇ Dependent functionality:
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/EditOutlined';
//#endregion ⬆⬆ Document setup above. 


export default function KitDetail() {
  //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const kitDetail = useSelector((store) => store.kitsReducer.kitsDetailReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_KIT', payload: { id: params.id } });
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:

  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="KitDetail-wrapper" key={kitDetail?.id}>

      <div>
        <h2>{kitDetail?.id}</h2>
        <h2>{kitDetail?.kit_name}</h2>
        <h2>{kitDetail?.kit_description}</h2>
      </div>

      {/* <img
        className="movies-image"
        src={movieDetail?.poster}
        alt={movieDetail?.title}
      />

      <div className="MovieDetail-description">
        <h3>Description:</h3>
        <p>{movieDetail?.description}</p>
        <h3>Genres:</h3>
        <p>{movieDetail?.genres}</p>
      </div> */}

      <div>
        <Button
          name="back"
          onClick={() => history.goBack()}
          // onClick={() => history.push(`/dashboard`)}

          variant="outlined"
          color="secondary"
          size="small"
        >
          <ArrowBackIcon />
        </Button> &nbsp;

        <Button
          name="edit"
          onClick={() => history.push(`/kitedit/${kitDetail?.id}`)}
          variant="outlined"
          color="primary"
          size="small"
        >
          <EditIcon />
        </Button>

        <br /> <br />

        <ItemView kit={kitDetail} />

      </div>

    </div>
  ) // End return 
} // End MovieDetail
