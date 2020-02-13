/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import Aux from '../../hoc/Aux';
import Classes from './Input.module.css';

class Input extends React.Component {
  formattedOutput = (field, value) => {
    switch (field) {
      case 'Grid Size': return `${value} x ${value}`;
      case 'Flags': return `${+value + 1}`
      default: return value;
    }
  }

  formattedInput = (type) => {
    const suffix = this.props.id ? `-${this.props.id}` : '';
    let inputElement;

    switch (type) {
      case 'range':
        inputElement = (
          <Aux>
            <div className={Classes.sliderOptions}>
              <div className={Classes.paramsAndValues}>
                <div className={Classes.params}>
                  <div className={[Classes.Input, Classes[this.props.id], Classes.sliderOption].join(' ')}>{this.props.config.label}</div>
                </div>
                <div className={Classes.values}>
                  <div className={Classes.sliderValue}>{this.formattedOutput(this.props.config.label, this.props.value)}</div>
                </div>
              </div>
              <input
                data-test={`input${suffix}`}
                type={type}
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
              <div
                className={[Classes.Input, Classes[this.props.id]].join(' ')}
                style={{ color: this.props.color }}
              >
                {this.props.config.placeholder}
              </div>
              <input
                spellCheck={false}
                data-test={`input${suffix}`}
                type={type}
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

    return inputElement;
  }

  render() {
    return (
      <div data-test="component-input" className={Classes.Input}>
        {this.formattedInput(this.props.type)}
      </div>
    );
  }
}

export default Input;
