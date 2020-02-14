import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import { setup, findByTestAttr } from './test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<App />', () => {
  let wrapper;
  let appComponent;

  beforeEach(() => {
    wrapper = setup(App);
    appComponent = findByTestAttr(wrapper, 'component-app');
  });

  it('renders without error', () => {
    expect(appComponent).toHaveLength(1);
  });

  describe('toggleInGame', () => {
    it('should toggle the inGame state from initial value of false to true on being called once', () => {
      wrapper.instance().toggleInGame();
      expect(wrapper.state().inGame).toEqual(true);
    });
  });

  describe('commitSettings', () => {
    it('updates the current settings', () => {
      wrapper.instance().commitSettings({ mock: 'object' }, 'blue, green, black');
      expect(wrapper.state().currentSettings).toEqual({ mock: 'object' });
      expect(wrapper.state().colorPickers).toEqual('blue, green, black');
    });
  });
});
