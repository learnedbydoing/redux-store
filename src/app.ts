import * as fromStore from './store'; //import whole store folder using index.ts exports

import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  //todos = function of reducer which manages the entire state of the "todos" state
  todos: fromStore.reducer
};

const store = new fromStore.Store(reducers); //pass the whole reducers obj into our store

console.log(store.value);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;

    const payload = { label: input.value, complete: false };

    store.dispatch({
      type: 'ADD_TODO',
      payload //shorthand of payload: payload
    });

    console.log(store.value);

    input.value = '';
  },
  false
);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    console.log(target);
  }
});
