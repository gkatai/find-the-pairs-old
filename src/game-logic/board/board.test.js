import board from './board';

describe('Board', () => {
  describe('ifFlipIsValid', () => {
    it('should return true if selected element is not yet flipped', () => {
      const result = board.ifFlipIsValid(0, [1, 1, 2, 2]);

      expect(result).toBe(true);
    });

    it('should return false if selected element is already flipped', () => {
      const result = board.ifFlipIsValid(0, [0, 0, 2, 2]);

      expect(result).toBe(false);
    });

    it('should return false if selected element is bigger then array size', () => {
      const result = board.ifFlipIsValid(4, [1, 1, 2, 2]);

      expect(result).toBe(false);
    });

    it('should return false if selected element is smaller than array size', () => {
      const result = board.ifFlipIsValid(-1, [1, 1, 2, 2]);

      expect(result).toBe(false);
    });
  });

  describe('flip', () => {
    it("should return with an array containing the added element's index if flip array was empty", () => {
      const result = board.flip(0, []);

      expect(result).toEqual([0]);
    });

    it("should return with an array containing the first and the added element's index if array had an element", () => {
      const result = board.flip(1, [0]);

      expect(result).toEqual([0, 1]);
    });

    it("should return with an array containing the the added element's index if array had second element", () => {
      const result = board.flip(2, [0, 1]);

      expect(result).toEqual([2]);
    });

    it('should not add the same element multiple times', () => {
      const result = board.flip(1, [1]);

      expect(result).toEqual([1]);
    });
  });

  describe('evaluate', () => {
    it('when flip array is empty', () => {
      const expectedResult = { isMatch: false };

      const result = board.evaluate([], [1, 1, 2, 2]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array count is 1', () => {
      const expectedResult = { isMatch: false };

      const result = board.evaluate([0], [1, 1, 2, 2]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array elements are matching', () => {
      const expectedResult = { updatedBlocks: [0, 0, 2, 2], isMatch: true };

      const result = board.evaluate([0, 1], [1, 1, 2, 2]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array elements are not matching', () => {
      const expectedResult = { isMatch: false };

      const result = board.evaluate([0, 2], [1, 1, 2, 2]);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('unlock', () => {
    it('should unlock the board', () => {
      const state = {
        board: {
          isLocked: true
        }
      };
      const expectedResult = {
        board: {
          isLocked: false
        }
      };

      const result = board.unlock(state);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('flip and evaluate', () => {
    it('when invalid block is flipped', () => {
      const state = {
        board: {
          blocks: [1, 1, 2, 2],
          isLocked: false
        },
        selectedIndex: -1,
        flippedElements: []
      };
      const expectedResult = {
        board: {
          blocks: [1, 1, 2, 2],
          isLocked: false
        },
        selectedIndex: undefined,
        invalidMessage: true,
        flippedElements: []
      };

      const result = board.flipAndEvaluate(state);

      expect(result).toEqual(expectedResult);
    });

    it('when valid block is flipped and is the first flipped one', () => {
      const state = {
        board: {
          blocks: [1, 1, 2, 2],
          isLocked: false
        },
        selectedIndex: 0,
        flippedElements: []
      };
      const expectedResult = {
        board: {
          blocks: [1, 1, 2, 2],
          isLocked: false
        },
        selectedIndex: undefined,
        flippedElements: [0]
      };

      const result = board.flipAndEvaluate(state);

      expect(result).toEqual(expectedResult);
    });

    it('when valid block is flipped and is the second flipped one and is match', () => {
      const state = {
        board: {
          blocks: [1, 1, 2, 2],
          isLocked: false
        },
        selectedIndex: 1,
        flippedElements: [0]
      };
      const expectedResult = {
        board: {
          blocks: [0, 0, 2, 2],
          isLocked: true
        },
        selectedIndex: undefined,
        flippedElements: [0, 1]
      };

      const result = board.flipAndEvaluate(state);

      expect(result).toEqual(expectedResult);
    });
  });
});
