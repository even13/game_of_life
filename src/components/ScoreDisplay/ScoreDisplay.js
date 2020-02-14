import React from 'react';
import Classes from './ScoreDisplay.module.css';
import Result from '../Result/Result';

const ScoreDisplay = (props) => {
  // eslint-disable-next-line no-nested-ternary
  const playerName = props.playerName ? props.playerName
    : props.player === 1 ? 'Player 1' : 'Player 2';

  let result = null;
  if (props.gameOver) {
    result = (
      <Result
        colors={props.colors}
        isWinner={props.isWinner}
        player={props.player}
      />
    );
  }

  return (
    <div className={Classes.ScoreDisplay} data-test="component-score-display">
      <span className={Classes.PlayerName}>{playerName}</span>
      <div className={Classes.PlayerData}>
        <div className={Classes.PlayerScore}>
          {props.score}
        </div>
        <div className={Classes.PlayerFlags}>
          <div className={Classes.Label}>Flags</div>
          <div>{props.flags}</div>
        </div>
        <div className={Classes.PlayerLiveCells}>
          <span className={Classes.Label}>Live Cells</span>
          <span>{props.cellCount}</span>
        </div>
      </div>
      {result}
    </div>
  );
};

export default ScoreDisplay;
