import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from '../containers/Game/Game';
import { setup, findByTestAttr } from '../test-helper';
import Grid from '../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('cellState', () => {
  let wrapper;
  const testGridModel = new Grid();
  let empty;
  let one;

  beforeEach(() => {
    wrapper = mount(<Game />);
    wrapper.setState({ model: testGridModel });
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
  });

  describe('placing live cells from the browser', () => {
    let testCell;

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

});
