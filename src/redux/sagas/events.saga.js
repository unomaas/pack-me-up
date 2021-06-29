//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Master eventSaga:
function* eventSaga() {
  yield takeEvery('FETCH_ALL_EVENTS', fetchAllEvents);
  yield takeEvery('ADD_NEW_EVENT', addNewEvent);
  yield takeEvery('FETCH_EVENT_CATEGORIES', fetchEventCategories);
  yield takeEvery('ADD_EVENT_CATEGORY', addEventCategory);
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

function* fetchEventCategories() {
  console.log('In fetchEventCategories Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/events/categories');
    console.log('fetchEventCategories response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_EVENT_CATEGORIES', payload: response.data });
  } // End try
  catch (error) {
    console.error('fetchEventCategories error:', error);
  } // End catch
} // End fetchItemCategories

function* addEventCategory(action) {
  console.log('In addEventCategory Saga, action:', action.payload);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post('/api/events/categories', action.payload);
    console.log('addEventCategory response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_EVENT_CATEGORIES' });
  } // End try
  catch (error) {
    console.error('addEventCategory error:', error);
  } // End catch
} // End addEventCategory
//#endregion ⬆⬆ eventSaga functions above. 


export default eventSaga;
