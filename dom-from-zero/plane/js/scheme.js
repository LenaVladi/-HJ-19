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
      totalPax.textContent = data.passengers;
      btnSetFull.disabled = false;
      btnSetEmpty.disabled = false;
      totalAdult.textContent = 0;
      totalHalf.textContent = 0;
      showSeatMap(data);

      document.querySelectorAll('div.seat').forEach(seat => {
        seat.addEventListener('click', clickOnSeat);
      })
    });
}

//html-шаблон рядов сидений в самолёте
function createSeatingRow(seatRow) {
  return {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-centr'],
    content: [
      {
        tag: 'div', cls: ['col-xs-1', 'row-number'], // проверить шаблон места
        content: [
          { tag: 'h2', content: saetRow.rowNum }
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
function rowJsEngine(rows) {
  if ((typeof rows === 'string') || (typeof rows === 'number') || (rows === true)) {
    return document.createTextNode(rows);
  }

  if ((rows === undefined) || (rows === null) || (rows === false)) {
    return document.createTextNode('');
  }

  if (Array.isArray(rows)) {
    return rows.reduce((fragment, elem) => {
      fragment.appendChild(rowJsEngine(elem));

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

  element.appendChild(rowJsEngine(rows.content));

  return element;
}

//показ пассажирских мест по клику
function showSeatMap(seatMap) {
  const seats = document.createDocumentFragment();

  for (let i = 0; i < seatMap.scheme.length; i++) {
    let row1, row2;
    console.log(seatMap.scheme, seatMap);
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

    seats.appendChild(rowJsEngine(createSeatingRow(rows)));
  }

  seatMapDiv.textContent = '';
  seatMapDiv.appendChild(seats);
}





document.addEventListener('DOMContentLoaded', selectedPlane);
ACSelect.addEventListener('change', selectedPlane);
btnSeatMap.addEventListener('click', requestScheme);
btnSetFull.addEventListener('click', fillSeats);
btnSetEmpty.addEventListener('click',fillSeats );