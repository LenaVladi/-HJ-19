'use strict';

const popName = document.querySelector('.prop__name');

function handleTableClick(event) {
  event.target.dataset.dir = event.currentTarget.dataset.dir ? 1 : -1;
  let field = event.target.dataset.popName;
  let direction = event.target.dataset.dir;
  sortTable(field, direction);
}

Array.from(popName).forEach(th => {
  th.addEventListener('click', handleTableClick);
})
