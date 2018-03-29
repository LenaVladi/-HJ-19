'use strict';
const divTabs = document.getElementsByClassName('tabs')[0];
const tabs = divTabs.getElementsByTagName('a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
console.log(tabs);
let contentTabs = new XMLHttpRequest();

function addPreloader() {
  preloader.classList.add('hidden');
}

function getContentTabs(event) {
  content.innerHTML = contentTabs.responseText;
}

function showTabs(event) {
  event.preventDefault();
  contentTabs.open("GET", event.target.href);
  contentTabs.send();
  if (event.target.classList.contains('active')) {
    return;
  } else {
    for(let tab of tabs) {
      tab.classList.remove('active');
    }
    event.target.classList.add('active');
    contentTabs.addEventListener('loadstart', addPreloader);
    contentTabs.addEventListener('load', getContentTabs);
  }
}

for(let tab of tabs) {
  tab.addEventListener('click', showTabs);
}
