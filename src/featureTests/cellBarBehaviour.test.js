import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GamePage from '../containers/GamePage/GamePage';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();
  let testCell;

  beforeEach(() => {
    wrapper = mount(<GamePage />);
    wrapper.setState({ model: testGridModel });
  });

  it('increments when cells are removed from grid', () => {
    testCell = wrapper.find({ id: '04_cell' });
    testCell.simulate('click');
    expect(wrapper.state('playerOneCells')).toBe(99);
    testCell = wrapper.find({ id: '04_cell' });
    testCell.simulate('click');
    expect(wrapper.state('playerOneCells')).toBe(100);
  });

  it('decrements when cells are added to grid', () => {
    testCell = wrapper.find({ id: '04_cell' });
    testCell.simulate('click');
    expect(wrapper.state('playerOneCells')).toBe(99);
  });

  it('does not decrement if cell bar is at 0', () => {
    for (let i = 10; i < 110; i++) {
      wrapper.find({ id: `${i}_cell` }).simulate('click');
    }
    wrapper.find({ id: '2912_cell' }).simulate('click');
    expect(wrapper.state('playerOneCells')).toBe(0);
  });
});
