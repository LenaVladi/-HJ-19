'use strict';
const wrapperDropdown = document.getElementsByClassName('wrapper-dropdown')[0];

wrapperDropdown.onclick = () => {
  wrapperDropdown.classList.toggle('active');
};
