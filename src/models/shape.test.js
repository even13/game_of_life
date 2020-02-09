import Shape from './shape';

describe('Shape', () => {
  it('returns coordinates for a vertical spinner at [2, 2]', () => {
    expect(Shape.create('spinner', [2, 2])).toEqual([[2, 1], [2, 2], [2, 3]]);
  });
});
