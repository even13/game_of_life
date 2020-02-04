class Grid {

    constructor(initialCells = []) {
        this.initialCells = initialCells
        this.isEvolved = false
        this.currentGrid = []
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
        this.currentGrid = newGrid
        return newGrid
    }

    place_cells = (cellArray) => {
        this.initialCells = cellArray
    }

    evolve = () => {
      const newGrid = []
      this.render().forEach((row, y) => {
        let newRow = []
        row.forEach((elt, x) => {
          let liveCellCount = 0
          for(var i = 0; i < this.neighbours(y, x).length; i++) {
            if(i === "*") liveCellCount++;
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
      this.currentGrid[(size - (x - 1)) % size][(size - (y - 1)) % size], this.currentGrid[(size - x) % size][(size - (y - 1)) % size],
      this.currentGrid[(size - (x + 1)) % size][(size - (y - 1)) % size], this.currentGrid[(size - (x - 1)) % size][(size - y) % size],
      this.currentGrid[(size - (x + 1)) % size][(size - y) % size], this.currentGrid[(size - (x - 1)) % size][(size - (y + 1)) % size],
      this.currentGrid[(size - x) % size][(size - (y + 1)) % size], this.currentGrid[(size - (x + 1)) % size][(size - (y + 1)) % size],
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
