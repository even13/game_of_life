import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShapeControls from './ShapeControls';
import { setup, findByTestAttr } from '../../test-helper';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ShapeControls />', () => {
  let wrapper;
  let shapeControlsComponent;

  beforeEach(() => {
    wrapper = setup(ShapeControls);
    shapeControlsComponent = findByTestAttr(wrapper, 'component-shape-controls');
  });

  it('renders without error', () => {
    expect(shapeControlsComponent).toHaveLength(1);
  });
});
