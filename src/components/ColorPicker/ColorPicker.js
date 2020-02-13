/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Classes from './ColorPicker.module.css';

class ColorPicker extends React.Component {
  state = {}

  handleClick = (e) => {
    this.props.onClick(e, this.props.id);
  }

  render() {
    return (
      <div className={Classes.ColorPicker} data-test="component-color-picker">
        <div
          style={{ backgroundColor: this.props.color }}
          role="button"
          tabIndex={0}
          onKeyDown={this.handleClick}
          className={Classes.ColorDisplay}
          data-test="color-display"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default ColorPicker;
