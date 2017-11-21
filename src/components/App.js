import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';

const mapState = (props, {params: {deckId}}) => ({
  deckId
});

const App = ({children, deckId}) => {
  return (
    <div className="app">
      <Sidebar />
      <h2>Deck: {deckId}</h2>
      {children}
    </div>
  )
}

export default connect(mapState)(App);
