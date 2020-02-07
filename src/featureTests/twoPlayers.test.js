import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('twoPlayers', () => {
  let wrapper;
  let testCell;
  let testCell2;
  let playerToggle;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  it('lets players place two types of cells on the grid', () => {
    testCell = wrapper.find({ id: '018_cell' });
    testCell2 = wrapper.find({ id: '99_cell' });

    testCell.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    playerToggle.simulate('click');

    testCell2.simulate('click');

    testCell = wrapper.find({ id: '018_cell' });
    testCell2 = wrapper.find({ id: '99_cell' });

    expect(testCell.prop('cell').player).toEqual(1);
    expect(testCell2.prop('cell').player).toEqual(2);
  });

  it('prevents player 2 from removing a cell placed by player 1', () => {
    testCell = wrapper.find({ id: '2020_cell' });

    testCell.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    playerToggle.simulate('click');

    testCell.simulate('click');

    testCell = wrapper.find({ id: '2020_cell' });
    expect(testCell.prop('cell').player).toEqual(1);
    expect(testCell.prop('cell').value).toEqual('*');
  });
});
