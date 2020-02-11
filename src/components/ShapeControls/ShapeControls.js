import React from 'react';
import GridDisplay from '../GridDisplay/GridDisplay';
import Grid from '../../models/grid/grid';

class ShapeControls extends React.Component {
  state = {
    shapeDisplay: new Grid(9),
  }

  render() {
    return (
      <div className="ShapeControls" data-test="component-shape-controls">
        <GridDisplay size={9} model={this.state.shapeDisplay} auxId="_display" data-test="shape-display" />
        <button type="button" data-test="create-spinner" onClick={() => { this.props.placeShape('spinner'); }}>Create A Spinner</button>
        <button type="button" data-test="create-spaceship" onClick={() => { this.props.placeShape('spaceship'); }}>Create A Spaceship</button>
        <button type="button" data-test="create-bird" onClick={() => { this.props.placeShape('bird'); }}>Create A Bird</button>
        <button type="button" data-test="rotate-button" onClick={() => { this.props.rotateShape(); }}>
          {this.props.orientation}
          <sup>o</sup>
        </button>
      </div>
    );
  }
}


export default ShapeControls;
