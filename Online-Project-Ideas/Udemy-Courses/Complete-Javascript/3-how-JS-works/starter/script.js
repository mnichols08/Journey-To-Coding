console.log("''../starter/script.js' has been loaded");
///////////////////////////////////////
// Lecture: Hoisting
/*
var year = 1965;
calculateAge(year);

function calculateAge(year) {
  console.log(2019 - year);
}

var retirement = function(year) {
  console.log(65 - (2019 - year));
}
retirement(year);

// variables
console.log(age);
var age = 29;

function foo() {
console.log(age) // undefined within this scope
 var age = 65;
  console.log(age);
}
 foo();
 console.log(age);
 */

///////////////////////////////////////
// Lecture: Scoping


// First scoping example
/*

var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    return b;
}
function second() {
        var c = 'Hey!';
        return c;

}

(function third() {
  var d = 'Mikey';
  console.log(a + first() + second() + d);
})()
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
//console.log(this)
/*
var year = 1989;
function calcAge(year) {
  console.log(2019 - year);
  console.log(this);
}

calcAge(year);
*/
var john = {
  name: "John",
  yearOfBirth: 1972,
  calculateAge: function() {
    //console.log(this);
    console.log(2019 - this.yearOfBirth);
    /*
    function innerFunction() {
    console.log(this)
    }
    innerFunction();
    */
  }
}

john.calculateAge();
var mike = {
  name: "Mikey",
  yearOfBirth: 1989
};

mike.calculateAge = john.calculateAge;
mike.calculateAge();
console.log("'../starter/script.js' has been quit.")
