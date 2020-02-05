import React from 'react'
import Classes from './Cell.module.css';

class Cell extends React.Component {
    render() {
        return (
            <div 
                className={Classes.Cell} 
                data-test='component-cell'></div>
        )
    }
}

export default Cell