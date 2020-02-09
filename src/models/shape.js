class Shape {
  static create = (type, coord) => {
    if (type === 'spaceship') return Shape.spaceship(coord);
    if (type === 'spinner') return Shape.spinner(coord);
  }

  static spaceship = (coord) => ([
    [coord[0], coord[1] - 1], [coord[0] + 1, coord[1]],
    [coord[0] - 1, coord[1] + 1], [coord[0], coord[1] + 1],
    [coord[0] + 1, coord[1] + 1],
  ]);

  static spinner = (coord) => [[coord[0], coord[1] - 1], coord, [coord[0], coord[1] + 1]];
}

export default Shape;
