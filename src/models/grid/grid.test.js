import Grid from './grid';

describe('grid', () => {
  let testGrid;
  let testGridInstance;

  beforeEach(() => {
    testGridInstance = new Grid(3);
  });

  it('initially shows an empty 30 x 30 grid', () => {
    testGridInstance = new Grid();

    expect(testGridInstance.render()).toHaveLength(30);
  });

  describe('#gridSize', () => {
    it('shows a grid of dimensions #gridSize x #gridSize', () => {
      const thirtyGrid = new Grid(35);
      expect(thirtyGrid.render()).toHaveLength(35);
    });
  });

  it('can take a cell at 0,0', () => {
    testGrid = [
      ['*', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-'],
    ];

    testGridInstance.place_cells([[0, 0]]);
    expect(testGridInstance.render()).toStrictEqual(testGrid);
  });

  it('can take a cell at 1,2', () => {
    testGrid = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '*', '-'],
    ];

    testGridInstance.place_cells([[1, 2]]);
    expect(testGridInstance.render()).toStrictEqual(testGrid);
  });

  it('can take a cell at 2,1 and 2,2', () => {
    testGrid = [
      ['-', '-', '-'],
      ['-', '-', '*'],
      ['-', '-', '*'],
    ];

    testGridInstance.place_cells([[2, 1], [2, 2]]);
    expect(testGridInstance.render()).toStrictEqual(testGrid);
  });

  it('can take a cell at [0, 1], [1,1], [2,1]', () => {
    testGrid = [
      ['-', '-', '-'],
      ['*', '*', '*'],
      ['-', '-', '-'],
    ];

    testGridInstance.place_cells([[0, 1], [1, 1], [2, 1]]);
    expect(testGridInstance.render()).toStrictEqual(testGrid);
  });

  describe('3 x 3 stripe', () => {
    it('resurrects all cells after one evolution', () => {
      const testGrid = [
        ['*', '*', '*'],
        ['*', '*', '*'],
        ['*', '*', '*'],
      ];
      testGridInstance.place_cells([[0, 1], [1, 1], [2, 1]]);
      testGridInstance.evolve();
      expect(testGridInstance.render()).toStrictEqual(testGrid);
    });

    it('kills all cells after two evolutions', () => {
      const firstGrid = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-'],
      ];
      testGridInstance.place_cells([[0, 1], [1, 1], [2, 1]]);
      testGridInstance.evolve();
      testGridInstance.evolve();
      expect(testGridInstance.render()).toStrictEqual(firstGrid);
    });
  });

  describe('5 x 5 spinner', () => {
    it('rotates the strip by 90 deg after 1 evolution', () => {
      testGridInstance = new Grid(5);
      testGrid = [
        ['-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-'],
        ['-', '*', '*', '*', '-'],
        ['-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-'],
      ];

      testGridInstance.place_cells([[2, 1], [2, 2], [2, 3]]);
      testGridInstance.evolve();
      expect(testGridInstance.render()).toStrictEqual(testGrid);
    });

    it('rotates the strip by 180 deg after 2 evolutions', () => {
      testGridInstance = new Grid(5);
      testGrid = [
        ['-', '-', '-', '-', '-'],
        ['-', '-', '*', '-', '-'],
        ['-', '-', '*', '-', '-'],
        ['-', '-', '*', '-', '-'],
        ['-', '-', '-', '-', '-'],
      ];

      testGridInstance.place_cells([[2, 1], [2, 2], [2, 3]]);
      testGridInstance.evolve();
      testGridInstance.evolve();
      expect(testGridInstance.render()).toStrictEqual(testGrid);
    });

    describe('removing cells', () => {
      it('remove live cells placed by the user', () => {
        testGridInstance.place_cells([[1, 1]]);
        testGridInstance.removeCells([[1, 1]]);
        testGrid = [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '-', '-'],
        ];
        expect(testGridInstance.render()).toStrictEqual(testGrid);
      });

      it('leaves 1 cell when user places 3 and removes 2', () => {
        testGridInstance.place_cells([[1, 1], [1, 2], [2, 1]]);
        testGridInstance.removeCells([[1, 1], [2, 1]]);
        testGrid = [
          ['-', '-', '-'],
          ['-', '-', '-'],
          ['-', '*', '-'],
        ];
        expect(testGridInstance.render()).toStrictEqual(testGrid);
      });
    });
  });
});
