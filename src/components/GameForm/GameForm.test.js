import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GameForm from './GameForm';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GameForm />', () => {
  let wrapper;
  let gameFormComponent;

  beforeEach(() => {
    wrapper = setup(GameForm, { onCommitSettings: jest.fn(), onPlayGame: jest.fn() });
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
  });


  describe('<ColorPicker /> components', () => {
    let playerOneColor;
    let playerTwoColor;

    beforeEach(() => {
      wrapper = setup(GameForm, { onCommitSettings: jest.fn(), onPlayGame: jest.fn() });
      gameFormComponent = findByTestAttr(wrapper, 'component-game-form');
      playerOneColor = wrapper.find({ id: 'playerOneColor' });
      playerTwoColor = wrapper.find({ id: 'playerTwoColor' });
    });

    it('renders a two color pickers', () => {
      expect(playerOneColor).toHaveLength(1);
      expect(playerTwoColor).toHaveLength(1);
    });

    test('player one has a default of #E563ED', () => {
      expect(wrapper.state('colorPickers').playerOneColor.value).toEqual('#E563ED');
    });

    test('player two has a default of #27cac9', () => {
      expect(wrapper.state('colorPickers').playerTwoColor.value).toEqual('#27cac9');
    });
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

    it('has a step configuration of 4 flag intervals', () => {
      expect(wrapper.state('gameForm').numberOfFlags.config.step).toEqual('4');
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

  describe('gameSpeed', () => {
    it('has a maximum limit of 1000', () => {
      expect(wrapper.state('gameForm').gameSpeed.validation.max).toEqual('1000');
    });

    it('has a minimum limit of 2', () => {
      expect(wrapper.state('gameForm').gameSpeed.validation.min).toEqual('2');
    });
  });

  it('handles form changes', async () => {
    const instance = wrapper.instance();
    const playerOneNameField = wrapper.find({ id: 'playerOneName' });

    jest.spyOn(instance, 'handleFormChange');
    await playerOneNameField.simulate('change', { target: { value: 'Raluca' }, persist: jest.fn() });
    setTimeout(() => { expect(instance.handleFormChange).toHaveBeenCalled(); });
  });

  it('handles color changes', async () => {
    const instance = wrapper.instance();
    const playerOneNameField = wrapper.find({ id: 'playerOneColor' });

    jest.spyOn(instance, 'handleColorChange');
    await playerOneNameField.simulate('click', { persist: jest.fn() });
    setTimeout(() => { expect(instance.handleColorChange).toHaveBeenCalled(); });
  });

  describe('handleClick', () => {
    it('should call props functions when called', () => {
      const instance = wrapper.instance();

      instance.handleClick();
      expect(instance.props.onCommitSettings).toHaveBeenCalled();
      expect(instance.props.onPlayGame).toHaveBeenCalled();
    });
  });
});
