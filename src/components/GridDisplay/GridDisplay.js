import React from 'react'
import Row from '../Row/Row'
import Grid from '../../models/grid/grid'

const gridInstance = new Grid(30)

class GridDisplay extends React.Component {
  state = {
    data: gridInstance.render(),
    coords: []
  }

  renderGrid = () => {
    const res = []
    this.state.data.forEach((array, i) => {
        let xCoord = this.state.data.indexOf(array)
        res.push(
          <Row
            key={`${i}index`}
            onStateChange={ this.props.onStateChange }
            coord={[xCoord, i]}
            cells={array}
            data-test='component-row'
            id={`${i}index`} />
        )
    })

    return res
  }

  // changeState = (coord) => {
  //   const newArray = [ ...this.state.coords ]
  //   newArray.push(coord)
  //   this.props.model.place_cells(newArray)
  //   this.setState({ 
  //     coords: newArray 
      
  //   })
  //   console.log(this.state)
  // }

  render() {
    return (
      <div data-test='component-grid-display'>
        {this.renderGrid()}
      </div>
    )
  }
}

export default GridDisplay
