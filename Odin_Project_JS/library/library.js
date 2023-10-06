title = document.getElementById("title").value;    
author = document.getElementById("author").value;
pages = document.getElementById('pages').value;
isRead = document.getElementById('isRead').value;
let container = document.getElementById('booksDiv'); 

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

/*class Book {
    constructor(author, title, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    }
}*/

function handleSubmit(event){
    event.preventDefault();
}

/*const handleSubmit = function(){
    let form = document.querySelector("form").addEventListener("click", function(event){
        event.preventDefault();
    });
}*/

/*var dataSubmittingForm = document.getElementById("send").addEventListener("click", function(){

    //let newBook = {title: title, author: author, pages: pages, isRead: isRead};
    //newBook.title = document.getElementById("title").value;    
    //newBook.author = document.getElementById("author").value;
    //newBook.pages = document.getElementById('pages').value;
    //newBook.isRead = document.getElementById('isRead').value;

    const prevent = function(){
        let form = document.querySelector("form").addEventListener("click", function(event){
            event.preventDefault();
        });
    }
    prevent();

    //console.log(newBook);
    //theLibrary.push(newBook);
    console.log(theLibrary);

});*/

var dataSubmittingForm = document.getElementById("sendBtn").addEventListener("click", function(){
let newBook = {title: title, author: author, pages: pages, isRead: isRead};
theLibrary.push(newBook);
document.getElementById('title').value ="";
document.getElementById('author').value ="";
document.getElementById('pages').value ="";
renderBooks();
function renderBooks(){
    let container = document.getElementById('booksDiv'); 
    container.innerHTML ="";
    theLibrary.forEach(function(book){
        let div = document.createElement("div");
        div.innerHTML = `Title: ${book.title} Author: ${book.author} Pages: ${book.pages} Is book read: ${book.isRead}`;
        container.appendChild(div);
    });   
}

});

theLibrary.length = 0;

document.querySelector('form').addEventListener('click', handleSubmit);

/*
theLibrary.forEach(function(object,index){
    let div = document.createElement("div");
    div.id = "object-" + index;
    div.innerHTML = `Title: ${object.title} Author: ${object.author} Pages: ${object.pages} isRead: ${object.isRead}`;
    container.appendChild(div);
});*/



/*
const displayBook = document.getElementById("booksDiv");
myLibrary.forEach(function(object){
    let objectDiv = document.createElement("div");
    objectDiv = "Title:" +object.title + "Author: " + object.author + "Pages: " + object.pages + "Is book read?: " + object.isRead;
});
*/

/*
const container = document.getElementById('booksDiv');
    theLibrary.forEach(function(e){
        container.append('<div>' + e + '</div>');
        container.innerHTML+='<div> class="booksDiv></div';
});
*/


