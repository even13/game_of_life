/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class Input extends React.Component {
  render() {
    const suffix = this.props.id ? `-${this.props.id}` : '';

    return (
      <div data-test="component-input">
        <input
          data-test={`input${suffix}`}
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default Input;
