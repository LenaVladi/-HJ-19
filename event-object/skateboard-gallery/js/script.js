'use strict';
const view = document.getElementById('view');
const nav = document.getElementById('nav');
const blank = nav.getElementsByTagName('a');

function galleryCurrent(event) {
  event.preventDefault();
  Array.from(blank).forEach(a => {
    a.classList.remove('gallery-current');
  });
  event.currentTarget.classList.add('gallery-current');
}

function galleryView(event) {
  event.preventDefault();
  view.src = this.href;
}

Array.from(blank).forEach(a => {
  a.addEventListener('click', galleryCurrent);
  a.addEventListener('click', galleryView);
});
