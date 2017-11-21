import * as c from './constants';

export const cards = (state=[], action) => {
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

export const decks = (state=[], action) => {
  switch(action.type) {
    case c.ADD_DECK:
      let newDeck = {name: action.data, id: +new Date()}
      return state.concat([newDeck]);

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
