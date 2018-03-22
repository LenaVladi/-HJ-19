'use strict';
const totoList = document.querySelector('.todo-list');
const done = totoList.querySelector('.done');
const undone = totoList.querySelector('.undone');
let labels = document.getElementsByTagName('label');

 console.log(totoList, done, undone, labels)

for (let label of labels) {
  label.addEventListener('click', event => {
    if (event.target.hasAttribute('checked')) {
      event.target.removeAttribute('checked');
      undone.appendChild(event.target);
    } else {
      event.target.setAttribute('checked', null);
      done.appendChild(event.target);
    }
  });
}
