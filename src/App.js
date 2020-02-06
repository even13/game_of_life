import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
        model: new Grid(30),
        coords: []
    }

    componentDidUpdate() {
        console.log(this.state.coords)
    }

    placeLiveCell = (coord) => {
        const newArray = [...this.state.coords];
        newArray.push(coord);
        const updatedModel = this.state.model;
        updatedModel.place_cells(newArray)

        this.setState(() => {
            return {
                model: updatedModel,
                coords: newArray,
            }
        });
    }

    placeDeadCell = (coord) => {
        const model = this.state.model
        const coords = [...this.state.coords]
        const updatedCords= coords.filter(existingCoord => !JSON.stringify(coord).includes(JSON.stringify(existingCoord)))
        model.removeCells(coord)
        this.setState(() => {
            return {
                model: model,
                coords: updatedCords,
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
            coords: updatedModel.getLiveCellCoordinates(),
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
