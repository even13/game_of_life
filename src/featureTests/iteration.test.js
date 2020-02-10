import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import Game from '../containers/Game/Game';
import { findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// jest.useFakeTimers();

describe('runIteration', () => {
  let wrapper;
  const testGridModel = new Grid(5);
  let empty;
  let one;

  beforeEach(() => {
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    wrapper = mount(<Game />);
    wrapper.setState({ model: testGridModel });
    wrapper.find({ id: '12_cell' }).simulate('click');
    wrapper.find({ id: '32_cell' }).simulate('click');
    wrapper.find({ id: '22_cell' }).simulate('click');
    // wrapper.find({ id: '12_cell' }).simulate('click');
    // wrapper.find({ id: '02_cell' }).simulate('click');
  });

  it('rotates a spinner by 90 degrees after 3 evolutions', async () => {
    // wrapper.instance().run is asynchronous
    const runButton = findByTestAttr(wrapper, 'run-button');
    // console.log(runButton.instance());
    runButton.simulate('click');
     // console.log(wrapper.instance());
    // jest.runAllTimers();
    await wrapper.instance().run(3);// await because we want to wait for the function to complete
    wrapper.update(); // force to re-render
    // console.log(runButton.instance())
    expect(wrapper.find({ id: '21_cell' }).prop('cell')).toEqual(one);
    expect(wrapper.find({ id: '12_cell' }).prop('cell')).toEqual(empty);

    expect(wrapper.find({ id: '22_cell' }).prop('cell')).toEqual(one);

    expect(wrapper.find({ id: '23_cell' }).prop('cell')).toEqual(one);
    expect(wrapper.find({ id: '32_cell' }).prop('cell')).toEqual(empty);
  });
});
