import React from 'react';
import './Game.css';
import GridDisplay from '../../components/GridDisplay/GridDisplay';
import Grid from '../../models/grid/grid';
import Shape from '../../models/shape/shape';
import UserControls from '../../components/UserControls/UserControls';

class Game extends React.Component {
  state = {
    model: new Grid(30),
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
    if (this.props.playerOneCellsRemaining && this.props.playerOneCellsRemaining - coord.length <= 0) return;
    // if there are cellbars on that specific gamepage, run the logic below
    // keeps track of how many live cells the user placed on grid pre-game
    if (this.props.onDecrement) this.props.onDecrement(coord.length, this.state.playerTurn);
    let updatedCoords = [...this.state.coords];
    updatedCoords = updatedCoords.concat(coord);
    const updatedModel = this.state.model;
    updatedModel.placeCells(coord, this.state.playerTurn);

    this.setState(() => ({
      model: updatedModel,
      coords: updatedCoords,
    }));
  }

  placeDeadCell = (coord) => {
    if (this.props.playerOneCellsRemaining && this.props.playerOneCellsRemaining + coord.length >= 100) return;
    if (this.props.onIncrement) this.props.onIncrement(null, this.state.playerTurn);

    const { model } = this.state;
    const coords = [...this.state.coords];
    const updatedCoords = coords.filter((existingCoord) => !JSON.stringify(coord).includes(JSON.stringify(existingCoord)));
    model.removeCells(coord);
    this.setState(() => ({
      model,
      coords: updatedCoords,
    }));
  }

  handleCellState = (coord, isClicked) => {
    if (this.state.isPlacingShape) {
      const shape = Shape.create(this.state.isPlacingShape, coord);
      this.placeLiveCell(shape);
      return;
    } if (isClicked) {
      this.placeDeadCell([coord]);
      if (this.props.onIncrement) this.props.onIncrement(); // keeps track of how many live cells the user removed on grid pre-game
    } else {
      this.placeLiveCell([coord]);
      if (this.props.onDecrement) this.props.onDecrement();
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
      if (this.state.iterationCount === this.state.maxIterations) { this.render(); return; }
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
    if (this.state.isPlacingShape === shape) {
      this.setState({ isPlacingShape: false });
    } else {
      this.setState({ isPlacingShape: shape });
    }
  }

  handleRateChange = (event) => {
    this.setState({ evolutionRate: +event.target.value });
  }

  handleIterationChange = (event) => {
    this.setState({ maxIterations: +event.target.value });
  }

  render() {
    return (
      <div className="App" data-test="component-game">
        <GridDisplay
          data-test="component-grid-display"
          model={this.state.model}
          playerTurn={this.state.playerTurn}
          onStateChange={this.handleCellState}
        />

        <UserControls
          countValue={this.state.maxIterations}
          rateValue={this.state.evolutionRate}
          onRateChange={this.handleRateChange}
          onCountChange={this.handleIterationChange}
          placeShape={this.placeShape}
          onOneEvolution={this.oneEvolution}
          onTogglePlayer={this.togglePlayer}
          onRunGame={this.runGame}
        />
      </div>
    );
  }
}

export default Game;
