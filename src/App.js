import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
        model: new Grid()
    }
    render() {
        return (
            <div className="App" data-test='component-app'>
                <GridDisplay
                    data-test='component-grid-display'
                    model={ this.state.model } />
            </div>
        );
    }
}

export default App;
