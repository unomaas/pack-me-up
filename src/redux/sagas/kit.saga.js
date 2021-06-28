//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 

// ⬇ Master kitSaga:
function* kitSaga() {
  yield takeEvery('FETCH_ALL_KITS', fetchAllKits);
} // End kitSaga

// ⬇ kitSaga functions:
function* fetchAllKits() {
  console.log('In fetchAllKits Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/kits');
    console.log('fetchAllKits response :', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_ALL_KITS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchAllKits:', error);
  } // End catch
} // End fetchAllKits


export default kitSaga;
