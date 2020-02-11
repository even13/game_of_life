class Shape {
  create = (type, coord, angle) => {
    switch (type) {
      case 'spinner': return this.spinner(coord, angle);
      case 'spaceship': return this.spaceship(coord, angle);
      case 'bird': return this.bird(coord, angle);
      default: return [coord];
    }
  }

  spinner = (coord, angle) => {
    const elmOffs = [[0, -1], [0, 0], [0, 1]];
    return this.rotate(coord, elmOffs, angle);
  };

  spaceship = (coord, angle) => {
    const elmOffs = [[0, -1], [1, 0], [-1, 1], [0, 1], [1, 1]];
    return this.rotate(coord, elmOffs, angle);
  };

  bird = (coord, angle) => {
    const elmOffs = [
      [1, -2], [2, -2], [-2, -1], [-1, -1], [0, -1],
      [2, -1], [3, -1], [-2, 0], [-1, 0], [0, 0], [1, 0],
      [2, 0], [-1, 1], [0, 1], [1, 1],
    ];
    return this.rotate(coord, elmOffs, angle);
  };

  rotate = (coord, elmOffs, angle) => {
    const rads = (angle * Math.PI) / 180;
    const coords = [];
    elmOffs.forEach((element) => {
      const xCoord = coord[0] + (element[0] * Math.cos(rads) - element[1] * Math.sin(rads));
      const yCoord = coord[1] + (element[1] * Math.cos(rads) + element[0] * Math.sin(rads));
      coords.push([xCoord, yCoord]);
    });
    return coords;
  };
}

export default Shape;
