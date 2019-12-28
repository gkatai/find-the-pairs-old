// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';
import { createStore, combineReducers } from 'redux';
import { boardReducer } from './game-logic/board/board-reducer';
import * as boardActions from './game-logic/board/board-actions';

const store = createStore(combineReducers({ boardReducer }));

const parentNode = document.getElementById('app');

view(store.getState());

store.subscribe(() => {
  view(store.getState());
});

function view(state) {
  render(
    <div>
      <p onclick={handleIncrementClick}>Increment</p>
      <p>Count: {state.boardReducer.count}</p>
    </div>,
    parentNode
  );
}

function handleIncrementClick() {
  store.dispatch(boardActions.increment(1));
}
