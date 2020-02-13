/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import FormPage from './containers/FormPage/FormPage';
import GamePage from './containers/GamePage/GamePage';
import Classes from './App.module.css';

class App extends React.Component {
  state = {
    inGame: false,
    currentSettings: {},
  }

  toggleInGame = () => {
    this.setState((prevState) => {
      return { inGame: !prevState.inGame };
    });
  }

  commitSettings = (settings) => {
    this.setState({ currentSettings: settings });
  }
  
  render() {
    const gamePage = (
      <GamePage
        onReturn={this.toggleInGame}
        currentSettings={this.state.currentSettings}
      />
    );

    const formPage = (
      <FormPage
        onPlayGame={this.toggleInGame}
        onCommitSettings={this.commitSettings}
      />
    );

    const currentlyRenderedPage = this.state.inGame ? gamePage : formPage;
    return (
      <div className={Classes.App} data-test="component-app">
        {currentlyRenderedPage}
      </div>
    );
  }
}

export default App;
