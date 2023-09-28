title = document.getElementById("title").value;    
author = document.getElementById("author").value;
pages = document.getElementById('pages').value;
isRead = document.getElementById('isRead').value;


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

function clearAll(){
    const checkIfClicked = getElementById("clearAll").addEventListener("click", function(e){

        title = "";
        author = "";
        pages = "";
    })
}

