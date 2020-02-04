class Grid {

    constructor(initialCells = []) {
        this.initialCells = initialCells
    }
    render = () => {
        return this.initialCells.length ? 
        [
            ['*', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ] :
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
    }

    place_cells = (cellArray) => {
        this.initialCells = cellArray
    }
}

export default Grid;
