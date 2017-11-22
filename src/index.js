import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import * as reducers from './reducers';
import * as localStore from './localStore';

import App from './components/App';
import VisibleCards from './components/VisibleCards';

reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), localStore.get());
const history = syncHistoryWithStore(browserHistory, store);

function run() {
  const state = store.getState();
  localStore.set(state, ['cards', 'decks']);

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/deck/:deckId" component={VisibleCards} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

run();
store.subscribe(run);
