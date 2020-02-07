class Grid {
  constructor(gridSize = 30, currentLiveCells = []) {
    this.currentLiveCells = currentLiveCells;
    this.isEvolved = false;
    this.currentGrid = Array(gridSize).fill(Array(gridSize).fill({ value: '-', player: null }));
    this.gridSize = gridSize;
  }

    render = () => this.currentGrid


    placeCells = (cellArray, player = 1) => {
      this.currentLiveCells = this.currentLiveCells.concat(cellArray);
      this.updateGrid(cellArray, player);
    }

    removeCells = (cellArray, player = 1) => {
      const currentLiveCells = [...this.currentLiveCells];
      const updatedCurrentLiveCells = currentLiveCells.filter((cell) => !JSON.stringify(cellArray).includes(JSON.stringify(cell)));
      this.currentLiveCells = updatedCurrentLiveCells;
      this.updateGrid([], player);
    }

    updateGrid = (cellArray, player) => {
      const newGrid = [];
      let newRow;

      for (let y = 0; y < this.gridSize; y++) {
        newRow = [];
        // console.log('cel array', cellArray, 'init cells', this.currentLiveCells)
        for (let x = 0; x < this.gridSize; x++) {
          const playerAttr = this.currentGrid[y][x].player;
          // console.log(`${playerAttr}, ${[x, y]}`)

          if (JSON.stringify(cellArray).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: '*', player });
          } else if (JSON.stringify(this.currentLiveCells).includes(JSON.stringify([x, y]))) {
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
          let player1CellCount = 0;
          let player2CellCount = 0;

          for (let i = 0; i < this.neighbours(y, x).length; i++) {
            if (this.neighbours(y, x)[i].value === '*') liveCellCount++;
            if (this.neighbours(y, x)[i].player === 1) player1CellCount++;
            if (this.neighbours(y, x)[i].player === 2) player2CellCount++;
          }
          let nextCellOwner = player1CellCount > player2CellCount ? 1 : 
            player2CellCount > player1CellCount ? 2 : null

          const newElt = this.newState(elt, liveCellCount, nextCellOwner);
          if (newElt.value === '*') liveCells.push([x, y]);
          newRow.push(newElt);
        });
        newGrid.push(newRow);
      });
      this.currentLiveCells = liveCells;
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

    newState = (state, liveCellCount, nextCellOwner) => {
      if ([2, 3].includes(liveCellCount) && state.value === '*') {
        return { value: '*', player: state.player };
      } if (liveCellCount === 3 && state.value === '-') {
        return { value: '*', player: nextCellOwner};
      }
      return { value: '-', player: null };
    }

    getLiveCellCoordinates = () => this.currentLiveCells
}

export default Grid;
