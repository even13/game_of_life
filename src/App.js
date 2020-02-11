/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import GamePage from './containers/GamePage/GamePage';

class App extends React.Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        <GamePage />
      </div>
    );
  }
}

export default App;
