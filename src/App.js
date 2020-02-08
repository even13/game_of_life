import React from 'react';
import './App.css';
import GridDisplay from './components/GridDisplay/GridDisplay';
import Grid from './models/grid/grid';

class App extends React.Component {
    state = {
      model: new Grid(30),
      coords: [],
      playerTurn: 1,
      evolutionRate: 50,
      maxIterations: 100,
      isRunning: false,
      iterationCount: 0,
    }

    oneEvolution = () => { 
      this.setState({ isRunning: true })
      this.evolve()
    }

    runGame = () => { 
      this.setState({ 
        isRunning: true,
        iterationCount: 0,
      })
      this.evolve()
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

      window.setTimeout( () => {
        this.setState(prevState => {
          return {iterationCount: prevState.iterationCount + 1}
        });
        if (this.state.iterationCount === this.state.maxIterations) {
          this.setState({
            isRunning: false,
           })
          return
        } else {
          this.evolve();
        }
      }, this.state.evolutionRate);
    }

    togglePlayer = () => {
      if (this.state.playerTurn === 1) {
        this.setState({ playerTurn: 2 });
      } else {
        this.setState({ playerTurn: 1 });
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

        <div className="App" data-test="component-app">
          <GridDisplay
            data-test="component-grid-display"
            model={this.state.model}
            playerTurn={this.state.playerTurn}
            onStateChange={this.handleCellState}
          />
          Evolution Rate <input 
            value={this.state.evolutionRate} 
            onChange={this.handleRateChange} 
            data-test="evolution-rate" /> msec

          Interations <input 
            value={this.state.maxIterations} 
            onChange={this.handleIterationChange} 
            data-test="iterations" /> sec

          <button
            type="button"
            onClick={this.runGame}
            data-test="run-button"
          >Run</button>
          <button 
            type="button"
            onClick={this.oneEvolution}
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
