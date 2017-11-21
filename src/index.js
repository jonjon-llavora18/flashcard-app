import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import * as c from './constants';

import {addDeck, showAddDeck, hideAddDeck} from './actions';
import * as reducers from './reducers';

import App from './components/App';
import Sidebar from './components/Sidebar';

const store = createStore(combineReducers(reducers));

function run() {
  const state = store.getState();

  ReactDOM.render(
    <App>
      <Sidebar
        decks={state.decks}
        addingDeck={state.addingDeck}
        addDeck={name => store.dispatch(addDeck(name))}
        showAddDeck={() => store.dispatch(showAddDeck())}
        hideAddDeck={() => store.dispatch(hideAddDeck())} />
    </App>,
    document.getElementById('root')
  );
}

run();
store.subscribe(run);
