const buttonAdd = document.querySelectorAll('button.add');
const spanCount = document.getElementById('cart-count');
const spanPrice = document.getElementById('cart-total-price');

console.log(buttonAdd, spanCount, spanPrice);

function productCount() {
  let startCount = spanCount.innerHTML;
  spanCount.innerHTML = Number(startCount) + 1;
}

function priceCount() {
  let startPrice = spanPrice.innerHTML;
  spanPrice.innerHTML = Number(startPrice) + Number(this.dataset.price);
}


for(let btn of buttonAdd) {
  btn.addEventListener('click', productCount);
  btn.addEventListener('click', priceCount);
}
