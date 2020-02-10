import React from 'react';
import Game from '../Game/Game';
import CellBar from '../../components/CellBar/CellBar';
import Classes from './GamePage.module.css';

class GamePage extends React.Component {
  state = {
    playerOneCells: 100,
    playerTwoCells: 100,
  }

  increment = (amount = 1, player) => {
    if (this.state.playerOneCells !== 100) {
      this.setState((prevState) => {
        return player === 1 ? { playerOneCells: prevState.playerOneCells + amount } : 
        {playerTwoCells: prevState.playerTwoCells + amount}
      });
    }
  }

  decrement = (amount = 1, player) => {
    if (this.state.playerOneCells !== 0) {
      this.setState((prevState) => {
        return player === 1 ? { playerOneCells: prevState.playerOneCells - amount } : 
        {playerTwoCells: prevState.playerTwoCells - amount}
      });
    }
  }

  render() {
    return (
      <div className={Classes.GamePage} data-test="component-gamepage">
        <CellBar cellsLeft={this.state.playerOneCells} />
        <Game
          playerOneCellsRemaining={this.state.playerOneCells}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
        <CellBar cellsLeft={this.state.playerTwoCells} />
      </div>
    );
  }
}

export default GamePage;
