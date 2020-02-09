import Shape from './shape';

describe('Shape', () => {
  it('returns coordinates for a vertical spinner at [2, 2]', () => {
    expect(Shape.create('spinner', [2, 2])).toEqual([[2, 1], [2, 2], [2, 3]]);
  });

  it('returns coordinates for a vertical spinner at [0, 1]', () => {
    expect(Shape.create('spinner', [0, 1])).toEqual([[0, 0], [0, 1], [0, 2]]);
  });
});
