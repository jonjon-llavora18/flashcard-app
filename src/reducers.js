import {Map, List} from 'immutable';
import * as c from './constants';

export const cards = (state=[], action) => {
  switch(action.type) {
    case c.ADD_CARD:
      const newCard  = Map({
        score: 1, 
        id: +new Date()
      }).merge(Map(action.data));
      
      const newState = List(state).push(newCard).toJS();

      return newState === state ? state : newState;

    default:
      return state;
  }
}

export const decks = (state=[], action) => {
  switch(action.type) {
    case c.ADD_DECK:
      const newDeck = Map({
        name: action.data, 
        id: +new Date()
      });
      const newState = List(state).push(newDeck).toJS();
      return newState === state ? state : newState;

    default:
      return state;
  }
}

export const addingDeck = (state=false, action) => {
  switch(action.type) {
    case c.SHOW_ADD_DECK: return true;
    case c.HIDE_ADD_DECK: return false;
    default: return state;
  }
}
