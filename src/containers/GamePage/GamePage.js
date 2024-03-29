import React from 'react';
import Game from '../Game/Game';
import CellBar from '../../components/CellBar/CellBar';
import Classes from './GamePage.module.css';
import ScoreDisplay from '../../components/ScoreDisplay/ScoreDisplay';

class GamePage extends React.Component {
  state = {
    playerOneCells: 100,
    playerTwoCells: 100,
    playerOneFlags: 0,
    playerOneScore: 0,
    playerOneCellCount: 0,
    playerTwoFlags: 0,
    playerTwoScore: 0,
    playerTwoCellCount: 0,
    gameOver: false,
  }

  decrement = (amount, player) => {
    this.setState((prevState) => (player === 1 ? { playerOneCells: prevState.playerOneCells - amount }
      : { playerTwoCells: prevState.playerTwoCells - amount }));
  }

  increment = (amount = 1, player) => {
    this.setState((prevState) => (player === 1 ? { playerOneCells: prevState.playerOneCells + amount }
      : { playerTwoCells: prevState.playerTwoCells + amount }));
  }

  updateScoreDisplays = (gameData) => {
    this.setState({
      playerOneFlags: gameData[0],
      playerOneScore: gameData[1],
      playerOneCellCount: gameData[2],
      playerTwoFlags: gameData[3],
      playerTwoScore: gameData[4],
      playerTwoCellCount: gameData[5],
    });
  }

  resetCells = () => {
    this.setState({
      playerOneCells: 100,
      playerTwoCells: 100,
      playerOneFlags: 0,
      playerOneScore: 0,
      playerOneCellCount: 0,
      playerTwoFlags: 0,
      playerTwoScore: 0,
      playerTwoCellCount: 0,
      gameOver: false,
    });
  }

  showWinner = () => {
    this.setState({ gameOver: true });
  }

  isWinner = (player) => (
    (this.state.playerOneFlags > this.state.playerTwoFlags && player === 1)
      || (this.state.playerTwoFlags > this.state.playerOneFlags && player === 2)
  )

  render() {
    return (
      <div className={Classes.GamePage} data-test="component-game-page">
        <ScoreDisplay
          data-test="component-score-display-p1"
          player={1}
          playerName={this.props.currentSettings.playerOneName.value}
          flags={this.state.playerOneFlags}
          cellCount={this.state.playerOneScore}
          score={this.state.playerOneCellCount}
          gameOver={this.state.gameOver}
          isWinner={() => this.isWinner(1)}
          colors={this.props.currentColors}
        />
        <CellBar cellsLeft={this.state.playerOneCells} />
        <Game
          colors={this.props.currentColors}
          settings={this.props.currentSettings}
          onReplay={this.resetCells}
          onReturn={this.props.onReturn}
          playerOneCellsRemaining={this.state.playerOneCells}
          playerTwoCellsRemaining={this.state.playerTwoCells}
          onIncrement={this.increment}
          onDecrement={this.decrement}
          onDisplayUpdate={this.updateScoreDisplays}
          showWinner={this.showWinner}
        />
        <CellBar cellsLeft={this.state.playerTwoCells} />
        <ScoreDisplay
          data-test="component-score-display-p2"
          player={2}
          playerName={this.props.currentSettings.playerTwoName.value}
          flags={this.state.playerTwoFlags}
          cellCount={this.state.playerTwoScore}
          score={this.state.playerTwoCellCount}
          gameOver={this.state.gameOver}
          isWinner={() => this.isWinner(2)}
          colors={this.props.currentColors}
        />
      </div>
    );
  }
}

export default GamePage;
