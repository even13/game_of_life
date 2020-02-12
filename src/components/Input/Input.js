/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Input extends React.Component {
  render() {
    const suffix = this.props.id ? `-${this.props.id}` : '';
    let inputElement;

    switch (this.props.type) {
      case 'range':
        inputElement = (
          <input
            data-test={`input${suffix}`}
            type={this.props.type}
            onChange={this.props.onChange}
            value={this.props.value}
            step={this.props.config.step}
            max={this.props.validation.max}
            min={this.props.validation.min}
          />
        );
        break;
      default:
        inputElement = (
          <input
            data-test={`input${suffix}`}
            type={this.props.type}
            onChange={this.props.onChange}
            value={this.props.value}
          />
        );
    }

    return (
      <div data-test="component-input">
        {inputElement}
      </div>
    );
  }
}

export default Input;
