import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
// import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';
import { findByTestAttr, defaultGameSettingsProps } from '../test-helper';


Enzyme.configure({ adapter: new EnzymeAdapter() });

jest.useFakeTimers();

describe('animation', () => {
  let wrapper;
  const testGridModel = new Grid(6);
  let testCell;
  let one;

  beforeEach(() => {
    wrapper = mount(
      <Game
        test
        settings={defaultGameSettingsProps.gameForm}
        colors={{ playerOneColor: { value: '' } }}
      />,
    );
    wrapper.setState({ model: testGridModel });
    one = { value: '*', player: 1 };
  });

  it('should iterate for 300 evolutions by default', async () => {
    const runButton = findByTestAttr(wrapper, 'run-button');

    testCell = wrapper.find({ id: '10_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '21_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '22_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '12_cell' });
    testCell.simulate('click');

    testCell = wrapper.find({ id: '02_cell' });
    testCell.simulate('click');

    runButton.simulate('click');

    jest.runAllTimers();
    wrapper.update();

    setTimeout(() => {
      expect(wrapper.find({ id: '21_cell' }).prop('cell')).toEqual(one);
      expect(wrapper.find({ id: '32_cell' }).prop('cell')).toEqual(one);
      expect(wrapper.find({ id: '33_cell' }).prop('cell')).toEqual(one);
      expect(wrapper.find({ id: '23_cell' }).prop('cell')).toEqual(one);
      expect(wrapper.find({ id: '13_cell' }).prop('cell')).toEqual(one);
      expect(wrapper.state().iterationCount).toEqual(100);
    });
  });
});
