import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ColorPicker from './ColorPicker';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ColorPicker />', () => {
  let wrapper;
  let colorPickerComponent;

  beforeEach(() => {
    wrapper = setup(ColorPicker);
    colorPickerComponent = findByTestAttr(wrapper, 'component-color-picker');
  });

  it('renders without error', () => {
    expect(colorPickerComponent).toHaveLength(1);
  });
});
