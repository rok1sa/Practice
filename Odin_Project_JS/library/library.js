title = document.getElementById("title").value;    
author = document.getElementById("author").value;
pages = document.getElementById('pages').value;
isRead = document.getElementById('isRead').value;
//sendBtn = document.getElementById("send");


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

// there needs to be a func that will create new div for each book added and 
// this func that creates divs also needs to assign id 
// (or something to distinguish each div from each other)
// to the div & assign values entered by user from a form.
function addText(){
    document.getElementById("book1Div").innerHTML = document.getElementById("title").value;
}

/*
function addText(){

    //
    const isSendClicked = document.getElementById("send").addEventListener("click", function(e){
        div = document.createElement("div");
        div.id ="Div1"
        document.getElementById("Div1").innerHTML = document.getElementById('title').value;
    })

}*/

