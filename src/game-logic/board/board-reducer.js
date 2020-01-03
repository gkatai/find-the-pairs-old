import produce from 'immer';
import * as types from './board-action-types';
import board from './board';
import generator from '../pair-generator/pair-generator';

const initialState = {
  state: board.states.inactive,
  board: {
    width: 5,
    blocks: [],
    isLocked: false
  },
  flippedElements: [],
  moves: 0
};

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_TILES:
      return produce(state, draftState => {
        draftState.state = board.states.loading;
      });
    case types.RECEIVE_TILES:
      return produce(state, draftState => {
        draftState.state = board.states.loaded;
        draftState.board.blocks = generator.getPairs(action.tileRandomizationAlgorithm, action.tiles);
      });
    case types.RECEIVE_TILES_ERROR:
      return produce(state, draftState => {
        draftState.state = board.states.loadError;
      });
    case types.SET_SELECTED_INDEX:
      return produce(state, draftState => {
        draftState.selectedIndex = action.index;
        draftState.moves = state.moves + 1;
      });
    case types.FLIP_AND_EVALUATE_TILE:
      return board.flipAndEvaluate(state);
    default:
      return state;
  }
}
