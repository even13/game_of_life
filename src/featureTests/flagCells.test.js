import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
// import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();
  let empty;
  let one;
  let flag;

  beforeEach(() => {
    testGridModel.placeFlag([[0, 4]])
    wrapper = mount(<App />);
    wrapper.setState({ model: testGridModel });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    flag = { value: 'f', player: null}

  });

  it('cannot be replaced with a live cell', () => {
    wrapper = mount(<App />);
    testCell = wrapper.find({ id: '04_cell' });
    testCell.simulate('click');

    expect(testCell.prop('cell').toEqual(flag));

  });
});

