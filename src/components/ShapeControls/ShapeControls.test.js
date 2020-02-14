import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import ShapeControls from './ShapeControls';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<ShapeControls />', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  let shapeControlsComponent;
  let testShapeDisplay;
  let testShapeDisplay2;
  let testShapeDisplay3;
  let shapeDisplay;

  let testDisplayCell;
  let testDisplayCell2;
  let testDisplayCell3;
  let testDisplayCell4;
  let testDisplayCell5;
  let testDisplayCell6;
  let testDisplayCell7;
  let testDisplayCell8;
  let testDisplayCell9;
  let testDisplayCell10;

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

  it('displays a mirrored shape when the clicks the mirror button', async () => {
    testShapeDisplay2 = new Grid(9);
    wrapper2 = setup(ShapeControls, {
      placeShape: () => true, orientation: 0, mirrorShape: true, onMirrorShape: jest.fn(),
    }, { shapeDisplay: testShapeDisplay2 });

    // console.log(wrapper2.instance());

    const spaceShipButton = findByTestAttr(wrapper2, 'create-spaceship');
    await spaceShipButton.simulate('click');

    await wrapper2.instance().handleMirror();
    await wrapper2.update();


    // const mirrorButton = findByTestAttr(wrapper, 'mirror-button');
    // await mirrorButton.simulate('click');

    // await wrapper2.update();

    // console.log(wrapper2.state().shapeDisplay.currentGrid);

    setTimeout(() => {
      testDisplayCell = wrapper2.state('shapeDisplay').currentGrid[3][4];
      testDisplayCell2 = wrapper2.state('shapeDisplay').currentGrid[4][3];
      testDisplayCell3 = wrapper2.state('shapeDisplay').currentGrid[5][3];
      testDisplayCell4 = wrapper2.state('shapeDisplay').currentGrid[5][4];
      testDisplayCell5 = wrapper2.state('shapeDisplay').currentGrid[5][5];

      expect(testDisplayCell.value).toEqual('*');
      expect(testDisplayCell2.value).toEqual('*');
      expect(testDisplayCell3.value).toEqual('*');
      expect(testDisplayCell4.value).toEqual('*');
      expect(testDisplayCell5.value).toEqual('*');
    });
  });

  it('displays a rotated shape when the rotate button is clicked', async () => {
    testShapeDisplay3 = new Grid(9);
    wrapper3 = setup(ShapeControls, {
      placeShape: () => true, orientation: 0, mirrorShape: false, rotateShape: jest.fn(),
    }, { shapeDisplay: testShapeDisplay3 });

    // console.log(wrapper3.instance());

    const spaceShipButton = findByTestAttr(wrapper3, 'create-spaceship');
    await spaceShipButton.simulate('click');

    await wrapper3.instance().handleRotation();
    await wrapper3.update();

    console.log(wrapper3.state().shapeDisplay.currentGrid);

    setTimeout(() => {
      testDisplayCell6 = wrapper3.state('shapeDisplay').currentGrid[3][3];
      testDisplayCell7 = wrapper3.state('shapeDisplay').currentGrid[4][3];
      testDisplayCell8 = wrapper3.state('shapeDisplay').currentGrid[5][3];
      testDisplayCell9 = wrapper3.state('shapeDisplay').currentGrid[5][4];
      testDisplayCell10 = wrapper3.state('shapeDisplay').currentGrid[4][5];

      expect(testDisplayCell6.value).toEqual('*');
      expect(testDisplayCell7.value).toEqual('*');
      expect(testDisplayCell8.value).toEqual('*');
      expect(testDisplayCell9.value).toEqual('*');
      expect(testDisplayCell10.value).toEqual('*');
    });
  });
});
