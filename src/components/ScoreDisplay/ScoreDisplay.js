import React from 'react';
import Classes from './ScoreDisplay.module.css';

const ScoreDisplay = (props) => {
  const playerName = props.playerName ? props.playerName : 
    props.player === 1 ? 'Player 1' : 'Player 2';

  return (
    <div className={Classes.ScoreDisplay} data-test="component-score-display">
      <span className={Classes.PlayerName}>{playerName}</span>
      <div className={Classes.PlayerScore}><span className={Classes.Label}>Score:</span>{props.score}</div>
      <div className={Classes.PlayerFlags}><span className={Classes.Label}>Flags:</span>{props.flags}</div>
      <div className={Classes.PlayeLiveCells}><span className={Classes.Label}>Live Cells:</span>{props.cellCount}</div>
    </div>
  );
};

export default ScoreDisplay;
