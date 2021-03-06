//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root eventsKits:
function* eventsKits() {
  yield takeEvery('FETCH_EVENTS_KITS', fetchEventsKits);
  yield takeEvery('ADD_EVENTS_KITS', addEventsKits);
  yield takeEvery('DELETE_EVENTS_KITS', deleteEventsKits);
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

function* addEventsKits(action) {
  console.log('In addEventsKits Saga, action:', action.payload);
  // ⬇ Declaring variable to hold kitId:
  const eventId = action.payload.event_id;
  console.log('eventId is:', eventId);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post(`/api/eventsKits/${eventId}`, action.payload);
    console.log('addEventsKits response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get event_id:
    yield put({ type: 'FETCH_EVENTS_KITS', payload: { id: response.data } });
  } // End try
  catch (error) {
    console.error('addEventsKits error:', error);
  } // End catch
} // End addEventsKits

function* deleteEventsKits(action) {
  console.log('In deleteEventsKits Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const eventsKitsId = action.payload.id;
  const eventId = action.payload.event_id;
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.delete(`/api/eventsKits/${eventsKitsId}/${eventId}`);
    // ⬇ Logging the response:
    console.log('deleteEventsKits response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_EVENTS_KITS', payload: { id: response.data } });
  } // End try
  catch (error) {
    console.error('deleteEventsKits error:', error);
  } // End catch
} // End deleteEventsKits

//#endregion ⬆⬆ eventsKits functions above. 


export default eventsKits;
