const myLibrary = [];

function book(title, author, pages, readStat) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStat = readStat;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages +" pages, " + this.readStat;
    }
}

function submit(e) {    
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
}

const content = document.querySelector('#content');

const book1 = new book('The hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const book2 = new book('To Kill a Mockingbird', 'Harper Lee', 323, 'not read yet');
const book3 = new book('1984', 'George Orwell', 298, 'read');

const bookForm = document.querySelector('#book-form');
bookForm.addEventListener("submit", submit);


