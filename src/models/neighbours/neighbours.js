class Neighbours {

  get = (gridSize, x, y) => {
    let arr = []
    for (let row = (y - 1); row < (y + 2); row++) {
      for (let col = (x - 1); col < (x + 2); col++)
        if (x !== col || y !== row) {
          arr.push([(gridSize + row) % gridSize, (gridSize + col) % gridSize]);
        }
    }
    console.log(JSON.stringify(arr))
    return arr
  }

  get2 = (gridSize, x, y) => {
    let arr;
    let size = gridSize
    arr = [
    [(size + (x - 1)) % size, (size + (y - 1)) % size], 
    [(size + x) % size, (size + (y - 1)) % size],
    [(size + (x + 1)) % size, (size + (y - 1)) % size], 
    [(size + (x - 1)) % size, (size + y) % size],
    [(size + (x + 1)) % size, (size + y) % size], 
    [(size + (x - 1)) % size, (size + (y + 1)) % size],
    [(size + x) % size, (size + (y + 1)) % size], 
    [(size + (x + 1)) % size, (size + (y + 1)) % size],
  ]
  console.log(JSON.stringify(arr))
  return arr
  }
  

}

export default Neighbours;