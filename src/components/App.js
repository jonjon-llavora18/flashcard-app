import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Banner from './parts/Banner';

const mapState = (props, {params: {teamId}}) => ({
  teamId
});

const App = ({children, teamId}) => {
  return (
    <div className="app">
    	<Banner />
    	<Toolbar teamId={teamId} />
      <Sidebar />
      {children}
    </div>
  )
}

export default connect(mapState)(App);
