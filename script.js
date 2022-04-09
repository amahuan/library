const bookForm=document.querySelector('form');
let myLibrary = [];

class Book {
    constructor(title,author,pages,progress){
        this.title=title;
        this.author=author;
        this.pages=parseInt(pages);
        this.progress=progress;
        this.recommend="Unsure";
        this.id=this.title.slice(0, 3).toUpperCase() + this.title.slice(-3).toUpperCase() + this.pages;
    }
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const progress = document.querySelector('input[type="radio"]:checked').value;
    return new Book(title, author, pages, progress);
  }
  
const addBook = (e) => {
    const errorMsg=document.getElementsByClassName('error')[0];
    e.preventDefault()
    const newBook = getBookFromInput()
    if(myLibrary.some(book=>book.id===newBook.id)){
        errorMsg.textContent = 'This book already exists in your library';
    }
    else {
    myLibrary.push(newBook);
    closeAddBookModal();
    bookForm.reset();
    errorMsg.textContent = '';
    updateBooks();
    }
  }

const submitButton=document.querySelector('#submit');
bookForm.addEventListener('submit',addBook);

const addButton=document.getElementById('addbook');
const modal=document.getElementsByClassName('modal')[0];
addButton.addEventListener('click',()=>{
     modal.style.display="flex";
 });

function closeAddBookModal() {
    modal.style.display="none";
  }

const bookList = document.querySelector('.books-grid');
function updateBooks() {
    bookList.querySelectorAll('div').forEach(n => n.remove());
  
    for (let i = 0; i < myLibrary.length; i++) {
      createBook(myLibrary[i]);
    }
  }

  function filterReadBooks(){
    bookList.querySelectorAll('div').forEach(n => n.remove());
    var readLibrary=myLibrary.filter(element=>(element['progress']==="Read"));
    for (let i = 0; i < readLibrary.length; i++) {
      createBook(readLibrary[i]);
    }
  }
  function filterUnreadBooks(){
    bookList.querySelectorAll('div').forEach(n => n.remove());
    var unreadLibrary=myLibrary.filter(element=>(element['progress']==="Unread"));
    for (let i = 0; i < unreadLibrary.length; i++) {
      createBook(unreadLibrary[i]);
    }
  }

  function filterIpBooks(){
    bookList.querySelectorAll('div').forEach(n => n.remove());
    var ipLibrary=myLibrary.filter(element=>(element['progress']==="In-Progress"));
    for (let i = 0; i < ipLibrary.length; i++) {
      createBook(ipLibrary[i]);
    }
  }

  function filterRecBooks(){
    bookList.querySelectorAll('div').forEach(n => n.remove());
    var recLibrary=myLibrary.filter(element=>(element['recommend']==="Yes"));
    for (let i = 0; i < recLibrary.length; i++) {
      createBook(recLibrary[i]);
    }
  }

const totalPanel=document.getElementById('totalFilter');
const readPanel=document.getElementById('readFilter');
const unreadPanel=document.getElementById('unreadFilter');
const ipPanel=document.getElementById('ipFilter');
const recBooks=document.getElementById('recFilterButton');

readPanel.addEventListener('click', filterReadBooks);
unreadPanel.addEventListener('click', filterUnreadBooks);
ipPanel.addEventListener('click', filterIpBooks);
totalPanel.addEventListener('click',updateBooks);
recBooks.addEventListener('click',()=>{
    if(recBooks.textContent==="See Recommended"){
        filterRecBooks();
        recBooks.textContent="See All";
    }
    else if(recBooks.textContent==="See All"){
        updateBooks();
        recBooks.textContent="See Recommended";
    }
});

function createBook(item) {
    const bookCard=document.createElement('div');
    bookCard.className='bookCard';
    bookCard.setAttribute('id','item.id');

    const cardTitle=document.createElement('h3');
    cardTitle.setAttribute('id','card-title');

    const pAuthor=document.createElement('p');
    pAuthor.setAttribute('id','card-author');

    const pPages=document.createElement('p');
    pPages.setAttribute('id','card-pages');

    const buttonsDiv=document.createElement('div');
    buttonsDiv.className='buttons';
    const pStatus=document.createElement('p');
    pStatus.setAttribute('id','cardStatus');
    const buttonStatus=document.createElement('button'); 
    buttonStatus.setAttribute('id','readStatus');
    const pRec=document.createElement('p');
    pRec.setAttribute('id','card-rec');
    const buttonRec=document.createElement('button');
    buttonRec.setAttribute('id','recommend');
    buttonRec.className=item.recommend;
    const pRemove=document.createElement('p');
    pRemove.setAttribute('id','card-del');
    const buttonRemove=document.createElement('button');
    buttonRemove.setAttribute('id','remove');
    buttonRemove.className='book-remove';

    const recFilter=document.getElementsByClassName('recFilter')[0];

    bookList.appendChild(bookCard);

    bookCard.appendChild(cardTitle);
    bookCard.appendChild(pAuthor);
    bookCard.appendChild(pPages);
    bookCard.appendChild(buttonsDiv);

    cardTitle.textContent=item.title;
    pAuthor.textContent=item.author;
    pPages.textContent=`${item.pages} pages`;

    buttonsDiv.appendChild(pStatus);
    buttonsDiv.appendChild(buttonStatus);
    buttonsDiv.appendChild(pRec);
    buttonsDiv.appendChild(buttonRec);
    buttonsDiv.appendChild(pRemove);
    buttonsDiv.appendChild(buttonRemove);

    pStatus.textContent='Status';
    if(item.progress==="Read"){
        bookCard.classList.add("book-read");
        buttonStatus.classList.add("book-read");
        buttonStatus.textContent=item.progress;
    }
    else if(item.progress==='Unread'){
        bookCard.classList.add("book-unread");
        buttonStatus.classList.add("book-unread");
        buttonStatus.textContent=item.progress;
    }

    else if(item.progress==='In-Progress'){
        bookCard.classList.add("book-ip");
        buttonStatus.classList.add("book-ip");
        buttonStatus.textContent=item.progress;
    }
    
    pRec.textContent='Recommend?';
    buttonRec.textContent=item.recommend;
    pRemove.textContent='Not interested?';
    buttonRemove.textContent='Remove';
    recFilter.classList.add('show');
    updateStats();

buttonStatus.addEventListener('click',()=>{
    if(buttonStatus.textContent==="Unread"){
        item.progress="In-Progress";
        buttonStatus.textContent="In-Progress";
        bookCard.className="bookCard book-ip";
        buttonStatus.className="book-ip";
    }
    else if(buttonStatus.textContent==="In-Progress"){
        item.progress="Read";
        buttonStatus.textContent="Read";
        bookCard.className="bookCard book-read";
        buttonStatus.className="book-read";
    }
    else if(buttonStatus.textContent==="Read"){
        item.progress="Unread";
        buttonStatus.textContent="Unread";
        bookCard.className="bookCard book-unread";
        buttonStatus.className="book-unread";
    }
    updateStats();
});

buttonRec.addEventListener('click',()=>{
    if(buttonRec.textContent==="Unsure"){
        item.recommend="Yes";
        buttonRec.textContent=item.recommend;
        buttonRec.className=item.recommend;
    }
    else if(buttonRec.textContent==="Yes"){
        item.recommend="No";
        buttonRec.textContent=item.recommend;
        buttonRec.className=item.recommend;
    }
    else if(buttonRec.textContent==="No"){
        item.recommend="Unsure";
        buttonRec.textContent=item.recommend;
        buttonRec.className=item.recommend;
    }
    updateStats();
});

buttonRemove.addEventListener('click',()=>{
    myLibrary.splice(myLibrary.indexOf(item),1);
    updateBooks();
    updateStats();
});
}

function updateStats() {
    var totalCount=myLibrary.length;
    var readCount=0;
    var unreadCount=0;
    var inProgressCount=0;  
    const totalStat=document.getElementById('stats-total');
    const readStat=document.getElementById('stats-read');
    const unreadStat=document.getElementById('stats-unread');
    const ipStat=document.getElementById('stats-ip');
    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i]['progress']==="Read"){
            readCount++;
        }
        else if(myLibrary[i]['progress']==="Unread"){
            unreadCount++;
        }
        else if(myLibrary[i]['progress']==="In-Progress"){
            inProgressCount++;
        }
    }
    totalStat.innerHTML=`${totalCount}`;
    readStat.innerHTML=`${readCount}`;
    unreadStat.innerHTML=`${unreadCount}`;
    ipStat.innerHTML=`${inProgressCount}`;
}

window.addEventListener('click',(event)=>{
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
