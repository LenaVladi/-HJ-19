'use strict';
const contactList = document.querySelector('#container .list-view ul');
const arrName = JSON.parse(loadContacts());

console.log(arrName, contactList);

for(let i = 0; i < arrName.length; i++){
  console.log(arrName[i].name, arrName[i].phone, arrName[i].email)
  let newLi = document.createElement('li');
  newLi.innerHTML = `<strong>${arrName[i].name}</strong>`;
  newLi.dataset.email = arrName[i].email;
  newLi.dataset.phone = arrName[i].phone;
  contactList.appendChild(newLi);
}
