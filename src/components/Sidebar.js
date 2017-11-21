import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Sidebar extends Component {
  componentDidUpdate(prevProps, prevState) {
    const el = ReactDOM.findDOMNode(this.refs.add);
    if(el) el.focus()
   }

 createDeck(evt) {
  if(evt.which !== 13) return;

  const name = ReactDOM.findDOMNode(this.refs.add).value;
  this.props.addDeck(name);
  this.props.hideAddDeck();
 }

  render() {
    const props = this.props;

    return (
      <div className="sidebar">
        <h2>All Decks</h2>
        <button onClick={props.showAddDeck}>
          + New Deck
        </button>
        <ul>
          {props.decks.map((deck, i) => <li key={i}>{deck.name}</li>)}
        </ul>
        {props.addingDeck && <input ref="add" onKeyPress={this.createDeck.bind(this)} />}
      </div>
    )
  }
}

export default Sidebar;
