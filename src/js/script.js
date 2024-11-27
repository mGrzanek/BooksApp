/* eslint-disable no-empty */
{
  'use strict';

  const select = { 
    templateOf: {
      menuBooks: '#template-book',
    },
    books: {
      bookList: '.books-list',
    },
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };



  const renderBooks = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.menuBooks(book);
      const booksWrapper = document.querySelector(select.books.bookList);
      const generatedDomElement = utils.createDOMFromHTML(generatedHTML);
      booksWrapper.appendChild(generatedDomElement);
    }
  };

  renderBooks();
}