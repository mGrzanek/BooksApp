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

  class BooksList {
    constructor(){
      const thisBookList = this;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.renderBooks();
      thisBookList.getElements();
      thisBookList.initActions();
    }

    renderBooks(){
      const thisBookList = this;

      for(let book of dataSource.books){ 
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = thisBookList.setRatingWidth(book.rating);
        const generatedHTML = templates.menuBooks(book);
        const generatedDomElement = utils.createDOMFromHTML(generatedHTML);
        thisBookList.booksWrapper = document.querySelector(select.books.bookList);
        thisBookList.booksWrapper.appendChild(generatedDomElement);
      }
    }

    getElements(){
      const thisBookList = this;

      thisBookList.dom = {};
      thisBookList.dom.formWrapper = document.querySelector(select.form.formWrapper);
    }

    initActions(){
      const thisBookList = this; 

      thisBookList.dom.formWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        console.log(clickedElement);
        if(clickedElement.tagName === 'INPUT'
          && clickedElement.name === 'filter'
          && clickedElement.type === 'checkbox'
        ){
          if(clickedElement.checked){
            thisBookList.filters.push(clickedElement.value);
            thisBookList.booksFilter();
          } else {
            const valueToRemove = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(valueToRemove, 1);
            thisBookList.booksFilter();
          }
          console.log('filters: ', thisBookList.filters);
        }
      });
  
      thisBookList.booksWrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        console.log(event);
        const clickedElement = event.target.offsetParent;
        console.log(clickedElement);
        if(clickedElement.classList.contains(classNames.bookImage)){
          const attributeDataId = clickedElement.getAttribute('data-id');        
          if(thisBookList.favoriteBooks.includes(attributeDataId)){
            clickedElement.classList.remove(classNames.favoriteClass);
            const bookToRemove = thisBookList.favoriteBooks.indexOf(attributeDataId);
            thisBookList.favoriteBooks.splice(bookToRemove, 1);  
          } else {
            clickedElement.classList.add(classNames.favoriteClass);
            thisBookList.favoriteBooks.push(attributeDataId);
          }         
          console.log(thisBookList.favoriteBooks);
        }
      });
      
    }

    determineRatingBgc(rating){
      if(rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating >9){
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }

    setRatingWidth(rating){
      return `${rating * 10}`;
    }

    booksFilter(){
      const thisBookList = this;
      
      for(let book of dataSource.books){
        let shouldBeHidden = false;
        const bookToHidden = thisBookList.booksWrapper.querySelector(`.book__image[data-id="${book.id}"]`);
        console.log('bookToHidden: ', bookToHidden);
        for(let filter of thisBookList.filters){
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
    }
  }

  const app = new BooksList();
}