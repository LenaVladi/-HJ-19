'use strict';
const popName = document.querySelector('.prop__name');

function handleTableClick(event) {
  if (event.target.classList.contains('prop__name')) {
    event.target.dataset.dir = event.currentTarget.dataset.dir ? 1 : -1;
    let field = event.target.dataset.popName;
    let direction = event.target.dataset.dir;
    sortTable(field, direction);
  }  
}
