/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Classes from './ControlButton.module.css';

const ControlButton = (props) => (
  <div className={Classes.ControlButtonWrapper}>
    <button className={Classes.ControlButton} type="button" data-test="component-control-button" onClick={props.onClick}>
      {props.content}
    </button>
    <div className={Classes.ControlButtonText}>{props.text}</div>
  </div>
);

export default ControlButton;
