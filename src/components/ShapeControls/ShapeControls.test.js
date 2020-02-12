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
  let shapeDisplay;

  let testDisplayCell;
  let testDisplayCell2;
  let testDisplayCell3;

  beforeEach(() => {
    testShapeDisplay = new Grid(9);
    wrapper = setup(ShapeControls, { placeShape: () => true }, { shapeDisplay: testShapeDisplay });
    shapeControlsComponent = findByTestAttr(wrapper, 'component-shape-controls');
  });

  it('renders without error', () => {
    expect(shapeControlsComponent).toHaveLength(1);
  });

  it('renders a shapeDisplay grid', () => {
    shapeDisplay = findByTestAttr(wrapper, 'shape-display');
    expect(shapeDisplay).toHaveLength(1);
  });

  it('displays a spinner when the user clicks on the spinner button', async () => {
    const spinnerButton = findByTestAttr(wrapper, 'create-spinner');
    await spinnerButton.simulate('click');

    setTimeout(() => {
      testDisplayCell = wrapper.state('shapeDisplay').currentGrid[3][4];
      testDisplayCell2 = wrapper.state('shapeDisplay').currentGrid[4][4];
      testDisplayCell3 = wrapper.state('shapeDisplay').currentGrid[5][4];

      expect(testDisplayCell.value).toEqual('*');
      expect(testDisplayCell2.value).toEqual('*');
      expect(testDisplayCell3.value).toEqual('*');
    });
  });
});
