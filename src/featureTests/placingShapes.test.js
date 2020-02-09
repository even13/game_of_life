import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { findByTestAttr } from '../test-helper';

import Grid from '../models/grid/grid';
import { isTSAnyKeyword } from '@babel/types';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('testCellInteraction', () => {
  let wrapper;
  let testGridModel;

  let testCell;
  let testCell2;
  let testCell3;

  beforeEach(() => {
    testGridModel = new Grid(5);
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  test('a player places a spinner on the board at [2, 1], [2, 2] and [2, 3]', () => {
    const spinnerCreator = findByTestAttr(wrapper, 'create-spinner');
    spinnerCreator.simulate('click');

    testCell = wrapper.find({ id: '22_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '21_cell' });
    testCell2 = wrapper.find({ id: '22_cell' });
    testCell3 = wrapper.find({ id: '23_cell' });

    expect(testCell.prop('cell').value).toEqual('*');
    expect(testCell2.prop('cell').value).toEqual('*');
    expect(testCell3.prop('cell').value).toEqual('*');
  });

  test('a player places a spinner on the board at [0, 0], [0, 1] and [0, 2]', () => {
    const spinnerCreator = findByTestAttr(wrapper, 'create-spinner');
    spinnerCreator.simulate('click');

    testCell = wrapper.find({ id: '01_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '00_cell' });
    testCell2 = wrapper.find({ id: '01_cell' });
    testCell3 = wrapper.find({ id: '02_cell' });

    expect(testCell.prop('cell').value).toEqual('*');
    expect(testCell2.prop('cell').value).toEqual('*');
    expect(testCell3.prop('cell').value).toEqual('*');
  });
});
