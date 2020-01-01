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
        <div class="square-container" style={`transform: scale(${getAspectRatio()})`}>
          {renderBlocks(boardState.board.blocks, boardState.flippedElements)}
        </div>
      );
  }
}

function getAspectRatio() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width > height) {
    return height / width;
  }

  return 1;
}

function renderBlocks(blocks, flippedElements) {
  return blocks.map((block, key) => (
    <div class="square" key={key}>
      {renderBlock(block, key)}
    </div>
  ));

  function renderBlock(block, key) {
    if (block.found || flippedElements.includes(key)) {
      return <div class="content">{<img class="gallery__img" src={block.value} />}</div>;
    }

    return <div class="back-side gallery__img" onclick={() => handleBlockClick(key)}></div>;
  }
}

function handleBlockClick(key) {
  store.dispatch(boardActions.flipTile(key));
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
