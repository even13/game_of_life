import React from 'react';
import Row from '../Row/Row';
import Classes from './GridDisplay.module.css';

class GridDisplay extends React.Component {
    renderGrid = () => {
      const res = [];
      const data = this.props.model.render();
      for (let i = 0; i < data.length; i++) {
        res.push(
          <Row
            key={`${i}index`}
            isDisplay={this.props.isDisplay}
            colors={this.props.colors}
            onStateChange={this.props.onStateChange}
            yCoord={res.length}
            cells={data[res.length]}
            playerTurn={this.props.playerTurn}
            data-test="component-row"
            id={`${i}index${this.props.auxId}`}
            auxId={this.props.auxId}
          />,
        );
      }
      return res;
    }

    render() {
      return (
        <div className={Classes.GridDisplay} style={{ width: `${(this.props.model.render().length * 10)}px` }} data-test="component-grid-display">
          {this.renderGrid()}
        </div>
      );
    }
}

export default GridDisplay;
