import React, {Component} from 'react';
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

class Sidebar extends Component {
  render() {
    const props = this.props;

    return (
      <div className="sidebar">
        <h2>All Decks</h2>
        <ul>
          {props.decks.map((deck, i) => <li key={i}>{deck.name}</li>)}
        </ul>
        {props.addingDeck && <input ref="add" />}
      </div>
    )
  }
}

ReactDOM.render(
  <App>
    <Sidebar
      decks={[{name: 'deck 1'}, {name: 'deck 2'}, {name: 'deck 3'}]}
      addingDeck={true} />
  </App>,
  document.getElementById('root')
);
