import React from 'react';
import {showAddDeck} from '../actions';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapDispatch = dispatch => ({
	showAddDeck: () => dispatch(showAddDeck())
});

const Toolbar = ({showAddDeck, deckId}) => {
	const deckTools = deckId ? (<div>
			<Link className="btn" to="/">Home</Link>
			<Link className="btn" to={`/deck/${deckId}/new`}>+ New Card</Link>
			<Link className="btn" to={`/deck/${deckId}/study`}>Study Deck</Link>
		</div>) : null;

	return (
		<div className="toolbar">
			<div>
				<button onClick={showAddDeck}>+ New Team</button>
			</div>
			{deckTools}
		</div>
	)
}

export default connect(null, mapDispatch)(Toolbar);
