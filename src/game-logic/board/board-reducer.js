import * as types from './board-action-types';
import board from './board';
import generator from '../pair-generator/pair-generator';

const initialState = {
  state: board.states.inactive,
  board: {
    blocks: [],
    isLocked: false
  },
  flippedElements: [],
  moves: 0
};

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_TILES:
      return { ...state, state: board.states.loading };
    case types.RECEIVE_TILES:
      return {
        ...state,
        state: board.states.loaded,
        board: { ...state.board, blocks: generator.getPairs(action.tileRandomizationAlgorithm, action.tiles) }
      };
    case types.RECEIVE_TILES_ERROR:
      return { ...state, state: board.states.loadError };
    case types.SET_SELECTED_INDEX:
      return { ...state, selectedIndex: action.index, moves: state.moves + 1 };
    case types.FLIP_AND_EVALUATE_TILE:
      return board.flipAndEvaluate(state);
    case types.RESET:
      return { state: board.states.loading, board: { blocks: [], isLocked: false }, flippedElements: [], moves: 0 };
    default:
      return state;
  }
}
