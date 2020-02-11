import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import EvolutionControls from './EvolutionControls';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<EvolutionControls />', () => {
  let wrapper;
  let evolutionControlsComponent;
  const testGridModel = new Grid();

  beforeEach(() => {
    wrapper = setup(EvolutionControls, { rateValue: 50, countValue: 100 }, { model: testGridModel });
    evolutionControlsComponent = findByTestAttr(wrapper, 'component-evolution-controls');
  });

  it('renders without error', () => {
    expect(evolutionControlsComponent).toHaveLength(1);
  });

  it('renders an evolution rate input box with default value of 50ms', () => {
    const updateRateBox = findByTestAttr(wrapper, 'evolution-rate');

    expect(updateRateBox).toHaveLength(1);
    expect(updateRateBox.props().value).toEqual(50);
  });

  it('renders an Run Time input box with default value of 100 iterations', () => {
    const iterationsBox = findByTestAttr(wrapper, 'iterations');

    expect(iterationsBox).toHaveLength(1);
    expect(iterationsBox.props().value).toEqual(100);
  });
});
