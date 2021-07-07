//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root itemSaga:
function* itemSaga() {
  yield takeEvery('FETCH_ALL_ITEMS', fetchAllItems);
  yield takeEvery('ADD_NEW_ITEM', addNewItem);
  yield takeEvery('FLIP_IS_PACKED', packSingleItem);
  yield takeEvery('DELETE_ITEM', deleteSingleItem);
  yield takeEvery('PACK_ALL_ITEMS', packAllItems);
  yield takeEvery('UNPACK_ALL_ITEMS', unpackAllItems)
} // End itemSaga


// #region ⬇⬇ All itemSaga functions below:
function* fetchAllItems(action) {
  console.log('In fetchAllItems Saga, action:', action.payload);
  // ⬇ Declaring variable to hold kitId:
  const kitId = action.payload.id;
  console.log('kitId is:', kitId);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get(`/api/items/${kitId}`);
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
  // ⬇ Declaring variable to hold kitId:
  const kitId = action.payload.kit_id;
  console.log('kitId is:', kitId);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post(`/api/items/${kitId}`, action.payload);
    console.log('addNewItem response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_ALL_ITEMS', payload: { id: response.data } });
  } // End try
  catch (error) {
    console.error('addNewItem error:', error);
  } // End catch
} // End addNewItem

function* packSingleItem(action) {
  console.log('In packSingleItem Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const itemId = action.payload.id;
  const kitId = action.payload.kit_id;
  console.log('itemId is:', itemId);
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.put(`/api/items/${itemId}/${kitId}`, action.payload);
    // ⬇ Logging the response:
    console.log('packSingleItem response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_ALL_ITEMS', payload: response.data });
  } // End try
  catch (error) {
    console.error('packSingleItem error:', error);
  } // End catch
} // End packSingleItem

function* deleteSingleItem(action) {
  console.log('In deleteSingleItem Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const itemId = action.payload.id;
  const kitId = action.payload.kit_id;
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.delete(`/api/items/${itemId}/${kitId}`);
    // ⬇ Logging the response:
    console.log('deleteSingleItem response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_ALL_ITEMS', payload: { id: response.data } });
  } // End try
  catch (error) {
    console.error('deleteSingleItem error:', error);
  } // End catch
} // End deleteSingleItem

function* packAllItems(action) {
  console.log('In packAllItems Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const kitId = action.payload.kit_id;
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.put(`/api/items/packall/${kitId}`, action.payload);
    // ⬇ Logging the response:
    console.log('packAllItems response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_ALL_ITEMS', payload: response.data });
  } // End try
  catch (error) {
    console.error('packAllItems error:', error);
  } // End catch
} // End packAllItems

function* unpackAllItems(action) {
  console.log('In unpackAllItems Saga, action:', action.payload);
  // ⬇ Declaring variable to hold the ID:
  const kitId = action.payload.kit_id;
  console.log('itemId is:', itemId);
  try {
    // ⬇ Sending the ID to server:
    const response = yield axios.put(`/api/items/unpackall/${kitId}`, action.payload);
    // ⬇ Logging the response:
    console.log('unpackAllItems response:', response.data);
    // ⬇ GET to refresh data, have to use response.data to get kit_id:
    yield put({ type: 'FETCH_ALL_ITEMS', payload: response.data });
  } // End try
  catch (error) {
    console.error('unpackAllItems error:', error);
  } // End catch
} // End unpackAllItems
//#endregion ⬆⬆ itemSaga functions above. 


export default itemSaga;
