import Grid from './grid';

describe('Grid', () => {
    let test_grid;
    let test_grid_instance;

    beforeEach(() => {
        test_grid_instance = new Grid(3);
    })

    it('initially shows an empty 30 x 30 grid', () => {
        test_grid_instance = new Grid();

        expect(test_grid_instance.render().length).toEqual(30)
    })

    describe('#gridSize', () => {
        it('shows a grid of dimensions #gridSize x #gridSize', () => {
            let thirtyGrid = new Grid(35)
            expect(thirtyGrid.render().length).toBe(35)
        })
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

    it('it can take a cell at [0, 1], [1,1], [2,1]', () => {
        test_grid = [
            ['-', '-', '-'],
            ['*', '*', '*'],
            ['-', '-', '-']
        ]

        test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    describe('3 x 3 stripe', () => {
        it('resurrects all cells after one evolution', () => {
            let first_grid = [
                ['-', '-', '-'],
                ['*', '*', '*'],
                ['-', '-', '-']
            ]
      
            let second_grid = [
                ['*', '*', '*'],
                ['*', '*', '*'],
                ['*', '*', '*']
            ]
            test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
            console.log(test_grid_instance.render())
            test_grid_instance.evolve()
            console.log(test_grid_instance.render())
            expect(test_grid_instance.render()).toEqual(second_grid)
        })
      
        it('kills all cells after two evolutions', () => {
            let first_grid = [
                ['-', '-', '-'],
                ['-', '-', '-'],
                ['-', '-', '-']
            ]
            test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
            test_grid_instance.evolve()
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(first_grid)
        })
    })

    describe('5 x 5 spinner', () => {
        it('rotates the strip by 90 deg after 1 evolution', () => {
            test_grid_instance = new Grid(5)
            test_grid = [
                ['-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-'],
                ['-', '*', '*', '*', '-'],
                ['-', '-', '-', '-', '-'],
                ['-', '-', '-', '-', '-'],
            ]

            test_grid_instance.place_cells([[2, 1], [2, 2], [2, 3]])
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(test_grid)
        })

        it('rotates the strip by 180 deg after 2 evolutions', () => {
            test_grid_instance = new Grid(5)
            test_grid = [
                ['-', '-', '-', '-', '-'],
                ['-', '-', '*', '-', '-'],
                ['-', '-', '*', '-', '-'],
                ['-', '-', '*', '-', '-'],
                ['-', '-', '-', '-', '-'],
            ]

            test_grid_instance.place_cells([[2, 1], [2, 2], [2, 3]])
            test_grid_instance.evolve()
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(test_grid)
        })
    
    })
})
