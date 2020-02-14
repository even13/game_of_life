import React from 'react';
import Classes from './Result.module.css';

const Result = (props) => {
  let result = null;
  const color = props.player === 1
    ? props.colors.playerOneColor.value
    : props.colors.playerTwoColor.value;
  const style = {
    color,
    textShadow: `0 0 30px ${color}`,
  };
  if (props.isWinner()) result = <span style={style}>Win</span>;

  return (
    <div className={Classes.Result} data-test="component-result">
      {result}
    </div>
  );
};

export default Result;
