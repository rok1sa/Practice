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

    theLibrary.forEach(function(book, index) {
    let div = document.createElement("div");
    // you can style div individually with Inline Styling:
    // ex -> div.style.backgroundColor = "someColor"; 
    // or using CSS classes div.classList.add("book-div-style");
    // the second method is more flexible. Use first only for individual div styling.
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
    

    //div.innerHTML = `Title: ${book.title}Author: ${book.author}Pages: ${book.pages}Is Read: ${book.isRead}`;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener('click', function(){
        theLibrary.splice(index, 1)
        container.removeChild(div);
        renderBooks();
        //renderBooks();
        //renderBooksTable();
    });

    div.appendChild(deleteBtn);

    container.appendChild(div);
});

    //renderBooksTable();
};

document.getElementById('sendBtn').addEventListener('click', handleSubmit);

// code that will sort/organize books as TABLE cells.
/*
function renderBooksTable(){
    let table = document.createElement("table");

    for (let i = 0; i < theLibrary.length; i++){
        let book = theLibrary[i];
        let row = document.createElement("tr");

        // keep this code if you want to display books as a table cells
        
        let titleCell = document.createElement('td');
        titleCell.textContent = book.title + "<br />";
        row.appendChild(titleCell);

        let authorCell = document.createElement('td');
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        let pagesCell = document.createElement('td');
        pagesCell.textContent = book.pages;
        row.appendChild(pagesCell);

        let isReadCell = document.createElement('td');
        isReadCell.textContent = book.isRead;
        row.appendChild(isReadCell);
        

        table.appendChild(row);
    }

    let tableContainer = document.getElementById('tableDiv');
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table)
    //document.body.appendChild(table);
};
*/



//code that will store/organize books in separate cards.
/*
let container = document.createElement('div')
for (let i = 0; i < theLibrary.length; i++) {
    let book = theLibrary[i];

    let card = document.createElement('div');
    card.classList.add('book-card');

    let titleElement = document.createElement('h2');
    titleElement.textContent = book.title;
    card.appendChild(titleElement);

    let authorElement = document.createElement('p');
    authorElement.textContent = book.author;
    card.appendChild(authorElement);

    let pagesElement = document.createElement('p');
    pagesElement.textContent = book.pages;
    card.appendChild(pagesElement);

    container.appendChild(card);

};
document.body.appendChild(container);*/

