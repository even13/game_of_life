/* eslint-disable react/no-array-index-key */
import React from 'react';
import Classes from './GameForm.module.css';

import Input from '../Input/Input';

class GameForm extends React.Component {
  state = {
    gameForm: {
      playerOneName: {
        type: 'text',
        value: '',
      },
      playerTwoName: {
        type: 'text',
        value: '',
      },
      gridSize: {
        type: 'range',
        value: '',
      },
      numberOfFlags: {
        type: 'range',
        value: '',
      },
      gameLength: {
        type: 'range',
        value: '',
      },
      gameSpeed: {
        type: 'range',
        value: '',
      },
    },
  }

  handleFormChange = (e, field) => {
    e.persist();

    this.setState((prevState) => {
      const updatedGameForm = { ...prevState.gameForm };
      const updatedGameFormField = { ...updatedGameForm[field] };
      updatedGameFormField.value = e.target.value;
      updatedGameForm[field] = updatedGameFormField;
      
      return { gameForm: updatedGameForm };
    });
  }

  renderInputs = () => {
    const gameFormField = Object.keys(this.state.gameForm);
    return gameFormField.map((field, i) => (
      <Input
        key={`${i}_input`}
        type={this.state.gameForm[field].type}
        value={this.state.gameForm[field].value}
        onChange={(e) => { this.handleFormChange(e, field); }}
        id={field}
      />
    ));
  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form">
        <form>
          {this.renderInputs()}
          <input type="submit" id="submit" />
        </form>
      </div>
    );
  }
}

export default GameForm;
