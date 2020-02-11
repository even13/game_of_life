/* eslint-disable react/no-array-index-key */
import React from 'react';
import Classes from './GameForm.module.css';

import Input from '../Input/Input';

class GameForm extends React.Component {
  state = {
    gameForm: {
      playerOneName: '',
      playerTwoName: '',
      gridSize: '',
      numberOfFlags: '',
      gameLength: '',
      gameSpeed: '',
    },
  }

  renderInputs = () => {
    const gameFormField = Object.keys(this.state.gameForm);
    return gameFormField.map((field, i) => (
      <Input
        key={`${i}_input`}
        id={field}
      />
    ));
  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form">
        <form>
          {this.renderInputs()}
          <input type='submit' id='submit' />
        </form>
      </div>
    );
  }
}

export default GameForm;
