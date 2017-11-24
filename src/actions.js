import * as c from './constants';

export const addTeam        = name => ({type: c.ADD_TEAM, data: name});
export const updateTeam     = data => ({type: c.UPDATE_TEAM, data: data});
export const deleteTeam     = id   => ({type: c.DELETE_TEAM, data: id});
export const showAddTeam    = ()   => ({type: c.SHOW_ADD_TEAM});
export const hideAddTeam    = ()   => ({type: c.HIDE_ADD_TEAM});
export const showUpdateTeam = ()   => ({type: c.SHOW_UPDATE_TEAM});
export const hideUpdateTeam = ()   => ({type: c.HIDE_UPDATE_TEAM});
export const showDeleteTeam = ()   => ({type: c.SHOW_DELETE_TEAM});
export const hideDeleteTeam = ()   => ({type: c.HIDE_DELETE_TEAM});

