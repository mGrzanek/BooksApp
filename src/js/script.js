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
    form: {
      formWrapper: '.filters',
    },
  };

  const classNames = {
    favoriteClass: 'favorite',
    bookImage: 'book__image',
    shouldHidden: 'hidden',
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];

  const booksWrapper = document.querySelector(select.books.bookList);
  const formWrapper = document.querySelector(select.form.formWrapper);

  const renderBooks = function(){
    for(let book of dataSource.books){
      const generatedHTML = templates.menuBooks(book);
      const generatedDomElement = utils.createDOMFromHTML(generatedHTML);
      booksWrapper.appendChild(generatedDomElement);
    }
  };

  const booksFilter = function(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;
      const bookToHidden = booksWrapper.querySelector(`.book__image[data-id="${book.id}"]`);
      console.log('bookToHidden: ', bookToHidden);
      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){  
        bookToHidden.classList.add(classNames.shouldHidden);
      } else {
        bookToHidden.classList.remove(classNames.shouldHidden);
      }
    }
  };

  const initActions = function(){
    
    formWrapper.addEventListener('click', function(event){
      const clickedElement = event.target;
      console.log(clickedElement);
      if(clickedElement.tagName === 'INPUT'
        && clickedElement.name === 'filter'
        && clickedElement.type === 'checkbox'
      ){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          booksFilter();
        } else {
          const valueToRemove = filters.indexOf(clickedElement.value);
          filters.splice(valueToRemove, 1);
          booksFilter();
        }
        console.log('filters: ', filters);
      }
    });

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