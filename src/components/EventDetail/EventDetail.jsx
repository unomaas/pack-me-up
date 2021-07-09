//#region ⬇⬇ Document setup below: 
// ⬇ File setup: 
import './EventDetail.css';
import KitView from '../KitView/KitView';
// ⬇ Dependent functionality:
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useStyles } from '../MuiStyling/MuiStyling';
// ⬇ Icons:
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/EditOutlined';
//#endregion ⬆⬆ Document setup above. 


export default function EventDetail() {
  //#region ⬇⬇ All state variables below:
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const eventDetail = useSelector((store) => store.eventsReducer.eventsDetailReducer);
  // ⬇ GET on page load:
  useEffect(() => {
    dispatch({ type: 'FETCH_SINGLE_EVENT', payload: { id: params.id } })
  }, [params.id]); // ⬅ Will re-run this effect if the URL changes. 
  //#endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  //#endregion ⬆⬆ Event handles above. 


  // ⬇ Rendering:
  return (
    <div className="EventDetail-wrapper" key={eventDetail?.id}>

      <div>
        <h2>Viewing the {eventDetail?.event_name} Event</h2>
        <h3>{eventDetail?.event_description}</h3>
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
          onClick={() => history.push('/dashboard')}
          variant="outlined"
          color="secondary"
          className={classes.buttons}
        >
          <ArrowBackIcon />
        </Button> &nbsp;

        <Button
          name="edit"
          onClick={() => history.push(`/eventedit/${eventDetail?.id}`)}
          variant="outlined"
          color="primary"
          className={classes.buttons}
        >
          <EditIcon />
        </Button>

        <br /> <br />

        <KitView event={eventDetail} />

      </div>

    </div>
  ) // End return 
} // End MovieDetail
