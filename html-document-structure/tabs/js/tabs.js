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
  let a = document.createElement('a');
  a.innerText = tabsContent[i].dataset.tabTitle;
  a.classList.add('fa');
  a.classList.add(tabsContent[i].dataset.tabIcon);
  li.appendChild(a);
  tabsNav.appendChild(li);
}



function tabsShow(event) {
  event.preventDefault();
  const prevActiveTab = tabsNav.querySelector('.ui-tabs-active')
    if (prevActiveTab) {
      prevActiveTab.classList.remove('ui-tabs-active');
    }
  Array.from(tabsContent).forEach(tab => {
    console.log(tab.dataset.tabTitle);
    tab.classList.add('hidden');
    if (event.target.textContent === tab.dataset.tabTitle) {
      tab.classList.remove('hidden');
      event.target.classList.add('ui-tabs-active');
    }
  });
}

Array.from(tabsNav.children).forEach(tab => tab
  .addEventListener('click', tabsShow));