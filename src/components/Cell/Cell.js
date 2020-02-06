import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
    handleClick = () => {
        this.props.onClick(this.props.coord)
    }

    render() {
        const color = this.props.value === "*" ? 'black' : 'LightGray'
        return (
            <div
                style={{backgroundColor: color}}
                className={Classes.Cell}
                onClick={this.handleClick}
                data-test='component-cell'>
                    <div>
                        {this.props.value}
                    </div>
                </div>
        );
    }
};

export default Cell;
