class Shape {
  static create = (type, coord) => {
    switch (type) {
      case 'spinner': return Shape.spinner(coord);
      case 'spaceship': return Shape.spaceship(coord);
      case 'bird': return Shape.bird(coord);
      default: return [];
    }
  }

  static spinner = (coord) => [[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]];

  static spaceship = (coord) => ([
    [coord[0], coord[1] - 1], [coord[0] + 1, coord[1]],
    [coord[0] - 1, coord[1] + 1], [coord[0], coord[1] + 1],
    [coord[0] + 1, coord[1] + 1],
  ]);

  static bird = (coord) => ([
    [coord[0] + 1, coord[1] - 2], [coord[0] + 2, coord[1] - 2], [coord[0] - 2, coord[1] - 1],
    [coord[0] - 1, coord[1] - 1], [coord[0], coord[1] - 1], [coord[0] + 2, coord[1] - 1],
    [coord[0] + 3, coord[1] - 1], [coord[0] - 2, coord[1]], [coord[0] - 1, coord[1]],
    [coord[0], coord[1]], [coord[0] + 1, coord[1]], [coord[0] + 2, coord[1]],
    [coord[0] - 1, coord[1] + 1], [coord[0], coord[1] + 1], [coord[0] + 1, coord[1] + 1],
  ]);
}

export default Shape;
