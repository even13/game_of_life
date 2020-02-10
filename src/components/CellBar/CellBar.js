import React from 'react';
import Classes from './CellBar.module.css';

const CellBar = (props) => (
  <div className={Classes.CellBar} data-test="component-cellbar">
    <div className={Classes.Gauge}>
      <div className={Classes.Bar} style={{ height: `${props.cellsLeft}%` }} />
    </div>
  </div>

);


export default CellBar;
