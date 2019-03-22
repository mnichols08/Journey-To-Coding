/////////////////////////////////
// Lecture: let and const

/*
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
name6 = 'Jane Miller';
console.log(name6);


// ES5
function driversLicence5(passedTest) {

    if (passedTest) {
        console.log(firstName);
        var firstName = 'John';
        var yearOfBirth = 1990;
    }


    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence5(true);


// ES6
function driversLicence6(passedTest) {

    //console.log(firstName);
    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
        firstName = 'John';
    }

    console.log(firstName + ', born in ' + yearOfBirth + ', is now officially allowed to drive a car.');
}

driversLicence6(true);



var i = 23;

for (var i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);
*/




/////////////////////////////////
// Lecture: Blocks and IIFEs

/*
// ES6
{
    const a = 1;
    let b = 2;
    var c = 3;
}

//console.log(a + b);
console.log(c);


// ES5
(function() {
    var c = 3;
})();

//console.log(c);
*/




/////////////////////////////////
// Lecture: Strings

/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));
console.log(n.endsWith('Sm'));
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5));
*/




/////////////////////////////////
// Lecture: Arrow functions

/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});
console.log(ages5);


// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}: ${age}.`
});
console.log(ages6);
*/




/////////////////////////////////
// Lecture: Arrow functions 2

/*
// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {

       var self = this; document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
//box5.clickMe();


// ES6
const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box6.clickMe();


const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box66.clickMe();


function Person(name) {
    this.name = name;
}

// ES5
Person.prototype.myFriends5 = function(friends) {

    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el;
    }.bind(this));

    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);


// ES6
Person.prototype.myFriends6 = function(friends) {

    var arr = friends.map(el => `${this.name} is friends with ${el}`);

    console.log(arr);
}

new Person('Mike').myFriends6(friends);
*/




/////////////////////////////////
// Lecture: Destructuring


// ES5
var john = ['John', 26];
//var name = john[0];
//var age = john[1];


// ES6
const [name, yearOfBirth] = ['John',1990];
const age = (function() {return new Date().getFullYear() - yearOfBirth})();
console.log(name);
console.log(yearOfBirth);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b);

function calcAgeRetirement() {
  return [age, 65 - age];
}

const [ageNow, retirement] = calcAgeRetirement();
console.log(age);
console.log(retirement);

/////////////////////////////////
// Lecture: Arrays

const boxes = document.querySelectorAll('.box');
/*
// ES5
var boxesArr5 = Array.prototype.slice.call(boxes)
  boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'black';
  console.log('Changed box color to ' + cur.style.backgroundColor + ' with an ES5 Syntax');
});

for (var i = 0; i < boxesArr5.length; i++){

  if(boxesArr5[i].className === 'box blue') {
    continue;
  };

  boxesArr5[i].textContent = 'I changed box color to ' + boxesArr5[i].style.backgroundColor + ' with an ES5 Syntax';

}

// ES6
const boxesArr6 = Array.from(boxes);
  boxesArr6.forEach(cur => {
  cur.style.backgroundColor = 'dodgerblue';
 console.log(`Changed box color to ${cur.style.backgroundColor} with an ES6 Syntax`);
});
for(const cur of boxesArr6){
  if (cur.className.includes('blue')) {
    continue;
  }
  cur.textContent = `I changed box color to ${cur.style.backgroundColor} with an ES6 Syntax`;
}
*/
// Finding one element from an array
// ES5
var ages = [12,17,8,21,14,11];

var full = ages.map(function(cur){
  return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6

console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));

/////////////////////////////////
// Lecture: Spread operator

function addFourAges (a, b, c, d) {
    return a + b + c + d;
}

console.log(addFourAges(18, 30, 12, 21));

var ages = [18, 30, 12, 21];

//ES5
console.log(addFourAges.apply(null, ages));

//ES6 Spread Operator
console.log(addFourAges(...ages));

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary','Bob','Ann'];
const bigFamily = [...familySmith, 'Lily',...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const all = [h, ...boxes];

//Array.from(all).forEach(cur => cur.style.color = 'purple');

/////////////////////////////////
// Lecture: Rest parameters
/*
//ES5
function isFullAge5() {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);

    argsArr.forEach(function(cur) {
        console.log((new Date().getFullYear() - cur) >= 18);
    })
}

isFullAge5(1990, 1999, 1965);
isFullAge5(1990, 1999, 1965, 2016, 1987);

//ES6
function isFullAge6(...years) {
  console.log(arguments);
    years.forEach(cur => console.log( (new Date().getFullYear() - cur) >= 18) );
}

isFullAge6(1990, 1999, 1965, 2016, 1987,2019,2011,2002,2001,2000);
*/

//ES5
function isFullAge5(limit) {
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);

    argsArr.forEach(function(cur) {
        console.log((new Date().getFullYear() - cur) >= limit);
    })
}

isFullAge5(21, 1990, 1999, 1965);
isFullAge5(21, 1990, 1999, 1965, 2016, 1987);

//ES6
function isFullAge6(limit, ...years) {
  console.log(arguments);
    years.forEach(cur => console.log( (new Date().getFullYear() - cur) >= limit) );
}

isFullAge6(21,1990, 1999, 1965, 2016, 1987,2019,2011,2002,2001,2000);


/////////////////////////////////
// Lecture: Default parameters


// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {

    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;

    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
    this.age = new Date().getFullYear() - yearOfBirth;
}


//ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
    this.age = new Date().getFullYear() - yearOfBirth;
    }


var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish');

/////////////////////////////////
// Lecture: Maps

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again!');

console.log(question.get('question'));

if(question.has(4)){

//question.delete(4);
//console.log(question.size);

}

//question.clear();

//question.forEach((value, key) => console.log(`This is ${key}, and it's set to '${value}'.`));

for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

const ans = 3//parseInt(prompt('Write the correct answer'));
console.log(question.get(ans === question.get('correct')));

/////////////////////////////////
// Lecture: Classes

// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');


//ES6
/*
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.age = new Date().getFullYear() - yearOfBirth;
        this.job = job;
    }



    static greeting() {
        console.log('Hey there!');
    }
}

const john6 = new Person6('John', 1990, 'teacher');

Person6.greeting();
*/
/////////////////////////////////
// Lecture: Classes and subclasses


//ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.age = new Date().getFullYear() - yearOfBirth;
    this.job = job;
}

var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);


Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}


var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
console.log(johnAthlete5.age)
johnAthlete5.wonMedal();


//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.age = new Date().getFullYear() - yearOfBirth;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
}

class Athlete6 extends Person6 {
    constructor(name, yearOfBirth, job, olympicGames, medals) {
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }

    wonMedal() {
        this.medals++;
        console.log(`${this.name} is ${this.age} years old and has won ${this.medals} medals so far in game ${this.olympicGames} of the ${this.job} Olympic Meet.`);
    }
}

const johnAthlete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10);


johnAthlete6.wonMedal();
