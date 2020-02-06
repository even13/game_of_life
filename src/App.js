import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
      model: new Grid(30),
      coords: [],
      playerTurn: 1,
    }

    componentDidUpdate() {
      // console.log(this.state.coords)
    }

    placeLiveCell = (coord) => {
      const newArray = [...this.state.coords];
      newArray.push(coord);
      const updatedModel = this.state.model;
      updatedModel.placeCells(newArray, this.state.playerTurn);

      this.setState(() => ({
        model: updatedModel,
        coords: newArray,
      }));
    }

    placeDeadCell = (coord) => {
      const { model } = this.state;
      const coords = [...this.state.coords];
      const updatedCords = coords.filter((existingCoord) => !JSON.stringify(coord).includes(JSON.stringify(existingCoord)));
      model.removeCells(coord);
      this.setState(() => ({
        model,
        coords: updatedCords,
      }));
    }

    handleCellState = (coord, isClicked) => {
      if (isClicked) {
        this.placeDeadCell(coord);
      } else {
        this.placeLiveCell(coord);
      }
    }

    evolve = () => {
      const updatedModel = { ...this.state.model };
      updatedModel.evolve();
      this.setState(() => ({
        model: updatedModel,
        coords: updatedModel.getLiveCellCoordinates(),
      }));
    }

    togglePlayer = () => {
        if (this.state.playerTurn === 1) {
            this.setState({ playerTurn: 2 });
        } else {
            this.setState({ playerTurn: 1 });
        }
    }

    render() {
      return (
        <div className="App" data-test="component-app">
          <GridDisplay
            data-test="component-grid-display"
            model={this.state.model}
            onStateChange={this.handleCellState}
          />

          <button
            type="button"
            onClick={this.evolve}
            data-test="evolution-button"
          >
            Click To Evolve
          </button>
          <button
            type="button"
            onClick={this.togglePlayer}
            data-test="player-toggle"
          >
            Click To Toggle Player
          </button>
        </div>
      );
    }
}

export default App;
