import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './board-actions';
import * as types from './board-action-types';
import board from './board';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Board actions', () => {
  describe('fetch tiles', () => {
    it('should create RECEIVE_TILES when request tiles has been done', () => {
      const expectedActions = [{ type: types.REQUEST_TILES }, { type: types.RECEIVE_TILES, tiles: [1, 2, 3, 4, 5] }];
      const store = mockStore({ state: board.states.inactive, board: { blocks: [] } });
      const requestCallback = () => new Promise(resolve => resolve([1, 2, 3, 4, 5]));

      return store.dispatch(actions.fetchTiles(requestCallback)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should create RECEIVE_TILES_ERROR when request tiles has failed', () => {
      const expectedActions = [{ type: types.REQUEST_TILES }, { type: types.RECEIVE_TILES_ERROR }];
      const store = mockStore({ state: board.states.inactive, board: { blocks: [] } });
      const requestCallback = () => new Promise((resolve, reject) => reject());

      return store.dispatch(actions.fetchTiles(requestCallback)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('flip and evaluate tile', () => {
    it('should create SET_SELECTED_INDEX and FLIP_AND_EVALUATE_TILE actions', () => {
      const expectedActions = [{ type: types.SET_SELECTED_INDEX, index: 5 }, { type: types.FLIP_AND_EVALUATE_TILE }];
      const store = mockStore({ board: {} });

      store.dispatch(actions.flipTile(5));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
