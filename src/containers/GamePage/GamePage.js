import React from 'react';
import Game from '../Game/Game';
import CellBar from '../../components/CellBar/CellBar';
import Classes from './GamePage.module.css';

class GamePage extends React.Component {
  state = {
    playerOneCells: 100,
    playerTwoCells: 100,
  }

  decrement = (amount = 1, player) => {
    this.setState((prevState) => (player === 1 ? { playerOneCells: prevState.playerOneCells - amount }
      : { playerTwoCells: prevState.playerTwoCells - amount }));
  }

  increment = (amount = 1, player) => {
    this.setState((prevState) => (player === 1 ? { playerOneCells: prevState.playerOneCells + amount }
      : { playerTwoCells: prevState.playerTwoCells + amount }));
  }


  render() {
    return (
      <div className={Classes.GamePage} data-test="component-game-page">
        <CellBar cellsLeft={this.state.playerOneCells} />
        <Game
          settings={this.props.currentSettings}
          playerOneCellsRemaining={this.state.playerOneCells}
          playerTwoCellsRemaining={this.state.playerTwoCells}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
        <CellBar cellsLeft={this.state.playerTwoCells} />
      </div>
    );
  }
}

export default GamePage;
