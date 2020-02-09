class Shape {
  static create = (type, coord) => {
    switch (type) {
      case 'spinner': return Shape.spinner(coord);
      case 'spaceship': return Shape.spaceship(coord);
      case 'bird': return [
        [4, 1], [5, 1], [1, 2], [2, 2], [3, 2], [5, 2], [6, 2],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4],
      ];
      default: return [];
    }
  }

  static spinner = (coord) => [[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]];

  static spaceship = (coord) => ([
    [coord[0], coord[1] - 1], [coord[0] + 1, coord[1]],
    [coord[0] - 1, coord[1] + 1], [coord[0], coord[1] + 1],
    [coord[0] + 1, coord[1] + 1],
  ]);
}

export default Shape;
