import React from 'react';
import Classes from './Button.module.css';

class Button extends React.Component {
  state = {}

  render() {
    const backgroundColor = 'transparent';
    const fontSize = this.props.isToggleButton ? this.props.fontSize : null;
    const width = this.props.isToggleButton ? this.props.width : 200;

    return (
      <div className={Classes.Button} style={{ backgroundColor, fontSize, width }} data-test="component-button">
        <div className={Classes.InnerButton} onClick={this.props.onClick}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Button;
