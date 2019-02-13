// Function constructor
/*
var john = {
  name: "John",
  yearOfBirth: "1990",
  job: "teacher"
};

var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}
Person.prototype.calculateAge = function () { // Does not appear in object literal
  this.age = 2019 - this.yearOfBirth;
  console.log(this.name + " " + this.lastName + " is a " + this.age + " year old " + this.job);
}

Person.prototype.lastName = "Smith"; // Does not appear in object literal

var john = new Person("John", 1990, "teacher");
var mark = new Person("Mark", 1948, "retired");
var jane = new Person("Jane", 1969, "designer");
var future = new Person("Joe", 2021, "semen");
john.calculateAge();
mark.calculateAge();
jane.calculateAge();
future.calculateAge();
*/

// Object.create
/*
var personProto = {
    calculateAge: function() {
    this.age = 2019 - this.yearOfBirth;
  }
};

var john = Object.create(personProto);
    john.name = "John";
    john.yearOfBirth = "1990";
    john.job = "teacher";

var jane = Object.create(personProto,
  {
      name: {value: 'Jane'},
      yearOfBirth: {value: 1969 },
      job: {value: 'designer'}
  });
john.calculateAge();
//jane.calculateAge();
*/
/*
// Primitives vs Objects

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);

// Objects
var obj1 = {
  name: "John",
  age: 26
};
var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions

var age = 27;
var obj = {
  name: "Jonas",
  city: "Lisbon"
};

function change(a,b) {
  a = 30;
  b.city = "San Francisco";
}

change(age, obj);

console.log(age);
console.log(obj.city)
*/

///////////////////////////////////////////////////////////
// Lecture: Passing functions as arguments
/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (let i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge (el) {
  return new Date().getFullYear() - el;
}

function isFullAge(el) {
  return el >= 21;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
  return Math.round(206.9 - (0.67 * el));
} else {
  return "Cannot Compute";
}
}
var ages = arrayCalc(years,calculateAge); // Callback function
var fullAges = arrayCalc(ages,isFullAge);
var rates = arrayCalc(ages,maxHeartRate);

console.log(fullAges);
console.log(ages);
console.log(rates);
*/

////////////////////////////////////////////////////////////////
// Lecture: Functions Returning functions
/*
function interviewQuestion1(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(name + ", can you please explain what UX design is?");
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log(name + ", what subject do you teach?");
    }
  } else {
      return function(name) {
        console.log("Hello " + name + ", what do you do?");
      }
    }
  }
//interviewQuestion1("teacher")("Mary");
var teacherQuestion = interviewQuestion1('teacher');
var designerQuestion = interviewQuestion1('designer');

designerQuestion("Mary");
teacherQuestion("John");

interviewQuestion("teacher")('Mark');

*/
/////////////////////////////////////////////////////////////////////
// Lecture: IIFE
/*
(function() {
  var score = Math.round(Math.random() * 10);
  console.log(score >= 5);
  console.log(score);
})();



(function (goodLuck) {
  var score = Math.round(Math.random() * 10);
  console.log(score >= 5 - goodLuck);
  console.log(score);
})(5);
*/

/////////////////////////////////////////////////////////////////
// Lecture: Closures
/*
function retirement(retirementAge) {
  var a = " years left until retirement.";
  return function(yearOfBirth) {
    var age = new Date().getFullYear() - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

var retirementUS = retirement(66);
    retirementUS(1990);
var retirementGermany = retirement(65);
    retirementGermany(1990);
var retirementIceland = retirement(67);
    retirementIceland(1990);
retirement(65)(1989);

function interviewQuestion(job) {
  return function(name) {
    if (job === 'designer') {
      console.log(name + ", can you please explain what UX design is?");
    } else if (job === 'teacher') {
      console.log(name + ", what subject do you teach?");
    } else {
      console.log("Hello " + name + ", what do you do?");
    }
  }
}

interviewQuestion('teacher')('john');

*/
/////////////////////////////////////////////////////////////////
// Lecture: Bind, Call, and Apply
/*
var john = {
  name: "John",
  age: 26,
  job: "teacher",
  presentation: function(style,timeOfDay) {
    if (style === 'formal') {
      console.log('Good ' + timeOfDay + ", Ladies and Gentleman! I'm " + this.name + ", I'm a " + this.job + " and I'm " + this.age + " years old.");
    } else if (style === 'friendly') {
      console.log('Hey What\'s up? I\'m ' + this.name + ", I'm a  " + this.job + " and I'm " + this.age + " years old. Have a nice " + timeOfDay + ".");
    }
  }
}

var emily = {
  name: "Emily",
  age: 35,
  job: "designer"
};

john.presentation("formal","morning")

john.presentation.call(emily, "friendly", "night"); // call method borrows a function from another media-objectimg-thumbnail

john.presentation.apply(emily, ['formal', 'afternoon']);

var johnFriendly = john.presentation.bind(john, "friendly");
johnFriendly("evening");
johnFriendly("day");

var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("God");

// This is called currying

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];
  for (let i = 0; i < arr.length; i++) {
    arrRes.push(fn(arr[i]));
  }
  return arrRes;
}

function calculateAge (el) {
  return new Date().getFullYear() - el;
}

function isFullAge(limit,el) {
  return el >= limit;
}

var ages = arrayCalc(years,calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

var fullGB = arrayCalc(ages, isFullAge.bind(this, 18));

console.log(ages);
console.log(fullGB);
console.log(fullJapan);
*/
