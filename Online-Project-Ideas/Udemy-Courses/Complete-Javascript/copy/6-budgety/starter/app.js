//////////////////////////////
/****************************/
/*        Modules          */
/***************************/
/*
    Important aspect of any robust application's achitecture
    Keeps the units of code for a project both cleanly seperated and organized
    Encapsulate some data into privacy and expose other data publicly.

    Structuring our code with modules:
    UI Module
    Get input values
    Add the new item to the UI
    Update the UI

    Data Module:
    Add the new item to our data structure
    Calculate budget

    Controller Module:
    Add Event Handler

    // Remember, we want to use modules to store data that is only accessible within it's
    // very own scope, seperate from all other modules within the project.

*/
// Budget Controller
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    //console.log(data.allItems)
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {

    addItem: function(typ, des, val) {
      var newItem, ID;
      // Create New ID
      if (data.allItems[typ].length != 0) {
        ID = data.allItems[typ][data.allItems[typ].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Create new item based on 'inc' or 'exp' type
      if (typ === 'exp') {
        newItem = new Expense(ID, des, val);
        typ === 'exp';
      } else if (typ === 'inc') {
        newItem = new Income(ID, des, val);
        typ === 'inc'
      }

      // Push it into our data structure
      data.allItems[typ].push(newItem);
      // Return the new element
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;
          ids = data.allItems[type].map(function(current) {
          return current.id;
        });

        index = ids.indexOf(id);
        if (index !=== -1) {
          data.allItems[type].splice(index, 1);
        }
    }

    calculateBudget: function() {

      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },

    testing: function() {
      console.log(data);
    }
  };
})();

// Seperation of Concerns....Seperating Modules so that they no longer know that they are in the same universe.

// UI Controller
var uIController = (function() {

  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputVal: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentagesLabel: ".budget__expenses--percentage",
    container: '.container'
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either a negative or a positive number
        description: document.querySelector(DOMstrings.inputDesc).value,
        value: parseFloat(document.querySelector(DOMstrings.inputVal).value)
      };
    },

    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // Replace the placeholder text while checking if they are a negative or positive integer
      newHtml = html.replace('%id%', obj.id);
      if (isNaN(obj.value.toString().charAt(0))) {
        newHtml = newHtml.replace('%value%', obj.value.toString().slice(1));
      } else {
        newHtml = newHtml.replace('%value%', obj.value);
      }
      newHtml = newHtml.replace('%description%', obj.description); //Non-working section

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function() {
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDesc + ', ' + DOMstrings.inputVal);

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(cur, ind, arr) {
        cur.value = "";
      });

      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = '$' + obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = '$' + obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent = '$' + obj.totalExp;


      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentagesLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentagesLabel).textContent = '---';
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();


// Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

  };

  var updateBudget = function() {

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    var budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  }

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input Data
    input = UICtrl.getInput();
    // Add event listener for the plus key
    if (input.description !== "" && isNaN(input.description) && !isNaN(input.value) && input.value != 0) {
      // Check for a negative
      if (input.type == 'inc' && input.value.toString().charAt(0) === '-') {
        input.type = 'exp';
      } else if (input.type == 'exp' && input.value.toString().charAt(0) === '-') {
        input.type = 'inc'
      };
      // Keep the value a positive Integer to balance the budget
      input.value = Math.abs(input.value)
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the new item to the user interface
      UICtrl.addListItem(newItem, input.type);

      // 4. Clear the fields
      UICtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
      // 6. Display the budget on the UI
    }
  };

  var ctrlDeleteItem = function(e) {
    var itemID, splitID, type;

    itemID = e.target.parentNode.parentNode.parentNode.id;

    if (itemID) {
      splitID = itemID.split('-');
      type = splitID[0];
      ID = splitID[1];

      // 1. delete the item from the data structure

      // 2. Delete the item from the UI

      // 3. Update and show the new budget
    }
  }

  return {
    init: function() {
      console.log("Application has started.");
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setupEventListeners();
    }
  };

})(budgetController, uIController);

controller.init();
