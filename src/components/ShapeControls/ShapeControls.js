import React from 'react';
import GridDisplay from '../GridDisplay/GridDisplay';
import Grid from '../../models/grid/grid';
import Shape from '../../models/shape/shape';

class ShapeControls extends React.Component {
  state = {
    shapeDisplay: new Grid(9),
    currentDisplayedShape: null,
    currentShapeOrientation: 0,
  }

  handleClick = (shape) => {
    const shapeModel = new Shape();
    const shapeDisplay = new Grid(9);
    shapeDisplay.placeCells(shapeModel.create(shape, [4, 4], this.state.currentShapeOrientation));
    this.setState({
      shapeDisplay,
      currentDisplayedShape: shape,
    });
    this.props.placeShape(shape);
  }

  handleRotation = () => {
    this.props.rotateShape();
    const shapeModel = new Shape().create(this.state.currentDisplayedShape, [4, 4], this.state.currentShapeOrientation);
    const shapeDisplay = new Grid(9);
    shapeDisplay.placeCells(shapeModel);
    this.setState((prevState) => {
      const newShapeOrientation = (prevState.currentShapeOrientation + 90) % 360;
      return {
        shapeDisplay,
        currentShapeOrientation: newShapeOrientation,
      };
    });
  }

  render() {
    return (
      <div className="ShapeControls" data-test="component-shape-controls">
        <GridDisplay size={9} model={this.state.shapeDisplay} auxId="_display" data-test="shape-display" />
        <button type="button" data-test="create-spinner" onClick={() => { this.handleClick('spinner'); }}>Create A Spinner</button>
        <button type="button" data-test="create-spaceship" onClick={() => { this.handleClick('spaceship'); }}>Create A Spaceship</button>
        <button type="button" data-test="create-bird" onClick={() => { this.handleClick('bird'); }}>Create A Bird</button>
        <button type="button" data-test="rotate-button" onClick={() => { this.handleRotation(); }}>
          {this.props.orientation}
          <sup>o</sup>
        </button>
      </div>
    );
  }
}


export default ShapeControls;
