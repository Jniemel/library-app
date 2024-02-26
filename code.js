const myLibrary = [];
const content = document.querySelector('#content');
const bookForm = document.querySelector('#book-form');
bookForm.addEventListener("submit", submitBook);
let cardClass = 'card';
let cardTitleClass = 'card-title';
let cardAuthorClass = 'card-author';
let cardPagesClass = 'card-pages';
let cardReadNoClass = 'card-read-no';
let cardReadYesClass = 'card-read-yes';


function book(title, author, pages, readStat) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStat = readStat;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages +" pages, book read: " + this.readStat;
    }
}

function submitBook(e) {    
    e.preventDefault();
    const formData = new FormData(e.target);
    title = formData.get("book-title"); 
    author = formData.get("book-author");
    pages = formData.get("book-pages");
    readStat = formData.get("book-readStat");
    const addBook = new book(title, author, pages, readStat);
    myLibrary.push(addBook);
    displayLibrary();
}

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



function displayLibrary() {

    let childItems = content.childElementCount;
    let books = myLibrary.length;

    if (books > childItems) {
        for (i = childItems; i < books; i++) {
            // create new card, set class and data-entry attribute
            const newCard = document.createElement('div');
            newCard.classList = cardClass;
            newCard.setAttribute('data-card', i); 
            // create p-elements for book title, author, pages and read status
            // title
            const pTitle = document.createElement('p');
            pTitle.classList = cardTitleClass;            
            pTitle.textContent = "Title: " + myLibrary[i].title;
            // author     
            const pAuthor = document.createElement('p'); 
            pAuthor.classList = cardAuthorClass;           
            pAuthor.textContent = "Author: " + myLibrary[i].author;
            // pages
            const pPages = document.createElement('p'); 
            pPages.classList = cardPagesClass;        
            pPages.textContent = "Pages: " + myLibrary[i].pages;
            // read status
            const pReadStat = document.createElement('p');             
            pReadStat.textContent = "Read: " + myLibrary[i].readStat;
            if (myLibrary[i].readStat === 'Yes') {
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
            // append elements
            newCard.appendChild(pTitle);
            newCard.appendChild(pAuthor);            
            newCard.appendChild(pPages);
            newCard.appendChild(pReadStat);
            newCard.appendChild(readStatBtn);
            newCard.appendChild(removeBtn);
            content.appendChild(newCard);        
        }
    }
}

const book1 = new book('The hobbit', 'J.R.R. Tolkien', 295, 'No');
myLibrary.push(book1);
const book2 = new book('To Kill a Mockingbird', 'Harper Lee', 323, 'No');
myLibrary.push(book2);
const book3 = new book('1984', 'George Orwell', 298, 'No');
myLibrary.push(book3);

displayLibrary();



