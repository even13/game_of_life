// import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Cell from './Cell';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Cell />', () => {
  let wrapper;
  let CellComponent;

  beforeEach(() => {
    wrapper = setup(Cell, { cell: { value: '-', player: null } });
    CellComponent = findByTestAttr(wrapper, 'component-cell');
  });

  it('renders without error', () => {
    expect(CellComponent).toHaveLength(1);
  });
});
