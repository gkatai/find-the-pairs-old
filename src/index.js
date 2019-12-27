// eslint-disable-next-line no-unused-vars
import { h, render } from 'petit-dom';

//  assuming your HTML contains a node with "root" id
const parentNode = document.getElementById('app');

// mount
render(<h1>Hello world!</h1>, parentNode);

// patch
render(<h1>Hello again</h1>, parentNode);
