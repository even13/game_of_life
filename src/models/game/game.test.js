import Game from './game'

describe('Game', () => {
  it('can generate a random flag in each quarter of a grid', () => {
    let testGame = new Game;
    let flags = 1;
    let gridSize = 10;

    testGame.getRandomFlags(flags,gridSize)
    expect(Array(gridSize)).toContain(testGame.getRandomFlags(flags,gridSize)[0])

  });
});