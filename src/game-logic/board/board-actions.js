import * as types from './board-action-types';

function requestTiles() {
  return {
    type: types.REQUEST_TILES
  };
}

function receiveTiles(tiles) {
  return {
    type: types.RECEIVE_TILES,
    tiles
  };
}

function receiveTilesError() {
  return {
    type: types.RECEIVE_TILES_ERROR
  };
}

export function fetchTiles(requestCallback) {
  return function(dispatch) {
    dispatch(requestTiles());

    return requestCallback().then(
      tiles => dispatch(receiveTiles(tiles)),
      () => dispatch(receiveTilesError())
    );
  };
}

export function flipTile(index) {
  return {
    type: types.FLIP_TILE,
    index
  };
}
