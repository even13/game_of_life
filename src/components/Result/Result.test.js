import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Result from './Result';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Result />', () => {
  let wrapper;
  let resultComponent;
  const defaultProps = {
    isWinner: () => true,
    colors: { playerOneColor: {}, playerTwoColor: {} },
  };

  beforeEach(() => {
    wrapper = setup(Result, defaultProps);
    resultComponent = findByTestAttr(wrapper, 'component-result');
  });

  it('renders without error', () => {
    expect(resultComponent).toHaveLength(1);
  });
});
