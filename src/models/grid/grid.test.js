import Grid from './grid';

describe('Grid', () => {
    let test_grid;
    let test_grid_instance;
    
    beforeEach(() => {
        test_grid_instance = new Grid();
    })

    it('initially shows an empty grid', () => {
        test_grid = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]

        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('can take a cell at 0,0', () => {
        test_grid = [
            ['*', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]

        test_grid_instance.place_cells([[0,0]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('can take a cell at 1,2', () => {
        test_grid = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '*', '-']
        ]

        test_grid_instance.place_cells([[1,2]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('can take a cell at 2,1 and 2,2', () => {
        test_grid = [
            ['-', '-', '-'],
            ['-', '-', '*'],
            ['-', '-', '*']
        ]

        test_grid_instance.place_cells([[2,1], [2,2]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })
})