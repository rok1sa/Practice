const Book= class{
    constructor(author, title, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

var dataSubmittingForm = document.getElementById("send").addEventListener("click", function(){

    var newBook = new Book();
    newBook.title = document.getElementById("title").value;    
    newBook.author = document.getElementById("author").value;
    newBook.pages = document.getElementById('pages').value;
    newBook.isRead = document.getElementById('isRead').value;

    const prevent = function(){
        var form = document.querySelector("form").addEventListener("click", function(event){
    
            event.preventDefault();
        })
    }
    
    prevent();

    console.log(newBook);
    theLibrary.push(newBook);
    console.log(theLibrary);

})

const theLibrary = [
    
];

/*
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadInput = document.getElementById("isRead");
//
const messageBox = document.getElementById('msgBoxDisplay');
const libraryInput = document.getElementById('libraryInput');
*/
/*
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
    titleInput = Book.title;
    authorInput = Book.author;
    pagesInput = Book.pages;
    isReadInput = Book.isRead;

    display(Book.title);
}

addBookToLibrary();

insert();
*/

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