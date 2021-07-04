//#region ⬇⬇ All document setup below:
import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import kitsSaga from './kits.saga';
import eventsSaga from './events.saga';
import itemsSaga from './items.saga';
import eventsKits from './eventsKits.saga';
//#endregion ⬆⬆ All document setup above. 


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    kitsSaga(),
    eventsSaga(),
    itemsSaga(),
    eventsKits()
  ]); // End yield all
} // End rootSaga
