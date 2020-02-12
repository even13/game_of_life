import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
  handleClick = () => {
    if ([this.props.playerTurn, null].includes(this.props.cell.player)) {
      this.props.onClick(this.props.coord, this.props.isAlive);
    }
  }

  render() {
    const color = this.props.cell.value === '*' ? 'black' : 'green';
    return (
      <div
        style={{ backgroundColor: color }}
        className={Classes.Cell}
        role="button"
        tabIndex={0}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        data-test="component-cell"
      >
        {this.props.cell.player}
      </div>
    );
  }
}

export default Cell;
