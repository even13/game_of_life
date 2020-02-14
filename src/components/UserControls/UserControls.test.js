import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import UserControls from './UserControls';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<UserControls />', () => {
  let wrapper;
  let userControlsComponent;

  beforeEach(() => {
    wrapper = setup(UserControls);
    userControlsComponent = findByTestAttr(wrapper, 'component-user-controls');
  });

  it('renders without error', () => {
    expect(userControlsComponent).toHaveLength(1);
  });

  it('renders a run button', () => {
    const button = findByTestAttr(wrapper, 'run-button');

    expect(button).toHaveLength(1);
    expect(button.prop('content')).toEqual('Run');
  });

  it('renders a player-toggle button', () => {
    const button = findByTestAttr(wrapper, 'player-toggle');

    expect(button).toHaveLength(1);
  });
});
