'use strict'
const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
});

canvas.addEventListener('dblclick', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const line = [],
