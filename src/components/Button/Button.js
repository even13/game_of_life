import React from 'react';

class Button extends React.Component {
  state = {}

  render() {
    return (
      <div data-test="component-button">
        <div data-test="button" role="button"></div>
      </div>
    );
  }
}

export default Button;
