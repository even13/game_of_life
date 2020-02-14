import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GamePage from './GamePage';
import { setup, findByTestAttr, defaultGameSettingsProps } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GamePage />', () => {
  let wrapper;
  let GamePageComponent;
  const testGridModel = new Grid();

  const defaultProps = {
    onReturn: jest.fn(),
    currentSettings: defaultGameSettingsProps.gameForm,
    currentColors: '',
  };

  beforeEach(() => {
    wrapper = setup(GamePage, defaultProps, { model: testGridModel });
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

  it('can reset the player scores', () => {
    wrapper.instance().updateScoreDisplays([3, 22, 7, 2, 20, 10]);
    expect(wrapper.state('playerOneFlags')).toBe(3);
    expect(wrapper.state('playerOneScore')).toBe(22);
    expect(wrapper.state('playerOneCellCount')).toBe(7);
    expect(wrapper.state('playerTwoFlags')).toBe(2);
    expect(wrapper.state('playerTwoScore')).toBe(20);
    expect(wrapper.state('playerTwoCellCount')).toBe(10);
  });

  it('can update the player scores', () => {
    wrapper.instance().updateScoreDisplays([3, 22, 7, 2, 20, 10]);
    expect(wrapper.state('playerOneFlags')).toBe(3);
    expect(wrapper.state('playerOneScore')).toBe(22);
    expect(wrapper.state('playerOneCellCount')).toBe(7);
    expect(wrapper.state('playerTwoFlags')).toBe(2);
    expect(wrapper.state('playerTwoScore')).toBe(20);
    expect(wrapper.state('playerTwoCellCount')).toBe(10);
  });

  it('can reset the player cells after decrement', () => {
    wrapper.instance().decrement(6, 1);
    wrapper.instance().decrement(7, 2);
    expect(wrapper.state('playerOneCells')).toBe(94);
    expect(wrapper.state('playerTwoCells')).toBe(93);

    wrapper.instance().resetCells();
    expect(wrapper.state('playerOneCells')).toBe(100);
    expect(wrapper.state('playerTwoCells')).toBe(100);
  });
});
