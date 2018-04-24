'use strict'

const chat = document.querySelector('.chat');
const connection = new WebSocket('ws://neto-api.herokuapp.com/chat');
const chatStatus = chat.querySelector('.chat-status');
const 
    messageSubmit = chat.querySelector('.message-submit'),
    messagesContent = chat.querySelector('.messages-content'),
    messagesTemplate = chat.querySelector('.messages-templates'),
    messageStatus = messagesTemplate.querySelector('.message-status'),
    statusContent = messageStatus.querySelector('.message-text'),
    messageTypeTemplate = messagesTemplate.querySelector('.loading'),
    messageTypeText = messageTypeTemplate.getElementsByTagName('.span'),
    messageTemplate = messageTypeTemplate.nextElementSibling,
    messageText = messageTemplate.querySelector('.message-text'),
    messageTime = messageTemplate.querySelector('.timestamp'),
    messagePersonal = messagesTemplate.querySelector('.message-personal'),
    personalText = messagePersonal.querySelector('.message-text'),
    personalTime = messagePersonal.querySelector('.timestamp');

connection.addEventListener('open', () => {
    chatStatus.textContent = chatStatus.getAttribute('data-online');
    messageSubmit.removeAttribute('disabled');
    statusContent.textContent = 'Пользователь появился в сети';
    messagesContent.appendChild(messageStatus.cloneNode(true));
});

function getMessageTime() {
    let hours = (new Date()).getHours(),
        minutes = (new Date()).getMinutes();
    if (hours < 10) {
        hours = '0' + hours;
    };
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    return (hours + ':' + minutes)
};

connection.addEventListener('message', event => {
    console.log(event);
    if (event.data === '...') {
        messageTypeText.textContent = 'Пользователь печатает сообщение';
        messagesContent.appendChild(messageTypeTemplate.cloneNode(true)); 
    } else {
        Array.from(messagesContent.getElementsByClassName('loading')).forEach(message => {
            messagesContent.removeChild(message);
          })
          messageTime.textContent = getMessageTime();
          messageText.textContent = event.data;
          messagesContent.appendChild(messageTemplate.cloneNode(true));
    }
});

/* При отправке сообщения пользователем через форму 
(кнопка «Отправить сообщение» или клавиша Enter в поле ввода сообщения) 
необходимо текст сообщения отправить по веб-сокет соединению и отобразить сообщение 
пользователя в общем списке. */

if (connection.addEventListener('close', event => {
    console.log('Пользователь не в сети');
    chatStatus.textContent = chatStatus.getAttribute('data-offline');    
    messageSubmit.setAttribute('disabled', 'disabled'); 
    statusContent.textContent = 'Пользователь не в сети';
    messagesContent.appendChild(messageStatus.cloneNode(true));
}));

messageSubmit.addEventListener('click', () => {
    event.preventDefault();
    if (messageInput.value !== '') {
        personalText.textContent = messageInput.value;
        messageInput.value = '';
        personalTime.textContent = getMessageTime();
        messagesContent.appendChild(messagePersonal.cloneNode(true));
        chatConnection.send(personalText.textContent);
    }
  });