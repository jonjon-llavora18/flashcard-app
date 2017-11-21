import {createStore} from 'redux';
import * as c from './constants';

const store = createStore((state=[], action) => {
	switch(action.type) {
		case c.ADD_CARD:
			let newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			});

			return Object.assign({}, state, {
				cards: state.cards ? state.cards.concat([newCard]) : [newCard]
			});

		default:
			return state || {cards: []}
	}
});

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch({
	type: c.ADD_CARD,
	data: {
		front: 'front',
		back: 'back'
	}
});

store.dispatch({
	type: c.ADD_CARD,
	data: {}
});
