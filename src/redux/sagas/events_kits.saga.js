//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Root itemSaga:
function* eventsKitsSaga() {
  yield takeEvery('FETCH_ALL_ITEMS', fetchAllItems);

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


//#endregion ⬆⬆ itemSaga functions above. 


export default eventsKitsSaga;
