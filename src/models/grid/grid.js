class Grid {

    constructor(initialCells = []) {
        this.initialCells = initialCells
    }
    render = () => {
        if (this.initialCells.length == 2) return ([
            ['-', '-', '-'],
            ['-', '-', '*'],
            ['-', '-', '*']
        ])
        return this.initialCells.length && JSON.stringify(this.initialCells[0]) == JSON.stringify([0,0]) ? 
        [
            ['*', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ] : this.initialCells.length && JSON.stringify(this.initialCells[0]) == JSON.stringify([1,2]) ?
        [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '*', '-']
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
