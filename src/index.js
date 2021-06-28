//#region ⬇⬇ All document setup, below:
// ⬇ File Setup:
import './index.css';
import App from './components/App/App';
import rootReducer from './redux/reducers/_root.reducer'; // imports ./redux/reducers/index.js
import rootSaga from './redux/sagas/_root.saga'; // imports ./redux/sagas/index.js
// ⬇ Font setup:
import './fonts/OpenDyslexia/opendyslexic-regular-webfont.woff'
import './fonts/OpenDyslexia/opendyslexic-regular-webfont.woff2'
import './fonts/OpenDyslexia/opendyslexic-bold-webfont.woff'
import './fonts/OpenDyslexia/opendyslexic-bold-webfont.woff2'
import './fonts/OpenDyslexia/opendyslexic-italic-webfont.woff'
import './fonts/OpenDyslexia/opendyslexic-italic-webfont.woff2'
import './fonts/OpenDyslexia/opendyslexic-bolditalic-webfont.woff'
import './fonts/OpenDyslexia/opendyslexic-bolditalic-webfont.woff2'
// ⬇ React/Redux Setup:
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// ⬇ Middleware Setup:
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
//#endregion ⬆⬆ All document setup above.

//#region ⬇⬇ All Store & Middleware setup, below:
// ⬇ Create sagaMiddleware:
const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
// ⬇ Create middlewareList:
const middlewareList = process.env.NODE_ENV === 'development' ?
  [sagaMiddleware, logger] :
  [sagaMiddleware];

  // ⬇ Create one store to rule them all:
const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList),
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
// ⬇ Pass rootSaga into our sagaMiddleware:
sagaMiddleware.run(rootSaga);

// ⬇ Rendering:
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);
//#endregion ⬆⬆ All Store & Middleware setup above.