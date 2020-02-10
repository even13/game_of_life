import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
// import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';
import { findByTestAttr } from '../test-helper';


Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Game />', () => {
  let wrapper;
  let testGridModel;

  beforeEach(() => {
    testGridModel = new Grid();
    wrapper = mount(<Game />);
    wrapper.setState({ model: testGridModel });
  });

  it('allows the number of iterations to be changed', () => {
    const iterationsBox = findByTestAttr(wrapper, 'iterations');

    iterationsBox.simulate('change', { target: { value: '50' } });

    expect(wrapper.state().maxIterations).toEqual(50);
  });

  it('allows the rate of evolution to be changed', () => {
    const evolutionRateBox = findByTestAttr(wrapper, 'evolution-rate');

    evolutionRateBox.simulate('change', { target: { value: '10' } });

    expect(wrapper.state().evolutionRate).toEqual(10);
  });
});
