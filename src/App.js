/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import FormPage from './containers/FormPage/FormPage';

class App extends React.Component {
  render() {
    return (
      <div className="App" data-test="component-app">
        {/* <GamePage /> */}
        <FormPage />
      </div>
    );
  }
}

export default App;
