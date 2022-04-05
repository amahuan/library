let myLibrary = [];

class Book {
    constructor(title,author,pages,status="unread"){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.status=status;
    }

    addBookToLibrary() {

  