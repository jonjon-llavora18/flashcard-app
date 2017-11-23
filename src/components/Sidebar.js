import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
  addDeck, 
  showAddDeck, 
  hideAddDeck,
  showUpdateDeck,
  hideUpdateDeck,
  updateDeck
} from '../actions';

const mapState = ({decks, addingDeck, updatingDeck}) => ({
  decks, 
  addingDeck, 
  updatingDeck
});
const mapDispatch = dispatch => ({
  addDeck:      name => dispatch(addDeck(name)),
  showAddDeck:    () => dispatch(showAddDeck()),
  hideAddDeck:    () => dispatch(hideAddDeck()),
  showUpdateDeck: () => dispatch(showUpdateDeck()),
  hideUpdateDeck: () => dispatch(hideUpdateDeck()),
  updateDeck:   data => dispatch(updateDeck(data))
});

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUpdateDeck: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const addEl = ReactDOM.findDOMNode(this.refs.add);
    const updateEl = ReactDOM.findDOMNode(this.refs.update);

    if(addEl) addEl.focus()
    if(updateEl) updateEl.focus();
   }

 createDeck(evt) {
  if(evt.which !== 13) return;

  const name = ReactDOM.findDOMNode(this.refs.add).value;
  this.props.addDeck(name);
  this.props.hideAddDeck();
 }

 showUpdateDeck(evt) {
  const id = evt.target.getAttribute('data-id');
  this.setState({activeUpdateDeck: id});
  this.props.showUpdateDeck();
 }

 updateDeck(evt) {
  if(evt.which !== 13) return;
  
  const newName = ReactDOM.findDOMNode(this.refs.update).value;

  this.props.updateDeck({
    newName,
    id: this.state.activeUpdateDeck
  });

  this.props.hideUpdateDeck();
 }

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <div className="sidebar">
        <h2>All Decks</h2>
        <ul>
          {props.decks.map(({id, name}, i) => 
            <li key={i}>
              {props.updatingDeck ? 
                (
                  parseInt(state.activeUpdateDeck, 10) === id ? 
                  <input 
                    className="input-update" 
                    ref="update" 
                    defaultValue={name}
                    onKeyPress={this.updateDeck.bind(this)} /> : 
                  <Link to={`/deck/${id}`}>{name}</Link>
                ) : 
                <Link to={`/deck/${id}`}>{name}</Link>}
              <button 
                data-id={id} 
                className="edit-deck-btn" 
                onClick={this.showUpdateDeck.bind(this)}>edit</button>
            </li>
          )}
        </ul>
        {props.addingDeck && <input ref="add" onKeyPress={this.createDeck.bind(this)} />}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Sidebar);
