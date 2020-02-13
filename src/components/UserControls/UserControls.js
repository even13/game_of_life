import React from 'react';
import ShapeControls from '../ShapeControls/ShapeControls';
import EvolutionControls from '../EvolutionControls/EvolutionControls';
import Classes from './UserControls.module.css';
import Button from '../Button/Button';

class UserControls extends React.Component {
  state = {
    isRunning: false,
  }

  handleClick = () => {
    this.setState((prevState) => ({ isRunning: !prevState.isRunning }));
    if (this.state.isRunning) {
      this.props.onReplay();
    } else {
      this.props.model.randomFlags(+this.props.flags / 4);
      this.props.onRunGame();
    }
  }

  render() {
    return (
      <div data-test="component-user-controls">
        <ShapeControls
          placeShape={this.props.placeShape}
          rotateShape={this.props.rotateShape}
          orientation={this.props.orientation}
          onMirrorShape={this.props.onMirrorShape}
          mirrorShape={this.props.mirrorShape}
        />
        <EvolutionControls
          countValue={this.props.countValue}
          rateValue={this.props.rateValue}
          onRateChange={this.props.onRateChange}
          onCountChange={this.props.onCountChange}
        />

        <div>
          <button type="button" onClick={this.props.onOneEvolution} data-test="evolution-button">Click To Evolve</button>
          <button type="button" onClick={this.props.onTogglePlayer} data-test="player-toggle">Click To Toggle Player</button>
          <Button
            data-test={this.state.isRunning ? 'replay-button' : 'run-button'}
            content={this.state.isRunning ? 'Replay' : 'Run'}
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default UserControls;
