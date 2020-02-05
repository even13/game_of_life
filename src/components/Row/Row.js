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
                    key={`${i}_cell`}
                    data-test='component-cell'
                    value={this.props.cells[i]} />
            )
        }

        return res;
    }

    render() {
        return (
            <div 
                className={Classes.Row}
                data-test='component-row'>
                {this.renderCells()}
            </div>
        )
    }
}

export default Row
