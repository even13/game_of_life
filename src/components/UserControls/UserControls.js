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
    let evolutionControls;
    let evolveButton;

    if (this.props.test) {
      evolutionControls = (
        <EvolutionControls
          countValue={this.props.countValue}
          rateValue={this.props.rateValue}
          onRateChange={this.props.onRateChange}
          onCountChange={this.props.onCountChange}
        />
      );
      evolveButton = <button type="button" onClick={this.props.onOneEvolution} data-test="evolution-button">Click To Evolve</button>;
    }

    return (
      <div data-test="component-user-controls">
        <ShapeControls
          placeShape={this.props.placeShape}
          rotateShape={this.props.rotateShape}
          orientation={this.props.orientation}
          onMirrorShape={this.props.onMirrorShape}
          mirrorShape={this.props.mirrorShape}
        />

        {evolutionControls}

        <div>
          {evolveButton}
          <Button
            isToggleButton
            data-test="player-toggle"
            content={`Using Player ${this.props.playerTurn}`}
            onClick={this.props.onTogglePlayer}
            fontSize={30}
            width={300}
            playerTurn={this.props.playerTurn}
          />
          <Button
            data-test={this.state.isRunning ? 'replay-button' : 'run-button'}
            content={this.state.isRunning ? 'Replay' : 'Run'}
            onClick={this.handleClick}
          />
          <Button
            data-test="home-button"
            content="Home"
            onClick={this.props.onReturn}
          />
        </div>
      </div>
    );
  }
}

export default UserControls;
