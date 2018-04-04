'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const quickCart = document.getElementById('quick-cart');

function snippetColorSwatch(node) {
    let divSwEl = document.createElement('div');
    divSwEl.classList.add('swatch-element', 'color', 'red', 'available');
    divSwEl.dataset.value='red';

    let divTolltip = document.createElement('div');
        divTolltip.classList.add('tooltip');
        divTolltip.textContent = 'Красный';

    let input = document.createElement('input');
        input.quickbeam = 'color';
        input.id = 'swatch-1-red';
        input.type = 'radio';
        input.name = 'color';
        input.value = 'red';
   
    let label = document.createElement('label');
        label.for = 'swatch-1-red';
        label.style = 'border-color: red;';

    let span = document.createElement('span');
        span.style = 'border-color: red;';
    let img = document.createElement('img');
        img.classList.add('crossed-out');
        img.src = "https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886";
     
    node.appendChild(divSwEl);
    node.lastChild.appendChild(divTolltip);
    node.lastChild.appendChild(input);
    node.lastChild.appendChild(label);
    node.lastChild.lastChild.appendChild(span);
    node.lastChild.lastChild.appendChild(img);

    // let result = node;
    // return result;
    console.log(colorSwatch);
}

snippetColorSwatch(colorSwatch);

function snippetSizeSwatch(node) {
    let divSwEl = document.createElement('div');
        divSwEl.classList.add('swatch-element', 'plan', 's', 'soldout');
        divSwEl.dataset.value = 's';

    let input = document.createElement('input');
        input.id = 'swatch-0-s';
        input.type = 'radio';
        input.name = 'size'; 
        input.value = "s"; 
        input.getAttribute('disabled');
    let label = document.createElement('label');
        label.for = 'swatch-0-s';
        label.textContent = 'S';
    let img = document.createElement('img');
        img.classList.add('crossed-out');
        img.src = "https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886";
    
    node.appendChild(divSwEl);
    node.lastChild.appendChild(input);
    node.lastChild.appendChild(label);
    node.lastChild.lastChild.appendChild(img);
    console.log(sizeSwatch);

}

snippetSizeSwatch(sizeSwatch);

function snippetProductInQuickCart(node) {
    let divCartProduct = document.createElement('div');
    divCartProduct.classList.add('quick-cart-product', 'quick-cart-product-static');
    divCartProduct.id = 'quick-cart-product';
    divCartProduct.style = 'opacity: 1;';

    let divWrap = document.createElement('div');
    divWrap.classList.add('quick-cart-product-wrap');

    let img = document.createElement('img');
    img.src = "https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png";
    img.title = 'Tony Hunfinger T-Shirt New York';

    let spanIn1 = document.createElement('span');
    spanIn1.classList.add('s1');
    spanIn1.style = 'background-color: #000; opacity: .5';
    spanIn1.textContent = '$800.00';

    let spanIn2 = document.createElement('span');
    spanIn2.classList.add('s2');

    node.appendChild(divCartProduct);
    node.firstElementChild.appendChild(divWrap);
    node.firstElementChild.firstElementChild.appendChild(img);
    node.firstElementChild.firstElementChild.appendChild(spanIn1);
    node.firstElementChild.firstElementChild.appendChild(spanIn2);


    let spanOut1 = document.createElement('span');
    spanOut1.classList.add('count', 'hide', 'fadeUp');
    spanOut1.id = 'quick-cart-product-count';
    spanOut1.textContent = '1';

    let spanOut2 = document.createElement('span');
    spanOut2.classList.add('quick-cart-product-remove', 'remove');
    spanOut2.id = '';
    node.firstElementChild.appendChild(spanOut1);
    node.firstElementChild.appendChild(spanOut2);

console.log(node);
}

snippetProductInQuickCart(quickCart);

function snippeCart(node) {
    let aCart = document.createElement('a');
    aCart.classList.add('cart-ico', 'open'); 
    aCart.id = 'quick-cart-pay';
    aCart.quickbeam = 'cart-pay';

    let span = document.createElement('span');
    let spanPrice = document.createElement('span');
    spanPrice.id = 'quick-cart-price';
    spanPrice.textContent = '$800.00';

    let br = document.createElement('br');
    let strong = document.createElement('strong');
    strong.classList.add('quick-cart-text');
    strong.textContent = `Оформить заказ${br}`;

    node.appendChild(aCart);
    node.lastChild.appendChild(span);
    node.lastChild.lastChild.appendChild(strong);
    node.lastChild.lastChild.appendChild(spanPrice);

console.log(node);
} 

snippeCart(quickCart);

//const sizeS, sizeM, sizeL, sizeXL, sizeXXL, colorBlue, colorRed, colorYellow, colorWite;