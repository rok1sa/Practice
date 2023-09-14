const theLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function addBookToLibrary(){ 
}

const book1 = new Book('Title', "Author", 255, false);

theLibrary.push(book1);
console.log(theLibrary);

document.write(theLibrary);