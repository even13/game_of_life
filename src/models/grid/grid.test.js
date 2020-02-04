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

    describe('Spinner', () => {
      it('rotates a line of live cells by 90 degrees', () => {
        let first_grid = [
            ['-', '-', '-'],
            ['*', '*', '*'],
            ['-', '-', '-']
        ]

        let second_grid = [
            ['-', '*', '-'],
            ['-', '*', '-'],
            ['-', '*', '-']
        ]
        test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
        console.log(test_grid_instance.render())
        test_grid_instance.evolve()
        console.log(test_grid_instance.render())
        expect(test_grid_instance.render()).toEqual(second_grid)
      })

      it('rotates a line of live cells by 180 degrees when evolve is called twice', () => {
        let first_grid = [
            ['-', '-', '-'],
            ['*', '*', '*'],
            ['-', '-', '-']
        ]
        test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
        test_grid_instance.evolve()
        test_grid_instance.evolve()
        expect(test_grid_instance.render()).toEqual(first_grid)
      })
    })

})
