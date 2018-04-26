'use strict';

const signInHtm = document.querySelector('.sign-in-htm');
const signUpHtm = document.querySelector('.sign-up-htm');
const buttons = document.querySelectorAll('.button');

const urlSignIn = 'https://neto-api.herokuapp.com/signin';
const urlSignUp = 'https://neto-api.herokuapp.com/signup';

//Запрос на сервер для обеих формЖ принимает параметры:
//url - адрес запроса
//form - объект FormData как есть
//target - value формы вход/регистрация (для вывода сообщений об авторизации)
function getAutorization(url, form, target) {
    //подготовка FormData к отправке на сервер
  let data = {};
  for (const [k, v] of form) {
    data[k] = v;
  }
  fetch(url, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: 'POST',
    credentials: 'same-origin',
    }).then((res) => {
      if (200 <= res.status && res.status < 300) {
        return res;
      }
      throw new Error(response.statusText);
    }).then((res) => res.json()).then((data) => { 
      data;
      if (target === 'Войти') {
        if (data.error) {
          signInHtm.querySelector('.error-message').textContent = data.message;
        } else {
          signInHtm.querySelector('.error-message').textContent  = `Пользователь ${data.name} успешно авторизован`;
        } 
      } else {
        if (data.error) {
          signUpHtm.querySelector('.error-message').textContent = data.message;
        } else {
          signUpHtm.querySelector('.error-message').textContent  = `Пользователь ${data.name} успешно зарегистрирован`;
        } 
      }
      console.log(data);
    }).catch((error) => { 
      error;
      console.log(error);
    });
    console.log(data);
}

for ( let btn of buttons) {
  btn.addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.value === 'Войти') {
      const result = getAutorization(urlSignIn, new FormData(signInHtm), event.target.value);
    } else {
      const result = getAutorization(urlSignUp, new FormData(signUpHtm), event.target.value);
    } 
  })
}

