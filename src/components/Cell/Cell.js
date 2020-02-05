import React from 'react'
import Classes from './Cell.module.css';

class Cell extends React.Component {
    render() {
        return (
            <div 
                className={Classes.Cell} 
                onClick={this.props.onClick}
                data-test='component-cell'></div>
        )
    }
}

export default Cell