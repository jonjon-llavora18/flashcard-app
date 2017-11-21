import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import * as c from './constants';

const addDeck = name => ({type: c.ADD_DECK, data: name});
const showAddDeck = () => ({type: c.SHOW_ADD_DECK});
const hideAddDeck = () => ({type: c.HIDE_ADD_DECK});

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

const decks = (state=[], action) => {
  switch(action.type) {
    case c.ADD_DECK:
      let newDeck = {name: action.data, id: +new Date()}
      return state.concat([newDeck]);

    default:
      return state;
  }
}

const addingDeck = (state=false, action) => {
  switch(action.type) {
    case c.SHOW_ADD_DECK: return true;
    case c.HIDE_ADD_DECK: return false;
    default: return state;
  }
}

const store = createStore(combineReducers({
  cards,
  decks,
  addingDeck
}));

const App = ({children}) => {
  return (
    <div className="app">
      {children}
    </div>
  )
}

class Sidebar extends Component {
  componentDidUpdate(prevProps, prevState) {
    const el = ReactDOM.findDOMNode(this.refs.add);
    if(el) el.focus()
   }

 createDeck(evt) {
  if(evt.which !== 13) return;

  const name = ReactDOM.findDOMNode(this.refs.add).value;
  this.props.addDeck(name);
  this.props.hideAddDeck();
 }

  render() {
    const props = this.props;

    return (
      <div className="sidebar">
        <h2>All Decks</h2>
        <button onClick={props.showAddDeck}>
          + New Deck
        </button>
        <ul>
          {props.decks.map((deck, i) => <li key={i}>{deck.name}</li>)}
        </ul>
        {props.addingDeck && <input ref="add" onKeyPress={this.createDeck.bind(this)} />}
      </div>
    )
  }
}

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
