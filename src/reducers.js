import {Map, List} from 'immutable';
import * as c from './constants';

export const teams = (state=[], action) => {
  switch(action.type) {
    case c.ADD_TEAM:
      const newTeam = Map({
        name: action.data, 
        id: +new Date()
      });
      const newState = List(state).push(newTeam).toJS();
      return newState === state ? state : newState;

    case c.UPDATE_TEAM:
      const {id, newName} = action.data;
      const updatedState = List(state).map(val => 
        Map(val).get('id') === parseInt(id, 10) ? 
        Map(val).set('name', newName) : 
        Map(val)
      ).toJS();
      return updatedState === state ? state : updatedState;

    case c.DELETE_TEAM:
      const deletedState = List(state).filter(val => 
        Map(val).get('id') !== parseInt(action.data, 10) && Map(val)).toJS();
      return deletedState === state ? state : deletedState;

    default:
      return state;
  }
}

export const addingTeam = (state=false, action) => {
  switch(action.type) {
    case c.SHOW_ADD_TEAM: return true;
    case c.HIDE_ADD_TEAM: return false;
    default: return state;
  }
}

export const updatingTeam = (state=false, action) => {
  switch(action.type) {
    case c.SHOW_UPDATE_TEAM: return true;
    case c.HIDE_UPDATE_TEAM: return false;
    default: return state;
  }
}
