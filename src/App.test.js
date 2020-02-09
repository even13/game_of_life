// import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import { setup, findByTestAttr } from './test-helper';
import Grid from './models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {
  let wrapper;
  let appComponent;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = setup(App, {}, { model: testGridModel });
    appComponent = findByTestAttr(wrapper, 'component-app');
  });

  it('renders without error', () => {
    expect(appComponent).toHaveLength(1);
  });

  it('renders a <GridDisplay />', () => {
    const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');

    expect(gridDisplayComponent).toHaveLength(1);
  });

  describe('gridDisplay', () => {
    it('is assigned a grid model', () => {
      const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');

      expect(gridDisplayComponent.prop('model')).toStrictEqual(testGridModel);
    });
  });

  it('renders an evolve button', () => {
    const button = findByTestAttr(wrapper, 'evolution-button');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Click To Evolve');
  });

  it('renders a player-toggle button', () => {
    const button = findByTestAttr(wrapper, 'player-toggle');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Click To Toggle Player');
  });

  it('renders a run button', () => {
    const button = findByTestAttr(wrapper, 'run-button');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Run');
  });

  it('renders an evolution rate input box with default value of 100ms', () => {
    const updateRateBox = findByTestAttr(wrapper, 'evolution-rate');

    expect(updateRateBox).toHaveLength(1);
    expect(updateRateBox.props().value).toEqual(50);
  });

  it('renders an Run Time input box with default value of 30s', () => {
    const iterationsBox = findByTestAttr(wrapper, 'iterations');

    expect(iterationsBox).toHaveLength(1);
    expect(iterationsBox.props().value).toEqual(100);
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
