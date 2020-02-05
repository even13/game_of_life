import React from 'react'
import Row from '../Row/Row'

class GridDisplay extends React.Component {
  state = {
    data: []
  }

  renderGrid = () => {
    const res = []
    this.state.data.forEach((array, i) => {
        res.push(
          <Row
            key={`${i}index`}
            cells={array}
            data-test='component-row' />
        )
    })

    return res
  }
  render() {
    return (
      <div data-test='component-grid-display'>
        {this.renderGrid()}
      </div>
    )
  }
}

export default GridDisplay
