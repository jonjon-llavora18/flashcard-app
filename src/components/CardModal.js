import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';

class CardModal extends Component {
	componentDidUpdate(prevProps, prevState) {
		const el = ReactDOM.findDOMNode(this.refs.front);
		if(el) el.focus();
	}

	onSave(evt) {
		const front = ReactDOM.findDOMNode(this.refs.front).value;
		const back  = ReactDOM.findDOMNode(this.refs.back).value;

		this.props.checkCardPresence([
			{val: back, label: 'Back' },
			{val: front, label: 'Front'}
		]);

		if(this.props.cardErrors.length !== 0) {
			
		} else {
			this.props.onSave(Object.assign({}, this.props.card, {
				front,
				back
			}));
			browserHistory.push(`/deck/${this.props.card.deckId}`);
		}		
	}

	render() {
		let {card, onDelete, cardErrors} = this.props;

		return (
			<div className="modal">
				{cardErrors.map(err => err !== '' && <div>{err}</div>)}
				<h1>{onDelete ? 'Edit' : 'New'} Card</h1>
				<label>Card Front:</label>
				<textarea ref="front" defaultValue={card.front}></textarea>
				<label>Card Back</label>
				<textarea ref="back" defaultValue={card.back}></textarea>
				<p>
					<button onClick={this.onSave.bind(this)}>Save Card</button>
					<Link className="btn" to={`/deck/${card.deckId}`}>Cancel</Link>
				</p>
			</div>
		)
	}
}

export default CardModal;
