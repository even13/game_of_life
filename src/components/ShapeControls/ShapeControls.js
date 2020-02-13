import React from 'react';
import GridDisplay from '../GridDisplay/GridDisplay';
import Grid from '../../models/grid/grid';
import Shape from '../../models/shape/shape';
import Classes from './ShapeControls.module.css';
import ControlButton from './ControlButton/ControlButton';

class ShapeControls extends React.Component {
  state = {
    shapeDisplay: new Grid(9),
    currentDisplayedShape: null,
    // currentShapeOrientation: 0,
  }

  handleClick = (shape) => {
    const shapeModel = new Shape();
    const shapeDisplay = new Grid(9);
    shapeDisplay.placeCells(shapeModel.create(shape, [4, 4], this.props.orientation, this.props.mirrorShape));
    this.setState({
      shapeDisplay,
      currentDisplayedShape: shape,
    });
    this.props.placeShape(shape);
  }

  handleRotation = async () => {
    await this.props.rotateShape();
    const shapeModel = new Shape().create(this.state.currentDisplayedShape, [4, 4], this.props.orientation, this.props.mirrorShape);
    const updateShapeDisplay = new Grid(9);
    updateShapeDisplay.placeCells(shapeModel);
    this.setState({ shapeDisplay: updateShapeDisplay });
  }

  handleMirror = async () => {
    await this.props.onMirrorShape();
    const shapeModel = new Shape().create(this.state.currentDisplayedShape, [4, 4], this.props.orientation, this.props.mirrorShape);
    const updateShapeDisplay = new Grid(9);
    updateShapeDisplay.placeCells(shapeModel);
    this.setState({ shapeDisplay: updateShapeDisplay });
  }

  render() {
    return (
      <div className={Classes.ShapeControls} data-test="component-shape-controls">
        <div className={Classes.ShapeDisplayScreen} />
        <div className={Classes.ShapeDisplayAndOrientation}>
          <ControlButton data-test="rotate-button" onClick={() => { this.handleRotation(); }} content={`${this.props.orientation}°`} text="Rotate" />
          <GridDisplay isDisplay size={9} width={107} model={this.state.shapeDisplay} auxId="_display" data-test="shape-display" />
          <ControlButton data-test="mirror-button" onClick={() => { this.handleMirror(); }} content={this.props.mirrorShape ? 'On' : 'Off'} text="Mirror" />
        </div>
        <div className={Classes.ShapeControlButtons}>
          <div className={Classes.ShapeControlShapeButtons}>
            <button type="button" data-test="create-spinner" onClick={() => { this.handleClick('spinner'); }}>Create A Spinner</button>
            <button type="button" data-test="create-spaceship" onClick={() => { this.handleClick('spaceship'); }}>Create A Spaceship</button>
            <button type="button" data-test="create-bird" onClick={() => { this.handleClick('bird'); }}>Create A Bird</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShapeControls;
