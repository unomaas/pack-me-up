//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Master eventSaga:
function* eventSaga() {
  yield takeEvery('FETCH_ALL_EVENTS', fetchAllEvents);
  yield takeEvery('ADD_NEW_EVENT', addNewEvent);
} // End eventSaga


//#region ⬇⬇ All eventSaga functions below:
function* fetchAllEvents() {
  console.log('In fetchAllEvents Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/events');
    console.log('fetchAllEvents response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_ALL_EVENTS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchAllEvents:', error);
  } // End catch
} // End fetchAllEvents

function* addNewEvent(action) {
  console.log('In addNewEvent Saga, action:', action.payload);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post('/api/events', action.payload);
    console.log('addNewEvent response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_ALL_EVENTS' });
  } // End try
  catch (error) {
    console.error('addNewEvent error:', error);
  } // End catch
} // End addNewEvent
//#endregion ⬆⬆ eventSaga functions above. 


export default eventSaga;
