import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  describe('placing live cells from the browser', () => {
    let testCell;

    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('value')).toEqual('-');

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('value')).toEqual('*');
    });

    it('changes the value assigned to two clicked cells', () => {
      testCell = wrapper.find({ id: '018_cell' });
      testCell.simulate('click');

      testCell = wrapper.find({ id: '019_cell' });
      testCell.simulate('click');

      testCell = wrapper.find({ id: '1420_cell' });
      testCell.simulate('click');

      const clickedCells = wrapper.find({ value: '*' });

      expect(clickedCells).toHaveLength(3);
    });
  });

  describe('removes live cells from the browser', () => {
    let testCell;

    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('value')).toEqual('-');

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('value')).toEqual('*');

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('value')).toEqual('-');
    });
  });
});
