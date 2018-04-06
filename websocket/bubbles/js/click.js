'use strinct';

const connection = new WebSocket('ws://neto-api.herokuapp.com/mouse');

showBubbles(connection)

document.addEventListener('click', (event) => {
    let click = {
        x : event.x,
        y : event.y
    }
    connection.send(JSON.stringify(click));
});


