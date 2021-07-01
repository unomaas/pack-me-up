//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Main eventSaga:
function* eventSaga() {
  yield takeEvery('FETCH_ALL_EVENTS', fetchAllEvents);
  yield takeEvery('ADD_NEW_EVENT', addNewEvent);
  yield takeEvery('FETCH_EVENT_CATEGORIES', fetchEventCategories);
  yield takeEvery('ADD_EVENT_CATEGORY', addEventCategory);
  yield takeEvery('FETCH_SINGLE_EVENT', fetchSingleEvent);
  yield takeEvery('SUBMIT_EVENT_EDIT', editSingleEvent);
  yield takeEvery('DELETE_EVENT', deleteSingleEvent);
} // End Main eventSaga


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

function* fetchSingleEvent(action) {
  console.log('In fetchSingleEvent Saga, action:', action.payload);
  // ⬇ Declaring variable to hold eventId:
  const eventId = action.payload.id;
  console.log('eventId is:', eventId);
  try {
    // ⬇ Sending movieId to server:
    const response = yield axios.get(`/api/events/${eventId}`);
    // ⬇ Logging the response:
    console.log('fetchSingleEvent response:', response.data[0]);
    // ⬇ Sending the response to our reducers to hold:
    yield put({ type: 'SET_EVENT_DETAIL', payload: response.data[0] });
    // ⬇ Will also set the edit reducer on page load:
    yield put({ type: 'SET_EVENT_EDIT', payload: response.data[0] });
  } // End try
  catch (error) {
    console.error('fetchSingleEvent error:', error);
  } // End catch
} // End fetchSingleEvent

function* editSingleEvent(action) {
  console.log('In editSingleEvent Saga, action:', action.payload);
  // ⬇ Declaring variable to hold eventId:
  const eventId = action.payload.id;
  console.log('eventId is:', eventId);
  try {
    // ⬇ Sending movieId to server:
    const response = yield axios.put(`/api/events/${eventId}`, action.payload);
    // ⬇ Logging the response:
    console.log('editSingleEvent response:', response.data);
    // ⬇ Clearing the edit reducer:
    yield put({ type: 'CLEAR_EDIT' });
  } // End try
  catch (error) {
    console.error('editSingleEvent error:', error);
  } // End catch
} // End editSingleEvent

function* deleteSingleEvent(action) {
  console.log('In deleteSingleEvent Saga, action:', action.payload);
  // ⬇ Declaring variable to hold kitId:
  const eventId = action.payload.id;
  try {
    // ⬇ Sending kitId to server:
    const response = yield axios.delete(`/api/events/${eventId}`, action.payload);
    // ⬇ Logging the response:
    console.log('deleteSingleEvent response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_ALL_EVENTS' });
  } // End try
  catch (error) {
    console.error('deleteSingleEvent error:', error);
  } // End catch
} // End deleteSingleEvent
//#endregion ⬆⬆ eventSaga functions above. 


export default eventSaga;
