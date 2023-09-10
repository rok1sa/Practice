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

// Inheritance with objects Person and Player
/*
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

//cats
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

*/
// rpg chars 
// Initialize constructor functions
/*
function Hero(name, level) {
    this.name = name;
    this.level = level;
}

function Warrior(name, level, weapon) {
    Hero.call(this, name, level); 
    this.weapon = weapon;
}

function Healer(name, level, spell) {
    Hero.call(this, name, level);

    this.spell = spell;
}

  // Link prototypes and add prototype methods
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

Hero.prototype.greet = function () {
    return `${this.name} says hello.`;
}

Warrior.prototype.attack = function () {
    return `${this.name} attacks with the ${this.weapon}.`;
}

Healer.prototype.heal = function () {
    return `${this.name} casts ${this.spell}.`;
}

  // Initialize individual character instances
const hero1 = new Warrior('Bjorn', 1, 'axe');
const hero2 = new Healer('Kanin', 1, 'cure');

*/
/*
const cat = {
    init: function(sound){
        this.sound = sound
        return this
    },
    makeSound: function(){
        console.log(this.sound);
    }
}

const cat1 = 
    Object.create(cat).init('meowr');
cat1.makeSound();
*/
console.log('hello world');