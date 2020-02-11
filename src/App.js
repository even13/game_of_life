/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import GamePage from './containers/GamePage/GamePage';
import GameForm from './components/GameForm/GameForm';

class App extends React.Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        <GamePage />
        <GameForm />
      </div>
    );
  }
}

export default App;
