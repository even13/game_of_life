class Grid {
  constructor(gridSize = 30, currentLiveCells = [], currentPlacedFlags = []) {
    this.currentLiveCells = currentLiveCells;
    this.isEvolved = false;
    this.currentGrid = Array(gridSize).fill(Array(gridSize).fill({ value: '-', player: null }));
    this.gridSize = gridSize;
    this.currentPlacedFlags = currentPlacedFlags;
  }

    render = () => this.currentGrid


    placeCells = (cellArray, player = 1) => {
      if (!JSON.stringify(this.currentPlacedFlags).includes(JSON.stringify(cellArray[0]))) {
        this.currentLiveCells = this.currentLiveCells.concat(cellArray);
        this.updateGrid(cellArray, player);
      }
    }

    removeCells = (cellArray, player = 1) => {
      const currentLiveCells = [...this.currentLiveCells];
      // of all the current live cells, keep those that aren't in the cellArray:
      // (a collection of cells the player clicked to be removed)
      const updatedCurrentLiveCells = currentLiveCells.filter((cell) => !JSON.stringify(cellArray).includes(JSON.stringify(cell)));
      this.currentLiveCells = updatedCurrentLiveCells;
      this.updateGrid([], player);
    }

    placeFlag = (cellArray, player = null) => {
      let updatedCurrentGrid = [...this.currentGrid];
      this.currentPlacedFlags = this.currentPlacedFlags.concat(cellArray);

      updatedCurrentGrid = updatedCurrentGrid.map((row, y) => row.map((cell, x) => {
        if (JSON.stringify(cellArray).includes(JSON.stringify([x, y]))) {
          return { value: 'f', player };
        }
        return cell;
      }));

      this.currentGrid = updatedCurrentGrid;
    }

    updateGrid = (cellArray, player) => {
      const newGrid = [];
      let newRow;


      for (let y = 0; y < this.gridSize; y++) {
        newRow = [];
        for (let x = 0; x < this.gridSize; x++) {
          // looks thru existing grid and checks which player is assigned to each cell
          const playerAttr = this.currentGrid[y][x].player;
          // looks thru existing gird and checks which flags exist and have owners (if any)
          if (JSON.stringify(this.currentPlacedFlags).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: 'f', player: playerAttr });
            // looks thru newly clicked cells and places live ones along with owner
          } else if (JSON.stringify(cellArray).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: '*', player });
            // looks thru existing live cells and maintains value and player
          } else if (JSON.stringify(this.currentLiveCells).includes(JSON.stringify([x, y]))) {
            newRow.push({ value: '*', player: playerAttr });
          } else {
            // evaluates all outlying cells as dead, with no owner
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
          let flagCount = 0;
          let flagArray = [];
          let liveCellCount = 0;
          let player1CellCount = 0;
          let player2CellCount = 0;

          for (let i = 0; i < this.neighbours(y, x).length; i++) {
            if (this.neighbours(y, x)[i].value === 'f') {
              flagCount++ 
              flagArray.push(this.neighbours(y, x)[i])
            };
            if (this.neighbours(y, x)[i].value === '*') liveCellCount++;
            if (this.neighbours(y, x)[i].player === 1) player1CellCount++;
            if (this.neighbours(y, x)[i].player === 2) player2CellCount++;
          }
          const nextCellOwner = this.determineNextCellOwner(player1CellCount, player2CellCount);

          const newElt = this.newState(elt, liveCellCount, flagCount, flagArray, nextCellOwner);

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

    newState = (state, liveCellCount, flagCount, flagArray, nextCellOwner) => {
      //the var below contains any single cell that is alive and owned by the player currently playing
      let liveOwnedCells = flagArray[0] ? {value: '*', player: flagArray[0].player} : {}

      if (state.value === 'f') {
        return this.newFlagState(state, nextCellOwner);
      } if ([2, 3].includes(liveCellCount + flagCount) && flagArray[0] && JSON.stringify(state) === JSON.stringify(liveOwnedCells)){
      
      // state.player === flagArray[0].player && state.value === '*') 
      
        return { value: '*', player: state.player };
      } if ([2, 3].includes(liveCellCount) && state.value === '*') {
        return { value: '*', player: state.player };
      } if (liveCellCount === 3 && state.value === '-') {
        return { value: '*', player: nextCellOwner };
      }
      return { value: '-', player: null };
    }

    // if there is an owner return current state and owner
    // if there is no owner return current state we assign next cell owner and return
    newFlagState = (state, nextCellOwner) => (nextCellOwner ? { value: 'f', player: nextCellOwner } : state)


    determineNextCellOwner = (player1CellCount, player2CellCount) => {
      if (player1CellCount > player2CellCount) {
        return 1;
      }
      if (player2CellCount > player1CellCount) {
        return 2;
      }

      return null;
    }

    getLiveCellCoordinates = () => this.currentLiveCells;
}

export default Grid;
