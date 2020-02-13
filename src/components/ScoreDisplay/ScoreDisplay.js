import React from 'react';
// import Classes from './ScoreDisplay.module.css';

const ScoreDisplay = (props) => (
  <div data-test="component-score-display">
    <span>{props.name}</span>
    {props.score}
  </div>

);

export default ScoreDisplay;
