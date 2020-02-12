/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Aux from '../../hoc/Aux';
import Classes from './Input.module.css';

class Input extends React.Component {
  render() {
    const suffix = this.props.id ? `-${this.props.id}` : '';
    let inputElement;

    switch (this.props.type) {
      case 'range':
        inputElement = (
          <Aux>
            <div className={Classes.sliderOptions}>
              <div className={[Classes.Input, Classes[this.props.id], Classes.sliderOption].join(' ')}>{this.props.id}</div>
              <input
                data-test={`input${suffix}`}
                type={this.props.type}
                onChange={this.props.onChange}
                value={this.props.value}
                step={this.props.config.step}
                max={this.props.validation.max}
                min={this.props.validation.min}
                className={Classes.Slider}
              />
            </div>
          </Aux>
        );
        break;
      default:
        inputElement = (
          <Aux>
            <div className={Classes.playerInputs}>
              <div className={[Classes.Input, Classes[this.props.id]].join(' ')}>{this.props.id}</div>
              <input
                data-test={`input${suffix}`}
                type={this.props.type}
                onChange={this.props.onChange}
                value={this.props.value}
                className={Classes.TextInput}
                style={{
                  borderBottom: `4px solid ${this.props.color}`,
                  caretColor: this.props.color,
                }}
              />
            </div>
          </Aux>
        );
    }

    return (
      <div data-test="component-input" className={Classes.Input}>
        {inputElement}
      </div>
    );
  }
}

export default Input;
