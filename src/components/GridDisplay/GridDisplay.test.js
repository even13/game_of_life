import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import GridDisplay from './GridDisplay'
import Row from '../Row/Row'
import {setup, findByTestAttr} from '../../test-helper'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<GridDisplay />", () => {
  let wrapper;
  let GridDisplayComponent;

  beforeEach( () => {
    wrapper = setup(GridDisplay)
    GridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display')
  })

  it ("renders without error", () => {
    expect(GridDisplayComponent).toHaveLength(1)
  })

  it ("can display 3 rows correctly when passed in 3 rows", () => {
    wrapper = setup(GridDisplay, {}, {data: [1, 1, 1]})

    const RowComponent = findByTestAttr(wrapper, 'component-row')
    expect(RowComponent).toHaveLength(3)

  })

  describe('rendering cells', () => {
    it ("creates an array of cells for each row of a 3 x 3 grid", () => {

      let test_grid = [
          ['-', '-', '-'],
          ['-', '*', '-'],
          ['-', '-', '-']
      ]
      wrapper = setup(GridDisplay, {}, {data: test_grid})
      console.log(wrapper.debug())
      expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(2)
      expect(wrapper.find({ cells: test_grid[1] })).toHaveLength(1)
    })

    it ("creates an array of cells for each row of a 5 x 5 grid", () => {
  
      let test_grid = [
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-'],
          ['-', '-', '*', '-', '-'],
          ['-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-'],
      ]
      wrapper = setup(GridDisplay, {}, {data: test_grid})
      console.log(wrapper.debug())
      expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(4)
      expect(wrapper.find({ cells: test_grid[2] })).toHaveLength(1)
    })
  })
  
})
