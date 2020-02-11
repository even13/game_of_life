/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <div data-test="component-input">
        <input type={this.props.type} data-test="input" />
      </div>
    );
  }
}

export default Input;
