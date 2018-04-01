'use strict';
const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');

console.log(counter);
counter.textContent = '0';

increment.addEventListener('click', () => {
    localStorage.setItem('counter', counter.textContent = parseInt(counter.textContent) + 1);
});
decrement.addEventListener('click', () => {
    if (parseInt(counter.textContent) === 0) {
        return;
    } else {
        localStorage.setItem('counter',counter.textContent = parseInt(counter.textContent) - 1);
    }  
});
reset.addEventListener('click', () => {
    localStorage.setItem('counter',counter.textContent = '0');
});

counter.textContent = localStorage.counter;
