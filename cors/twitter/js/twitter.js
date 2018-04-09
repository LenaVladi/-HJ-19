'use strict';

function loadData(jsonp) {
    return new Promise((done, fail) => {
        //window.alena = done;
        let script = document.createElement('script');
        script.src = jsonp;
        document.body.appendChild(script);
    });
}; 
  

function callback(twit) {
    //console.log(twit);
    const pic = document.querySelector('img[data-pic]');
    pic.src = twit.pic;
    const username = document.querySelector('h3[data-username]');
    username.textContent = twit.username;
    const wallpaper = document.querySelector('img[data-wallpaper]');
    wallpaper.src = twit.wallpaper;
    const description = document.querySelector('p[data-description]');
    description.textContent = twit.description;
    const tweets = document.querySelector('output[data-tweets]');
    tweets.innerHTML = twit.tweets;
    const followers = document.querySelector('output[data-followers]');
    followers.textContent = twit.followers;
    const following = document.querySelector('output[data-following]');
    following.textContent = twit.following;
}


loadData('https://neto-api.herokuapp.com/twitter/jsonp')
.then(res => showTwit(res)).catch(er => console.log(er));
