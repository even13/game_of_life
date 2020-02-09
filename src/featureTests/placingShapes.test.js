import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { findByTestAttr } from '../test-helper';

import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('placingShapes', () => {
  let wrapper;
  let testGridModel;

  let pressedCell;
  let testCell;
  let testCell2;
  let testCell3;
  let testCell4;
  let testCell5;

  beforeEach(() => {
    testGridModel = new Grid(15);
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  describe('placing whole spinners', () => {
    let spinnerCreator;

    beforeEach(() => {
      spinnerCreator = findByTestAttr(wrapper, 'create-spinner');
    });

    test('a player places a spinner on the board at [2, 2]', () => {
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

    test('a player places a spinner on the board at [0, 1]', () => {
      spinnerCreator.simulate('click');

      pressedCell = wrapper.find({ id: '01_cell' });
      pressedCell.simulate('click');

      testCell = wrapper.find({ id: '00_cell' });
      testCell2 = wrapper.find({ id: '01_cell' });
      testCell3 = wrapper.find({ id: '02_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testCell3.prop('cell').value).toEqual('*');
    });
  });

  describe('placing whole spaceships', () => {
    let spaceshipCreator;

    beforeEach(() => {
      spaceshipCreator = findByTestAttr(wrapper, 'create-spaceship');
    });

    test('a player places a spaceship on the board at [2, 2]', () => {
      spaceshipCreator.simulate('click');

      pressedCell = wrapper.find({ id: '22_cell' });
      pressedCell.simulate('click');

      testCell = wrapper.find({ id: '13_cell' });
      testCell2 = wrapper.find({ id: '21_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });
      testCell4 = wrapper.find({ id: '32_cell' });
      testCell5 = wrapper.find({ id: '33_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testCell3.prop('cell').value).toEqual('*');
      expect(testCell4.prop('cell').value).toEqual('*');
      expect(testCell5.prop('cell').value).toEqual('*');

      pressedCell = wrapper.find({ id: '22_cell' });

      expect(pressedCell.prop('cell').value).toEqual('-');
    });

    test('a player places a spaceship on the board at [1, 1]', () => {
      spaceshipCreator.simulate('click');

      pressedCell = wrapper.find({ id: '11_cell' });
      pressedCell.simulate('click');

      testCell = wrapper.find({ id: '10_cell' });
      testCell2 = wrapper.find({ id: '21_cell' });
      testCell3 = wrapper.find({ id: '02_cell' });
      testCell4 = wrapper.find({ id: '12_cell' });
      testCell5 = wrapper.find({ id: '22_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testCell3.prop('cell').value).toEqual('*');
      expect(testCell4.prop('cell').value).toEqual('*');
      expect(testCell5.prop('cell').value).toEqual('*');

      pressedCell = wrapper.find({ id: '11_cell' });

      expect(pressedCell.prop('cell').value).toEqual('-');
    });
  });

  describe('placing whole birds', () => {
    let birdCreator;

    beforeEach(() => {
      birdCreator = findByTestAttr(wrapper, 'create-bird');
    });

    test('a player places a bird on the board at [8, 9]', () => {
      birdCreator.simulate('click');

      pressedCell = wrapper.find({ id: '89_cell' });
      pressedCell.simulate('click');

      const birdCellIds = [
        '97_cell', '107_cell', '68_cell', '78_cell', '88_cell', '108_cell',
        '118_cell', '69_cell', '79_cell', '89_cell', '99_cell', '109_cell',
        '710_cell', '810_cell', '910_cell',
      ];

      birdCellIds.forEach((id) => {
        expect(wrapper.find({ id }).prop('cell').value).toEqual('*');
      });
    });
  });
});
