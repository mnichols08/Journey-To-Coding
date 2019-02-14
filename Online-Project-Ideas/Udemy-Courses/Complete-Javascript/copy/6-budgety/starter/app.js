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

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };
  return {

    addItem: function(typ, des, val) {
      var newItem, ID;
      // Create New ID
      if (data.allItems[typ].length > 0) {
      ID = data.allItems[typ][data.allItems[typ].length - 1].id + 1;
      } else {
      ID = 0;
      }
      // Create new item based on 'inc' or 'exp' type
      if (typ === 'exp' /*|| val.charAt(0) == '-'*/) {
        newItem = new Expense(ID, des, val);
      } else if (typ === 'inc' || val.charAt(0) == '+') {
        newItem = new Income(ID, des, val);
      }
      // Push it into our data structure
      data.allItems[typ].push(newItem);
      // Return the new element
      return newItem;
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
    expensesContainer: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either a negative or a positive number
        description: document.querySelector(DOMstrings.inputDesc).value,
        value: document.querySelector(DOMstrings.inputVal).value
      };
    },

    addListItem: function(obj, type) {
        var html, newHtml, element;
        // Create HTML string with placeholder text
        if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__percentage">21%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

        // Replace the placeholder text with data
        newHtml = html.replace('%id%', obj.id);
        newHtml = html.replace('%value%', obj.value);
        newHtml = html.replace('%description%', obj.description);

        // Insert the HTML into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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
  };

  var ctrlAddItem = function() {
    var input, newItem;
    // 1. Get the field input Data
    input = UICtrl.getInput();

    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add the new item to the user interface
    UICtrl.addListItem(newItem, input.type);

    // 4. Calculate the budget__title

    // 5. Display the budget on the UI
    };

    return {
      init: function() {
        console.log("Application has started.");
        setupEventListeners();
      }
    };

})(budgetController, uIController);

controller.init();
