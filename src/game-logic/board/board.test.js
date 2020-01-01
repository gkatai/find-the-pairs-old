import board from './board';

describe('Board', () => {
  describe('ifFlipIsValid', () => {
    it('should return true if selected tile is not yet flipped', () => {
      const result = board.ifFlipIsValid(0, [
        { value: 1, flipped: false },
        { value: 1, flipped: false },
        { value: 2, flipped: false },
        { value: 2, flipped: false }
      ]);

      expect(result).toBe(true);
    });

    it('should return false if selected tile is already flipped', () => {
      const result = board.ifFlipIsValid(0, [
        { value: 1, flipped: true },
        { value: 1, flipped: false },
        { value: 2, flipped: false },
        { value: 2, flipped: false }
      ]);

      expect(result).toBe(false);
    });

    it('should return false if selected tile is not in the array', () => {
      const result = board.ifFlipIsValid(4, [
        { value: 1, flipped: false },
        { value: 1, flipped: false },
        { value: 2, flipped: false },
        { value: 2, flipped: false }
      ]);

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

      const result = board.evaluate([], [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array count is 1', () => {
      const expectedResult = { isMatch: false };

      const result = board.evaluate([0], [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array elements are matching', () => {
      const expectedResult = {
        updatedBlocks: [{ value: 1, found: true }, { value: 1, found: true }, { value: 2 }, { value: 2 }],
        isMatch: true
      };

      const result = board.evaluate([0, 1], [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }]);

      expect(result).toEqual(expectedResult);
    });

    it('when flip array elements are not matching', () => {
      const expectedResult = { isMatch: false };

      const result = board.evaluate([0, 2], [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }]);

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
          blocks: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }],
          isLocked: false
        },
        selectedIndex: -1,
        flippedElements: []
      };
      const expectedResult = {
        board: {
          blocks: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }],
          isLocked: false
        },
        selectedIndex: undefined,
        flippedElements: []
      };

      const result = board.flipAndEvaluate(state);

      expect(result).toEqual(expectedResult);
    });

    it('when valid block is flipped and is the first flipped one', () => {
      const state = {
        board: {
          blocks: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }],
          isLocked: false
        },
        selectedIndex: 0,
        flippedElements: []
      };
      const expectedResult = {
        board: {
          blocks: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }],
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
          blocks: [{ value: 1 }, { value: 1 }, { value: 2 }, { value: 2 }],
          isLocked: false
        },
        selectedIndex: 1,
        flippedElements: [0]
      };
      const expectedResult = {
        board: {
          blocks: [{ value: 1, found: true }, { value: 1, found: true }, { value: 2 }, { value: 2 }],
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
