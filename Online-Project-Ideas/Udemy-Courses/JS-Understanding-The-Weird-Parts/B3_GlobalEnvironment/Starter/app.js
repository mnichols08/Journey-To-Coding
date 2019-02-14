var a = "Hello World!";
function b() {
  return "Called b!";
}

document.body.append(b());
//document.body.append(a);
// The Execution Context: Creation and "Hoisting"
// Creation Phase:

// Global Object || 'this' || Outer Environnment
// Setup Memory Space for Variables and Functions ("Hoisting")
// Before my code is executed, the JS engine has already set aside memory
// space for all variables and functions already created. So when it begins
// to run my code, it will have access to them. Hoisting is done when the
// JS Engine shifts variables and objects around so they can be found later.

// All variables are initially set to undefined.
// All variabled must be declared in order for them to be used.

// In the example of
/*
  console.log(a); // "Hello World" is inherited from global scope
  var a = 0; // a is assigned the variable of 0;
  console.log(a); // 0; a was declared and assigned the variable of 0;
  var a; // Would return error in strict mode
  a = undefined; // This is bad practice; try to always let the Engine Determine that it was truly undefined
  console.log(a); // undefined;
*/

var unset;
document.body.append("the variable for 'unset' is set to " + unset );
var set = prompt ("Would you like to set a value to 'unset'?","Yes").toLowerCase();
if(set === 'yes'){
  unset = prompt("What would you like to set the variable 'unset' to?", "Set");
} if(unset === undefined) {
  document.body.append(' unset is still ' + unset);
} else {
  document.body.append(' unset is now defined as ' + unset);
}
