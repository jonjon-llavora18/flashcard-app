import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Display from './parts/Display';

import {
  addTeam, 
  showAddTeam, 
  hideAddTeam,
  showUpdateTeam,
  hideUpdateTeam,
  updateTeam,
  deleteTeam,
  showDeleteTeam,
  hideDeleteTeam
} from '../actions';

const mapState = ({
  teams, 
  addingTeam, 
  updatingTeam,
  deletingTeam
}) => ({
  teams, 
  addingTeam, 
  updatingTeam,
  deletingTeam
});
const mapDispatch = dispatch => ({
  addTeam:      name => dispatch(addTeam(name)),
  showAddTeam:    () => dispatch(showAddTeam()),
  hideAddTeam:    () => dispatch(hideAddTeam()),
  showUpdateTeam: () => dispatch(showUpdateTeam()),
  hideUpdateTeam: () => dispatch(hideUpdateTeam()),
  updateTeam:   data => dispatch(updateTeam(data)),
  deleteTeam:     id => dispatch(deleteTeam(id)),
  showDeleteTeam: () => dispatch(showDeleteTeam()),
  hideDeleteTeam: () => dispatch(hideDeleteTeam())
});

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUpdateTeam: 0,
      activeDeleteTeam: 0
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

 showDeleteTeam(id) {
  this.setState({activeDeleteTeam: id});
  this.props.showDeleteTeam();
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
              <Display condition={props.updatingTeam && !props.deletingTeam}>
                <Display condition={parseInt(state.activeUpdateTeam, 10) === id}> 
                  <input 
                    className="input-update" 
                    ref="update" 
                    defaultValue={name}
                    onKeyPress={this.updateTeam.bind(this)} /> 
                </Display>
                <Display condition={parseInt(state.activeUpdateTeam, 10) !== id}>
                  <Link to={`/team/${id}`}>{name}</Link>
                  <div className="sidebar-btn-container">
                    <button 
                      className="edit-deck-btn" 
                      onClick={() => this.showUpdateTeam(id)}>e</button>
                    <button 
                      className="delete-deck-btn"
                      onClick={() => this.showDeleteTeam(id)}>x</button>
                  </div>
                </Display>
              </Display>

              <Display condition={!props.updatingTeam && props.deletingTeam}>
                <Display condition={parseInt(state.activeDeleteTeam, 10) === id}> 
                  <div className="delete-team-prompt">
                    Are you sure? 
                    <span onClick={props.hideDeleteTeam}>No</span>
                    <span onClick={() => props.deleteTeam(id)}>Yes</span>
                  </div>
                </Display> 
                <Display condition={parseInt(state.activeDeleteTeam, 10) !== id}>
                  <Link to={`/team/${id}`}>{name}</Link>
                  <div className="sidebar-btn-container">
                    <button 
                      className="edit-deck-btn" 
                      onClick={() => this.showUpdateTeam(id)}>e</button>
                    <button 
                      className="delete-deck-btn"
                      onClick={() => this.showDeleteTeam(id)}>x</button>
                  </div>
                </Display>
              </Display>

              <Display condition={!props.updatingTeam && !props.deletingTeam}> 
                <Link to={`/team/${id}`}>{name}</Link>
                <div className="sidebar-btn-container">
                  <button 
                    className="edit-deck-btn" 
                    onClick={() => this.showUpdateTeam(id)}>e</button>
                  <button 
                    className="delete-deck-btn"
                    onClick={() => this.showDeleteTeam(id)}>x</button>
                </div>
              </Display>              
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
