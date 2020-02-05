import Neighbours from './neighbours';

describe('Neighbours', () => {

    let neighbours;
    let expected;

    beforeEach(() => {
        neighbours = new Neighbours();
    })

    it('gets correct coordinates around central grid', () => {
        expected = [[0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]]
        expect(neighbours.get(3, 1, 1)).toEqual(expected)
    })

    it('gets correct coordinates around central grid', () => {
        expected = [[2,2], [2,0], [2,1], [0,2], [0,1], [1,2], [1,0], [1,1]]
        expect(neighbours.get(3, 0, 0)).toEqual(expected)
    })

    it('gets correct coordinates around central grid', () => {
        expected = [[1,1], [1,2], [1,0], [2,1], [2,0], [0,1], [0,2], [0,0]]
        expect(neighbours.get(3, 2, 2)).toEqual(expected)
    })

    xit('gets correct coordinates around central grid', () => {
        expected = [[0,0], [1,0], [2,0], [0,1], [2,1], [0,2], [1,2], [2,2]]
        expect(neighbours.get2(3, 1, 1)).toEqual(expected)
    })
})
