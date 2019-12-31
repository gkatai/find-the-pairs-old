// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import boardReducer from './game-logic/board/board-reducer';
import * as boardActions from './game-logic/board/board-actions';
import board from './game-logic/board/board';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers({ boardReducer }), composeEnhancers(applyMiddleware(thunkMiddleware)));

const parentNode = document.getElementById('app');

view(store.getState());

store.subscribe(() => {
  view(store.getState());
});

function view(state) {
  render(<div>{renderBoard(state.boardReducer)}</div>, parentNode);
}

function renderBoard(boardState) {
  switch (boardState.state) {
    case board.states.inactive:
      return <p>Board inactive...</p>;
    case board.states.loading:
      return <p>Loading...</p>;
    case board.states.loaded:
      return (
        <div class="square-container">
          {renderBlocks(boardState.board.blocks)}
          <div class="square back-side"></div>
        </div>
      );
  }
}

function renderBlocks(blocks) {
  return blocks.map(block => (
    <div class="square" key={block.id}>
      <div class="content">{<img class="gallery__img" src={block.url} />}</div>
    </div>
  ));
}

// fetch the tiles
const requestCallback = () => {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    return fetch('https://api.thecatapi.com/v1/images/search?size=small&limit=10')
      .then(response => response.json())
      .then(pictures => resolve(pictures.map(picture => ({ id: picture.id, url: picture.url }))))
      .catch(() => reject());
  });
};
store.dispatch(boardActions.fetchTiles(requestCallback));
