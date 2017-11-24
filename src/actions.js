import * as c from './constants';

export const addDeck        = name => ({type: c.ADD_DECK, data: name});
export const showAddDeck    = ()   => ({type: c.SHOW_ADD_DECK});
export const hideAddDeck    = ()   => ({type: c.HIDE_ADD_DECK});
export const showUpdateDeck = ()   => ({type: c.SHOW_UPDATE_DECK});
export const hideUpdateDeck = ()   => ({type: c.HIDE_UPDATE_DECK});
export const updateDeck     = data => ({type: c.UPDATE_DECK, data: data});
export const deleteDeck     = id   => ({type: c.DELETE_DECK, data: id});

export const addCard        = card => ({type: c.ADD_CARD, data: card});

