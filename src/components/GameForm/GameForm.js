/* eslint-disable react/no-array-index-key */
import React from 'react';
import Classes from './GameForm.module.css';

import Aux from '../../hoc/Aux';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ColorPicker from '../ColorPicker/ColorPicker';

// Persist state of form to the grid and rest of App
// Reset form?

class GameForm extends React.Component {
  state = {
    colors: ['#831277', '#27cac9', '#ADFF2F', 'white', '#e563ed', '#FF4500'],
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
        value: '48',
        validation: {
          max: '70',
          min: '10',
        },
        config: {
          label: 'Grid Size',
        },
      },
      numberOfFlags: {
        type: 'range',
        value: '4',
        validation: {
          max: '24',
          min: '4',
        },
        config: {
          step: '4',
          label: 'Flags',
        },
      },
      gameLength: {
        type: 'range',
        value: '500',
        validation: {
          max: '10000',
          min: '100',
        },
        config: {
          label: 'Game Length',
        },
      },
      gameSpeed: {
        type: 'range',
        value: '50',
        validation: {
          max: '1000',
          min: '2',
        },
        config: {
          label: 'Game Speed',
        },
      },
    },
    colorPickers: {
      playerOneColor: {
        value: '#E563ED',
      },
      playerTwoColor: {
        value: '#27cac9',
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

  handleColorChange = (e, player) => {
    e.persist();

    this.setState((prevState) => {
      const colorPickers = { ...prevState.colorPickers };
      const playerColorPicker = { ...colorPickers[player] };
      const colorIndex = prevState.colors.indexOf(playerColorPicker.value);
      playerColorPicker.value = prevState.colors[(colorIndex + 1) % prevState.colors.length];
      colorPickers[player] = playerColorPicker;
      return { colorPickers };
    });
  };

  renderInputs = () => {
    const gameFormFields = Object.keys(this.state.gameForm);
    let playerInputFields = [];
    let sliders = [];
    const playerColors = { playerOneName: 'playerOneColor', playerTwoName: 'playerTwoColor' };
    let color;

    gameFormFields.forEach((field, i) => {
      color = null;
      const playerNames = Object.keys(playerColors);
      if (playerNames.includes(field)) color = this.state.colorPickers[playerColors[field]].value;
      const el = (
        <Input
          key={`${i}_input`}
          type={this.state.gameForm[field].type}
          value={this.state.gameForm[field].value}
          validation={this.state.gameForm[field].validation}
          config={this.state.gameForm[field].config}
          onChange={(e) => { this.handleFormChange(e, field); }}
          color={color}
          id={field}
        />
      );

      if (['playerOneName', 'playerTwoName'].includes(field)) {
        playerInputFields = [...playerInputFields, el];
      } else {
        sliders = [...sliders, el];
      }
    });

    return (
      <Aux>
        <div className={Classes.PlayerInputs}>
          <div className={Classes.ColorPicker}>{this.renderColorPicker(1)}</div>
          { playerInputFields }
          <div className={Classes.ColorPicker}>{this.renderColorPicker(2)}</div>
        </div>
        <div className={Classes.Sliders}>
          { sliders }
        </div>
      </Aux>
    );
  }

  renderColorPicker = (player) => {
    const colorPickerFields = Object.keys(this.state.colorPickers);
    const playerNumber = player - 1;

    return colorPickerFields.map((field, i) => (
      <ColorPicker
        key={`${i}_colorPicker`}
        color={`${this.state.colorPickers[field].value}`}
        onClick={this.handleColorChange}
        id={field}
      />
    ))[playerNumber];
  }

  handleClick = () => {
    this.props.onCommitSettings(this.state.gameForm, this.state.colorPickers);
    this.props.onPlayGame();
  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form">
        <form className={Classes.formElement}>
          {this.renderInputs()}
          <Button form id="submit" content="GO" onClick={this.handleClick} />
        </form>
      </div>
    );
  }
}

export default GameForm;
