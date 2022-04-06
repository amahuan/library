let myLibrary = [];

class Book {
    constructor(title,author,pages,status="unread"){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.status=status;
    }

    addBookToLibrary() {

    }
}


 const addButton=document.getElementById('addbook');
 const modal=document.getElementsByClassName('modal')[0];
 addButton.addEventListener('click',()=>{
     modal.style.display="flex";
 });

 