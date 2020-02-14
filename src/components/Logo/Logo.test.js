import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Logo from './Logo';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Logo />', () => {
  let wrapper;
  let logoComponent;

  beforeEach(() => {
    wrapper = setup(Logo);
    logoComponent = findByTestAttr(wrapper, 'component-logo');
  });

  it('renders without error', () => {
    expect(logoComponent).toHaveLength(1);
  });
});
