'use strict';
const sliderNav = document.querySelector('.slider-nav');
const navCollection = sliderNav.getElementsByTagName('a');
const slides = document.getElementsByClassName('slides')[0];
const slideCollection = slides.querySelectorAll('.slide');
slideCollection[0].classList.add('slide-current');
navCollection[0].classList.add('disabled');
navCollection[2].classList.add('disabled');
let slideCurrent = document.querySelector('.slide-current');

console.log(sliderNav, navCollection, slides, slideCollection);

// function disable(event) {
//   if ('first') {
//     event.target.disabled =  slideCollection[0] ? false : true;
//   } else if ('prev') {
//     event.target.disabled = slideCurrent.previousElementSibling ? false : true;
//   } else if ('next') {
//     event.target.disabled = slideCurrent.nextElementSibling ? false : true;
//   } else {
//     event.target.disabled = slideCollection[slideCollection.length - 1] ? false : true;
//   }
// }

// function disable(event) {
//   let btn = Array.from(navCollection);
//   if (slideCollection[0]) {
//     btn[0].classList.toggle('disabled');
//     btn[btn.length].classList.toggle('disabled');
//   } else if (!slideCurrent.previousElementSibling) {
//     event.target.classList.toggle('disabled');
//   } else if (!slideCurrent.nextElementSibling) {
//     event.target.classList.toggle('disabled');
//   } else if (slideCollection[slideCollection.length - 1]) {
//     event.target.classList.toggle('disabled');
//   }
// }


function buttonName(event) {
  switch (event.target.dataset.action) {
    case 'next':
      slideCurrent = slideCurrent.nextElementSibling;
      break;
    case 'prev':
      slideCurrent = slideCurrent.previousElementSibling;
      break;
    case 'first':
      slideCurrent = slideCollection[0];
      break;
    case 'last':
      let last = slideCollection.length;
      slideCurrent = slideCollection[last - 1];
      break;
  }
}



for (let a of navCollection) {
  a.addEventListener('click', event => {
    event.preventDefault();
    console.log(event.target.dataset.action);
    slideCurrent.classList.remove('slide-current');
    buttonName(event);
    slideCurrent.classList.add('slide-current');
    disable(event);
  });
}
