import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import GridDisplay from './GridDisplay'
import {setup, findByTestAttr} from '../../test-helper'
import Grid from '../../models/grid/grid'

Enzyme.configure({adapter: new EnzymeAdapter()})

describe("<GridDisplay />", () => {
  let wrapper;
  let GridDisplayComponent;
  let testGridModel = new Grid(3)

  beforeEach( () => {
    wrapper = setup(GridDisplay)
    GridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display')
  })

  it ("renders without error", () => {
    expect(GridDisplayComponent).toHaveLength(1)
  })

  describe('rendering cells', () => {
    it('renders a 30 x 30 grid by default', () => {
      const RowComponent = findByTestAttr(wrapper, 'component-row')
      expect(RowComponent).toHaveLength(30)
    })

    it ("can display 3 rows correctly when passed in 3 rows", () => {
      wrapper = setup(GridDisplay, {}, {data: [1, 1, 1]})
  
      const RowComponent = findByTestAttr(wrapper, 'component-row')
      expect(RowComponent).toHaveLength(3)
  
    })

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

      expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(4)
      expect(wrapper.find({ cells: test_grid[2] })).toHaveLength(1)
    })

    it ("creates an array of cells for each row of a 5 x 5 grid", () => {
  
      let test_grid = [
          ['-', '-', '-', '-', '-', '-', '-', '-'],
          ['-', '-', '-', '*', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-', '-', '*', '-'],
          ['-', '-', '-', '-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-', '-', '*', '-'],
          ['-', '-', '-', '-', '-', '-', '-', '-'],
          ['-', '-', '-', '-', '-', '-', '-', '-'],
      ]
      wrapper = setup(GridDisplay, {}, {data: test_grid})
      console.log(wrapper.debug())
      expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(5)
      expect(wrapper.find({ cells: test_grid[1] })).toHaveLength(1)
      expect(wrapper.find({ cells: test_grid[3] })).toHaveLength(2)
    })
  })

  describe('cell data', () => {

    describe('placing live cells', () => {

    })

  })
})
