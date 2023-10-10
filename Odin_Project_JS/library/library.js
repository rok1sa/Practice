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

function check(){
    readStatusBtn.checked = true;
}
function uncheck(){
    readStatusBtn.checked = false;
}

function renderBooks() {
    let container = document.getElementById('booksDiv');
    container.innerHTML = "";

    theLibrary.forEach(function(book, index) {
    let div = document.createElement("div");
    div.classList.add("book-div-style");

    
    let titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    div.appendChild(titleElement);

    let authorElement = document.createElement('p');
    authorElement.textContent = "Author: " + book.author;
    div.appendChild(authorElement);

    let pagesElement = document.createElement('p');
    pagesElement.textContent = "# Of Pages: " + book.pages;
    div.appendChild(pagesElement);


    
    let isReadElement = document.createElement('p');
    isReadElement.textContent = "Is Book Read: " + book.isRead;
    div.appendChild(isReadElement);
    let readStatusCB = document.createElement('input');
    readStatusCB.type = 'checkbox';
    readStatusCB.textContent = "Change book's status";
    div.appendChild(readStatusCB);

    


    //func changing read stat

    readStatusCB.addEventListener("change", function(){
        function changeReadStatus(){
            if (readStatusCB.value = true){
                book.isRead = "Read";
                renderBooks();
            }
            else{
                book.isRead = "Not read yet";
                renderBooks();
            }
        }
    })
    
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener('click', function(){
        theLibrary.splice(index, 1)
        container.removeChild(div);
        renderBooks();
    });

    div.appendChild(deleteBtn);

    container.appendChild(div);
});

};

document.getElementById('sendBtn').addEventListener('click', handleSubmit);

