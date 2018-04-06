'use strict'

const chat = document.querySelector('.chat');
const connection = new WebSocket('ws://neto-api.herokuapp.com/chat');
const chatStatus = chat.querySelector('.chat-status');
const messageSubmit = chat.querySelector('.message-submit');

connection.addEventListener('open', () => {
    chatStatus.textContent = chatStatus.dataset.online;
    messageSubmit.removeAttribute('disabled');
    console.log('Пользователь появился в сети');
    //обновить статус 
    //вывести сообщение
    //активировать кнопку
  });

connection.addEventListener('message', event => {
    console.log(event);
    if (event.data === '...') {
        chat.querySelector('.messages.loading').textContent = 'собеседник печатает сообщение...';   
    } else {
        console.log(chat.querySelector('.messages').querySelector('.message-text'));
        chat.querySelector('.messages').querySelector('.message-text').textContent = event.data;
    }
   //проверить текст сообщения. Если он равен ... (три точки), 
   //то необходимо отобразить информацию о том, что собеседник сейчас печатает сообщение. 
   //Если текст сообщения другой, то необходимо отобразить сообщение с этим текстом. 
   //А информацию о том, что собеседник печатает, необходимо удалить.
});

chat.querySelector('.message-box');
chat.querySelector('.message-input');

chat.querySelector('.messages-content');
chat.querySelector('.messages-templates');
chat.querySelector('.messages.loading');
chat.querySelector('.message-personal');
chat.querySelector('.message-text');
chat.querySelector('.timestamp');
chat.querySelector('.message-status');
chat.querySelector('.message-personal').querySelector('.message-text');
chat.querySelector('.chat-status');

connection.send('Простое сообщение, отправленноечерез websocket');

/* При отправке сообщения пользователем через форму 
(кнопка «Отправить сообщение» или клавиша Enter в поле ввода сообщения) 
необходимо текст сообщения отправить по веб-сокет соединению и отобразить сообщение 
пользователя в общем списке. */

if (connection.addEventListener('close', event => {
    console.log('Пользователь не в сети');
    //поменять статус чата
    //деактивировать кнопку «Отправить сообщение»
  }));