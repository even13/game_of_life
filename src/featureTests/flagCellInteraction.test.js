import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { findByTestAttr } from '../test-helper';

import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('testCellInteraction', () => {
  let wrapper;
  const testGridModel = new Grid(5);
  let testCell;
  let testCell2;
  let testCell3;

  let testFlag;

  let empty;
  let one;


  beforeEach(() => {
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  describe('a player 1 spinner next to a player 1 flag', () => {
    it('persists after two generations as usual', () => {
      testGridModel.placeFlag([[3, 2]]);
      wrapper = mount(<App />);
      wrapper.setState({ model: testGridModel });

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });

      testCell.simulate('click');
      testCell2.simulate('click');
      testCell3.simulate('click');

      const evolveButton = findByTestAttr(wrapper, 'evolution-button');
      evolveButton.simulate('click');

      testCell = wrapper.find({ id: '12_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testFlag = wrapper.find({ id: '32_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testFlag.prop('cell').value).toEqual('f');

      evolveButton.simulate('click');

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });
      testFlag = wrapper.find({ id: '32_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testCell3.prop('cell').value).toEqual('*');
      expect(testFlag.prop('cell').value).toEqual('f');
    });
  });
});
