import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GameForm from './GameForm';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GameForm />', () => {
  let wrapper;
  let gameFormComponent;

  beforeEach(() => {
    wrapper = setup(GameForm);
    gameFormComponent = findByTestAttr(wrapper, 'component-game-form');
  });

  it('renders without error', () => {
    expect(gameFormComponent).toHaveLength(1);
  });

  it('renders two player name inputs', () => {
    const playerOneName = wrapper.find({ id: 'playerOneName' });
    const playerTwoName = wrapper.find({ id: 'playerTwoName' });

    expect(playerOneName).toHaveLength(1);
    expect(playerTwoName).toHaveLength(1);
    expect(playerOneName.prop('type')).toEqual('text');
    expect(playerTwoName.prop('type')).toEqual('text');
  });

  it('renders a number of flags slider', () => {
    const numberOfFlags = wrapper.find({ id: 'numberOfFlags' });

    expect(numberOfFlags).toHaveLength(1);
    expect(numberOfFlags.prop('type')).toEqual('range');
  });

  it('renders a grid-size slider', () => {
    const gridSize = wrapper.find({ id: 'gridSize' });

    expect(gridSize).toHaveLength(1);
    expect(gridSize.prop('type')).toEqual('range');
  });

  it('renders a game length slider', () => {
    const gameLength = wrapper.find({ id: 'gameLength' });

    expect(gameLength).toHaveLength(1);
    expect(gameLength.prop('type')).toEqual('range');
  });

  it('renders a game speed slider', () => {
    const gameSpeed = wrapper.find({ id: 'gameSpeed' });

    expect(gameSpeed).toHaveLength(1);
    expect(gameSpeed.prop('type')).toEqual('range');
  });

  it('renders a submit button', () => {
    const submitButton = wrapper.find({ id: 'submit' });

    expect(submitButton).toHaveLength(1);
    expect(submitButton.prop('type')).toEqual('submit');
  });

  describe('gridSize', () => {
    it('has a maximum limit of 70 x 70', () => {
      expect(wrapper.state('gameForm').gridSize.validation.max).toEqual('70');
    });

    it('has a minimum limit of 10 x 10', () => {
      expect(wrapper.state('gameForm').gridSize.validation.min).toEqual('10');
    });
  });

  describe('numberOfFlags', () => {
    it('has a maximum limit of 24', () => {
      expect(wrapper.state('gameForm').numberOfFlags.validation.max).toEqual('24');
    });

    it('has a minimum limit of 4', () => {
      expect(wrapper.state('gameForm').numberOfFlags.validation.min).toEqual('4');
    });
  });

  describe('gameLength', () => {
    it('has a maximum limit of 10,000', () => {
      expect(wrapper.state('gameForm').gameLength.validation.max).toEqual('10000');
    });

    it('has a minimum limit of 100', () => {
      expect(wrapper.state('gameForm').gameLength.validation.min).toEqual('100');
    });
  });
});
