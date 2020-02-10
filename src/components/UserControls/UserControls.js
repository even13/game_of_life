import React from 'react';
import ShapeControls from '../ShapeControls/ShapeControls';
import EvolutionControls from '../EvolutionControls/EvolutionControls';

const UserControls = (props) => (
  <div data-test="component-user-controls">
    <ShapeControls 
      placeShape={props.placeShape}
      rotateShape={props.rotateShape}
    />
    <EvolutionControls
      countValue={props.countValue}
      rateValue={props.rateValue}
      onRateChange={props.onRateChange}
      onCountChange={props.onCountChange}
    />

    <div>
      <button type="button" onClick={props.onOneEvolution} data-test="evolution-button">Click To Evolve</button>
      <button type="button" onClick={props.onTogglePlayer} data-test="player-toggle">Click To Toggle Player</button>
      <button type="button" onClick={props.onRunGame} data-test="run-button">Run</button>
    </div>
  </div>
);

export default UserControls;
