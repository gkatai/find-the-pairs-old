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
});
