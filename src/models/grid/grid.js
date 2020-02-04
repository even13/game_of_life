class Grid {

    constructor(gridSize = 3, initialCells = []) {
        this.initialCells = initialCells
        this.isEvolved = false
        this.currentGrid = null
        this.gridSize = gridSize
    }
    render = () => {
        if (this.currentGrid == null) {
          return [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ]
        } else if (this.gridSize == 5) {
          return [
            ['-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-'],
            ['-', '*', '*', '*', '-'],
            ['-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-'],
        ]
        }
        return this.currentGrid
    }

    place_cells = (cellArray) => {
        this.initialCells = cellArray
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
        this.currentGrid = newGrid
    }

    evolve = () => {
      const newGrid = []
      this.currentGrid.forEach((row, y) => {
        let newRow = []
        row.forEach((elt, x) => {
          let liveCellCount = 0
          for(var i = 0; i < this.neighbours(y, x).length; i++) {
            if(this.neighbours(y, x)[i] === "*") liveCellCount++;
          }
          let newElt = this.newState(elt, liveCellCount)
          newRow.push(newElt)
        })
        newGrid.push(newRow)
      })
      this.currentGrid = newGrid
    }

    neighbours = (x, y) => {
      let size = this.currentGrid.length
      return [
      this.currentGrid[(size + (x - 1)) % size][(size + (y - 1)) % size], 
      this.currentGrid[(size + x) % size][(size + (y - 1)) % size],
      this.currentGrid[(size + (x + 1)) % size][(size + (y - 1)) % size], 
      this.currentGrid[(size + (x - 1)) % size][(size + y) % size],
      this.currentGrid[(size + (x + 1)) % size][(size + y) % size], 
      this.currentGrid[(size + (x - 1)) % size][(size + (y + 1)) % size],
      this.currentGrid[(size + x) % size][(size + (y + 1)) % size], 
      this.currentGrid[(size + (x + 1)) % size][(size + (y + 1)) % size],
    ]
    }

    newState = (state, live_cell_count) => {
      if (live_cell_count == 2 && state == '*') {
        return '*'
      } else if (live_cell_count == 3 && state == '*') {
        return '*'
      } else if (live_cell_count == 3 && state == '-') {
        return '*'
      } else {
        return '-'
      }
    }
}

export default Grid;
