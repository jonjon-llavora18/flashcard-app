import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const mapState = (props, {params: {deckId}}) => ({
  deckId
});

const App = ({children, deckId}) => {
  return (
    <div className="app">
    	<div className="banner">
    		<img src="/images/logo.png" alt="Basketball Central" />
    		<h3>Basketball Central</h3>
    	</div>
    	<Toolbar deckId={deckId} />
      <Sidebar />
      {children}
    </div>
  )
}

export default connect(mapState)(App);
