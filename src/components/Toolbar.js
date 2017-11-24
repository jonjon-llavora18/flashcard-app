import React from 'react';
import {showAddTeam} from '../actions';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapDispatch = dispatch => ({
	showAddTeam: () => dispatch(showAddTeam())
});

const Toolbar = ({showAddTeam, teamId}) => {
	const deckTools = teamId ? 
		(<div><Link className="btn" to="/">Home</Link></div>) :
		 null;

	return (
		<div className="toolbar">
			<div>
				<button onClick={showAddTeam}>+ New Team</button>
			</div>
			{deckTools}
		</div>
	)
}

export default connect(null, mapDispatch)(Toolbar);
