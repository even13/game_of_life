import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShapeControls from './ShapeControls';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ShapeControls />', () => {
  let wrapper;
  let shapeControlsComponent;
  let testShapeDisplay;

  beforeEach(() => {
    testShapeDisplay = new Grid(9);
    wrapper = setup(ShapeControls, {}, { shapeDisplay: testShapeDisplay });
    shapeControlsComponent = findByTestAttr(wrapper, 'component-shape-controls');
  });

  it('renders without error', () => {
    expect(shapeControlsComponent).toHaveLength(1);
  });

  it('renders a shapeDisplay grid', () => {
    const shapeDisplay = findByTestAttr(wrapper, 'shape-display');
    expect(shapeDisplay).toHaveLength(1);
  });
});
