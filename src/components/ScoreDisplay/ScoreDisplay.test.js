
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ScoreDisplay from './ScoreDisplay';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ScoreDisplay />', () => {
  let wrapper;
  let scoreDisplayComponent;
  let scoreDisplay;

  beforeEach(() => {
    wrapper = setup(ScoreDisplay, { playerName: 'Andrew' });
    scoreDisplayComponent = findByTestAttr(wrapper, 'component-score-display');
  });

  it('renders without error', () => {
    expect(scoreDisplayComponent).toHaveLength(1);
  });
});
