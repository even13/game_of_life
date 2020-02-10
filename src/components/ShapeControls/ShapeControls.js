import React from 'react';

const ShapeControls = (props) => (
  <div className="ShapeControls" data-test="component-shape-controls">
    <button type="button" data-test="create-spinner" onClick={() => { props.placeShape('spinner'); }}>Create A Spinner</button>
    <button type="button" data-test="create-spaceship" onClick={() => { props.placeShape('spaceship'); }}>Create A Spaceship</button>
    <button type="button" data-test="create-bird" onClick={() => { props.placeShape('bird'); }}>Create A Bird</button>
    <button type="button" data-test="rotate-button" onClick={() => { props.rotateShape(); }}>{props.orientation}<sup>o</sup></button>
  </div>
);

export default ShapeControls;
