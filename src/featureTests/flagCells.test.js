import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import { formatGrid, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('flagCells', () => {
  let testFlag;
  let testFlag1;
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

  describe('flag behaviour during evolution', () =>{

    test('a flag with no neighbours survives an evolution', () => {
      testGridModel.placeFlag([[2, 2]]);
      wrapper = mount(<App />);
      wrapper.setState({ model: testGridModel });

      testFlag = wrapper.find({ id: '22_cell' });
      formatGrid(wrapper.state('model').render());

      const evolveButton = findByTestAttr(wrapper, 'evolution-button');
      evolveButton.simulate('click');

      testFlag = wrapper.find({ id: '22_cell' });
      expect(testFlag.prop('cell')).toEqual(flag);

    });

    test('multiple flags with no neighbour survive and evolution', () => {
      testGridModel.placeFlag([[2, 2], [0,1]]);
      wrapper = mount(<App />);
      wrapper.setState({ model: testGridModel });

      testFlag = wrapper.find({ id: '22_cell' });
      testFlag1 = wrapper.find({ id: '01_cell' });
      formatGrid(wrapper.state('model').render());

      const evolveButton = findByTestAttr(wrapper, 'evolution-button');
      evolveButton.simulate('click');

      testFlag = wrapper.find({ id: '22_cell' });
      testFlag1 = wrapper.find({ id: '01_cell' });
      expect(testFlag.prop('cell')).toEqual(flag);
      expect(testFlag1.prop('cell')).toEqual(flag);


    })
  });
});
