import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import GridDisplay from './GridDisplay'
import Row from '../Row/Row'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<GridDisplay />", () => {
  let wrapper;
  let GridDisplayComponent;

  beforeEach( () => {
    wrapper = shallow(<GridDisplay />)
    GridDisplayComponent = wrapper.find("[data-test='component-grid-display']")
  })

  it ("renders without error", () => {
    expect(GridDisplayComponent).toHaveLength(1)
  })

  it ("can display 3 rows correctly when passed in 3 rows", () => {
    wrapper = shallow(<GridDisplay />)
    wrapper.setState({data: [1, 1, 1]})

    const RowComponent = wrapper.find("[data-test='component-row']")
    expect(RowComponent).toHaveLength(3)

  })

  it ("creates an array of cells for each row", () => {
    wrapper = shallow(<GridDisplay />)
    let test_grid = [
        ['-', '-', '-'],
        ['-', '*', '-'],
        ['-', '-', '-']
    ]
    wrapper.setState({data: test_grid})
    const RowComponent = wrapper.find("[data-test='component-row']")
    console.log(wrapper.debug())
    expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(2)
    expect(wrapper.find({ cells: test_grid[1] })).toHaveLength(1)
  })
})
