'use strict';

function showComments(list) {
  console.log(list);
  const commentsContainer = document.querySelector('.comments');
  const comments = document.createDocumentFragment();
  console.log(comments);
  list.forEach(comment => {
    comments.appendChild(createComment(descriptionComments(comment)));
  });
  commentsContainer.appendChild(comments);
}

function createComment(comment) {
    if ((typeof comment === 'string') || (typeof comment === 'number') || (comment === true)) {
      return document.createTextNode(comment);
    }
  
    if ((comment === undefined) || (comment === null) || (comment === false)) {
      return document.createTextNode('');
    }
  
    if (Array.isArray(comment)) {
      return comment.reduce((fragment, elem) => {
        fragment.appendChild(createComment(elem));
  
        return fragment;
      }, document.createDocumentFragment());
    }
  
    const element = document.createElement(comment.tag);
  
    [].concat(comment.cls).filter(Boolean).forEach(className =>
      element.classList.add(className));
  
    if (comment.attrs) {
      Object.keys(comment.attrs).forEach(key => {
        element.setAttribute(key, comment.attrs[key]);
      });
    }
  
    element.appendChild(createComment(comment.content));
  
    return element;
}

function descriptionComments(comment) {
  return {
    tag: 'div',
    cls: 'comment-wrap',
    content: [
      {
        tag: 'div', 
        cls: 'photo', 
        attrs: { title: comment.author.name },
        content: [ 
          { 
            tag: 'div', 
            cls: 'avatar', 
            attrs: { style: `background-image: url('${comment.author.pic}')` } 
          } ]
      },
      {
        tag: 'div', 
        cls: 'comment-block',
        content: [
          {
            tag: 'p', 
            cls: 'comment-text',
            content:  comment.text.split('\n').reduce((arr, str) => {
              arr.push({
                tag: 'p',
                content: (str) ? str : {tag: 'br'}
              });
              return arr;
            }, [])
          },
          {
            tag: 'div', 
            cls: 'bottom-comment',
            content: [
              {
                tag: 'div', 
                cls: 'comment-date',
                content: new Date(comment.date).toLocaleString('ru-Ru')
              },
              {
                tag: 'ul', 
                cls: 'comment-actions',
                content: [
                  { 
                    tag: 'li', 
                    cls: 'complain', 
                    content: 'Пожаловаться' 
                  },
                  { 
                    tag: 'li', 
                    cls: 'reply', 
                    content: 'Ответить' 
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}


fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
