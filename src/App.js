import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';

class App extends React.Component {
  render() {
    return (
      <div className="App" data-test='component-app'>
        <GridDisplay data-test='component-grid-display' />
      </div>
    );
  }
}

export default App;
