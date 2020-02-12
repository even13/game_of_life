import React from 'react';
import Classes from './Button.module.css';

class Button extends React.Component {
  state = {}

  render() {
    return (
      <div className={Classes.Button} data-test="component-button">
        <button data-test="button" type="submit">
          {this.props.content}
        </button>
      </div>
    );
  }
}

export default Button;
