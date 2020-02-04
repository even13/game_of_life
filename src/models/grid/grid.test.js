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
})