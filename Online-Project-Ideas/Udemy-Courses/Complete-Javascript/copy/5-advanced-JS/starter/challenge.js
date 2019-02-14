/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
(function() {
function Question(q, a, c) {
  this.question = q;
  this.answers = a;
  this.correctAnswer = c;
};
var questions = [];
questions.push(new Question("What is the answer to the most important question?", ["42","21","11","77"],0));
questions.push(new Question("Is JavaScript worth the trouble?", ["no","yes"],1));
questions.push(new Question("What came first, the chicken of the egg?", ["Are you sure that you didn't mean to type or?","salmonella","It depends on where it is within the scope and closure of the code.","the chicken"],2));
questions.push(new Question("A Tornado is coming. What do you do?",["Get to the cellar or basement","Drive towards it!","Call your neighbor.","Apply for home insurance."],0));
questions.push(new Question("There’s a fight in the Break room. What do you do?", ["Pitch in and make some popcorn","Organize a betting pool","Run and tell your boss","Shove somebody into the people fighting."],3));

Question.prototype.logQuestion = function() {
  console.log(this.question);
  for (let i = 0; i < this.answers.length; i++) {
    console.log(i + ": " + this.answers[i]);
  }
}

Question.prototype.checkAnswer = function(ans, callback) {
  var sc;

  if (ans === this.correctAnswer) {
    console.log("Correct Answer!");
    sc = callback(true);
  } else {
    console.log("Wrong Answer. You lose a point");
    sc = callback(false);
  }

  this.logScore(sc);
}

Question.prototype.logScore = function(score) {
  console.log("Your current score is: " + score);
  console.log("-----------------------------");
}

function score() {
  var sc = 0;
  return function(correct) {
    if (correct) {
      sc++;
      currentScore = sc;
    }else {
      sc--;
      currentScore = sc;
    }
    return sc;
  }
}

var keepScore = score();

function alertFunc () {

}

function nextQuestion() {
var n = Math.floor(Math.random() * questions.length);

questions[n].logQuestion();

var answer = prompt(questions[n].question);

if (answer !== 'exit' && answer != undefined && answer < 4) {
questions[n].checkAnswer(parseInt(answer),keepScore);
  nextQuestion();
} else {
  console.log("Player exited the game.");
}

}
nextQuestion();
})();
