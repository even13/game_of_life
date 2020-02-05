import React from 'react';
import Cell from '../Cell/Cell';

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
            <div data-test='component-row'>
                {this.renderCells()}
            </div>
        )
    }
}

export default Row
