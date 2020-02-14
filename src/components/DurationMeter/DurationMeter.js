import React from 'react';
import Classes from './DurationMeter.module.css';

const DurationMeter = (props) => (
  <div className={Classes.DurationMeter} data-test="component-duration-meter">
    <div
      className={Classes.DurationBar}
      style={{ width: `${100 - (props.currentAmount / props.maxAmount) * 100}%` }} />
  </div>
);

export default DurationMeter;
