'use strict';
const slider = document.getElementsByClassName('slider')[0];
const navCollection = document.querySelectorAll('.slider-nav > a'),
  prevSlide = navCollection[0],
  nextSlide = navCollection[1],
  firstSlide = navCollection[2],
  lastSlide = navCollection[3];

const slides = document.getElementsByClassName('slides')[0];
const slideCollection = slides.querySelectorAll('.slide');

slideCollection[0].classList.add('slide-current');

//console.log(navCollection, slides, slider, prevSlide, slideCollection);

prevSlide.classList.add('disabled');
firstSlide.classList.add('disabled');

function sliderShow(elem) {
  let activeElement = document.querySelector('.slide-current');

  if (elem.target.classList.contains('disabled')) {
    return;
  };

  Array.from(slider.getElementsByClassName('disabled')).forEach(button => button.classList.remove('disabled'));
  activeElement.classList.remove('slide-current');

  let data = elem.target.dataset.action;
  switch (data) {
    case 'prev': 
      activeElement = activeElement.previousElementSibling;
      break;
    case 'next': 
      activeElement = activeElement.nextElementSibling;
      break;
    case 'first': 
      activeElement = slides.firstElementChild;
      break;
    case 'last': 
      activeElement = slides.lastElementChild;
      break;
  };
  
  activeElement.classList.add('slide-current');
  if (!activeElement.previousElementSibling) {
    prevSlide.classList.add('disabled');
    firstSlide.classList.add('disabled');
  }
  if (!activeElement.nextElementSibling) {
    nextSlide.classList.add('disabled');
    lastSlide.classList.add('disabled');
  }
}

for (let a of navCollection) {
  a.addEventListener('click', () => sliderShow(event));
}
