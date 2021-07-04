//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root eventsKits:
function* eventsKits() {
  yield takeEvery('FETCH_EVENTS_KITS', fetchEventsKits);

} // End eventsKits


// #region ⬇⬇ All eventsKits functions below:
function* fetchEventsKits(action) {
  console.log('In fetchEventsKits Saga, action:', action.payload);
  // ⬇ Declaring variable to hold kitId:
  const eventId = action.payload.id;
  console.log('eventId is:', eventId);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get(`/api/eventsKits/${eventId}`);
    console.log('fetchEventsKits response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_EVENTS_KITS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchEventsKits:', error);
  } // End catch
} // End fetchEventsKits


//#endregion ⬆⬆ eventsKits functions above. 


export default eventsKits;
