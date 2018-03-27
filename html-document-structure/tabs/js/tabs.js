'use strict';
const TABS = document.getElementById('tabs');
const tabsContent = document.getElementsByClassName('tabs-content')[0].children;
const tabsNav = document.getElementsByClassName('tabs-nav')[0];
const cloneTabsNav = tabsNav.cloneNode(true);
tabsNav.removeChild(tabsNav.getElementsByTagName('li')[0]);
let activeTabs = tabsContent[0].classList.add('ui-tabs-active');
console.log(TABS, tabsContent, tabsNav);

for (let i = 0; i < tabsContent.length; i++) {
  let li = document.createElement('li');
  li.classList.add(tabsContent[i].getAttribute('data-tab-icon'));
  let a = document.createElement('a');
  li.appendChild(a);
  a.classList.add('fa');
  a.textContent = tabsContent[i].getAttribute('data-tab-title');
  tabsNav.appendChild(li);
}



function tabsShow(event) {
  tabsNav.appendChild()
  let currentTabs = tabsContent.nextElementSibling;
  currentTabs.classList.add('ui-tabs-active');


}

Array.from(tabsContent).forEach(tab => tab
  .addEventListener('click', tabsShow));
