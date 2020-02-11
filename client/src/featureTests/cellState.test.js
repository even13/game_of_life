import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
// import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();
  let empty;
  let one;

  beforeEach(() => {
    wrapper = mount(<Game />);
    wrapper.setState({ model: testGridModel });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
  });

  describe('placing live cells from the browser', () => {
    let testCell;

    beforeEach(() => {
      wrapper = mount(<Game />);
    });

    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '04_cell' });
      expect(testCell.prop('cell')).toEqual(empty);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '04_cell' });
      expect(testCell.prop('cell')).toEqual(one);
    });

    it('changes the value assigned to two clicked cells', () => {
      testCell = wrapper.find({ id: '018_cell' });
      testCell.simulate('click');

      testCell = wrapper.find({ id: '019_cell' });
      testCell.simulate('click');

      testCell = wrapper.find({ id: '1420_cell' });
      testCell.simulate('click');

      const clickedCells = wrapper.find({ cell: one });

      expect(clickedCells).toHaveLength(3);
    });
  });

  describe('removes live cells from the browser', () => {
    let testCell;

    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(empty);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(one);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(empty);
    });
  });
});
