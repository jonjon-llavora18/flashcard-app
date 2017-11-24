import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {
  addTeam, 
  showAddTeam, 
  hideAddTeam,
  showUpdateTeam,
  hideUpdateTeam,
  updateTeam,
  deleteTeam
} from '../actions';

const mapState = ({teams, addingTeam, updatingTeam}) => ({
  teams, 
  addingTeam, 
  updatingTeam
});
const mapDispatch = dispatch => ({
  addTeam:      name => dispatch(addTeam(name)),
  showAddTeam:    () => dispatch(showAddTeam()),
  hideAddTeam:    () => dispatch(hideAddTeam()),
  showUpdateTeam: () => dispatch(showUpdateTeam()),
  hideUpdateTeam: () => dispatch(hideUpdateTeam()),
  updateTeam:   data => dispatch(updateTeam(data)),
  deleteTeam:     id => dispatch(deleteTeam(id))
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

 createTeam(evt) {
  if(evt.which !== 13) return;

  const name = ReactDOM.findDOMNode(this.refs.add).value;
  this.props.addTeam(name);
  this.props.hideAddTeam();
 }

 showUpdateTeam(id) {
  this.setState({activeUpdateTeam: id});
  this.props.showUpdateTeam();
 }

 updateTeam(evt) {
  if(evt.which !== 13) return;
  
  const newName = ReactDOM.findDOMNode(this.refs.update).value;

  this.props.updateTeam({
    newName,
    id: this.state.activeUpdateTeam
  });

  this.props.hideUpdateTeam();
 }

  render() {
    const props = this.props;
    const state = this.state;

    return (
      <div className="sidebar">
        <h2>All Teams</h2>
        <ul>
          {props.teams.map(({id, name}, i) => 
            <li key={i}>
              {props.updatingTeam ? 
                (
                  parseInt(state.activeUpdateTeam, 10) === id ? 
                  <input 
                    className="input-update" 
                    ref="update" 
                    defaultValue={name}
                    onKeyPress={this.updateTeam.bind(this)} /> : 
                  <Link to={`/team/${id}`}>{name}</Link>
                ) : 
                <Link to={`/team/${id}`}>{name}</Link>}
              <div className="sidebar-btn-container">
                <button 
                  className="edit-deck-btn" 
                  onClick={() => this.showUpdateTeam(id)}>e</button>
                <button 
                  className="delete-deck-btn"
                  onClick={() => props.deleteTeam(id)}>x</button>
              </div>
            </li>
          )}
        </ul>
        {props.addingTeam && 
          <input className="input-add" 
                 ref="add" 
                 onKeyPress={this.createTeam.bind(this)} />}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Sidebar);
