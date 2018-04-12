'use strict'
const canvas = document.querySelector('canvas');
const minCount = 200;
const maxCount = 400;
const minBr = 0.8;
const maxBr = 1;
const starColours = ['#ffffff', '#ffe9c4', '#d4fbff'];
const starMaxSize = 1.1;

function randMinMax(min = 0, max = 1) {
  return (min + Math.random() * max).toFixed(3);
}

function pointBackground(ctx, coords, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(...coords);
  ctx.closePath();
}

function pointStar(ctx, point, radius, style) {
  ctx.beginPath();
  ctx.fillStyle = style.color;
  ctx.globalAlpha = style.intensity;
  ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

function pointer(canvas) {
  const ctx = canvas.getContext('2d');

  pointBackground(ctx, [0, 0, canvas.width, canvas.height], '#000');
  const starsNum = randMinMax(minCount, maxCount);

  for (let i = 1; i <= starsNum; i++) {
    const starStyle = {
      color: starColours[Math.round(randMinMax(0, 3))],
      intensity: randMinMax(minBr, maxBr)
    };

    const coords = {
      x: randMinMax(0, canvas.width),
      y: randMinMax(0, canvas.height)
    };

    pointStar(ctx, coords, randMinMax(0, starMaxSize), starStyle);
  }
}



canvas.addEventListener('click', () => {
  pointer(canvas);
});

document.addEventListener('DOMContentLoaded', () => {
  pointer(canvas);
});
