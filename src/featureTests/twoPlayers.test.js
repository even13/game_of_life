import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { findByTestAttr, defaultGameSettingsProps } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('twoPlayers', () => {
  let wrapper;
  let testCell;
  let testCell2;
  let playerToggle;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(
      <Game
        test
        onDisplayUpdate={jest.fn()}
        settings={defaultGameSettingsProps.gameForm}
        colors={{
          playerOneColor: { value: '' },
          playerTwoColor: { value: '' },
        }}
      />,
    );
    wrapper.setState({ model: testGridModel });
  });

  it('lets players place two types of cells on the grid', () => {
    testCell = wrapper.find({ id: '018_cell' });
    testCell2 = wrapper.find({ id: '99_cell' });

    testCell.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    playerToggle.simulate('click');

    testCell2.simulate('click');

    testCell = wrapper.find({ id: '018_cell' });
    testCell2 = wrapper.find({ id: '99_cell' });

    expect(testCell.prop('cell').player).toEqual(1);
    expect(testCell2.prop('cell').player).toEqual(2);
  });

  it('prevents player 2 from removing a cell placed by player 1', () => {
    testCell = wrapper.find({ id: '2020_cell' });

    testCell.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    playerToggle.simulate('click');

    testCell.simulate('click');

    testCell = wrapper.find({ id: '2020_cell' });
    expect(testCell.prop('cell').player).toEqual(1);
    expect(testCell.prop('cell').value).toEqual('*');
  });

  test('cell keeps track of owner with each evolution', async () => {
    testCell = wrapper.find({ id: '2020_cell' });
    testCell2 = wrapper.find({ id: '2021_cell' });
    let testCell3 = wrapper.find({ id: '2022_cell' });

    let testCell4 = wrapper.find({ id: '1018_cell' });
    let testCell5 = wrapper.find({ id: '1019_cell' });
    let testCell6 = wrapper.find({ id: '1020_cell' });


    await testCell.simulate('click');
    await testCell2.simulate('click');
    await testCell3.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    await playerToggle.simulate('click');

    await testCell4.simulate('click');
    await testCell5.simulate('click');
    await testCell6.simulate('click');

    playerToggle = findByTestAttr(wrapper, 'player-toggle');
    await playerToggle.simulate('click');

    const evolveButton = findByTestAttr(wrapper, 'evolution-button');
    await evolveButton.simulate('click');

    setTimeout(() => {
      testCell = wrapper.find({ id: '1921_cell' });
      expect(testCell.prop('cell').player).toEqual(1);
      expect(testCell.prop('cell').value).toEqual('*');
      expect((wrapper.find({ id: '2020_cell' })).prop('cell').player).toEqual(null);
      expect((wrapper.find({ id: '2020_cell' })).prop('cell').value).toEqual('-');

      testCell2 = wrapper.find({ id: '2021_cell' });
      expect(testCell2.prop('cell').player).toEqual(1);
      expect(testCell2.prop('cell').value).toEqual('*');

      testCell3 = wrapper.find({ id: '2121_cell' });
      expect(testCell3.prop('cell').player).toEqual(1);
      expect(testCell3.prop('cell').value).toEqual('*');
      expect((wrapper.find({ id: '2022_cell' })).prop('cell').player).toEqual(null);
      expect((wrapper.find({ id: '2022_cell' })).prop('cell').value).toEqual('-');

      testCell4 = wrapper.find({ id: '919_cell' });
      expect(testCell4.prop('cell').player).toEqual(2);
      expect(testCell4.prop('cell').value).toEqual('*');
      expect((wrapper.find({ id: '1018_cell' })).prop('cell').player).toEqual(null);
      expect((wrapper.find({ id: '1018_cell' })).prop('cell').value).toEqual('-');

      testCell5 = wrapper.find({ id: '1019_cell' });
      expect(testCell5.prop('cell').player).toEqual(2);
      expect(testCell5.prop('cell').value).toEqual('*');

      testCell6 = wrapper.find({ id: '1119_cell' });
      expect(testCell6.prop('cell').player).toEqual(2);
      expect(testCell6.prop('cell').value).toEqual('*');
      expect((wrapper.find({ id: '1020_cell' })).prop('cell').player).toEqual(null);
      expect((wrapper.find({ id: '1020_cell' })).prop('cell').value).toEqual('-');
    });
  });
});
