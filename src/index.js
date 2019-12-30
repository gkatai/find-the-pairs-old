// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';
import { createStore, combineReducers } from 'redux';
import boardReducer from './game-logic/board/board-reducer';

const store = createStore(
  combineReducers({ boardReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const parentNode = document.getElementById('app');

view(store.getState());

store.subscribe(() => {
  view(store.getState());
});

// eslint-disable-next-line no-unused-vars
function view(state) {
  render(<div />, parentNode);
}
