import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {Map} from 'immutable';

class CardModal extends Component {
  componentDidUpdate(prevProps, prevState) {
    ReactDOM.findDOMNode(this.refs.front).focus();
  }

  onSave(evt) {
    const front = ReactDOM.findDOMNode(this.refs.front).value;
    const back = ReactDOM.findDOMNode(this.refs.back).value;

    const card = Map(this.props.card).merge(Map({
      'front': front,
      'back': back
    })).toJS();

    this.props.onSave(card);
    browserHistory.push(`/deck/${this.props.card.deckId}`);
  }

  render() {
    let {card, onDelete} = this.props;

    return (
      <div className="modal">
        <h1>{onDelete ? 'Edit' : 'New'} Card</h1>
        <label>Card Front:</label>
        <textarea ref="front" defaultValue={card.front}></textarea>
        <label>Card Back:</label>
        <textarea ref="back" defaultValue={card.back}></textarea>
        <p>
          <button onClick={this.onSave.bind(this)}>Save Card</button>
          <Link className="btn" to={`/deck/${card.deckId}`}>Cancel</Link>
          {onDelete ?
            <button onClick={this.onDelete.bind(this)} className="delete">Delete Card</button>
            : null}
        </p>
      </div>
    )
  }
}

export default CardModal;
