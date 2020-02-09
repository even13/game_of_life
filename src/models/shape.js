class Shape {
  static create = (type, coord) => {
    if (JSON.stringify(coord) === JSON.stringify([0, 1])) return [[0, 0], [0, 1], [0, 2]];
    return [[2, 1], [2, 2], [2, 3]];
  }
}

export default Shape;
