import React from 'react';
import Classes from './Result.module.css';

const Result = (props) => {
  let result = <span>Lose</span>;
  if (props.isWinner()) result = <span>Win</span>;
  return (
    <div className={Classes.Result} data-test="component-result">
      <span>{result}</span>
    </div>
  );
};

export default Result;
