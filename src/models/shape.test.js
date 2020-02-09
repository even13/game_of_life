import Shape from './shape';

describe('Shape', () => {
  describe('spinners', () => {
    it('returns coordinates for a vertical spinner at [2, 2]', () => {
      expect(Shape.create('spinner', [2, 2])).toEqual([[2, 1], [2, 2], [2, 3]]);
    });

    it('returns coordinates for a vertical spinner at [0, 1]', () => {
      expect(Shape.create('spinner', [0, 1])).toEqual([[0, 0], [0, 1], [0, 2]]);
    });

    it('returns coordinates for a vertical spinner at [3, 3]', () => {
      expect(Shape.create('spinner', [3, 3])).toEqual([[3, 2], [3, 3], [3, 4]]);
    });
  });

  describe('spaceships', () => {
    it('returns coordinates for a spaceship at [2, 2]', () => {
      expect(Shape.create('spaceship', [2, 2])).toEqual([[2, 1], [3, 2], [1, 3], [2, 3], [3, 3]]);
    });

    it('returns coordinates for a spaceship at [1, 1]', () => {
      expect(Shape.create('spaceship', [1, 1])).toEqual([[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]);
    });
  });
});
