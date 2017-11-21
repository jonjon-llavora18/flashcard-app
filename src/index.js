import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import * as c from './constants';

const cards = (state=[], action) => {
  switch(action.type) {
    case c.ADD_CARD:
      let newCard = Object.assign({}, action.data, {
        score: 1,
        id: +new Date()
      });

      return state.concat([newCard]);

    default:
      return state;
  }
}

const store = createStore(combineReducers({
  cards
}));

const App = ({children}) => {
  return (
    <div className="app">
      {children}
    </div>
  )
}

ReactDOM.render(
  <App>Hello <strong>React</strong></App>,
  document.getElementById('root')
);
