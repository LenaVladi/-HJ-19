'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', event => {
  console.log(event);
  event.canvas.toBlob(status => ws.send(status));
});