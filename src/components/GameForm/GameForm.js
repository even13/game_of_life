/* eslint-disable react/no-array-index-key */
import React from 'react';
import Classes from './GameForm.module.css';

import Input from '../Input/Input';
import Button from '../Button/Button';
import ColorPicker from '../ColorPicker/ColorPicker';

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
    colorPickers: {
      playerOneColor: {
        value: 'blue',
      },
      playerTwoColor: {
        value: 'pink',
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
    const gameFormFields = Object.keys(this.state.gameForm);
    return gameFormFields.map((field, i) => (
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

  renderColorPickers = () => {
    const colorPickerFields = Object.keys(this.state.colorPickers);
    return colorPickerFields.map((field, i) => {
      return (
        <ColorPicker
          key={`${i}_colorPicker`}
          value={`${this.state.colorPickers[field].value}`}
          onClick={this.handleColorChange}
          id={field}
        />
      );
    });
  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form">
        {this.renderColorPickers()}
        <form>
          {this.renderInputs()}
          <Button id="submit" />
        </form>
      </div>
    );
  }
}

export default GameForm;