'use strick';
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const audio = mediaplayer.getElementsByTagName('audio')[0];
const title = mediaplayer.getElementsByClassName('title')[0];
const playPause = mediaplayer.getElementsByClassName('playstate')[0];
const stop = mediaplayer.getElementsByClassName('stop')[0];
const back = mediaplayer.getElementsByClassName('back')[0];
const next = mediaplayer.getElementsByClassName('next')[0];
const play = playPause.getElementsByClassName('fa-play')[0];
const pause = playPause.getElementsByClassName('fa-pause')[0];
const musics = ['./mp3/LA Chill Tour.mp3', './mp3/LA Fusion Jam.mp3', './mp3/This is it band.mp3'];
const titles = ['LA Chill Tour', 'LA Fusion Jam', 'This is it band'];

console.log(mediaplayer, audio, title, playPause, stop, back, next, play, pause);
console.log(play.className);

playPause.onclick = () => {
  if(play.classList.contains('fa-play')){
    audio.play();
    play.classList.remove('fa-play');
    mediaplayer.classList.add('play');
    pause.classList.add('fa-pause');
  } else {
    audio.pause();
    pause.classList.remove('fa-pause');
    mediaplayer.classList.remove('play');
    play.classList.add('fa-play');
  }
}

stop.onclick = () => {
  audio.pause();
  audio.currentTime = 0;
  play.classList.add('fa-play');
}

let n = 0;
function nextBackSong(i) {
  n = (i+musics.length)%musics.length;
  audio.src = musics[n];
  return audio.src;
}

function titleList(i) {
  n = (i+titles.length)%titles.length;
  title.title = titles[n];
  return title.title;
}

function nextSong() {
  nextBackSong(n+1);
  titleList(n+1);
}

function backSong() {
  nextBackSong(n-1);
  titleList(n-1);
}

next.onclick = nextSong;
back.onclick = nextSong;
