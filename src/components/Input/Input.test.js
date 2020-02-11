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

  it('renders a text input if its type prop === input', () => {
    wrapper = setup(Input, { type: 'text' });
    const input = findByTestAttr(wrapper, 'input');
    expect(input.prop('type')).toEqual('text');
  });

  it('renders a range input if its type prop === range', () => {
    wrapper = setup(Input, { type: 'range', config: { step: '12' } });
    const input = findByTestAttr(wrapper, 'input');
    expect(input.prop('type')).toEqual('range');
  });
});
