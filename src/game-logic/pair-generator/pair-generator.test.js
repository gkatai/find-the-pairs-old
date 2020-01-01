import generator from './pair-generator';

describe('Pair generator', () => {
  describe('get', () => {
    it('should return an element from the pool, based on the given algorithm', () => {
      const algorithm = () => 3;
      const expectedResult = {
        newPool: [1, 2, 3],
        selectedNumber: 4
      };

      const result = generator.get(algorithm, [1, 2, 3, 4]);

      expect(result).toEqual(expectedResult);
    });

    it('should return an element from the pool, based on an other algorithm', () => {
      const algorithm = pool => pool.length - 2;
      const expectedResult = {
        newPool: [10, 20, 40],
        selectedNumber: 30
      };

      const result = generator.get(algorithm, [10, 20, 30, 40]);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('generate pairs', () => {
    it('should return pair array with the provided elements', () => {
      const algorithm = () => 0;
      const expectedResult = [1, 2, 3, 4, 1, 2, 3, 4];

      const result = generator.getPairs(algorithm, [1, 2, 3, 4]);

      expect(result).toEqual(expectedResult);
    });
  });
});
