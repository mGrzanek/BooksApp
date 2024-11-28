/* eslint-disable no-empty */
{
  'use strict';

  const select = { 
    templateOf: {
      menuBooks: '#template-book',
    },
    books: {
      bookList: '.books-list',
      bookImage: '.book__image',
    },
  };

  const classNames = {
    favoriteClass: 'favorite',
    bookImage: 'book__image',
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };

  const favoriteBooks = [];
  const booksWrapper = document.querySelector(select.books.bookList);

  const renderBooks = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.menuBooks(book);
      const generatedDomElement = utils.createDOMFromHTML(generatedHTML);
      booksWrapper.appendChild(generatedDomElement);
    }
  };

  const initActions = function(){
    //const bookImages = booksWrapper.querySelectorAll(select.books.bookImage);

    booksWrapper.addEventListener('dblclick', function(event){
      event.preventDefault();
      console.log(event);
      const clickedElement = event.target.offsetParent;
      console.log(clickedElement);
      if(clickedElement.classList.contains(classNames.bookImage)){
        const attributeDataId = clickedElement.getAttribute('data-id');        
        if(favoriteBooks.includes(attributeDataId)){
          clickedElement.classList.remove(classNames.favoriteClass);
          const bookToRemove = favoriteBooks.indexOf(attributeDataId);
          favoriteBooks.splice(bookToRemove, 1);  
        } else {
          clickedElement.classList.add(classNames.favoriteClass);
          favoriteBooks.push(attributeDataId);
        }         
        console.log(favoriteBooks);
      }
    });
    
  };

  renderBooks();
  initActions();
}