'use strict'
const ACSelect = document.querySelector('#acSelect');
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const seatMapTitle = document.querySelector('#seatMapTitle');
const seatMapDiv = document.querySelector('#seatMapDiv');
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

//запрос на расположения мест в салоне самолета
function requestScheme(event) {
  event.preventDefault();

  fetch(`https://neto-api.herokuapp.com/plane/${ACSelect.value}`)
    .then(res => res.json())
    .then(data => {
      //console.log('data -->', data);
      totalPax.textContent = data.passengers;
      btnSetFull.disabled = false;
      btnSetEmpty.disabled = false;
      totalAdult.textContent = 0;
      totalHalf.textContent = 0;
      showSeatMap(data);

      document.querySelectorAll('div.seat').forEach(seat => {
        seat.addEventListener('click', counterSeat);
      })
    });
}

//html-шаблон рядов сидений в самолёте
function createSeating(seatRow) {
  //console.log('seatRow -->', seatRow);
  return {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-centr'],
    content: [
      {
        tag: 'div', cls: ['col-xs-1', 'row-number'], 
        content: [
          { tag: 'h2', content: seatRow.rowNum }
        ]
      },
      {
        tag: 'div', cls: 'col-xs-5',
        content: seatRow.row1.reduce((row, seat) => {
            row.push((seat) ? { tag: 'div', cls: ['col-xs-4', 'seat'], content: [ { tag: 'span', cls: 'seat-label', content: seat }]} : 
            { tag: 'div', cls: ['col-xs-4', 'no-seat']});
            return row;
        }, [])
      },
      {
        tag: 'div', cls: 'col-xs-5',
        content: seatRow.row1.reduce((row, seat) => {
            row.push((seat) ? { tag: 'div', cls: ['col-xs-4', 'seat'], content: [ { tag: 'span', cls: 'seat-label', content: seat }]} : 
            { tag: 'div', cls: ['col-xs-4', 'no-seat']});
            return row;
        }, [])
      }
    ]
  }
}

//создаем дом-элементы по шаблону
function seatingJsEngine(rows) {
  if ((typeof rows === 'string') || (typeof rows === 'number') || (rows === true)) {
    return document.createTextNode(rows);
  }

  if ((rows === undefined) || (rows === null) || (rows === false)) {
    return document.createTextNode('');
  }

  if (Array.isArray(rows)) {
    return rows.reduce((fragment, elem) => {
      fragment.appendChild(seatingJsEngine(elem));

      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(rows.tag);

  [].concat(rows.cls).filter(Boolean).forEach(className => {

    element.classList.add(className);

  });

  if (rows.attrs) {
    Object.keys(rows.attrs).forEach(key => {
      element.setAttribute(key, rows.attrs[key]);
    });
  }

  element.appendChild(seatingJsEngine(rows.content));

  return element;
}

//показ пассажирских мест, план самолёта
function showSeatMap(seatMap) {
  const seats = document.createDocumentFragment();

  for (let i = 0; i < seatMap.scheme.length; i++) {
    let row1, row2;

    if (seatMap.scheme[i] === 4) {
      row1 = [''].concat(seatMap['letters4'].slice(0, 2));
      row2 = seatMap['letters4'].slice(2, 4).concat(['']);
    } else if (seatMap.scheme[i] === 6) {
      row1 = seatMap['letters6'].slice(0, 3);
      row2 = seatMap['letters6'].slice(3, 6);
    } else {
      row1 = ['', '', ''];
      row2 = row1;
    }
        
    const rows = {
      rowNum: i,
      row1: row1,
      row2: row2
    };
    //console.log('rows -->', rows);
    seats.appendChild(seatingJsEngine(createSeating(rows)));
  }

  seatMapDiv.textContent = '';
  seatMapDiv.appendChild(seats);
}

function clearSeats(event) {
  event.preventDefault();
  const seats = document.querySelectorAll('div.seat');

  if (event.target === btnSetEmpty) {
    //очистить
    seats.forEach(seat => {
      seat.classList.remove('adult');
      seat.classList.remove('half');
    });

    totalAdult.textContent = 0;
    totalHalf.textContent = 0;

  } else if (event.target === btnSetFull) {
    //заполнить
    let className;

    if (event.altKey) {
      className = 'half';
      totalAdult.textContent = 0;
      totalHalf.textContent = totalPax.textContent;
    } else {
      className = 'adult';
      totalAdult.textContent = totalPax.textContent;
      totalHalf.textContent = 0;
    }

    seats.forEach(seat => {
      seat.classList.remove('half');
      seat.classList.remove('adult');
      seat.classList.add(className);
    });
  }
}

function updatePlane() {
  // обновление элементов
  const selectedPlane =  ACSelect.querySelector(`[value="${ ACSelect.value}"]`);
  seatMapTitle.textContent = `Airbus ${selectedPlane.textContent}`;
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
  seatMapDiv.textContent = '';
  seatMapDiv.appendChild(seatingJsEngine({ 
    tag: 'h3', cls: 'text-center', content: 'Нажмите «Показать схему»' 
  }));
}

function counterSeat(event) {
  const targetSeat = (event.target.classList.contains('seat')) ? event.target : event.target.parentNode;

  if (targetSeat.classList.contains('adult')) {
    targetSeat.classList.remove('adult');
    totalAdult.textContent--;

  } else if (targetSeat.classList.contains('half')) {
    targetSeat.classList.remove('half');
    totalHalf.textContent--;

  } else if (event.altKey) {
    targetSeat.classList.add('half');
    totalHalf.textContent++;

  } else {
    targetSeat.classList.add('adult');
    totalAdult.textContent++;
  }
}

document.addEventListener('DOMContentLoaded',  updatePlane);
ACSelect.addEventListener('change',  updatePlane);
btnSeatMap.addEventListener('click',requestScheme);
btnSetFull.addEventListener('click', clearSeats);
btnSetEmpty.addEventListener('click',clearSeats );
