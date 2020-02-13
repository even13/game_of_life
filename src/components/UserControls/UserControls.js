import React from 'react';
import ShapeControls from '../ShapeControls/ShapeControls';
import EvolutionControls from '../EvolutionControls/EvolutionControls';
import Classes from './UserControls.module.css';
import Button from '../Button/Button';

const UserControls = (props) => (
  <div data-test="component-user-controls">
    <ShapeControls
      placeShape={props.placeShape}
      rotateShape={props.rotateShape}
      orientation={props.orientation}
      onMirrorShape={props.onMirrorShape}
      mirrorShape={props.mirrorShape}
    />
    {/* <EvolutionControls
      countValue={props.countValue}
      rateValue={props.rateValue}
      onRateChange={props.onRateChange}
      onCountChange={props.onCountChange}
    /> */}

    <div>
      <button type="button" onClick={props.onOneEvolution} data-test="evolution-button">Click To Evolve</button>
      <button type="button" onClick={props.onTogglePlayer} data-test="player-toggle">Click To Toggle Player</button>
      <Button data-test="run-button" content="Run" onClick={props.onRunGame} />
    </div>
  </div>
);

export default UserControls;
