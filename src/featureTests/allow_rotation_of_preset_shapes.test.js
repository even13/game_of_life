import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = mount(<Game />);
    wrapper.setState({ model: testGridModel });
  });

  describe('setting shape rotation angle', () => {
    beforeEach(() => {
      wrapper = mount(<Game />);
    });

    it('changes the shape orientation to 90 degrees after pressing the rotateShape button once', () => {
      const rotateShapeButton = findByTestAttr(wrapper, 'rotate-button');

      rotateShapeButton.simulate('click');
      expect(wrapper.state().shapeOrientation).toEqual(90);
    });

    it('changes the shape orientation back to 0 degrees after pressing the rotateShape button 4 times', () => {
      const rotateShapeButton = findByTestAttr(wrapper, 'rotate-button');

      rotateShapeButton.simulate('click');
      rotateShapeButton.simulate('click');
      rotateShapeButton.simulate('click');
      rotateShapeButton.simulate('click');

      expect(wrapper.state().shapeOrientation).toEqual(0);
    });
  });

  describe('mirroring shape', () => {
    beforeEach(() => {
      wrapper = mount(<Game />);
    });

    it('changes mirror to true after first click', () => {
      const mirrorShapeButton = findByTestAttr(wrapper, 'mirror-button');
      mirrorShapeButton.simulate('click');

      expect(wrapper.state().mirrorShape).toEqual(true);
    });

    it('changes mirror back to false after 2 clicks', () => {
      const mirrorShapeButton = findByTestAttr(wrapper, 'mirror-button');
      mirrorShapeButton.simulate('click');
      mirrorShapeButton.simulate('click');

      expect(wrapper.state().mirrorShape).toEqual(false);
    });
  });
});
