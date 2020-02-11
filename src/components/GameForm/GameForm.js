import React from 'react';
import Classes from './GameForm.module.css';

import Input from '../Input/Input';

class GameForm extends React.Component {
  state = {

  }

  render() {
    return (
      <div className={Classes.GameForm} data-test="component-game-form">
        <Input id="playerOneName" />
      </div>
    );
  }
}

export default GameForm;
