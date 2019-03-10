// Undestanding, Frameworks, and the Weird Parts (How things actually work)

// Conceptual Aside
// Focus on an idea that is crucial to code

// Syntax Parsers, Execution Contexts, and Lexical Environments

// Syntax Parser: A program that reads your code and determines what it does and IF it's grammar is valid.
// Code does not magically just do what you say. This translates the language as we know it into a way a computer understands.

// Your code
  /*
  function hello() {
  var a = 'Hello World'
  }
  */
// The Syntax Parser will parse things like "function", the function name of "hello", the arguments that go into the function, etc.
// This tranlates the code into a form that a computer can make sense of.
// The Syntax Parser will take things like var and store them in one place, and store the actual variable elsewhere.

// Lexical Environment: Where something sits physically in the code you write
// 'Lexical' means 'having to do with words or grammar'. A lexical environment exists in programming languages in which
// WHERE you write something is important

// Your code
  /*
  function hello() {
    var a = "hello";
  }
  */

// Because of lexical scoping, var a at this point is undefined, because it is not within the global scope.

// Execution Context: A wrapper to help manage the code that is running
// There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain
// things beyond what you have written in your code.

// Conceptual Aside: Name / Value Pairs and Objects

// Name / Value Pair: A name which maps to a unique value
// The name may be defined more than once, but only have one value in any given context.
// That value may be more name/value pairs.
// This means that we can assign variables to other variables

// Example
  /*
  Address = '100 Main St.'; // Name/value Pair
  */

// Object: A collection of name / value Pairs
// Simplest definition within JavaScript

// Name might have a name, but that name might be another object as seen below

// Example
  /*
  Address:
  {
    Street: "Main", // Name / Value Pair
    Number: 100, // Name / Value Pair
     Apartment: { // Name / Value Pair
       Floor: 3, // Name / Value Pair
       Number: 301 // Name / Value Pair
     }
  }
  */
  // Objects may contain any combination of Name / Value Pairs, and that is just what an object is: A collection or name / value pairs.


// Invocation: Running or calling a function by using () within JavaScript. ex. doThis()
function doThis(){
  console.log(`Doing This`);
  doThat();
  let c;
};
function doThat(){
  console.log(`Doing That`);
  let d;
};
doThis();
let d;

function b() {
  var myVar;
  console.log(myVar)
}

function a() {
  var myVar = 2;
  b();
}

a();

var myVar = 1;

a();
