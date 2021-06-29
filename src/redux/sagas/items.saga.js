//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root itemSaga:
function* itemSaga() {
  yield takeEvery('FETCH_ALL_ITEMS', fetchAllItems);
  yield takeEvery('ADD_NEW_ITEM', addNewItem);
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
//#endregion ⬆⬆ itemSaga functions above. 


export default itemSaga;
