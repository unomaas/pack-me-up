//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root itemSaga:
function* itemSaga() {
  yield takeEvery('FETCH_ALL_ITEMS', fetchAllItems);
  yield takeEvery('ADD_NEW_ITEM', addNewItem);
  yield takeEvery('SUBMIT_ITEM_EDIT', editSingleItem);
  yield takeEvery('DELETE_ITEM', deleteSingleItem);
} // End itemSaga


// #region ⬇⬇ All itemSaga functions below:
function* fetchAllItems() {
  console.log('In fetchAllItems Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/items');
    console.log('fetchAllItems response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_ALL_ITEMS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchAllItems:', error);
  } // End catch
} // End fetchAllItems

function* addNewItem(action) {
  console.log('In addNewItem Saga, action:', action.payload);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post('/api/items', action.payload);
    console.log('addNewItem response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_ALL_ITEMS' });
  } // End try
  catch (error) {
    console.error('addNewItem error:', error);
  } // End catch
} // End addNewItem

function* editSingleItem(action) {
  console.log('In editSingleItem Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const itemId = action.payload.id;
  console.log('itemId is:', itemId);
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.put(`/api/items/${itemId}`, action.payload);
    // ⬇ Logging the response:
    console.log('editSingleItem response:', response.data);
    // ⬇ Clearing the edit reducer:
    yield put({ type: 'CLEAR_EDIT' });
  } // End try
  catch (error) {
    console.error('editSingleItem error:', error);
  } // End catch
} // End editSingleItem

function* deleteSingleItem(action) {
  console.log('In deleteSingleItem Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const itemId = action.payload.id;
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.delete(`/api/items/${itemId}`, action.payload);
    // ⬇ Logging the response:
    console.log('deleteSingleItem response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_ALL_ITEMS' });
  } // End try
  catch (error) {
    console.error('deleteSingleItem error:', error);
  } // End catch
} // End deleteSingleItem
//#endregion ⬆⬆ itemSaga functions above. 


export default itemSaga;
