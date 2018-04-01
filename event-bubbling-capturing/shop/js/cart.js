'use strict';
const itemsList = document.querySelector('.items-list');

function btn(event) {
  console.log(event.target);
  if (event.target.classList.contains('add-to-cart')) {
    let item = {
      title : event.target.dataset.title,
      price : event.target.dataset.price
    };
    addToCart(item);
  }
}

itemsList.addEventListener('click', btn);
