'use strict';
const longNumPooling = document.querySelector('.long-pooling').children;

function longPooling() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://neto-api.herokuapp.com/comet/long-pooling",
    true
  );
  xhr.send();

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState != 4) return;
    const getNumber = xhr.responseText;
    console.log(this);

    Array.from(longNumPooling).forEach(elem =>  {
      elem.classList.remove('flip-it');
    });
    longNumPooling[getNumber].classList.add('flip-it');

    longPooling();
  }); 
}

longPooling();

