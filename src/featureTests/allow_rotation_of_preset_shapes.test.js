import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { findByTestAttr, defaultGameSettingsProps } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('rotationAndMirroring', () => {
  let wrapper;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(
      <Game 
        settings={defaultGameSettingsProps.gameForm}
        colors={{ playerOneColor: { value: '' } }}
      />
    );
    wrapper.setState({ model: testGridModel });
  });

  describe('setting shape rotation angle', () => {
    it('changes the shape orientation to 90 degrees after pressing the rotateShape button once', async () => {
      const rotateShapeButton = findByTestAttr(wrapper, 'rotate-button');

      await rotateShapeButton.simulate('click');
      setTimeout(() => {
        expect(wrapper.state().shapeOrientation).toEqual(90);
      });
    });

    it('changes the shape orientation back to 0 degrees after pressing the rotateShape button 4 times', async () => {
      const rotateShapeButton = findByTestAttr(wrapper, 'rotate-button');

      await rotateShapeButton.simulate('click');
      await rotateShapeButton.simulate('click');
      await rotateShapeButton.simulate('click');
      await rotateShapeButton.simulate('click');

      setTimeout(() => {
        expect(wrapper.state().shapeOrientation).toEqual(0);
      });
    });
  });

  describe('mirroring shape', () => {
    it('changes mirror to true after first click', async () => {
      const mirrorShapeButton = findByTestAttr(wrapper, 'mirror-button');
      await mirrorShapeButton.simulate('click');

      setTimeout(() => {
        expect(wrapper.state().mirrorShape).toEqual(true);
      });
    });

    it('changes mirror back to false after 2 clicks', async () => {
      const mirrorShapeButton = findByTestAttr(wrapper, 'mirror-button');
      await mirrorShapeButton.simulate('click');
      await mirrorShapeButton.simulate('click');

      setTimeout(() => {
        expect(wrapper.state().mirrorShape).toEqual(false);
      });
    });
  });
});
