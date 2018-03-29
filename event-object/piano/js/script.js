'use ctrict';
const setPiano = document.getElementsByClassName('set')[0];
const audios = setPiano.getElementsByTagName('audio');
const liAudio = setPiano.getElementsByTagName('li');
const sounds = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
//const FolderSounds = ['sounds/middle/', 'sounds/lower/', 'sounds/higher/'];
const audiosArray = Array.from(audios);

function modulePiano(event) {
  if (event.shiftKey) {
    return `sounds/lower/`;
  } else if(event.altKey) {
    return `sounds/higher/`;
  } else {
    return `sounds/middle/`;
  }
}

function audioSrc(event) {
  for (let a in audiosArray) {
    for (let i in sounds) {
      audiosArray[a].src = `${modulePiano(event)}${sounds[a]}`;
    }
  }
}

for (let li of liAudio) {
  li.addEventListener('click', () => {
    audioSrc(event);
    let audio = li.getElementsByTagName('audio')[0];
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  });
}
