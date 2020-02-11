import React from 'react';

class EvolutionControls extends React.Component {
  state = {
    // evolutionRate: 50,
    // maxIterations: 100,
    // iterationCount: 0,
  }

  render() {
    return (
      <div data-test="component-evolution-controls">
        <div>Evolution Rate</div>
        <input value={this.props.rateValue} onChange={(e) => { this.props.onRateChange(e); }} data-test="evolution-rate" />
        <span> milliseconds</span>

        <div>Iterations</div>
        <input value={this.props.countValue} onChange={(e) => { this.props.onCountChange(e); }} data-test="iterations" />
      </div>
    );
  }
}

export default EvolutionControls;
