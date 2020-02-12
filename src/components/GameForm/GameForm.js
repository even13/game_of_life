/* eslint-disable react/no-array-index-key */
import React from 'react';
import Classes from './GameForm.module.css';

import Input from '../Input/Input';

// Button compnent
// Implement placeholders
// Persist state of form to the grid and rest of App
// Reset form?

class GameForm extends React.Component {
  state = {
    gameForm: {
      playerOneName: {
        type: 'text',
        value: '',
        config: {
          placeholder: 'Player One',
        },
      },
      playerTwoName: {
        type: 'text',
        value: '',
        config: {
          placeholder: 'Player Two',
        },
      },
      gridSize: {
        type: 'range',
        value: '',
        validation: {
          max: '70',
          min: '10',
        },
        config: {},
      },
      numberOfFlags: {
        type: 'range',
        value: '',
        validation: {
          max: '24',
          min: '4',
        },
        config: {
          step: '4',
        },
      },
      gameLength: {
        type: 'range',
        value: '',
        validation: {
          max: '10000',
          min: '100',
        },
        config: {},
      },
      gameSpeed: {
        type: 'range',
        value: '',
        validation: {
          max: '2',
          min: '5000',
        },
        config: {},
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
        validation={this.state.gameForm[field].validation}
        config={this.state.gameForm[field].config}
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
