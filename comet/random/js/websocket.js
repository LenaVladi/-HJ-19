'use strict';
const websocket = document.querySelector('.websocket');
const cardWebsocet = websocket.getElementsByTagName('div');

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

function webSocketRequest() {
  const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
  ws.addEventListener('message', event => {
    const data = JSON.parse(event.data);
    console.log(event, data);
    Array.from(cardWebsocet).forEach(el => {
      console.log(el.textContent);
      //el.classList.remove('flip-it');
      if (el.textContent === data) {
        el.classList.add('flip-it');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  webSocketRequest();
});