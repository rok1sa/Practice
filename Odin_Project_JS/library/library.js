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


function addText(){

    //
    const isSendClicked = document.getElementById("send").addEventListener("click", function(e){
        div = document.createElement("div");
        div.id ="Div1"
        document.getElementById("Div1").innerHTML = document.getElementById('title').value;
    })

}

/*
function addBookToHTML(){

    /*
    if (document.getElementById("send").click){

    }*/
    //or 
/*
    var isSendClicked = document.getElementById("send").addEventListener("click", function(e){
        if(title.value){
            document.createElement('div');
        }
    })

    var divCreate = document.createElement('div')

    theLibrary.forEach(book =>{

    const bookDDiv = document.createElement('div')

    this.title = title.value;
    this.author = author.value;
    this.pages = pages.value;
    this.isRead = isRead.value;
    //

    libraryDisplay.appendChild(bookDDiv)
})
}*/




/*
function clearAll(){
    const checkIfClicked = getElementById("clearAll").addEventListener("click", function(e){

        title = "";
        author = "";
        pages = "";
    })
}
*/

