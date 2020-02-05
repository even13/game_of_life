import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
        model: new Grid(),
        coords: []
    }

    changeState = (coord) => {
        const newArray = [...this.state.coords];
        newArray.push(coord);
        const newGrid = new Grid();
        newGrid.place_cells(newArray);

        this.setState(() => {
            return {
                coords: newArray,
                model: newGrid
            }
        })
    }

    render() {
        return (
            <div className="App" data-test='component-app'>
                <GridDisplay
                    data-test='component-grid-display'
                    model={this.state.model}
                    onStateChange={this.changeState} />
            </div>
        );
    }
};

export default App;
