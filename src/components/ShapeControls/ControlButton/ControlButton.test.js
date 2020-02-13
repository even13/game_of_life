import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ControlButton from './ControlButton';
import { findByTestAttr, setup } from '../../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ControlButton />', () => {
  let wrapper;
  let controlButtonComponent;

  beforeEach(() => {
    wrapper = setup(ControlButton);
    controlButtonComponent = findByTestAttr(wrapper, 'component-control-button');
  });

  it('renders without error', () => {
    expect(controlButtonComponent).toHaveLength(1);
  });
});
