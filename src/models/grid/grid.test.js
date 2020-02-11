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

  describe('#random flags', () => {
    let Q1;
    let Q2;
    let Q3;
    let Q4;

    let flagInQ1;
    let flagInQ2;
    let flagInQ3;
    let flagInQ4;

    it('can place 4 flags randomly over 4 quadrants in a 4 x 4 grid', () => {
      Q1 = [[0, 0], [0, 1], [1, 0], [1, 1]];
      Q2 = [[2, 0], [2, 1], [3, 0], [3, 1]];
      Q3 = [[0, 2], [0, 3], [1, 2], [1, 3]];
      Q4 = [[2, 2], [2, 3], [3, 2], [3, 3]];

      testGridInstance = new Grid(4);
      testGridInstance.randomFlags();

      flagInQ1 = Q1.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ2 = Q2.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ3 = Q3.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ4 = Q4.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));

      expect(flagInQ1).toBe(true);
      expect(flagInQ2).toBe(true);
      expect(flagInQ3).toBe(true);
      expect(flagInQ4).toBe(true);
    });

    it('can place 4 flags randomly over 4 quadrants in a 6 x 6 grid', () => {
      Q1 = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
      Q2 = [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]];
      Q3 = [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]];
      Q4 = [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]];

      testGridInstance = new Grid(6);
      testGridInstance.randomFlags();

      flagInQ1 = Q1.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ2 = Q2.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ3 = Q3.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ4 = Q4.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));

      expect(flagInQ1).toBe(true);
      expect(flagInQ2).toBe(true);
      expect(flagInQ3).toBe(true);
      expect(flagInQ4).toBe(true);
    });

    it('can place 4 flags randomly over 4 quadrants in a 5 x 5 grid', () => {
      Q1 = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
      Q2 = [[3, 0], [4, 0], [3, 1], [4, 1], [3, 2], [4, 2]];
      Q3 = [[2, 3], [3, 3], [4, 3], [2, 4], [3, 4], [4, 4]];
      Q4 = [[0, 2], [1, 2], [0, 3], [1, 3], [0, 4], [1, 4]];

      testGridInstance = new Grid(5);
      testGridInstance.randomFlags();

      flagInQ1 = Q1.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ2 = Q2.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ3 = Q3.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));
      flagInQ4 = Q4.some((elm) => testGridInstance.getCurrentFlags().some((otherElm) => JSON.stringify(elm) === JSON.stringify(otherElm)));

      expect(flagInQ1).toBe(true);
      expect(flagInQ2).toBe(true);
      expect(flagInQ3).toBe(true);
      expect(flagInQ4).toBe(true);
    });

    describe('multiple flags per quadrant', () => {
      it('can place 8 flags randomly over 4 quadrants in a 4 x 4 grid', () => {
        Q1 = [[0, 0], [0, 1], [1, 0], [1, 1]];
        Q2 = [[2, 0], [2, 1], [3, 0], [3, 1]];
        Q3 = [[0, 2], [0, 3], [1, 2], [1, 3]];
        Q4 = [[2, 2], [2, 3], [3, 2], [3, 3]];

        testGridInstance = new Grid(4);
        testGridInstance.randomFlags(2);
        const placedFlags = testGridInstance.getCurrentFlags();

        let flagsInQ1 = [];
        Q1.forEach((randomFlag) => {
          if (JSON.stringify(placedFlags).includes(JSON.stringify(randomFlag))) flagsInQ1 = [...flagsInQ1, randomFlag];
        });
        expect(flagsInQ1).toHaveLength(2);

        let flagsInQ2 = [];
        Q1.forEach((randomFlag) => {
          if (JSON.stringify(placedFlags).includes(JSON.stringify(randomFlag))) flagsInQ2 = [...flagsInQ2, randomFlag];
        });
        expect(flagsInQ2).toHaveLength(2);

        let flagsInQ3 = [];
        Q1.forEach((randomFlag) => {
          if (JSON.stringify(placedFlags).includes(JSON.stringify(randomFlag))) flagsInQ3 = [...flagsInQ3, randomFlag];
        });
        expect(flagsInQ3).toHaveLength(2);

        let flagsInQ4 = [];
        Q1.forEach((randomFlag) => {
          if (JSON.stringify(placedFlags).includes(JSON.stringify(randomFlag))) flagsInQ4 = [...flagsInQ4, randomFlag];
        });
        expect(flagsInQ4).toHaveLength(2);
      });
    });
  });
});
