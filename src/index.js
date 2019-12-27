import { createStore, combineReducers } from 'redux';
import { boardReducer } from './game-logic/board/board-reducer';
import * as boardActions from './game-logic/board/board-actions';

const store = createStore(combineReducers({ boardReducer }));

console.log(store.getState());

store.dispatch(boardActions.increment(2));

console.log(store.getState());

// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';

//  assuming your HTML contains a node with "root" id
const parentNode = document.getElementById('app');

// mount
render(<h1>Hello world!</h1>, parentNode);

// patch
render(<h1>Hello again</h1>, parentNode);
