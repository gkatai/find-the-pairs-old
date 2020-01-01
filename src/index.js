// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import boardReducer from './game-logic/board/board-reducer';
import * as boardActions from './game-logic/board/board-actions';
import { boardView } from './board-view';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({ boardReducer }), composeEnhancers(applyMiddleware(thunkMiddleware)));

const parentNode = document.getElementById('app');

view(store.getState());

store.subscribe(() => {
  view(store.getState());
});

function view(state) {
  render(<div>{boardView(state.boardReducer, store)}</div>, parentNode);
}

// fetch the tiles
const requestCallback = () => {
  return new Promise((resolve, reject) => {
    return fetch('https://api.thecatapi.com/v1/images/search?size=small&limit=8')
      .then(response => response.json())
      .then(pictures => resolve(pictures.map(picture => ({ id: picture.id, value: picture.url, found: false }))))
      .catch(() => reject());
  });
};

store.dispatch(boardActions.fetchTiles(requestCallback, randomizationAlgorithm));

function randomizationAlgorithm(pool) {
  return Math.floor(Math.random() * Math.floor(pool.length));
}
