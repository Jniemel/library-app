// init library-array
const myLibrary = [];
// reference elements
const content = document.querySelector('#content');
const bookForm = document.querySelector('#book-form');
bookForm.addEventListener("submit", submitBook);
// css-class variables
let cardClass = 'card';
let cardTitleClass = 'card-title';
let cardAuthorClass = 'card-author';
let cardPagesClass = 'card-pages';
let cardReadNoClass = 'card-read-no';
let cardReadYesClass = 'card-read-yes';

// book-object constructor
function book(title, author, pages, readStat) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStat = readStat;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages +" pages, book read: " + this.readStat;
    }
}

// create a new book object according to form, submit to library & display it
function submitBook(e) {    
    e.preventDefault();
    const formData = new FormData(e.target);
    title = formData.get("book-title"); 
    author = formData.get("book-author");
    pages = formData.get("book-pages");
    readStat = formData.get("book-readStat");
    const addBook = new book(title, author, pages, readStat);
    let index = myLibrary.push(addBook);
    createCard(index-1);
}

// change read status of the book displayed in library
function changeReadStat(e) {
    let refValue = e.target.attributes["data-reference"].value;    
    const cardToChange = document.querySelector("[data-card=" + CSS.escape(refValue) + "]");    
    let pToChange = '';
    if (cardToChange.querySelectorAll(".card-read-no").length > 0) {
        pToChange = cardToChange.querySelector(".card-read-no");
        myLibrary[refValue].readStat = 'Yes';
        pToChange.classList = cardReadYesClass;       
        pToChange.textContent = "Read: " + myLibrary[refValue].readStat;
    } else {
        pToChange = cardToChange.querySelector(".card-read-yes");
        myLibrary[refValue].readStat = 'No';
        pToChange.classList = cardReadNoClass;       
        pToChange.textContent = "Read: " + myLibrary[refValue].readStat;
    }
}

// remove book from the app (display card and entry from library-array)
function removeBook(e) {
    let refValue = e.target.attributes["data-reference"].value;    
    let cardToRemove = document.querySelector("[data-card=" + CSS.escape(refValue) + "]");    
    cardToRemove.remove();
    myLibrary.splice(refValue, 1);
    rearrangeDataAttr();    
}

// renumber data-card attribute after removing a book
function rearrangeDataAttr() {
    const toRearrange = content.querySelectorAll('.card');
    let index = 0;        
    toRearrange.forEach((card) => {
        card.setAttribute('data-card', index);        
        const buttons = card.querySelectorAll('button');        
        buttons.forEach((button) => {            
            button.setAttribute('data-reference', index);
        });
        index += 1;        
    });
}

// create a dispaly card for the book
function createCard(arrayIndex) {
    let index = arrayIndex;        
     // create new card, set class and data-card attribute (index of the book in the myLibrary-array)
     const newCard = document.createElement('div');
     newCard.classList = cardClass;
     newCard.setAttribute('data-card', index); 
     // create p-elements for book title, author, pages and read status
     // title
     const pTitle = document.createElement('p');
     pTitle.classList = cardTitleClass;            
     pTitle.textContent = "Title: " + myLibrary[index].title;
     // author     
     const pAuthor = document.createElement('p'); 
     pAuthor.classList = cardAuthorClass;           
     pAuthor.textContent = "Author: " + myLibrary[index].author;
     // pages
     const pPages = document.createElement('p'); 
     pPages.classList = cardPagesClass;        
     pPages.textContent = "Pages: " + myLibrary[index].pages;
     // read status
     const pReadStat = document.createElement('p');             
     pReadStat.textContent = "Read: " + myLibrary[index].readStat;
     if (myLibrary[index].readStat === 'Yes') {
         pReadStat.classList = cardReadYesClass;
     } else {
         pReadStat.classList = cardReadNoClass;
     }
     // read status button
     readStatBtn = document.createElement('button');
     readStatBtn.setAttribute('data-reference', newCard.dataset.card);
     readStatBtn.textContent = "Change read status";
     readStatBtn.addEventListener('click', changeReadStat)
     // remove book button
     removeBtn = document.createElement('button');
     removeBtn.setAttribute('data-reference', newCard.dataset.card);
     removeBtn.textContent = "Remove entry";
     removeBtn.addEventListener('click', removeBook)
     // append elements
     newCard.appendChild(pTitle);
     newCard.appendChild(pAuthor);            
     newCard.appendChild(pPages);
     newCard.appendChild(pReadStat);
     newCard.appendChild(readStatBtn);
     newCard.appendChild(removeBtn);
     content.appendChild(newCard);             
}
