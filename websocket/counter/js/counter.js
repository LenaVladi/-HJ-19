'use strict';
const connection = new WebSocket('ws://neto-api.herokuapp.com/counter');

connection.addEventListener('message', event => {
    const answer = JSON.parse(event.data);
    document.querySelector('.counter').textContent = `${answer.connections}`;
    document.querySelector('output.errors').textContent = `${answer.errors}`;
});


document.addEventListener('close', connection.addEventListener('close', event => { 1000; }));
//connection.addEventListener('close', 1000);