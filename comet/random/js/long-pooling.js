'use strict';
const longNumPooling = document.querySelector('.long-pooling').children;

console.log(longNumPooling);

function longPooling() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://neto-api.herokuapp.com/comet/long-pooling",
    true
  );
  xhr.send();

  xhr.addEventListener('load', function() {
    const getNumber = xhr.responseText;

    Array.from(longNumPooling).forEach(elem =>  {
      elem.classList.remove('flip-it');
    });
    longNumPooling[+getNumber].classList.add('flip-it');

  longPooling();
  }); 
}

longPooling();

