import React from 'react';
import Classes from './GameForm.module.css';

class GameForm extends React.Component {
  state = {

  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form" />
    );
  }
}

export default GameForm;
