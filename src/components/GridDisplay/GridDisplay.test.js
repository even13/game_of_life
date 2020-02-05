import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import GridDisplay from './GridDisplay';
import { setup, findByTestAttr } from '../../test-helper';
import Grid from '../../models/grid/grid';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe("<GridDisplay />", () => {
    let wrapper;
    let gridDisplayComponent;
    let testGridModel;

    beforeEach(() => {
        testGridModel = new Grid(30);
        wrapper = setup(GridDisplay, { model: testGridModel });
        gridDisplayComponent = findByTestAttr(wrapper, 'component-grid-display');
    });

    it("renders without error", () => {
        wrapper = setup(GridDisplay, { model: testGridModel });
        expect(gridDisplayComponent).toHaveLength(1);
    });

    describe('rendering cells', () => {
        it('renders a 30 x 30 grid by default', () => {
            wrapper = setup(GridDisplay, { model: testGridModel });
            const RowComponent = findByTestAttr(wrapper, 'component-row');
            expect(RowComponent).toHaveLength(30);
        });

        it("can display 3 rows correctly when passed in 3 rows", () => {
            testGridModel = new Grid(3);
            wrapper = setup(GridDisplay, { model: testGridModel });

            const RowComponent = findByTestAttr(wrapper, 'component-row');
            expect(RowComponent).toHaveLength(3);
        });

        it("creates an array of cells for each row of a 3 x 3 grid", () => {
            let test_grid = [
                ['-', '-', '-'],
                ['-', '*', '-'],
                ['-', '-', '-']
            ]

            testGridModel = new Grid(3);
            testGridModel.place_cells([[1, 1]]);
            wrapper = setup(GridDisplay, { model: testGridModel });

            expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(2);
            expect(wrapper.find({ cells: test_grid[1] })).toHaveLength(1);
        });

        it("creates an array of cells for each row of a 5 x 5 grid", () => {
            let test_grid = [
                ['-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-'],
                ['-', '-', '*', '-', '-'],
                ['-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-'],
            ]

            testGridModel = new Grid(5);
            testGridModel.place_cells([[2, 2]]);
            wrapper = setup(GridDisplay, { model: testGridModel });

            expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(4);
            expect(wrapper.find({ cells: test_grid[2] })).toHaveLength(1);
        })

        it("creates an array of cells for each row of an 8 x 8 grid", () => {
            let test_grid = [
                ['-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '*', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '*', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '*', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-', '-', '-', '-'],
            ]

            testGridModel = new Grid(8);
            testGridModel.place_cells([[3, 1], [6, 3], [6, 5]]);
            wrapper = setup(GridDisplay, { model: testGridModel });
            expect(wrapper.find({ cells: test_grid[0] })).toHaveLength(5);
            expect(wrapper.find({ cells: test_grid[1] })).toHaveLength(1);
            expect(wrapper.find({ cells: test_grid[3] })).toHaveLength(2);
        });
    });
});
