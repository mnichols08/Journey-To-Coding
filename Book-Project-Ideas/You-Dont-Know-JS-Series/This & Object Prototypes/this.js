var myArray = [1, 2, 3]

var it = myArray[Symbol.iterator]()




/*
function identify() {
  return this.name.toUpperCase();
}

function speak() {
  var greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

var me = {
  name: "Kyle"
},
  you = {
  name: "Reader"
};

identify.call (me);
identify.call(you);

function identify(context) {
  return context.name.toUpperCase();
}

function speak(context) {
  var greeting = "Hello, I'm " + identify(context);
  console.log(greeting)
}

identify(you);
speak(me);

function foo(num) {
  console.log("foo: " + num);

  // Keep track of how many times 'foo' is called
  this.count++
}

foo.count = 0;

for (let i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
console.log(foo.count);

function foo(num) {
  console.log("foo: " + num);
  data.count++;
}

var data = {
  count:0
};

for (let i = 0; i < 10; i++){
  if (i > 5) {
    foo(i);
  }
}
console.log(data.count);

function foo() {
  foo.count = 4; // 'foo' refers to itself
}

setTimeout(function (){
  // anonymous named function, so it cannot refer to itself
},10)

function foo(num) {
  console.log("foo: " + num);
  foo.count++
}

foo.count = 0;

for (let i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i);
  }
}
console.log(foo.count);

function foo(num) {
  console.log("foo: " + num);
  this.count++
}

foo.count = 0;

for (let i = 0; i < 10; i++) {
  if (i > 5) {
    // Using 'call(..)', we ensure the 'this'
    // points at the function object ('foo') itself
    foo.call(foo, i);
  }
}
console.log(foo.count)


function foo() {
  var a = 2;
  this.bar()
};

function bar() {
  console.log(this.a);
}

foo();

debugger;
function baz() {
  // call stack is: 'baz'
  // so, our call-site is in the global Scope

  console.log("baz");
  bar(); // call-site for 'bar'
}
function bar() {
  // call-stack is: 'baz' -> 'bar'
  // so, our call-size is in 'baz'
  console.log("bar");
  foo(); // <-- call-site for 'foo'
}
function foo() {
  // call-stack is: 'baz' -> 'bar' -> 'foo'
  // so, our call-site is in 'bar'
  console.log("foo");
}
baz(); // <-- call-site for 'baz'

function foo() {
  console.log(this.a);
}
var a = 2;
foo();

function foo() {
  console.log(this.a);
}

var a = 2;
(function(){
  "use strict";

  foo();
})();

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
};

obj.foo();

function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo:foo
},
  obj1 = {
    a:2,
    obj2: obj2
  };

  obj1.obj2.foo();

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo:foo
};
var bar = obj.foo, // function reference/alias
    a = "oops, global"; //'a' also property on global object

bar(); //oops, global

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo:foo
};

var a = "oops, global"; // 'a' also property on global object

setTimeout(obj.foo, 100);// "oops, global";

function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
};

foo.call(obj); //2

function foo() {
  console.log(this.a);
}
var obj = {
  a: 2
}

var bar = function() {
  foo.call(obj);
};

bar(); // 2
setTimeout(bar, 100); // 2

//hard-bound 'bar' can no longer have its 'this' overridden
bar.call(window); // 2

function foo(something) {
  console.log(this.a,something);
  return this.a + something
}
var obj = {
  a: 2
};
var bar = function() {
  return foo.apply(obj,arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5

function foo(something) {
  console.log(this.a, something);
  return this.a + something
}
// simple 'bind' helper
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  }
}
var obj = {
  a:2
};
var bar = foo.bind(obj);
var b = bar(3); // 2 3
console.log(b); // 5

function foo(el) {
  console.log( el, this.id);
}

var obj = {
  id: "awesome"
};

// use 'obj' as 'this' for 'foo(..)' calls
[1,2,3].forEach( foo,obj );
// 1 awesome 2 awesome 3 awesome

function foo(a) {
  this.a = a;
}

var bar = new foo('a');
console.log(bar.a); // 2

function foo() {
  console.log(this.a);
}
 var obj1 = {
  a: 2,
  foo:foo
 },
  obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2

function foo(something) {
  this.a = something;
}

var obj1 = {
  foo:foo
},
  obj2 = {};

  obj1.foo(2);
  console.log(obj1.a); // 2

  obj1.foo.call(obj2, 3);
  console.log(obj2.a); // 3

  var bar = new obj1.foo(4);
  console.log(obj1.a); // 2
  console.log(bar.a); // 4



function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3

function foo(p1,p2) {
  this.val = p1 + p2;
}
// using 'null here because we don't care about the 'this' hard binding in
// this scenario, and it will be overidden by the 'new' call, anyway
var bar = foo.bind(null, "p1");
var baz = new bar("p2");
baz.val; // p1p2

function foo() {
  console.log(this.a);
}

var a = 2;

foo.call(null); //2

function foo(a, b) {
  console.log("a:" + a, "b:" + b);
}

// spreading out array as paremeters
foo.apply(null, [2, 3]); // a: 2, b: 3

// currying with 'bind(..)'
var bar = foo.bind(null, 2);
bar(3); // a: 2, b: 3

function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// our DMZ empty object
var Ø = Object.create(null);

// spreading out arrays as parameters
foo.apply(Ø, [2,3]); // a:2, b:3

// currying with 'bind(..)'
var bar = foo.bind(Ø, 2);
bar(3); // a: 2, b: 3

function foo() {
  console.log(this.a);
}

var a = 2,
    o = {a: 3, foo: foo},
    p = {a: 4};

    o.foo(); // 3
    (p.foo = o.foo)(); // 2

if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this,
        curried = [].slice.call( arguments, 1),
        bound = function bound() {
          return fn.apply(
          (!this ||
                (typeof window !== "undefined" &&
                    this === window) ||
                (typeof global !== "undefined" &&
                    this === global)
          ) ? obj: this,
          curried.concat.apply(curried,arguments)
        );
      };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}

function foo() {
  console.log("name: " + this.name);
}

var obj = {name: "obj"},
    obj2 = {name: "obj2"},
    obj3 = {name: "obj3"};

var fooOBJ = foo.softBind(obj);

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- Look!!!

fooOBJ.call(obj3); // name: obj3 <--- Look !!!

setTimeout(obj2.foo, 10);
// name: obj <---- Falls back to soft binding

function foo() {
  // return an arrow Function
  return(a) => {
    // `this` here is a lexically inherited from `foo()`
    console.log(this.a);
  };
}

var obj1 = {
  a:2
},
    obj2 = {
      a:3
};

var bar = foo.call(obj1)
bar.call(obj2); // 2, not 3!

function anotherFunction() { }

var anotherObject = {
  c: true
};

var anotherArray = [];

var myObject = {
  a: 2,
  b: anotherObject, // reference, not a copy!
  c: anotherArray, // another reference!
  d: anotherFunction
};

anotherArray.push(anotherObject, myObject);

*/