class Grid {
  constructor(gridSize = 30, initialCells = []) {
    this.initialCells = initialCells;
    this.isEvolved = false;
    this.currentGrid = Array(gridSize).fill(Array(gridSize).fill({ value: '-', player: null }));
    this.gridSize = gridSize;
  }

    render = () => this.currentGrid


    placeCells = (cellArray, player = 1) => {
      this.initialCells = this.initialCells.concat(cellArray);
      this.updateGrid(cellArray, player);
    }

    removeCells = (cellArray, player = 1) => {
      const initialCells = [...this.initialCells];
      const updatedInitialCells = initialCells.filter((cell) => !JSON.stringify(cellArray).includes(JSON.stringify(cell)));
      this.initialCells = updatedInitialCells;
      this.updateGrid([], player);
    }

    updateGrid = (cellArray, player) => {
      const newGrid = [];
      let newRow;

      for (let y = 0; y < this.gridSize; y++) {
        newRow = [];
        // console.log('cel array', cellArray, 'init cells', this.initialCells)
        for (let x = 0; x < this.gridSize; x++) {
          const playerAttr = this.currentGrid[y][x].player;
          // console.log(`${playerAttr}, ${[x, y]}`)

          if (JSON.stringify(cellArray).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: '*', player });
          } else if (JSON.stringify(this.initialCells).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: '*', player: playerAttr });
          } else {
            newRow.push({ value: '-', player: null });
          }
        }
        newGrid.push(newRow);
      }
      this.currentGrid = newGrid;
    }

    evolve = () => {
      const newGrid = [];
      const liveCells = [];

      this.currentGrid.forEach((row, y) => {
        const newRow = [];
        row.forEach((elt, x) => {
          let liveCellCount = 0;
          for (let i = 0; i < this.neighbours(y, x).length; i++) {
            if (this.neighbours(y, x)[i].value === '*') liveCellCount++;
          }
          const newElt = this.newState(elt, liveCellCount);
          if (newElt.value === '*') liveCells.push([x, y]);
          newRow.push(newElt);
        });
        newGrid.push(newRow);
      });
      this.initialCells = liveCells;
      this.currentGrid = newGrid;
    }

    neighbours = (x, y) => {
      const size = this.currentGrid.length;

      return [
        this.currentGrid[(size + (x - 1)) % size][(size + (y - 1)) % size],
        this.currentGrid[(size + x) % size][(size + (y - 1)) % size],
        this.currentGrid[(size + (x + 1)) % size][(size + (y - 1)) % size],
        this.currentGrid[(size + (x - 1)) % size][(size + y) % size],
        this.currentGrid[(size + (x + 1)) % size][(size + y) % size],
        this.currentGrid[(size + (x - 1)) % size][(size + (y + 1)) % size],
        this.currentGrid[(size + x) % size][(size + (y + 1)) % size],
        this.currentGrid[(size + (x + 1)) % size][(size + (y + 1)) % size],
      ];
    }

    newState = (state, liveCellCount) => {
      if ([2, 3].includes(liveCellCount) && state.value === '*') {
        return { value: '*', player: state.player };
      } if (liveCellCount === 3 && state.value === '-') {
        return { value: '*', player: state.player || 1 };
      }
      return { value: '-', player: null };
    }

    getLiveCellCoordinates = () => this.initialCells
}

export default Grid;
