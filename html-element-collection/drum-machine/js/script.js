'use strict';

const liClick = document.getElementsByClassName('drum-kit__drum');
console.log(liClick);

for(const li of liClick){
  const audio = li.getElementsByTagName('audio')[0];
  li.onclick = () => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}
