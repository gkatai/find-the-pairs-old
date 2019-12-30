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

      const newState = boardReducer(initialState, { type: types.RECEIVE_TILES });

      expect(newState.state).toEqual(board.states.loaded);
    });

    it('should set the tiles to the received tiles', () => {
      const newState = boardReducer({ board: { blocks: [] } }, { type: types.RECEIVE_TILES, tiles: [1, 2, 3, 4, 5] });

      expect(newState.board.blocks).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('receive tiles error', () => {
    it('should set the state to load error', () => {
      const initialState = { state: board.states.loading, board: {} };

      const newState = boardReducer(initialState, { type: types.RECEIVE_TILES_ERROR });

      expect(newState.state).toEqual(board.states.loadError);
    });
  });
});
