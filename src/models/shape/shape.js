class Shape {
  create = (type, coord, angle, mirror) => {
    switch (type) {
      case 'spinner': return this.spinner(coord, angle, mirror);
      case 'spaceship': return this.spaceship(coord, angle, mirror);
      case 'bird': return this.bird(coord, angle, mirror);
      default: return [coord];
    }
  }

  spinner = (coord, angle, mirror) => {
    const elmOffs = [[0, -1], [0, 0], [0, 1]];
    return this.rotate(coord, elmOffs, angle, mirror);
  };

  spaceship = (coord, angle, mirror) => {
    const elmOffs = [[0, -1], [1, 0], [-1, 1], [0, 1], [1, 1]];
    return this.rotate(coord, elmOffs, angle, mirror);
  };

  bird = (coord, angle, mirror) => {
    const elmOffs = [
      [1, -2], [2, -2], [-2, -1], [-1, -1], [0, -1],
      [2, -1], [3, -1], [-2, 0], [-1, 0], [0, 0], [1, 0],
      [2, 0], [-1, 1], [0, 1], [1, 1],
    ];
    return this.rotate(coord, elmOffs, angle, mirror);
  };

  rotate = (coord, elmOffs, angle, mirror) => {
    const rads = (angle * Math.PI) / 180;
    const coords = [];

    elmOffs.forEach((element) => {
      let mirrorElement = element[0];
      if (mirror) {
        mirrorElement = element[0] * -1;
      }
      const xCoord = Math.round(coord[0] + (mirrorElement * Math.cos(rads) - element[1] * Math.sin(rads)));
      const yCoord = Math.round(coord[1] + (element[1] * Math.cos(rads) + mirrorElement * Math.sin(rads)));
      coords.push([xCoord, yCoord]);
    });
    return coords;
  };
}

export default Shape;
