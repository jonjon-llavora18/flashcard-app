import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {addDeck, showAddDeck, hideAddDeck} from '../actions';

const mapState = ({decks, addingDeck}) => ({decks, addingDeck});
const mapDispatch = dispatch => ({
  addDeck: name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck())
});

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
        <ul>
          {props.decks.map((deck, i) => 
            <li key={i}>
              <Link to={`/deck/${deck.id}`}>{deck.name}</Link>
            </li>
          )}
        </ul>
        {props.addingDeck && <input ref="add" onKeyPress={this.createDeck.bind(this)} />}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Sidebar);
