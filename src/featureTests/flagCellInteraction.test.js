import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { findByTestAttr, defaultGameSettingsProps } from '../test-helper';

import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('flagCellInteraction', () => {
  let wrapper;
  let testGridModel;
  let testCell;
  let testCell2;
  let testCell3;
  let testFlag;
  let playerToggle;

  beforeEach(() => {
    testGridModel = new Grid(5);
    wrapper = mount(
      <Game
        onDisplayUpdate={jest.fn()}
        settings={defaultGameSettingsProps.gameForm}
        colors={{ playerOneColor: { value: '' } }}
      />,
    );
    wrapper.setState({ model: testGridModel, settings: defaultGameSettingsProps.gameForm });
  });

  describe('a player 1 spinner next to a player 1 flag', () => {
    it('persists after two generations as usual', () => {
      testGridModel.placeFlag([[3, 2]], 1);
      wrapper.setState({ model: testGridModel });

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });

      testCell.simulate('click');
      testCell2.simulate('click');
      testCell3.simulate('click');

      const evolveButton = findByTestAttr(wrapper, 'evolution-button');
      evolveButton.simulate('click');

      testCell = wrapper.find({ id: '12_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testFlag = wrapper.find({ id: '32_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testFlag.prop('cell').value).toEqual('f');

      evolveButton.simulate('click');

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });
      testFlag = wrapper.find({ id: '32_cell' });

      expect(testCell.prop('cell').value).toEqual('*');
      expect(testCell2.prop('cell').value).toEqual('*');
      expect(testCell3.prop('cell').value).toEqual('*');
      expect(testFlag.prop('cell').value).toEqual('f');
    });
  });

  describe('a player 2 spinner next to a player 1 flag', () => {
    it('a player 1 flag should destroy a player 2 spinner after 2 generations', () => {
      testGridModel.placeFlag([[3, 2]], 1);
      wrapper.setState({ model: testGridModel });

      playerToggle = findByTestAttr(wrapper, 'player-toggle');
      playerToggle.simulate('click');

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });

      const evolveButton = findByTestAttr(wrapper, 'evolution-button');
      evolveButton.simulate('click');
      evolveButton.simulate('click');

      testCell = wrapper.find({ id: '21_cell' });
      testCell2 = wrapper.find({ id: '22_cell' });
      testCell3 = wrapper.find({ id: '23_cell' });
      testFlag = wrapper.find({ id: '32_cell' });

      expect(testCell.prop('cell').value).toEqual('-');
      expect(testCell2.prop('cell').value).toEqual('-');
      expect(testCell3.prop('cell').value).toEqual('-');
      expect(testFlag.prop('cell').value).toEqual('f');
    });
  });
});
