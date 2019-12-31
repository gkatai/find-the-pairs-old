import produce from 'immer';
import * as types from './board-action-types';
import board from './board';

const initialState = {
  state: board.states.inactive,
  board: {
    width: 5,
    blocks: [],
    isLocked: false
  },
  flippedElements: []
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
        draftState.board.blocks = action.tiles;
      });
    case types.RECEIVE_TILES_ERROR:
      return produce(state, draftState => {
        draftState.state = board.states.loadError;
      });
    case types.SET_SELECTED_INDEX:
      return produce(state, draftState => {
        draftState.selectedIndex = action.index;
      });
    case types.FLIP_AND_EVALUATE_TILE:
      return board.flipAndEvaluate(state);
    default:
      return state;
  }
}
