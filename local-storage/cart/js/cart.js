'use strict';
const addToCartForm = document.getElementById('AddToCartForm');
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');

function snippetColorSwatch(data, number) {
  const node = document.createElement('div');
  node.classList.add('swatch-element', 'color', data.type);
  node.dataset.value = data.type;

  data.isAvailable ? node.classList.add('available') : node.classList.add('soldout');

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = data.title;

  const input = document.createElement('input');
  input.quickbeam = 'color';
  input.id = `swatch-${number}-${data.type}`;
  input.type = 'radio';
  input.name = 'color';
  input.value = data.type;
  input.checked;

  if (!(data.isAvailable)) input.disabled = true;

  const label = document.createElement('label');
  label.setAttribute('for', `swatch-${number}-${data.type}`);
  label.style = `style="border-color: ${data.code};"`;

  const span = document.createElement('span');
  span.style = `style="background-color: ${data.code};"`;

  const img = document.createElement('img');
  img.classList.add('crossed-out');
  img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';

  node.appendChild(tooltip);
  node.appendChild(input);
  node.appendChild(label);
  label.appendChild(span);
  label.appendChild(img);
 

  return node;
}

function snippetSizeSwatch(data, number) {
  const node = document.createElement('div');
  node.classList.add('swatch-element', 'plain', 'color', data.type);
  node.dataset.value = data.type;

  data.isAvailable ? node.classList.add('available') : node.classList.add('soldout');

  const input = document.createElement('input');
  input.id = `swatch-${number}-${data.type}`;
  input.type = 'radio';
  input.name = 'size';
  input.value = data.type;

  if (!data.isAvailable) input.disabled = true;

  const label = document.createElement('label');
  label.setAttribute('for', `swatch-${number}-${data.type}`);
  label.textContent = data.title;

  const img = document.createElement('img');
  img.classList.add('crossed-out');
  img.src =  'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';

  node.appendChild(input);
  node.appendChild(label);
  label.appendChild(img);

  return node;
}

function snippetProductInQuickCart(id, src, title, count, price, onHoverText) {
  const node = document.createElement('div');
  node.classList.add('quick-cart-product', 'quick-cart-product-static');
  node.id = `quick-cart-product-${id}`;
  node.style.opacity = 1;

  node.innerHTML =
    `<div class="quick-cart-product-wrap">
      <img src="${src}" title="${title}">
      <span class="s1" style="background-color: #000; opacity: .5">$${price.toFixed(2)}</span>
      <span class="s2">${onHoverText}</span>
    </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${id}">${count}</span>
      <span class="quick-cart-product-remove remove" data-id="${id}"></span>`;

  return node;
}

function snippeCart(sum) {
  const node = document.createElement('div');
  const a = document.createElement('a');
  a.classList.add('cart-ico', 'open'); 
  a.id = 'quick-cart-pay';
  a.quickbeam = 'cart-pay';

  let span = document.createElement('span');
  let spanPrice = document.createElement('span');
  spanPrice.id = 'quick-cart-price';
  spanPrice.textContent = sum;

  let br = document.createElement('br');
  let strong = document.createElement('strong');
  strong.classList.add('quick-cart-text');
  strong.textContent = `Оформить заказ${br}`;

  node.appendChild(a);
  node.lastChild.appendChild(span);
  node.lastChild.lastChild.appendChild(strong);
  node.lastChild.lastChild.appendChild(spanPrice);

  return node;
} 

function updateCart() {
  quickCart.innerHTML = '';

  let cartSum = 0;
  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'GET'
  })
  .then(res => {
    if (200 <= res.status && res.status < 300) {
      return res;
    }
    throw new Error();
  })
  .then(res => res.json())
  .then(data => {
    data.forEach(function (el, i) {
      quickCart.appendChild(snippetProductInQuickCart(el.id, el.pic, el.title, el.quantity, el.price, 'size: ' + el.size));
      cartSum += el.price*el.quantity;
    })
  })
  .then(() => {
    if (quickCart.innerHTML !== '')
    quickCart.appendChild(snippeCart(cartSum));
  });
}

function formStateInit() {
  //Проверка, сохранено ли какое то состояние формы
  if(!localStorage.getItem('addToCartForm'))
    return;

  let state = localStorage.getItem('addToCartForm');
  state = JSON.parse(state);
  const stateKeys = Object.keys(state);

  const inputs = addToCartForm.querySelectorAll('input');
  for (const input of inputs) {
    for (const key of stateKeys) {
      if (( input.name === key) && (input.value === state[key])) {
        input.checked = true;
      }
    }
  }
}

function init() {
  Promise.all([
    fetch('https://neto-api.herokuapp.com/cart/colors', {
      method: 'GET'
    }),
    fetch('https://neto-api.herokuapp.com/cart/sizes', {
      method: 'GET'
    })
  ])
  .then(([colors, sizes]) => {
    if (( 200 <= colors.status && colors.status < 300) && (200 <= sizes.status && sizes.status < 300)) {
      return [colors, sizes];
    }
    throw new Error();
  })
  .then(([colors, sizes]) => {
    Promise.all([colors.text(), sizes.text()])
      .then( ([colors, sizes]) => {
        try{
          const jsonColors = JSON.parse(colors);
          const jsonSizes = JSON.parse(sizes);
          return [jsonColors, jsonSizes];
        } catch (e) {
          console.error(e);
          throw new Error();
        }
      })
      .then(([colors, sizes]) => {
        colors.forEach(function (el, i) {
          colorSwatch.appendChild(snippetColorSwatch(el, i));
        });
        sizes.forEach(function (el, i) {
          sizeSwatch.appendChild(snippetSizeSwatch(el, i));
        });
      })
      .then(() => formStateInit());
  });
  //наполнение корзины
  updateCart();
}

//Обработчик отправки формы
addToCartForm.addEventListener('submit', function (e) {
  e.preventDefault();

  let formData = new FormData(e.target);
  formData.append('productId', e.target.dataset.productId);

  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      if (200 <= res.status && res.status < 300) {
          return res;
      }
      throw new Error(res.statusText);

    })
    .then(res => res.json())
    .then(data => {
      if (!data.error){
        updateCart();
      } else {
        throw new Error();
      }
    })
    .catch(er => {
      console.error(er);
    });
});

// Обработчик изменения состояния формы
addToCartForm.addEventListener('change', function (e) {
  e.preventDefault();
  let obj = {};
  const formData = new FormData(addToCartForm);
  for(const [key, val] of formData){
      obj[key] = val;
  }
  const json = JSON.stringify(obj);

  localStorage.setItem('addToCartForm', json);
});


// Обработчик кнопки удаления товара из корзины 
quickCart.addEventListener('click', function (e) {
  e.preventDefault();

  if(!e.target.classList.contains('quick-cart-product-remove'))
    return;

  const data = new FormData();
  data.append('productId', e.target.dataset.id);

  fetch('https://neto-api.herokuapp.com/cart/remove', {
    method: 'POST',
    body: data
  })
    .then(res => {
      if (200 <= res.status && res.status < 300) {
          return res;
      }
      throw new Error(res.statusText);
    })
    .then(res => res.json())
    .then(data => {
        updateCart();
    });
  //updateCart();
  e.stopPropagation();
});

// Запуск инициализации формы
init();

//выбор товара по фото
document.querySelector('.thumbs').addEventListener('click', () => {
   event.preventDefault();
   document.querySelector('.active').classList.remove('active');
   const a = event.target.parentElement.parentElement;
   a.classList.add('active');
   document.getElementById('big-image').style = `background-image: url("${a.href}");`;
});


