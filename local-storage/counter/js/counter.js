'use strict';
const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');

console.log(counter);
counter.textContent = localStorage.count;
if(!localStorage.count){
    localStorage.count = 0
}


increment.addEventListener('click', () => {
    localStorage.count++;
    counter.textContent = localStorage.count;
});
decrement.addEventListener('click', () => {
    if (parseInt(counter.textContent) === 0) {
        return;
    } else if (parseInt(counter.textContent) > 0) {
        localStorage.count--;
        counter.textContent = localStorage.count;
    }  
});
reset.addEventListener('click', () => {
    localStorage.count = 0;
    counter.textContent = localStorage.count;
    //localStorage.setItem('counter',counter.textContent = '0');
});
