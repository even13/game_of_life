/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Game from './containers/Game/Game';

class App extends React.Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        <Game />
      </div>
    );
  }
}

export default App;
