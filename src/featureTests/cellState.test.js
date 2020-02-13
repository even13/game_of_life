import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { defaultGameSettingsProps } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  let wrapperTwo;
  const testGridModel = new Grid();
  const testGridModelTwo = new Grid();
  let empty;
  let one;

  beforeEach(() => {
    wrapper = mount(
      <Game
        settings={defaultGameSettingsProps.gameForm}
        colors={{ playerOneColor: { value: '' } }}
      />,
    );
    wrapperTwo = mount(
      <Game
        settings={defaultGameSettingsProps.gameForm}
        colors={{ playerOneColor: { value: '' } }}
      />,
    );
    wrapper.setState({ model: testGridModel });
    wrapperTwo.setState({ model: testGridModelTwo });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
  });

  describe('placing live cells from the browser', () => {
    let testCell;

    it('', () => {
      setTimeout(() => { console.log(wrapper); });
    });
    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '04_cell' });
      expect(testCell.prop('cell')).toEqual(empty);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '04_cell' });
      expect(testCell.prop('cell')).toEqual(one);
    });

    it('changes the value assigned to three clicked cells', () => {
      testCell = wrapperTwo.find({ id: '018_cell' });
      testCell.simulate('click');

      testCell = wrapperTwo.find({ id: '019_cell' });
      testCell.simulate('click');

      testCell = wrapperTwo.find({ id: '1420_cell' });
      testCell.simulate('click');

      const clickedCells = wrapperTwo.find({ cell: one });
      expect(clickedCells).toHaveLength(3);
    });
  });

  describe('removes live cells from the browser', () => {
    let testCell;

    it('changes the value assigned to the clicked cell', () => {
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(empty);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(one);

      testCell.simulate('click');
      testCell = wrapper.find({ id: '00_cell' });
      expect(testCell.prop('cell')).toEqual(empty);
    });
  });
});
