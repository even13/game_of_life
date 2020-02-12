/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import FormPage from './containers/FormPage/FormPage';
import GamePage from './containers/GamePage/GamePage';
import Classes from './App.module.css';

class App extends React.Component {
  render() {
    return (
      <div className={Classes.App} data-test="component-app">
        {/* <GamePage /> */}
        <FormPage />
      </div>
    );
  }
}

export default App;
