class Grid {

    constructor(initialCells = []) {
        this.initialCells = initialCells
    }
    render = () => {
        const newGrid = []

        let newRow;

        for (let y = 0; y < 3; y++) {
            newRow = []
            for (let x = 0; x < 3; x++) {
                if (JSON.stringify(this.initialCells).includes(JSON.stringify([x,y]))) {
                    newRow.push('*')
                } else {
                    newRow.push('-')
                }
            }
            newGrid.push(newRow)
        }
        return newGrid
    }

    place_cells = (cellArray) => {
        this.initialCells = cellArray
    }
}

export default Grid;
