const theLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadInput = document.getElementById("isRead");

const messageBox = document.getElementById('msgBoxDisplay');

const libraryInput = document.getElementById('libraryInput');

function Book(title, author, pages, isRead){
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.isRead = isRead;

}

function insert(){
    theLibrary.push(titleInput.value);
    theLibrary.push(authorInput.value);
    theLibrary.push(pagesInput.value);
    theLibrary.push(isReadInput.value);

    clearAndShow();
}

function clearAndShow(){
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = 0;
    isRead.value = "";

    messageBox.innerHTML = "";

    messageBox.innerHTML += "Book: " + theLibrary.join('', '') + '<br/>'
}

function addBookToLibrary(){
    //
}

insert();

//const book1 = new Book('Crime and Punishment', "Dostoevsky", 255, false);

//theLibrary.push(book1);

/*
document.getElementById('btnAddBook').onclick = function (){
    const nHTML = '';
    const userInput = prompt('Enter your book: ')

    theLibrary.push(userInput);
    theLibrary.forEach(function(item){
        nHTML += '<li>' + item + '<li>';
    });

    document.getElementById('item-list').innerHTML = '<ul>' + nHTML + '<ul>'
}
*/