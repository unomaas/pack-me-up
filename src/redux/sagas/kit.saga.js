import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* kitSaga() {
  yield takeEvery('FETCH_ALL_KITS', fetchAllKits);
}

function* fetchAllKits() {
  console.log('In fetchAllKits Saga');
  try {
    // ⬇ Calling to server to load data:
    const response = yield axios.get('/api/movie');
    console.log(', movies:', movies.data);
    // ⬇ Sending the data from the server to the reducer to hold:
    yield put({ type: 'SET_MOVIES', payload: movies.data });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } // End try
  catch (error) {
    console.error('Error in fetchAllKits:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  } // End catch
} // End fetchAllKits

export default registrationSaga;
