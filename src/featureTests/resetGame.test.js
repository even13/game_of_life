import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import App from '../App';
import { findByTestAttr, defaultGameSettingsProps } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('resetGame', () => {
  let wrapper;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(
      <App />,
    );
    wrapper.setState({ model: testGridModel });
  });

  test('resets the scores', () => {

  });
});
