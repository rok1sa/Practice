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
    div.innerHTML = `Title: ${book.title}
    Author: ${book.author}
    Pages: ${book.pages}
    Is Read: ${book.isRead}`;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener('click', function(){
        theLibrary.splice(index, 1)
        container.removeChild(div);
    });

    div.appendChild(deleteBtn);

    container.appendChild(div);
});
};

document.getElementById('sendBtn').addEventListener('click', handleSubmit);

// code that will sort/organize books
let table = document.createElement("table");

for (let i = 0; i < theLibrary.length; i++){
    let book = theLibrary[i];
    let row = document.createElement("tr");
    let titleCell = document.createElement('td');
    titleCell.textContent = book.title;
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

document.body.appendChild(table);