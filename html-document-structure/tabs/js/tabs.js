'use strict';
const TABS = document.getElementById('tabs');
const tabsContent = document.getElementsByClassName('tabs-content')[0].children;
const tabsNav = document.getElementsByClassName('tabs-nav')[0];
const cloneTabsNav = tabsNav.cloneNode(true);
tabsNav.removeChild(tabsNav.getElementsByTagName('li')[0]);
console.log(TABS, tabsContent, tabsNav, cloneTabsNav);

Array.from(tabsContent).forEach(tab => tab.classList.toggle('hidden'));

let activeTab = tabsContent[0].classList.remove('hidden');
activeTab = tabsContent[0].classList.add('ui-tabs-active');



for (let i = 0; i < tabsContent.length; i++) {
  let li = document.createElement('li');
  li.classList.add(tabsContent[i].getAttribute('data-tab-icon'));
  let a = document.createElement('a');
  a.classList.add('fa');
  a.textContent = tabsContent[i].getAttribute('data-tab-title');
  li.appendChild(a);
  tabsNav.appendChild(li);
}



function tabsShow(event) {
  event.preventDefault();
  console.log(event.target.textContent);
  Array.from(tabsContent).forEach(tab => {
    console.log(tab.dataset.tabTitle);
    tab.classList.add('hidden');
    if (event.target.textContent === tab.dataset.tabTitle) {
      tab.classList.remove('hidden');
      tab.classList.add('ui-tabs-active');
    }
  });



}

Array.from(tabsNav.children).forEach(tab => tab
  .addEventListener('click', tabsShow));
