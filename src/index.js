import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// REDUX
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import GaymerBearsAppReducer from './Reducers/Reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { fetchGaymers, fetchGames } from './Actions/Actions';

import './index.css';
import './Styles/spectre-icons.min.css';
import './Styles/spectre.min.css';
import './Styles/spectre-exp.min.css';

import FirebaseUtil from './Utils/InitializeFirebase';

let store;
if (process.env.NODE_ENV === 'production'){
  store = createStore(
    GaymerBearsAppReducer,
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    )
  );
} else {
  store = createStore(
    GaymerBearsAppReducer,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      createLogger() // neat middleware that logs actions
    )
  );
}


FirebaseUtil.init();

store.dispatch(fetchGaymers());
store.dispatch(fetchGames());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
