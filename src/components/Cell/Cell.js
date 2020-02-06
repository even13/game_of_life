import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.coord, this.props.isAlive)
    }

    render() {
        const color = this.props.cell.value === "*" ? 'black' : 'LightGray'
        return (
            <div
                style={{backgroundColor: color}}
                className={Classes.Cell}
                onClick={this.handleClick}
                data-test='component-cell'>
                    {this.props.cell.value}
                </div>
        );
    }
};

export default Cell;
