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
  });
  
  it('renders a number of flags slider', () => {
    const numberOfFlags = wrapper.find({ id: 'numberOfFlags' });
    
    expect(numberOfFlags).toHaveLength(1);
  });
});
