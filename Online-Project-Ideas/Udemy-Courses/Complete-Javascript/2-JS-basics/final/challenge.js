const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
const arrSum = arr => arr.reduce((a,b) => a + b, 0);
function getPrompt(val,valu) {
var getValu = prompt(val,valu);
return getValu;
}
/*****************************
* CODING CHALLENGE 1
*/

/*
Manthi and Mikeyy are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Manthi's and Mikeyy's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than Manthi.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than Manthi's? true").

GOOD LUCK 😀
*/
// My Solution

var cont1 = prompt("What is your name?", "Manthi"),
    cont2 = prompt("Who are you comparing with?", "Mikey"),
    mass1 = prompt("How much does " + cont1 + " weigh?","78"),
    mass2 = prompt("How much does " + cont2 + " weigh?","92"),
    height1 = prompt("How tall is " + cont1 + "?","1.92"),
    height2 = prompt("How tall is " + cont2 + "?","1.85"),
    bmi1 = mass1 / (height1 * height1),
    bmi2 = mass2 / (height2 * height2),
    bmi = bmi1 > bmi2;
if (bmi == true) {
  console.log(cont1 + "'s BMI is higher than " + cont2 + "'s.")
} else {
  console.log(cont2 + "'s BMI is higher than " + cont1 + "'s.")
}


/*****************************
* CODING CHALLENGE 2
*/

/*
Manthi and Mikey both play basketball in different teams. In the latest 3 games, Manthi's team scored 89, 120 and 103 points, while Mikey's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK 😀
*/

var player1 = prompt("What is the first player's name?", "Manthi"),
    player2 = prompt("What is the second player's name?", "Mikey"),
    addPlayer = prompt("Will there be another player?", "Yes").toLowerCase();
    if (addPlayer === "yes") {
      var player3 = prompt("What is the third player's name?","Scar & Mufasa"),
          score3 = [];
    };
var score1 = [],
    score2 = [];
var gamesPlayed = prompt("How many games did you play?","3");
for (let i = 1; i <= gamesPlayed; i++){
  var getScore1 = prompt("What was " + player1 + "'s score in round " + i + "?","89");
  var  _score1 = parseInt(getScore1);
  score1.push(_score1);
  var getScore2 = prompt("What was " + player2 + "'s score in round " + i + "?","116");
  var  _score2 = parseInt(getScore2);
  score2.push(_score2);
  if(player3){
    var getScore3 = prompt("What was " + player3 + "'s score in round " + i + "?","97");
    var  _score3 = parseInt(getScore3);
    score3.push(_score3);
  }
}

var avg1 = arrAvg(score1),
    avg2 = arrAvg(score2);
    if (player3) {
      var avg3 = arrAvg(score3);
    }

    switch (true) {
        case avg1 > avg2 && avg1 > avg3:
            console.log(player1 + "'s team wins with an average of " + avg1 + " points!");
            console.log(player2 + "'s team had an average of " + avg2 + " points.");
            if (player3){
              console.log(player3 + "'s team had an average of " + avg3 + " points.")
            }
            break;
        case avg2 > avg1 && avg2 > avg3:
            console.log(player2 + "'s team wins with an average of " + avg2 + " points!");
            console.log(player1 + "'s team had an average of " + avg1 + " points.");
            if (player3){
              console.log(player3 + "'s team had an average of " + avg3 + " points.")
            }
            break;
        case avg3 > avg2 && avg3 > avg1:
            console.log(player3 + "'s team wins with an average of " + avg3 + " points!");
            console.log(player2 + "'s team had an average of " + avg2 + " points.");
            if (player3){
              console.log(player1 + "'s team had an average of " + avg1 + " points.")
            }
            break;
            default:
            console.log("There is a draw.")
    }


/*****************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK 😀
*/

var basArr = [],
    tipArr = [],
    finArr = [],
    query1 = prompt("How many receipts do you have from restaurants?","3");
    _query1 = parseInt(query1);
    if (_query1 >= 0){
(function() {
for (let i = 1; i <= query1; i++) {
if (i === 1){
var rcpt1= prompt("How much was your first receipt for?","124"),
    _rcpt1 = parseInt(rcpt1);
    basArr.push(_rcpt1);
    if (_rcpt1 > 199.99) {
      tipArr.push((_rcpt1 * .1))
      finArr.push(_rcpt1 + (_rcpt1 * .1));
    } else if ( _rcpt1 < 200 && _rcpt1 > 50){
      tipArr.push((_rcpt1 * .15));
      finArr.push(_rcpt1 + (_rcpt1 * .15));
    } else {
      tipArr.push(( _rcpt1 * .2));
      finArr.push(_rcpt1 + (_rcpt1 * .2));
      }
} else {
var rcpt2 = prompt("How much was the next receipt for?","48"),
    _rcpt2 = parseInt(rcpt2);
    basArr.push(_rcpt2);
    if (_rcpt2 >= 200) {
      tipArr.push((_rcpt2 * .1))
      finArr.push(_rcpt2 + (_rcpt2 * .1));
    } else if ( _rcpt2 < 200 && _rcpt2 >= 50){
      tipArr.push((_rcpt2 * .15));
      finArr.push(_rcpt2 + (_rcpt2 * .15));
    } else {
      tipArr.push((_rcpt2 * .2));
      finArr.push(_rcpt2 + (_rcpt2 * .2));
  }
}
} console.log(tipArr,finArr)
  const arrSum = arr => arr.reduce((a,b) => a + b, 0);
  console.log("Money Spent on Food: $" + arrSum(basArr));
  console.log("Money Spent on Tips: $" + arrSum(tipArr));
  console.log("Money Spent Overall: $" + arrSum(finArr));
})();
} else {
  alert("Please type in a number value instead.")
  query1 = prompt("How many receipts do you have from restaurants?");
}


/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Manthi and Mikey compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK 😀
*/



var user1 = {
  fullName: getPrompt("What is your full name?", "John Smith"),
  weight: getPrompt("How much do you weigh?", "110"),
  height: getPrompt("How tall are you?", "1.95"),
  bmi: function() {
    return this.weight / (this.height * this.height);
  }
};
var user2 = {
  fullName: getPrompt("Who are you comparing with?", "Mark Miller"),
  weight: getPrompt("How much does he/she weigh?", "78"),
  height: getPrompt("How tall is he/her?", "1.69"),
  bmi: function() {
    return this.weight / (this.height * this.height);
  }
}
if (user1.bmi() > user2.bmi()){
console.log(user1.fullName + " has a higher BMI of " + user1.bmi() + ", and " + user2.fullName + "'s " + user2.bmi());
} else if (user2.bmi() > user1.bmi()){
console.log(user2.fullName + " has a higher BMI of " + user2.bmi() + ", and " + user1.fullName + "'s " + user1.bmi());
} else {
  console.log(user1.fullName + " has the same BMI as " + user2.fullName + ", with a BMI of " + user1.bmi());
}


/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/
var basArr1 = [],
    tipArr1 = [],
    finArr1 = [],
    basArr2 = [],
    tipArr2 = [],
    finArr2 = [],
    firstUser = {
      name: getPrompt("What is your name?","John Smith"),
      howManyReceipts: getPrompt("How Many Receipts Do You Have?", "5"),
      percentage200: getPrompt("What Percentage do you like to tip on bills over $200?", ".10"),
      percentage50: getPrompt("What Percentage do you like to tip on bills between $50 and $200?", ".15"),
      percentage50Below: getPrompt("What percentage do you like to tip on bills below $50?", ".20")
    },
    secondUser = {
      name: getPrompt("Who are you comparing your receipts with?","Mark Miller"),
      howManyReceipts: getPrompt("How Many Receipts does he/she have?", "4"),
      percentage300: getPrompt("What percentage does this person tip on bills over $300?", ".25"),
      percentage100: getPrompt("What Percentage does this person tip on bills between $100 and $300?", ".10"),
      percentage100Below: getPrompt("What percentage does this person tip on bills below $100?", ".20")
    },
      query3 = parseInt(firstUser.howManyReceipts);
    if (query3 >= 0){
(function() {
for (let i = 1; i <= query3; i++) {
if (i === 1){
var rcpt3 = prompt("How much was " + firstUser.name + "'s first receipt for?","124"),
    _rcpt3 = parseInt(rcpt3);
    basArr1.push(_rcpt3);
    if (_rcpt3 >= 200) {
      tipArr1.push((_rcpt3 * firstUser.percentage200))
      finArr1.push(_rcpt3 + (_rcpt3 * firstUser.percentage200));
    } else if ( _rcpt3 < 200 && _rcpt3 > 50){
      tipArr1.push((_rcpt3 * firstUser.percentage50));
      finArr1.push(_rcpt3 + (_rcpt3 * firstUser.percentage50));
    } else {
      tipArr1.push(( _rcpt3 * firstUser.percentage50Below));
      finArr1.push(_rcpt3 + (_rcpt3 * firstUser.percentage50Below));
      }
} else {
var rcpt4 = prompt("How much was " + firstUser.name + "'s next receipt for?","48"),
    _rcpt4 = parseInt(rcpt4);
    basArr1.push(_rcpt4);
    if (_rcpt4 >= 200) {
      tipArr1.push((_rcpt4 * firstUser.percentage200))
      finArr1.push(_rcpt4 + (_rcpt4 * firstUser.percentage200));
    } else if ( _rcpt4 < 200 && _rcpt4 >= 50){
      tipArr1.push((_rcpt4 * firstUser.percentage50));
      finArr1.push(_rcpt4 + (_rcpt4 * firstUser.percentage50));
    } else {
      tipArr1.push((_rcpt4 * firstUser.percentage50Below));
      finArr1.push(_rcpt4 + (_rcpt4 * firstUser.percentage50Below));
  }
}
}
//  console.log(firstUser.name + "'s family spent a total of: $" + arrSum(basArr1) + " on food.");
//  console.log(firstUser.name + "'s family spent a total of: $" + arrSum(tipArr1) + " on tips.");
//  console.log(firstUser.name + "'s family spent a total of: $" + arrSum(finArr1) + " in overall spending");
})();
} else {
  alert("Please type in a number value instead.")
  query4 = prompt("How many receipts does " + secondUser.name + " have from restaurants?");
  query4 = parseInt(query3);
}
query4 = parseInt(secondUser.howManyReceipts);
if (query4 >= 0){
(function() {
for (let i = 1; i <= query4; i++) {
if (i === 1){
var rcpt3 = prompt("How much was " + secondUser.name + "'s first receipt for?","77"),
_rcpt3 = parseInt(rcpt3);
basArr2.push(_rcpt3);
if (_rcpt3 >= 300) {
tipArr2.push((_rcpt3 * secondUser.percentage300))
finArr2.push(_rcpt3 + (_rcpt3 * secondUser.percentage300));
} else if ( _rcpt3 < 300 && _rcpt3 > 100){
tipArr2.push((_rcpt3 * secondUser.percentage100));
finArr2.push(_rcpt3 + (_rcpt3 * secondUser.percentage100));
} else {
tipArr2.push(( _rcpt3 * secondUser.percentage100Below));
finArr2.push(_rcpt3 + (_rcpt3 * secondUser.percentage100Below));
}
} else {
var rcpt4 = prompt("How much was " + secondUser.name + "'s next receipt for?","375"),
_rcpt4 = parseInt(rcpt4);
basArr2.push(_rcpt4);
if (_rcpt4 >= 300) {
tipArr2.push((_rcpt4 * secondUser.percentage300))
finArr2.push(_rcpt4 + (_rcpt4 * secondUser.percentage300));
} else if ( _rcpt4 < 300 && _rcpt4 >= 100){
tipArr2.push((_rcpt4 * secondUser.percentage100));
finArr2.push(_rcpt4 + (_rcpt4 * secondUser.percentage100));
} else {
tipArr2.push((_rcpt4 * secondUser.percentage100Below));
finArr2.push(_rcpt4 + (_rcpt4 * secondUser.percentage100Below));
}
}
}
console.log(firstUser,secondUser);
//console.log(secondUser.name + "'s family spent a total of: $" + arrSum(basArr2) + " on food.");
//console.log(secondUser.name + "'s family spent a total of: $"+ arrSum(tipArr2) + " on tips.");
//console.log(secondUser.name + "'s family spent a total of: $" + arrSum(finArr2) + " in overall spending");
if (arrAvg(tipArr1) > arrAvg(tipArr2)) {
  console.log(firstUser.name + "'s family pays higher tips, with an average of $" + arrAvg(tipArr1));
} else if (arrAvg(tipArr2) > arrAvg(tipArr1)) {
  console.log(secondUser.name + "'s family pays higher tips, with an average of $" + arrAvg(tipArr2));
} else {
  console.log("Both " + firstUser.name + " and " + secondUser.name + "'s family pays the equal amount of tips, with an average of $" + arrAvg(tipArr1) );
}
/*if (arrSum(finArr1) > arrSum(finArr2)) {
  var moreOverall = arrSum(finArr1) - arrSum(finArr2),
      moreTips = arrSum(tipArr1) - arrSum(tipArr2),
      moreBase = arrSum(basArr1) - arrSum(basArr2);
  console.log(firstUser.name + "'s family spent $"+ moreOverall + " more money than " + secondUser.name + "'s family in overall spending.");
  console.log(firstUser.name + "'s family spent $"+ moreTips + " more money than " + secondUser.name + "'s family in tips.");
  console.log(firstUser.name + "'s family spent $"+ moreBase + " more money than " + secondUser.name + "'s family in base spending.");
} else if (arrSum(finArr2) > arrSum(finArr1)) {
  var moreOverall = arrSum(finArr2) - arrSum(finArr1),
      moreTips = arrSum(tipArr2) - arrSum(tipArr1),
      moreBase = arrSum(basArr2) - arrSum(basArr1);
  console.log(secondUser.name + "'s family spent $"+ moreOverall + " more money than " + firstUser.name + "'s family in overall spending.");
  console.log(secondUser.name + "'s family spent $"+ moreTips + " more money than " + firstUser.name + "'s family in tips.");
  console.log(secondUser.name + "'s family spent $"+ moreBase + " more money than " + firstUser.name + "'s family in base spending.");
} else {
  console.log(firstUser.name + " and " + secondUser.name + "spent the same amount in overall spending.")
}*/
})();
} else {
alert("Please type in a number value instead.")
var query5 = prompt("How many receipts do you have from restaurants?", "3");
    query4 = parseInt(query5);
};
