import React from 'react';
import './Game.css';
import GridDisplay from '../../components/GridDisplay/GridDisplay';
import Grid from '../../models/grid/grid';
import Shape from '../../models/shape/shape';
import UserControls from '../../components/UserControls/UserControls';
import Classes from './Game.module.css';
import DurationMeter from '../../components/DurationMeter/DurationMeter';

class Game extends React.Component {
  state = {
    model: new Grid(+this.props.settings.gridSize.value),
    coords: [],
    playerTurn: 1,
    isPlacingShape: false,
    evolutionRate: 50,
    maxIterations: 100,
    iterationCount: 0,
    shapeOrientation: 0,
    mirrorShape: false,
    isRunning: false,
  }

  oneEvolution = () => {
    this.evolve();
  }

  runGame = async () => {
    await this.setState((prevState) => {
      const updatedModel = prevState.model;
      updatedModel.randomFlags(+this.props.settings.numberOfFlags.value / 4);
      return {
        iterationCount: 0,
        model: updatedModel,
        isRunning: true,
      };
    });
    setTimeout(() => { this.evolve(); });
  }

  placeLiveCell = (coord) => {
    if (this.state.playerTurn === 1 && (this.props.playerOneCellsRemaining === 0 || (this.props.playerOneCellsRemaining - coord.length < 0))) return;
    if (this.state.playerTurn === 2 && (this.props.playerTwoCellsRemaining === 0 || (this.props.playerTwoCellsRemaining - coord.length < 0))) return;
    // if there are cellbars on that specific gamepage, run the logic below
    // keeps track of how many live cells the user placed on grid pre-game
    // additionally if placing cells has been rejected then do not apply decrement

    let updatedCoords;
    const updatedModel = this.state.model;
    const hasUpdated = updatedModel.placeCells(coord, this.state.playerTurn);

    if (hasUpdated) {
      if (this.props.onDecrement) this.props.onDecrement(coord.length, this.state.playerTurn);
      updatedCoords = [...this.state.coords];
      updatedCoords = updatedCoords.concat(coord);
      this.setState(() => ({
        model: updatedModel,
        coords: updatedCoords,
      }));
    }
  }

  placeDeadCell = (coord) => {
    // if (this.props.playerOneCellsRemaining && this.props.playerOneCellsRemaining + coord.length > 100) return;
    if (this.props.onIncrement) this.props.onIncrement(undefined, this.state.playerTurn);
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
      const shape = new Shape();
      this.placeLiveCell(shape.create(this.state.isPlacingShape, coord, this.state.shapeOrientation, this.state.mirrorShape));
      return;
    } if (isClicked) {
      this.placeDeadCell([coord]);
      // keeps track of how many live cells the user removed on grid pre-game
    } else {
      this.placeLiveCell([coord]);
    }
  }

  resetGame = () => {
    this.props.onReplay();
    this.setState({
      model: new Grid(+this.props.settings.gridSize.value),
      coords: [],
      playerTurn: 1,
      isPlacingShape: false,
      iterationCount: 0,
      shapeOrientation: 0,
      mirrorShape: false,
      isRunning: false,
    });
  }

  evolve = () => {
    const updatedModel = { ...this.state.model };
    updatedModel.evolve();
    this.setState(() => ({
      model: updatedModel,
      coords: updatedModel.getLiveCellCoordinates(),
    }));

    this.props.onDisplayUpdate(this.state.model.playerScores());

    if (this.state.isRunning) {
      window.setTimeout(() => {
        this.setState((prevState) => ({ iterationCount: prevState.iterationCount + 1 }));
        if (this.state.iterationCount === +this.props.settings.gameLength.value) { 
          this.props.showWinner(); this.render(); return;
        }
        this.evolve();
      }, +this.props.settings.gameSpeed.value);
    }
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

  rotateShape = async () => {
    await this.setState((prevState) => ({ shapeOrientation: (prevState.shapeOrientation + 90) % 360 }));
  }

  handleRateChange = (event) => {
    this.setState({ evolutionRate: +event.target.value });
  }

  handleIterationChange = (event) => {
    this.setState({ maxIterations: +event.target.value });
  }

  handleMirrorShape = () => {
    this.setState((prevState) => ({ mirrorShape: !prevState.mirrorShape }));
  }

  render() {
    // const playerScores = this.state.model.playerScores();
    return (
      <div className={Classes.Game} data-test="component-game">
        <div className={Classes.GridDisplayWrapper}>
          <GridDisplay
            data-test="component-grid-display"
            colors={this.props.colors}
            model={this.state.model}
            playerTurn={this.state.playerTurn}
            onStateChange={this.handleCellState}
            auxId=""
          />
        </div>
        <DurationMeter
          maxAmount={+this.props.settings.gameLength.value}
          currentAmount={this.state.iterationCount}
        />
        <UserControls
          onReplay={this.resetGame}
          model={this.state.model}
          flags={+this.props.settings.numberOfFlags.value}
          countValue={+this.props.settings.gameLength.value}
          rateValue={+this.props.settings.gameSpeed.value}
          onRateChange={this.handleRateChange}
          onCountChange={this.handleIterationChange}
          placeShape={this.placeShape}
          rotateShape={this.rotateShape}
          onMirrorShape={this.handleMirrorShape}
          onOneEvolution={this.oneEvolution}
          onTogglePlayer={this.togglePlayer}
          onRunGame={this.runGame}
          orientation={this.state.shapeOrientation}
          mirrorShape={this.state.mirrorShape}
          test={this.props.test}
          onReturn={this.props.onReturn}
          colors={this.props.colors}
          playerTurn={this.state.playerTurn}
        />
      </div>
    );
  }
}

export default Game;
