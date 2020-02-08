import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
// import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const formatGrid = (grid) => {
    let gridString = []

    for(let y = 0; y < grid.length; y++){
        let rowString = ''
        for (let x = 0; x <grid.length; x++){
            rowString += `${JSON.stringify(grid[y][x])} ` 
        }
        gridString.push(rowString +`\n`)
    }
    gridString = gridString.join(`\n`)
    console.log(gridString)
}
describe('flagCells', () => {
  let testCell;
  let wrapper;
  const testGridModel = new Grid(5);
  let empty;
  let one;
  let flag;

  beforeEach(() => {
    testGridModel.placeFlag([[0, 4]])
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    flag = { value: 'f', player: null}

  });

  it('cannot be replaced with a live cell', () => {
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
    testCell = wrapper.find({ id: '04_cell' });
    testCell.simulate('click');
    testCell = wrapper.find({ id: '04_cell' });
    formatGrid(wrapper.state('model').render())

    expect(testCell.prop('cell')).toEqual(flag);

  });
});

