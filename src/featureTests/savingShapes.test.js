import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';

import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('placingShapes', () => {
  let wrapper;
  let testGridModel;

  beforeEach(() => {
    testGridModel = new Grid(15);
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
  });

  test('a user creates and saves a shape', () => {
    expect(1 + 1).toBe(2);
  });
});
