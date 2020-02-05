import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.coord)
    }

    render() {
        return (
            <div
                className={Classes.Cell}
                onClick={this.handleClick}
                data-test='component-cell'></div>
        );
    }
};

export default Cell;
