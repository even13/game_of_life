import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Game from './Game';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Game />', () => {
  let wrapper;
  let gameComponent;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = setup(Game, {}, { model: testGridModel });
    gameComponent = findByTestAttr(wrapper, 'component-game');
  });

  it('renders without error', () => {
    expect(gameComponent).toHaveLength(1);
  });

  it('renders a <GridDisplay />', () => {
    const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');

    expect(gridDisplayComponent).toHaveLength(1);
  });

  describe('gridDisplay', () => {
    it('is assigned a grid model', () => {
      const gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');

      expect(gridDisplayComponent.prop('model')).toStrictEqual(testGridModel);
    });
  });

  describe('rotateShape', () => {
    it('should change the shape orientation to 90 degrees when run once', () => {
      wrapper.instance().rotateShape();

      expect(wrapper.state('shapeOrientation')).toStrictEqual(90);
    });

    it('should change the shape orientation back to 0 degrees when run 4 times', () => {
      wrapper.instance().rotateShape();
      wrapper.instance().rotateShape();
      wrapper.instance().rotateShape();
      wrapper.instance().rotateShape();

      expect(wrapper.state('shapeOrientation')).toStrictEqual(0);
    });
  });

  describe('handleMirrorShape', () => {
    it('should set to true after run once', () => {
      wrapper.instance().handleMirrorShape();

      expect(wrapper.state('mirrorShape')).toStrictEqual(true);
    });

    it('should set back to false when run twice', () => {
      wrapper.instance().handleMirrorShape();
      wrapper.instance().handleMirrorShape();

      expect(wrapper.state('mirrorShape')).toStrictEqual(false);
    });
  });
});
