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

  // describe('rotateShape', () => {
  //   it('is sets the orientation to 90 when run once', () => {
  //     console.log(wrapper.dive().debug())
  //     expect(gameInstance.state.shapeOrientation).toStrictEqual(90);
  //   });
  // });
});
