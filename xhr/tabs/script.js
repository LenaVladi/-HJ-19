'use strict';
const divTabs = document.getElementsByClassName('tabs')[0];
const tabs = divTabs.getElementsByTagName('a');
const content = document.getElementById('content');
console.log(tabs);
let contentTabs = new XMLHttpRequest();

function toggleTabs(event) {
  for(let tab of tabs) {
    tab.classList.toggle('active');
  }
}

function showTabs(event) {
  event.preventDefault();
  toggleTabs(event);
  let href = event.target.href;
  contentTabs.addEventListener('load', getContentTabs(href));

}

function getContentTabs(href) {
  console.log(contentTabs, href);
  contentTabs.open(
    "GET", href
  );
  contentTabs.send();
  console.log(contentTabs.responseText);
}


// contentTabs.open(
//   "GET", getTabsHref(event)
// );
// contentTabs.send();
// console.log(contentTabs.responseText);


for(let tab of tabs) {
  console.log(tab);
  tab.addEventListener('click', showTabs);

}
