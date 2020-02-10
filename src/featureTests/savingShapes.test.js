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

  test('a user creates and saves a shape', () => {
    
  });
});
