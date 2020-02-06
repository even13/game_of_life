import Grid from './grid';

describe('Grid', () => {
    let test_grid;
    let test_grid_instance;
    let empty;
    let one;
    let two;

    beforeEach(() => {
        test_grid_instance = new Grid(3);
        empty = {value: '-', player: null}
        one = {value: '*', player: 1}
        two = {value: '*', player: 2}
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
            [one, empty, empty],
            [empty, empty, empty],
            [empty, empty, empty]
        ]

        test_grid_instance.place_cells([[0,0]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('can take a cell at 1,2', () => {
        test_grid = [
            [empty, empty, empty],
            [empty, empty, empty],
            [empty, one, empty]
        ]

        test_grid_instance.place_cells([[1,2]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('can take a cell at 2,1 and 2,2', () => {
        test_grid = [
            [empty, empty, empty],
            [empty, empty, one],
            [empty, empty, one]
        ]

        test_grid_instance.place_cells([[2,1], [2,2]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    it('it can take a cell at [0, 1], [1,1], [2,1]', () => {
        test_grid = [
            [empty, empty, empty],
            [one, one, one],
            [empty, empty, empty]
        ]

        test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
        expect(test_grid_instance.render()).toEqual(test_grid)
    })

    describe('3 x 3 stripe', () => {
        it('resurrects all cells after one evolution', () => {      
            let test_grid = [
                [one, one, one],
                [one, one, one],
                [one, one, one]
            ]
            test_grid_instance.place_cells([[0, 1], [1,1], [2,1]])
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(test_grid)
        })
      
        it('kills all cells after two evolutions', () => {
            let first_grid = [
                [empty, empty, empty],
                [empty, empty, empty],
                [empty, empty, empty]
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
                [empty, empty, empty, empty, empty],
                [empty, empty, empty, empty, empty],
                [empty, one, one, one, empty],
                [empty, empty, empty, empty, empty],
                [empty, empty, empty, empty, empty],
            ]

            test_grid_instance.place_cells([[2, 1], [2, 2], [2, 3]])
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(test_grid)
        })

        it('rotates the strip by 180 deg after 2 evolutions', () => {
            test_grid_instance = new Grid(5)
            test_grid = [
                [empty, empty, empty, empty, empty],
                [empty, empty, one, empty, empty],
                [empty, empty, one, empty, empty],
                [empty, empty, one, empty, empty],
                [empty, empty, empty, empty, empty],
            ]

            test_grid_instance.place_cells([[2, 1], [2, 2], [2, 3]])
            test_grid_instance.evolve()
            test_grid_instance.evolve()
            expect(test_grid_instance.render()).toEqual(test_grid)
        })

        describe('removing cells', () => {
            it("remove live cells placed by the user", () => {
                test_grid_instance.place_cells([[1, 1]])
                test_grid_instance.removeCells([[1, 1]])
                test_grid = [
                    [empty, empty, empty],
                    [empty, empty, empty],
                    [empty, empty, empty]
                ]
                expect(test_grid_instance.render()).toEqual(test_grid)
            })

            it("leaves 1 cell when user places 3 and removes 2", () => {
            
                test_grid_instance.place_cells([[1, 1], [1, 2], [2, 1]])
                console.log("before", test_grid_instance.render())
                test_grid_instance.removeCells([[1, 1], [2, 1]])
                test_grid = [
                    [empty, empty, empty],
                    [empty, empty, empty],
                    [empty, one, empty],
                ]
                console.log("after", test_grid_instance.render())
                expect(test_grid_instance.render()).toEqual(test_grid)
            })
        })

        // describe('selecting two players', () => {
        //     it("lets players place 2 types of cells", () => {
        //         test_grid_instance.place_cells([[1, 1]])
        //         test_grid_instance.place_cells([[2, 2]], 2)

        //         test_grid = [
        //             [empty, empty, empty],
        //             [empty, one, empty],
        //             [empty, empty, two],
        //         ]
        //         expect(test_grid_instance.render()).toEqual(test_grid)
        //     })
        // })
    
    })
})
