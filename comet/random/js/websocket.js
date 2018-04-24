'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const cardsNubmer = document.querySelector('.websocket');

ws.addEventListener('message', showCard);

function showCard(event) {
  Array.from(cardsNubmer.children).forEach(el => {
      if (el.textContent === event.data) {
          el.classList.add('flip-it');
      } else {
          el.classList.remove('flip-it');
      }
  });
}
