'use strict';

const polling = document.querySelector('.pooling');

function poll() {
  fetch('https://neto-api.herokuapp.com/comet/pooling' , {
    method: 'GET'
  })
    .then( res => res.json() )
    .then( data => {
      for(const div of polling.querySelectorAll('div')){
        div.classList.remove('flip-it');
      }
      polling.querySelectorAll('div')[parseInt(data) - 1].classList.add('flip-it');
  });
}

setInterval( () => {
  poll()
}, 2000 );