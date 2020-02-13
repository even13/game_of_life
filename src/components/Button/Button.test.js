import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Button from './Button';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Button />', () => {
  let wrapper;
  let buttonComponent;

  beforeEach(() => {
    wrapper = setup(Button);
    buttonComponent = findByTestAttr(wrapper, 'component-button');
  });

  it('renders without error', () => {
    expect(buttonComponent).toHaveLength(1);
  });

  describe('button props', () => {
    it('renders the text GO when passed it through the `content` prop', () => {
      wrapper = setup(Button, { content: 'GO' });
      const button = findByTestAttr(wrapper, 'component-button');
      expect(button.text()).toEqual('GO');
    });
  });
});
