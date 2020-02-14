import React from 'react';
import GameForm from '../../components/GameForm/GameForm';
import Classes from './FormPage.module.css';
import Logo from '../../components/Logo/Logo';

class FormPage extends React.Component {
  state = {}

  render() {
    return (
      <div className={Classes.FormPage} data-test="component-form-page">
        <Logo height="300px" />
        <GameForm data-test="game-form" onCommitSettings={this.props.onCommitSettings} onPlayGame={this.props.onPlayGame} />
      </div>
    );
  }
}

export default FormPage;
