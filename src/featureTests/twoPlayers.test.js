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
  const testGridModel = new Grid();
  let empty;
  let one;
  let two;

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    two = { value: '*', player: 2 };
  });

  it('lets players place two types of cells on the grid', () => {
    testCell = wrapper.find({ id: '018_cell' });
    let testCell2 = wrapper.find({ id: '99_cell' });

    testCell.simulate('click');

    const playerToggle = findByTestAttr(wrapper, 'player-toggle');
    playerToggle.simulate('click');

    testCell2.simulate('click');

    testCell = wrapper.find({ id: '018_cell' });
    testCell2 = wrapper.find({ id: '99_cell' });

    expect(testCell.prop('cell').player).toEqual(1);
    expect(testCell2.prop('cell').player).toEqual(2);
  });
});
