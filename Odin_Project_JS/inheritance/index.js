/*function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.info = function(){
        console.log(title, author, pages, read);
    }
};

const book1 = new Book('Harry Potter,', 'JK Rowling,',"255 pages,", false); 

book1.info();*/

Object.setPrototypeOf(Player.prototype, Person.prototype);


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

Object.getPrototypeOf(Player.prototype); // returns Object.prototype

// Now make `Player` objects inherit from `Person`
Object.getPrototypeOf(Player.prototype); // this returns Person.prototype

const player1 = new Player("tim", "X");
const player2 = new Player("tom", "O");

player1.sayName(); // Hello, I'm tim!
player2.sayName(); // Hello, I'm tom!

player1.getMarker(); // My marker is X!
player2.getMarker(); // My marker is O!

const cat= {
    makeSound: function(){
        console.log(this.sound)
    }
}
cat.sound = "MEOWORRR";
cat.makeSound();

const cat1 = Object.create(cat);
cat1.sound = "MEOUF";
cat1.makeSound();

const cat2 = Object.create(cat);
cat2.sound = "Meow!";
cat2.makeSound();