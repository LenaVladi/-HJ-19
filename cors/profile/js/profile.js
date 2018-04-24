'use strict';
const
  content = document.querySelector('.content'),
  technologies = content.querySelector('[data-technologies]');

let count = 0;

function profileData(data) {
    for (let key in data) {
        window[key] = document.querySelector(`[data-${key}]`)
    }
    console.log(data);

    pic.src = data.pic;
    name = data.name;
    position.textContent = data.position;
    description.textContent = data.description;

    return `https://neto-api.herokuapp.com/profile/${data.id}/technologies`
}

function technoData(data) {
    let techData = '';  

    data.forEach(tech => {
        techData += `<span class="devicons devicons-${tech}"></span>`
    });
    technologies.innerHTML = techData;  
    content.style = 'display: initial';
}

function nextName() {
    return ('count' + count++);
}

function loadData(url) {
    const functionName = nextName();
    return new Promise((done, fail) => {
        window[functionName] = done;
        let script = document.createElement('script');
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    });
}

loadData('https://neto-api.herokuapp.com/profile/me')
    .then(res => profileData(res))
    .then(res => loadData(res))
    .then(res => technoData(res))
    .catch(er => console.log(er));



