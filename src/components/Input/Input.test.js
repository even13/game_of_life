import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Input from './Input';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Input />', () => {
  let wrapper;
  let inputComponent;


  beforeEach(() => {
    wrapper = setup(Input);
    inputComponent = findByTestAttr(wrapper, 'component-input');
  });

  it('renders without error', () => {
    expect(inputComponent).toHaveLength(1);
  });
});
