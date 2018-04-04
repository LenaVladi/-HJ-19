'use strict';

const signInHtm = document.querySelector('.sign-in-htm');
const signUpHtm = document.querySelector('.sign-up-htm');
const buttons = document.querySelectorAll('.button');
const errorMessage = document.querySelector('.error-message');
const urlSignIn = 'https://neto-api.herokuapp.com/signin';
const urlSignUp = 'https://neto-api.herokuapp.com/signup';

function getAutorization(url, form) {
  let data = {};
  for (const [k, v] of form) {
    data[k] = v;
  }
  fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': `application/json`
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
    }).then((res) => {
        if (200 <= res.status && res.status < 300) {
          return res;
        }
        throw new Error(response.statusText);
    }).then((res) => res.json()).then((data) => { 
            data;
            console.log(data);
        }).catch((error) => { 
            error;
            console.log(error);
        });
    console.log(data);
}



for ( let btn of buttons) {
    btn.addEventListener('click', () => {
        event.preventDefault();
        if (event.target.value === 'Войти') {
            const result = getAutorization(urlSignIn, new FormData(signInHtm));
            if (result !== undefined) {
                errorMessage.textContent = result.message;
                console.log(result.message);
            }
        } else {
            const result = getAutorization(urlSignUp, new FormData(signInHtm));
            
            console.log(result);
        } 
    })
}

