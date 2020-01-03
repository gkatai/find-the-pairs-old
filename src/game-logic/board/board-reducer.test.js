import boardReducer from './board-reducer';
import * as types from './board-action-types';
import board from './board';

describe('Board reducer', () => {
  describe('request tiles', () => {
    it('should set the state to loading', () => {
      const initialState = { state: board.states.inactive };

      const newState = boardReducer(initialState, { type: types.REQUEST_TILES });

      expect(newState.state).toEqual(board.states.loading);
    });
  });

  describe('receive tiles', () => {
    it('should set the state to loaded', () => {
      const initialState = { state: board.states.loading, board: {} };

      const newState = boardReducer(initialState, {
        type: types.RECEIVE_TILES,
        tiles: [1, 2, 3, 4, 5],
        tileRandomizationAlgorithm: () => 0
      });

      expect(newState.state).toEqual(board.states.loaded);
    });

    it('should set the tiles to the received tiles', () => {
      const newState = boardReducer(
        { board: { blocks: [] } },
        { type: types.RECEIVE_TILES, tiles: [1, 2, 3, 4, 5], tileRandomizationAlgorithm: () => 0 }
      );

      expect(newState.board.blocks).toEqual([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
    });
  });

  describe('receive tiles error', () => {
    it('should set the state to load error', () => {
      const initialState = { state: board.states.loading, board: {} };

      const newState = boardReducer(initialState, { type: types.RECEIVE_TILES_ERROR });

      expect(newState.state).toEqual(board.states.loadError);
    });
  });

  describe('set selected index', () => {
    it('should set the selected index', () => {
      const initialState = { board: {} };

      const newState = boardReducer(initialState, { type: types.SET_SELECTED_INDEX, index: 5 });

      expect(newState.selectedIndex).toBe(5);
    });

    it('should increment the move count', () => {
      const initialState = { board: {}, moves: 0 };

      const newState = boardReducer(initialState, { type: types.SET_SELECTED_INDEX, index: 0 });

      expect(newState.moves).toBe(1);
    });
  });

  describe('flip tile', () => {
    it('should add the tile index to the flipped blocks array', () => {
      jest.spyOn(board, 'flipAndEvaluate');
      const initialState = { flippedElements: [], board: { blocks: [] } };

      boardReducer(initialState, { type: types.FLIP_AND_EVALUATE_TILE, index: 3 });

      expect(board.flipAndEvaluate).toHaveBeenCalledTimes(1);
    });
  });

  describe('reset', () => {
    it('should set state to loading', () => {
      const initialState = { state: board.states.victory, board: {} };

      const newState = boardReducer(initialState, { type: types.RESET });

      expect(newState.state).toBe(board.states.loading);
    });

    it('should set blocks to empty array', () => {
      const initialState = { board: { blocks: [1, 2, 3, 4] } };

      const newState = boardReducer(initialState, { type: types.RESET });

      expect(newState.board.blocks).toEqual([]);
    });

    it('should set isLocked to false', () => {
      const initialState = { board: { isLocked: true } };

      const newState = boardReducer(initialState, { type: types.RESET });

      expect(newState.board.isLocked).toBe(false);
    });

    it('should set flippedElements to empty array', () => {
      const initialState = { flippedElements: [2, 3], board: {} };

      const newState = boardReducer(initialState, { type: types.RESET });

      expect(newState.flippedElements).toEqual([]);
    });

    it('should set moves to 0', () => {
      const initialState = { moves: 22, board: {} };

      const newState = boardReducer(initialState, { type: types.RESET });

      expect(newState.moves).toBe(0);
    });
  });
});
