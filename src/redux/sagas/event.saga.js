//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 

// ⬇ Master eventSaga:
function* eventSaga() {
  yield takeEvery('FETCH_ALL_EVENTS', fetchAllEvents);
} // End eventSaga

// ⬇ eventSaga functions:
function* fetchAllEvents() {
  console.log('In fetchAllEvents Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/events');
    console.log('fetchAllEvents response :', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_ALL_EVENTS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchAllEvents:', error);
  } // End catch
} // End fetchAllEvents


export default eventSaga;
