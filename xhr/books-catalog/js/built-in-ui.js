/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

/* Мой код */

const content = document.getElementById('content');

var booksCatalog = new XMLHttpRequest();
booksCatalog.open(
  "GET",
  "https://neto-api.herokuapp.com/book/"
);
booksCatalog.send();

booksCatalog.addEventListener("load", booksParse);

function booksParse() {
  const books = JSON.parse(booksCatalog.responseText);
  console.log(books);
  for(let book of books){
    console.log(book.title);
    let newLi = document.createElement('li');
    //newLi.dataset.title = book.title;
    //contact.appendChild(newLi);
  }
}
