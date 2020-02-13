import React from 'react';
import Classes from './Result.module.css';

const Result = (props) => {
  let result = <span>You Lose</span>;
  if (props.isWinner) result = <span>You Win</span>;
  return (
    <div className={Classes.Result} data-test="component-result">
      <span>{result}</span>
    </div>
  );
}

export default Result;
