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
    expect(button.text()).toEqual('Click To Evolve')
  });

  it('renders a player-toggle button', () => {
    const button = findByTestAttr(wrapper, 'player-toggle');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('Click To Toggle Player')
  });
});
