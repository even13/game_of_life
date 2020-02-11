import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GamePage from './GamePage';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GamePages />', () => {
  let wrapper;
  let GamePageComponent;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = setup(GamePage, {}, { model: testGridModel });
    GamePageComponent = findByTestAttr(wrapper, 'component-game-page');
  });

  it('renders without error', () => {
    expect(GamePageComponent).toHaveLength(1);
  });

  it("can increment player 1's cell bar", () => {
    wrapper.instance().decrement(6, 1);
    wrapper.instance().increment(5, 1);
    expect(wrapper.state('playerOneCells')).toBe(99);
  });

  it("can decrement player 1's cell bar", () => {
    wrapper.instance().decrement(6, 1);
    expect(wrapper.state('playerOneCells')).toBe(94);
  });

  it("can increment player 2's cell bar", () => {
    wrapper.instance().decrement(7, 2);
    wrapper.instance().increment(5, 2);
    expect(wrapper.state('playerTwoCells')).toBe(98);
  });

  it("can decrement player 2's cell bar", () => {
    wrapper.instance().decrement(7, 2);
    expect(wrapper.state('playerTwoCells')).toBe(93);
  });
});
