import React from 'react';
import Classes from './Button.module.css';

class Button extends React.Component {
  state = {}

  render() {
    const backgroundColor = this.props.form ? 'transparent' : 'green';

    return (
      <div className={Classes.Button} style={{ backgroundColor }} data-test="component-button">
        <div className={Classes.InnerButton}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Button;
