/////////////////////////////////////
// Lecture: Hoisting

console.log('Lesson 3: How JS Works - Final Script Loaded');
// functions

console.log('Functions - Begin');
calculateAge(1965);

function calculateAge(year) {
    console.log(2019 - year);
}

// retirement(1956);
var retirement = function(year) {
    console.log(65 - (2019 - year));
}


// variables

console.log(age);
var age = 23;

function foo() {
    console.log(age);
    var age = 65;
    console.log(age);
}
foo();
console.log(age);

console.log('functions end');


/////////////////////////////////////
// Lecture: Scoping


console.log('Lecture: Scoping - Begin');
// First scoping example
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}


// Example to show the differece between execution stack and scope chain
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
    //console.log(c);
    console.log(a+d);
}
console.log('Lecture: Scoping - End')




/////////////////////////////////////
// Lecture: The this keyword

/*
//console.log(this);

calculateAge(1985);

function calculateAge(year) {
    console.log(2019 - year);
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2019 - this.yearOfBirth);

        function innerFunction() {
            console.log(this);
        }
        innerFunction();
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
};


mike.calculateAge = john.calculateAge;
mike.calculateAge();
*/
console.log('Lesson 3: How JS Works - Final Script Ended');
