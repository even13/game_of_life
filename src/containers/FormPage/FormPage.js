import React from 'react';
import GameForm from '../../components/GameForm/GameForm';

class FormPage extends React.Component {
  state = {}

  render() {
    return (
      <div data-test="component-form-page">
        <GameForm data-test="game-form" />
      </div>
    );
  }
}

export default FormPage;
