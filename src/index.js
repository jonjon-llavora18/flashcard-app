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
