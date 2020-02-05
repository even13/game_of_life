import React from 'react'

class Row extends React.Component {
    render() {
        return (
            <div data-test='component-row'>
            {this.props.cells}

            </div>
        )
    }
}

export default Row
