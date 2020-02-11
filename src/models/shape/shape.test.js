import Shape from './shape';

let testShapeInstance;

describe('Shape', () => {
  beforeEach(() => {
    testShapeInstance = new Shape('spinner', [2, 2]);
  });

  describe('spinners', () => {
    it('returns coordinates for a vertical spinner at [2, 2]', () => {
      expect(testShapeInstance.create('spinner', [2, 2], 0, false)).toEqual([[2, 1], [2, 2], [2, 3]]);
    });

    it('returns coordinates for a vertical spinner at [0, 1]', () => {
      expect(testShapeInstance.create('spinner', [0, 1], 0, false)).toEqual([[0, 0], [0, 1], [0, 2]]);
    });

    it('returns coordinates for a vertical spinner at [3, 3]', () => {
      expect(testShapeInstance.create('spinner', [3, 3], 0, false)).toEqual([[3, 2], [3, 3], [3, 4]]);
    });
  });

  describe('spaceships', () => {
    it('returns coordinates for a spaceship at [2, 2]', () => {
      expect(testShapeInstance.create('spaceship', [2, 2], 0, false)).toEqual([[2, 1], [3, 2], [1, 3], [2, 3], [3, 3]]);
    });

    it('returns coordinates for a spaceship at [1, 1]', () => {
      expect(testShapeInstance.create('spaceship', [1, 1], 0, false)).toEqual([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]);
    });
  });

  describe('birds', () => {
    it('returns coordinates for a bird at [3, 3]', () => {
      expect(testShapeInstance.create('bird', [3, 3], 0, false)).toEqual([
        [4, 1], [5, 1], [1, 2], [2, 2], [3, 2], [5, 2], [6, 2],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [4, 4],
      ]);
    });

    it('returns coordinates for a bird at [8, 9]', () => {
      expect(testShapeInstance.create('bird', [8, 9], 0, false)).toEqual([
        [9, 7], [10, 7], [6, 8], [7, 8], [8, 8], [10, 8], [11, 8],
        [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [7, 10], [8, 10], [9, 10],
      ]);
    });
  });

  describe('default', () => {
    it('returns a single cell at the coordinate [0, 1]', () => {
      expect(testShapeInstance.create(null, [0, 1], 0, false)).toEqual([[0, 1]]);
    });

    it('returns a single cell at the coordinate [12, 12]', () => {
      expect(testShapeInstance.create(null, [12, 12], 0, false)).toEqual([[12, 12]]);
    });

    it('returns a single cell at the coordinate [4, 14]', () => {
      expect(testShapeInstance.create(null, [4, 14], 0, false)).toEqual([[4, 14]]);
    });
  });

  describe('rotate', () => {
    it('returns correct coordinates for a spinner at [2, 2], rotated by 90 degrees', () => {
      expect(testShapeInstance.create('spinner', [2, 2], 90, false)).toEqual([[3, 2], [2, 2], [1, 2]]);
    });

    it('returns correct coordinates for a spaceship at [2, 2], rotated by 90 degrees', () => {
      expect(testShapeInstance.create('spaceship', [2, 2], 90, false)).toEqual([[3, 2], [2, 3], [1, 1], [1, 2], [1, 3]]);
    });

    it('returns correct coordinates for a mirrored spaceship at [1, 1], rotated by 0 degrees', () => {
      expect(testShapeInstance.create('spaceship', [1, 1], 0, true)).toEqual([[1, 0], [0, 1], [2, 2], [1, 2], [0, 2]]);
    });
  });
});
