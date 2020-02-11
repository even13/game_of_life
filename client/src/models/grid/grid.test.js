import Grid from './grid';

describe('Grid', () => {
  let testGrid;
  let testGridInstance;
  let empty;
  let one;
  let two;
  let flag;

  beforeEach(() => {
    testGridInstance = new Grid(3);
    empty = { value: '-', player: null };
    one = { value: '*', player: 1 };
    two = { value: '*', player: 2 };
    flag = { value: 'f', player: null };
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
      [one, empty, empty],
      [empty, empty, empty],
      [empty, empty, empty],
    ];
    testGridInstance.placeCells([[0, 0]]);
    expect(testGridInstance.render()).toEqual(testGrid);
  });

  it('can take a cell at 1,2', () => {
    testGrid = [
      [empty, empty, empty],
      [empty, empty, empty],
      [empty, one, empty],
    ];

    testGridInstance.placeCells([[1, 2]]);
    expect(testGridInstance.render()).toEqual(testGrid);
  });

  it('can take a cell at 2,1 and 2,2', () => {
    testGrid = [
      [empty, empty, empty],
      [empty, empty, one],
      [empty, empty, one],
    ];

    testGridInstance.placeCells([[2, 1], [2, 2]]);
    expect(testGridInstance.render()).toEqual(testGrid);
  });

  it('it can take a cell at [0, 1], [1,1], [2,1]', () => {
    testGrid = [
      [empty, empty, empty],
      [one, one, one],
      [empty, empty, empty],
    ];

    testGridInstance.placeCells([[0, 1], [1, 1], [2, 1]]);
    expect(testGridInstance.render()).toEqual(testGrid);
  });

  describe('flags', () => {
    it('can place a flag on the grid at [0,0]', () => {
      testGrid = [
        [flag, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ];
      testGridInstance.placeFlag([[0, 0]]);
      expect(testGridInstance.render()).toEqual(testGrid);
    });
  });

  describe('3 x 3 stripe', () => {
    it('resurrects all cells after one evolution', () => {
      testGrid = [
        [one, one, one],
        [one, one, one],
        [one, one, one],
      ];
      testGridInstance.placeCells([[0, 1], [1, 1], [2, 1]]);
      testGridInstance.evolve();
      expect(testGridInstance.render()).toEqual(testGrid);
    });

    it('kills all cells after two evolutions', () => {
      const firstGrid = [
        [empty, empty, empty],
        [empty, empty, empty],
        [empty, empty, empty],
      ];
      testGridInstance.placeCells([[0, 1], [1, 1], [2, 1]]);
      testGridInstance.evolve();
      testGridInstance.evolve();
      expect(testGridInstance.render()).toEqual(firstGrid);
    });
  });

  describe('5 x 5 spinner', () => {
    it('rotates the strip by 90 deg after 1 evolution', () => {
      testGridInstance = new Grid(5);
      testGrid = [
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
        [empty, one, one, one, empty],
        [empty, empty, empty, empty, empty],
        [empty, empty, empty, empty, empty],
      ];

      testGridInstance.placeCells([[2, 1], [2, 2], [2, 3]]);
      testGridInstance.evolve();
      expect(testGridInstance.render()).toEqual(testGrid);
    });

    it('rotates the strip by 180 deg after 2 evolutions', () => {
      testGridInstance = new Grid(5);
      testGrid = [
        [empty, empty, empty, empty, empty],
        [empty, empty, one, empty, empty],
        [empty, empty, one, empty, empty],
        [empty, empty, one, empty, empty],
        [empty, empty, empty, empty, empty],
      ];

      testGridInstance.placeCells([[2, 1], [2, 2], [2, 3]]);
      testGridInstance.evolve();
      testGridInstance.evolve();
      expect(testGridInstance.render()).toEqual(testGrid);
    });

    describe('removing cells', () => {
      it('remove live cells placed by the user', () => {
        testGridInstance.placeCells([[1, 1]]);
        testGridInstance.removeCells([[1, 1]]);
        testGrid = [
          [empty, empty, empty],
          [empty, empty, empty],
          [empty, empty, empty],
        ];
        expect(testGridInstance.render()).toEqual(testGrid);
      });

      it('leaves 1 cell when user places 3 and removes 2', () => {
        testGridInstance.placeCells([[1, 1], [1, 2], [2, 1]]);
        testGridInstance.removeCells([[1, 1], [2, 1]]);
        testGrid = [
          [empty, empty, empty],
          [empty, empty, empty],
          [empty, one, empty],
        ];
        expect(testGridInstance.render()).toEqual(testGrid);
      });
    });
  });

  describe('selecting two players', () => {
    it('lets players place 2 types of cells', () => {
      testGridInstance.placeCells([[1, 1]], 1);
      testGridInstance.placeCells([[2, 2]], 2);

      testGrid = [
        [empty, empty, empty],
        [empty, one, empty],
        [empty, empty, two],
      ];
      expect(testGridInstance.render()).toEqual(testGrid);
    });
  });
});
