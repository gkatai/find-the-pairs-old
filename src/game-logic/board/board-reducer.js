import * as boardActions from './board-actions';

const initialState = {
  count: 0,
  board: {
    blocks: [1, 1, 2, 2],
    isLocked: false
  },
  selectedIndex: 1,
  flippedElements: [0]
};

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case boardActions.INCREMENT:
      return Object.assign({}, state, { count: state.count + action.count });
    default:
      return state;
  }
}
