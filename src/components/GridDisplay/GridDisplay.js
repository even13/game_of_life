import React from 'react';
import Row from '../Row/Row';

class GridDisplay extends React.Component {
    state = {
        coords: []
    }

    renderGrid = () => {
        const res = []
        const data = this.props.model.render();

        for (let i = 0; i < data.length; i++) {
            res.push(
                <Row
                    key={`${i}index`}
                    onStateChange={this.props.onStateChange}
                    yCoord={res.length}
                    cells={data[res.length]}
                    data-test='component-row'
                    id={`${i}index`} />
            )
        }
        return res
    }

    render() {
        return (
            <div data-test='component-grid-display'>
                {this.renderGrid()}
            </div>
        );
    }
}

export default GridDisplay;
