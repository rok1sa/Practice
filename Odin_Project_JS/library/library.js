const theLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function addBookToLibrary(){
}

const book1 = Object.create(Book);

/*function displayBooks(theLibrary){
    theLibrary.forEach(x => console.log(x));
    call.Book();
}*/

document.getElementById('.booksDiv').innerHTML 
