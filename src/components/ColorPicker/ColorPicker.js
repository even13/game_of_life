import React from 'react';

class ColorPicker extends React.Component {
  state = {}

  render() {
    return (
      <div data-test="component-color-picker">
        <div data-test="color-display"></div>
      </div>
    );
  }
}

export default ColorPicker;
