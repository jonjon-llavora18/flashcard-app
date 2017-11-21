import {Map} from 'immutable';
import {expect} from 'chai';

describe('cards', () => {
	function addCard(currentState, card) {
		let cards = currentState.merge(card);
		let state = Map();

		return state.set('cards', cards);
	}

	it('is added to state', () => {
		let state = Map({
			score: 1,
			id: '031893'
		});
		let card = Map({
			front: 'front',
			back: 'back'
		});
		let nextState = addCard(state, card);
		let expectedState = {
			score: 1,
			id: '031893',
			front: 'front',
			back: 'back'
		};

		expect(nextState).to.equal(Map({
			cards: Map(expectedState)
		}));
	});

});
