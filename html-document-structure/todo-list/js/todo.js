'use strict';
const totoList = document.querySelector('.todo-list');
const done = totoList.querySelector('.done');
const undone = totoList.querySelector('.undone');
let checks = document.querySelectorAll('input[type="checkbox"]');

Array.from(checks).forEach(element => {
  element.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.hasAttribute('checked')) {
      undone.appendChild(event.target.parentElement);
      event.target.removeAttribute('checked');
    } else {
      done.appendChild(event.target.parentElement);
      event.target.setAttribute('checked', null);
    }
  });
});

