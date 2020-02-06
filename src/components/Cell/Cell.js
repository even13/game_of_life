import React from 'react';
import Classes from './Cell.module.css';

class Cell extends React.Component {
    state = {
        isClicked: false
    }

    handleClick = () => {
        this.setState((prevState) => {
            return {
                isClicked: !prevState.isClicked
            }
        })
        this.props.onClick(this.props.coord, this.state.isClicked)
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
