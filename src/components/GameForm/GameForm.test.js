import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GameForm from './GameForm';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GameForm />', () => {
  let wrapper;
  let gameFormComponent;
  let testGridModel;


  beforeEach(() => {
    testGridModel = new Grid(30);
    wrapper = setup(GameForm, { model: testGridModel });
    gameFormComponent = findByTestAttr(wrapper, 'component-game-form');
  });

  it('renders without error', () => {
    expect(gameFormComponent).toHaveLength(1);
  });
});
