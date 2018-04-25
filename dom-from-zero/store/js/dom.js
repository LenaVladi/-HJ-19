'use strict';

function createElement(teamplate) {
  if ((typeof teamplate === 'string') || (typeof teamplate === 'number') || (teamplate === true)) {
    return document.createTextNode(teamplate);
  }

  if ((teamplate === undefined) || (teamplate === null) || (teamplate === false)) {
    return document.createTextNode('');
  } 

  if (Array.isArray(teamplate)) {
    return teamplate.reduce((fragment, elem) => {
      fragment.appendChild(createElement(elem));

      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(teamplate.tag);
  teamplate.props && Object.keys(teamplate.props).forEach(function(key) {
    if (teamplate.props[key]) element.setAttribute(key, teamplate.props[key]);
  });

  if (teamplate.attrs) {
    Object.keys(teamplate.attrs).forEach(key => {
      element.setAttribute(key, teamplate.attrs[key]);
    });
  }
  
  if (teamplate.childs) element.appendChild(createElement(teamplate.childs));

  return element;
}