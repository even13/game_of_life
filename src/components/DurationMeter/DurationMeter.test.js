import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import DurationMeter from './DurationMeter';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<DurationMeter />', () => {
  let wrapper;
  let durationMeterComponent;

  beforeEach(() => {
    wrapper = setup(DurationMeter);
    durationMeterComponent = findByTestAttr(wrapper, 'component-duration-meter');
  });

  it('renders without error', () => {
    expect(durationMeterComponent).toHaveLength(1);
  });
});
