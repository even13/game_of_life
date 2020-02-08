import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { formatGrid } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('flagCells', () => {
  let testFlag;
  let testFlag2;
  let testFlag3;
  let wrapper;
  const testGridModel = new Grid(5);
  let flag;

  beforeEach(() => {
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
    flag = { value: 'f', player: null };
  });

  it('cannot be replaced with a live cell', () => {
    testGridModel.placeFlag([[0, 4]]);
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });

    testFlag = wrapper.find({ id: '04_cell' });
    testFlag.simulate('click');

    testFlag = wrapper.find({ id: '04_cell' });

    expect(testFlag.prop('cell')).toEqual(flag);
  });

  describe('multiple flags', () => {
    test('a grid can hold flags at [2, 2], [3, 3] and [0, 1]', () => {
      testGridModel.placeFlag([[2, 2], [3, 3], [0, 1]]);
      wrapper = mount(<App />);
      wrapper.setState({ model: testGridModel });

      testFlag = wrapper.find({ id: '22_cell' });
      testFlag2 = wrapper.find({ id: '33_cell' });
      testFlag3 = wrapper.find({ id: '01_cell' });

      formatGrid(wrapper.state('model').render());

      expect(testFlag.prop('cell')).toEqual(flag);
      expect(testFlag2.prop('cell')).toEqual(flag);
      expect(testFlag3.prop('cell')).toEqual(flag);
    });
  });
});
