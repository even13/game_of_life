import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
        model: new Grid(50),
        coords: []
    }

    placeLiveCell = (coord) => {
        const newArray = [...this.state.coords];
        newArray.push(coord);
        const updatedModel = this.state.model;
        updatedModel.place_cells(newArray)

        this.setState(() => {
            return {
                coords: newArray,
                model: updatedModel,
            }
        });
    }

    placeDeadCell = (coord) => {
        const model = this.state.model
        model.removeCells(coord)
        this.setState(() => {
            return {
                model: model,
            }
        });
    }

    handleCellState = (coord, isClicked) => {
        isClicked ? this.placeDeadCell(coord) : this.placeLiveCell(coord) 
    }

    evolve = () => {
        let updatedModel = {...this.state.model};
        updatedModel.evolve();
        this.setState({ 
            model: updatedModel,
            coords: [],
        });
    }

    render() {
        return (
            <div className="App" data-test='component-app'>
                <GridDisplay
                    data-test='component-grid-display'
                    model={this.state.model}
                    onStateChange={this.handleCellState} />

                <button 
                    onClick={this.evolve}
                    data-test='evolution-button'>Click To Evolve</button>
            </div>
        );
    }
};

export default App;
