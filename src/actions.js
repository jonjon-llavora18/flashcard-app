import * as c from './constants';

export const addDeck     = name => ({type: c.ADD_DECK, data: name});
export const showAddDeck = ()   => ({type: c.SHOW_ADD_DECK});
export const hideAddDeck = ()   => ({type: c.HIDE_ADD_DECK});
