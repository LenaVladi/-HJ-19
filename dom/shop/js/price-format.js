function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const buttonAdd = document.querySelector('button.add');
const spanCount = document.getElementById('cart-count');
const spanPrice = document.getElementById('cart-total-price');

console.log(buttonAdd, spanCount, spanPrice);

function productCount() {

}

function priceCount() {

}

function basketAdd(event) {
  console.log(this.dataset.price);
}

buttonAdd.addEventListener('click', basketAdd);
