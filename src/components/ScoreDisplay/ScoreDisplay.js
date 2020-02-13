import React from 'react';
import Classes from './ScoreDisplay.module.css';
import Result from '../Result/Result';

const ScoreDisplay = (props) => {
  // eslint-disable-next-line no-nested-ternary
  const playerName = props.playerName ? props.playerName
    : props.player === 1 ? 'Player 1' : 'Player 2';

  let result = null;
  if (props.gameOver) result = <Result isWinner={props.isWinner} />;

  return (
    <div className={Classes.ScoreDisplay} data-test="component-score-display">
      <span className={Classes.PlayerName}>{playerName}</span>
      <div className={Classes.PlayerScore}>
        <span className={Classes.Label}>Score:</span>
        {props.score}
      </div>
      <div className={Classes.PlayerFlags}>
        <span className={Classes.Label}>Flags:</span>
        {props.flags}
      </div>
      <div className={Classes.PlayeLiveCells}>
        <span className={Classes.Label}>Live Cells:</span>
        {props.cellCount}
      </div>
      {result}
    </div>
  );
};

export default ScoreDisplay;
