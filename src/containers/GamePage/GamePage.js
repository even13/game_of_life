import React from 'react';
import Game from '../Game/Game';
import CellBar from '../../components/CellBar/CellBar';
import Classes from './GamePage.module.css'

class GamePage extends React.Component {
  state = {
    playerOneCells: 100,
    playerTwoCells: 100,

  }

  increment = (amount = 1) => {
    if (this.state.playerOneCells !== 100) {
      this.setState((prevState) => {
        return { playerOneCells: prevState.playerOneCells + amount }
      })
    }
  }

  decrement = (amount = 1) => {
    if (this.state.playerOneCells !== 0) {
      this.setState((prevState) => {
        return { playerOneCells: prevState.playerOneCells - amount }
      })
    }
  }

  render() {
    return (
      <div className={Classes.GamePage} data-test='component-gamepage'>
        <CellBar cellsLeft={this.state.playerOneCells} />
        <Game onIncrement={this.increment} onDecrement={this.decrement} />
        <CellBar />
        <button onClick={this.increment}>Up</button>
        <button onClick={this.decrement}>Down</button>
      </div>
    );
  }
}

export default GamePage;