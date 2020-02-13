import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
  handleClick = () => {
    if ([this.props.playerTurn, null].includes(this.props.cell.player)) {
      this.props.onClick(this.props.coord, this.props.isAlive);
    }
  }

  render() {
    let cellColor;
    if (!this.props.isDisplay) {
      switch (this.props.cell.value) {
        case '*':
          cellColor = this.props.cell.player === 1 ?
            this.props.colors.playerOneColor.value :
            this.props.colors.playerTwoColor.value;
          break;
        case 'f': cellColor = 'red';
          break;
        default: cellColor = 'rgba(0, 68, 59, 0.575)';
      }
    } else {
      cellColor = this.props.cell.value === '*' ? '#fdc0ff' : 'rgba(0, 68, 59, 0.575)';
    }

    return (
      <div
        style={{ backgroundColor: cellColor }}
        className={Classes.Cell}
        role="button"
        tabIndex={0}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        data-test="component-cell"
      />
    );
  }
}

export default Cell;
