import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import FormPage from './FormPage';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<FormPage />', () => {
  let wrapper;
  let formPageComponent;

  beforeEach(() => {
    wrapper = setup(FormPage);
    formPageComponent = findByTestAttr(wrapper, 'component-form-page');
  });

  it('renders without error', () => {
    expect(formPageComponent).toHaveLength(1);
  });
});
