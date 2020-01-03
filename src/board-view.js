// eslint-disable-next-line no-unused-vars
import { h } from 'petit-dom';
import board from './game-logic/board/board';
import * as boardActions from './game-logic/board/board-actions';

export function boardView(state, store) {
  switch (state.state) {
    case board.states.inactive:
      return <p>Board inactive...</p>;
    case board.states.loading:
      return <p>Loading...</p>;
    case board.states.loaded:
      return (
        <div>
          <div class="square-container" style={`transform: scale(${getAspectRatio()})`}>
            {renderBlocks(state.board.blocks, state.flippedElements, store)}
          </div>
        </div>
      );
    case board.states.victory:
      return (
        <div>
          <div class="square-container" style={`transform: scale(${getAspectRatio()}); filter: blur(0.25rem);`}>
            {renderBlocks(state.board.blocks, state.flippedElements, store)}
          </div>
          <div class="victory-message">
            <h1>Well done</h1>
            <h2 styel={'text-align: center'}>Moves: {state.moves}</h2>
          </div>
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

function renderBlocks(blocks, flippedElements, store) {
  return blocks.map((block, key) => (
    <div class="square" key={key}>
      {renderBlock(block, key, flippedElements, store)}
    </div>
  ));
}

function renderBlock(block, key, flippedElements, store) {
  return (
    <div>
      <div class="content">
        <img
          style={`display: ${getVisibility(isFlipped(block, key, flippedElements))}`}
          class="gallery__img"
          src={block.value}
        />
        <span
          class="back-side"
          style={`display: ${getVisibility(!isFlipped(block, key, flippedElements))}`}
          onclick={() => handleBlockClick(key, store)}
        ></span>
      </div>
    </div>
  );
}

function handleBlockClick(key, store) {
  store.dispatch(boardActions.flipTile(key));
}

function isFlipped(block, key, flippedElements) {
  return block.found || flippedElements.includes(key);
}

function getVisibility(visible) {
  if (visible) {
    return 'block';
  }

  return 'none';
}
