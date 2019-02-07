let content = document.querySelector("#content");
var treasure = () => {
  content.innerHTML = '<h1 id="heading">Find the buried treasure!</h1>\n<img id="map" width="400" height="400" src="https://nostarch.com/images/treasuremap.png" />\n<p id="distance"></p>';
}
  var getDistanceHint = (distance) => {
    if (distance < 10) {
      return "Boiling hot!";
    } else if (distance < 20) {
      return "Really hot";
    } else if (distance < 40) {
      return "Hot";
    } else if (distance < 80) {
      return "Warm";
    } else if (distance < 160) {
      return "Cold;"
    } else if (distance < 320) {
      return "Really Cold";
    } else {
      return "Freezing!";
    }
  }
  var getDistance = (event, target) => {
    var diffX = event.offsetX - target.x,
        diffY = event.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
  }
  var getRandomNumber = (size) => {
    return Math.floor(Math.random() * size);
  };
  var width = 400,
      height = 400,
      target = {
        x: getRandomNumber(width),
        y: getRandomNumber(height)
      },
      clicks = 0;
  $('#map').click(function (event){
    clicks++;
    console.log(clicks);
    var distance = getDistance(event, target);
    var distanceHint = getDistanceHint(distance);
    $('#distance').text(distanceHint);
    if (distance < 8) {
      alert ("Found the treasure in " + clicks + " clicks!");
    }
  })
var input = () =>{
  var newHeadingText = prompt("Please Provide a new heading:");
  $("#main-heading").text(newHeadingText);
}
// Using querySelector
const qSel = (query) => {
var headingElement = document.querySelector(query);
    console.log(headingElement.innerHTML)
    var newHeadingText = prompt("Please provide a new heading:");
    headingElement.innerHTML = newHeadingText;
}
// Function with multiple arguments
var printMultipleTimes = (howManyTimes, whatToDraw) => {
  for (var i = 0; i < howManyTimes; i++) {
    console.log(i + " " + whatToDraw);
  }
};
// Printing cat faces
var drawCats = (howManyTimes) => {
  for (var i = 0; i < howManyTimes; i++){
    console.log(i + " =^.^=");
  }
};
// Function with argument
var sayHelloTo = (tname) => {
  console.log("Hello " + tname + "!");
};
// Basic Function
var ourFirstFunction = function() {
  console.log("Hello World")
};
// Print all powers of 3 below the number of 10,000 using a while Loop
// Print all powers of 3 below the number of 10,000 using a for Loop
var loopOf3 = () => {
for (var x = 3; x < 10000; x = x * x){
  console.log(x);
}
};
// Print all powers of 2 below the number 10,000
var loopOf2 = () => {
for (var x = 2; x < 10000; x = x * 2) {
  console.log(x)
}
};
// For Loops using individual characters
/*
var name = "Nick";
for (var i = 0; i < name.length; i++){
  console.log("My name contains the letter " + name[i] + ".");
};
*/
// For Loops with Arrays and Strings
var arrStr = (arr) => {
var animals = ["Lion", "Flamingo", "Polar Bear", "Boa Constrictor"];
for (var i = 0; i < animals.length; i++){
  console.log("This zoo contains a " + animals[i] + ".");
}
};
// For Loop with Numbers
var sayHello = (x) => {
var timesToSayHello = x;
for (var i = 0; i < timesToSayHello; i++) {
  console.log("Hello")
}
};
// For Loop
var forLoop = (x) =>{
for (var sheepCounted = 0; sheepCounted < x; sheepCounted++){
  console.log("I have counted " + sheepCounted + " sheep!");
};
console.log("Zzzzzzzzzzzzzz");
}
// While Loop
var whileLoop = (x) => {
var sheepCounted = 0;
while (sheepCounted < x) {
  console.log("I have counted " + sheepCounted + " sheep!");
  sheepCounted++
}
console.log("Zzzzzzzzzzzzzz");
};
var ifElse = () => {
  // If / Else Chain
var lemonChicken = false,
    beefWithBlackBean = false,
    sweetAndSourPork = false;
if (lemonChicken){
  console.log("Great I'm having lemon chicken!");
} else if (beefWithBlackBean) {
  console.log("I'm having the beef.");
} else {
  console.log("Well, I guess I'll have rice then.")
}
};
// If Statement
/*
  var name = "Nicholas";
  console.log("Hello " + name);
  if(name.length > 7) {
    console.log("Wow, you have a REALLY long name!");
  } else {
    console.log("Your name isn't very long.");
  };
  */
  // Function findName()
  const findName = () => {
    var name = prompt("Please tell me your name.");
    if (name === "Mikey") {
    alert("Hey Mikey!");
  } else if (name === "Manthi" || name === "Jan" || name === "Manthana") {
    alert("Hey BB, I love you for playing my game <3");
  }else if (name === "Muppy" || name === "Mufasa" || name === "Muffy") {
    alert("Hey Mupps!");
  } else if (name === "Scar"){
    alert("Hi there, Scar!");
  } else if (name === "Walter White" || name === "Jesse Pinkman" || name === "Heisenberg") {
    alert("Moious Mijo")
  }else {
    alert("STRANGER DANGER");
  }
};
  const hangMan = () => {
  /*
  Structure of Hangman
  1. Pick a random Word
  2. Take the player's guess
  3. Quit the game if the player wants to
  4. Check that the player's guess is a valid letter
  5. Keep track of letters the player has guessed
  6. Show the player their progress
  7. Finish when the player has guessed the Word

  Psuedocode:
  Pick a random Word

  While the word has not been guessed {
  Show the player their current progress
  Get a guess from the player

  If the player wants to quit the game {
  Quit the game
  }
  else if the guess is not a single letter {
  Tell the player to pick a single letter
  }Else {
  If the guess is in the word {
  Update the player's progress with the guess
  }
  }
  }
  }
  Congratulate the player on guessing the word
  */
  //Array of possible words
  var words = [
    "javascript",
    "monkey",
    "amazing",
    "pancake",
    "broken",
    "acid",
    "hello",
    "random",
    "monopoly",
    "html"
  ];
  //Choose one word at random
  var word = words[Math.floor(Math.random() * words.length)];
  var answerArray = [];
  for (var i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  };
  var remainingLetters = word.length
  while (remainingLetters > 0) {
    alert(answerArray.join(" "));
    var lcG = prompt("Guess a letter, or click Cancel to stop playing."),
        guess= lcG.toLowerCase();
    if (guess === null) {
      break;
    } else if (guess.length !== 1){
      alert ("Please enter a single letter.");
    } else {
      for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
          answerArray[j] = guess;
          remainingLetters--;
        }
      }
    }
  };
  alert(answerArray.join(" "));
  alert("Good job! The answer was " + word);
  //Using alerts to give information
  alert("JavaScript is awesome!");
  //Using confirm to ask yes or no questions
  var likesCats = confirm("Do you like cats?");
  if (likesCats) {
    alert("You're a cool cat!");
  } else {
    alert("Yeah, that's fine. You're still cool!");
  }
  //Creating a Prompt
  /*var name = prompt("What's your name?");
  console.log("Hello " + name)*/
};
