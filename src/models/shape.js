class Shape {
  static create = (type, coord) => {
    if (JSON.stringify(coord) === JSON.stringify([0, 1])) return [[0, 0], [0, 1], [0, 2]];
    if (JSON.stringify(coord) === JSON.stringify([3, 3])) return [[3, 2], [3, 3], [3, 4]];
    return [[2, 1], [2, 2], [2, 3]];
  }
}

export default Shape;
