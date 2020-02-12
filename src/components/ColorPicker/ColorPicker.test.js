import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ColorPicker from './ColorPicker';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ColorPicker />', () => {
  let wrapper;
  let colorPickerComponent;
  let colorDisplay;

  beforeEach(() => {
    wrapper = setup(ColorPicker, { onClick: jest.fn() });
    colorPickerComponent = findByTestAttr(wrapper, 'component-color-picker');
  });

  it('renders without error', () => {
    expect(colorPickerComponent).toHaveLength(1);
  });

  it('renders a color display', () => {
    colorDisplay = findByTestAttr(wrapper, 'color-display');
    expect(colorDisplay).toHaveLength(1);
  });

  it('changes color when clicked', async () => {
    const instance = wrapper.instance();
    colorDisplay = findByTestAttr(wrapper, 'color-display');

    jest.spyOn(instance, 'handleClick');
    await colorDisplay.simulate('click', { preventDefault: jest.fn() });
    setTimeout(() => { expect(instance.handleClick).toHaveBeenCalled(); });
  });
});
