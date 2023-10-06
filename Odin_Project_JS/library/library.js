/*title = document.getElementById("title").value;   //The broken code  
author = document.getElementById("author").value;
pages = document.getElementById('pages').value;
isRead = document.getElementById('isRead').value;
//let container = document.getElementById('booksDiv'); 

let theLibrary = [
    
];

const Book= class{
    constructor(author, title, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

const handleSubmit = function(){
    let form = document.querySelector("form").addEventListener("click", function(event){
        event.preventDefault();
    });
}


var dataSubmittingForm = document.getElementById("submitBtn").addEventListener("click", function(){
let newBook = {title: title, author: author, pages: pages, isRead: isRead};
theLibrary.push(newBook);
document.getElementById('title').value = "";
document.getElementById('author').value = "";
document.getElementById('pages').value = "";
renderBooks();
function renderBooks(){
    let container = document.getElementById('booksDiv'); 
    container.innerHTML = "";
    theLibrary.forEach(function(book){
        let div = document.createElement("div");
        div.innerHTML = `Title: ${book.title} Author: ${book.author} Pages: ${book.pages} Is book read: ${book.isRead}`;
        container.appendChild(div);
    });   
}

});

theLibrary.length = 0;

document.querySelector('form').addEventListener('click', handleSubmit);
*/

let theLibrary = [];

class Book {
constructor(author, title, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}
}

const handleSubmit = function(event) {
event.preventDefault();

let title = document.getElementById("title").value;
let author = document.getElementById("author").value;
let pages = document.getElementById('pages').value;
let isRead = document.getElementById('isRead').value;

let newBook = new Book(author, title, pages, isRead);
theLibrary.push(newBook);

document.getElementById('title').value ="";
document.getElementById('author').value ="";
document.getElementById('pages').value ="";

renderBooks();
}

function renderBooks() {
let container = document.getElementById('booksDiv');
container.innerHTML = "";

theLibrary.forEach(function(book) {
    let div = document.createElement("div");
    div.innerHTML = `Title: ${book.title}
Author: ${book.author}
Pages: ${book.pages}
Is Read: ${book.isRead}`;

    container.appendChild(div);
});
}

document.getElementById('sendBtn').addEventListener('click', handleSubmit);

console.log(title);