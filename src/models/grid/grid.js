class Grid {
  constructor(gridSize = 30, currentLiveCells = [], currentPlacedFlags = []) {
    this.currentLiveCells = currentLiveCells;
    this.isEvolved = false;
    this.currentGrid = Array(gridSize).fill(Array(gridSize).fill({ value: '-', player: null }));
    this.gridSize = gridSize;
    this.currentPlacedFlags = currentPlacedFlags;
    this.p1LiveCellCount = 0;
    this.p2LiveCellCount = 0;
  }

  render = () => this.currentGrid


  placeCells = (cellArray, player = 1) => {
    const cellArrayLength = cellArray.length;
    let allowPlace = true;

    for (let i = 0; i < cellArrayLength; i++) {
      const currentCell = JSON.stringify(cellArray[i]);
      const isFlag = JSON.stringify(this.currentPlacedFlags).includes(currentCell);
      const isLiveCell = JSON.stringify(this.currentLiveCells).includes(currentCell);
      if (isLiveCell || isFlag) allowPlace = false;
    }

    if (allowPlace) {
      this.currentLiveCells = this.currentLiveCells.concat(cellArray);
      this.updateGrid(cellArray, player);
    }
    return allowPlace;
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

  randomFlags = (numberPerQuadrant = 1) => {
    let Q1FlagCoordinates = [];
    while (Q1FlagCoordinates.length < numberPerQuadrant) {
      const xCoordQ1 = Math.floor(Math.random() * Math.ceil(this.gridSize / 2));
      const yCoordQ1 = Math.floor(Math.random() * Math.floor(this.gridSize / 2));
      /* istanbul ignore next */
      if (!JSON.stringify(Q1FlagCoordinates).includes(JSON.stringify([xCoordQ1, yCoordQ1]))) {
        Q1FlagCoordinates = [...Q1FlagCoordinates, [xCoordQ1, yCoordQ1]];
      }
    }

    let Q2FlagCoordinates = [];
    while (Q2FlagCoordinates.length < numberPerQuadrant) {
      const xCoordQ2 = Math.floor(Math.random() * Math.floor(this.gridSize / 2)) + Math.ceil(this.gridSize / 2);
      const yCoordQ2 = Math.floor(Math.random() * Math.floor(this.gridSize / 2));
      /* istanbul ignore next */
      if (!JSON.stringify(Q2FlagCoordinates).includes(JSON.stringify([xCoordQ2, yCoordQ2]))) {
        Q2FlagCoordinates = [...Q2FlagCoordinates, [xCoordQ2, yCoordQ2]];
      }
    }

    let Q3FlagCoordinates = [];
    while (Q3FlagCoordinates.length < numberPerQuadrant) {
      const xCoordQ3 = Math.floor(Math.random() * Math.floor(this.gridSize / 2)) + Math.floor(this.gridSize / 2);
      const yCoordQ3 = Math.floor(Math.random() * Math.floor(this.gridSize / 2)) + Math.ceil(this.gridSize / 2);
      /* istanbul ignore next */
      if (!JSON.stringify(Q3FlagCoordinates).includes(JSON.stringify([xCoordQ3, yCoordQ3]))) {
        Q3FlagCoordinates = [...Q3FlagCoordinates, [xCoordQ3, yCoordQ3]];
      }
    }

    let Q4FlagCoordinates = [];
    while (Q4FlagCoordinates.length < numberPerQuadrant) {
      const xCoordQ4 = Math.floor(Math.random() * Math.floor(this.gridSize / 2));
      const yCoordQ4 = Math.floor(Math.random() * Math.ceil(this.gridSize / 2)) + Math.floor(this.gridSize / 2);
      /* istanbul ignore next */
      if (!JSON.stringify(Q4FlagCoordinates).includes(JSON.stringify([xCoordQ4, yCoordQ4]))) {
        Q4FlagCoordinates = [...Q4FlagCoordinates, [xCoordQ4, yCoordQ4]];
      }
    }

    const xCoordOdd = Math.floor(Math.random() * Math.floor(this.gridSize));
    const yCoordOdd = Math.floor(Math.random() * Math.ceil(this.gridSize));

    this.currentPlacedFlags = Q1FlagCoordinates.concat(Q2FlagCoordinates).concat(Q3FlagCoordinates).concat(Q4FlagCoordinates);
    this.currentPlacedFlags.push([xCoordOdd, yCoordOdd]);
    this.updateGrid([], null);
  }

  getCurrentFlags = () => this.currentPlacedFlags

  updateGrid = (cellArray, player) => {
    const newGrid = [];
    let newRow;


    for (let y = 0; y < this.gridSize; y++) {
      newRow = [];
      for (let x = 0; x < this.gridSize; x++) {
        // looks through existing grid, checks which player is assigned to the cell in question, then assigns it here
        const playerAttr = this.currentGrid[y][x].player;
        // looks through existing gird and checks which flags exist and have owners (if any), then places them
        if (JSON.stringify(this.currentPlacedFlags).includes(JSON.stringify([x, y]))) {
          newRow.push({ value: 'f', player: playerAttr });
          // looks through newly clicked cells and places live ones along with their new owner
        } else if (JSON.stringify(cellArray).includes(JSON.stringify([x, y]))) {
          newRow.push({ value: '*', player });
          // looks through existing live cells and maintains value and player
        } else if (JSON.stringify(this.currentLiveCells).includes(JSON.stringify([x, y]))) {
          newRow.push({ value: '*', player: playerAttr });
          // evaluates all outlying cells as dead, with no owner
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
    let p1LiveCells = 0;
    let p2LiveCells = 0;

    this.currentGrid.forEach((row, y) => {
      const newRow = [];

      row.forEach((elt, x) => {
        let flagCount = 0;
        const flagArray = [];
        let liveCellCount = 0;
        let player1CellCount = 0;
        let player2CellCount = 0;

        for (let i = 0; i < this.neighbours(y, x).length; i++) {
          if (this.neighbours(y, x)[i].value === 'f') {
            flagCount++;
            flagArray.push(this.neighbours(y, x)[i]);
          }
          if (this.neighbours(y, x)[i].value === '*') liveCellCount++;
          if (this.neighbours(y, x)[i].player === 1) player1CellCount++;
          if (this.neighbours(y, x)[i].player === 2) player2CellCount++;
        }

        const nextCellOwner = this.determineNextCellOwner(player1CellCount, player2CellCount);
        const newElt = this.newState(elt, liveCellCount, flagCount, flagArray, nextCellOwner);

        if (newElt.value === '*') liveCells.push([x, y]);
        if (newElt.player === 1) p1LiveCells++;
        if (newElt.player === 2) p2LiveCells++;
        newRow.push(newElt);
      });
      newGrid.push(newRow);
    });
    this.p1LiveCellCount = p1LiveCells;
    this.p2LiveCellCount = p2LiveCells;
    this.currentLiveCells = liveCells;
    this.currentGrid = newGrid;
  }

  playerScores = () => {
    const flags = this.countFlags();
    const p1Score = flags[0] * 5 + this.p1LiveCellCount;
    const p2Score = flags[1] * 5 + this.p2LiveCellCount;

    return [flags[0], this.p1LiveCellCount, p1Score, flags[1], this.p2LiveCellCount, p2Score];
  }

  countFlags = () => {
    const flagArrLength = this.currentPlacedFlags.length;
    let player1FlagCount = 0;
    let player2FlagCount = 0;
    for (let i = 0; i < flagArrLength; i++) {
      const xCoord = this.currentPlacedFlags[i][1];
      const yCoord = this.currentPlacedFlags[i][0];
      const cell = this.currentGrid[xCoord][yCoord];
      if (cell.value === 'f' && cell.player === 1) player1FlagCount++;
      /* istanbul ignore next */
      if (cell.value === 'f' && cell.player === 2) player2FlagCount++;
    }
    return [player1FlagCount, player2FlagCount];
  };

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
    // the var below contains the format of any single live cell owned by the player currently playing
    const liveOwnedCells = flagArray[0] ? { value: '*', player: flagArray[0].player } : {};

    if (state.value === 'f') {
      return this.newFlagState(state, nextCellOwner);
    } if ([2, 3].includes(liveCellCount + flagCount) && flagArray[0] && JSON.stringify(state) === JSON.stringify(liveOwnedCells)) {
      return { value: '*', player: state.player };
    } if ([2, 3].includes(liveCellCount) && state.value === '*') {
      return { value: '*', player: state.player };
    } if (liveCellCount === 3 && state.value === '-') {
      return { value: '*', player: nextCellOwner };
    }
    return { value: '-', player: null };
  }

  // if there is an owner return current state and owner
  // if there is no owner we assign the next cell owner, then return
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
