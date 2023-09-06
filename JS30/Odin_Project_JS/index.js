/*function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.info = function(){
        console.log(title, author, pages, read);
    }
};

const book1 = new Book('Harry Potter yoy,', 'JK something,',"255 pages,", false); 

book1.info();*/

function Person(name){
    this.name = name;
}

Person.prototype.sayName = function() {
    console.log(`Hello, I'm ${this.name}!`);
}

function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

Player.prototype.getMarker = function(){
    console.log(`My marker is ${this.marker}!`)
}
