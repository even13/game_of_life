import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GridDisplay from './GridDisplay';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<GridDisplay />', () => {
  let wrapper;
  let gridDisplayComponent;
  let testGridModel;
  let empty;
  let one;


  beforeEach(() => {
    testGridModel = new Grid(30);
    wrapper = setup(GridDisplay, { model: testGridModel });
    gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
  });

  it('renders without error', () => {
    wrapper = setup(GridDisplay, { model: testGridModel });
    expect(gridDisplayComponent).toHaveLength(1);
  });

  describe('rendering cells', () => {
    it('renders a 30 x 30 grid by default', () => {
      wrapper = setup(GridDisplay, { model: testGridModel });
      const RowComponent = findByTestAttr(wrapper, 'component-row');
      expect(RowComponent).toHaveLength(30);
    });

    it('can display 3 rows correctly when passed in 3 rows', () => {
      testGridModel = new Grid(3);
      wrapper = setup(GridDisplay, { model: testGridModel });

      const RowComponent = findByTestAttr(wrapper, 'component-row');
      expect(RowComponent).toHaveLength(3);
    });

    it('creates an array of cells for each row of a 3 x 3 grid', () => {
      const testGrid = [
        [empty, empty, empty],
        [empty, one, empty],
        [empty, empty, empty],
      ];

      testGridModel = new Grid(3);
      testGridModel.placeCells([[1, 1]]);
      wrapper = setup(GridDisplay, { model: testGridModel });

      expect(wrapper.find({ cells: testGrid[0] })).toHaveLength(2);
      expect(wrapper.find({ cells: testGrid[1] })).toHaveLength(1);
    });

    it('creates an array of cells for each row of a 5 x 5 grid', () => {
      const testGrid = [
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, one, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
      ];

      testGridModel = new Grid(5);
      testGridModel.placeCells([[2, 2]]);
      wrapper = setup(GridDisplay, { model: testGridModel });


      expect(wrapper.find({ cells: testGrid[0] })).toHaveLength(4);
      expect(wrapper.find({ cells: testGrid[2] })).toHaveLength(1);
    });

    it('creates an array of cells for each row of an 8 x 8 grid', () => {
      const testGrid = [
        [empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, one, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, one, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, one, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty, empty, empty, empty],
      ];

      testGridModel = new Grid(8);
      testGridModel.placeCells([[3, 1], [6, 3], [6, 5]]);
      wrapper = setup(GridDisplay, { model: testGridModel });
      expect(wrapper.find({ cells: testGrid[0] })).toHaveLength(5);
      expect(wrapper.find({ cells: testGrid[1] })).toHaveLength(1);
      expect(wrapper.find({ cells: testGrid[3] })).toHaveLength(2);
    });
  });
});
