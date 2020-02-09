import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

// const instance = new Grid(5);
// instance.placeFlag([[3, 2]]);

class App extends React.Component {
    state = {
      model: new Grid(),
      coords: [],
      playerTurn: 1,
      isPlacingShape: false,
    }

    placeLiveCell = (coord) => {
      const updatedCoords = [...this.state.coords];
      updatedCoords.push(coord);
      const updatedModel = this.state.model;
      updatedModel.placeCells([coord], this.state.playerTurn);

      this.setState(() => ({
        model: updatedModel,
        coords: updatedCoords,
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
      if (this.state.isPlacingShape === 'spinner') {
        console.log([[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]]);
        this.placeLiveCell([[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]]);
      } else if (this.state.isPlacingShape === 'spaceship') {
        // console.log([[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]]);
        this.placeLiveCell([[1, 3], [2, 1], [2, 3], [3, 2], [3, 3]]);
      }
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

    toggleShapePlacer = (shape) => {
      this.setState({ isPlacingShape: shape });
    }

    render() {
      return (
        <div className="App" data-test="component-app">
          <GridDisplay
            data-test="component-grid-display"
            model={this.state.model}
            playerTurn={this.state.playerTurn}
            onStateChange={this.handleCellState}
          />

          <div>
            <button type="button" data-test="create-spinner" onClick={() => { this.toggleShapePlacer('spinner') }}>Create A Spinner</button>
            <button type="button" data-test="create-spaceship" onClick={() => { this.toggleShapePlacer('spaceship') }}>Create A Spaceship</button>
          </div>
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
