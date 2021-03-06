import React from 'react';
import Cell from '../Cell/Cell';
import Classes from './Row.module.css';

class Row extends React.Component {
    renderCells = () => {
      const res = [];
      const rowLength = this.props.cells.length;
      for (let i = 0; i < rowLength; i++) {
        res.push(
          <Cell
            key={`${res.length}${this.props.yCoord}_cell`}
            isDisplay={this.props.isDisplay}
            colors={this.props.colors}
            onClick={this.props.onStateChange}
            coord={[i, this.props.yCoord]}
            id={`${res.length}${this.props.yCoord}_cell${this.props.auxId}`}
            data-test="component-cell"
            isAlive={this.props.cells[i].value === '*'}
            cell={this.props.cells[i]}
            playerTurn={this.props.playerTurn}
          />,
        );
      }

      return res;
    }

    render() {
      return (
        <div
          className={Classes.Row}
          style={{ height: `${(100 / this.props.cells.length)}%` }}
          data-test="component-row"
        >
          {this.renderCells()}
        </div>
      );
    }
}

export default Row;
