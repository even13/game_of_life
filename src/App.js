import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';
import Shape from './models/shape/shape';

class App extends React.Component {
    state = {
      model: new Grid(),
      coords: [],
      playerTurn: 1,
      isPlacingShape: false,
      evolutionRate: 50,
      maxIterations: 100,
      iterationCount: 0,
    }

    oneEvolution = () => {
      this.evolve();
    }

    runGame = () => {
      this.setState({
        iterationCount: 0,
      });
      this.evolve();
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
      if (this.state.isPlacingShape) {
        const shape = Shape.create(this.state.isPlacingShape, coord);
        this.placeLiveCell(shape);
        return;
      } if (isClicked) {
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

      window.setTimeout(() => {
        this.setState((prevState) => ({ iterationCount: prevState.iterationCount + 1 }));
        if (this.state.iterationCount === this.state.maxIterations) {
          this.setState({
          });
          return;
        }

        this.evolve();
      }, this.state.evolutionRate);
    }

    togglePlayer = () => {
      if (this.state.playerTurn === 1) {
        this.setState({ playerTurn: 2 });
      } else {
        this.setState({ playerTurn: 1 });
      }
    }

    placeShape = (shape) => {
      this.setState({ isPlacingShape: shape });
    }

    handleRateChange = (event) => {
      this.setState({ evolutionRate: +event.target.value });
    }

    handleIterationChange = (event) => {
      this.setState({ maxIterations: +event.target.value });
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

          <div id="shape choices">
            <button type="button" data-test="create-spinner" onClick={() => { this.placeShape('spinner'); }}>Create A Spinner</button>
            <button type="button" data-test="create-spaceship" onClick={() => { this.placeShape('spaceship'); }}>Create A Spaceship</button>
            <button type="button" data-test="create-bird" onClick={() => { this.placeShape('bird'); }}>Create A Bird</button>
          </div>

          <div>
            <button type="button" onClick={this.oneEvolution} data-test="evolution-button">Click To Evolve</button>
            <button type="button" onClick={this.togglePlayer} data-test="player-toggle">Click To Toggle Player</button>
          </div>

          <div>Evolution Rate</div>
          <input value={this.state.evolutionRate} onChange={this.handleRateChange} data-test="evolution-rate" />
          <span> milliseconds</span>

          <div>Iterations</div>
          <input value={this.state.maxIterations} onChange={this.handleIterationChange} data-test="iterations" />
          <span> /sec</span>

          <button type="button" onClick={this.runGame} data-test="run-button">Run</button>
        </div>
      );
    }
}

export default App;
