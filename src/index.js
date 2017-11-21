import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import {addDeck, showAddDeck, hideAddDeck} from './actions';
import * as reducers from './reducers';

import App from './components/App';
import Sidebar from './components/Sidebar';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers));
const history = syncHistoryWithStore(browserHistory, store);

function run() {
  const state = store.getState();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}></Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

run();
store.subscribe(run);
