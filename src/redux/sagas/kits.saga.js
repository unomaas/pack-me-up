//#region ⬇⬇ All document setup below:
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
//#endregion ⬆⬆ All document setup above. 


// ⬇ Master kitSaga:
function* kitSaga() {
  yield takeEvery('FETCH_ALL_KITS', fetchAllKits);
  yield takeEvery('ADD_NEW_KIT', addNewKit);
  yield takeEvery('FETCH_KIT_CATEGORIES', fetchKitCategories);
  yield takeEvery('ADD_KIT_CATEGORY', addKitCategory);
} // End kitSaga


//#region ⬇⬇ All kitSaga functions below:
function* fetchAllKits() {
  console.log('In fetchAllKits Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/kits');
    console.log('fetchAllKits response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_ALL_KITS', payload: response.data });
  } // End try
  catch (error) {
    console.error('Error in fetchAllKits:', error);
  } // End catch
} // End fetchAllKits

function* addNewKit(action) {
  console.log('In addNewKit Saga, action:', action.payload);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post('/api/kits', action.payload);
    console.log('addNewKit response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_ALL_KITS' });
  } // End try
  catch (error) {
    console.error('addNewKit error:', error);
  } // End catch
} // End addNewKit

function* fetchKitCategories() {
  console.log('In fetchKitCategories Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/kits/categories');
    console.log('fetchKitCategories response:', response.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_KIT_CATEGORIES', payload: response.data });
  } // End try
  catch (error) {
    console.error('fetchKitCategories error:', error);
  } // End catch
} // End fetchKitCategories

function* addKitCategory(action) {
  console.log('In addKitCategory Saga, action:', action.payload);
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.post('/api/kits/categories', action.payload);
    console.log('addKitCategory response:', response.data);
    // ⬇ GET to refresh data:
    yield put({ type: 'FETCH_KIT_CATEGORIES' });
  } // End try
  catch (error) {
    console.error('addKitCategory error:', error);
  } // End catch
} // End addKitCategory
//#endregion ⬆⬆ kitSaga functions above. 


export default kitSaga;