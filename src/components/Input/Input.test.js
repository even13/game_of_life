import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Input from './Input';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<Input />', () => {
  let wrapper;
  let inputComponent;
  const rangeInputDefaultProps = {
    type: 'range',
    validation: { max: '100', min: '1' },
    config: {
      step: '10',
    },
  };

  const textInputDefaultProps = {
    type: 'text',
    validation: { max: '100', min: '1' },
    config: {
      step: null,
      placeholder: 'an input',
    },
  };

  beforeEach(() => {
    wrapper = setup(Input, textInputDefaultProps);
    inputComponent = findByTestAttr(wrapper, 'component-input');
  });

  it('renders without error', () => {
    expect(inputComponent).toHaveLength(1);
  });

  it('renders a text input if its type prop === input', () => {
    wrapper = setup(Input, textInputDefaultProps);
    const input = findByTestAttr(wrapper, 'input');
    expect(input.prop('type')).toEqual('text');
  });

  it('renders a range input if its type prop === range', () => {
    wrapper = setup(Input, rangeInputDefaultProps);
    const input = findByTestAttr(wrapper, 'input');
    expect(input.prop('type')).toEqual('range');
  });
});
