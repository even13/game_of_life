import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import UserControls from './UserControls';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<UserControls />', () => {
  let wrapper;
  let userControlsComponent;

  beforeEach(() => {
    wrapper = setup(UserControls, { onReplay: jest.fn(), model: { randomFlags: jest.fn() }, onRunGame: jest.fn() });
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
    expect(button.text()).toEqual('Click To Toggle Player');
  });

  describe('handleClick', () => {
    it('calls onReplay when isRunning is true', () => {
      const instance = wrapper.instance();
      instance.handleClick();

      expect(wrapper.state().isRunning).toEqual(true);
      expect(instance.props.onReplay).toHaveBeenCalled();
    });

    it('calls model.randomFlags and onRunGAme when isRunning is false', () => {
      const instance = wrapper.instance();
      instance.handleClick();
      instance.handleClick();

      expect(wrapper.state().isRunning).toEqual(false);
      expect(instance.props.model.randomFlags).toHaveBeenCalled();
      expect(instance.props.onRunGame).toHaveBeenCalled();
    });
  });
});
